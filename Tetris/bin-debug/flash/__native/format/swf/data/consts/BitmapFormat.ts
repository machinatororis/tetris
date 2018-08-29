/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class BitmapFormat
	{
		public static BIT_8:number = 3;
		public static BIT_15:number = 4;
		public static BIT_24:number = 5;
		
		public static toString(bitmapFormat:number):string
		{
			/**/ bitmapFormat = ((bitmapFormat) >>> 0);
			switch(bitmapFormat) {
				
				case BitmapFormat.BIT_8:
					return "8 BPP";
					
				case BitmapFormat.BIT_15:
					return "15 BPP";
					
				case BitmapFormat.BIT_24:
					return "24 BPP";
					
				default:
					return "unknown";
				
			}
		}
	}

}