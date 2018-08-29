/// <reference path="../../base.d.ts" />

namespace flash.ui
{
	
	/**
	 * The Multitouch class manages and provides information about the current environment's support for 
	 * handling contact from user input devices, including contact that has two or more touch points 
	 * (such as a user's fingers on a touch screen). When a user interacts with a device such as a mobile phone or tablet with a touch screen, 
	 * the user typically touches the screen with his or her fingers or a pointing device. 
	 * While there is a broad range of pointing devices, such as a mouse or a stylus, 
	 * many of these devices only have a single point of contact with an application. 
	 * For pointing devices with a single point of contact, user interaction events can be handled as a mouse event, 
	 * or using a basic set of touch events (called "touch point" events). 
	 * However, for pointing devices that have several points of contact and perform complex movement, such as the human hand, 
	 * Flash runtimes support an additional set of event handling API called gesture events. 
	 * The API for handling user interaction with these gesture events includes the following classes:
	 * flash.events.TouchEvent
	 * flash.events.GestureEvent
	 * flash.events.GesturePhase
	 * flash.events.TransformGestureEvent
	 * flash.events.PressAndTapGestureEvent
	 * Use the listed classes to write code that handles touch events. 
	 * Use the Multitouch class to determine the current environment's support for touch interaction, 
	 * and to manage the support of touch interaction if the current environment supports touch input.
	 * 
	 * You cannot create a Multitouch object directly from ActionScript code. If you call new Multitouch(), an exception is thrown.
	 * 
	 * Note: The Multitouch feature is not supported for SWF files embedded in HTML running on Mac OS. 
	 * @author pkulikov
	 * 
	 */	
	export  class Multitouch
	{
		/**
		 * Identifies the multi-touch mode for touch and gesture event handling. 
		 * @return 
		 * 
		 */		
		public static get inputMode():string { return null; }
		public static set inputMode(param1:string) { /**/ param1 = as(param1, 'String'); /**/ }
		
		/**
		 * Indicates whether the current environment supports basic touch input, such as a single finger tap. 
		 * @return 
		 * 
		 */		
		public static get supportsTouchEvents():boolean
		{
			return false;
		}
		
		/**
		 * Indicates whether the current environment supports gesture input, such as rotating two fingers around a touch screen. 
		 * @return 
		 * 
		 */		
		public static get supportsGestureEvents():boolean
		{
			return false;
		}
		
		/**
		 * A Vector array (a typed array of string values) of multi-touch contact types supported in the current environment. 
		 * @return 
		 * 
		 */		
		public static get supportedGestures():string[]
		{
			return null;
		}
		
		/**
		 * The maximum number of concurrent touch points supported by the current environment. 
		 * @return 
		 * 
		 */		
		public static get maxTouchPoints():number
		{
			return 0;
		}
		
		/**
		 * Specifies whether the AIR runtime maps touch events to mouse events. 
		 * @return 
		 * 
		 */		
		public static get mapTouchToMouse():boolean { return false; }
		public static set mapTouchToMouse(param1:boolean) { /**/ param1 = Boolean(param1); /**/ }
	}
}