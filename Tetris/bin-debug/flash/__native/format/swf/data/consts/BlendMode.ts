/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class BlendMode
	{
		public static NORMAL_0:number = 0;
		public static NORMAL_1:number = 1;
		public static LAYER:number = 2;
		public static MULTIPLY:number = 3;
		public static SCREEN:number = 4;
		public static LIGHTEN:number = 5;
		public static DARKEN:number = 6;
		public static DIFFERENCE:number = 7;
		public static ADD:number = 8;
		public static SUBTRACT:number = 9;
		public static INVERT:number = 10;
		public static ALPHA:number = 11;
		public static ERASE:number = 12;
		public static OVERLAY:number = 13;
		public static HARDLIGHT:number = 14;
		
		public static toString(blendMode:number):string {
			/**/ blendMode = ((blendMode) >>> 0);
			switch(blendMode) {
				case BlendMode.NORMAL_0:
				case BlendMode.NORMAL_1: 
					return "normal";
					break;
				case BlendMode.LAYER: return "layer"; break;
				case BlendMode.MULTIPLY: return "multiply"; break;
				case BlendMode.SCREEN: return "screen"; break;
				case BlendMode.LIGHTEN: return "lighten"; break;
				case BlendMode.DARKEN: return "darken"; break;
				case BlendMode.DIFFERENCE: return "difference"; break;
				case BlendMode.ADD: return "add"; break;
				case BlendMode.SUBTRACT: return "subtract"; break;
				case BlendMode.INVERT: return "invert"; break;
				case BlendMode.ALPHA: return "alpha"; break;
				case BlendMode.ERASE: return "erase"; break;
				case BlendMode.OVERLAY: return "overlay"; break;
				case BlendMode.HARDLIGHT: return "hardlight"; break;
				default: return "unknown"; break;
			}
		}
	}

}