#include <windows.h>
#include <stdint.h>
#include <string.h>

#include "ingame.h"
#include "settings.h"
#include "platform.h"

extern int g_currentRender;
extern void readMemory(const void* address, void* data, size_t size);
extern void writeMemory(const void* address, const void* data, size_t size);
extern void writeMemoryNop(const void* address, size_t size);

static const uint32_t s_vpPatchAddrs[6] = { 0x4411B7, 0x4411BE, 0x4411D8, 0x4411E7, 0x441221, 0x44123B };
static const uint8_t  s_vpPatchVals[6] = { 0x20, 0x28, 0x28, 0x20, 0x20, 0x28 };
static uint8_t  s_vpOrigBytes[6];
static uint8_t  s_vpOrigJmp[5];
static LPVOID   s_vpTramp = NULL;
static int      s_vpApplied = 0;

static void viewportApply(void)
{
	int i;
	for (i = 0; i < 6; i++)
		writeMemory((void*)s_vpPatchAddrs[i], &s_vpPatchVals[i], 1);

	uint8_t jmp[5] = {0xE9};
	*(int32_t*)(jmp + 1) = (int32_t)s_vpTramp - (0x441199 + 5);
	writeMemory((void*)0x441199, jmp, 5);

	s_vpApplied = 1;
}

static void viewportRestore(void)
{
	int i;
	for (i = 0; i < 6; i++)
		writeMemory((void*)s_vpPatchAddrs[i], &s_vpOrigBytes[i], 1);

	writeMemory((void*)0x441199, s_vpOrigJmp, 5);

	s_vpApplied = 0;
}

void fixViewport(void)
{
	if (g_currentRender == RENDER_GLIDE)
		return;

	int i;
	for (i = 0; i < 6; i++)
		readMemory((void*)s_vpPatchAddrs[i], &s_vpOrigBytes[i], 1);
	readMemory((void*)0x441199, s_vpOrigJmp, 5);

	if (!s_vpTramp)
	{
		s_vpTramp = VirtualAlloc(NULL, 64, MEM_COMMIT, PAGE_EXECUTE_READWRITE);
		if (!s_vpTramp) return;

		uint8_t code[64];
		uint32_t off = 0;

		code[off++] = 0xC7; code[off++] = 0x05;
		*(uint32_t*)(code + off) = 0x007EE318; off += 4;
		*(uint32_t*)(code + off) = 0x280; off += 4;

		code[off++] = 0xC7; code[off++] = 0x05;
		*(uint32_t*)(code + off) = 0x007EE32C; off += 4;
		*(uint32_t*)(code + off) = 0x1E0; off += 4;

		code[off++] = 0xDD; code[off++] = 0x05;
		*(uint32_t*)(code + off) = 0x007EE318; off += 4;

		code[off++] = 0xE9;
		*(int32_t*)(code + off) = (int32_t)0x44119F - ((int32_t)s_vpTramp + off + 4); off += 4;

		memcpy(s_vpTramp, code, off);
	}
}

void fixViewportUpdate(void)
{
	if (g_currentRender == RENDER_GLIDE)
		return;

	if (*g_plat.screenResolution != 0)
	{
		if (!s_vpApplied)
			viewportApply();
	}
	else
	{
		if (s_vpApplied)
			viewportRestore();
	}
}

void fixCamera(void)
{
    if (g_currentRender == RENDER_SOFTWARE)
    {
        static const int16_t zoomAdd[12] = {
            690,   520,  360,  300,  250,  210,
            0,     0,    310,  1500, 300,  -1840
        };

        for (int i = 0; i < 12; i++)
        {
            uint16_t d = g_plat.camera->views[i].distance + zoomAdd[i];
            writeMemory((void*)&g_plat.camera->views[i].distance, &d, sizeof(d));
        }

		//Disable last rotation camera for start camera
        writeMemoryNop((void*)0x408301, 10);
    }
    else
    {
        uint16_t d = 1600;
		writeMemory((void*)&g_plat.camera->views[11].distance, &d, sizeof(d));
		
		//Disable last rotation camera for start camera
        writeMemoryNop((void*)0x40852C, 10);
    }
}

void fixCockpit(void)
{
    if (g_currentRender == RENDER_GLIDE)
        writeMemoryNop((void*)0x41AFDA, 9);
    else
        writeMemoryNop((void*)0x41B777, 9);
}
