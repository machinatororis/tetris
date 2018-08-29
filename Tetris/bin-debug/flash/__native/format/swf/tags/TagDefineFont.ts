/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../exporters/core/IShapeExporter.ts" />
/// <reference path="../data/SWFShape.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFShape = flash.__native.format.swf.data.SWFShape;
	export import IShapeExporter = flash.__native.format.swf.exporters.core.IShapeExporter;
	export import StringUtils = flash.__native.utils.StringUtils;
	
		
	export  class TagDefineFont implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 10;
		
		protected _characterId:number = 0;
		
		protected _glyphShapeTable:SWFShape[] = undefined;
		
		constructor() {
			this._glyphShapeTable = new Array<SWFShape>();
		}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public get glyphShapeTable():SWFShape[] { return this._glyphShapeTable; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			// Because the glyph shape table immediately follows the offset table,
			// the number of entries in each table (the number of glyphs in the font) can be inferred by
			// dividing the first entry in the offset table by two.
			var numGlyphs:number =  ((data.readUI16() >> 1) >>> 0);
			// Skip offsets. We don't need them here.
			data.skipBytes((numGlyphs - 1) << 1);
			// Read glyph shape table
			for (var i:number = 0; i < numGlyphs; i++) {
				this._glyphShapeTable.push(data.readSHAPE(this.unitDivisor));
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			var i:number = 0
			var prevPtr:number = 0;
			var len:number =  ((this.glyphShapeTable.length) >>> 0);
			var shapeTable:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			var offsetTableLength:number =  (((len << 1)) >>> 0);
			for (i = 0; i < len; i++) {
				// Write out the offset table for the current glyph
				body.writeUI16(shapeTable.position + offsetTableLength);
				// Serialize the glyph's shape to a separate bytearray
				shapeTable.writeSHAPE(this.glyphShapeTable[i]);
			}
			// Now concatenate the glyph shape table to the end (after
			// the offset table that we were previously writing inside
			// the for loop above).
			body.writeBytes(shapeTable);
			// Now write the tag with the known body length, and the
			// actual contents out to the provided SWFData instance.
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineFont = new TagDefineFont();
			throw(new Error("Not implemented yet."));
			return tag;
		}
		
		public exportFont(handler:IShapeExporter, glyphIndex:number):void {
			/**/ handler = strict(handler, 'implements_flash___native_format_swf_exporters_core_IShapeExporter'); glyphIndex = ((glyphIndex) >>> 0);
			this.glyphShapeTable[glyphIndex].exportShape(handler);
		}
		
		public get type():number { return TagDefineFont.TYPE; }
		public get name():string { return "DefineFont"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
		
		protected get unitDivisor():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Glyphs: " + this._glyphShapeTable.length;
			return str + this.toStringCommon(indent);
		}
		
		protected toStringCommon(indent:number):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "";
			for (var i:number = 0, len:number =  ((this._glyphShapeTable.length) >>> 0); i < len; i++) {
				str += "\n" + StringUtils.repeat(indent + 2) + "[" + i + "] GlyphShapes:";
				str += this._glyphShapeTable[i].toString(indent + 4);
			}
			return str;
		}
	}

}