/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The TextDisplayMode class contains values that control the subpixel anti-aliasing of the advanced anti-aliasing system. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextDisplayMode
	{
		/**
		 * Forces Flash Player to use LCD subpixel anti-aliasing. 
		 */		
		public static LCD:string = "lcd";
		
		/**
		 * Forces Flash Player to display grayscale anti-aliasing. 
		 */		
		public static CRT:string = "crt";
		
		/**
		 * Allows Flash Player to choose LCD or CRT mode. 
		 */		
		public static DEFAULT:string = "default";
	}
}