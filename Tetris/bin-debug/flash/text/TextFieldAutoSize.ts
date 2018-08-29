/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The TextFieldAutoSize class is an enumeration of constant values used in setting the autoSize property of the TextField class. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextFieldAutoSize
	{
		/**
		 * Specifies that no resizing is to occur. 
		 */		
		public static NONE:string = "none";
		
		/**
		 * Specifies that the text is to be treated as left-justified text, 
		 * meaning that the left side of the text field remains fixed and any resizing of a single line is on the right side. 
		 */		
		public static LEFT:string = "left";
		
		/**
		 * Specifies that the text is to be treated as center-justified text. 
		 */		
		public static CENTER:string = "center";
		
		/**
		 * Specifies that the text is to be treated as right-justified text, 
		 * meaning that the right side of the text field remains fixed and any resizing of a single line is on the left side. 
		 */		
		public static RIGHT:string = "right";
	}
}