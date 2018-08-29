/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/consts/BitmapType.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BitmapType = flash.__native.format.swf.data.consts.BitmapType;
	
	
	export  class TagDefineBitsJPEG2 extends TagDefineBits implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 21;
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			super.parse(data, length, version);
			
			if (this.bitmapData.get(0) == 0xff && (this.bitmapData.get(1) == 0xd8 || this.bitmapData.get(1) == 0xd9)) {
				
				this.bitmapType = BitmapType.JPEG;
				
			} else if (this.bitmapData.get(0) == 0x89 && this.bitmapData.get(1) == 0x50 && this.bitmapData.get(2) == 0x4e && this.bitmapData.get(3) == 0x47 && this.bitmapData.get(4) == 0x0d && this.bitmapData.get(5) == 0x0a && this.bitmapData.get(6) == 0x1a && this.bitmapData.get(7) == 0x0a) {
				
				this.bitmapType = BitmapType.PNG;
				
			} else if (this.bitmapData.get(0) == 0x47 && this.bitmapData.get(1) == 0x49 && this.bitmapData.get(2) == 0x46 && this.bitmapData.get(3) == 0x38 && this.bitmapData.get(4) == 0x39 && this.bitmapData.get(5) == 0x61) {
				
				this.bitmapType = BitmapType.GIF89A;
				
			}
		}
		
		/*override*/ public clone():IDefinitionTag
		{
			var tag:TagDefineBitsJPEG2 = new TagDefineBitsJPEG2;
			tag.characterId = this.characterId;
			tag.bitmapType = this.bitmapType;
			
			if (this._bitmapData.length > 0) {
				
				tag.bitmapData.writeBytes(this._bitmapData);
				
			}
			
			return tag;
		}
		
		/*override*/ public get type():number { return TagDefineBitsJPEG2.TYPE; }
		/*override*/ public get name():string { return "DefineBitsJPEG2"; }
		/*override*/ public get version():number { return (this.bitmapType == BitmapType.JPEG) ? 2 : 8; }
		/*override*/ public get level():number { return 2; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Type: " + BitmapType.toString(this.bitmapType) + ", " +
				"BitmapLength: " + this.bitmapData.length;
			return str;
		}
	}

}