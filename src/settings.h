#ifdef __cplusplus
extern "C" {
#endif

#include <windows.h>
#include <mmsystem.h>
#include <stdint.h>
#include <stdbool.h>

#define CTL_BINDING_MAX 4

#define CTL_AXIS_BOTH(idx)  (idx)
#define CTL_AXIS_NEG(idx)   (0x1000 | (idx))
#define CTL_AXIS_POS(idx)   (0x2000 | (idx))
#define CTL_BUTTON(idx)     (0x4000 | (idx))
#define CTL_POV(dir)        (0x8000 | (dir))

#define CTL_IS_AXIS(v)      (!((v) & 0xC000))
#define CTL_IS_BUTTON(v)    (((v) & 0xC000) == 0x4000)
#define CTL_IS_POV(v)       (((v) & 0xC000) == 0x8000)
#define CTL_INDEX(v)        ((v) & 0x0FFF)
#define CTL_AXIS_DIR(v)     (((v) >> 12) & 3)

typedef struct {
    bool skipLogo;
    bool startupCrash;
    bool noCD;
    bool isKph;
    bool traffic;
    bool timer;
    bool viewport;
    bool camera;
    bool frontend;
    bool extCDTracks;
    bool levelMusicOrder;
	bool input;
	bool cockpit;
    // Keyboard remap — DIK_* scan codes
    uint8_t kbAccel;
    uint8_t kbBrake;
    uint8_t kbSteerLeft;
    uint8_t kbSteerRight;
    uint8_t kbGearUp;
    uint8_t kbGearDown;
    uint8_t kbHorn;
    uint8_t kbCamera;
    uint8_t kbFeUp;
    uint8_t kbFeDown;
    uint8_t kbFeLeft;
    uint8_t kbFeRight;
    uint8_t kbFeSelect;
    uint8_t kbFeBack;
    uint8_t kbLookLeft;
    uint8_t kbLookRight;
    uint8_t kbLookBack;
    uint8_t kbRespawn;
    uint8_t kbNextCdTrack;
    uint8_t kbPrevCdTrack;
    uint8_t controllerId;
    // Controller actions — packed uint32_t arrays (multiple bindings per action)
    uint32_t ctlAccel[CTL_BINDING_MAX];
    uint32_t ctlBrake[CTL_BINDING_MAX];
    uint32_t ctlSteerLeft[CTL_BINDING_MAX];
    uint32_t ctlSteerRight[CTL_BINDING_MAX];
    uint32_t ctlGearUp[CTL_BINDING_MAX];
    uint32_t ctlGearDown[CTL_BINDING_MAX];
    uint32_t ctlHorn[CTL_BINDING_MAX];
    uint32_t ctlRespawn[CTL_BINDING_MAX];
    uint32_t ctlCamera[CTL_BINDING_MAX];
    uint32_t ctlPause[CTL_BINDING_MAX];
    uint32_t ctlLookLeft[CTL_BINDING_MAX];
    uint32_t ctlLookRight[CTL_BINDING_MAX];
    uint32_t ctlLookBack[CTL_BINDING_MAX];
    uint32_t ctlCdNext[CTL_BINDING_MAX];
    uint32_t ctlCdPrev[CTL_BINDING_MAX];
    uint32_t ctlFeSelect[CTL_BINDING_MAX];
    uint32_t ctlFeBack[CTL_BINDING_MAX];
    uint32_t ctlFeUp[CTL_BINDING_MAX];
    uint32_t ctlFeDown[CTL_BINDING_MAX];
    uint32_t ctlFeLeft[CTL_BINDING_MAX];
    uint32_t ctlFeRight[CTL_BINDING_MAX];
    float steerSensitivity;
    int steerDeadzone;
} Settings;

extern Settings g_settings;
extern HMODULE g_hModule;

uint32_t parseControllerBinding(const char* str);
int parseControllerBindings(uint32_t* out, int max, const char* str);
void loadSettings(void);
void saveSettings(void);

#ifdef __cplusplus
}
#endif
