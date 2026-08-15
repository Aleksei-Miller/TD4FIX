#ifdef __cplusplus
extern "C" {
#endif

#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h>

#include <dinput.h>

#include "platform.h"
#include "settings.h"
#include "input.h"
#include "frontend.h"
#include "ingame.h"
#include "cdaudio.h"

int g_currentRender = 0;
HMODULE g_hModule = NULL;

#define TD4_CRC_2EXE_V12 0xD418576Au
#define TD4_CRC_3EXE_V12 0x07B8FE17u
#define TD4_CRC_2EXE_V10 0xFDCD999Bu
#define TD4_CRC_3EXE_V10 0xA5992F1Du

static uint32_t s_crc32Table[256];
static int s_crc32Ready = 0;

static void crc32Init(void)
{
	int i, k;
	for (i = 0; i < 256; i++)
	{
		uint32_t c = (uint32_t)i;
		for (k = 0; k < 8; k++)
			c = (c & 1) ? (0xEDB88320u ^ (c >> 1)) : (c >> 1);
		s_crc32Table[i] = c;
	}
	s_crc32Ready = 1;
}

static uint32_t crc32File(const char* path)
{
	HANDLE h;
	DWORD rd;
	BYTE buf[8192];
	uint32_t crc = 0xFFFFFFFFu;

	if (!s_crc32Ready)
		crc32Init();

	h = CreateFileA(path, GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, 0, NULL);
	if (h == INVALID_HANDLE_VALUE)
		return 0;

	for (;;)
	{
		if (!ReadFile(h, buf, sizeof(buf), &rd, NULL) || rd == 0)
			break;
		{
			DWORD i;
			for (i = 0; i < rd; i++)
				crc = s_crc32Table[(crc ^ buf[i]) & 0xFF] ^ (crc >> 8);
		}
	}

	CloseHandle(h);
	return crc ^ 0xFFFFFFFFu;
}


void readMemory(const void* address, void* data, const size_t size)
{
	DWORD old_protect;
	VirtualProtect((LPVOID)address, size, PAGE_READONLY, &old_protect);
	memcpy(data, (void*)address, size);
	VirtualProtect((LPVOID)address, size, old_protect, &old_protect);
}

void writeMemory(const void* address, const void* data, const size_t size)
{
    DWORD old_protect;
    VirtualProtect((LPVOID)address, size, PAGE_READWRITE, &old_protect);
    memcpy((void*)address, data, size);
    VirtualProtect((LPVOID)address, size, old_protect, &old_protect);
}

void writeMemoryNop(const void* address, const size_t size)
{
    DWORD old_protect;
    VirtualProtect((LPVOID)address, size, PAGE_READWRITE, &old_protect);

	uint8_t nop[16];
	memset(nop, 0x90, (size <= sizeof(nop)) ? size : sizeof(nop));

    memcpy((void*)address, nop, size);
    VirtualProtect((LPVOID)address, size, old_protect, &old_protect);
}

void toLog(const char* msg)
{
	static FILE* logF = NULL;
	if (!logF)
	{
		char path[MAX_PATH] = {0};
		GetModuleFileNameA(g_hModule, path, MAX_PATH);
		
		char exePath[MAX_PATH] = {0};
		GetModuleFileNameA(NULL, exePath, MAX_PATH);
		
		char* p = strrchr(path, '.');
		if (p) strcpy(p, ".log");
		
		logF = fopen(path, "w+");
		if (logF)
		{
			fprintf(logF, "%s\n", exePath);
			fflush(logF);
		}
	}
	
	if (logF)
	{
		SYSTEMTIME st;
		GetLocalTime(&st);
		fprintf(logF, "[%02d.%02d.%04d %02d:%02d] %s\n",
			st.wDay, st.wMonth, st.wYear, st.wHour, st.wMinute, msg);
		fflush(logF);
	}
}

DWORD WINAPI timerDisplayThread(LPVOID lpParam)
{
    (void)lpParam;

    uint32_t screenWidth = GetSystemMetrics(SM_CXSCREEN);
    uint32_t screenHeight = GetSystemMetrics(SM_CYSCREEN);
	
	float verScale = 1.0f;
	float horScale = 1.0f;
	
    if (screenWidth >= 640 && screenHeight >= 480)
	{
        horScale = (4.0f * (float)screenHeight) / (3.0f * (float)screenWidth);
		
		if (g_currentRender == RENDER_SOFTWARE)
			horScale -= 0.06;
	}
	
    while (true)
    {
        Sleep(10);

		if (*g_plat.isDrinkingCamera == 0)
		{
			*g_plat.horScale = horScale;
			*g_plat.verScale = verScale;
		}

		if (g_settings.viewport)
			fixViewportUpdate();
    }

    return 0;
}

DWORD WINAPI timerFrontendMenuThread(LPVOID lpParam)
{
    (void)lpParam;
	static int s_lastMenuType = 0;
	
    while (true)
    {
		Sleep(10);
				
        if (*g_plat.gameState != GAME_STATE_FRONTEND)
            continue;
		
		// FAIL menu → track 4 (once on entry, not every 10ms)
		int isFail = (*g_plat.fe.type >= FRONTEND_MENU_FAILED_TO_WIN_TD4_CUP &&
		             *g_plat.fe.type <= FRONTEND_MENU_FAILED_TO_WIN_TD4_CUP4);
					 
		int wasFail = (s_lastMenuType >= FRONTEND_MENU_FAILED_TO_WIN_TD4_CUP &&
		              s_lastMenuType <= FRONTEND_MENU_FAILED_TO_WIN_TD4_CUP4);
					  
		if (isFail && !wasFail)
			g_plat.cdPlay(4);
		
		//Fix button "Escape"
		uint32_t menu = FRONTEND_MENU_MAIN;
				
		switch (*g_plat.fe.type) {
			//Race
			case FRONTEND_MENU_SELECT_TRACK:
			{
				menu = FRONTEND_MENU_RACE;					
				break;
			}			
			case FRONTEND_MENU_SELECT_CAR_START:
			case FRONTEND_MENU_SELECT_CAR_END:
			{
				menu = (*g_plat.raceType == RACE_TYPE_SINGLE) ? FRONTEND_MENU_SELECT_TRACK : FRONTEND_MENU_RACE;
				break;
			}
			case FRONTEND_MENU_TRANSMISSION:
			{
				menu = FRONTEND_MENU_SELECT_CAR_START;
				break;
			}
			
			//Options
			case FRONTEND_MENU_GAME_OPTIONS:
			case FRONTEND_MENU_DISPLAY:
			case FRONTEND_MENU_AUDIO:
			case FRONTEND_MENU_LOAD_SAVE:
				menu = FRONTEND_MENU_OPTIONS;
				break;
			//Controller
			case FRONTEND_MENU_CONTROLLER_CONFIG:
			{
				menu = FRONTEND_MENU_OPTIONS;
				
				//Previously selected device
				if (*g_plat.fe.type != s_lastMenuType)
				{
					Sleep(90);
					*g_plat.fe.index = *g_plat.selectedDevice;					
				}

				break;
			}				
			//Load/Save
			case FRONTEND_MENU_SAVE:
			case FRONTEND_MENU_LOAD:
				menu = FRONTEND_MENU_LOAD_SAVE;
				break;
				
			//Network
			case FRONTEND_MENU_SERIAL_HOST:
				menu = FRONTEND_MENU_HOST_JOIN_SESSION;
				break;
			case FRONTEND_MENU_HOST_JOIN_SESSION:
				menu = FRONTEND_MENU_NETWORK;
				break;
				
			default:
			{
				menu = FRONTEND_MENU_MAIN;
				break;		
			}
		}
		
		if (g_currentRender == RENDER_GLIDE)
			writeMemory((void*)0x433530, &menu, sizeof(menu));
		else
			writeMemory((void*)0x433A0B, &menu, sizeof(menu));
		
		s_lastMenuType = *g_plat.fe.type;
    }

    return 0;
}

DWORD WINAPI timerFrontendOptionsThread(LPVOID lpParam)
{
    (void)lpParam;

	static bool changed = false;
	
    while (true)
    {
        Sleep(500);
        
        if (*g_plat.fe.type == FRONTEND_MENU_GAME_OPTIONS)
        {
            
            if ((bool) *g_plat.kphFlag != g_settings.isKph) 
			{
				g_settings.isKph = *g_plat.kphFlag; 
				changed = true; 
			}
			
            if ((bool) *g_plat.timerFlag != g_settings.timer) 
			{ 
				g_settings.timer = *g_plat.timerFlag; 
				changed = true; 
			}
			
            if ((bool) *g_plat.trafficFlag != g_settings.traffic) 
			{
				g_settings.traffic = *g_plat.trafficFlag; 
				changed = true; 
			}
        }

        if (changed)
            saveSettings();
    }

    return 0;
}

BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
{
    (void)lpReserved;

    switch (ul_reason_for_call)
    {
        case DLL_PROCESS_ATTACH:
        {
			g_hModule = hModule;
			
			char exePath[MAX_PATH];
			GetModuleFileNameA(NULL, exePath, MAX_PATH);
			char* p = strrchr(exePath, '\\');
			char* exeBase = p ? p + 1 : exePath;

			//Skip intro
			if (strcmp(exeBase, "1.EXE") == 0)
				return FALSE;
			
			//3.exe or 2.exe
			g_currentRender = GetModuleHandleA("glide2x.dll") != NULL ? 1 : 0;
			
			//Check exe
			uint32_t crc = crc32File(exePath);
			
			if (crc == TD4_CRC_2EXE_V10 || crc == TD4_CRC_3EXE_V10)
			{
				char msg[] = "Game version 1.0 is not supported.\n\n"
							 "Please install the official v1.2 patch and restart the game.";
				
				MessageBoxA(NULL, 
							msg, 
							"TD4FIX: game version check", 
							MB_OK | MB_ICONERROR | MB_SETFOREGROUND | MB_TOPMOST);
				
				char buf[255] = {0};
				sprintf(buf, "Error: Unsupported game version 1.0 detected. CRC: %#X\n", crc);
				toLog(buf);
				
				return FALSE;
			}
											
			if (crc != TD4_CRC_2EXE_V12 && crc != TD4_CRC_3EXE_V12)
			{
				char msg[] = "Modified binaries are not supported.\n\n"
							 "Please restore the original v1.2 executable and restart the game.";
							 
				MessageBoxA(NULL, 
							msg, 
							"TD4FIX: game version check", 
							MB_OK | MB_ICONERROR | MB_SETFOREGROUND | MB_TOPMOST);
							
				char buf[255] = {0};
				snprintf(buf, sizeof(buf), "Error: Unsupported game version detected! CRC: %#X\n", crc);
				toLog(buf);	
				
				return FALSE;
			}
			
			//Init
			loadSettings();
			platInit();
			
			//Apply settings
			if (g_settings.startupCrash)
				fixStartupCrash();

			if (g_settings.noCD)
				fixNoCD();

			if (g_settings.viewport)
				fixViewport();

			if (g_settings.camera)
				fixCamera();

			if (g_settings.extCDTracks) {
				fixNumCDTracks();
				if (g_settings.levelMusicOrder)
					fixRaceCDPlay();
			}

			if (g_settings.input)
				fixInputHook();

			if (g_settings.skipLogo)
				skipLogo();


			Sleep(100);
			
			if (g_settings.viewport)
				CreateThread(NULL, 0, timerDisplayThread, NULL, 0, NULL);

			if (g_settings.frontend)
			{
				fixOptions();
				
				CreateThread(NULL, 0, timerFrontendOptionsThread, NULL, 0, NULL);
				CreateThread(NULL, 0, timerFrontendMenuThread, NULL, 0, NULL);
			}
			
			if (g_settings.cockpit)
				fixCockpit();
			
			
            break;
        }
        case DLL_PROCESS_DETACH:
            break;

        case DLL_THREAD_ATTACH:
        case DLL_THREAD_DETACH:
            break;
    }

    return TRUE;
}

#ifdef __cplusplus
}
#endif
