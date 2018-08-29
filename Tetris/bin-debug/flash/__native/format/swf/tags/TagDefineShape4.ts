/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/SWFRectangle.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagDefineShape4 extends TagDefineShape3 implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 83;
		
		public edgeBounds:SWFRectangle;
		public usesFillWindingRule:boolean;
		public usesNonScalingStrokes:boolean;
		public usesScalingStrokes:boolean;

		constructor() {
			/**/ this.edgeBounds === void 0 && (this.edgeBounds = null);
			/**/ this.usesFillWindingRule === void 0 && (this.usesFillWindingRule = false);
			/**/ this.usesNonScalingStrokes === void 0 && (this.usesNonScalingStrokes = false);
			/**/ this.usesScalingStrokes === void 0 && (this.usesScalingStrokes = false);
			super(); }
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.shapeBounds = data.readRECT();
			this.edgeBounds = data.readRECT();
			var flags:number = data.readUI8();
			this.usesFillWindingRule = ((flags & 0x04) != 0);
			this.usesNonScalingStrokes = ((flags & 0x02) != 0);
			this.usesScalingStrokes = ((flags & 0x01) != 0);
			this.shapes = data.readSHAPEWITHSTYLE(this.level);
		}
		
		/*override*/ public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeRECT(this.shapeBounds);
			body.writeRECT(this.edgeBounds);
			var flags:number = 0;
			if(this.usesFillWindingRule) { flags |= 0x04; }
			if(this.usesNonScalingStrokes) { flags |= 0x02; }
			if(this.usesScalingStrokes) { flags |= 0x01; }
			body.writeUI8(flags);
			body.writeSHAPEWITHSTYLE(this.shapes, this.level);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*override*/ public get type():number { return TagDefineShape4.TYPE; }
		/*override*/ public get name():string { return "DefineShape4"; }
		/*override*/ public get version():number { return 8; }
		/*override*/ public get level():number { return 4; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) + "ID: " + this.characterId + ", ";
			if(this.usesFillWindingRule) { str += "UsesFillWindingRule, "; }
			if(this.usesNonScalingStrokes) { str += "UsesNonScalingStrokes, "; }
			if(this.usesScalingStrokes) { str += "UsesScalingStrokes, "; }
			str += "ShapeBounds: " + this.shapeBounds + ", EdgeBounds: " + this.edgeBounds;
			str += this.shapes.toString(indent + 2);
			return str;
		}
	}

}