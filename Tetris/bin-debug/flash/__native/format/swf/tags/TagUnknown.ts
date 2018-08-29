/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagUnknown implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		protected _type:number = 0;
		
		constructor(type:number = 0) {
			/**/ type = ((type) >>> 0);
			this._type = type;
		}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			data.skipBytes(length);
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			throw(new Error("No raw tag data available."));
		}
		
		public get type():number { return this._type; }
		public get name():string { return "????"; }
		public get version():number { return 0; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent);
		}
	}

}