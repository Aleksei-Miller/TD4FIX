#ifdef __cplusplus
extern "C" {
#endif

#include <windows.h>
#include <stdint.h>

typedef struct {
    volatile uint32_t* type;
    volatile uint32_t* index;
    volatile uint32_t* count;
} FrontendMenu;

typedef struct cameraView
{
	uint16_t unk;
	uint16_t isCockpit;
	uint16_t height;
	uint16_t distance;
	uint16_t lookAngle;
	uint16_t xOffset;
	uint16_t yOffset;
	uint16_t zOffset;
}CameraView;

typedef struct camera
{
    uint16_t swing;
    CameraView views[11];
}Camera;

typedef struct {
    void** kbDev;
    uint8_t* kbState;
    int* kbAcq;

    volatile uint16_t* pauseNav;
    volatile uint16_t* feKeys;
    volatile uint16_t* sysKeys;
    volatile uint16_t* edgeKeys;
    volatile uint16_t* outAct;

    volatile uint8_t* gamePaused;

    volatile uint32_t* pitchAddr;
    volatile int* countdownAddr;
    volatile int* finishAddr;
    volatile uint32_t* orbitAddr;
    volatile uint32_t* dirAddr;

    volatile int* ctlType;
    const uint8_t* cfgInvertFlag;

    int (__cdecl* cdPlay)(int);
    volatile int* cdTrack;
    volatile uint32_t* cdCounter;
    volatile uint8_t* cdEnabled;

    volatile uint32_t* gameState;
    volatile uint32_t* isIngame;
    volatile uint32_t* isDemoMode;
    volatile uint8_t* pauseToggle;

    float* horScale;
    float* verScale;

    volatile uint8_t* kphFlag;
    volatile uint8_t* timerFlag;
    volatile uint8_t* trafficFlag;

    FrontendMenu fe;

    volatile uint8_t* selectedDevice;
    volatile uint8_t* selectedDeviceLayout;
    volatile uint8_t* screenResolution;
    volatile uint8_t* screenResolutionCfg;

    volatile int* carIdx;
    uint8_t* carBase;
    void (__cdecl* respawnFunc)(uint8_t*);

    volatile int* policeFlag;
    volatile int* policeCaught;

    volatile int* levelId;
    volatile int* raceType;
    volatile uint32_t* raceIndex;
    volatile uint8_t* selectedLevel;
    volatile uint8_t* selectedCar;
    volatile uint32_t* zoomTarget;
    volatile uint32_t* backTarget;

	volatile Camera* camera;
	volatile uint8_t* isDrinkingCamera;
} Platform;

extern Platform g_plat;

#define RENDER_SOFTWARE 0
#define RENDER_GLIDE   1
extern int g_currentRender;

void platInit(void);

#ifdef __cplusplus
}
#endif
