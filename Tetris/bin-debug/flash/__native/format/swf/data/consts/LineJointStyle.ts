/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../display/JointStyle.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export import JointStyle = flash.display.JointStyle;
	
	
	export  class LineJointStyle
	{
		public static ROUND:number = 0;
		public static BEVEL:number = 1;
		public static MITER:number = 2;
		
		public static toString(lineJointStyle:number):string {
			/**/ lineJointStyle = ((lineJointStyle) >>> 0);
			switch(lineJointStyle) {
				case LineJointStyle.ROUND: return JointStyle.ROUND;
				case LineJointStyle.BEVEL: return JointStyle.BEVEL;
				case LineJointStyle.MITER: return JointStyle.MITER;
				default: return "null";
			}
		}
	}

}