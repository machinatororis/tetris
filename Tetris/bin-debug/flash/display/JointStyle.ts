/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The JointStyle class is an enumeration of constant values that specify the joint style to use in drawing lines. 
	 * These constants are provided for use as values in the joints parameter of the flash.display.Graphics.lineStyle() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class JointStyle
	{
		/**
		 * Specifies round joints in the joints parameter of the flash.display.Graphics.lineStyle() method. 
		 */		
		public static ROUND:string = "round";
		
		/**
		 * Specifies beveled joints in the joints parameter of the flash.display.Graphics.lineStyle() method. 
		 */		
		public static BEVEL:string = "bevel";
		
		/**
		 * Specifies mitered joints in the joints parameter of the flash.display.Graphics.lineStyle() method. 
		 */		
		public static MITER:string = "miter";
	}
}