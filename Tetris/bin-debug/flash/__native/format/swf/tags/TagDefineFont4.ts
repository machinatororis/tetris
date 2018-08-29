/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDefineFont4 implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 91;
		
		public hasFontData:boolean = false;
		public italic:boolean = false;
		public bold:boolean = false;
		public fontName:string = null;

		protected _characterId:number = 0;
		
		protected _fontData:ByteArray = null;
		
		constructor() {
			this._fontData = new ByteArray();
		}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public get fontData():ByteArray { return this._fontData; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var pos:number = data.position;
			this._characterId = data.readUI16();
			var flags:number = data.readUI8();
			this.hasFontData = ((flags & 0x04) != 0);
			this.italic = ((flags & 0x02) != 0);
			this.bold = ((flags & 0x01) != 0);
			this.fontName = data.readString();
			if (this.hasFontData && length > data.position - pos) {
				data.readBytes(this._fontData, 0, length - (data.position - pos));
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			var flags:number = 0;
			if(this.hasFontData) { flags |= 0x04; }
			if(this.italic) { flags |= 0x02; }
			if(this.bold) { flags |= 0x01; }
			body.writeUI8(flags);
			body.writeString(this.fontName);
			if (this.hasFontData && this._fontData.length > 0) {
				body.writeBytes(this._fontData);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineFont4 = new TagDefineFont4();
			tag.characterId = this.characterId;
			tag.hasFontData = this.hasFontData;
			tag.italic = this.italic;
			tag.bold = this.bold;
			tag.fontName = this.fontName;
			if (this._fontData.length > 0) {
				tag.fontData.writeBytes(this._fontData);
			}
			return tag;
		}
		
		public get type():number { return TagDefineFont4.TYPE; }
		public get name():string { return "DefineFont4"; }
		public get version():number { return 10; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"FontName: " + this.fontName + ", " +
				"HasFontData: " + this.hasFontData + ", " +
				"Italic: " + this.italic + ", " +
				"Bold: " + this.bold;
			return str;
		}
	}

}