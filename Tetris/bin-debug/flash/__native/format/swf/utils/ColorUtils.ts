/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
﻿
namespace flash.__native.format.swf.utils
{
	
	export import StringUtils = flash.__native.utils.StringUtils;
	

	export  class ColorUtils
	{
		public static alpha(color:number):number {
			/**/ color = ((color) >>> 0);
			return (+(color >>> 24)) / 255;
		}

		public static rgb(color:number):number {
			/**/ color = ((color) >>> 0);
			return (color & 0xffffff);
		}
		
		public static r(color:number):number {
			/**/ color = ((color) >>> 0);
			return (+((ColorUtils.rgb(color) >> 16) & 0xff)) / 255;
		}
		
		public static g(color:number):number {
			/**/ color = ((color) >>> 0);
			return (+((ColorUtils.rgb(color) >> 8) & 0xff)) / 255;
		}
		
		public static b(color:number):number {
			/**/ color = ((color) >>> 0);
			return (+(ColorUtils.rgb(color) & 0xff)) / 255;
		}
		
		public static interpolate(color1:number, color2:number, ratio:number):number {
			/**/ color1 = ((color1) >>> 0); color2 = ((color2) >>> 0); ratio = (+(ratio));
			var r1:number = ColorUtils.r(color1);
			var g1:number = ColorUtils.g(color1);
			var b1:number = ColorUtils.b(color1);
			var alpha1:number = ColorUtils.alpha(color1);
			var ri:number = (((r1 + (ColorUtils.r(color2) - r1) * ratio) * 255) >>> 0);
			var gi:number = (((g1 + (ColorUtils.g(color2) - g1) * ratio) * 255) >>> 0);
			var bi:number = (((b1 + (ColorUtils.b(color2) - b1) * ratio) * 255) >>> 0);
			var alphai:number = (((alpha1 + (ColorUtils.alpha(color2) - alpha1) * ratio) * 255) >>> 0);
			return bi | (gi << 8) | (ri << 16) | (alphai << 24);
		}
		
		public static rgbToString(color:number):string
		{
			/**/ color = ((color) >>> 0);
			return StringUtils.printf("#%06x", (color & 0xffffff));
		}
		
		public static rgbaToString(color:number):string
		{
			/**/ color = ((color) >>> 0);
			return StringUtils.printf("#%06x(%02x)", (color & 0xffffff), (color >>> 24));
		}
		
		public static argbToString(color:number):string
		{
			/**/ color = ((color) >>> 0);
			return StringUtils.printf("#(%02x)%06x", (color >>> 24), (color & 0xffffff));
		}
	}

}