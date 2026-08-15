#include <windows.h>
#include <stdint.h>

#include "frontend.h"
#include "settings.h"
#include "platform.h"

extern int g_currentRender;
extern void writeMemory(const void* address, const void* data, size_t size);
extern void writeMemoryNop(const void* address, size_t size);


void fixStartupCrash(void)
{
	(g_currentRender == RENDER_GLIDE) ? writeMemoryNop((void*)0x43DFEA, 2) : writeMemoryNop((void*)0x43DF72, 2);
}

void fixOptions(void)
{
	uint8_t val = 0;

	uint32_t menu_type = 0;
	uint32_t sprite40 = 0x000B2E20;

	val = g_settings.isKph ? 1 : 0;
	*g_plat.kphFlag = val;

	val = g_settings.timer ? 1 : 0;
	*g_plat.timerFlag = val;

	val = g_settings.traffic ? 1 : 0;
	*g_plat.trafficFlag = val;

	if (g_currentRender == RENDER_GLIDE)
	{
		writeMemory((void*)0x463BCC, &sprite40, sizeof(sprite40));
		writeMemory((void*)0x43485D, &menu_type, sizeof(menu_type));

		menu_type = 6;

		writeMemory((void*)0x434D79, &menu_type, sizeof(menu_type));
		writeMemory((void*)0x434AA5, &menu_type, sizeof(menu_type));
		writeMemory((void*)0x434AB8, &menu_type, sizeof(menu_type));
		writeMemory((void*)0x434891, &menu_type, sizeof(menu_type));
	}
	else
	{
		writeMemory((void*)0x4677DC, &sprite40, sizeof(sprite40));
		writeMemory((void*)0x434D3B, &menu_type, sizeof(menu_type));

		menu_type = 6;

		writeMemory((void*)0x435257, &menu_type, sizeof(menu_type));
		writeMemory((void*)0x434F83, &menu_type, sizeof(menu_type));
		writeMemory((void*)0x434F96, &menu_type, sizeof(menu_type));
		writeMemory((void*)0x434D6F, &menu_type, sizeof(menu_type));
	}
}

void skipLogo(void)
{
	uint8_t val = 1;

	(g_currentRender == RENDER_GLIDE) ? writeMemory((void*)0x467425, &val, sizeof(val)) : writeMemory((void*)0x46AFAD, &val, sizeof(val));
}


