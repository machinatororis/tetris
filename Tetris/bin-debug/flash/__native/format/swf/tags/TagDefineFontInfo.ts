/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDefineFontInfo implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 13;
		
		public fontId:number = 0;
		public fontName:string = null;
		public smallText:boolean = false;
		public shiftJIS:boolean = false;
		public ansi:boolean = false;
		public italic:boolean = false;
		public bold:boolean = false;
		public wideCodes:boolean = false;
		public langCode:number = 0;
		
		protected _codeTable:number[] = undefined;
		
		protected langCodeLength:number = 0;
		
		constructor() {
			this._codeTable = new Array<number>();
		}
		
		public get codeTable():number[] { return this._codeTable; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.fontId = data.readUI16();

			var fontNameLen:number = data.readUI8();
			var fontNameRaw:ByteArray = new ByteArray();
			data.readBytes(fontNameRaw, 0, fontNameLen);
			this.fontName = fontNameRaw.readUTFBytes(fontNameLen);
			
			var flags:number = data.readUI8();
			this.smallText = ((flags & 0x20) != 0);
			this.shiftJIS = ((flags & 0x10) != 0);
			this.ansi = ((flags & 0x08) != 0);
			this.italic = ((flags & 0x04) != 0);
			this.bold = ((flags & 0x02) != 0);
			this.wideCodes = ((flags & 0x01) != 0);
			
			this.parseLangCode(data);
			
			var numGlyphs:number =  ((length - fontNameLen - this.langCodeLength - 4) >>> 0);
			for (var i:number = 0; i < numGlyphs; i++) {
				this._codeTable.push(this.wideCodes ? data.readUI16() : data.readUI8());
			}
		}
		
		public publish(data:SWFData, version:number):void
		{
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.fontId);
			
			var fontNameRaw:ByteArray = new ByteArray();
			fontNameRaw.writeUTFBytes(this.fontName);
			body.writeUI8(fontNameRaw.length);
			body.writeBytes(fontNameRaw);
			
			var flags:number = 0;
			if(this.smallText) { flags |= 0x20; }
			if(this.shiftJIS) { flags |= 0x10; }
			if(this.ansi) { flags |= 0x08; }
			if(this.italic) { flags |= 0x04; }
			if(this.bold) { flags |= 0x02; }
			if(this.wideCodes) { flags |= 0x01; }
			body.writeUI8(flags);
			
			this.publishLangCode(body);

			var numGlyphs:number =  ((this._codeTable.length) >>> 0);
			for (var i:number = 0; i < numGlyphs; i++) {
				if(this.wideCodes) {
					body.writeUI16(this._codeTable[i]);
				} else {
					body.writeUI8(this._codeTable[i]);
				}
			}
			
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		protected parseLangCode(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			// Does nothing here.
			// Overridden in TagDefineFontInfo2, where it:
			// - reads langCode
			// - sets langCodeLength to 1
		}
		
		protected publishLangCode(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			// Does nothing here.
			// Overridden in TagDefineFontInfo2
		}
		
		public get type():number { return TagDefineFontInfo.TYPE; }
		public get name():string { return "DefineFontInfo"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"FontID: " + this.fontId + ", " +
				"FontName: " + this.fontName + ", " +
				"Italic: " + this.italic + ", " +
				"Bold: " + this.bold + ", " +
				"Codes: " + this._codeTable.length;
		}
	}

}