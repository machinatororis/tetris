/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The FontStyle class provides values for the TextRenderer class. 
	 * @author pkulikov
	 * 
	 */	
	export  class FontStyle
	{
		/**
		 * Defines the plain style of a font for the fontStyle parameter in the setAdvancedAntiAliasingTable() method.
		 */		
		public static REGULAR:string = "regular";
		
		/**
		 * Defines the bold style of a font for the fontStyle parameter in the setAdvancedAntiAliasingTable() method. 
		 */		
		public static BOLD:string = "bold";
		
		/**
		 * Defines the italic style of a font for the fontStyle parameter in the setAdvancedAntiAliasingTable() method.
		 */		
		public static ITALIC:string = "italic";
		
		/**
		 * Defines the combined bold and italic style of a font for the fontStyle parameter in the setAdvancedAntiAliasingTable() method.
		 */		
		public static BOLD_ITALIC:string = "boldItalic";
	}
}