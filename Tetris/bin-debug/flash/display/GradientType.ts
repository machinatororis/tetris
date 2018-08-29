/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The GradientType class provides values for the type parameter in the beginGradientFill() and lineGradientStyle() methods 
	 * of the flash.display.Graphics class. 
	 * @author pkulikov
	 * 
	 */	
	export  class GradientType
	{
		/**
		 * Value used to specify a linear gradient fill. 
		 */		
		public static LINEAR:string = "linear";
		
		/**
		 * Value used to specify a radial gradient fill. 
		 */		
		public static RADIAL:string = "radial";
	}

}