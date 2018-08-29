/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class SWFTextRecord
	{
		public type:number = 0;
		public hasFont:boolean = false;
		public hasColor:boolean = false;
		public hasXOffset:boolean = false;
		public hasYOffset:boolean = false;
		
		public fontId:number = 0;
		public textColor:number = 0;
		public textHeight:number = 0;
		public xOffset:number = 0;
		public yOffset:number = 0;
		
		protected _glyphEntries:SWFGlyphEntry[] = undefined;

		protected _level:number = 0;
		
		constructor(data:SWFData = null, glyphBits:number = 0, advanceBits:number = 0, previousRecord:SWFTextRecord = null, level:number = 1) {
			/**/ data = strict(data, SWFData); glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0); previousRecord = strict(previousRecord, SWFTextRecord); level = ((level) >>> 0);
			this._glyphEntries = new Array<SWFGlyphEntry>();
			if (data != null) {
				this.parse(data, glyphBits, advanceBits, previousRecord, level);
			}
		}
		
		public get glyphEntries():SWFGlyphEntry[] { return this._glyphEntries; }
		
		public parse(data:SWFData, glyphBits:number, advanceBits:number, previousRecord:SWFTextRecord = null, level:number = 1):void {
			/**/ data = strict(data, SWFData); glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0); previousRecord = strict(previousRecord, SWFTextRecord); level = ((level) >>> 0);
			this._level = level;
			var styles:number = data.readUI8();
			this.type =(( styles >> 7) >>> 0);
			this.hasFont = ((styles & 0x08) != 0);
			this.hasColor = ((styles & 0x04) != 0);
			this.hasYOffset = ((styles & 0x02) != 0);
			this.hasXOffset = ((styles & 0x01) != 0);
			if (this.hasFont) {
				this.fontId = data.readUI16();
			} else if (previousRecord != null) {
				this.fontId = previousRecord.fontId;
			}
			if (this.hasColor) {
				this.textColor = (level < 2) ? data.readRGB() : data.readRGBA();
			} else if (previousRecord != null) {
				this.textColor = previousRecord.textColor;
			}
			if (this.hasXOffset) {
				this.xOffset =(( data.readSI16() / 20) >> 0);
			} else if (previousRecord != null) {
				this.xOffset = previousRecord.xOffset;
			}
			if (this.hasYOffset) {
				this.yOffset =(( data.readSI16() / 20) >> 0);
			} else if (previousRecord != null) {
				this.yOffset = previousRecord.yOffset;
			}
			if (this.hasFont) {
				this.textHeight =(( data.readUI16() / 20) >>> 0);
			} else if (previousRecord != null) {
				this.textHeight = previousRecord.textHeight;
			}
			var glyphCount:number = data.readUI8();
			for (var i:number = 0; i < glyphCount; i++) {
				this._glyphEntries.push(data.readGLYPHENTRY(glyphBits, advanceBits));
			}
		}
		
		public publish(data:SWFData, glyphBits:number, advanceBits:number, previousRecord:SWFTextRecord = null, level:number = 1):void {
			/**/ data = strict(data, SWFData); glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0); previousRecord = strict(previousRecord, SWFTextRecord); level = ((level) >>> 0);
			var flags:number =  (((this.type << 7)) >>> 0);
			this.hasFont = (previousRecord == null
				|| (previousRecord.fontId != this.fontId)
				|| (previousRecord.textHeight != this.textHeight));
			this.hasColor = (previousRecord == null || (previousRecord.textColor != this.textColor));
			this.hasXOffset = (previousRecord == null || (previousRecord.xOffset != this.xOffset));
			this.hasYOffset = (previousRecord == null || (previousRecord.yOffset != this.yOffset));
			if(this.hasFont) { flags |= 0x08; }
			if(this.hasColor) { flags |= 0x04; }
			if(this.hasYOffset) { flags |= 0x02; }
			if(this.hasXOffset) { flags |= 0x01; }
			data.writeUI8(flags);
			if(this.hasFont) {
				data.writeUI16(this.fontId);
			}
			if(this.hasColor) {
				if(level >= 2) {
					data.writeRGBA(this.textColor);
				} else {
					data.writeRGB(this.textColor);
				}
			}
			if(this.hasXOffset) {
				data.writeSI16(this.xOffset);
			}
			if(this.hasYOffset) {
				data.writeSI16(this.yOffset);
			}
			if(this.hasFont) {
				data.writeUI16(this.textHeight);
			}
			var glyphCount:number =  ((this._glyphEntries.length) >>> 0);
			data.writeUI8(glyphCount);
			for (var i:number = 0; i < glyphCount; i++) {
				data.writeGLYPHENTRY(this._glyphEntries[i], glyphBits, advanceBits);
			}
		}
		
		public clone():SWFTextRecord {
			var record:SWFTextRecord = new SWFTextRecord();
			record.type = this.type;
			record.hasFont = this.hasFont;
			record.hasColor = this.hasColor;
			record.hasXOffset = this.hasXOffset;
			record.hasYOffset = this.hasYOffset;
			record.fontId = this.fontId;
			record.textColor = this.textColor;
			record.textHeight = this.textHeight;
			record.xOffset = this.xOffset;
			record.yOffset = this.yOffset;
			for (var i:number = 0; i < this._glyphEntries.length; i++) {
				record.glyphEntries.push(this._glyphEntries[i].clone());
			}
			return record;
		}
		
		public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var params:any[] = ["Glyphs: " + this._glyphEntries.length.toString()];
			if (this.hasFont) { params.push("FontID: " + this.fontId); params.push("Height: " + this.textHeight); }
			if (this.hasColor) { params.push("Color: " + ((this._level <= 2) ? ColorUtils.rgbToString(this.textColor) : ColorUtils.rgbaToString(this.textColor))); }
			if (this.hasXOffset) { params.push("XOffset: " + this.xOffset); }
			if (this.hasYOffset) { params.push("YOffset: " + this.yOffset); }
			var str:string = params.join(", ");
			for (var i:number = 0; i < this._glyphEntries.length; i++) {
				str += "\n" + StringUtils.repeat(indent + 2) + "[" + i + "] " + this._glyphEntries[i].toString();
			}
			return str;
		}
	}

}