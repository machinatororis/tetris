/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/SWFRectangle.ts" />
/// <reference path="../data/SWFMorphLineStyle2.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFMorphLineStyle2 = flash.__native.format.swf.data.SWFMorphLineStyle2;
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagDefineMorphShape2 extends TagDefineMorphShape implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 84;
		
		public startEdgeBounds:SWFRectangle;
		public endEdgeBounds:SWFRectangle;
		public usesNonScalingStrokes:boolean;
		public usesScalingStrokes:boolean;
		
		constructor() {
			/**/ this.startEdgeBounds === void 0 && (this.startEdgeBounds = null);
			/**/ this.endEdgeBounds === void 0 && (this.endEdgeBounds = null);
			/**/ this.usesNonScalingStrokes === void 0 && (this.usesNonScalingStrokes = false);
			/**/ this.usesScalingStrokes === void 0 && (this.usesScalingStrokes = false);
			super(); }
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.startBounds = data.readRECT();
			this.endBounds = data.readRECT();
			this.startEdgeBounds = data.readRECT();
			this.endEdgeBounds = data.readRECT();
			var flags:number = data.readUI8();
			this.usesNonScalingStrokes = ((flags & 0x02) != 0);
			this.usesScalingStrokes = ((flags & 0x01) != 0);
			var offset:number = data.readUI32();
			var i:number = 0;
			// MorphFillStyleArray
			var fillStyleCount:number = data.readUI8();
			if (fillStyleCount == 0xff) {
				fillStyleCount = data.readUI16();
			}
			for (i = 0; i < fillStyleCount; i++) {
				this._morphFillStyles.push(data.readMORPHFILLSTYLE());
			}
			// MorphLineStyleArray
			var lineStyleCount:number = data.readUI8();
			if (lineStyleCount == 0xff) {
				lineStyleCount = data.readUI16();
			}
			for (i = 0; i < lineStyleCount; i++) {
				this._morphLineStyles.push(data.readMORPHLINESTYLE2());
			}
			this.startEdges = data.readSHAPE();
			this.endEdges = data.readSHAPE();
		}
		
		/*override*/ public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeRECT(this.startBounds);
			body.writeRECT(this.endBounds);
			body.writeRECT(this.startEdgeBounds);
			body.writeRECT(this.endEdgeBounds);
			var flags:number = 0;
			if(this.usesNonScalingStrokes) { flags |= 0x02; }
			if(this.usesScalingStrokes) { flags |= 0x01; }
			body.writeUI8(flags);
			var startBytes:SWFData = new SWFData();
			var i:number = 0;
			// MorphFillStyleArray
			var fillStyleCount:number =  ((this._morphFillStyles.length) >>> 0);
			if (fillStyleCount > 0xfe) {
				startBytes.writeUI8(0xff);
				startBytes.writeUI16(fillStyleCount);
			} else {
				startBytes.writeUI8(fillStyleCount);
			}
			for (i = 0; i < fillStyleCount; i++) {
				startBytes.writeMORPHFILLSTYLE(this._morphFillStyles[i])
			}
			// MorphLineStyleArray
			var lineStyleCount:number =  ((this._morphLineStyles.length) >>> 0);
			if (lineStyleCount > 0xfe) {
				startBytes.writeUI8(0xff);
				startBytes.writeUI16(lineStyleCount);
			} else {
				startBytes.writeUI8(lineStyleCount);
			}
			for (i = 0; i < lineStyleCount; i++) {
				startBytes.writeMORPHLINESTYLE2(strict(this._morphLineStyles[i], SWFMorphLineStyle2));
			}
			startBytes.writeSHAPE(this.startEdges);
			body.writeUI32(startBytes.length);
			body.writeBytes(startBytes);
			body.writeSHAPE(this.endEdges);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*override*/ public get type():number { return TagDefineMorphShape2.TYPE; }
		/*override*/ public get name():string { return "DefineMorphShape2"; }
		/*override*/ public get version():number { return 8; }
		/*override*/ public get level():number { return 2; }
		
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var i:number = 0;
			var len:number = 0;
			var indent2:string = StringUtils.repeat(indent + 2);
			var indent4:string = StringUtils.repeat(indent + 4);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) + "ID: " + this.characterId;
			str += "\n" + indent2 + "Bounds:";
			str += "\n" + indent4 + "StartBounds: " + this.startBounds.toString();
			str += "\n" + indent4 + "EndBounds: " + this.endBounds.toString();
			str += "\n" + indent4 + "StartEdgeBounds: " + this.startEdgeBounds.toString();
			str += "\n" + indent4 + "EndEdgeBounds: " + this.endEdgeBounds.toString();
			if ((len=((this._morphFillStyles.length) >>> 0)) > 0) {
				str += "\n" + indent2 + "FillStyles:";
				for (i = 0; i < len; i++) {
					str += "\n" + indent4 + "[" + (i + 1) + "] " + this._morphFillStyles[i].toString();
				}
			}
			if ((len=((this._morphLineStyles.length) >>> 0)) > 0) {
				str += "\n" + indent2 + "LineStyles:";
				for (i = 0; i < len; i++) {
					str += "\n" + indent4 + "[" + (i + 1) + "] " + this._morphLineStyles[i].toString();
				}
			}
			str += this.startEdges.toString(indent + 2);
			str += this.endEdges.toString(indent + 2);
			return str;
		}
	}

}