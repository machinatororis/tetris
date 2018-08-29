/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagRemoveObject2 extends TagRemoveObject implements IDisplayListTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDisplayListTag = null;
		public static TYPE:number = 28;
		
		constructor() {
			super(); }
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.depth = data.readUI16();
		}
		
		/*override*/ public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, 2);
			data.writeUI16(this.depth);
		}
		
		/*override*/ public get type():number { return TagRemoveObject2.TYPE; }
		/*override*/ public get name():string { return "RemoveObject2"; }
		/*override*/ public get version():number { return 3; }
		/*override*/ public get level():number { return 2; }

		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"Depth: " + this.depth;
		}
	}

}