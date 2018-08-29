/// <reference path="../../base.d.ts" />

namespace flash.media
{
	
	/**
	 * The SoundCodec class is an enumeration of constant values used in setting the codec property of the Microphone class. 
	 * @author pkulikov
	 * 
	 */	
	export  class SoundCodec
	{
		/**
		 * Specifies that the Nellymoser codec be used for compressing audio. 
		 */		
		public static NELLYMOSER:string = "NellyMoser";
		
		/**
		 * Specifies that the Speex codec be used for compressing audio. 
		 */		
		public static SPEEX:string = "Speex";
		
		/**
		 * Specifies that the G711 A-law codec be used for compressing audio. 
		 */		
		public static PCMA:string = "pcma";
		
		/**
		 * Specifies that the G711 u-law codec be used for compressing audio. 
		 */		
		public static PCMU:string = "pcmu";
	}
}