// 2.EXE (DirectDraw) address initializers — include inside platInit()
    p->kbDev         = (void**)0x7E24D0;
    p->kbState       = (uint8_t*)0x7E1F10;
    p->kbAcq         = (int*)0x7E24CC;

    p->pauseNav      = (volatile uint16_t*)0x7E24E0;
    p->feKeys        = (volatile uint16_t*)0x46AEC8;
    p->sysKeys       = (volatile uint16_t*)0x46AECE;
    p->edgeKeys      = (volatile uint16_t*)0x46AED0;
    p->outAct        = (volatile uint16_t*)0x471E4A;

    p->gamePaused    = (volatile uint8_t*)0x6B28A5;

    p->pitchAddr     = 0;
    p->countdownAddr = (volatile int*)0x7D3000;
    p->finishAddr    = (volatile int*)0x7D2FEC;
    p->orbitAddr     = 0;
    p->dirAddr       = (volatile uint32_t*)0x46EDD8;

    p->ctlType       = (volatile int*)0x45D17C;

    p->cfgInvertFlag    = (const uint8_t*)0x45D150;

    p->cdPlay        = (int(__cdecl*)(int))0x43C359;
    p->cdTrack       = (volatile int*)0x7E2B08;
    p->cdCounter     = (volatile uint32_t*)0x7E1304;
    p->cdEnabled     = (volatile uint8_t*)0x45EADB;

    p->gameState     = (volatile uint32_t*)0x7E3424;
    p->isIngame      = (volatile uint32_t*)0x6B2868;
    p->isDemoMode    = (volatile uint32_t*)0x45E287;
    p->pauseToggle   = (volatile uint8_t*)0x7A0D57;

    p->horScale      = (float*)0x7EE338;
    p->verScale      = (float*)0x7EE334;

    p->kphFlag       = (volatile uint8_t*)0x45D34A;
    p->timerFlag     = (volatile uint8_t*)0x468130;
    p->trafficFlag   = (volatile uint8_t*)0x45D34B;

    p->fe.type   = (volatile uint32_t*)0x7E1308;
    p->fe.index  = (volatile uint32_t*)0x4682D7;
    p->fe.count  = (volatile uint32_t*)0x4682E7;
	
    p->selectedDevice      = (volatile uint8_t*)0x7DFBDB;
    p->selectedDeviceLayout = (volatile uint8_t*)0x7DFBDC;
    p->screenResolution    = (volatile uint8_t*)0x468097;
    p->screenResolutionCfg = (volatile uint8_t*)0x7DFBDD;

    p->carIdx = (volatile int*)0x45D3C3;
    p->carBase = (uint8_t*)0x46EE10;
    p->respawnFunc = (void(__cdecl*)(uint8_t*))0x42E09A;
    p->policeFlag = (volatile int*)0x46A948;
    p->policeCaught = (volatile int*)0x46A268;

    p->levelId = (volatile int*)0x45E283;
    p->raceType = (volatile int*)0x4680C9;
    p->raceIndex = (volatile uint32_t*)0x7E12FC;
    p->selectedLevel = (volatile uint8_t*)0x4680CD;
    p->selectedCar = (volatile uint8_t*)0x7E2BCB;
    p->zoomTarget = (volatile uint32_t*)0x46EDE8;

    p->camera = (volatile Camera*)0x45CFE8;
    p->isDrinkingCamera = (volatile uint8_t*)0x45E297;

    p->backTarget = (volatile uint32_t*)0x46EDFC;
