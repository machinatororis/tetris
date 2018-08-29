/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.consts
{
	
	export  class CSMTableHint
	{
		public static THIN:number = 0;
		public static MEDIUM:number = 1;
		public static THICK:number = 2;
		
		public static toString(csmTableHint:number):string {
			/**/ csmTableHint = ((csmTableHint) >>> 0);
			switch(csmTableHint) {
				case CSMTableHint.THIN: return "thin"; break;
				case CSMTableHint.MEDIUM: return "medium"; break;
				case CSMTableHint.THICK: return "thick"; break;
				default: return "unknown"; break;
			}
		}
	}

}