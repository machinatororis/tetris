/// <reference path="../../base.d.ts" />

namespace flash.ui
{
	
	/**
	 * The KeyLocation class contains constants that indicate the location of a key pressed on the keyboard or keyboard-like input device.
	 * The KeyLocation constants are used in the KeyboardEvent.keyLocation property. 
	 * @author pkulikov
	 * 
	 */	
	export  class KeyLocation
	{
		/**
		 * Indicates the key activation is not distinguished as the left or right version of the key, 
		 * and did not originate on the numeric keypad (or did not originate with a virtual key corresponding to the numeric keypad). 
		 */		
		public static STANDARD:number = 0;
		
		/**
		 * Indicates the key activated is in the left key location (there is more than one possible location for this key). 
		 */		
		public static LEFT:number = 1;
		
		/**
		 * Indicates the key activated is in the right key location (there is more than one possible location for this key). 
		 */		
		public static RIGHT:number = 2;
		
		/**
		 * Indicates the key activation originated on the numeric keypad or with a virtual key corresponding to the numeric keypad. 
		 */		
		public static NUM_PAD:number = 3;
		
		/**
		 * Indicates the key activation originated on a directional pad of input device. 
		 */		
		public static D_PAD:number = 4;
	}
}