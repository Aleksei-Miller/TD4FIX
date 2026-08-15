// 3.EXE (Glide) address initializers — include inside platInit()
    p->kbDev         = (void**)0x777E40;
    p->kbState       = (uint8_t*)0x777880;
    p->kbAcq         = (int*)0x777E3C;

    p->pauseNav      = (volatile uint16_t*)0x777E50;
    p->feKeys        = (volatile uint16_t*)0x4672BC;
    p->sysKeys       = (volatile uint16_t*)0x4672C2;
    p->edgeKeys      = (volatile uint16_t*)0x4672C4;
    p->outAct        = (volatile uint16_t*)0x46DE4A;

    p->gamePaused    = (volatile uint8_t*)0x66E8CA;

    p->pitchAddr     = (volatile uint32_t*)0x46ADFC;
    p->countdownAddr = (volatile int*)0x767408;
    p->finishAddr    = (volatile int*)0x7673F4;
    p->orbitAddr     = 0;
    p->dirAddr       = 0;

    p->ctlType       = (volatile int*)0x459554;

    p->cfgInvertFlag    = (const uint8_t*)0x459528;

    p->cdPlay        = (int(__cdecl*)(int))0x43C49B;
    p->cdTrack       = (volatile int*)0x778490;
    p->cdCounter     = (volatile uint32_t*)0x776978;
    p->cdEnabled     = (volatile uint8_t*)0x45AECB;

    p->gameState     = (volatile uint32_t*)0x778D9C;
    p->isIngame      = (volatile uint32_t*)0x66E880;
    p->isDemoMode    = (volatile uint32_t*)0x45A679;
    p->pauseToggle   = (volatile uint8_t*)0x75F16C;

    p->horScale      = (float*)0x78C21C;
    p->verScale      = (float*)0x78C218;

    p->kphFlag       = (volatile uint8_t*)0x459722;
    p->timerFlag     = (volatile uint8_t*)0x464520;
    p->trafficFlag   = (volatile uint8_t*)0x459723;

    p->fe.type   = (volatile uint32_t*)0x77695C;
    p->fe.index  = (volatile uint32_t*)0x4646CB;
    p->fe.count  = (volatile uint32_t*)0x4646DB;

    p->selectedDevice      = (volatile uint8_t*)0x77523F;
    p->selectedDeviceLayout = (volatile uint8_t*)0x775240;
    p->screenResolution    = (volatile uint8_t*)0x464487;
    p->screenResolutionCfg = (volatile uint8_t*)0x775241;

    p->carIdx = (volatile int*)0x459789;
    p->carBase = (uint8_t*)0x46AE10;
    p->respawnFunc = (void(__cdecl*)(uint8_t*))0x42D9DB;
    p->policeFlag = (volatile int*)0x46A948;
    p->policeCaught = (volatile int*)0x46A268;

    p->levelId = (volatile int*)0x45A675;
    p->raceType = (volatile int*)0x4644B9;
    p->raceIndex = (volatile uint32_t*)0x776960;
    p->selectedLevel = (volatile uint8_t*)0x4644BD;
    p->selectedCar = (volatile uint8_t*)0x77854A;
    p->zoomTarget = (volatile uint32_t*)0x46ADDC;

    p->camera = (volatile Camera*)0x4593C0;
    p->isDrinkingCamera = (volatile uint8_t*)0x45A689;

    p->backTarget = (volatile uint32_t*)0x46ADF0;
