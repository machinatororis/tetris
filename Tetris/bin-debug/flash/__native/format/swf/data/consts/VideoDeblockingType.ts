/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class VideoDeblockingType
	{
		public static VIDEOPACKET:number = 0;
		public static OFF:number = 1;
		public static LEVEL1:number = 2;
		public static LEVEL2:number = 3;
		public static LEVEL3:number = 4;
		public static LEVEL4:number = 5;
		
		public static toString(deblockingType:number):string {
			/**/ deblockingType = ((deblockingType) >>> 0);
			switch(deblockingType) {
				case VideoDeblockingType.VIDEOPACKET: return "videopacket"; break;
				case VideoDeblockingType.OFF: return "off"; break;
				case VideoDeblockingType.LEVEL1: return "level 1"; break;
				case VideoDeblockingType.LEVEL2: return "level 2"; break;
				case VideoDeblockingType.LEVEL3: return "level 3"; break;
				case VideoDeblockingType.LEVEL4: return "level 4"; break;
				default: return "unknown"; break;
			}
		}
	}

}