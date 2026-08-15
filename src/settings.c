#include <windows.h>
#include <dinput.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>

#include "settings.h"

Settings g_settings = {0};

// INI string parser for controller bindings
static const char* const AXIS_NAMES = "XYZRUV";
static const char* const POV_NAMES[4] = {"UP", "RIGHT", "DOWN", "LEFT"};

uint32_t parseControllerBinding(const char* str)
{
    if (!str || !*str) return 0;

    while (*str == ' ' || *str == '\t') str++;
    if (!*str) return 0;

    char type = toupper((unsigned char)*str);
    if (type != 'A' && type != 'B' && type != 'P') return 0;

    str++;
    if (*str != ':') return 0;
    str++;

    switch (type)
    {
    case 'A':
    {
        char axisChar = toupper((unsigned char)*str);
        const char* p = strchr(AXIS_NAMES, axisChar);
        if (!p) return 0;
        int idx = (int)(p - AXIS_NAMES);
        str++;

        int dir = 0;
        if (*str == '+') { dir = 2; str++; }
        else if (*str == '-') { dir = 1; str++; }

        while (*str == ' ' || *str == '\t') str++;
        if (*str) return 0;

        if (dir == 1) return CTL_AXIS_NEG(idx);
        if (dir == 2) return CTL_AXIS_POS(idx);
        return CTL_AXIS_BOTH(idx);
    }

    case 'B':
    {
        char* end;
        long idx = strtol(str, &end, 10);
        if (end == str || idx < 1 || idx > 16) return 0;
        while (*end == ' ' || *end == '\t') end++;
        if (*end) return 0;
        return CTL_BUTTON((int)idx - 1);
    }

    case 'P':
    {
        char buf[16];
        int i = 0;
        while (*str && *str != ' ' && *str != '\t' && i < 15)
        {
            buf[i++] = toupper((unsigned char)*str);
            str++;
        }
        buf[i] = '\0';

        while (*str == ' ' || *str == '\t') str++;
        if (*str) return 0;

        for (int j = 0; j < 4; j++)
            if (strcmp(buf, POV_NAMES[j]) == 0)
                return CTL_POV(j);
        return 0;
    }
    }
    return 0;
}

// Parse multiple bindings separated by space (e.g. "B:1 A:Y-")
int parseControllerBindings(uint32_t* out, int max, const char* str)
{
    int count = 0;
    if (!str) return 0;

    for (int i = 0; i < max; i++)
        out[i] = 0;

    char buf[64];
    int bufIdx = 0;

    for (const char* p = str; *p; p++)
    {
        if (*p == ' ')
        {
            if (bufIdx > 0)
            {
                buf[bufIdx] = '\0';
                if (count < max)
                {
                    uint32_t v = parseControllerBinding(buf);
                    if (v) out[count++] = v;
                }
                bufIdx = 0;
            }
        }
        else
        {
            if (bufIdx < (int)sizeof(buf) - 1)
                buf[bufIdx++] = *p;
        }
    }

    if (bufIdx > 0)
    {
        buf[bufIdx] = '\0';
        if (count < max)
        {
            uint32_t v = parseControllerBinding(buf);
            if (v) out[count++] = v;
        }
    }

    return count;
}

static void getIniPath(char* out, size_t outSize)
{
    GetModuleFileNameA(g_hModule, out, (DWORD)outSize);
    char* ext = strrchr(out, '.');
    if (ext) strcpy(ext, ".ini");
}

void loadSettings(void)
{
    char iniPath[UCHAR_MAX];
    getIniPath(iniPath, sizeof(iniPath));

    g_settings.startupCrash = GetPrivateProfileInt("Fix", "StartupCrash", 1, iniPath) != 0;
    g_settings.noCD = GetPrivateProfileInt("Fix", "NoCD", 0, iniPath) != 0;
    g_settings.skipLogo = GetPrivateProfileInt("Fix", "SkipLogo", 0, iniPath) != 0;
    g_settings.viewport = GetPrivateProfileInt("Fix", "Viewport", 0, iniPath) != 0;
    g_settings.input = GetPrivateProfileInt("Fix", "Input", 0, iniPath) != 0;
    g_settings.camera = GetPrivateProfileInt("Fix", "Camera", 0, iniPath) != 0;
    g_settings.frontend = GetPrivateProfileInt("Fix", "Frontend", 0, iniPath) != 0;
    g_settings.extCDTracks = GetPrivateProfileInt("Fix", "ExtCDTracks", 0, iniPath) != 0;
    g_settings.levelMusicOrder = GetPrivateProfileInt("Fix", "LevelMusicOrder", 0, iniPath) != 0;
	g_settings.cockpit = GetPrivateProfileInt("Fix", "Cockpit", 0, iniPath) != 0;

    g_settings.isKph = GetPrivateProfileInt("GameOptions", "IsKph", 0, iniPath) != 0;
    g_settings.traffic = GetPrivateProfileInt("GameOptions", "Traffic", 1, iniPath) != 0;
    g_settings.timer = GetPrivateProfileInt("GameOptions", "Timer", 1, iniPath) != 0;

    g_settings.kbAccel = (uint8_t)GetPrivateProfileInt("Keyboard", "Accelerate", DIK_UP, iniPath);
    g_settings.kbBrake = (uint8_t)GetPrivateProfileInt("Keyboard", "Brake", DIK_DOWN, iniPath);
    g_settings.kbSteerLeft = (uint8_t)GetPrivateProfileInt("Keyboard", "TurnLeft", DIK_LEFT, iniPath);
    g_settings.kbSteerRight = (uint8_t)GetPrivateProfileInt("Keyboard", "TurnRight", DIK_RIGHT, iniPath);
    g_settings.kbGearUp = (uint8_t)GetPrivateProfileInt("Keyboard", "GearUp", DIK_A, iniPath);
    g_settings.kbGearDown = (uint8_t)GetPrivateProfileInt("Keyboard", "GearDown", DIK_Z, iniPath);
    g_settings.kbHorn = (uint8_t)GetPrivateProfileInt("Keyboard", "Horn", DIK_H, iniPath);
    g_settings.kbCamera = (uint8_t)GetPrivateProfileInt("Keyboard", "Camera", DIK_C, iniPath);
    g_settings.kbRespawn = (uint8_t)GetPrivateProfileInt("Keyboard", "Respawn", DIK_R, iniPath);
    g_settings.kbLookLeft = (uint8_t)GetPrivateProfileInt("Keyboard", "LookLeft", 0, iniPath);
    g_settings.kbLookRight = (uint8_t)GetPrivateProfileInt("Keyboard", "LookRight", 0, iniPath);
    g_settings.kbLookBack = (uint8_t)GetPrivateProfileInt("Keyboard", "LookBack", 0, iniPath);
    g_settings.kbNextCdTrack = (uint8_t)GetPrivateProfileInt("Keyboard", "NextCdTrack", 0, iniPath);
    g_settings.kbPrevCdTrack = (uint8_t)GetPrivateProfileInt("Keyboard", "PrevCdTrack", 0, iniPath);
    g_settings.kbFeUp = (uint8_t)GetPrivateProfileInt("Keyboard", "Up", DIK_UP, iniPath);
    g_settings.kbFeDown = (uint8_t)GetPrivateProfileInt("Keyboard", "Down", DIK_DOWN, iniPath);
    g_settings.kbFeLeft = (uint8_t)GetPrivateProfileInt("Keyboard", "Left", DIK_LEFT, iniPath);
    g_settings.kbFeRight = (uint8_t)GetPrivateProfileInt("Keyboard", "Right", DIK_RIGHT, iniPath);
    g_settings.kbFeSelect = (uint8_t)GetPrivateProfileInt("Keyboard", "Select", DIK_RETURN, iniPath);
    g_settings.kbFeBack = (uint8_t)GetPrivateProfileInt("Keyboard", "Back", DIK_ESCAPE, iniPath);

    g_settings.controllerId = GetPrivateProfileInt("Controller", "Id", 0, iniPath);
    {
        char buf[16];
        GetPrivateProfileStringA("Controller", "SteerSensitivity", "1.0", buf, sizeof(buf), iniPath);
        g_settings.steerSensitivity = (float)atof(buf);
        if (g_settings.steerSensitivity < 0.5f) g_settings.steerSensitivity = 0.5f;
        if (g_settings.steerSensitivity > 2.0f) g_settings.steerSensitivity = 2.0f;
    }

    g_settings.steerDeadzone = GetPrivateProfileInt("Controller", "SteerDeadzone", 10, iniPath);

    #define LOAD_CTL(section, key, field) do { \
        char buf[128] = {0}; \
        GetPrivateProfileStringA(section, key, "", buf, sizeof(buf), iniPath); \
        parseControllerBindings(g_settings.field, CTL_BINDING_MAX, buf); \
    } while(0)

    LOAD_CTL("Controller", "Accelerate",  ctlAccel);
    LOAD_CTL("Controller", "Brake",       ctlBrake);
    LOAD_CTL("Controller", "TurnLeft",   ctlSteerLeft);
    LOAD_CTL("Controller", "TurnRight",  ctlSteerRight);
    LOAD_CTL("Controller", "GearUp",      ctlGearUp);
    LOAD_CTL("Controller", "GearDown",    ctlGearDown);
    LOAD_CTL("Controller", "Horn",        ctlHorn);
    LOAD_CTL("Controller", "Respawn",     ctlRespawn);
    LOAD_CTL("Controller", "Camera",      ctlCamera);
    LOAD_CTL("Controller", "Pause",       ctlPause);
    LOAD_CTL("Controller", "LookLeft",    ctlLookLeft);
    LOAD_CTL("Controller", "LookRight",   ctlLookRight);
    LOAD_CTL("Controller", "LookBack",    ctlLookBack);
    LOAD_CTL("Controller", "NextCdTrack", ctlCdNext);
    LOAD_CTL("Controller", "PrevCdTrack", ctlCdPrev);

    LOAD_CTL("Controller", "Select", ctlFeSelect);
    LOAD_CTL("Controller", "Back",   ctlFeBack);
    LOAD_CTL("Controller", "Up",     ctlFeUp);
    LOAD_CTL("Controller", "Down",   ctlFeDown);
    LOAD_CTL("Controller", "Left",   ctlFeLeft);
    LOAD_CTL("Controller", "Right",  ctlFeRight);

    #undef LOAD_CTL
}

void saveSettings(void)
{
    char iniPath[UCHAR_MAX];
    getIniPath(iniPath, sizeof(iniPath));

    char buf[UCHAR_MAX];
    sprintf(buf, "%d", g_settings.isKph ? 1 : 0);
    WritePrivateProfileStringA("GameOptions", "IsKph", buf, iniPath);

    sprintf(buf, "%d", g_settings.traffic ? 1 : 0);
    WritePrivateProfileStringA("GameOptions", "Traffic", buf, iniPath);

    sprintf(buf, "%d", g_settings.timer ? 1 : 0);
    WritePrivateProfileStringA("GameOptions", "Timer", buf, iniPath);
}
