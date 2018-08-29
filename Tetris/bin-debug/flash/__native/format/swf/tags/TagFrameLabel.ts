/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagFrameLabel implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 43;
		
		public frameName:string = null;
		public namedAnchorFlag:boolean = false;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var start:number = data.position;
			this.frameName = data.readString();
			if ((data.position - start) < length) {
				if (data.readUI8() == 1) {
					this.namedAnchorFlag = true;
				}
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeString(this.frameName);
			
			if (this.namedAnchorFlag) {
				data.writeUI8(1);
			}
			
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagFrameLabel.TYPE; }
		public get name():string { return "FrameLabel"; }
		public get version():number { return 3; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = "Name: " + this.frameName;
			if (this.namedAnchorFlag) {
				str += ", NamedAnchor = true";
			}
			return Tag.toStringCommon(this.type, this.name, indent) + str;
		}
	}

}