#include <windows.h>
#include <stdint.h>

#include "cdaudio.h"
#include "platform.h"

#define NUM_CD_TRACKS 14

//Music tracks
#define KESWICK 8
#define ALT_KESWICK 15
#define SF 10
#define ALT_SF 10
#define BERN 14
#define ALT_BERN 13
#define KYOTO 9
#define ALT_KYOTO 9
#define WASHINGTON 12
#define ALT_WASHINGTON 11
#define MUNICH 6
#define ALT_MUNICH 6
#define DRAG_RACING 9


extern int g_currentRender;
extern void writeMemory(const void* address, const void* data, size_t size);

int g_numCDTracks = 0;

static void __cdecl cdRaceIntercept(int gameTrack)
{
    (void)gameTrack;
    int level = *g_plat.levelId;
	
    static const uint8_t map[] = { KESWICK, SF, BERN, KYOTO, WASHINGTON, MUNICH, 
								  ALT_KESWICK, ALT_SF, ALT_BERN, ALT_KYOTO, ALT_WASHINGTON, ALT_MUNICH, 
								  DRAG_RACING };
	
    int track = 0;
    if (level >= 0 && level < 13 && map[level])
        track = map[level];
    else
        track = (*g_plat.cdCounter % NUM_CD_TRACKS) + 2;
    g_plat.cdPlay(track);
}

void fixRaceCDPlay(void)
{
    uint8_t call[5];
    call[0] = 0xE8;

    if (g_currentRender == RENDER_GLIDE) {
        *(int32_t*)(call + 1) = (uint8_t*)cdRaceIntercept - (uint8_t*)0x43CCED - 5;
        writeMemory((void*)0x43CCED, call, 5);
    } else {
        *(int32_t*)(call + 1) = (uint8_t*)cdRaceIntercept - (uint8_t*)0x43CB78 - 5;
        writeMemory((void*)0x43CB78, call, 5);
    }
}

void fixNumCDTracks(void)
{
	uint8_t count = NUM_CD_TRACKS;
	g_numCDTracks = (int)count;

	uint8_t mciFlags = 0x05;

    if (count > 1)
	{
		if (g_currentRender == RENDER_GLIDE)
		{
			writeMemory((void*)0x4310FA, &count, sizeof(count));
			writeMemory((void*)0x43CCD5, &count, sizeof(count));
			writeMemory((void*)0x43C5AB, &mciFlags, sizeof(mciFlags));
		}
		else
		{
			writeMemory((void*)0x431720, &count, sizeof(count));
			writeMemory((void*)0x43CB60, &count, sizeof(count));
			writeMemory((void*)0x43C469, &mciFlags, sizeof(mciFlags));
		}
	}
}

void fixNoCD(void)
{
	uint8_t no_check_cd_bytes[] = {0xB8, 0x53, 0x01, 0x00, 0x00};

	if (g_currentRender == RENDER_GLIDE)
		writeMemory((void*)0x43CBFE, no_check_cd_bytes, sizeof(no_check_cd_bytes));
	else
		writeMemory((void*)0x43CAA7, no_check_cd_bytes, sizeof(no_check_cd_bytes));
}
