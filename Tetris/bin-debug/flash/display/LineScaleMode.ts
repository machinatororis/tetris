/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The LineScaleMode class provides values for the scaleMode parameter in the Graphics.lineStyle() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class LineScaleMode
	{
		/**
		 * With this setting used as the scaleMode parameter of the lineStyle() method, 
		 * the thickness of the line always scales when the object is scaled (the default). 
		 */		
		public static NORMAL:string = "normal";
		
		/**
		 * With this setting used as the scaleMode parameter of the lineStyle() method, the thickness of the line scales only vertically. 
		 */		
		public static VERTICAL:string = "vertical";
		
		/**
		 * With this setting used as the scaleMode parameter of the lineStyle() method, the thickness of the line scales only horizontally. 
		 */		
		public static HORIZONTAL:string = "horizontal";
		
		/**
		 * With this setting used as the scaleMode parameter of the lineStyle() method, the thickness of the line never scales. 
		 */		
		public static NONE:string = "none";
	}
}