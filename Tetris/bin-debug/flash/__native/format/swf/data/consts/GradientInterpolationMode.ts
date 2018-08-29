/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../display/InterpolationMethod.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export import InterpolationMethod = flash.display.InterpolationMethod;
	
	
	export  class GradientInterpolationMode
	{
		public static NORMAL:number = 0;
		public static LINEAR:number = 1;
		
		public static toString(interpolationMode:number):string {
			/**/ interpolationMode = ((interpolationMode) >>> 0);
			switch(interpolationMode) {
				case GradientInterpolationMode.NORMAL: return InterpolationMethod.RGB; break;
				case GradientInterpolationMode.LINEAR: return InterpolationMethod.LINEAR_RGB; break;
				default: return InterpolationMethod.RGB; break;
			}
		}
	}

}