| package |
package := Package name: 'WinMMJoystick'.
package paxVersion: 2.1;
	basicComment: 'Joystick support in WinMM.'.


package setClassNames: #(
	#{OS.JOYCAPS}
	#{OS.JOYINFO}
	#{OS.JOYINFOEX}
	#{OS.WinMMConstants}
).

package setMethodNames: #(
	#(#{OS.WinMMLibrary} #joyGetDevCaps:pjc:cbjc:)
	#(#{OS.WinMMLibrary} #joyGetNumDevices)
	#(#{OS.WinMMLibrary} #joyGetPos:pji:)
	#(#{OS.WinMMLibrary} #joyGetPosEx:pji:)
).

package setPrerequisites: #(
	'..\..\..\..\..\Admin\Documents\Dolphin Smalltalk 8\Core\Object Arts\Dolphin\Base\Dolphin'
).

package!

"Class Definitions"!

Kernel.SharedPool
	subclass: #'OS.WinMMConstants'
	instanceVariableNames: ''
	classVariableNames: ''
	imports: #()
	classInstanceVariableNames: ''
	classConstants: {
			'JOY_BUTTON1' -> 16r1.
			'JOY_BUTTON10' -> 16r200.
			'JOY_BUTTON11' -> 16r400.
			'JOY_BUTTON12' -> 16r800.
			'JOY_BUTTON13' -> 16r1000.
			'JOY_BUTTON14' -> 16r2000.
			'JOY_BUTTON15' -> 16r4000.
			'JOY_BUTTON16' -> 16r8000.
			'JOY_BUTTON17' -> 16r10000.
			'JOY_BUTTON18' -> 16r20000.
			'JOY_BUTTON19' -> 16r40000.
			'JOY_BUTTON2' -> 16r2.
			'JOY_BUTTON20' -> 16r80000.
			'JOY_BUTTON21' -> 16r100000.
			'JOY_BUTTON22' -> 16r200000.
			'JOY_BUTTON23' -> 16r400000.
			'JOY_BUTTON24' -> 16r800000.
			'JOY_BUTTON25' -> 16r1000000.
			'JOY_BUTTON26' -> 16r2000000.
			'JOY_BUTTON27' -> 16r4000000.
			'JOY_BUTTON28' -> 16r8000000.
			'JOY_BUTTON29' -> 16r10000000.
			'JOY_BUTTON3' -> 16r4.
			'JOY_BUTTON30' -> 16r20000000.
			'JOY_BUTTON31' -> 16r40000000.
			'JOY_BUTTON32' -> 16r80000000.
			'JOY_BUTTON4' -> 16r8.
			'JOY_BUTTON5' -> 16r10.
			'JOY_BUTTON6' -> 16r20.
			'JOY_BUTTON7' -> 16r40.
			'JOY_BUTTON8' -> 16r80.
			'JOY_BUTTON9' -> 16r100.
			'JOY_CAL_READ3' -> 16r40000.
			'JOY_CAL_READ4' -> 16r80000.
			'JOY_CAL_READ5' -> 16r400000.
			'JOY_CAL_READ6' -> 16r800000.
			'JOY_CAL_READALWAYS' -> 16r10000.
			'JOY_CAL_READRONLY' -> 16r2000000.
			'JOY_CAL_READUONLY' -> 16r4000000.
			'JOY_CAL_READVONLY' -> 16r8000000.
			'JOY_CAL_READXONLY' -> 16r100000.
			'JOY_CAL_READXYONLY' -> 16r20000.
			'JOY_CAL_READYONLY' -> 16r200000.
			'JOY_CAL_READZONLY' -> 16r1000000.
			'JOY_POVBACKWARD' -> 16r4650.
			'JOY_POVCENTERED' -> 16rFFFF.
			'JOY_POVFORWARD' -> 16r0.
			'JOY_POVLEFT' -> 16r6978.
			'JOY_POVRIGHT' -> 16r2328.
			'JOY_RETURNALL' -> 16rFF.
			'JOY_RETURNBUTTONS' -> 16r80.
			'JOY_RETURNCENTERED' -> 16r400.
			'JOY_RETURNPOV' -> 16r40.
			'JOY_RETURNPOVCTS' -> 16r200.
			'JOY_RETURNR' -> 16r8.
			'JOY_RETURNRAWDATA' -> 16r100.
			'JOY_RETURNU' -> 16r10.
			'JOY_RETURNV' -> 16r20.
			'JOY_RETURNX' -> 16r1.
			'JOY_RETURNY' -> 16r2.
			'JOY_RETURNZ' -> 16r4.
			'JOY_USEDEADZONE' -> 16r800.
			'JOYCAPS_HASPOV' -> 16r10.
			'JOYCAPS_HASR' -> 16r2.
			'JOYCAPS_HASU' -> 16r4.
			'JOYCAPS_HASV' -> 16r8.
			'JOYCAPS_HASZ' -> 16r1.
			'JOYCAPS_POV4DIR' -> 16r20.
			'JOYCAPS_POVCTS' -> 16r40.
			'JOYERR_NOCANDO' -> 16rA6.
			'JOYERR_NOERROR' -> 16r0.
			'JOYERR_PARMS' -> 16rA5.
			'JOYERR_UNPLUGGED' -> 16rA7.
			'MAX_JOYSTICKOEMVXDNAME' -> 16r104.
			'MAXPNAMELEN' -> 16r20
		}!

External.Structure
	subclass: #'OS.JOYCAPS'
	instanceVariableNames: ''
	classVariableNames: ''
	imports: #(#{OS.WinMMConstants})
	classInstanceVariableNames: ''
	classConstants: {
			'_JOYCAPS_Size' -> 16r2D8.
			'_OffsetOf_szOEMVxD' -> 16rD0.
			'_OffsetOf_szPname' -> 16r4.
			'_OffsetOf_szRegKey' -> 16r90.
			'_OffsetOf_wCaps' -> 16r80.
			'_OffsetOf_wMaxAxes' -> 16r84.
			'_OffsetOf_wMaxButtons' -> 16r8C.
			'_OffsetOf_wMid' -> 16r0.
			'_OffsetOf_wNumAxes' -> 16r88.
			'_OffsetOf_wNumButtons' -> 16r5C.
			'_OffsetOf_wPeriodMax' -> 16r64.
			'_OffsetOf_wPeriodMin' -> 16r60.
			'_OffsetOf_wPid' -> 16r2.
			'_OffsetOf_wRmax' -> 16r6C.
			'_OffsetOf_wRmin' -> 16r68.
			'_OffsetOf_wUmax' -> 16r74.
			'_OffsetOf_wUmin' -> 16r70.
			'_OffsetOf_wVmax' -> 16r7C.
			'_OffsetOf_wVmin' -> 16r78.
			'_OffsetOf_wXmax' -> 16r48.
			'_OffsetOf_wXmin' -> 16r44.
			'_OffsetOf_wYmax' -> 16r50.
			'_OffsetOf_wYmin' -> 16r4C.
			'_OffsetOf_wZmax' -> 16r58.
			'_OffsetOf_wZmin' -> 16r54
		}!

External.Structure
	subclass: #'OS.JOYINFO'
	instanceVariableNames: ''
	classVariableNames: ''
	imports: #(#{OS.WinMMConstants})
	classInstanceVariableNames: ''
	classConstants: {
			'_JOYINFO_Size' -> 16r10.
			'_OffsetOf_wButtons' -> 16rC.
			'_OffsetOf_wXpos' -> 16r0.
			'_OffsetOf_wYpos' -> 16r4.
			'_OffsetOf_wZpos' -> 16r8
		}!

OS.SizedStructure
	subclass: #'OS.JOYINFOEX'
	instanceVariableNames: ''
	classVariableNames: ''
	imports: #(#{OS.WinMMConstants})
	classInstanceVariableNames: ''
	classConstants: {
			'_JOYINFOEX_Size' -> 16r34.
			'_OffsetOf_dwButtonNumber' -> 16r24.
			'_OffsetOf_dwButtons' -> 16r20.
			'_OffsetOf_dwFlags' -> 16r4.
			'_OffsetOf_dwPOV' -> 16r28.
			'_OffsetOf_dwReserved1' -> 16r2C.
			'_OffsetOf_dwReserved2' -> 16r30.
			'_OffsetOf_dwRpos' -> 16r14.
			'_OffsetOf_dwUpos' -> 16r18.
			'_OffsetOf_dwVpos' -> 16r1C.
			'_OffsetOf_dwXpos' -> 16r8.
			'_OffsetOf_dwYpos' -> 16rC.
			'_OffsetOf_dwZpos' -> 16r10
		}!

"Loose Methods"!

!OS.WinMMLibrary methodsFor!

joyGetDevCaps: uJoyID pjc: lpJoyCaps cbjc: size
	"The joyGetDevCaps function queries a joystick to determine its capabilities."

	"MMRESULT joyGetDevCapsW(
		  UINT_PTR   uJoyID,
		  LPJOYCAPSW pjc,
		  UINT       cbjc 
	);"

	<stdcall: dword joyGetDevCapsW dword lpvoid dword>
	^self invalidCall: _failureCode!

joyGetNumDevices
	"The joyGetNumDevs function queries the joystick driver for the number of joysticks it supports."

	"UINT joyGetNumDevs();"

	<stdcall: dword joyGetNumDevs>
	^self invalidCall: _failureCode!

joyGetPos: uJoyID pji: lpJoyInfo
	"The joyGetPos function queries a joystick for its position and button status."

	"MMRESULT joyGetPos(
		UINT      uJoyID,
		LPJOYINFO pji
	);"

	<stdcall: dword joyGetPos dword JOYINFO*>
	^self invalidCall: _failureCode!

joyGetPosEx: uJoyID pji: lpJoyInfoEx
	"The joyGetPosEx function queries a joystick for its position and button status."

	"MMRESULT joyGetPosEx(
		UINT        uJoyID,
		 LPJOYINFOEX pji
	);"

	<stdcall: dword joyGetPosEx dword JOYINFOEX*>
	^self invalidCall: _failureCode! !

!OS.WinMMLibrary categoriesForMethods!
joyGetDevCaps:pjc:cbjc:!public! !
joyGetNumDevices!public! !
joyGetPos:pji:!public! !
joyGetPosEx:pji:!public! !
!

"End of package definition"!

"Classes"!

OS.WinMMConstants guid: (Core.GUID fromString: '{9134c6e0-85d2-4231-ad79-9af36961a297}')!

OS.WinMMConstants isNonInstantiable: true!

OS.WinMMConstants comment: ''!


OS.JOYCAPS guid: (Core.GUID fromString: '{55bbc601-7d88-4726-bca1-ad958e948810}')!

OS.JOYCAPS comment: '<JOYCAPS> is an <ExternalStructure> class to wrap the struct ''JOYCAPS'' from type information in the ''Windows Multimedia API'' library.

The JOYCAPS structure contains information about the joystick capabilities.'!

!OS.JOYCAPS categoriesForClass!Win32-Structs! !

!OS.JOYCAPS methodsFor!

szOEMVxD
	"Answer the <Utf16String> value of the receiver's 'szOEMVxD' field."

	^Utf16String fromAddress: bytes yourAddress + _OffsetOf_szOEMVxD!

szOEMVxD: anUtf16String
	"Set the receiver's 'szOEMVxD' field to the value of the argument, anUtf16String"

	| size |
	size := anUtf16String byteSize - 2 min: ##(259 * 2).
	anUtf16String
		replaceBytesOf: bytes
		from: ##(_OffsetOf_szOEMVxD + 1)
		to: _OffsetOf_szOEMVxD + size
		startingAt: 1.
	bytes uint16AtOffset: _OffsetOf_szOEMVxD + size put: 0!

szPname
	"Answer the <Utf16String> value of the receiver's 'szPname' field."

	^Utf16String fromAddress: bytes yourAddress + _OffsetOf_szPname!

szPname: anUtf16String
	"Set the receiver's 'szPname' field to the value of the argument, anUtf16String"

	| size |
	size := anUtf16String byteSize - 2 min: ##(31 * 2).
	anUtf16String
		replaceBytesOf: bytes
		from: ##(_OffsetOf_szPname + 1)
		to: _OffsetOf_szPname + size
		startingAt: 1.
	bytes uint16AtOffset: _OffsetOf_szPname + size put: 0!

szRegKey
	"Answer the <Utf16String> value of the receiver's 'szRegKey' field."

	^Utf16String fromAddress: bytes yourAddress + _OffsetOf_szRegKey!

szRegKey: anUtf16String
	"Set the receiver's 'szRegKey' field to the value of the argument, anUtf16String"

	| size |
	size := anUtf16String byteSize - 2 min: ##(31 * 2).
	anUtf16String
		replaceBytesOf: bytes
		from: ##(_OffsetOf_szRegKey + 1)
		to: _OffsetOf_szRegKey + size
		startingAt: 1.
	bytes uint16AtOffset: _OffsetOf_szRegKey + size put: 0!

wCaps
	"Answer the <Integer> value of the receiver's 'wCaps' field."

	^bytes uint32AtOffset: _OffsetOf_wCaps!

wMaxAxes
	"Answer the <Integer> value of the receiver's 'wMaxAxes' field."

	^bytes uint32AtOffset: _OffsetOf_wMaxAxes!

wMaxButtons
	"Answer the <Integer> value of the receiver's 'wMaxButtons' field."

	^bytes uint32AtOffset: _OffsetOf_wMaxButtons!

wMid
	"Answer the <Integer> value of the receiver's 'wMid' field."

	^bytes uint16AtOffset: _OffsetOf_wMid!

wNumAxes
	"Answer the <Integer> value of the receiver's 'wNumAxes' field."

	^bytes uint32AtOffset: _OffsetOf_wNumAxes!

wNumButtons
	"Answer the <Integer> value of the receiver's 'wNumButtons' field."

	^bytes uint32AtOffset: _OffsetOf_wNumButtons!

wPeriodMax
	"Answer the <Integer> value of the receiver's 'wPeriodMax' field."

	^bytes uint32AtOffset: _OffsetOf_wPeriodMax!

wPeriodMin
	"Answer the <Integer> value of the receiver's 'wPeriodMin' field."

	^bytes uint32AtOffset: _OffsetOf_wPeriodMin!

wPid
	"Answer the <Integer> value of the receiver's 'wPid' field."

	^bytes uint16AtOffset: _OffsetOf_wPid!

wRmax
	"Answer the <Integer> value of the receiver's 'wRmax' field."

	^bytes uint32AtOffset: _OffsetOf_wRmax!

wRmin
	"Answer the <Integer> value of the receiver's 'wRmin' field."

	^bytes uint32AtOffset: _OffsetOf_wRmin!

wUmax
	"Answer the <Integer> value of the receiver's 'wUmax' field."

	^bytes uint32AtOffset: _OffsetOf_wUmax!

wUmin
	"Answer the <Integer> value of the receiver's 'wUmin' field."

	^bytes uint32AtOffset: _OffsetOf_wUmin!

wVmax
	"Answer the <Integer> value of the receiver's 'wVmax' field."

	^bytes uint32AtOffset: _OffsetOf_wVmax!

wVmin
	"Answer the <Integer> value of the receiver's 'wVmin' field."

	^bytes uint32AtOffset: _OffsetOf_wVmin!

wXmax
	"Answer the <Integer> value of the receiver's 'wXmax' field."

	^bytes uint32AtOffset: _OffsetOf_wXmax!

wXmin
	"Answer the <Integer> value of the receiver's 'wXmin' field."

	^bytes uint32AtOffset: _OffsetOf_wXmin!

wYmax
	"Answer the <Integer> value of the receiver's 'wYmax' field."

	^bytes uint32AtOffset: _OffsetOf_wYmax!

wYmin
	"Answer the <Integer> value of the receiver's 'wYmin' field."

	^bytes uint32AtOffset: _OffsetOf_wYmin!

wZmax
	"Answer the <Integer> value of the receiver's 'wZmax' field."

	^bytes uint32AtOffset: _OffsetOf_wZmax!

wZmin
	"Answer the <Integer> value of the receiver's 'wZmin' field."

	^bytes uint32AtOffset: _OffsetOf_wZmin! !

!OS.JOYCAPS categoriesForMethods!
szOEMVxD!**compiled accessors**!public! !
szOEMVxD:!**compiled accessors**!public! !
szPname!**compiled accessors**!public! !
szPname:!**compiled accessors**!public! !
szRegKey!**compiled accessors**!public! !
szRegKey:!**compiled accessors**!public! !
wCaps!**compiled accessors**!public! !
wMaxAxes!**compiled accessors**!public! !
wMaxButtons!**compiled accessors**!public! !
wMid!**compiled accessors**!public! !
wNumAxes!**compiled accessors**!public! !
wNumButtons!**compiled accessors**!public! !
wPeriodMax!**compiled accessors**!public! !
wPeriodMin!**compiled accessors**!public! !
wPid!**compiled accessors**!public! !
wRmax!**compiled accessors**!public! !
wRmin!**compiled accessors**!public! !
wUmax!**compiled accessors**!public! !
wUmin!**compiled accessors**!public! !
wVmax!**compiled accessors**!public! !
wVmin!**compiled accessors**!public! !
wXmax!**compiled accessors**!public! !
wXmin!**compiled accessors**!public! !
wYmax!**compiled accessors**!public! !
wYmin!**compiled accessors**!public! !
wZmax!**compiled accessors**!public! !
wZmin!**compiled accessors**!public! !
!

!OS.JOYCAPS class methodsFor!

byteSize
	^_JOYCAPS_Size!

defineFields
	"typedef struct joycaps_tag {
		WORD wMid;
		WORD wPid;
		WCHAR szPname[MAXPNAMELEN];
		UINT wXmin;
		UINT wXmax;
		UINT wYmin;
		UINT wYmax;
		UINT wZmin;
		UINT wZmax;
		UINT wNumButtons;
		UINT wPeriodMin;
		UINT wPeriodMax;
		UINT wRmin;
		UINT wRmax;
		UINT wUmin;
		UINT wUmax;
		UINT wVmin;
		UINT wVmax;
		UINT wCaps;
		UINT wMaxAxes;
		UINT wNumAxes;
		UINT wMaxButtons;
		WCHAR szRegKey[MAXPNAMELEN];
		WCHAR szOEMVxD[MAX_JOYSTICKOEMVXDNAME];
	} JOYCAPS;"

	self
		defineField: #wMid type: UInt16Field readOnly;
		defineField: #wPid type: UInt16Field readOnly;
		defineField: #szPname type: (StringField type: Utf16String length: WinMMConstants.MAXPNAMELEN);
		defineField: #wXmin type: UInt32Field readOnly;
		defineField: #wXmax type: UInt32Field readOnly;
		defineField: #wYmin type: UInt32Field readOnly;
		defineField: #wYmax type: UInt32Field readOnly;
		defineField: #wZmin type: UInt32Field readOnly;
		defineField: #wZmax type: UInt32Field readOnly;
		defineField: #wNumButtons type: UInt32Field readOnly;
		defineField: #wPeriodMin type: UInt32Field readOnly;
		defineField: #wPeriodMax type: UInt32Field readOnly;
		defineField: #wRmin type: UInt32Field readOnly;
		defineField: #wRmax type: UInt32Field readOnly;
		defineField: #wUmin type: UInt32Field readOnly;
		defineField: #wUmax type: UInt32Field readOnly;
		defineField: #wVmin type: UInt32Field readOnly;
		defineField: #wVmax type: UInt32Field readOnly;
		defineField: #wCaps type: UInt32Field readOnly;
		defineField: #wMaxAxes type: UInt32Field readOnly;
		defineField: #wNumAxes type: UInt32Field readOnly;
		defineField: #wMaxButtons type: UInt32Field readOnly;
		defineField: #szRegKey type: (StringField type: Utf16String length: WinMMConstants.MAXPNAMELEN);
		defineField: #szOEMVxD type: (StringField type: Utf16String length: WinMMConstants.MAX_JOYSTICKOEMVXDNAME)!

getFieldNames
	^#(#wMid #wPid #szPname #wXmin #wXmax #wYmin #wYmax #wZmin #wZmax #wNumButtons #wPeriodMin #wPeriodMax #wRmin #wRmax #wUmin #wUmax #wVmin #wVmax #wCaps #wMaxAxes #wNumAxes #wMaxButtons #szRegKey #szOEMVxD)! !

!OS.JOYCAPS class categoriesForMethods!
byteSize!**compiled accessors**!constants!public! !
defineFields!public! !
getFieldNames!**compiled accessors**!constants!private! !
!


OS.JOYINFO guid: (Core.GUID fromString: '{f041ea20-ad7c-4002-8dd0-5361f8baf396}')!

OS.JOYINFO comment: '<JOYINFO> is an <ExternalStructure> class to wrap the struct ''JOYINFO'' from type information in the ''Windows Multimedia API'' library.

The JOYINFO structure contains information about the joystick position and button state.'!

!OS.JOYINFO categoriesForClass!Win32-Structs! !

!OS.JOYINFO methodsFor!

wButtons
	"Answer the <Integer> value of the receiver's 'wButtons' field."

	^bytes uint32AtOffset: _OffsetOf_wButtons!

wXpos
	"Answer the <Integer> value of the receiver's 'wXpos' field."

	^bytes uint32AtOffset: _OffsetOf_wXpos!

wYpos
	"Answer the <Integer> value of the receiver's 'wYpos' field."

	^bytes uint32AtOffset: _OffsetOf_wYpos!

wZpos
	"Answer the <Integer> value of the receiver's 'wZpos' field."

	^bytes uint32AtOffset: _OffsetOf_wZpos! !

!OS.JOYINFO categoriesForMethods!
wButtons!**compiled accessors**!public! !
wXpos!**compiled accessors**!public! !
wYpos!**compiled accessors**!public! !
wZpos!**compiled accessors**!public! !
!

!OS.JOYINFO class methodsFor!

byteSize
	^_JOYINFO_Size!

defineFields
	"typedef struct {
		UINT wXpos;
		UINT wYpos;
		UINT wZpos;
		UINT wButtons;
	} JOYINFO;"

	self
		defineField: #wXpos type: UInt32Field readOnly;
		defineField: #wYpos type: UInt32Field readOnly;
		defineField: #wZpos type: UInt32Field readOnly;
		defineField: #wButtons type: UInt32Field readOnly!

getFieldNames
	^#(#wXpos #wYpos #wZpos #wButtons)! !

!OS.JOYINFO class categoriesForMethods!
byteSize!**compiled accessors**!constants!public! !
defineFields!public! !
getFieldNames!**compiled accessors**!constants!private! !
!


OS.JOYINFOEX guid: (Core.GUID fromString: '{d7455449-9a01-4508-b0e9-0ae4bf3c02cc}')!

OS.JOYINFOEX comment: '<JOYINFOEX> is an <ExternalStructure> class to wrap the struct ''JOYINFOEX'' from type information in the ''Windows Multimedia API'' library.

The JOYINFOEX structure contains information about the joystick position and button state.'!

!OS.JOYINFOEX categoriesForClass!External-Data-Structured-Win32! !

!OS.JOYINFOEX methodsFor!

dwButtonNumber
	"Answer the <Integer> value of the receiver's 'dwButtonNumber' field."

	^bytes uint32AtOffset: _OffsetOf_dwButtonNumber!

dwButtons
	"Answer the <Integer> value of the receiver's 'dwButtons' field."

	^bytes uint32AtOffset: _OffsetOf_dwButtons!

dwFlags
	"Answer the <Integer> value of the receiver's 'dwFlags' field."

	^bytes uint32AtOffset: _OffsetOf_dwFlags!

dwFlags: anInteger
	"Set the receiver's 'dwFlags' field to the value of the argument, anInteger"

	bytes uint32AtOffset: _OffsetOf_dwFlags put: anInteger!

dwPOV
	"Answer the <Integer> value of the receiver's 'dwPOV' field."

	^bytes uint32AtOffset: _OffsetOf_dwPOV!

dwRpos
	"Answer the <Integer> value of the receiver's 'dwRpos' field."

	^bytes uint32AtOffset: _OffsetOf_dwRpos!

dwUpos
	"Answer the <Integer> value of the receiver's 'dwUpos' field."

	^bytes uint32AtOffset: _OffsetOf_dwUpos!

dwVpos
	"Answer the <Integer> value of the receiver's 'dwVpos' field."

	^bytes uint32AtOffset: _OffsetOf_dwVpos!

dwXpos
	"Answer the <Integer> value of the receiver's 'dwXpos' field."

	^bytes uint32AtOffset: _OffsetOf_dwXpos!

dwYpos
	"Answer the <Integer> value of the receiver's 'dwYpos' field."

	^bytes uint32AtOffset: _OffsetOf_dwYpos!

dwZpos
	"Answer the <Integer> value of the receiver's 'dwZpos' field."

	^bytes uint32AtOffset: _OffsetOf_dwZpos! !

!OS.JOYINFOEX categoriesForMethods!
dwButtonNumber!**compiled accessors**!public! !
dwButtons!**compiled accessors**!public! !
dwFlags!**compiled accessors**!public! !
dwFlags:!**compiled accessors**!public! !
dwPOV!**compiled accessors**!public! !
dwRpos!**compiled accessors**!public! !
dwUpos!**compiled accessors**!public! !
dwVpos!**compiled accessors**!public! !
dwXpos!**compiled accessors**!public! !
dwYpos!**compiled accessors**!public! !
dwZpos!**compiled accessors**!public! !
!

!OS.JOYINFOEX class methodsFor!

byteSize
	^_JOYINFOEX_Size!

defineFields
	"typedef struct joyinfoex_tag {
		DWORD dwSize;
		DWORD dwFlags;
		DWORD dwXpos;
		DWORD dwYpos;
		DWORD dwZpos;
		DWORD dwRpos;
		DWORD dwUpos;
		DWORD dwVpos;
		DWORD dwButtons;
		DWORD dwButtonNumber;
		DWORD dwPOV;
		DWORD dwReserved1;
		DWORD dwReserved2;
	} JOYINFOEX;"

	self
		defineField: #dwSize type: UInt32Field new beWriteOnly;
		defineField: #dwFlags type: UInt32Field new;
		defineField: #dwXpos type: UInt32Field readOnly;
		defineField: #dwYpos type: UInt32Field readOnly;
		defineField: #dwZpos type: UInt32Field readOnly;
		defineField: #dwRpos type: UInt32Field readOnly;
		defineField: #dwUpos type: UInt32Field readOnly;
		defineField: #dwVpos type: UInt32Field readOnly;
		defineField: #dwButtons type: UInt32Field readOnly;
		defineField: #dwButtonNumber type: UInt32Field readOnly;
		defineField: #dwPOV type: UInt32Field readOnly;
		defineField: #dwReserved1 type: UInt32Field filler;
		defineField: #dwReserved2 type: UInt32Field filler!

getFieldNames
	^#(#dwSize #dwFlags #dwXpos #dwYpos #dwZpos #dwRpos #dwUpos #dwVpos #dwButtons #dwButtonNumber #dwPOV)! !

!OS.JOYINFOEX class categoriesForMethods!
byteSize!**compiled accessors**!constants!public! !
defineFields!public! !
getFieldNames!**compiled accessors**!constants!private! !
!

"Binary Variables"!

