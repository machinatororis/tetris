/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../display/CapsStyle.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export import CapsStyle = flash.display.CapsStyle;
	

	export  class LineCapsStyle
	{
		public static ROUND:number = 0;
		public static NO:number = 1;
		public static SQUARE:number = 2;
		
		public static toString(lineCapsStyle:number):string {
			/**/ lineCapsStyle = ((lineCapsStyle) >>> 0);
			switch(lineCapsStyle) {
				case LineCapsStyle.ROUND: return CapsStyle.ROUND;
				case LineCapsStyle.NO: return CapsStyle.NONE;
				case LineCapsStyle.SQUARE: return CapsStyle.SQUARE;
				default: return "unknown";
			}
		}
	}

}