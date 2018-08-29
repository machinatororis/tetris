/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The StageDisplayState class provides values for the Stage.displayState property.
	 * @author pkulikov
	 * 
	 */	
	export  class StageDisplayState
	{
		/**
		 * Specifies that the Stage is in full-screen mode. 
		 */		
		public static FULL_SCREEN:string = "fullScreen";
		
		/**
		 * Specifies that the Stage is in full-screen mode with keyboard interactivity enabled. 
		 */		
		public static FULL_SCREEN_INTERACTIVE:string = "fullScreenInteractive";
		
		/**
		 * Specifies that the Stage is in normal mode. 
		 */		
		public static NORMAL:string = "normal";
	}
}