| package |
package := Package name: 'Test Drive 4'.
package paxVersion: 2.1;
	basicComment: 'Launcher for Test Drive 4'.

package imageStripperBytes: (ByteArray fromBase64String: 'IVNUQiA2IEYWFwAGAAAAU21hbGx0YWxrLkltYWdlU3RyaXBwZXIAAAAAEgEAAAwAAABUZXN0IERy
aXZlIDQSAQAAHwAAAEU6XFRlc3QgRHJpdmUgNCBVU1xMYXVuY2hlci5leGWSAAAAEgEAAAwAAABU
ZXN0IERyaXZlIDQSAQAAGQAAAFVJLkxhdW5jaGVyU2Vzc2lvbk1hbmFnZXLvvyVAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5////AAAAAAAA
AAA=').

package setClassNames: #(
	#{Core.Device}
	#{Core.InputMapping}
	#{Core.InputTokenFormatter}
	#{Core.JoystickCapturer}
	#{Core.LauncherSettingsModel}
	#{UI.DIKeyToText}
	#{UI.LauncherSessionManager}
	#{UI.LauncherSettingsDialog}
	#{UI.LauncherShell}
).

package setPrerequisites: #(
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\Base\Dolphin'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Dialogs\Dolphin Base Dialogs'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Base\Dolphin Basic Geometry'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Presenters\Boolean\Dolphin Boolean Presenter'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Views\Cards\Dolphin Card Containers'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Views\Buttons\Dolphin Check Buttons'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Presenters\Choice\Dolphin Choice Presenter'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Views\Common Controls\Dolphin Common Controls'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Graphics\Dolphin GDI Graphics'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Presenters\Image\Dolphin Image Presenter'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Models\List\Dolphin List Models'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Presenters\List\Dolphin List Presenter'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\System\Filer\Dolphin Literal Filer'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Base\Dolphin MVP Base'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Presenters\Number\Dolphin Number Presenter'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Views\Buttons\Dolphin Push Buttons'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Views\Slider\Dolphin Slider Control'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Views\Static\Text\Dolphin StaticText Control'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\System\Filer\Dolphin STx Filer Core'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Presenters\Text\Dolphin Text Presenter'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Type Converters\Dolphin Type Converters'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Models\Value\Dolphin Value Models'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Gdiplus\Gdiplus'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\MVP\Gdiplus\Gdiplus ImageView'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\System\Win32\Windows Ini Files'
	'C:\Users\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\ActiveX\Shell\Windows Shell'
	'WinMMJoystick'
).

package!

"Class Definitions"!

Core.Object
	subclass: #'Core.InputTokenFormatter'
	instanceVariableNames: ''
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {}!

Core.Object
	subclass: #'Core.JoystickCapturer'
	instanceVariableNames: ''
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {}!

Core.Model
	subclass: #'Core.Device'
	instanceVariableNames: 'id caption'
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {}!

Core.Model
	subclass: #'Core.InputMapping'
	instanceVariableNames: 'id binding altBinding caption displayBinding displayAltBinding'
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {}!

Core.Model
	subclass: #'Core.LauncherSettingsModel'
	instanceVariableNames: 'fixStartupCrash fixNoCD fixFrontend fixInput fixExtCDTracks fixAspectRatio fixCamera fixViewport fixSkipLogo fixLevelMusicOrder cId cDeadzone cSensitivity'
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {}!

UI.Shell
	subclass: #'UI.LauncherShell'
	instanceVariableNames: 'imagePresenter launcherSettingsPresenter originalPresenter settingsButtonPresenter gameDirectory'
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {}!

UI.Dialog
	subclass: #'UI.LauncherSettingsDialog'
	instanceVariableNames: 'startupCrashPresenter noCDPresenter frontendPresenter inputPresenter extCDTracksPresenter aspectRatioPresenter cameraPresenter viewportPresenter skipLogoPresenter levelMusicOrderPresenter settingsModel iniPath cBindingsPresenter cDevListPresenter cDevModel cBindingsModel cDeadzonePresenter cSensitivityPresenter kBindingsPresenter kBindingsModel pendingKeyboardItem cDeadzoneValuePresenter cSensitivityValuePresenter'
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {}!

UI.RuntimeSessionManager
	subclass: #'UI.LauncherSessionManager'
	instanceVariableNames: ''
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {}!

UI.NumberToText
	subclass: #'UI.DIKeyToText'
	instanceVariableNames: ''
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {
			#DI_Keys
				-> (IdentityDictionary withAll: {
								16r1 -> 'ESCAPE'.
								16r2 -> '1'.
								16r3 -> '2'.
								16r4 -> '3'.
								16r5 -> '4'.
								16r6 -> '5'.
								16r7 -> '6'.
								16r8 -> '7'.
								16r9 -> '8'.
								16rA -> '9'.
								16rB -> '0'.
								16rC -> '-'.
								16rD -> '='.
								16rE -> 'BACKSPACE'.
								16rF -> 'TAB'.
								16r10 -> 'Q'.
								16r11 -> 'W'.
								16r12 -> 'E'.
								16r13 -> 'R'.
								16r14 -> 'T'.
								16r15 -> 'Y'.
								16r16 -> 'U'.
								16r17 -> 'I'.
								16r18 -> 'O'.
								16r19 -> 'P'.
								16r1A -> '['.
								16r1B -> ']'.
								16r1C -> 'ENTER'.
								16r1D -> 'LEFT CONTROL'.
								16r1E -> 'A'.
								16r1F -> 'S'.
								16r20 -> 'D'.
								16r21 -> 'F'.
								16r22 -> 'G'.
								16r23 -> 'H'.
								16r24 -> 'J'.
								16r25 -> 'K'.
								16r26 -> 'L'.
								16r27 -> ';'.
								16r28 -> ''''.
								16r29 -> '`'.
								16r2A -> 'LEFT SHIFT'.
								16r2B -> '\'.
								16r2C -> 'Z'.
								16r2D -> 'X'.
								16r2E -> 'C'.
								16r2F -> 'V'.
								16r30 -> 'B'.
								16r31 -> 'N'.
								16r32 -> 'M'.
								16r33 -> ','.
								16r34 -> '.'.
								16r35 -> '/'.
								16r36 -> 'RIGHT SHIFT'.
								16r37 -> 'NUMPAD *'.
								16r38 -> 'LEFT ALT'.
								16r39 -> 'SPACE'.
								16r3A -> 'CAPS LOCK'.
								16r3B -> 'F1'.
								16r3C -> 'F2'.
								16r3D -> 'F3'.
								16r3E -> 'F4'.
								16r3F -> 'F5'.
								16r40 -> 'F6'.
								16r41 -> 'F7'.
								16r42 -> 'F8'.
								16r43 -> 'F9'.
								16r44 -> 'F10'.
								16r45 -> 'NUM LOCK'.
								16r46 -> 'SCROLL LOCK'.
								16r47 -> 'NUMPAD 7'.
								16r48 -> 'NUMPAD 8'.
								16r49 -> 'NUMPAD 9'.
								16r4A -> 'NUMPAD -'.
								16r4B -> 'NUMPAD 4'.
								16r4C -> 'NUMPAD 5'.
								16r4D -> 'NUMPAD 6'.
								16r4E -> 'NUMPAD +'.
								16r4F -> 'NUMPAD 1'.
								16r50 -> 'NUMPAD 2'.
								16r51 -> 'NUMPAD 3'.
								16r52 -> 'NUMPAD 0'.
								16r53 -> 'NUMPAD .'.
								16r56 -> 'OEM 102'.
								16r57 -> 'F11'.
								16r58 -> 'F12'.
								16r64 -> 'F13'.
								16r65 -> 'F14'.
								16r66 -> 'F15'.
								16r70 -> 'KANA'.
								16r73 -> 'ABNT C1'.
								16r79 -> 'CONVERT'.
								16r7B -> 'NOCONVERT'.
								16r7D -> 'YEN'.
								16r7E -> 'ABNT C2'.
								16r8D -> 'NUMPAD ='.
								16r90 -> 'PREVIOUS TRACK'.
								16r91 -> 'AT'.
								16r92 -> 'COLON'.
								16r93 -> 'UNDERLINE'.
								16r94 -> 'KANJI'.
								16r95 -> 'STOP'.
								16r96 -> 'AX'.
								16r97 -> 'UNLABELED'.
								16r99 -> 'NEXT TRACK'.
								16r9C -> 'NUMPAD ENTER'.
								16r9D -> 'RIGHT CONTROL'.
								16rA0 -> 'MUTE'.
								16rA1 -> 'CALCULATOR'.
								16rA2 -> 'PLAY / PAUSE'.
								16rA4 -> 'MEDIA STOP'.
								16rAE -> 'VOLUME DOWN'.
								16rB0 -> 'VOLUME UP'.
								16rB2 -> 'WEB HOME'.
								16rB3 -> 'NUMPAD ,'.
								16rB5 -> 'NUMPAD /'.
								16rB7 -> 'SYS REQ'.
								16rB8 -> 'RIGHT ALT'.
								16rC5 -> 'PAUSE'.
								16rC7 -> 'HOME'.
								16rC8 -> 'UP'.
								16rC9 -> 'PAGE UP'.
								16rCB -> 'LEFT'.
								16rCD -> 'RIGHT'.
								16rCF -> 'END'.
								16rD0 -> 'DOWN'.
								16rD1 -> 'PAGE DOWN'.
								16rD2 -> 'INSERT'.
								16rD3 -> 'DELETE'.
								16rDB -> 'LEFT WINDOWS'.
								16rDC -> 'RIGHT WINDOWS'.
								16rDD -> 'APPLICATIONS'.
								16rDE -> 'POWER'.
								16rDF -> 'SLEEP'.
								16rE3 -> 'WAKE'.
								16rE5 -> 'WEB SEARCH'.
								16rE6 -> 'WEB FAVORITES'.
								16rE7 -> 'WEB REFRESH'.
								16rE8 -> 'WEB STOP'.
								16rE9 -> 'WEB FORWARD'.
								16rEA -> 'WEB BACK'.
								16rEB -> 'MY COMPUTER'.
								16rEC -> 'MAIL'.
								16rED -> 'MEDIA SELECT'
							})
		}!

"End of package definition"!

"Classes"!

Core.InputTokenFormatter guid: (Core.GUID fromString: '{ffa4aa8e-5b19-4f84-9e54-084f67bea01f}')!

Core.InputTokenFormatter comment: 'Stateless helper that turns raw input config tokens into friendly display text. Controller tokens: ''B:1'' -> ''Button 1'', ''P:UP'' -> ''DPad up'', ''A:X-'' -> ''X axis left''. Keyboard bindings: a DirectInput key code string -> key name via DIKeyToText.'!

!Core.InputTokenFormatter methodsFor!

axisTokenDisplay: anAxisToken
	"Answer a friendly name for an axis token ('X-' -> 'X axis left')"

	| axis dir |
	anAxisToken size < 2 ifTrue: [^anAxisToken].
	axis := anAxisToken at: 1.
	dir := anAxisToken at: 2.
	(axis = $X and: [dir = $-]) ifTrue: [^'X axis left'].
	(axis = $X and: [dir = $+]) ifTrue: [^'X axis right'].
	(axis = $Y and: [dir = $-]) ifTrue: [^'Y axis up'].
	(axis = $Y and: [dir = $+]) ifTrue: [^'Y axis down'].
	(axis = $R and: [dir = $-]) ifTrue: [^'R axis left'].
	(axis = $R and: [dir = $+]) ifTrue: [^'R axis right'].
	^(String with: axis), ' axis ', (String with: dir)!

controllerInputDisplay: aToken
	"Answer a friendly display string for a controller config token ('B:1', 'P:UP', 'A:X-'), or the token unchanged"

	| parts kind value |
	parts := aToken subStrings: ':'.
	parts size = 2 ifFalse: [^aToken].
	kind := parts at: 1.
	value := parts at: 2.
	kind = 'B' ifTrue: [^'Button ', value].
	kind = 'P' ifTrue: [
		value = 'UP' ifTrue: [^'DPad up'].
		value = 'DOWN' ifTrue: [^'DPad down'].
		value = 'LEFT' ifTrue: [^'DPad left'].
		value = 'RIGHT' ifTrue: [^'DPad right'].
		^aToken].
	kind = 'A' ifTrue: [^self axisTokenDisplay: value].
	^aToken!

keyNameForDiBinding: aBindingString
	"Answer the display name for a keyboard binding string stored in the INI (a DirectInput key code)"

	^aBindingString isEmpty
		ifTrue: ['']
		ifFalse: [UI.DIKeyToText new leftToRight: aBindingString asNumber]! !

!Core.InputTokenFormatter categoriesForMethods!
axisTokenDisplay:!display!public! !
controllerInputDisplay:!display!public! !
keyNameForDiBinding:!display!public! !
!


Core.JoystickCapturer guid: (Core.GUID fromString: '{3022003a-3a47-4db4-b376-ee00a0d298ca}')!

Core.JoystickCapturer comment: 'Polls the WinMM joystick API to enumerate connected controllers (devices) and to capture the next pressed button, POV hat direction or deflected axis as a config token (''B:<n>'', ''P:<dir>'', ''A:<axis><+|->''). captureFor: blocks until something is pressed or a 10 second timeout elapses. Used by the controller bindings capture in the settings dialog.'!

!Core.JoystickCapturer methodsFor!

axisToken: axis value: v
	"Answer a config token (e.g. 'A:X-') for an axis deflected to position v"

	^'A:', axis, (v < 32768 ifTrue: ['-'] ifFalse: ['+'])!

buttonToken: buttons
	"Answer the config token (e.g. 'B:3') for the first pressed joystick button given its WinMM bit mask"

	| i |
	i := 0.
	[(buttons anyMask: (1 bitShift: i))] whileFalse: [i := i + 1].
	^'B:', (i + 1) printString!

captureFor: aControllerId
	"Poll the WinMM joystick for the next pressed button, POV or deflected axis and
	answer the config token ('B:<n>', 'P:UP' etc, 'A:<axis><+|->'); answer nil if nothing is
	pressed within the timeout, or when no joystick is selected"

	| lib info baseX baseY baseZ baseR baseU baseV t0 buttons pov v |
	aControllerId isNil ifTrue: [^nil].
	lib := OS.WinMMLibrary default.

	info := OS.JOYINFOEX new.
	info dwSize: OS.JOYINFOEX byteSize.
	info dwFlags: 16rFF.

	((lib joyGetPosEx: aControllerId pji: info) == OS.WinMMConstants.JOYERR_NOERROR)
		ifFalse: [^nil].
	baseX := info dwXpos.
	baseY := info dwYpos.
	baseZ := info dwZpos.
	baseR := info dwRpos.
	baseU := info dwUpos.
	baseV := info dwVpos.

	t0 := Core.DateAndTime now.
	[true] whileTrue: [
		(lib joyGetPosEx: aControllerId pji: info) == OS.WinMMConstants.JOYERR_NOERROR ifFalse: [^nil].
		buttons := info dwButtons.
		buttons isZero ifFalse: [^self buttonToken: buttons].
		pov := info dwPOV.
		pov ~= 16rFFFF ifTrue: [^self povToken: pov].
		v := info dwXpos.
		(((v - 32768) abs > 12000) and: [(v - baseX) abs > 12000]) ifTrue: [^self axisToken: 'X' value: v].
		v := info dwYpos.
		(((v - 32768) abs > 12000) and: [(v - baseY) abs > 12000]) ifTrue: [^self axisToken: 'Y' value: v].
		v := info dwZpos.
		(((v - 32768) abs > 12000) and: [(v - baseZ) abs > 12000]) ifTrue: [^self axisToken: 'Z' value: v].
		v := info dwRpos.
		(((v - 32768) abs > 12000) and: [(v - baseR) abs > 12000]) ifTrue: [^self axisToken: 'R' value: v].
		v := info dwUpos.
		(((v - 32768) abs > 12000) and: [(v - baseU) abs > 12000]) ifTrue: [^self axisToken: 'U' value: v].
		v := info dwVpos.
		(((v - 32768) abs > 12000) and: [(v - baseV) abs > 12000]) ifTrue: [^self axisToken: 'V' value: v].
		(Core.DateAndTime now - t0) >= 10 seconds ifTrue: [^nil].
		Delay forMilliseconds: 50].
	^nil!

devices
	"Poll the WinMM joystick API for connected controllers and answer an OrderedCollection of Core.Device"

	| lib n devices |
	devices := OrderedCollection new.
	lib := OS.WinMMLibrary default.
	n := lib joyGetNumDevices.
	0 to: n - 1 do: [:id |
		| caps dev |
		caps := OS.JOYCAPS new.
		(lib joyGetDevCaps: id pjc: caps cbjc: OS.JOYCAPS byteSize) == OS.WinMMConstants.JOYERR_NOERROR
			ifTrue: [
				dev := Device new.
				dev id: id caption: (self joystickNameFromCaps: caps).
				devices add: dev 
			]
	].
	^devices!

hex4: value
	"Answer value as a 4-digit uppercase hex string."

	| s |
	s := ((value printStringRadix: 16) asUppercase) copyFrom: 4.
	^(s size < 4) 
		ifTrue: [(String new: 4 - s size withAll: $0), s] 
		ifFalse: [s]!

joystickNameFromCaps: caps
	"Answer a friendly name for the joystick: the OEM name from the registry (keyed by the VID/PID from the capabilities) if known, otherwise the WinMM product name."

	| regKey oemName |
	regKey := 'VID_', (self hex4: caps wMid), '&PID_', (self hex4: caps wPid).
	oemName := OS.AdvApiLibrary default
				regGetString: OS.WinRegConstants.HKEY_CURRENT_USER
				key: 'System\CurrentControlSet\Control\MediaProperties\PrivateProperties\Joystick\OEM\', regKey
				value: 'OEMName'.
	^oemName ifNil: [caps szPname]!

povToken: pov
	"Answer the config token ('P:UP', 'P:RIGHT', 'P:DOWN' or 'P:LEFT') for a pressed POV direction (dwPOV angle in hundredths of a degree, clockwise from up)"

	| a |
	a := (pov + 4500) \\ 36000.
	^a < 9000
		ifTrue: ['P:UP']
		ifFalse: [a < 18000
			ifTrue: ['P:RIGHT']
			ifFalse: [a < 27000
				ifTrue: ['P:DOWN']
				ifFalse: ['P:LEFT']]]! !

!Core.JoystickCapturer categoriesForMethods!
axisToken:value:!public!tokens! !
buttonToken:!public!tokens! !
captureFor:!capturing!public! !
devices!enumeration!public! !
hex4:!names!public! !
joystickNameFromCaps:!names!public! !
povToken:!public!tokens! !
!


Core.Device guid: (Core.GUID fromString: '{e3f54ca0-1924-41c2-adcd-68620e2f9ce5}')!

Core.Device comment: 'A single game controller (joystick) identified by a WinMM device id, with a display caption. Answers the caption as displayString and printString.'!

!Core.Device methodsFor!

caption
	^caption!

displayString
	^caption!

id
	^id!

id: anInteger caption: aString
	id := anInteger.
	caption := aString!

initialize
	super initialize.
	
	id := 0.
	caption := String new.!

printString
	^caption! !

!Core.Device categoriesForMethods!
caption!accessing!public! !
displayString!accessing!public! !
id!accessing!public! !
id:caption:!public! !
initialize!private! !
printString!accessing!public! !
!


Core.InputMapping guid: (Core.GUID fromString: '{32fca056-d1ca-45ef-9c08-28f854ee4ed9}')!

Core.InputMapping comment: 'A single binding row in the launcher settings dialog. Holds the INI key id, the friendly caption shown in the bindings list, the raw keyboard/controller binding tokens (binding, altBinding) as stored in td4fix.ini, and the corresponding display strings (displayBinding, displayAltBinding) rendered in the UI. Rows are kept in LauncherSettingsDialog>>kBindingsModel and >>cBindingsModel.'!

!Core.InputMapping methodsFor!

altBinding
	^altBinding!

altBinding: anObject
	altBinding := anObject!

binding
	^binding!

binding: anObject
	binding := anObject!

caption
	^caption!

caption: anObject
	caption := anObject!

displayAltBinding
	^displayAltBinding!

displayAltBinding: anObject
	displayAltBinding := anObject!

displayBinding
	^displayBinding!

displayBinding: anObject
	displayBinding := anObject!

id
	^id!

id: anObject
	id := anObject!

initialize
	super initialize.
	
	id := String new.
	caption := String new.
	binding := String new.
	altBinding := String new.! !

!Core.InputMapping categoriesForMethods!
altBinding!accessing!public! !
altBinding:!accessing!public! !
binding!accessing!public! !
binding:!accessing!public! !
caption!accessing!public! !
caption:!accessing!public! !
displayAltBinding!accessing!public! !
displayAltBinding:!accessing!public! !
displayBinding!accessing!public! !
displayBinding:!accessing!public! !
id!accessing!public! !
id:!accessing!public! !
initialize!private! !
!


Core.LauncherSettingsModel guid: (Core.GUID fromString: '{95ed874f-2083-4b72-bbdd-b004de0c8e35}')!

Core.LauncherSettingsModel comment: 'Settings model for td4fix.ini. Holds the ten Fix-section switches (fixStartupCrash, fixNoCD, fixFrontend, fixInput, fixExtCDTracks, fixAspectRatio, fixCamera, fixViewport, fixSkipLogo, fixLevelMusicOrder), the selected controller id (cId) and the controller steering deadzone (cDeadzone) and sensitivity (cSensitivity).'!

!Core.LauncherSettingsModel methodsFor!

cDeadzone
	^cDeadzone!

cDeadzone: anObject
	cDeadzone := anObject!

cId
	^cId!

cId: anObject
	cId := anObject.
	self trigger: #cIdChanged!

cSensitivity
	^cSensitivity!

cSensitivity: anObject
	cSensitivity := anObject!

fixAspectRatio
	^fixAspectRatio!

fixAspectRatio: anObject
    fixAspectRatio := anObject.
    self trigger: #fixAspectRatioChanged!

fixCamera
	^fixCamera!

fixCamera: anObject
	fixCamera := anObject.
	self trigger: #fixCameraChanged!

fixExtCDTracks
	^fixExtCDTracks!

fixExtCDTracks: anObject
	fixExtCDTracks := anObject.
	self trigger: #fixExtCDTracksChanged.!

fixFrontend
	^fixFrontend!

fixFrontend: anObject
    fixFrontend := anObject.
    self trigger: #fixFrontendChanged!

fixInput
	^fixInput!

fixInput: anObject
    fixInput := anObject.
    self trigger: #fixInputChanged!

fixLevelMusicOrder
	^fixLevelMusicOrder!

fixLevelMusicOrder: anObject
	fixLevelMusicOrder := anObject.
	self trigger: #fixLevelMusicOrderChanged!

fixNoCD
	^fixNoCD!

fixNoCD: anObject
    fixNoCD := anObject.
    self trigger: #fixNoCDChanged!

fixSkipLogo
	^fixSkipLogo!

fixSkipLogo: anObject
	fixSkipLogo := anObject.
	self trigger: #fixSkipLogoChanged!

fixStartupCrash
	^fixStartupCrash!

fixStartupCrash: anObject
    fixStartupCrash := anObject.
    self trigger: #fixStartupCrashChanged!

fixViewport
	^fixViewport!

fixViewport: anObject
	fixViewport := anObject.
	self trigger: #fixViewportChanged!

initialize
	fixExtCDTracks := true.
	fixAspectRatio := true.
	fixFrontend := true.
	fixInput := true.
	fixNoCD := true.
	fixCamera := true.
	fixStartupCrash := true.
	fixViewport := true.
	fixSkipLogo := true.
	fixLevelMusicOrder := true.

	cId := 0.
	cDeadzone := 10.
	cSensitivity := 10.0.! !

!Core.LauncherSettingsModel categoriesForMethods!
cDeadzone!accessing!public! !
cDeadzone:!accessing!public! !
cId!accessing!public! !
cId:!accessing!public! !
cSensitivity!accessing!public! !
cSensitivity:!accessing!public! !
fixAspectRatio!accessing!public! !
fixAspectRatio:!accessing!public! !
fixCamera!accessing!public! !
fixCamera:!accessing!public! !
fixExtCDTracks!accessing!public! !
fixExtCDTracks:!accessing!public! !
fixFrontend!accessing!public! !
fixFrontend:!accessing!public! !
fixInput!accessing!public! !
fixInput:!accessing!public! !
fixLevelMusicOrder!accessing!public! !
fixLevelMusicOrder:!accessing!public! !
fixNoCD!accessing!public! !
fixNoCD:!accessing!public! !
fixSkipLogo!accessing!public! !
fixSkipLogo:!accessing!public! !
fixStartupCrash!accessing!public! !
fixStartupCrash:!accessing!public! !
fixViewport!accessing!public! !
fixViewport:!accessing!public! !
initialize!initializing!private! !
!


UI.LauncherShell guid: (Core.GUID fromString: '{3b851e1a-4a12-4782-bf72-75864fc16dba}')!

UI.LauncherShell comment: 'Main launcher window. Shows the game logo, an ''original'' preset checkbox, and buttons to open the settings dialog or launch the game in hardware (3_.exe) or software (2_.exe) render mode. On initialize it prepares the runnable exe copies (2_.exe/3_.exe) inside gameDirectory and starts the game through an external process.'!

!UI.LauncherShell methodsFor!

copyIfAbsent: sourceFile to: destFile
	"Copy a file if source exists and destination does not"

	| sourcePath destPath |
	sourcePath := gameDirectory, '\', sourceFile.
	destPath := gameDirectory, '\', destFile.

	((File exists: sourcePath) and: [(File exists: destPath) not])
		ifTrue: [File copy: sourcePath to: destPath]!

createComponents
	"Create sub-presenters: logo image and original checkbox"

	super createComponents.

	imagePresenter := self add: ImagePresenter new name: 'image'.
	originalPresenter := self add: BooleanPresenter new name: 'original'.!

createSchematicWiring
	"Private - Subscribe to original checkbox value changes"

	super createSchematicWiring.

	originalPresenter when: #valueChanged send: #originalChanged to: self.!

gameDirectory
	^gameDirectory!

gameDirectory: anObject
	gameDirectory := anObject!

initialize
	"Initialize launcher: logo and settings. gameDirectory is set by the session manager at startup."

	super initialize.

	launcherSettingsPresenter := LauncherSettingsDialog new.!

onViewOpened
	super onViewOpened.

	imagePresenter value: (Gdiplus.Image fromFile: gameDirectory, $\, 'logo.png').!

openSettings
	"Open the Fix-section settings dialog"

	launcherSettingsPresenter read: gameDirectory, '\plugins\td4fix.ini'; 
		createView: 'Default view';
		showModal.!

originalChanged
	"Apply original preset when checked, default when unchecked"

	originalPresenter value
		ifTrue: [launcherSettingsPresenter applyOriginal]
		ifFalse: [launcherSettingsPresenter applyDefault].
	launcherSettingsPresenter read.!

prepareExes
	"Copy exe files if source exists but destination is missing"

	self
		copyIfAbsent: '2.exe' to: '2_.exe';
		copyIfAbsent: '3.exe' to: '3_.exe'!

queryCommand: aCommandQuery
	"Disable Settings button when original checkbox is checked"

	(aCommandQuery command == #openSettings and: [originalPresenter value])
		ifTrue: [aCommandQuery beDisabled. ^true].

	^super queryCommand: aCommandQuery!

startHW
	"Launch game in hardware render mode 3_.exe"

	OS.ShellLibrary default shellOpen:  (gameDirectory, '\HW.bat') directory: gameDirectory.
!

startSW
	"Launch game in software render mode 2_.exe"

	OS.ShellLibrary default shellOpen:  (gameDirectory, '\SW.bat') directory: gameDirectory.! !

!UI.LauncherShell categoriesForMethods!
copyIfAbsent:to:!file operations!public! !
createComponents!initialize!initializing!private! !
createSchematicWiring!initialize!private! !
gameDirectory!accessing!public! !
gameDirectory:!accessing!public! !
initialize!initialize-release!public! !
onViewOpened!public! !
openSettings!actions!commands!public! !
originalChanged!operations!public! !
prepareExes!actions!operations!public! !
queryCommand:!commands!public! !
startHW!actions!commands!public! !
startSW!commands!public! !
!

!UI.LauncherShell class methodsFor!

resource_Default_view
	"Answer the literal data from which the 'Default view' resource can be reconstituted.
	DO NOT EDIT OR RECATEGORIZE THIS METHOD.

	If you wish to modify this resource evaluate:
	Tools.ViewComposer openOn: (UI.ResourceIdentifier class: self selector: #resource_Default_view)
	"

	^#(#'!!STL' 6 2118 11 #{UI.STBViewProxy} #{UI.ShellView} 38 #{Core.Array} 27 nil nil 8 #(13107200 65536) 32 nil 6 #{Graphics.Color} #default nil 645 nil nil nil 32 1798 #{UI.BorderLayout} 1 1 18 #{Graphics.Gdiplus.ImageView} 50 28 nil 32 50 2 8 1140850944 1 160 1094 2 #{UI.ValueHolder} nil false 6 #{Kernel.EqualitySearchPolicy} 774 #{Graphics.Gdiplus.Image} nil true 582 1 #{Graphics.Gdiplus.ImageFromFileInitializer} 8 'E:\Test Drive 4 US\logo.png' 6 #{Kernel.ImageRelativeFileLocator} nil nil 5 nil nil nil 160 nil nil 518 #{UI.NullConverter} nil nil nil 304 #scaleBestFit 1 nil nil nil #none nil nil nil nil nil 262 #{Core.MessageSequence} 50 1 774 #{Core.MessageSend} #createWindow: 50 1 1030 #{UI.CreateWindow} 262 #{OS.RECTL} 8 #[0 0 0 0 0 0 0 0 28 1 0 0 54 0 0 0] 193 192 nil 160 3 8 #() 518 #{Graphics.Point} 193 193 nil 29 nil nil nil nil 518 #{Kernel.STBIdentityDictionaryProxy} #{Core.IdentityDictionary} 50 2 18 #{UI.CheckBox} 50 16 nil 32 50 2 8 1409363203 1 704 226 nil nil 6 #{Kernel.NeverSearchPolicy} false nil nil 517 nil nil nil 704 nil nil 402 nil nil nil 434 50 1 482 #createWindow: 50 1 530 562 8 #[12 0 0 0 130 0 0 0 82 0 0 0 155 0 0 0] 193 736 8 'No fixes' 704 3 8 #() 626 193 193 nil 27 8 'original' nil nil nil nil nil 1 838 4 #{Graphics.Icon} nil true 1030 #{Graphics.ImageFromFileInitializer} 8 'E:\Test Drive 4 US\icon.ico' 384 5 nil nil 626 601 401 nil nil nil 193 434 50 1 482 #createWindow: 50 1 530 518 #{Graphics.Rectangle} 626 2719 21 626 3319 421 193 80 8 '' 32 1 50 5 160 704 18 #{UI.PushButton} 50 20 nil 32 50 2 8 1140924416 1 1280 nil nil nil 5 nil nil nil 1280 nil nil 1350 4 #{UI.CommandDescription} #startSW 8 'Software mode' 1 1 nil nil false nil nil nil 434 50 2 482 #createWindow: 50 1 530 562 8 #[175 0 0 0 75 0 0 0 14 1 0 0 110 0 0 0] 193 1312 8 'Software mode' 1280 482 #isEnabled: 8 #(false) 1280 3 8 #() 626 193 193 nil 29 18 #{UI.PushButton} 50 20 nil 32 50 2 8 1140924416 1 1584 nil nil nil 5 nil nil nil 1584 nil nil 1346 #startHW 8 'Glide mode' 1 1 nil nil false nil nil nil 434 50 2 482 #createWindow: 50 1 530 562 8 #[175 0 0 0 115 0 0 0 14 1 0 0 150 0 0 0] 193 1616 8 'Glide mode' 1584 482 #isEnabled: 8 #(false) 1584 3 8 #() 626 193 193 nil 29 18 #{UI.PushButton} 50 20 nil 32 50 2 8 1140924416 1 1872 nil nil nil 5 nil nil nil 1872 nil nil 1346 #openSettings 8 'Settings' 1 1 nil nil false nil nil nil 434 50 2 482 #createWindow: 50 1 530 562 8 #[10 0 0 0 75 0 0 0 80 0 0 0 100 0 0 0] 193 1904 8 'Settings' 1872 482 #isEnabled: 8 #(false) 1872 3 8 #() 626 193 193 nil 29 626 193 193 nil 27)! !

!UI.LauncherShell class categoriesForMethods!
resource_Default_view!public!resources-views! !
!


UI.LauncherSettingsDialog guid: (Core.GUID fromString: '{6ac9b5eb-d69d-45c6-8c68-8850b0f65e88}')!

UI.LauncherSettingsDialog comment: 'Settings dialog for the launcher. Edits the Fix-section switches, keyboard and controller bindings, selected controller, and steering deadzone/sensitivity stored in td4fix.ini. Keyboard bindings are captured from DirectInput key codes, controller bindings via JoystickCapturer. Reads and writes the INI file directly. Fix section keys are described by class-side fixBindings.'!

!UI.LauncherSettingsDialog methodsFor!

apply
	"Save settings to INI on dialog confirm"

	super apply.

	self write!

applyDefault
	"Set all Fix settings to 1"

	| ini |
	ini := IniFileSection open: self path section: 'Fix'.
	self class fixBindings do: [:each |
		ini at: (each at: 1) put: '1']!

applyOriginal
	"Reset all Fix settings to 0 (except StartupCrash=1) and reset the controller section to defaults"

	| ini |
	ini := IniFileSection open: self path section: 'Fix'.
	self class fixBindings do: [:each |
		ini at: (each at: 1) put: ((each at: 2) == #fixStartupCrash
			ifTrue: ['1']
			ifFalse: ['0'])].

	ini := IniFileSection open: self path section: 'Controller'.
	ini at: 'Id' put: 0.
	ini at: 'SteerSensitivity' put: '1.0'.
	ini at: 'SteerDeadzone' put: 10!

captureJoystickInput
	"Poll the selected/configured joystick for the next pressed button, POV or deflected axis and
	answer the config token ('B:<n>', 'P:UP' etc, 'A:<axis><+|->'); answer nil if nothing is
	pressed within the timeout, or when no joystick is selected"

	^JoystickCapturer new captureFor: self controllerId!

checkControllers
	"Poll the WinMM joystick API for connected controllers and add them to cDevModel."

	| devices |
	cDevModel removeAll.

	devices := JoystickCapturer new devices.

	devices do: [:dev | 
		cDevModel add: dev
	].

	cDevListPresenter choices: cDevModel list!

combinedBinding: anInputMappingModel
	"Return the binding string for the INI: binding, altBinding, or binding altBinding"

	| value |
	value := anInputMappingModel binding.
	^value isEmpty
		ifTrue: [anInputMappingModel altBinding]
		ifFalse: [anInputMappingModel altBinding isEmpty
			ifTrue: [value]
			ifFalse: [value, ' ', anInputMappingModel altBinding]]!

controllerId
	"Answer the id of the selected joystick, or the id saved in the settings model, or nil"

	| item |
	item := (cDevListPresenter isNil)
			ifTrue: [nil]
			ifFalse: [cDevListPresenter value].

	(item notNil)
		ifTrue: [^item id].

	^settingsModel cId!

controllerInputDisplay: aToken
	"Answer a friendly display string for a controller config token ('B:1', 'P:UP', 'A:X-'), or the token unchanged"

	^InputTokenFormatter new controllerInputDisplay: aToken!

createBindingModels
	"Create all keyboard and controller binding rows with empty values. Pause is controller-only."

	| items |
	kBindingsModel removeAll.
	cBindingsModel removeAll.

	items := OrderedDictionary new.

	items add: 'Accelerate'->'Accelerate'.
	items add: 'Brake'->'Brake'.
	items add: 'TurnLeft'->'Turn left'.
	items add: 'TurnRight'->'Turn right'.
	items add: 'GearUp'->'Gear up'.
	items add: 'GearDown'->'Gear down'.
	items add: 'Horn'->'Horn'.
	items add: 'Camera'->'Camera'.

	items add: 'LookLeft'->'Look left'.
	items add: 'LookRight'->'Look right'.
	items add: 'LookBack'->'Look back'.
	items add: 'NextCdTrack'->'Next CD track'.
	items add: 'PrevCdTrack'->'Previous CD track'.
	items add: 'Respawn'->'Respawn'. 
	items add: 'Pause'->'Pause'.

	items add: 'Up'->'Up'.
	items add: 'Down'->'Down'. 
	items add: 'Left'->'Left'.
	items add: 'Right'->'Right'.
	items add: 'Select'->'Select'. 
	items add: 'Back'->'Back'. 

	items associationsDo: [:assoc || item | 
		item := InputMapping new.
		item id: assoc key.
		item caption: assoc value, $:.
		item binding: ''.
		item displayBinding: ''.

		(assoc key = 'Pause')
			ifFalse: [kBindingsModel add: item].
		cBindingsModel add: item deepCopy.
	].!

createComponents
	"Create sub-presenters for all settings"

	super createComponents.

	startupCrashPresenter := self add: BooleanPresenter new name: 'fixStartupCrash'.
	noCDPresenter := self add: BooleanPresenter new name: 'fixNoCD'.
	frontendPresenter := self add: BooleanPresenter new name: 'fixFrontend'.
	inputPresenter := self add: BooleanPresenter new name: 'fixInput'.
	extCDTracksPresenter := self add: BooleanPresenter new name: 'fixExtCDTracks'.
	aspectRatioPresenter := self add: BooleanPresenter new name: 'fixAspectRatio'.
	cameraPresenter := self add: BooleanPresenter new name: 'fixCamera'.
	viewportPresenter := self add: BooleanPresenter new name: 'fixViewport'.
	skipLogoPresenter := self add: BooleanPresenter new name: 'fixSkipLogo'.
	levelMusicOrderPresenter := self add: BooleanPresenter new name: 'fixLevelMusicOrder'.

	kBindingsPresenter := self add: ListPresenter new name: 'kBindings'.

	cDevListPresenter := self add: ChoicePresenter new name: 'cDevList'.
	cBindingsPresenter := self add: ListPresenter new name: 'cBindings'.

	cDeadzonePresenter := self add: NumberPresenter new name: 'cDeadzone'.
	cSensitivityPresenter := self add: NumberPresenter new name: 'cSensitivity'.

	cDeadzoneValuePresenter := self add: TextPresenter new name: 'cDeadzoneValue'.
	cSensitivityValuePresenter := self add: TextPresenter new name: 'cSensitivityValue'.

	!

createSchematicWiring
	"Wire key press capture to the DI key text fields"

	super createSchematicWiring.
    	cBindingsPresenter when: #leftButtonDoubleClicked: send: #onContollerInputListDoubleClicked: to: self.	cBindingsPresenter when: #rightButtonPressed: send: #onControllerInputListRightPressed: to: self.

	kBindingsPresenter when: #leftButtonDoubleClicked: send: #onKeyBindingsListDoubleClicked: to: self.
	kBindingsPresenter when: #rightButtonPressed: send: #onKeyBindingsListRightPressed: to: self.

	kBindingsPresenter when: #keyPressed: send: #keyPressed:into: to: self withArguments: #(nil 'kBindings').
	kBindingsPresenter when: #sysKeyPressed: send: #sysKeyPressed:into: to: self withArguments: #(nil 'kBindings').!

diCodeFromEvent: aKeyEvent
	"Answer the DirectInput key code derived from a key or sys key event"

	| ext code |
	code := aKeyEvent code.
	ext := aKeyEvent data anyMask: 16r1000000.
	^code = 16r13
		ifTrue: [16rC5]
		ifFalse: [code = 16r90
			ifTrue: [16r45]
			ifFalse: [ext
				ifTrue: [16r80 + aKeyEvent scanCode]
				ifFalse: [aKeyEvent scanCode]]]!

handleKeyEvent: aKeyEvent into: aVariableName
	"Shared handling for key and sys key presses: compute the DirectInput code and
	store it in the pending keyboard row, then clear the capture hint caption.
	Escape is assigned like any other key (DIK_ESCAPE)."

	| data diCode |
	data := aKeyEvent data.
	(data anyMask: 16r40000000)
		ifTrue: [^self].
	((data anyMask: 16r20000000) and: [aKeyEvent scanCode ~= 16r38])
		ifTrue: [^self].

	diCode := self diCodeFromEvent: aKeyEvent.

	aVariableName = 'kBindings'
		ifTrue: [| item |
			item := pendingKeyboardItem.
			item isNil ifTrue: [^self].
			pendingKeyboardItem := nil.
			self caption: ''.
			item binding: diCode printString.
			item displayBinding: (DIKeyToText new leftToRight: diCode).
			kBindingsPresenter view refreshContents]
		ifFalse: [settingsModel perform: (aVariableName, ':' ) asSymbol with: diCode].!

initialize
	super initialize.

	iniPath := String new.

	kBindingsModel := ListModel new.

	cDevModel := ListModel new.
	cBindingsModel := ListModel new.

	settingsModel := LauncherSettingsModel new.
	self model: settingsModel.

	self createBindingModels.!

keyNameForDiBinding: aBindingString
	"Answer the display name for a keyboard binding string stored in the INI (a DirectInput key code)"

	^InputTokenFormatter new keyNameForDiBinding: aBindingString!

keyPressed: aKeyEvent into: aVariableName
	"Capture the key scan code into the DI key variable"

	self handleKeyEvent: aKeyEvent into: aVariableName!

model: aModel
	"Private - Connect the dialog to a model"

	| aspectBuffer deadzoneModel sensitivityModel bindSpecs |
	super model: aModel.

	settingsModel := aModel.
	aspectBuffer := aModel.

	bindSpecs := #(
		('fixStartupCrash' #fixStartupCrash #fixStartupCrashChanged)
		('fixNoCD' #fixNoCD #fixNoCDChanged)
		('fixFrontend' #fixFrontend #fixFrontendChanged)
		('fixInput' #fixInput #fixInputChanged)
		('fixExtCDTracks' #fixExtCDTracks #fixExtCDTracksChanged)
		('fixAspectRatio' #fixAspectRatio #fixAspectRatioChanged)
		('fixCamera' #fixCamera #fixCameraChanged)
		('fixViewport' #fixViewport #fixViewportChanged)
		('fixSkipLogo' #fixSkipLogo #fixSkipLogoChanged)
		('fixLevelMusicOrder' #fixLevelMusicOrder #fixLevelMusicOrderChanged)).
	bindSpecs do: [:spec |
		(self presenterNamed: spec first) model: (aspectBuffer aspectValue: spec second triggers: spec third)].

	"Controller tuning sliders and their value labels share one aspect model so the
	labels update live as the user drags the slider"
	deadzoneModel := aspectBuffer aspectValue: #cDeadzone triggers: #cDeadzoneChanged.
	sensitivityModel := aspectBuffer aspectValue: #cSensitivity triggers: #cSensitivityChanged.
	cDeadzonePresenter model: deadzoneModel.
	cSensitivityPresenter model: sensitivityModel.
	cDeadzoneValuePresenter model: deadzoneModel.
	cSensitivityValuePresenter model: sensitivityModel.
	
	kBindingsPresenter model: kBindingsModel.
	
	cDevListPresenter model: (UI.ValueHolder new).
	cBindingsPresenter model: cBindingsModel!

onContollerInputListDoubleClicked: aMouseEvent
	"Capture the next pressed joystick input into the cell (Action or Alt. action) of the row
	that was double-clicked, and refresh the list"

	| item hit column token |
	item := cBindingsPresenter selectionOrNil.
	item isNil ifTrue: [^self].
	column := 1.
	hit := [cBindingsPresenter view basicItemFromPoint: aMouseEvent position] on: Error do: [:e | nil].
	(hit notNil and: [hit iSubItem == 2]) ifTrue: [column := 2].
	self caption: 'Waiting for input...'.
	token := self captureJoystickInput.
	self caption: ''.
	token isNil ifTrue: [^self].
	column == 1
		ifTrue: [item binding: token. item displayBinding: (self controllerInputDisplay: token)]
		ifFalse: [item altBinding: token. item displayAltBinding: (self controllerInputDisplay: token)].
	cBindingsPresenter view refreshContents!

onControllerInputListRightPressed: aMouseEvent
	"Clear the Action or Alt. action cell of the row that was right-clicked"

	| hit column index item |
	hit := [cBindingsPresenter view basicItemFromPoint: aMouseEvent position] on: Error do: [:e | nil].
	(hit notNil and: [hit iItem >= 0]) ifFalse: [^self].
	column := hit iSubItem.
	(column == 1 or: [column == 2]) ifFalse: [^self].
	index := hit iItem + 1.
	(index between: 1 and: cBindingsModel list size) ifFalse: [^self].
	item := cBindingsModel list at: index.
	column == 1
		ifTrue: [item binding: ''. item displayBinding: '']
		ifFalse: [item altBinding: ''. item displayAltBinding: ''].
	cBindingsPresenter view refreshContents!

onKeyBindingsListDoubleClicked: aMouseEvent
	"Start capturing the next key press into the double-clicked keyboard row"

	| hit index |
	hit := [kBindingsPresenter view basicItemFromPoint: aMouseEvent position] on: Error do: [:e | nil].
	(hit notNil and: [hit iItem >= 0]) ifFalse: [^self].
	index := hit iItem + 1.
	(index between: 1 and: kBindingsModel list size) ifFalse: [^self].
	pendingKeyboardItem := kBindingsModel list at: index.
	self caption: 'Press a key... '!

onKeyBindingsListRightPressed: aMouseEvent
	"Clear the binding of the keyboard row that was right-clicked"

	| hit index item |
	pendingKeyboardItem := nil.
	hit := [kBindingsPresenter view basicItemFromPoint: aMouseEvent position] on: Error do: [:e | nil].
	(hit notNil and: [hit iItem >= 0]) ifFalse: [^self].
	index := hit iItem + 1.
	(index between: 1 and: kBindingsModel list size) ifFalse: [^self].
	item := kBindingsModel list at: index.
	item binding: ''.
	item displayBinding: ''.
	kBindingsPresenter view refreshContents!

onViewOpened
	super onViewOpened.

	self checkControllers.
	self restoreControllerSelection.!

path
	"Return the INI file path"

	^iniPath!

path: aPath
	"Set the INI file path"

	iniPath := aPath!

preTranslateKeyboardInput: aMSG
	"While capturing a keyboard binding, do not let the dialog consume Escape
	or Tab (IsDialogMessage would translate them to IDCANCEL / focus navigation);
	dispatch them to the list instead so they can be assigned like any other key."

	pendingKeyboardItem notNil
		ifTrue: [(aMSG isKeyPress: VK_ESCAPE) ifTrue: [^false].
			(aMSG isKeyPress: VK_TAB) ifTrue: [^false]].
	^super preTranslateKeyboardInput: aMSG.!

read
	"Read all settings and bindings from the INI file into the models"

	| ini formatter |
	formatter := InputTokenFormatter new.

	ini := IniFileSection open: iniPath section: 'Fix'.
	self readFixFlags: settingsModel from: ini.

	ini := IniFileSection open: iniPath section: 'Controller'.
	self readControllerSettings: settingsModel from: ini.
	self readControllerBindings: cBindingsModel from: ini formatter: formatter.
	
	ini := IniFileSection open: iniPath section: 'Keyboard'.
	self readKeyboardBindings: kBindingsModel formatter: formatter!

read: aPath
	iniPath := aPath.
	self read!

readControllerBindings: aCBindingsModel from: aControllerSection formatter: aFormatter
	"Fill the existing controller binding rows from the Controller section"

	aCBindingsModel list do: [:item | | acts |
		acts := (aControllerSection at: item id ifAbsent: ['']) subStrings: ' '.
		item binding: (acts at: 1 ifAbsent: ['']).
		item altBinding: (acts at: 2 ifAbsent: ['']).
		item displayBinding: (aFormatter controllerInputDisplay: item binding).
		item displayAltBinding: (aFormatter controllerInputDisplay: item altBinding)]!

readControllerSettings: aSettingsModel from: aControllerSection
	"Read the saved controller id, deadzone and sensitivity from the Controller section"

	aSettingsModel cId: (aControllerSection at: 'Id' ifAbsent: ['']) asNumber.
	aSettingsModel cDeadzone: (aControllerSection at: 'SteerDeadzone' ifAbsent: ['']) asNumber.
	aSettingsModel cSensitivity: (aControllerSection at: 'SteerSensitivity' ifAbsent: ['1.0']) asNumber!

readFixFlags: aSettingsModel from: aFixSection
	"Read the fix switches from the Fix section into the model"

	self class fixBindings do: [:each |
		aSettingsModel
			perform: (each at: 3)
			with: ((aFixSection at: (each at: 1) ifAbsent: ['']) asNumber = 1)]!

readKeyboardBindings: aKBindingsModel formatter: aFormatter
	"Fill the existing keyboard binding rows from the Keyboard section"

	| kb |
	kb := IniFileSection open: iniPath section: 'Keyboard'.
	aKBindingsModel list do: [:item |
		item binding: (kb at: item id ifAbsent: ['']).
		item displayBinding: (aFormatter keyNameForDiBinding: item binding)]!

restoreControllerSelection
	"Select the joystick saved in the settings model, if present."

	| cId item |
	cId := settingsModel cId.
	(cId isNil)
		ifTrue: [^self].

	item := cDevModel list detect: [:each | each id = cId] ifNone: [nil].
	item isNil ifFalse: [cDevListPresenter value: item]!

selectedControllerId
	"Answer the Id of the selected controller, or nil when none is selected"

	| item |
	item := cDevListPresenter isNil
		ifTrue: [nil]
		ifFalse: [cDevListPresenter value].
	(item isNil or: [item isKindOf: DeafObject]) ifTrue: [^nil].
	^item id!

sysKeyPressed: aKeyEvent into: aVariableName
	"Capture sys key presses (e.g. F10, Alt) into the DI key variable"

	self handleKeyEvent: aKeyEvent into: aVariableName!

write
	"Write all settings and bindings to the INI file"

	self writeFixSection: settingsModel.
	self writeKeyboardSection: kBindingsModel.
	self writeControllerSection: settingsModel cBindings: cBindingsModel controllerId: self controllerId!

writeControllerSection: aSettingsModel cBindings: aCBindingsModel controllerId: aControllerIdOrNil
	"Write the controller settings and binding rows from the model"

	| ini val index |
	ini := IniFileSection open: iniPath section: 'Controller'.
	aControllerIdOrNil ifNotNil: [:id | ini at: 'Id' put: id].

	val := (aSettingsModel cSensitivity ifNil: [1.0]) printString.
	index := val findString: $,.
	(index > 0) ifTrue: [val at: index put: $.].

	ini at: 'SteerSensitivity' put: val.
	ini at: 'SteerDeadzone' put: (aSettingsModel cDeadzone ifNil: [10]) printString.

	aCBindingsModel list do: [:item |
		ini at: item id put: (self combinedBinding: item)]!

writeFixSection: aSettingsModel
	"Write the fix switches to the Fix section"

	| ini |
	ini := IniFileSection open: iniPath section: 'Fix'.
	self class fixBindings do: [:each |
		ini at: (each at: 1)
			put: ((aSettingsModel perform: (each at: 2)) ifTrue: ['1'] ifFalse: ['0'])]!

writeKeyboardSection: aKBindingsModel
	"Write the keyboard binding rows from the model"

	| ini |
	ini := IniFileSection open: iniPath section: 'Keyboard'.
	aKBindingsModel list do: [:item |
		ini at: item id put: item binding]! !

!UI.LauncherSettingsDialog categoriesForMethods!
apply!operations!public! !
applyDefault!public! !
applyOriginal!public! !
captureJoystickInput!capturing!public! !
checkControllers!controllers!public! !
combinedBinding:!INI writing!public! !
controllerId!actions!public! !
controllerInputDisplay:!display!public! !
createBindingModels!INI reading!public! !
createComponents!initializing!private! !
createSchematicWiring!initializing!key capture!private! !
diCodeFromEvent:!capturing!public! !
handleKeyEvent:into:!capturing!public! !
initialize!initializing!private! !
keyNameForDiBinding:!display!public! !
keyPressed:into:!capturing!public! !
model:!initializing!private! !
onContollerInputListDoubleClicked:!controllers!public! !
onControllerInputListRightPressed:!actions!public!Unclassified! !
onKeyBindingsListDoubleClicked:!capturing!public! !
onKeyBindingsListRightPressed:!actions!public!Unclassified! !
onViewOpened!initializing!key capture!public! !
path!accessing!public! !
path:!accessing!public! !
preTranslateKeyboardInput:!capturing!event handling!public! !
read!public! !
read:!INI reading!initializing!public! !
readControllerBindings:from:formatter:!INI reading!public! !
readControllerSettings:from:!INI reading!public! !
readFixFlags:from:!INI reading!public! !
readKeyboardBindings:formatter:!public! !
restoreControllerSelection!actions!public! !
selectedControllerId!actions!public!Unclassified! !
sysKeyPressed:into:!capturing!public! !
write!INI writing!public! !
writeControllerSection:cBindings:controllerId:!public! !
writeFixSection:!public! !
writeKeyboardSection:!public! !
!

!UI.LauncherSettingsDialog class methodsFor!

fixBindings
	"Answer the ordered Fix section keys with their model getter and setter selectors:
	each entry is an array (key getter setter)"

	^#(
		('StartupCrash' #fixStartupCrash #fixStartupCrash:)
		('NoCD' #fixNoCD #fixNoCD:)
		('Frontend' #fixFrontend #fixFrontend:)
		('Input' #fixInput #fixInput:)
		('ExtCDTracks' #fixExtCDTracks #fixExtCDTracks:)
		('AspectRatio' #fixAspectRatio #fixAspectRatio:)
		('Camera' #fixCamera #fixCamera:)
		('Viewport' #fixViewport #fixViewport:)
		('SkipLogo' #fixSkipLogo #fixSkipLogo:)
		('LevelMusicOrder' #fixLevelMusicOrder #fixLevelMusicOrder:)
	)!

resource_Default_view
	"Answer the literal data from which the 'Default view' resource can be reconstituted.
	DO NOT EDIT OR RECATEGORIZE THIS METHOD.

	If you wish to modify this resource evaluate:
	Tools.ViewComposer openOn: (UI.ResourceIdentifier class: self selector: #resource_Default_view)
	"

	^#(#'!!STL' 6 2118 11 #{UI.STBViewProxy} #{UI.DialogView} 38 #{Core.Array} 34 nil nil 8 #(13107200 65536) 32 nil 518 #{Graphics.ThemeColor} #dialog nil 133 nil nil nil 32 1798 #{UI.BorderLayout} 1 1 18 #{UI.CardContainer} 50 16 nil 32 50 2 8 1409286144 131073 160 nil 6 #{Graphics.Color} #default nil 5 nil nil nil 160 1350 1 #{UI.CardLayout} 550 #{Core.OrderedCollection} 4 518 #{Core.Association} 8 'Fix' 18 #{UI.ContainerView} 50 15 nil 160 50 2 8 1140850688 131073 368 nil nil nil 5 nil nil nil 368 1030 #{UI.GridLayout} 13 5 1 1 518 #{Kernel.STBIdentityDictionaryProxy} #{Core.IdentityDictionary} 50 20 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 512 1094 2 #{UI.ValueHolder} nil nil 6 #{Kernel.NeverSearchPolicy} false nil nil 517 nil nil nil 512 nil nil 518 #{UI.NullConverter} nil nil nil 262 #{Core.MessageSequence} 50 1 774 #{Core.MessageSend} #createWindow: 50 1 1030 #{UI.CreateWindow} 262 #{OS.RECTL} 8 #[0 0 0 0 97 0 0 0 203 0 0 0 146 0 0 0] 193 544 8 'Aspect ratio' 512 3 8 #() 518 #{Graphics.Point} 193 193 nil 27 8 'fixAspectRatio' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 928 578 nil nil 624 false nil nil 517 nil nil nil 928 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[0 0 0 0 146 0 0 0 203 0 0 0 194 0 0 0] 193 960 8 'Camera' 928 3 8 #() 882 193 193 nil 27 8 'fixCamera' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 1200 578 nil nil 624 false nil nil 517 nil nil nil 1200 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[0 0 0 0 194 0 0 0 203 0 0 0 243 0 0 0] 193 1232 8 'Ext. CD tracks' 1200 3 8 #() 882 193 193 nil 27 8 'fixExtCDTracks' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 1472 578 nil nil 624 false nil nil 517 nil nil nil 1472 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[0 0 0 0 49 0 0 0 203 0 0 0 97 0 0 0] 193 1504 8 'Frontend' 1472 3 8 #() 882 193 193 nil 27 8 'fixFrontend' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 1744 578 nil nil 624 false nil nil 517 nil nil nil 1744 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[203 0 0 0 49 0 0 0 150 1 0 0 97 0 0 0] 193 1776 8 'Input' 1744 3 8 #() 882 193 193 nil 27 8 'fixInput' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 2016 578 nil nil 624 false nil nil 517 nil nil nil 2016 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[203 0 0 0 194 0 0 0 150 1 0 0 243 0 0 0] 193 2048 8 'Level music order' 2016 3 8 #() 882 193 193 nil 27 8 'fixLevelMusicOrder' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 2288 578 nil nil 624 false nil nil 517 nil nil nil 2288 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[203 0 0 0 146 0 0 0 150 1 0 0 194 0 0 0] 193 2320 8 'No CD' 2288 3 8 #() 882 193 193 nil 27 8 'fixNoCD' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 2560 578 nil nil 624 false nil nil 517 nil nil nil 2560 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[203 0 0 0 0 0 0 0 150 1 0 0 49 0 0 0] 193 2592 8 'Skip logo' 2560 3 8 #() 882 193 193 nil 27 8 'fixSkipLogo' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 2832 578 nil nil 624 false nil nil 517 nil nil nil 2832 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[0 0 0 0 0 0 0 0 203 0 0 0 49 0 0 0] 193 2864 8 'Strartup crash' 2832 3 8 #() 882 193 193 nil 27 8 'fixStartupCrash' 18 #{UI.CheckBox} 50 16 nil 368 50 2 8 1409363203 1 3104 578 nil nil 624 false nil nil 517 nil nil nil 3104 nil nil 642 nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[203 0 0 0 97 0 0 0 150 1 0 0 146 0 0 0] 193 3136 8 'Viewport (Software render)' 3104 3 8 #() 882 193 193 nil 27 8 'fixViewport' nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[4 0 0 0 24 0 0 0 154 1 0 0 59 1 0 0] 193 400 8 '' 368 3 50 10 2832 2560 1472 1744 512 3104 928 2288 1200 2016 882 193 193 nil 27 322 8 'Keyboard' 18 #{UI.ContainerView} 50 15 nil 160 50 2 8 1140850688 131073 3568 nil nil nil 5 nil nil nil 3568 518 #{UI.ProportionalLayout} 550 #{Core.LookupTable} 0 true 466 #{Core.IdentityDictionary} 50 2 18 #{UI.ListView} 50 45 nil 3568 50 2 8 1409323085 1025 3728 838 2 #{UI.ListModel} 290 0 nil 6 #{Kernel.IdentitySearchPolicy} 240 nil 5 nil nil nil 3728 nil nil 518 #{Core.Message} #displayString 8 #() 3874 #iconImageIndex 8 #() 1350 1 #{Graphics.IconImageManager} nil nil nil nil nil nil 290 2 3142 5 #{UI.ListViewColumn} 8 'Action' 301 #left 3874 #displayString 3904 3874 #<= 8 #() 1382 3 #{Kernel.BlockClosure} 0 nil 1318 #{Kernel.CompiledExpression} 2 1 4096 8 'doIt' 8 '[:val | val caption]' 8 #[30 105 226 0 106] #caption 4112 7 257 nil nil 3728 nil 1 nil nil 4002 8 'Binding' 501 #left 3874 #displayString 8 #() 3874 #<= 4256 4098 0 nil 4130 2 1 4096 8 'doIt' 8 '[:val | val displayBinding]' 8 #[30 105 226 0 106] #displayBinding 4288 7 257 nil nil 3728 nil 1 nil nil #report 8 #() nil 131143 nil 1 nil nil nil nil 1 262 #{UI.ListViewVirtualUpdateMode} 3728 nil nil nil nil nil nil nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[0 0 0 0 0 0 0 0 150 1 0 0 35 1 0 0] 193 3760 8 'Action' 3728 3 8 #() 882 193 193 nil 35 8 'kBindings' nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[4 0 0 0 24 0 0 0 154 1 0 0 59 1 0 0] 193 3600 8 '' 3568 1 50 1 3728 882 193 193 nil 27 322 8 'Controller' 18 #{UI.ContainerView} 50 15 nil 160 50 2 8 1140850688 131073 4784 nil nil nil 5 nil nil nil 4784 130 1 1 nil 18 #{UI.ListView} 50 45 nil 4784 50 2 8 1409388621 1025 4864 3794 290 0 nil 3856 240 nil 5 nil nil nil 4864 nil nil 3874 #displayString 8 #() 3874 #iconImageIndex 8 #() 3968 nil nil nil nil nil nil 290 3 4002 4032 301 #left 3874 #displayString 4976 3874 #<= 8 #() 4098 0 nil 4130 2 1 4096 4160 4176 4192 #caption 5104 7 257 nil nil 4864 nil 1 nil nil 4002 4224 251 #left 3874 #displayString 8 #() 3874 #<= 5168 4098 0 nil 4130 2 1 4096 8 'doIt' 8 '[:val | val displayBinding]' 8 #[30 105 226 0 106] #displayBinding 5200 7 257 nil nil 4864 nil 1 nil nil 4002 8 'Alt binding' 251 #left 3874 #displayString 8 #() 3874 #<= 5328 4098 0 nil 4130 3 1 #{Core.UndefinedObject} 8 'doIt' 8 '[:val | val displayAltBinding]' 8 #[30 105 226 0 106] #displayAltBinding 5360 38 #{Kernel.MethodAnnotations} 2 #namespace: 8 #(#{Smalltalk}) 7 257 nil nil 4864 nil 1 nil nil #report 8 #() nil 131143 nil 1 nil nil nil nil 1 4386 4864 nil nil nil nil nil nil nil nil nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[0 0 0 0 41 0 0 0 150 1 0 0 35 1 0 0] 193 4896 8 'Action' 4864 3 8 #() 882 193 193 nil 35 nil nil nil 466 #{Core.IdentityDictionary} 50 4 4864 8 'cBindings' 18 #{UI.ComboBox} 50 17 nil 4784 50 2 8 1144063491 1025 5728 3794 290 0 nil 3856 240 nil 5 nil nil nil 5728 nil nil 3874 #displayString 8 #() 8 #() 401 674 50 1 722 #createWindow: 50 1 770 802 8 #[68 0 0 0 10 0 0 0 149 1 0 0 215 0 0 0] 193 5760 8 '' 5728 3 8 #() 882 193 193 nil 27 8 'cDevList' nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[4 0 0 0 24 0 0 0 154 1 0 0 59 1 0 0] 193 4816 8 '' 4784 1 50 3 18 #{UI.StaticText} 50 16 nil 4784 50 2 8 1140850944 65 6192 nil nil nil 5 nil nil nil 6192 nil nil 642 nil nil nil 674 50 2 722 #createWindow: 50 1 770 802 8 #[6 0 0 0 13 0 0 0 66 0 0 0 33 0 0 0] 193 6224 nil 6192 722 #text: 50 1 8 'Controller:' 6192 3 8 #() 882 193 193 nil 27 5728 4864 882 193 193 nil 27 322 8 'Wheel' 18 #{UI.ContainerView} 50 15 nil 160 50 2 8 1140850688 131073 6512 nil nil nil 5 nil nil nil 6512 130 1 1 nil nil nil nil nil 466 #{Core.IdentityDictionary} 50 8 18 #{UI.Slider} 50 18 nil 6512 50 2 8 1140916241 1 6624 578 nil false 518 #{Kernel.PluggableSearchPolicy} 3874 #= 8 #() 3874 #hash 8 #() 1 nil nil 5 nil nil nil 6624 nil nil 642 nil nil 3 nil nil 674 50 3 722 #createWindow: 50 1 770 802 8 #[100 0 0 0 9 0 0 0 94 1 0 0 44 0 0 0] 193 6656 8 '' 6624 722 #pageSize: 8 #(50) 6624 722 #range: 50 1 774 #{Core.Interval} 3 501 3 6624 3 8 #() 882 193 193 nil 27 8 'cDeadzone' 18 #{UI.StaticText} 50 16 nil 6512 50 2 8 1140850944 65 7088 nil nil nil 5 nil nil nil 7088 nil nil 642 nil nil nil 674 50 2 722 #createWindow: 50 1 770 802 8 #[99 1 0 0 10 0 0 0 129 1 0 0 30 0 0 0] 193 7120 nil 7088 722 #text: 50 1 8 '0' 7088 3 8 #() 882 193 193 nil 27 8 'cDeadzoneValue' 18 #{UI.Slider} 50 18 nil 6512 50 2 8 1140916241 1 7376 578 nil false 6706 3874 #= 8 #() 3874 #hash 8 #() 201 nil nil 5 nil nil nil 7376 nil nil 1030 #{UI.PluggableTypeConverter} nil nil 4098 0 nil 4130 4 1 4096 8 'doIt' 8 '[:val | (val * 100.0) rounded]' 8 #[31 105 17 29 134 159 106] 8 100.0 #rounded 7568 #* 7 257 nil 4098 0 nil 4130 4 1 4096 8 'doIt' 8 '[:val |  val asFloat / 100.0]' 8 #[31 105 226 0 30 135 106] #asFloat 8 100.0 7664 #/ 7 257 nil 3 nil nil 674 50 3 722 #createWindow: 50 1 770 802 8 #[100 0 0 0 44 0 0 0 94 1 0 0 79 0 0 0] 193 7408 8 '' 7376 722 #pageSize: 8 #(40) 7376 722 #range: 50 1 7010 201 801 3 7376 3 8 #() 882 193 193 nil 27 8 'cSensitivity' 18 #{UI.StaticText} 50 16 nil 6512 50 2 8 1140850944 65 8016 nil nil nil 5 nil nil nil 8016 nil nil 642 nil nil nil 674 50 2 722 #createWindow: 50 1 770 802 8 #[99 1 0 0 45 0 0 0 129 1 0 0 65 0 0 0] 193 8048 nil 8016 722 #text: 50 1 8 '0' 8016 3 8 #() 882 193 193 nil 27 8 'cSensitivityValue' nil 674 50 1 722 #createWindow: 50 1 770 802 8 #[4 0 0 0 24 0 0 0 154 1 0 0 59 1 0 0] 193 6544 8 '' 6512 1 50 6 6624 18 #{UI.StaticText} 50 16 nil 6512 50 2 8 1140850944 65 8448 nil nil nil 5 nil nil nil 8448 nil nil 642 nil nil nil 674 50 2 722 #createWindow: 50 1 770 802 8 #[10 0 0 0 10 0 0 0 80 0 0 0 30 0 0 0] 193 8480 nil 8448 722 #text: 50 1 8 'Deadozone:' 8448 3 8 #() 882 193 193 nil 27 18 #{UI.StaticText} 50 16 nil 6512 50 2 8 1140850944 65 8720 nil nil nil 5 nil nil nil 8720 nil nil 642 nil nil nil 674 50 2 722 #createWindow: 50 1 770 802 8 #[10 0 0 0 45 0 0 0 75 0 0 0 65 0 0 0] 193 8752 nil 8720 722 #text: 50 1 8 'Sensitivity:' 8720 3 8 #() 882 193 193 nil 27 7376 8016 7088 882 193 193 nil 27 368 nil nil nil 550 #{Core.IdentityDictionary} 0 nil 18 #{UI.TabViewXP} 50 28 nil 160 50 2 8 1140851200 1 9040 3794 290 4 352 3552 4768 6496 nil 3856 nil nil 1 nil nil nil 9040 nil nil 3874 #displayString 8 #() 3874 #iconImageIndex 9152 3968 nil nil nil nil nil #noIcons nil nil nil nil nil 674 50 3 722 #createWindow: 50 1 770 802 8 #[0 0 0 0 0 0 0 0 158 1 0 0 63 1 0 0] 193 9072 8 '' 9040 722 #setSingleSelection: 8 #(1) 9040 722 #tcmSetExtendedStyle:dwExStyle: 8 #(-1 0) 9040 3 8 #() 882 193 193 nil 27 674 50 1 722 #createWindow: 50 1 770 802 8 #[10 0 0 0 10 0 0 0 168 1 0 0 73 1 0 0] 193 192 8 '' 160 3 50 5 368 3568 4784 6512 9040 882 193 193 nil 27 nil nil nil nil 9010 0 518 #{Graphics.Rectangle} 882 21 21 882 21 21 nil nil nil nil 1 nil nil nil nil nil nil 193 774 #{Core.Semaphore} nil nil 1 false nil nil nil nil nil 674 50 2 722 #createWindow: 50 1 518 #{UI.CreateDialog} 9586 882 2719 21 882 3619 871 193 32 722 #setWindowText: 50 1 8 '' 32 1 50 3 160 18 #{UI.PushButton} 50 20 nil 32 50 2 8 1140858880 1 9888 nil nil nil 5 nil nil nil 9888 nil nil 1350 4 #{UI.CommandDescription} #ok 8 'OK' 1 1 nil nil false nil nil nil 674 50 2 722 #createWindow: 50 1 770 802 8 #[19 1 0 0 94 1 0 0 89 1 0 0 119 1 0 0] 193 9920 8 'OK' 9888 722 #isEnabled: 8 #(false) 9888 3 8 #() 882 193 193 nil 29 18 #{UI.PushButton} 50 20 nil 32 50 2 8 1140858880 1 10192 nil nil nil 5 nil nil nil 10192 nil nil 9954 #close 8 'Cancel' 1 1 nil nil false nil nil nil 674 50 2 722 #createWindow: 50 1 770 802 8 #[96 1 0 0 94 1 0 0 166 1 0 0 119 1 0 0] 193 10224 8 'Cancel' 10192 722 #isEnabled: 8 #(false) 10192 3 8 #() 882 193 193 nil 29 882 193 193 nil 29)! !

!UI.LauncherSettingsDialog class categoriesForMethods!
fixBindings!INI constants!public! !
resource_Default_view!public!resources-views! !
!


UI.LauncherSessionManager guid: (Core.GUID fromString: '{9e722b06-bd78-4ce6-bf91-bd221ecd11cc}')!

UI.LauncherSessionManager comment: 'Application entry point. Starts the launcher by showing the main LauncherShell window.'!

!UI.LauncherSessionManager methodsFor!

defaultGameDirectory
	"Answer the directory in which the deployed launcher application is located."

	| dir |
	dir := SessionManager current installationDirectory.
	(dir endsWith: '\') ifTrue: [^dir copyFrom: 1 to: dir size - 1].
	^dir!

main
	"Start the launcher application."

	| shell |
	shell := self mainShellClass on: self mainShellClass defaultModel.
	shell gameDirectory: self defaultGameDirectory.
	shell prepareExes.
	shell createView: self mainShellClass defaultView.
	shell showShell.
	! !

!UI.LauncherSessionManager categoriesForMethods!
defaultGameDirectory!public! !
main!public! !
!

!UI.LauncherSessionManager class methodsFor!

mainShellClass
	"Answer the class of the application's main window (a <Shell> presenter)."

	^LauncherShell! !

!UI.LauncherSessionManager class categoriesForMethods!
mainShellClass!public! !
!


UI.DIKeyToText guid: (Core.GUID fromString: '{4e1e2312-92c8-4220-96bc-7dfd13a27288}')!

UI.DIKeyToText comment: 'Converts a DirectInput virtual key code into a human readable key name (e.g. 16 -> ''Q'', 200 -> ''UP'', 28 -> ''ENTER'') using the DI_Keys table. Codes that are not in the table answer ''Unknown key''.'!

!UI.DIKeyToText categoriesForClass!MVP-Type Converters-Text! !

!UI.DIKeyToText methodsFor!

leftToRight: aKey
	^DI_Keys at: aKey ifAbsent: ['Unknown key']! !

!UI.DIKeyToText categoriesForMethods!
leftToRight:!operations!public! !
!

"Binary Variables"!

