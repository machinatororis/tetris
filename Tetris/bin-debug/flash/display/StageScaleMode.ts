/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The StageScaleMode class provides values for the Stage.scaleMode property. 
	 * @author pkulikov
	 * 
	 */	
	export  class StageScaleMode
	{
		/**
		 * Specifies that the entire application be visible in the specified area without distortion while maintaining 
		 * the original aspect ratio of the application. 
		 */		
		public static SHOW_ALL:string = "showAll";
		
		/**
		 * Specifies that the entire application be visible in the specified area without trying to preserve the original aspect ratio. 
		 */		
		public static EXACT_FIT:string = "exactFit";
		
		/**
		 * Specifies that the entire application fill the specified area, without distortion but possibly with some cropping, 
		 * while maintaining the original aspect ratio of the application. 
		 */		
		public static NO_BORDER:string = "noBorder";
		
		/**
		 * Specifies that the size of the application be fixed, so that it remains unchanged even as the size of the player window changes. 
		 */		
		public static NO_SCALE:string = "noScale";
	}
}