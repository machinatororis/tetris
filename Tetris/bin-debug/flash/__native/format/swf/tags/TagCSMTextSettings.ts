/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagCSMTextSettings implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 74;
		
		public textId:number = 0;
		public useFlashType:number = 0;
		public gridFit:number = 0;
		public thickness:number = NaN;
		public sharpness:number = NaN;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.textId = data.readUI16();
			this.useFlashType = data.readUB(2);
			this.gridFit = data.readUB(3);
			data.readUB(3); // reserved, always 0
			this.thickness = data.readFIXED();
			this.sharpness = data.readFIXED();
			data.readUI8(); // reserved, always 0
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, 12);
			data.writeUI16(this.textId);
			data.writeUB(2, this.useFlashType);
			data.writeUB(3, this.gridFit);
			data.writeUB(3, 0); // reserved, always 0
			data.writeFIXED(this.thickness);
			data.writeFIXED(this.sharpness);
			data.writeUI8(0); // reserved, always 0
		}
		
		public get type():number { return TagCSMTextSettings.TYPE; }
		public get name():string { return "CSMTextSettings"; }
		public get version():number { return 8; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"TextID: " + this.textId + ", " +
				"UseFlashType: " + this.useFlashType + ", " +
				"GridFit: " + this.gridFit + ", " +
				"Thickness: " + this.thickness + ", " +
				"Sharpness: " + this.sharpness;
		}
	}

}