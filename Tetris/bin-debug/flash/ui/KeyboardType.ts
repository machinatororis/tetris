/// <reference path="../../base.d.ts" />

namespace flash.ui
{
	
	/**
	 * The KeyboardType class is an enumeration class that provides values for different categories of physical computer or device keyboards.
	 * Use the values defined by the KeyboardType class with the Keybooard.physicalKeyboardType property. 
	 * @author pkulikov
	 * 
	 */	
	export  class KeyboardType
	{
		/**
		 * A standard keyboard with a full set of numbers and letters. 
		 */		
		public static ALPHANUMERIC:string = "alphanumeric";
		
		/**
		 * A phone-style 12-button keypad. 
		 */		
		public static KEYPAD:string = "keypad";
		
		/**
		 * No physical keyboard is supported. 
		 */		
		public static NONE:string = "none";
	}
}