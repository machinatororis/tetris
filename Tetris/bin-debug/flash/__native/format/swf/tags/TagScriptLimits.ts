/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagScriptLimits implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 65;
		
		public maxRecursionDepth:number = 0;
		public scriptTimeoutSeconds:number = 0;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.maxRecursionDepth = data.readUI16();
			this.scriptTimeoutSeconds = data.readUI16();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, 4);
			data.writeUI16(this.maxRecursionDepth);
			data.writeUI16(this.scriptTimeoutSeconds);
		}
		
		public get type():number { return TagScriptLimits.TYPE; }
		public get name():string { return "ScriptLimits"; }
		public get version():number { return 7; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"MaxRecursionDepth: " + this.maxRecursionDepth + ", " +
				"ScriptTimeoutSeconds: " + this.scriptTimeoutSeconds;
		}
	}

}