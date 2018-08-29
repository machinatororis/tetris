/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/SWFTextRecord.ts" />
/// <reference path="../data/SWFRectangle.ts" />
/// <reference path="../data/SWFMatrix.ts" />
/// <reference path="../data/SWFGlyphEntry.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFGlyphEntry = flash.__native.format.swf.data.SWFGlyphEntry;
	export import SWFMatrix = flash.__native.format.swf.data.SWFMatrix;
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	export import SWFTextRecord = flash.__native.format.swf.data.SWFTextRecord;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagDefineText implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 11;
		
		public textBounds:SWFRectangle = null;
		public textMatrix:SWFMatrix = null;
		
		protected _characterId:number = 0;
		
		protected _records:SWFTextRecord[] = undefined;
		
		constructor() {
			this._records = new Array<SWFTextRecord>();
		}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public get records():SWFTextRecord[] { return this._records; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.textBounds = data.readRECT();
			this.textMatrix = data.readMATRIX();
			var glyphBits:number = data.readUI8();
			var advanceBits:number = data.readUI8();
			var record:SWFTextRecord;
			while ((record = data.readTEXTRECORD(glyphBits, advanceBits, record, this.level)) != null) {
				this._records.push(record);
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			var i:number = 0;
			var j:number = 0;
			var record:SWFTextRecord;
			body.writeUI16(this.characterId);
			body.writeRECT(this.textBounds);
			body.writeMATRIX(this.textMatrix);
			// Calculate glyphBits and advanceBits values
			var glyphBitsValues:any[] = [];
			var advanceBitsValues:any[] = [];
			var recordsLen:number =  ((this._records.length) >>> 0) 
			for(i = 0; i < recordsLen; i++) {
				record =strict( this._records[i], SWFTextRecord);
				var glyphCount:number =  ((record.glyphEntries.length) >>> 0);
				for (j = 0; j < glyphCount; j++) {
					var glyphEntry:SWFGlyphEntry =  strict(record.glyphEntries[j], SWFGlyphEntry);
					glyphBitsValues.push(glyphEntry.index);
					advanceBitsValues.push(glyphEntry.advance);
				}
			}
			var glyphBits:number = body.calculateMaxBits(false, glyphBitsValues);
			var advanceBits:number = body.calculateMaxBits(true, advanceBitsValues);
			body.writeUI8(glyphBits);
			body.writeUI8(advanceBits);
			// Write text records
			record = null;
			for(i = 0; i < recordsLen; i++) {
				body.writeTEXTRECORD(this._records[i], glyphBits, advanceBits, record, this.level);
				record =strict( this._records[i], SWFTextRecord);
			}
			body.writeUI8(0);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineText = new TagDefineText();
			tag.characterId = this.characterId;
			tag.textBounds = this.textBounds.clone();
			tag.textMatrix = this.textMatrix.clone();
			for (var i:number = 0, len:number =  ((this._records.length) >>> 0); i < len; i++) {
				tag.records.push(this._records[i].clone());
			}
			return tag;
		}
		
		public get type():number { return TagDefineText.TYPE; }
		public get name():string { return "DefineText"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
	
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Bounds: " + this.textBounds + ", " +
				"Matrix: " + this.textMatrix;
			if (this._records.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "TextRecords:";
				for (var i:number = 0, len:number =  ((this._records.length) >>> 0); i < len; i++) {
					str += "\n" +
						StringUtils.repeat(indent + 4) +
						"[" + i + "] " +
						this._records[i].toString(indent + 4);
				}
			}
			return str;
		}
	}

}