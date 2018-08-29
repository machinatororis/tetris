/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The TextRenderer class provides functionality for the advanced anti-aliasing capability of embedded fonts. 
	 * Advanced anti-aliasing allows font faces to render at very high quality at small sizes. 
	 * Use advanced anti-aliasing with applications that have a lot of small text. 
	 * Adobe does not recommend using advanced anti-aliasing for very large fonts (larger than 48 points). 
	 * Advanced anti-aliasing is available in Flash Player 8 and later only.
	 * To set advanced anti-aliasing on a text field, set the antiAliasType property of the TextField instance.
	 * 
	 * Advanced anti-aliasing provides continuous stroke modulation (CSM), 
	 * which is continuous modulation of both stroke weight and edge sharpness. As an advanced feature, 
	 * you can use the setAdvancedAntiAliasingTable() method to define settings for specific typefaces and font sizes. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextRenderer
	{
		public static get antiAliasType() : string { return null; }
		public static set antiAliasType(param1:string) { /**/ param1 = as(param1, 'String'); /**/ }
		
		/**
		 * Sets a custom continuous stroke modulation (CSM) lookup table for a font. 
		 * @param param1
		 * @param param2
		 * @param param3
		 * @param param4
		 * 
		 */		
		public static setAdvancedAntiAliasingTable(param1:string, param2:string, param3:string, param4:any[]) : void
		{
			
		/**/ param1 = as(param1, 'String'); param2 = as(param2, 'String'); param3 = as(param3, 'String'); param4 = strict(param4, Array);
			
		}
		
		/**
		 * The adaptively sampled distance fields (ADFs) quality level for advanced anti-aliasing. 
		 * @return 
		 * 
		 */		
		public static get maxLevel() : number { return 0; }
		public static set maxLevel(param1:number) { /**/ param1 = ((param1) >> 0); /**/ }
		
		/**
		 * Controls the rendering of advanced anti-aliased text. 
		 * @return 
		 * 
		 */		
		public static get displayMode() : string { return null; }
		public static set displayMode(param1:string) { /**/ param1 = as(param1, 'String'); /**/ }
	}
}