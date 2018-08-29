/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class SoundSize
	{
		public static BIT_8:number = 0;
		public static BIT_16:number = 1;
		
		public static toString(soundSize:number):string {
			/**/ soundSize = ((soundSize) >>> 0);
			switch(soundSize) {
				case SoundSize.BIT_8: return "8bit"; break;
				case SoundSize.BIT_16: return "16bit"; break;
				default: return "unknown"; break;
			}
		}
	}

}