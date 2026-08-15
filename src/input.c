#include <windows.h>
#include <dinput.h>
#include <mmsystem.h>
#include <stdlib.h>
#include <MinHook.h>

#include "platform.h"

extern void toLog(const char* msg);
#include "settings.h"
#include "cdaudio.h"
#include "input.h"

// g_wOutputActions — ingame actions
enum GAME_ACT_BITS {
    ACT_ACCEL  = 0x01,
    ACT_BRAKE  = 0x02,
    ACT_LEFT   = 0x04,
    ACT_RIGHT  = 0x08,
    ACT_GEARUP = 0x10,
    ACT_GEARDN = 0x20,
    ACT_HORN   = 0x40,
};

// Frontend navigation bits
enum NAV_BITS {
    NAV_UP     = 0x01,
    NAV_DOWN   = 0x02,
    NAV_LEFT   = 0x04,
    NAV_RIGHT  = 0x08,
    NAV_CAMERA = 0x10,
    NAV_SELECT = 0x20,
    NAV_UNK2   = 0x40,
    NAV_BACK   = 0x80,
};

// F-key bits (in-game + menu)
enum FKEY_BITS {
    FKEY_DISTANCE = 0x04,  // F2
    FKEY_SKYBOX   = 0x08,  // F3
    FKEY_CAMERA   = 0x10,  // F4
    FKEY_SELECT   = 0x20,  // Enter
    FKEY_BACK     = 0x80,  // Esc
};

enum GAME_DEVICE_TYPE {
    JOYSTICK = 0,
    WHEEL    = 2,
    KEYBOARD = 3,
    GAMEPAD  = 5,
};

extern int g_currentRender;

// Static joystick state (replaces game memory — only our hooks touch it)
static JOYINFOEX s_joyInfo;
static JOYCAPSA s_joyCaps;
static uint8_t s_joyNumAxes = 6; // axis count of connected device (0 until caps loaded)
static uint8_t s_ctlConnected;

// Static copies (written by our hooks, never read from unhooked code)
static uint16_t s_axisY;
static uint16_t s_axisYAdj;
static uint16_t s_axisX;
static uint16_t s_joyX;
static uint16_t s_joyY;
static uint16_t s_joyBtns;
static uint32_t s_shift;
static uint16_t s_inpSt;
static uint16_t s_inpCmd;
static uint16_t s_currAct;
static uint16_t s_prevInp;
static uint32_t s_prevBtns;

// Forward declaration (hooked via MinHook trampoline)
HRESULT __cdecl fn_updateInput(void);

// Forward declaration for joystick poll (used in JOYSTICK section)
static MMRESULT __cdecl fn_pollJoystick_hook(void);

// Keyboard
// Config table constants
#define CFG_STEER_RANGE    120
#define CFG_CLAMP_MAX      192
#define CFG_THROTTLE_FLOOR 32
#define CFG_THROTTLE_CEIL  192
#define HI_P2_UP           0x40

// C reimplementation of the original fn_transformJoystickInput (0x408733)
int __cdecl fn_transformJoystickInput(void)
{
    int v1, v2, v3;
    uint16_t out;
    int clamp = CFG_CLAMP_MAX;

    int axisX = s_axisX;
    int axisYAdj = s_axisYAdj;
    int axisY = s_axisY;

    if (g_settings.steerSensitivity != 1.0f)
    {
        int sc = (int)((float)clamp / g_settings.steerSensitivity);
        if (sc < 1) sc = 1;
        clamp = sc;
    }

    switch (*g_plat.ctlType)
    {
    case JOYSTICK:
    case 1:
    case WHEEL:
        v1 = CFG_STEER_RANGE - axisX;

        if (-g_settings.steerDeadzone <= v1)
        {
            if (g_settings.steerDeadzone >= v1)
                v2 = 0;
            else
            {
                v2 = v1 - g_settings.steerDeadzone;
                if (v2 > clamp) v2 = clamp;
            }
        }
        else
        {
            v2 = g_settings.steerDeadzone + v1;
            if (v2 < -clamp) v2 = -clamp;
        }

        out = (uint16_t)(8 * (15 * v2 / clamp) + 128);

        if (((int)CFG_CLAMP_MAX - (int)CFG_THROTTLE_FLOOR) / 2 >= axisYAdj)
        {
            v3 = axisY;
            if ((int)CFG_THROTTLE_FLOOR > v3)
                v3 = CFG_THROTTLE_FLOOR;
            if ((int)CFG_THROTTLE_CEIL < v3)
                v3 = CFG_THROTTLE_CEIL;
            out |= (uint16_t)((7 * (v3 - (int)CFG_THROTTLE_FLOOR)
                / ((int)CFG_THROTTLE_CEIL - (int)CFG_THROTTLE_FLOOR)) << 9);
        }
        else
        {
            out |= 0x0100;
        }

        if (s_currAct & ACT_HORN)
            out |= ACT_HORN;
        if (s_inpCmd & ACT_HORN)
            out |= 0x4000;

        if (s_inpCmd & 0x0010)
            out |= 0x1000;
        if (s_inpCmd & 0x0020)
            out |= 0x2000;

        if (*g_plat.cfgInvertFlag)
        {
            if (HI_P2_UP & s_currAct)
                out |= 0x4000;
        }
        else
        {
            if (HI_P2_UP & s_inpCmd)
                out |= 0x4000;
        }

        out |= 0x8000;
        break;

    case KEYBOARD:
    case 4:
    case GAMEPAD:
        out = 128;
        if (s_currAct & ACT_LEFT)  out |= 0x0008;
		if (s_currAct & ACT_RIGHT) out |= 0x0010;
		if (s_currAct & ACT_ACCEL) out |= 0x0020;
		if (s_currAct & ACT_BRAKE) out |= 0x0040;
		if (s_inpCmd & ACT_HORN)  out |= 0x4000;
        if (s_inpCmd & ACT_GEARUP) out |= 0x1000;
        if (s_inpCmd & ACT_GEARDN) out |= 0x2000;
        break;

    default:
        return *g_plat.ctlType;
    }

    *g_plat.outAct = out;
    return 0;
}


// Read axis N (0=X,1=Y,2=Z,3=R,4=U,5=V) from s_joyInfo.
// If the axis does not exist on the current device, return center (0x8000)
// so directional bindings (e.g. A:V+ from an Xbox 360 pad) never trigger.
static uint16_t readCtlAxis(int idx)
{
    if (idx > 5) return 0x8000;
    if (s_joyNumAxes && idx >= s_joyNumAxes) return 0x8000;
    const DWORD* axes = &s_joyInfo.dwXpos;
    return (uint16_t)axes[idx];
}

// Read POV from s_joyInfo (0xFFFF = not pressed)
static uint16_t readCtlPov(void)
{
    return (uint16_t)s_joyInfo.dwPOV;
}

// Test a single packed controller binding against current controller state
static bool testCtlSingle(uint32_t binding)
{
    if (!binding) return false;

    if (CTL_IS_BUTTON(binding))
    {
        uint32_t idx = CTL_INDEX(binding);
        return (s_joyBtns & (1 << idx)) != 0;
    }

    if (CTL_IS_POV(binding))
    {
        uint16_t pov = readCtlPov();
        if (pov == 0xFFFF) return false;
        static const int angles[4] = {0, 9000, 18000, 27000};
        int dir = CTL_INDEX(binding) & 3;
        int diff = (int)pov - angles[dir];
        if (diff < 0) diff = -diff;
        if (diff > 18000) diff = 36000 - diff;
        return diff <= 4500;
    }

    {
        int idx = CTL_INDEX(binding);
        if (idx > 5) return false;
        uint16_t val = readCtlAxis(idx);
        int dir = CTL_AXIS_DIR(binding);
        if (dir == 1) return val < 24000;
        if (dir == 2) return val > 40000;
        return val < 24000 || val > 40000;
    }
}

// Test multiple bindings (array) — returns true if ANY slot matches
static bool testCtl(uint32_t* bindings)
{
    for (int i = 0; i < CTL_BINDING_MAX; i++)
    {
        if (bindings[i] && testCtlSingle(bindings[i]))
            return true;
    }
    return false;
}

HRESULT __cdecl fn_updateInput(void)
{
    static uint32_t s_prevCtlAct = 0;

    HRESULT hr;
    LPDIRECTINPUTDEVICE2A dev = (LPDIRECTINPUTDEVICE2A)*g_plat.kbDev;

    hr = IDirectInputDevice2_GetDeviceState(dev, 256, g_plat.kbState);
	hr = IDirectInputDevice2_Acquire(dev);
	*g_plat.kbAcq = 1;
    /*if (hr != DI_OK)
    {
        if (hr == DIERR_INPUTLOST)
        {
            *g_plat.kbAcq = 0;
            hr = IDirectInputDevice2_Acquire(dev);
            if (hr >= 0)
                *g_plat.kbAcq = 1;
        }
        return hr;
    }*/

    // ── Frontend keyboard processing ──
    s_inpSt = (0);
    *g_plat.feKeys = 0;
    *g_plat.edgeKeys = 0;
    *g_plat.pauseNav = 0;

    static uint8_t s_kbCamKey;
    static uint8_t s_ctlCamKey;
    static uint16_t s_hornEdgeJoy;
    static int s_hornPersistJoy;
    static uint16_t s_hornEdgeWheel;
    static int s_hornPersistWheel;
    static uint16_t s_hornEdgePad;
    static int s_hornPersistPad;

    uint8_t* k = g_plat.kbState;
    uint16_t prev = s_prevInp;
    uint16_t fek = *g_plat.feKeys;
    uint16_t sysk = *g_plat.sysKeys;
    uint16_t edge = *g_plat.edgeKeys;
    uint16_t inp = s_inpSt;
    uint16_t pnav = *g_plat.pauseNav;

    #define FE_TEST(sc) ((k[(sc)] & 0x80) != 0)

    if (FE_TEST(g_settings.kbFeUp))
    {
        inp |= NAV_UP;
        if (!(prev & NAV_UP)) edge |= NAV_UP;
        pnav |= NAV_UP;
    }
    if (FE_TEST(g_settings.kbFeDown))
    {
        inp |= NAV_DOWN;
        if (!(prev & NAV_DOWN)) edge |= NAV_DOWN;
        pnav |= NAV_DOWN;
    }
    if (FE_TEST(g_settings.kbFeLeft))
    {
        inp |= NAV_LEFT;
        if (!(prev & NAV_LEFT)) edge |= NAV_LEFT;
        pnav |= NAV_LEFT;
    }
    if (FE_TEST(g_settings.kbFeRight))
    {
        inp |= NAV_RIGHT;
        if (!(prev & NAV_RIGHT)) edge |= NAV_RIGHT;
        pnav |= NAV_RIGHT;
    }

    if (FE_TEST(DIK_A))
    {
        inp |= NAV_CAMERA;
        if (!(prev & NAV_CAMERA)) edge |= NAV_CAMERA;
    }
    if (FE_TEST(DIK_Z))
    {
        inp |= NAV_SELECT;
        if (!(prev & NAV_SELECT)) edge |= NAV_SELECT;
    }
    if (FE_TEST(DIK_X))
    {
        inp |= NAV_UNK2;
        if (!(prev & NAV_UNK2)) edge |= NAV_UNK2;
    }

    if (FE_TEST(DIK_F1))
    {
        fek |= NAV_DOWN;
        if (!(sysk & NAV_DOWN)) edge |= NAV_DOWN;
    }
    if (FE_TEST(DIK_F2))
    {
        fek |= FKEY_DISTANCE;
        if (!(sysk & FKEY_DISTANCE)) edge |= FKEY_DISTANCE;
    }
    if (FE_TEST(DIK_F3))
    {
        fek |= FKEY_SKYBOX;
        if (!(sysk & FKEY_SKYBOX)) edge |= FKEY_SKYBOX;
    }

    if (FE_TEST(g_settings.kbCamera))
    {
        if (!s_kbCamKey) { fek |= FKEY_CAMERA; edge |= FKEY_CAMERA; s_kbCamKey = 1; }
    }
    else s_kbCamKey = 0;

    if (FE_TEST(g_settings.kbFeSelect))
    {
        fek |= FKEY_SELECT;
        if (!(sysk & FKEY_SELECT)) edge |= FKEY_SELECT;
    }

    *g_plat.gamePaused = 0;
    if (FE_TEST(g_settings.kbFeBack))
    {
        fek |= FKEY_BACK;
        if (!(sysk & FKEY_BACK)) edge |= FKEY_BACK;
        *g_plat.gamePaused = 1;
    }
    if (FE_TEST(DIK_P))
        *g_plat.gamePaused = 1;

    *g_plat.feKeys = fek;
    *g_plat.pauseNav = pnav;

    // ── Joystick frontend processing ──
    if (s_ctlConnected)
    {
        fn_pollJoystick_hook();

        s_joyX = ((uint16_t)s_joyInfo.dwXpos);
        s_joyY = ((uint16_t)s_joyInfo.dwYpos);
        s_joyBtns = ((uint16_t)s_joyInfo.dwButtons);

        #define FE_CTL_ACT(ctl, bit) do { \
            if (testCtl(g_settings.ctl)) { \
                inp |= bit; \
                if (!(prev & bit)) edge |= bit; \
                pnav |= bit; \
            } \
        } while(0)

        FE_CTL_ACT(ctlFeSelect, FKEY_SELECT);
        FE_CTL_ACT(ctlFeDown,   NAV_DOWN);
        FE_CTL_ACT(ctlFeLeft,   NAV_LEFT);
        FE_CTL_ACT(ctlFeRight,  NAV_RIGHT);
        FE_CTL_ACT(ctlFeUp,     NAV_UP);
        FE_CTL_ACT(ctlFeBack,   FKEY_BACK);

        #undef FE_CTL_ACT

        if (testCtl(g_settings.ctlFeSelect)) {
            fek |= FKEY_SELECT;
            if (!(sysk & FKEY_SELECT)) edge |= FKEY_SELECT;
        }
        if (testCtl(g_settings.ctlFeBack)) {
            fek |= FKEY_BACK;
            if (!(sysk & FKEY_BACK)) edge |= FKEY_BACK;
        }
    }

    // ── Save prev state ──
    *g_plat.feKeys = fek;
    *g_plat.pauseNav = pnav;
    s_inpSt = (inp);
    s_prevInp = (inp);
    *g_plat.edgeKeys = edge;
    *g_plat.sysKeys = fek;

    // ── Switch on controller type ──
    switch (*g_plat.ctlType)
    {
    case JOYSTICK:
    case 1:
    {
        if (s_ctlConnected)
        {
            s_shift = (0);

            s_axisX = (s_joyX >> 8);

            uint16_t tempY = s_joyY;
            if ((int16_t)tempY < 0)
                tempY = 32767;
            tempY = (uint16_t)((32768 - (int16_t)tempY) / 128);
            s_axisY = (tempY);

            uint16_t adj = (uint16_t)(s_joyY - 0x8000);
            if ((int16_t)adj < 0)
                adj = 0;
            s_axisYAdj = ((uint16_t)((int16_t)adj / 128));

            if (testCtl(g_settings.ctlGearUp) && !(s_prevCtlAct & ACT_GEARUP))
                s_shift |= 0x10;
            if (testCtl(g_settings.ctlGearDown) && !(s_prevCtlAct & ACT_GEARDN))
                s_shift |= 0x20;

            uint32_t currAct = 0;
            uint32_t inpCmd = s_shift;
            if (testCtl(g_settings.ctlHorn))
            {
                currAct |= ACT_HORN;
                if (!(s_hornEdgeJoy & ACT_HORN))
                {
                    inpCmd |= ACT_HORN;
                    s_hornEdgeJoy |= ACT_HORN;
                    s_hornPersistJoy = 3;
                }
            }
            else s_hornEdgeJoy &= ~ACT_HORN;
            if (s_hornPersistJoy > 0)
            {
                inpCmd |= ACT_HORN;
                s_hornPersistJoy--;
            }

            s_prevBtns = (s_joyBtns);
            s_currAct = (currAct);
            s_inpCmd = (inpCmd);

            fn_transformJoystickInput();

            s_prevCtlAct = 0;
            if (testCtl(g_settings.ctlGearUp))   s_prevCtlAct |= ACT_GEARUP;
            if (testCtl(g_settings.ctlGearDown)) s_prevCtlAct |= ACT_GEARDN;
        }
        break;
    }

    case WHEEL:
    {
        if (s_ctlConnected)
        {
            s_shift = (0);
            s_inpCmd = (0);

            int steerAxis = 0;
            if (CTL_IS_AXIS(g_settings.ctlSteerLeft[0]))
                steerAxis = CTL_INDEX(g_settings.ctlSteerLeft[0]);
            else if (CTL_IS_AXIS(g_settings.ctlSteerRight[0]))
                steerAxis = CTL_INDEX(g_settings.ctlSteerRight[0]);
            s_axisX = (readCtlAxis(steerAxis) >> 8);

            int accelAxis = -1, brakeAxis = -1;
            if (CTL_IS_AXIS(g_settings.ctlAccel[0])) { accelAxis = CTL_INDEX(g_settings.ctlAccel[0]); }
            if (CTL_IS_AXIS(g_settings.ctlBrake[0])) { brakeAxis = CTL_INDEX(g_settings.ctlBrake[0]); }

            if (accelAxis >= 0 && brakeAxis >= 0 && accelAxis != brakeAxis)
            {
                uint16_t rawAccel = readCtlAxis(accelAxis);
                uint16_t rawBrake = readCtlAxis(brakeAxis);
                uint16_t gasScaled, brakeScaled;

                if (CTL_AXIS_DIR(g_settings.ctlAccel[0]) == 1)
                    gasScaled = (uint16_t)((32768 - (int16_t)rawAccel) / 256);
                else if (CTL_AXIS_DIR(g_settings.ctlAccel[0]) == 2)
                    gasScaled = (uint16_t)(((int16_t)rawAccel - 32768) / 256);
                else
                    gasScaled = rawAccel >> 9;

                if (CTL_AXIS_DIR(g_settings.ctlBrake[0]) == 1)
                    brakeScaled = (uint16_t)((32768 - (int16_t)rawBrake) / 256);
                else if (CTL_AXIS_DIR(g_settings.ctlBrake[0]) == 2)
                    brakeScaled = (uint16_t)(((int16_t)rawBrake - 32768) / 256);
                else
                    brakeScaled = rawBrake >> 9;

                if (gasScaled > 127) gasScaled = 127;
                if (brakeScaled > 127) brakeScaled = 127;

                int16_t mixed = 128 + (int16_t)gasScaled - (int16_t)brakeScaled;
                if (mixed < 1) mixed = 1;
                if (mixed > 255) mixed = 255;
                s_axisY = ((uint16_t)mixed);
                s_axisYAdj = (brakeScaled);
            }
            else if (accelAxis >= 0)
            {
                uint16_t rawY = readCtlAxis(accelAxis);
                uint16_t tempY = rawY;
                if ((int16_t)tempY < 0) tempY = 32767;
                tempY = (uint16_t)((32768 - (int16_t)tempY) / 128);
                s_axisY = (tempY);

                uint16_t adj = (uint16_t)(rawY - 0x8000);
                if ((int16_t)adj < 0) adj = 0;
                s_axisYAdj = ((uint16_t)((int16_t)adj / 128));
            }

            if (testCtl(g_settings.ctlGearUp) && !(s_prevCtlAct & ACT_GEARUP))
                s_shift |= 0x10;
            if (testCtl(g_settings.ctlGearDown) && !(s_prevCtlAct & ACT_GEARDN))
                s_shift |= 0x20;

            uint32_t currAct = 0;

            s_prevBtns = (s_joyBtns);
            s_currAct = (currAct);
            do { uint32_t _s = s_shift; s_inpCmd = (_s); } while(0);

            fn_transformJoystickInput();

            if (testCtl(g_settings.ctlHorn))
            {
                if (!(s_hornEdgeWheel & ACT_HORN))
                {
                    *g_plat.outAct |= 0x4000;
                    s_hornEdgeWheel |= ACT_HORN;
                    s_hornPersistWheel = 3;
                }
            }
            else s_hornEdgeWheel &= ~ACT_HORN;
            if (s_hornPersistWheel > 0)
            {
                *g_plat.outAct |= 0x4000;
                s_hornPersistWheel--;
            }

            if (testCtl(g_settings.ctlCamera))
            {
                if (!s_ctlCamKey) { *g_plat.feKeys |= FKEY_CAMERA; s_ctlCamKey = 1; }
            }
            else s_ctlCamKey = 0;

            if (testCtl(g_settings.ctlPause))
                *g_plat.gamePaused = 1;

            s_prevCtlAct = 0;
            if (testCtl(g_settings.ctlGearUp))   s_prevCtlAct |= ACT_GEARUP;
            if (testCtl(g_settings.ctlGearDown)) s_prevCtlAct |= ACT_GEARDN;
        }
        break;
    }

    case KEYBOARD:
    {
        s_inpCmd = (0);
        s_currAct = (0);

        if (FE_TEST(g_settings.kbAccel))
            s_currAct = (s_currAct | ACT_ACCEL);
        if (FE_TEST(g_settings.kbBrake) || FE_TEST(DIK_SPACE))
            s_currAct = (s_currAct | ACT_BRAKE);
        if (FE_TEST(g_settings.kbSteerLeft))
            s_currAct = (s_currAct | ACT_LEFT);
        if (FE_TEST(g_settings.kbSteerRight))
            s_currAct = (s_currAct | ACT_RIGHT);
        {
            static uint16_t s_kbEdge;
            static int s_kbPersist;
            if (FE_TEST(g_settings.kbHorn))
            {
                s_currAct |= ACT_HORN;
                if (!(s_kbEdge & ACT_HORN))
                {
                    s_inpCmd |= ACT_HORN;
                    s_kbEdge |= ACT_HORN;
                    s_kbPersist = 3;
                }
            }
            else s_kbEdge &= ~ACT_HORN;
            if (s_kbPersist > 0)
            {
                s_inpCmd |= ACT_HORN;
                s_kbPersist--;
            }
        }
        if (FE_TEST(g_settings.kbGearUp))
        {
            s_currAct = (s_currAct | ACT_GEARUP);
            if (!(s_prevBtns & ACT_GEARUP))
                s_inpCmd = (s_inpCmd | ACT_GEARUP);
        }
        if (FE_TEST(g_settings.kbGearDown))
        {
            s_currAct = (s_currAct | ACT_GEARDN);
            if (!(s_prevBtns & ACT_GEARDN))
                s_inpCmd = (s_inpCmd | ACT_GEARDN);
        }

        s_prevBtns = (s_currAct);
        fn_transformJoystickInput();
        break;
    }

    case 4:
    case GAMEPAD:
    {
        s_inpCmd = (0);
        s_currAct = (0);

        #define CTL_ACT(ctl, bit) \
            if (testCtl(g_settings.ctl)) s_currAct = (s_currAct | bit)
        #define CTL_ACT_EDGE(ctl, bit) \
            if (testCtl(g_settings.ctl)) { \
                s_currAct = (s_currAct | bit); \
                if (!(s_prevBtns & bit)) s_inpCmd = (s_inpCmd | bit); \
            }

        CTL_ACT(ctlAccel, ACT_ACCEL);
        CTL_ACT(ctlBrake, ACT_BRAKE);
        CTL_ACT_EDGE(ctlGearUp,   ACT_GEARUP);
        CTL_ACT_EDGE(ctlGearDown, ACT_GEARDN);
        CTL_ACT(ctlSteerLeft,  ACT_LEFT);
        CTL_ACT(ctlSteerRight, ACT_RIGHT);

        if (testCtl(g_settings.ctlHorn))
        {
            s_currAct |= ACT_HORN;
            if (!(s_hornEdgePad & ACT_HORN))
            {
                s_inpCmd |= ACT_HORN;
                s_hornEdgePad |= ACT_HORN;
                s_hornPersistPad = 3;
            }
        }
        else s_hornEdgePad &= ~ACT_HORN;
        if (s_hornPersistPad > 0)
        {
            s_inpCmd |= ACT_HORN;
            s_hornPersistPad--;
        }

        #undef CTL_ACT
        #undef CTL_ACT_EDGE

        s_prevBtns = (s_currAct);
        fn_transformJoystickInput();

        if (testCtl(g_settings.ctlCamera))
        {
            if (!s_ctlCamKey) { *g_plat.feKeys |= FKEY_CAMERA; s_ctlCamKey = 1; }
        }
        else s_ctlCamKey = 0;

        if (testCtl(g_settings.ctlPause))
            *g_plat.gamePaused = 1;

        break;
    }

    default:
        break;
    }

    // CD track next/prev
    if (g_plat.cdPlay && !*g_plat.gamePaused && *g_plat.finishAddr == -1)
    {
        int cdAllowed = 1;
        if (*g_plat.gameState != 5)
            cdAllowed = 0;
        if (*g_plat.isDemoMode)
            cdAllowed = 0;
        if (*g_plat.pauseToggle)
            cdAllowed = 0;

        if (cdAllowed)
        {
            static uint16_t s_cdEdge = 0;
            int wantNext = 0, wantPrev = 0;

        if (*g_plat.ctlType == KEYBOARD)
        {
            if (g_settings.kbNextCdTrack && (k[g_settings.kbNextCdTrack] & 0x80))
            {
                if (!(s_cdEdge & 0x01)) { wantNext = 1; s_cdEdge |= 0x01; }
            }
            else s_cdEdge &= ~0x01;

            if (g_settings.kbPrevCdTrack && (k[g_settings.kbPrevCdTrack] & 0x80))
            {
                if (!(s_cdEdge & 0x02)) { wantPrev = 1; s_cdEdge |= 0x02; }
            }
            else s_cdEdge &= ~0x02;
        }
        else if (s_ctlConnected)
        {
            if (testCtl(g_settings.ctlCdNext))
            {
                if (!(s_cdEdge & 0x04)) { wantNext = 1; s_cdEdge |= 0x04; }
            }
            else s_cdEdge &= ~0x04;

            if (testCtl(g_settings.ctlCdPrev))
            {
                if (!(s_cdEdge & 0x08)) { wantPrev = 1; s_cdEdge |= 0x08; }
            }
            else s_cdEdge &= ~0x08;
        }

        if (wantNext || wantPrev)
        {
            int track = *g_plat.cdTrack;
            int maxTrack = (g_numCDTracks > 1) ? g_numCDTracks : 10;

            if (wantNext)
            {
                if (++track > maxTrack) track = 2;
            }
            else
            {
                if (--track < 2) track = maxTrack;
            }

            *g_plat.cdTrack = track;
            *g_plat.cdCounter = 0;
            g_plat.cdPlay(track);
        }
    }
    }

    // Camera look
    if ((g_plat.pitchAddr || g_plat.dirAddr) && !*g_plat.gamePaused)
    {
        uint32_t lookPitch = 0;
        if (*g_plat.ctlType == KEYBOARD)
        {
            if (g_settings.kbLookLeft && (k[g_settings.kbLookLeft] & 0x80)
                && g_settings.kbLookRight && (k[g_settings.kbLookRight] & 0x80))
                lookPitch = 2048;
            else if (g_settings.kbLookLeft && (k[g_settings.kbLookLeft] & 0x80))
                lookPitch = 3072;
            else if (g_settings.kbLookRight && (k[g_settings.kbLookRight] & 0x80))
                lookPitch = 1024;
            else if (g_settings.kbLookBack && (k[g_settings.kbLookBack] & 0x80))
                lookPitch = 2048;
        }
        else if (s_ctlConnected)
        {
            if (testCtl(g_settings.ctlLookLeft) && testCtl(g_settings.ctlLookRight))
                lookPitch = 2048;
            else if (testCtl(g_settings.ctlLookLeft))
                lookPitch = 3072;
            else if (testCtl(g_settings.ctlLookRight))
                lookPitch = 1024;
            else if (testCtl(g_settings.ctlLookBack))
                lookPitch = 2048;
        }

        if (*g_plat.countdownAddr != -1 || *g_plat.finishAddr != -1) 
			lookPitch = 0;

        if (g_plat.pitchAddr)
            *g_plat.pitchAddr = lookPitch;

        if (g_plat.dirAddr)
        {
            static int s_wasLooking = 0;
            static uint32_t s_baseDir = 0;

            if (lookPitch)
            {
                if (!s_wasLooking)
                {
                    s_baseDir = *g_plat.dirAddr;
                    s_wasLooking = 1;
                }
                *g_plat.dirAddr = s_baseDir + lookPitch;
            }
            else
            {
                if (s_wasLooking)
                {
                    *g_plat.dirAddr = s_baseDir;
                    s_wasLooking = 0;
                }
            }
        }
    }

    // Respawn (R key) — calls respawn function directly, bypassing crash handler
    static int s_respawnFreeze = 0;
    if (s_respawnFreeze > 0) s_respawnFreeze--;

    if (*g_plat.gameState == 5)
    {
        if (*g_plat.countdownAddr == -1 && *g_plat.finishAddr == -1)
        {
            static int s_respawnCooldown = 0;
            if (s_respawnCooldown > 0) s_respawnCooldown--;
            int resKey = (*g_plat.ctlType == KEYBOARD)
                ? FE_TEST(g_settings.kbRespawn)
                : (s_ctlConnected && testCtl(g_settings.ctlRespawn));
            if (resKey && s_respawnCooldown == 0)
            {
                int canRespawn = 1;
                int police = *g_plat.policeFlag;
                if (police > 0)
                {
                    int caught = *(g_plat.policeCaught + 49 * (police - 1));
                    if (caught == 1) canRespawn = 0;
                }
                if (canRespawn)
                {
                    s_respawnFreeze = 45;
                    s_respawnCooldown = 120;
                    int idx = *g_plat.carIdx;
                    uint8_t* car = g_plat.carBase + 668 * idx;
                    *(uint32_t*)(car + 628) = 180;
                    g_plat.respawnFunc(car);
                }
            }
        }
    }

    // Freeze output during respawn cooldown
    if (s_respawnFreeze > 0)
        *g_plat.outAct = 0x0080;

    return DI_OK;
}

static MMRESULT __cdecl fn_initJoystick_hook(void)
{
    MMRESULT result;
    UINT joyId = g_settings.controllerId;

    s_joyInfo.dwSize = sizeof(JOYINFOEX);
    result = joyGetNumDevs();

    if (result > joyId)
    {
        result = joyGetPosEx(joyId, &s_joyInfo);
        s_ctlConnected = (result == 0) ? 1 : 0;
        if (result == 0)
        {
            result = joyGetDevCapsA(joyId, &s_joyCaps, sizeof(JOYCAPSA));
            if (result == 0)
                s_joyNumAxes = s_joyCaps.wNumAxes;
        }
    }

    return result;
}

static MMRESULT __cdecl fn_pollJoystick_hook(void)
{
    MMRESULT result;
    UINT joyId = g_settings.controllerId;

    s_joyInfo.dwFlags = JOY_RETURNALL;
    result = joyGetPosEx(joyId, &s_joyInfo);

    if (result == 0)
    {
        result = joyGetDevCapsA(joyId, &s_joyCaps, sizeof(JOYCAPSA));
        if (result == 0)
            s_joyNumAxes = s_joyCaps.wNumAxes;
    }
    else
    {
        s_ctlConnected = 0;
    }

    return result;
}

void fixInputHook(void)
{
    MH_STATUS status;
    void* addr;

    status = MH_Initialize();
    if (status != MH_OK) { toLog("MH_Initialize failed"); return; }

    if (g_currentRender == RENDER_GLIDE)
    {
        addr = (void*)0x43D0A8;
        status = MH_CreateHook(addr, fn_initJoystick_hook, NULL);
        if (status != MH_OK && status != MH_ERROR_ALREADY_CREATED) { toLog("MH_CreateHook 0x43D0A8 failed"); return; }
        status = MH_EnableHook(addr);
        if (status != MH_OK) { toLog("MH_EnableHook 0x43D0A8 failed"); return; }

        addr = (void*)0x43D112;
        status = MH_CreateHook(addr, fn_pollJoystick_hook, NULL);
        if (status != MH_OK && status != MH_ERROR_ALREADY_CREATED) { toLog("MH_CreateHook 0x43D112 failed"); return; }
        status = MH_EnableHook(addr);
        if (status != MH_OK) { toLog("MH_EnableHook 0x43D112 failed"); return; }

        addr = (void*)0x439DF6;
        status = MH_CreateHook(addr, fn_updateInput, NULL);
        if (status != MH_OK && status != MH_ERROR_ALREADY_CREATED) { toLog("MH_CreateHook 0x439DF6 failed"); return; }
        status = MH_EnableHook(addr);
        if (status != MH_OK) { toLog("MH_EnableHook 0x439DF6 failed"); return; }

        addr = (void*)0x408733;
        status = MH_CreateHook(addr, fn_transformJoystickInput, NULL);
        if (status != MH_OK && status != MH_ERROR_ALREADY_CREATED) { toLog("MH_CreateHook 0x408733 failed"); return; }
        status = MH_EnableHook(addr);
        if (status != MH_OK) { toLog("MH_EnableHook 0x408733 failed"); return; }
    }
    else
    {
        addr = (void*)0x43D0EB;
        status = MH_CreateHook(addr, fn_initJoystick_hook, NULL);
        if (status != MH_OK && status != MH_ERROR_ALREADY_CREATED) { toLog("MH_CreateHook 0x43D0EB failed"); return; }
        status = MH_EnableHook(addr);
        if (status != MH_OK) { toLog("MH_EnableHook 0x43D0EB failed"); return; }

        addr = (void*)0x43D155;
        status = MH_CreateHook(addr, fn_pollJoystick_hook, NULL);
        if (status != MH_OK && status != MH_ERROR_ALREADY_CREATED) { toLog("MH_CreateHook 0x43D155 failed"); return; }
        status = MH_EnableHook(addr);
        if (status != MH_OK) { toLog("MH_EnableHook 0x43D155 failed"); return; }

        addr = (void*)0x439EA4;
        status = MH_CreateHook(addr, fn_updateInput, NULL);
        if (status != MH_OK && status != MH_ERROR_ALREADY_CREATED) { toLog("MH_CreateHook 0x439EA4 failed"); return; }
        status = MH_EnableHook(addr);
        if (status != MH_OK) { toLog("MH_EnableHook 0x439EA4 failed"); return; }

        addr = (void*)0x408508;
        status = MH_CreateHook(addr, fn_transformJoystickInput, NULL);
        if (status != MH_OK && status != MH_ERROR_ALREADY_CREATED) { toLog("MH_CreateHook 0x408508 failed"); return; }
        status = MH_EnableHook(addr);
        if (status != MH_OK) { toLog("MH_EnableHook 0x408508 failed"); return; }
    }
	toLog("fixInputHook OK");
}
