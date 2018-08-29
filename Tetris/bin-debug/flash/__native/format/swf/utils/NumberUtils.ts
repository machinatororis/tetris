/// <reference path="../../../../../base.d.ts" />

namespace flash.__native.format.swf.utils
{
	
	export  class NumberUtils
	{
		public static roundPixels20 (pixels:number):number
		{
			/**/ pixels = (+(pixels));
			return Math.round(pixels * 100) / 100;
		}
		
		public static roundPixels400 (pixels:number):number
		{
			/**/ pixels = (+(pixels));
			return Math.round(pixels * 10000) / 10000;
		}
	}

}