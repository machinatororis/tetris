/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class SoundType
	{
		public static MONO:number = 0;
		public static STEREO:number = 1;
		
		public static toString(soundType:number):string {
			/**/ soundType = ((soundType) >>> 0);
			switch(soundType) {
				case SoundType.MONO: return "mono"; break;
				case SoundType.STEREO: return "stereo"; break;
				default: return "unknown"; break;
			}
		}
	}

}