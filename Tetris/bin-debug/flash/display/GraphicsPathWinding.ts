/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The GraphicsPathWinding class provides values for the flash.display.GraphicsPath.winding property and 
	 * the flash.display.Graphics.drawPath() method to determine the direction to draw a path. 
	 * @author pkulikov
	 * 
	 */	
	export  class GraphicsPathWinding
	{
		/**
		 * Establishes the even-odd winding type. 
		 */		
		public static EVEN_ODD:string = "evenOdd";
		
		/**
		 * Establishes the non-zero winding type. 
		 */		
		public static NON_ZERO:string = "nonZero";
	}
}