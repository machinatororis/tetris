/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The FontType class contains the enumerated constants "embedded" and "device" for the fontType property of the Font class. 
	 * @author pkulikov
	 * 
	 */	
	export  class FontType
	{
		/**
		 * Indicates that this is an embedded font. 
		 */		
		public static EMBEDDED:string = "embedded";
		
		/**
		 * Indicates that this is an embedded CFF font. 
		 */		
		public static EMBEDDED_CFF:string = "embeddedCFF";
		
		/**
		 * Indicates that this is a device font. 
		 */		
		public static DEVICE:string = "device";
	}
}