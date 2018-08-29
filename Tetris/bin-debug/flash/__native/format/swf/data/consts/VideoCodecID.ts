/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class VideoCodecID
	{
		public static H263:number = 2;
		public static SCREEN:number = 3;
		public static VP6:number = 4;
		public static VP6ALPHA:number = 5;
		public static SCREENV2:number = 6;
		
		public static toString(codecId:number):string {
			/**/ codecId = ((codecId) >>> 0);
			switch(codecId) {
				case VideoCodecID.H263: return "H.263"; break;
				case VideoCodecID.SCREEN: return "Screen Video"; break;
				case VideoCodecID.VP6: return "VP6"; break;
				case VideoCodecID.VP6ALPHA: return "VP6 With Alpha"; break;
				case VideoCodecID.SCREENV2: return "Screen Video V2"; break;
				default: return "unknown"; break;
			}
		}
	}

}