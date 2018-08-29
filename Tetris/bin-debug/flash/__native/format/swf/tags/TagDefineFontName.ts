/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagDefineFontName implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 88;
		
		public fontId:number = 0;
		public fontName:string = null;
		public fontCopyright:string = null;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.fontId = data.readUI16();
			this.fontName = data.readString();
			this.fontCopyright = data.readString();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.fontId);
			body.writeString(this.fontName);
			body.writeString(this.fontCopyright);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagDefineFontName.TYPE; }
		public get name():string { return "DefineFontName"; }
		public get version():number { return 9; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"FontID: " + this.fontId + ", " +
				"Name: " + this.fontName + ", " +
				"Copyright: " + this.fontCopyright;
		}
	}

}