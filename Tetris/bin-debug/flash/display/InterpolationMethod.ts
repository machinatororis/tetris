/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The InterpolationMethod class provides values for the interpolationMethod parameter in the Graphics.beginGradientFill() and 
	 * Graphics.lineGradientStyle() methods. This parameter determines the RGB space to use when rendering the gradient. 
	 * @author pkulikov
	 * 
	 */	
	export  class InterpolationMethod
	{
		/**
		 * Specifies that the RGB interpolation method should be used. 
		 */		
		public static RGB:string = "rgb";
		
		/**
		 * Specifies that the linear RGB interpolation method should be used. 
		 */		
		public static LINEAR_RGB:string = "linearRGB";
	}
}