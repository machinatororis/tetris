/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class SoundCompression
	{
		public static UNCOMPRESSED_NATIVE_ENDIAN:number = 0;
		public static ADPCM:number = 1;
		public static MP3:number = 2;
		public static UNCOMPRESSED_LITTLE_ENDIAN:number = 3;
		public static NELLYMOSER_16_KHZ:number = 4;
		public static NELLYMOSER_8_KHZ:number = 5;
		public static NELLYMOSER:number = 6;
		public static SPEEX:number = 11;
		
		public static toString(soundCompression:number):string {
			/**/ soundCompression = ((soundCompression) >>> 0);
			switch(soundCompression) {
				case SoundCompression.UNCOMPRESSED_NATIVE_ENDIAN: return "Uncompressed Native Endian"; break;
				case SoundCompression.ADPCM: return "ADPCM"; break;
				case SoundCompression.MP3: return "MP3"; break;
				case SoundCompression.UNCOMPRESSED_LITTLE_ENDIAN: return "Uncompressed Little Endian"; break;
				case SoundCompression.NELLYMOSER_16_KHZ: return "Nellymoser 16kHz"; break;
				case SoundCompression.NELLYMOSER_8_KHZ: return "Nellymoser 8kHz"; break;
				case SoundCompression.NELLYMOSER: return "Nellymoser"; break;
				case SoundCompression.SPEEX: return "Speex"; break;
				default: return "unknown"; break;
			}
		}
	}

}