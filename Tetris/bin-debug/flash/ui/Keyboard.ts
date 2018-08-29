/// <reference path="../../base.d.ts" />
/// <reference path="../system/Capabilities.ts" />

namespace flash.ui
{
	export import Capabilities = flash.system.Capabilities;
	

	/**
	 * The Keyboard class is used to build an interface that can be controlled by a user with a standard keyboard. 
	 * You can use the methods and properties of the Keyboard class without using a constructor. 
	 * The properties of the Keyboard class are constants representing the keys that are most commonly used to control games. 
	 * @author pkulikov
	 * 
	 */	
	export  class Keyboard
	{
		
		public static KEYNAME_UPARROW:string = "Up";
		
		public static KEYNAME_DOWNARROW:string = "Down";
		
		public static KEYNAME_LEFTARROW:string = "Left";
		
		public static KEYNAME_RIGHTARROW:string = "Right";
		
		public static KEYNAME_F1:string = "F1";
		
		public static KEYNAME_F2:string = "F2";
		
		public static KEYNAME_F3:string = "F3";
		
		public static KEYNAME_F4:string = "F4";
		
		public static KEYNAME_F5:string = "F5";
		
		public static KEYNAME_F6:string = "F6";
		
		public static KEYNAME_F7:string = "F7";
		
		public static KEYNAME_F8:string = "F8";
		
		public static KEYNAME_F9:string = "F9";
		
		public static KEYNAME_F10:string = "F10";
		
		public static KEYNAME_F11:string = "F11";
		
		public static KEYNAME_F12:string = "F12";
		
		public static KEYNAME_F13:string = "F13";
		
		public static KEYNAME_F14:string = "F14";
		
		public static KEYNAME_F15:string = "F15";
		
		public static KEYNAME_F16:string = "F16";
		
		public static KEYNAME_F17:string = "F17";
		
		public static KEYNAME_F18:string = "F18";
		
		public static KEYNAME_F19:string = "F19";
		
		public static KEYNAME_F20:string = "F20";
		
		public static KEYNAME_F21:string = "F21";
		
		public static KEYNAME_F22:string = "F22";
		
		public static KEYNAME_F23:string = "F23";
		
		public static KEYNAME_F24:string = "F24";
		
		public static KEYNAME_F25:string = "F25";
		
		public static KEYNAME_F26:string = "F26";
		
		public static KEYNAME_F27:string = "F27";
		
		public static KEYNAME_F28:string = "F28";
		
		public static KEYNAME_F29:string = "F29";
		
		public static KEYNAME_F30:string = "F30";
		
		public static KEYNAME_F31:string = "F31";
		
		public static KEYNAME_F32:string = "F32";
		
		public static KEYNAME_F33:string = "F33";
		
		public static KEYNAME_F34:string = "F34";
		
		public static KEYNAME_F35:string = "F35";
		
		public static KEYNAME_INSERT:string = "Insert";
		
		public static KEYNAME_DELETE:string = "Delete";
		
		public static KEYNAME_HOME:string = "Home";
		
		public static KEYNAME_BEGIN:string = "Begin";
		
		public static KEYNAME_END:string = "End";
		
		public static KEYNAME_PAGEUP:string = "PgUp";
		
		public static KEYNAME_PAGEDOWN:string = "PgDn";
		
		public static KEYNAME_PRINTSCREEN:string = "PrntScrn";
		
		public static KEYNAME_SCROLLLOCK:string = "ScrlLck";
		
		public static KEYNAME_PAUSE:string = "Pause";
		
		public static KEYNAME_SYSREQ:string = "SysReq";
		
		public static KEYNAME_BREAK:string = "Break";
		
		public static KEYNAME_RESET:string = "Reset";
		
		public static KEYNAME_STOP:string = "Stop";
		
		public static KEYNAME_MENU:string = "Menu";
		
		public static KEYNAME_USER:string = "User";
		
		public static KEYNAME_SYSTEM:string = "Sys";
		
		public static KEYNAME_PRINT:string = "Print";
		
		public static KEYNAME_CLEARLINE:string = "ClrLn";
		
		public static KEYNAME_CLEARDISPLAY:string = "ClrDsp";
		
		public static KEYNAME_INSERTLINE:string = "InsLn";
		
		public static KEYNAME_DELETELINE:string = "DelLn";
		
		public static KEYNAME_INSERTCHAR:string = "InsChr";
		
		public static KEYNAME_DELETECHAR:string = "DelChr";
		
		public static KEYNAME_PREV:string = "Prev";
		
		public static KEYNAME_NEXT:string = "Next";
		
		public static KEYNAME_SELECT:string = "Select";
		
		public static KEYNAME_EXECUTE:string = "Exec";
		
		public static KEYNAME_UNDO:string = "Undo";
		
		public static KEYNAME_REDO:string = "Redo";
		
		public static KEYNAME_FIND:string = "Find";
		
		public static KEYNAME_HELP:string = "Help";
		
		public static KEYNAME_MODESWITCH:string = "ModeSw";
		
		public static STRING_UPARROW:string = "";
		
		public static STRING_DOWNARROW:string = "";
		
		public static STRING_LEFTARROW:string = "";
		
		public static STRING_RIGHTARROW:string = "";
		
		public static STRING_F1:string = "";
		
		public static STRING_F2:string = "";
		
		public static STRING_F3:string = "";
		
		public static STRING_F4:string = "";
		
		public static STRING_F5:string = "";
		
		public static STRING_F6:string = "";
		
		public static STRING_F7:string = "";
		
		public static STRING_F8:string = "";
		
		public static STRING_F9:string = "";
		
		public static STRING_F10:string = "";
		
		public static STRING_F11:string = "";
		
		public static STRING_F12:string = "";
		
		public static STRING_F13:string = "";
		
		public static STRING_F14:string = "";
		
		public static STRING_F15:string = "";
		
		public static STRING_F16:string = "";
		
		public static STRING_F17:string = "";
		
		public static STRING_F18:string = "";
		
		public static STRING_F19:string = "";
		
		public static STRING_F20:string = "";
		
		public static STRING_F21:string = "";
		
		public static STRING_F22:string = "";
		
		public static STRING_F23:string = "";
		
		public static STRING_F24:string = "";
		
		public static STRING_F25:string = "";
		
		public static STRING_F26:string = "";
		
		public static STRING_F27:string = "";
		
		public static STRING_F28:string = "";
		
		public static STRING_F29:string = "";
		
		public static STRING_F30:string = "";
		
		public static STRING_F31:string = "";
		
		public static STRING_F32:string = "";
		
		public static STRING_F33:string = "";
		
		public static STRING_F34:string = "";
		
		public static STRING_F35:string = "";
		
		public static STRING_INSERT:string = "";
		
		public static STRING_DELETE:string = "";
		
		public static STRING_HOME:string = "";
		
		public static STRING_BEGIN:string = "";
		
		public static STRING_END:string = "";
		
		public static STRING_PAGEUP:string = "";
		
		public static STRING_PAGEDOWN:string = "";
		
		public static STRING_PRINTSCREEN:string = "";
		
		public static STRING_SCROLLLOCK:string = "";
		
		public static STRING_PAUSE:string = "";
		
		public static STRING_SYSREQ:string = "";
		
		public static STRING_BREAK:string = "";
		
		public static STRING_RESET:string = "";
		
		public static STRING_STOP:string = "";
		
		public static STRING_MENU:string = "";
		
		public static STRING_USER:string = "";
		
		public static STRING_SYSTEM:string = "";
		
		public static STRING_PRINT:string = "";
		
		public static STRING_CLEARLINE:string = "";
		
		public static STRING_CLEARDISPLAY:string = "";
		
		public static STRING_INSERTLINE:string = "";
		
		public static STRING_DELETELINE:string = "";
		
		public static STRING_INSERTCHAR:string = "";
		
		public static STRING_DELETECHAR:string = "";
		
		public static STRING_PREV:string = "";
		
		public static STRING_NEXT:string = "";
		
		public static STRING_SELECT:string = "";
		
		public static STRING_EXECUTE:string = "";
		
		public static STRING_UNDO:string = "";
		
		public static STRING_REDO:string = "";
		
		public static STRING_FIND:string = "";
		
		public static STRING_HELP:string = "";
		
		public static STRING_MODESWITCH:string = "";
		
		public static CharCodeStrings:any[] = asc.sti(Keyboard,()=>{ Keyboard.CharCodeStrings = [Keyboard.KEYNAME_UPARROW, Keyboard.KEYNAME_DOWNARROW, Keyboard.KEYNAME_LEFTARROW, Keyboard.KEYNAME_RIGHTARROW, Keyboard.KEYNAME_F1, Keyboard.KEYNAME_F2, Keyboard.KEYNAME_F3, Keyboard.KEYNAME_F4, Keyboard.KEYNAME_F5, Keyboard.KEYNAME_F6, Keyboard.KEYNAME_F7, Keyboard.KEYNAME_F8, Keyboard.KEYNAME_F9, Keyboard.KEYNAME_F10, Keyboard.KEYNAME_F11, Keyboard.KEYNAME_F12, Keyboard.KEYNAME_F13, Keyboard.KEYNAME_F14, Keyboard.KEYNAME_F15, Keyboard.KEYNAME_F16, Keyboard.KEYNAME_F17, Keyboard.KEYNAME_F18, Keyboard.KEYNAME_F19, Keyboard.KEYNAME_F20, Keyboard.KEYNAME_F21, Keyboard.KEYNAME_F22, Keyboard.KEYNAME_F23, Keyboard.KEYNAME_F24, Keyboard.KEYNAME_F25, Keyboard.KEYNAME_F26, Keyboard.KEYNAME_F27, Keyboard.KEYNAME_F28, Keyboard.KEYNAME_F29, Keyboard.KEYNAME_F30, Keyboard.KEYNAME_F31, Keyboard.KEYNAME_F32, Keyboard.KEYNAME_F33, Keyboard.KEYNAME_F34, Keyboard.KEYNAME_F35, Keyboard.KEYNAME_INSERT, Keyboard.KEYNAME_DELETE, Keyboard.KEYNAME_HOME, Keyboard.KEYNAME_BEGIN, Keyboard.KEYNAME_END, Keyboard.KEYNAME_PAGEUP, Keyboard.KEYNAME_PAGEDOWN, Keyboard.KEYNAME_PRINTSCREEN, Keyboard.KEYNAME_SCROLLLOCK, Keyboard.KEYNAME_PAUSE, Keyboard.KEYNAME_SYSREQ, Keyboard.KEYNAME_BREAK, Keyboard.KEYNAME_RESET, Keyboard.KEYNAME_STOP, Keyboard.KEYNAME_MENU, Keyboard.KEYNAME_USER, Keyboard.KEYNAME_SYSTEM, Keyboard.KEYNAME_PRINT, Keyboard.KEYNAME_CLEARLINE, Keyboard.KEYNAME_CLEARDISPLAY, Keyboard.KEYNAME_INSERTLINE, Keyboard.KEYNAME_DELETELINE, Keyboard.KEYNAME_INSERTCHAR, Keyboard.KEYNAME_DELETECHAR, Keyboard.KEYNAME_PREV, Keyboard.KEYNAME_NEXT, Keyboard.KEYNAME_SELECT, Keyboard.KEYNAME_EXECUTE, Keyboard.KEYNAME_UNDO, Keyboard.KEYNAME_REDO, Keyboard.KEYNAME_FIND, Keyboard.KEYNAME_HELP, Keyboard.KEYNAME_MODESWITCH]; });
		
		public static NUMBER_0:number = 48;
		
		public static NUMBER_1:number = 49;
		
		public static NUMBER_2:number = 50;
		
		public static NUMBER_3:number = 51;
		
		public static NUMBER_4:number = 52;
		
		public static NUMBER_5:number = 53;
		
		public static NUMBER_6:number = 54;
		
		public static NUMBER_7:number = 55;
		
		public static NUMBER_8:number = 56;
		
		public static NUMBER_9:number = 57;
		
		public static A:number = 65;
		
		public static B:number = 66;
		
		public static C:number = 67;
		
		public static D:number = 68;
		
		public static E:number = 69;
		
		public static F:number = 70;
		
		public static G:number = 71;
		
		public static H:number = 72;
		
		public static I:number = 73;
		
		public static J:number = 74;
		
		public static K:number = 75;
		
		public static L:number = 76;
		
		public static M:number = 77;
		
		public static N:number = 78;
		
		public static O:number = 79;
		
		public static P:number = 80;
		
		public static Q:number = 81;
		
		public static R:number = 82;
		
		public static S:number = 83;
		
		public static T:number = 84;
		
		public static U:number = 85;
		
		public static V:number = 86;
		
		public static W:number = 87;
		
		public static X:number = 88;
		
		public static Y:number = 89;
		
		public static Z:number = 90;
		
		public static SEMICOLON:number = 186;
		
		public static EQUAL:number = 187;
		
		public static COMMA:number = 188;
		
		public static MINUS:number = 189;
		
		public static PERIOD:number = 190;
		
		public static SLASH:number = 191;
		
		public static BACKQUOTE:number = 192;
		
		public static LEFTBRACKET:number = 219;
		
		public static BACKSLASH:number = 220;
		
		public static RIGHTBRACKET:number = 221;
		
		public static QUOTE:number = 222;
		
		public static ALTERNATE:number = 18;
		
		public static BACKSPACE:number = 8;
		
		public static CAPS_LOCK:number = 20;
		
		public static COMMAND:number = 15;
		
		public static CONTROL:number = 17;
		
		public static DELETE:number = 46;
		
		public static DOWN:number = 40;
		
		public static END:number = 35;
		
		public static ENTER:number = 13;
		
		public static ESCAPE:number = 27;
		
		public static F1:number = 112;
		
		public static F2:number = 113;
		
		public static F3:number = 114;
		
		public static F4:number = 115;
		
		public static F5:number = 116;
		
		public static F6:number = 117;
		
		public static F7:number = 118;
		
		public static F8:number = 119;
		
		public static F9:number = 120;
		
		public static F10:number = 121;
		
		public static F11:number = 122;
		
		public static F12:number = 123;
		
		public static F13:number = 124;
		
		public static F14:number = 125;
		
		public static F15:number = 126;
		
		public static HOME:number = 36;
		
		public static INSERT:number = 45;
		
		public static LEFT:number = 37;
		
		public static NUMPAD:number = 21;
		
		public static NUMPAD_0:number = 96;
		
		public static NUMPAD_1:number = 97;
		
		public static NUMPAD_2:number = 98;
		
		public static NUMPAD_3:number = 99;
		
		public static NUMPAD_4:number = 100;
		
		public static NUMPAD_5:number = 101;
		
		public static NUMPAD_6:number = 102;
		
		public static NUMPAD_7:number = 103;
		
		public static NUMPAD_8:number = 104;
		
		public static NUMPAD_9:number = 105;
		
		public static NUMPAD_ADD:number = 107;
		
		public static NUMPAD_DECIMAL:number = 110;
		
		public static NUMPAD_DIVIDE:number = 111;
		
		public static NUMPAD_ENTER:number = 108;
		
		public static NUMPAD_MULTIPLY:number = 106;
		
		public static NUMPAD_SUBTRACT:number = 109;
		
		public static PAGE_DOWN:number = 34;
		
		public static PAGE_UP:number = 33;
		
		public static RIGHT:number = 39;
		
		public static SHIFT:number = 16;
		
		public static SPACE:number = 32;
		
		public static TAB:number = 9;
		
		public static UP:number = 38;
		
		public static RED:number = 16777216;
		
		public static GREEN:number = 16777217;
		
		public static YELLOW:number = 16777218;
		
		public static BLUE:number = 16777219;
		
		public static CHANNEL_UP:number = 16777220;
		
		public static CHANNEL_DOWN:number = 16777221;
		
		public static RECORD:number = 16777222;
		
		public static PLAY:number = 16777223;
		
		public static PAUSE:number = 16777224;
		
		public static STOP:number = 16777225;
		
		public static FAST_FORWARD:number = 16777226;
		
		public static REWIND:number = 16777227;
		
		public static SKIP_FORWARD:number = 16777228;
		
		public static SKIP_BACKWARD:number = 16777229;
		
		public static NEXT:number = 16777230;
		
		public static PREVIOUS:number = 16777231;
		
		public static LIVE:number = 16777232;
		
		public static LAST:number = 16777233;
		
		public static MENU:number = 16777234;
		
		public static INFO:number = 16777235;
		
		public static GUIDE:number = 16777236;
		
		public static EXIT:number = 16777237;
		
		public static BACK:number = 16777238;
		
		public static AUDIO:number = 16777239;
		
		public static SUBTITLE:number = 16777240;
		
		public static DVR:number = 16777241;
		
		public static VOD:number = 16777242;
		
		public static INPUT:number = 16777243;
		
		public static SETUP:number = 16777244;
		
		public static HELP:number = 16777245;
		
		public static MASTER_SHELL:number = 16777246;
		
		public static SEARCH:number = 16777247;
		
		/**
		 * Specifies whether the Caps Lock key is activated (true) or not (false). 
		 * @return 
		 * 
		 */		
		public static get capsLock():boolean
		{
			return false;
		}
		
		/**
		 * Specifies whether the Num Lock key is activated (true) or not (false). 
		 * @return 
		 * 
		 */		
		public static get numLock():boolean
		{
			return false;
		}
		
		/**
		 * Specifies whether the last key pressed is accessible by other SWF files. 
		 * @return 
		 * 
		 */		
		public static isAccessible():boolean
		{
			return false;
		}
		
		/**
		 * Indicates whether the computer or device provides a virtual keyboard. 
		 * @return 
		 * 
		 */		
		public static get hasVirtualKeyboard():boolean
		{
			return Capabilities.isMobile;
		}
		
		/**
		 * Indicates the type of physical keyboard provided by the computer or device, if any. 
		 * @return 
		 * 
		 */		
		public static get physicalKeyboardType():string
		{
			return null;
		}
	}

}