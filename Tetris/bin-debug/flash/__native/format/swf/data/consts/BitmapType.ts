/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class BitmapType
	{
		public static JPEG:number = 1;
		public static GIF89A:number = 2;
		public static PNG:number = 3;
		
		public static toString(bitmapFormat:number):string {
			/**/ bitmapFormat = ((bitmapFormat) >>> 0);
			switch(bitmapFormat) {
				case BitmapType.JPEG: return "JPEG"; break;
				case BitmapType.GIF89A: return "GIF89a"; break;
				case BitmapType.PNG: return "PNG"; break;
				default: return "unknown"; break;
			}
		}
	}

}