/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class Tag
	{
		public static toStringCommon(type:number, name:string, indent:number = 0):string {
			/**/ type = ((type) >>> 0); name = as(name, 'String'); indent = ((indent) >>> 0);
			return StringUtils.repeat(indent) + "[" + StringUtils.printf("%02d", type) + ":" + name + "] ";
		}
	}

}