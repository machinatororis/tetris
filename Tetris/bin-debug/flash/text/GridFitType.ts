/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The GridFitType class defines values for grid fitting in the TextField class. 
	 * @author pkulikov
	 * 
	 */	
	export  class GridFitType
	{
		/**
		 * Doesn't set grid fitting. 
		 */		
		public static NONE:string = "none";
		
		/**
		 * Fits strong horizontal and vertical lines to the pixel grid. 
		 */		
		public static PIXEL:string = "pixel";
		
		/**
		 * Fits strong horizontal and vertical lines to the sub-pixel grid on LCD monitors. 
		 */		
		public static SUBPIXEL:string = "subpixel";
	}
}