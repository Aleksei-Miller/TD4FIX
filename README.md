# TD4FIX

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-PC%20%7C%20Win32-lightgrey.svg)
![Language](https://img.shields.io/badge/language-C%20%7C%20Smalltalk-orange.svg)
![License](https://img.shields.io/badge/license-GPLv3-green.svg)

**TD4FIX** is an ASI plugin for *Test Drive 4* that fixes technical issues in the original game and adds quality-of-life (QoL) improvements.

---

## 📥 Installation

1. Install the **Standard** and **Glide** versions of the game into the same directory.

   > **Note:** The US version contains the opening intro.
2. Install the **[official 1.2 patch](https://www.patches-scrolls.de/patch/4175/7/52028/download)** (required).
3. Extract the contents of `td4fix.zip` into the game's root directory.
4. Install the **[Microsoft Visual C++ Redistributable 2015–2022](https://aka.ms/vc14/vc_redist.x86.exe)** for the Launcher to work.

> [!TIP]
>
> ### 🎵 Optional: PS1 Music
>
> You can restore the cut OST from the Sony PlayStation 1 version of the game.
>
> Download the audio files in MP3 or OGG format, place them in the `Music` folder in the game directory, and rename them according to the table below:
>
> <details>
> <summary><b>Click to expand the track renaming table</b></summary>
>
> | Original PS1 Track       | Filename in `Music/` |
> | :----------------------- | :------------------- |
> | Opening                  | `Track02`            |
> | Out There Somewhere      | `Track03`            |
> | BGM                      | `Track04`            |
> | Frenzy                   | `Track05`            |
> | Here I Come              | `Track06`            |
> | Keep the Beat            | `Track07`            |
> | Keswick, England         | `Track08`            |
> | Kyoto, Japan             | `Track09`            |
> | San Francisco, USA       | `Track10`            |
> | Washington DC, USA (Alt) | `Track11`            |
> | Washington DC, USA       | `Track12`            |
> | Bern, Switzerland (Alt)  | `Track13`            |
> | Bern, Switzerland        | `Track14`            |
> | Keswick, England (Alt)   | `Track15`            |
>
> </details>
>
> In the **Launcher**, open the `Fix` tab and enable:
>
> * [x] **Ext. CD tracks**
> * [x] **Level music order**

---

## 🚀 Launching the Game

For quick access to the desired renderer, use the included BAT scripts in the game directory:

* **`SW.bat`** — launches the software-rendered version (**Software Render** / `2.EXE`).
* **`HW.bat`** — launches the hardware-accelerated version (**Hardware / Glide** / `3.EXE`).

---

## ✨ Changes (v1.0)

### 🛠️ Fixes

* **Graphics and Camera:**

  * Fixed the game's aspect ratio.
  * Fixed viewport scaling to 640×480 in Software Render.
  * Fixed camera position and zoom at the start of a race and across all camera views in Software Render.

* **Stability and Settings:**

  * Fixed a game crash on startup (solution based on the [zeus-software patch](https://www.zeus-software.com/files/nglide/td4_patch.zip)).
  * Fixed saving of game settings (`timer`, `traffic`, `mph/kph`).

* **Audio and Interface:**

  * Restored support for the cut PS1 music and fixed the track order for each level.
  * Restored the ability to change the game language in the settings.
  * Fixed the horn so that it responds to the first button press.
  * Fixed `ESC` / Back and `Enter` / Select behavior in submenus. They now return to the previous menu level instead of the main menu.
  * Added joystick support to the pause menu.
  * `Options -> Configure joystick` now automatically selects the currently active device.

### 🚀 New Features

* Full remapping of keyboard keys, controller buttons, axes, and POV controls.
* Adjustable steering sensitivity (`sensitivity`) and deadzone (`deadzone`).
* Fast skipping of startup logos.
* Built-in **No-CD** — launch the game without a CD.
* Hotkey for resetting the car onto the track (**Respawn car**).
* In-car directional look controls (**Look Left / Look Right / Look Back**).

---

## ⚙️ INI Configuration

> [!NOTE]
> All `td4fix.ini` parameters can be configured conveniently through the **Launcher** included with the archive. Manual editing is only required for fine-tuning individual parameters.

| INI Key           | Description                                     |
| :---------------- | :---------------------------------------------- |
| `SkipLogo`        | Skip startup logos                              |
| `StartupCrash`    | Bypass the startup crash                        |
| `NoCD`            | Bypass the CD check                             |
| `ExtCDTracks`     | Enable cut tracks from the PS1 version          |
| `LevelMusicOrder` | Fix the music playback order for each level     |
| `Frontend`        | Collection of menu and navigation fixes         |
| `Input`           | Improved keyboard and controller input handling |
| `Camera`          | Camera position and behavior fixes              |

---

## 🎮 Controls Configuration

### Keyboard

Keyboard bindings use **DirectInput (DIK)** key codes.

Set a value to `0` to disable a key binding.

| INI Key                               | Function                 |        Default (DIK_*)        |
| :------------------------------------ | :----------------------- | :---------------------------: |
| `Up` / `Down` / `Left` / `Right`      | Menu navigation          | `200` / `208` / `203` / `205` |
| `Accelerate` / `Brake`                | Throttle / Brake         |         `200` / `208`         |
| `TurnLeft` / `TurnRight`              | Steering (left / right)  |         `203` / `205`         |
| `GearUp` / `GearDown`                 | Gear shifting            |          `30` / `44`          |
| `Horn`                                | Horn                     |              `35`             |
| `Camera`                              | Change camera view       |            `46`               |
| `Respawn`                             | Reset car onto the track |            `19`               |
| `LookLeft` / `LookRight` / `LookBack` | Look around (hold)       |       `16` / `18` / `33`      |
| `NextCdTrack` / `PrevCdTrack`         | Change CD track          |          `13` / `12`          |

---

### Controller / Wheel

Controller bindings are configured in the `[Controller]` section using the `<type>:<value>` format. Multiple bindings can be separated by spaces.

| Type            | Format                    | Example        |
| :-------------- | :------------------------ | :------------- |
| **Button**      | `B:N` (1–16)              | `B:1`          |
| **Axis**        | `A:X/Y/Z/R/U/V` + `-`/`+` | `A:Z-`, `A:U+` |
| **POV (D-pad)** | `P:UP/DOWN/LEFT/RIGHT`    | `P:LEFT`       |

Additional parameters:

* `Id` — device index, starting from `0`.
* `SteerSensitivity` — steering sensitivity.
* `SteerDeadzone` — steering deadzone.

---

## 🛠️ Building

The project is compiled using the **Tiny C Compiler (TCC)**:

```cmd
tcc.exe src/main.c src/settings.c src/platform.c src/input.c
```

**Build requirements:**

* [x] `tcc.exe` is added to the system `PATH`.
* [x] `MinHook.x86.dll` is present in the game directory.

---

## 🔍 Compatibility

* **`3.EXE` (Glide)** — hardware-accelerated version, launched via `HW.bat`.
* **`2.EXE` (DirectDraw)** — software-rendered version, launched via `SW.bat`.

> **Important:** Both EXE files must be original Retail releases with the official 1.2 patch installed.

---

## 🛠️ Technologies and Libraries

### 🔩 Compilation, Languages and Emulation

* [Tiny C Compiler](https://bellard.org/tcc) — lightweight and fast C compiler.
* [Dolphin Smalltalk](https://github.com/dolphinsmalltalk/Dolphin) —  an IDE for Smalltalk development on Windows.
* [MinHook](https://github.com/tsudakageyu/minhook) — API hooking library.
* [dgVoodoo 2](https://dege.freeweb.hu/dgVoodoo2) — Glide/Direct3D wrapper.
* [DxWnd](https://dxwnd.org) — API hooking and redirection utility.

### 🔍 Reverse Engineering and Research

* [IDA Pro](https://hex-rays.com/ida-pro) / [IDA Pro MCP](https://github.com/mrexodia/ida-pro-mcp) — interactive disassembler and analysis tools.
* [Frida](https://github.com/frida/frida) / [Frida MCP](https://github.com/dnakov/frida-mcp) — dynamic analysis and debugging.
* [Cheat Engine](https://www.cheatengine.org) — memory analysis and address searching.

### 🤖 AI and Development

* **OpenCode (DeepSeek)** — AI-assisted development.
 
---

## ⚖️ Legal Notice

TD4FIX is an independent, community-made project and is **not affiliated with, endorsed by, or sponsored by** the copyright and trademark holders of *Test Drive 4* or its associated brands.

*Test Drive 4*, its name, logos, trademarks, game assets, executable files, music, and other original content remain the property of their respective copyright and trademark holders. This project does **not** claim ownership of any third-party intellectual property.

TD4FIX is intended to modify and enhance a legally obtained copy of the original game. Users are responsible for obtaining and using the original game files and any required patches in accordance with applicable laws and the terms under which those files are distributed.

The TD4FIX project does not distribute the original *Test Drive 4* game, copyrighted game assets, or unauthorized copies of proprietary files. Any references to third-party software, patches, libraries, trademarks, or product names are provided solely for identification, compatibility, and development purposes.

Third-party software and libraries used by or referenced in this project remain subject to their respective licenses. Their inclusion in this project does not imply that TD4FIX owns or relicenses those components.

TD4FIX is provided **"as is"**, without warranties of any kind, express or implied, including, but not limited to, warranties of compatibility, reliability, availability, or fitness for a particular purpose. Use of TD4FIX is at your own risk.

The authors and contributors are not responsible for any damage, data loss, crashes, hardware issues, software issues, or other consequences resulting from the use or misuse of this project.

All trademarks, service marks, and product names mentioned in this repository belong to their respective owners.

### 📄 License

Unless otherwise stated, the original source code of TD4FIX is released under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html).

See the `LICENSE` file for the full license text.

