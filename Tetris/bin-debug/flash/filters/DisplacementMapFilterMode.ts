/// <reference path="../../base.d.ts" />
﻿
namespace flash.filters
{
	
	/**
	 * The DisplacementMapFilterMode class provides values for the mode property of the DisplacementMapFilter class. 
	 * @author pkulikov
	 */
	export  class DisplacementMapFilterMode
	{
		/**
		 * Clamps the displacement value to the edge of the source image. 
		 */		
		public static CLAMP : string = "clamp";
			
		/**
		 * If the displacement value is outside the image, substitutes the values in the color and alpha properties. 
		 */		
		public static COLOR : string = "color";
			
		/**
		 * If the displacement value is out of range, ignores the displacement and uses the source pixel. 
		 */		
		public static IGNORE : string = "ignore";
			
		/**
		 * Wraps the displacement value to the other side of the source image. 
		 */		
		public static WRAP : string = "wrap";
	}	
}