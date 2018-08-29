/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../display/SpreadMethod.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export import SpreadMethod = flash.display.SpreadMethod;
	
	
	export  class GradientSpreadMode
	{
		public static PAD:number = 0;
		public static REFLECT:number = 1;
		public static REPEAT:number = 2;
		
		public static toString(spreadMode:number):string {
			/**/ spreadMode = ((spreadMode) >>> 0);
			switch(spreadMode) {
				case GradientSpreadMode.PAD: return SpreadMethod.PAD; break;
				case GradientSpreadMode.REFLECT: return SpreadMethod.REFLECT; break;
				case GradientSpreadMode.REPEAT: return SpreadMethod.REPEAT; break;
				default: return "unknown"; break;
			}
		}
	}

}