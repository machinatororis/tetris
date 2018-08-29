/// <reference path="../../base.d.ts" />

namespace flash.ui
{
	
	/**
	 * The MultitouchInputMode class provides values for the inputMode property in the flash.ui.Multitouch class. 
	 * These values set the type of touch events the Flash runtime dispatches when the user interacts with a touch-enabled device. 
	 * @author pkulikov
	 * 
	 */	
	export  class MultitouchInputMode
	{
		/**
		 * Specifies that all user contact with a touch-enabled device is interpreted as a type of mouse event. 
		 */		
		public static NONE:string = "none";
		
		/**
		 * Specifies that TransformGestureEvent, PressAndTapGestureEvent, 
		 * and GestureEvent events are dispatched for the related user interaction supported by the current environment, 
		 * and other touch events (such as a simple tap) are interpreted as mouse events. 
		 */		
		public static GESTURE:string = "gesture";
		
		/**
		 * Specifies that events are dispatched only for basic touch events, such as a single finger tap. 
		 */		
		public static TOUCH_POINT:string = "touchPoint";
	}
}