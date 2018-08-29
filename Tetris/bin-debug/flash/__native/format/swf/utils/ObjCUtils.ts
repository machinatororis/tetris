/// <reference path="../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.utils
{
	
	export  class ObjCUtils
	{
		public static num2str(n:number, twips:boolean = false):string {
			/**/ n = (+(n)); twips = Boolean(twips);
			if(twips) { n = Math.round(n * 100) / 100; }
			var s:string = n.toString();
			if (s.indexOf(".") == -1) {
				s += ".0";
			}
			return s + "f";
		}
	}

}