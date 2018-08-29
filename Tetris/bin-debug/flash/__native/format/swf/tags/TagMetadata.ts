/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
/// <reference path="../../../../../XML.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import XML = global.XML;
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagMetadata implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 77;
		
		public xmlString:string = null;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.xmlString = data.readString();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeString(this.xmlString);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagMetadata.TYPE; }
		public get name():string { return "Metadata"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
			
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent)
			var xml//:XML;
			try {
				xml = new XML(this.xmlString);
				str += " " + xml.toXMLString();
			} catch(error) {
				error = window.asc.e2e(error);
				str += " " + this.xmlString;
			}
			return str;
		}
	}

}