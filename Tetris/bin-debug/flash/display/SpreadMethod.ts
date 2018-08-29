/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The SpreadMethod class provides values for the spreadMethod parameter in the beginGradientFill() and 
	 * lineGradientStyle() methods of the Graphics class. 
	 * @author pkulikov
	 * 
	 */	
	export  class SpreadMethod
	{
		/**
		 * Specifies that the gradient use the pad spread method. 
		 */		
		public static PAD:string = "pad";
		
		/**
		 * Specifies that the gradient use the reflect spread method. 
		 */		
		public static REFLECT:string = "reflect";
		
		/**
		 * Specifies that the gradient use the repeat spread method. 
		 */		
		public static REPEAT:string = "repeat";
	}
}