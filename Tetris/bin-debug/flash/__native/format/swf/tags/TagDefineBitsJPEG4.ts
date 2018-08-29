/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../data/consts/BitmapType.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BitmapType = flash.__native.format.swf.data.consts.BitmapType;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDefineBitsJPEG4 extends TagDefineBitsJPEG3 implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 90;
		
		public deblockParam:number = NaN;
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			
			var alphaDataOffset:number = data.readUI32();
			this.deblockParam = data.readFIXED8();
			data.readBytes(this._bitmapData, 0, alphaDataOffset);
			
			if (this.bitmapData.get(0) == 0xff && (this.bitmapData.get(1) == 0xd8 || this.bitmapData.get(1) == 0xd9)) {
				
				this.bitmapType = BitmapType.JPEG;
				
			} else if (this.bitmapData.get(0) == 0x89 && this.bitmapData.get(1) == 0x50 && this.bitmapData.get(2) == 0x4e && this.bitmapData.get(3) == 0x47 && this.bitmapData.get(4) == 0x0d && this.bitmapData.get(5) == 0x0a && this.bitmapData.get(6) == 0x1a && this.bitmapData.get(7) == 0x0a) {
				
				this.bitmapType = BitmapType.PNG;
				
			} else if (this.bitmapData.get(0) == 0x47 && this.bitmapData.get(1) == 0x49 && this.bitmapData.get(2) == 0x46 && this.bitmapData.get(3) == 0x38 && this.bitmapData.get(4) == 0x39 && this.bitmapData.get(5) == 0x61) {
				
				this.bitmapType = BitmapType.GIF89A;
				
			}
			
			var alphaDataSize:number =  ((length - alphaDataOffset - 6) >>> 0);
			if (alphaDataSize > 0) {
				
				data.readBytes(this._bitmapAlphaData, 0, alphaDataSize);
				
			}
		}
		
		/*override*/ public publish(data:SWFData, version:number):void
		{
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, this._bitmapData.length + this._bitmapAlphaData.length + 6, true);
			data.writeUI16(this.characterId);
			data.writeUI32(this._bitmapData.length);
			data.writeFIXED8(this.deblockParam);
			
			if (this._bitmapData.length > 0) {
				
				data.writeBytes(this._bitmapData);
				
			}
			
			if (this._bitmapAlphaData.length > 0) {
				
				data.writeBytes(this._bitmapAlphaData);
				
			}
		}
		
		/*override*/ public clone():IDefinitionTag
		{
			var tag:TagDefineBitsJPEG4 = new TagDefineBitsJPEG4;
			tag.characterId = this.characterId;
			tag.bitmapType = this.bitmapType;
			tag.deblockParam = this.deblockParam;
			
			if (this._bitmapData.length > 0) {
				
				tag.bitmapData.writeBytes(this._bitmapData);
				
			}
			
			if (this._bitmapAlphaData.length > 0) {
				
				tag.bitmapAlphaData.writeBytes(this._bitmapAlphaData);
				
			}
			
			return tag;
		}
		
		/*override*/ public get type():number { return TagDefineBitsJPEG4.TYPE; }
		/*override*/ public get name():string { return "DefineBitsJPEG4"; }
		/*override*/ public get version():number { return 10; }
		/*override*/ public get level():number { return 4; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Type: " + BitmapType.toString(this.bitmapType) + ", " +
				"DeblockParam: " + this.deblockParam + ", " +
				"HasAlphaData: " + (this._bitmapAlphaData.length > 0) + ", " +
				((this._bitmapAlphaData.length > 0) ? "BitmapAlphaLength: " + this._bitmapAlphaData.length + ", " : "") +
				"BitmapLength: " + this._bitmapData.length;
			return str;
		}
	}

}