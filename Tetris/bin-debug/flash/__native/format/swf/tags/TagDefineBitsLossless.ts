/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../../../../display/BitmapData.ts" />
/// <reference path="../data/consts/BitmapFormat.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BitmapFormat = flash.__native.format.swf.data.consts.BitmapFormat;
	export import BitmapData = flash.display.BitmapData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDefineBitsLossless implements IDefinitionBitsTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		implements_flash___native_format_swf_tags_IDefinitionBitsTag = null;
		public static TYPE : number = 20;
		
		public bitmapFormat : number = 0;
		public bitmapWidth : number = 0;
		public bitmapHeight : number = 0;
		public bitmapColorTableSize : number = 0;
		
		protected _characterId : number = 0;
		protected _zlibBitmapData : ByteArray = null;
		protected _instance : BitmapData = null;
		
		constructor()
		{
			this._zlibBitmapData = new ByteArray;
		}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }
		
		public get zlibBitmapData():ByteArray { return this._zlibBitmapData; }
		
		public set instance(value:BitmapData) { /**/ value = strict(value, BitmapData); this._instance = value; }
		public get instance():BitmapData { return this._instance || new BitmapData(1, 1, true, 0x66000000); }
		
		public parse (data:SWFData, length:number, version:number, async:boolean = false):void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.bitmapFormat = data.readUI8();
			this.bitmapWidth = data.readUI16();
			this.bitmapHeight = data.readUI16();
			
			if (this.bitmapFormat == BitmapFormat.BIT_8) {
				
				this.bitmapColorTableSize = data.readUI8();
				
			}
			
			data.readBytes (this.zlibBitmapData, 0, length - ((this.bitmapFormat == BitmapFormat.BIT_8) ? 8 : 7));
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this._characterId);
			body.writeUI8(this.bitmapFormat);
			body.writeUI16(this.bitmapWidth);
			body.writeUI16(this.bitmapHeight);
			if (this.bitmapFormat == BitmapFormat.BIT_8) {
				body.writeUI8(this.bitmapColorTableSize);
			}
			if (this._zlibBitmapData.length > 0) {
				body.writeBytes(this._zlibBitmapData);
			}
			data.writeTagHeader(this.type, body.length, true);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineBitsLossless = new TagDefineBitsLossless();
			tag.characterId = this.characterId;
			tag.bitmapFormat = this.bitmapFormat;
			tag.bitmapWidth = this.bitmapWidth;
			tag.bitmapHeight = this.bitmapHeight;
			if (this._zlibBitmapData.length > 0) {
				tag.zlibBitmapData.writeBytes(this._zlibBitmapData);
			}
			return tag;
		}
		
		public get type():number { return TagDefineBitsLossless.TYPE; }
		public get name():string { return "DefineBitsLossless"; }
		public get version():number { return 2; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Format: " + BitmapFormat.toString(this.bitmapFormat) + ", " +
				"Size: (" + this.bitmapWidth + "," + this.bitmapHeight + ")";
		}
	}

}