/// <reference path="../../../../../base.d.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	
	
	export  class TagSetBackgroundColor implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 9;
		
		public color:number = 0xffffff;
		
		constructor() {}
		
		public static create(aColor:number = 0xffffff):TagSetBackgroundColor {
			/**/ aColor = ((aColor) >>> 0);
			var setBackgroundColor:TagSetBackgroundColor = new TagSetBackgroundColor();
			setBackgroundColor.color = aColor;
			return setBackgroundColor;
		}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.color = data.readRGB();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, 3);
			data.writeRGB(this.color);
		}
		
		public get type():number { return TagSetBackgroundColor.TYPE; }
		public get name():string { return "SetBackgroundColor"; }
		public get version():number { return 1; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) + "Color: " + ColorUtils.rgbToString(this.color);
		}
	}

}