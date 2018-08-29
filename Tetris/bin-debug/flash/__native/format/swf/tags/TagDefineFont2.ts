/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/SWFRectangle.ts" />
/// <reference path="../data/SWFKerningRecord.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFKerningRecord = flash.__native.format.swf.data.SWFKerningRecord;
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDefineFont2 extends TagDefineFont implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 48;
		
		public hasLayout:boolean;
		public shiftJIS:boolean;
		public smallText:boolean;
		public ansi:boolean;
		public wideOffsets:boolean;
		public wideCodes:boolean;
		public italic:boolean;
		public bold:boolean;
		public languageCode:number;
		public fontName:string;
		public ascent:number;
		public descent:number;
		public leading:number;

		protected _codeTable:number[];
		protected _fontAdvanceTable:number[];
		protected _fontBoundsTable:SWFRectangle[];
		protected _fontKerningTable:SWFKerningRecord[];
		
		constructor() {
			/**/ this.hasLayout === void 0 && (this.hasLayout = false);
			/**/ this.shiftJIS === void 0 && (this.shiftJIS = false);
			/**/ this.smallText === void 0 && (this.smallText = false);
			/**/ this.ansi === void 0 && (this.ansi = false);
			/**/ this.wideOffsets === void 0 && (this.wideOffsets = false);
			/**/ this.wideCodes === void 0 && (this.wideCodes = false);
			/**/ this.italic === void 0 && (this.italic = false);
			/**/ this.bold === void 0 && (this.bold = false);
			/**/ this.languageCode === void 0 && (this.languageCode = 0);
			/**/ this.fontName === void 0 && (this.fontName = null);
			/**/ this.ascent === void 0 && (this.ascent = 0);
			/**/ this.descent === void 0 && (this.descent = 0);
			/**/ this.leading === void 0 && (this.leading = 0);
			/**/ this._codeTable === void 0 && (this._codeTable = undefined);
			/**/ this._fontAdvanceTable === void 0 && (this._fontAdvanceTable = undefined);
			/**/ this._fontBoundsTable === void 0 && (this._fontBoundsTable = undefined);
			/**/ this._fontKerningTable === void 0 && (this._fontKerningTable = undefined);
			super(); 
			this._codeTable = new Array<number>();
			this._fontAdvanceTable = new Array<number>();
			this._fontBoundsTable = new Array<SWFRectangle>();
			this._fontKerningTable = new Array<SWFKerningRecord>();
		}
		
		public get codeTable():number[] { return this._codeTable; }
		public get fontAdvanceTable():number[] { return this._fontAdvanceTable; }
		public get fontBoundsTable():SWFRectangle[] { return this._fontBoundsTable; }
		public get fontKerningTable():SWFKerningRecord[] { return this._fontKerningTable; }
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			var flags:number = data.readUI8();
			this.hasLayout = ((flags & 0x80) != 0);
			this.shiftJIS = ((flags & 0x40) != 0);
			this.smallText = ((flags & 0x20) != 0);
			this.ansi = ((flags & 0x10) != 0);
			this.wideOffsets = ((flags & 0x08) != 0);
			this.wideCodes = ((flags & 0x04) != 0);
			this.italic = ((flags & 0x02) != 0);
			this.bold = ((flags & 0x01) != 0);
			this.languageCode = data.readLANGCODE();
			var fontNameLen:number = data.readUI8();
			var fontNameRaw:ByteArray = new ByteArray();
			data.readBytes(fontNameRaw, 0, fontNameLen);
			this.fontName = fontNameRaw.readUTFBytes(fontNameLen - 1);
			var i:number = 0;
			var numGlyphs:number = data.readUI16();
			if (numGlyphs > 0) {
				// Skip offsets. We don't need them.
				data.skipBytes(numGlyphs << (this.wideOffsets ? 2 : 1));
				// Not used
				var codeTableOffset:number = (this.wideOffsets ? data.readUI32() : data.readUI16());
				for (i = 0; i < numGlyphs; i++) {
					this._glyphShapeTable.push(data.readSHAPE());
				}
				for (i = 0; i < numGlyphs; i++) {
					this._codeTable.push(this.wideCodes ? data.readUI16() : data.readUI8());
				}
			}
			if (this.hasLayout) {
				this.ascent = data.readUI16();
				this.descent = data.readUI16();
				this.leading = data.readSI16();
				for (i = 0; i < numGlyphs; i++) {
					this._fontAdvanceTable.push(data.readSI16());
				}
				for (i = 0; i < numGlyphs; i++) {
					this._fontBoundsTable.push(data.readRECT());
				}
				var kerningCount:number = data.readUI16();
				for (i = 0; i < kerningCount; i++) {
					this._fontKerningTable.push(data.readKERNINGRECORD(this.wideCodes));
				}
			}
		}
		
		/*override*/ public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			var numGlyphs:number =  ((this.glyphShapeTable.length) >>> 0);
			var i:number = 0
			body.writeUI16(this.characterId);
			var flags:number = 0;
			if(this.hasLayout) { flags |= 0x80; }
			if(this.shiftJIS) { flags |= 0x40; }
			if(this.smallText) { flags |= 0x20; }
			if(this.ansi) { flags |= 0x10; }
			if(this.wideOffsets) { flags |= 0x08; }
			if(this.wideCodes) { flags |= 0x04; }
			if(this.italic) { flags |= 0x02; }
			if(this.bold) { flags |= 0x01; }
			body.writeUI8(flags);
			body.writeLANGCODE(this.languageCode);
			var fontNameRaw:ByteArray = new ByteArray();
			fontNameRaw.writeUTFBytes(this.fontName);
			body.writeUI8(fontNameRaw.length);
			body.writeBytes(fontNameRaw);
			body.writeUI16(numGlyphs);
			if(numGlyphs > 0) {
				var offsetTableLength:number =  (((numGlyphs << (this.wideOffsets ? 2 : 1))) >>> 0);
				var codeTableOffsetLength:number =  (((this.wideOffsets ? 4 : 2)) >>> 0);
				var codeTableLength:number =  (((this.wideOffsets ? (numGlyphs << 1) : numGlyphs)) >>> 0);
				var offset:number =  ((offsetTableLength + codeTableOffsetLength) >>> 0);
				var shapeTable:SWFData = new SWFData();
				for (i = 0; i < numGlyphs; i++) {
					// Write out the offset table for the current glyph
					if(this.wideOffsets) {
						body.writeUI32(offset + shapeTable.position);
					} else {
						body.writeUI16(offset + shapeTable.position);
					}
					// Serialize the glyph's shape to a separate bytearray
					shapeTable.writeSHAPE(this.glyphShapeTable[i]);
				}
				// Code table offset
				if(this.wideOffsets) {
					body.writeUI32(offset + shapeTable.length);
				} else {
					body.writeUI16(offset + shapeTable.length);
				}
				// Now concatenate the glyph shape table to the end (after
				// the offset table that we were previously writing inside
				// the for loop above).
				body.writeBytes(shapeTable);
				// Write the code table
				for (i = 0; i < numGlyphs; i++) {
					if(this.wideCodes) {
						body.writeUI16(this.codeTable[i]);
					} else {
						body.writeUI8(this.codeTable[i]);
					}
				}
			}
			if (this.hasLayout) {
				body.writeUI16(this.ascent);
				body.writeUI16(this.descent);
				body.writeSI16(this.leading);
				for (i = 0; i < numGlyphs; i++) {
					body.writeSI16(this.fontAdvanceTable[i]);
				}
				for (i = 0; i < numGlyphs; i++) {
					body.writeRECT(this.fontBoundsTable[i]);
				}
				var kerningCount:number =  ((this.fontKerningTable.length) >>> 0);
				body.writeUI16(kerningCount);
				for (i = 0; i < kerningCount; i++) {
					body.writeKERNINGRECORD(this.fontKerningTable[i], this.wideCodes);
				}
			}
			// Now write the tag with the known body length, and the
			// actual contents out to the provided SWFData instance.
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*override*/ public get type():number { return TagDefineFont2.TYPE; }
		/*override*/ public get name():string { return "DefineFont2"; }
		/*override*/ public get version():number { return 3; }
		/*override*/ public get level():number { return 2; }

		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"FontName: " + this.fontName + ", " +
				"Italic: " + this.italic + ", " +
				"Bold: " + this.bold + ", " +
				"Glyphs: " + this._glyphShapeTable.length;
			return str + this.toStringCommon(indent);
		}
		
		/*override*/ protected toStringCommon(indent:number):string {
			/**/ indent = ((indent) >>> 0);
			var i:number = 0;
			var len:number = 0;
			var str:string = super.toStringCommon(indent);
			if (this.hasLayout) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Ascent: " + this.ascent;
				str += "\n" + StringUtils.repeat(indent + 2) + "Descent: " + this.descent;
				str += "\n" + StringUtils.repeat(indent + 2) + "Leading: " + this.leading;
			}
			if ((len=((this._codeTable.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "CodeTable:";
				for (i = 0; i < len; i++) {
					if ((i & 0x0f) == 0) {
						str += "\n" + StringUtils.repeat(indent + 4) + this._codeTable[i].toString();
					} else {
						str += ", " + this._codeTable[i].toString();
					}
				}
			}
			if ((len=((this._fontAdvanceTable.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "FontAdvanceTable:";
				for (i = 0; i < len; i++) {
					if ((i & 0x07) == 0) {
						str += "\n" + StringUtils.repeat(indent + 4) + this._fontAdvanceTable[i].toString();
					} else {
						str += ", " + this._fontAdvanceTable[i].toString();
					}
				}
			}
			if ((len=((this._fontBoundsTable.length) >>> 0)) > 0) {
				var hasNonNullBounds:boolean = false;
				for (i = 0; i < len; i++) {
					var rect:SWFRectangle =  strict(this._fontBoundsTable[i], SWFRectangle);
					if (rect.xmin != 0 || rect.xmax != 0 || rect.ymin != 0 || rect.ymax != 0) {
						hasNonNullBounds = true;
						break;
					}
				}
				if (hasNonNullBounds) {
					str += "\n" + StringUtils.repeat(indent + 2) + "FontBoundsTable:";
					for (i = 0; i < len; i++) {
						str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._fontBoundsTable[i].toString();
					}
				}
			}
			if ((len=((this._fontKerningTable.length) >>> 0)) > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "KerningTable:";
				for (i = 0; i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._fontKerningTable[i].toString();
				}
			}
			return str;
		}
	}

}