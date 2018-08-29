/// <reference path="../../base.d.ts" />
﻿
namespace flash.system
{
	
	/**
	 * The SecurityPanel class provides values for specifying which Security Settings panel you want to display.
	 * This class contains static constants that are used with the Security.showSettings() method. 
	 * You cannot create new instances of the SecurityPanel class.
	 * 
	 * @author pkulikov
	 */
	export  class SecurityPanel
	{
		/**
		 * When passed to Security.showSettings(), displays the Camera panel in Flash Player Settings.
		 */		
		public static CAMERA : string = "camera";

		/**
		 * When passed to Security.showSettings(), displays the panel that was open the last time the user closed the Flash Player Settings.
		 */
		public static DEFAULT : string = "default";

		/**
		 * When passed to Security.showSettings(), displays the Display panel in Flash Player Settings.
		 */
		public static DISPLAY : string = "display";

		/**
		 * When passed to Security.showSettings(), displays the Local Storage Settings panel in Flash Player Settings.
		 */
		public static LOCAL_STORAGE : string = "localStorage";

		/**
		 * When passed to Security.showSettings(), displays the Microphone panel in Flash Player Settings.
		 */
		public static MICROPHONE : string = "microphone";

		/**
		 * When passed to Security.showSettings(), displays the Privacy Settings panel in Flash Player Settings.
		 */
		public static PRIVACY : string = "privacy";

		/**
		 * When passed to Security.showSettings(), displays the Settings Manager (in a separate browser window).
		 */
		public static SETTINGS_MANAGER : string = "settingsManager";
	}	
}