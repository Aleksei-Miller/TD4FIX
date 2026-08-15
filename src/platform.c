#include <windows.h>
#include "platform.h"

Platform g_plat = {0};

void platInit(void)
{
    Platform* p = &g_plat;

    if (g_currentRender == RENDER_GLIDE)
    {
        #include "addr_3exe.h"
    }
    else
    {
        #include "addr_2exe.h"
    }
}
