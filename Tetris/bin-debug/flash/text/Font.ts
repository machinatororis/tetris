/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The Font class is used to manage embedded fonts in SWF files. Embedded fonts are represented as a subclass of the Font class. 
	 * The Font class is currently useful only to find out information about embedded fonts; you cannot alter a font by using this class. 
	 * You cannot use the Font class to load external fonts, or to create an instance of a Font object by itself. 
	 * Use the Font class as an abstract base class. 
	 * @author pkulikov
	 * 
	 */	
	export  class Font
	{
		/**
		 * Specifies whether to provide a list of the currently available embedded fonts. 
		 * @param param1
		 * @return 
		 * 
		 */		
		public static enumerateFonts(enumerateDeviceFonts:boolean = false) : any[]
		{
			/**/ enumerateDeviceFonts = Boolean(enumerateDeviceFonts);
			return [];
		}
		
		/**
		 * Registers a font class in the global font list. 
		 * @param font
		 * 
		 */		
		public static registerFont(font:{new(...a)}) : void
		{
			
		}
		
		/**
		 * The name of an embedded font. 
		 * @return 
		 * 
		 */		
		public get fontName() : string
		{
			return null;
		}
		
		/**
		 * The style of the font. 
		 * @return 
		 * 
		 */		
		public get fontStyle() : string
		{
			return null;
		}
		
		/**
		 * The type of the font. 
		 * @return 
		 * 
		 */		
		public get fontType() : string
		{
			return null;
		}
		
		/**
		 * Specifies whether a provided string can be displayed using the currently assigned font. 
		 * @param value
		 * @return 
		 * 
		 */		
		public hasGlyphs(str:string) : boolean
		{
			/**/ str = as(str, 'String');
			return null;
		}
	}

}