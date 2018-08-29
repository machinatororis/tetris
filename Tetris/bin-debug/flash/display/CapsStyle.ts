/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The CapsStyle class is an enumeration of constant values that specify the caps style to use in drawing lines. 
	 * The constants are provided for use as values in the caps parameter of the flash.display.Graphics.lineStyle() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class CapsStyle
	{
		/**
		 * Used to specify round caps in the caps parameter of the flash.display.Graphics.lineStyle() method. 
		 */		
		public static ROUND:string = "round";
		
		/**
		 * Used to specify no caps in the caps parameter of the flash.display.Graphics.lineStyle() method. 
		 */		
		public static NONE:string = "none";
		
		/**
		 * Used to specify square caps in the caps parameter of the flash.display.Graphics.lineStyle() method. 
		 */		
		public static SQUARE:string = "square";
	}

}