/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class ActionValueType
	{
		public static STRING:number = 0;
		public static FLOAT:number = 1;
		public static NULL:number = 2;
		public static UNDEFINED:number = 3;
		public static REGISTER:number = 4;
		public static BOOLEAN:number = 5;
		public static DOUBLE:number = 6;
		public static INTEGER:number = 7;
		public static CONSTANT_8:number = 8;
		public static CONSTANT_16:number = 9;
		
		public static toString(bitmapFormat:number):string {
			/**/ bitmapFormat = ((bitmapFormat) >>> 0);
			switch(bitmapFormat) {
				case ActionValueType.STRING: return "string"; break;
				case ActionValueType.FLOAT: return "float"; break;
				case ActionValueType.NULL: return "null"; break;
				case ActionValueType.UNDEFINED: return "undefined"; break;
				case ActionValueType.REGISTER: return "register"; break;
				case ActionValueType.BOOLEAN: return "boolean"; break;
				case ActionValueType.DOUBLE: return "double"; break;
				case ActionValueType.INTEGER: return "integer"; break;
				case ActionValueType.CONSTANT_8: return "constant8"; break;
				case ActionValueType.CONSTANT_16: return "constant16"; break;
				default: return "unknown"; break;
			}
		}
	}

}