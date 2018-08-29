/// <reference path="../../../../../base.d.ts" />
/// <reference path="../exporters/core/IShapeExporter.ts" />
/// <reference path="../data/SWFShapeWithStyle.ts" />
/// <reference path="../data/SWFRectangle.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	export import SWFShapeWithStyle = flash.__native.format.swf.data.SWFShapeWithStyle;
	export import IShapeExporter = flash.__native.format.swf.exporters.core.IShapeExporter;
	
	
	export  class TagDefineShape implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 2;
		
		public shapeBounds:SWFRectangle = null;
		public shapes:SWFShapeWithStyle = null;

		protected _characterId:number = 0;
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }
		
		/*[internal]*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void
		{
			// data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.shapeBounds = data.readRECT();
			this.shapes = data.readSHAPEWITHSTYLE(this.level);
		}
		
		/*[internal]*/ public publish(data:SWFData, version:number):void
		{
			// data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeRECT(this.shapeBounds);
			body.writeSHAPEWITHSTYLE(this.shapes, this.level);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*[internal]*/ public clone():IDefinitionTag
		{
			var tag:TagDefineShape = new TagDefineShape();
			throw(new Error("Not implemented yet."));
			return tag;
		}
		
		/*[internal]*/ public exportShape(handler:IShapeExporter = null):void
		{
			// handler = strict(handler, 'implements_flash___native_format_swf_exporters_core_IShapeExporter');
			this.shapes.exportShape(handler);
		}
		
		public get type():number { return TagDefineShape.TYPE; }
		public get name():string { return "DefineShape"; }
		public get version():number { return 1; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Bounds: " + this.shapeBounds;
			str += this.shapes.toString(indent + 2);
			return str;
		}
	}

}