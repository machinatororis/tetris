/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class SoundRate
	{
		public static KHZ_5:number = 0;
		public static KHZ_11:number = 1;
		public static KHZ_22:number = 2;
		public static KHZ_44:number = 3;
		
		public static toString(soundRate:number):string {
			/**/ soundRate = ((soundRate) >>> 0);
			switch(soundRate) {
				case SoundRate.KHZ_5: return "5.5kHz"; break;
				case SoundRate.KHZ_11: return "11kHz"; break;
				case SoundRate.KHZ_22: return "22kHz"; break;
				case SoundRate.KHZ_44: return "44kHz"; break;
				default: return "unknown"; break;
			}
		}
	}

}