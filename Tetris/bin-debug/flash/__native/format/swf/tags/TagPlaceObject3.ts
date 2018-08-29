/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="../data/consts/BlendMode.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BlendMode = flash.__native.format.swf.data.consts.BlendMode;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagPlaceObject3 extends TagPlaceObject2 implements IDisplayListTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDisplayListTag = null;
		public static TYPE : number = 70;
		
		/*[internal]*/ /*override*/ public parse (data : SWFData, length : number, version : number, async : boolean = false) : void
		{
			// data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var flags1 : number = data.readUI8();
			this.hasClipActions = (flags1 & 0x80) != 0;
			this.hasClipDepth = (flags1 & 0x40) != 0;
			this.hasName = (flags1 & 0x20) != 0;
			this.hasRatio = (flags1 & 0x10) != 0;
			this.hasColorTransform = (flags1 & 0x08) != 0;
			this.hasMatrix = (flags1 & 0x04) != 0;
			this.hasCharacter = (flags1 & 0x02) != 0;
			this.hasMove = (flags1 & 0x01) != 0;
			
			var flags2 : number = data.readUI8();
			this.hasOpaqueBackground = (flags2 & 0x40) != 0;
			this.hasVisible = (flags2 & 0x20) != 0;
			this.hasImage = (flags2 & 0x10) != 0;
			this.hasClassName = (flags2 & 0x08) != 0;
			this.hasCacheAsBitmap = (flags2 & 0x04) != 0;
			this.hasBlendMode = (flags2 & 0x02) != 0;
			this.hasFilterList = (flags2 & 0x01) != 0;
			this.depth = data.readUI16();
			
			if (this.hasClassName) {
				this.className = data.readString();
			}
			
			if (this.hasCharacter) {
				this.characterId = data.readUI16();
			}
			
			if (this.hasMatrix) {
				this.matrix = data.readMATRIX();
			}
			
			if (this.hasColorTransform) {
				this.colorTransform = data.readCXFORMWITHALPHA();
			}
			
			if (this.hasRatio) {
				this.ratio = data.readUI16();
			}
			
			if (this.hasName) {
				this.instanceName = data.readString();
			}
			
			if (this.hasClipDepth) {
				this.clipDepth = data.readUI16();
			}
			
			if (this.hasFilterList) {
				var numberOfFilters : number = data.readUI8();
				for (var i = 0; i < numberOfFilters; i++) {
					this.surfaceFilterList.push(data.readFILTER());
				}
			}
			
			if (this.hasBlendMode) {
				this.blendMode = data.readUI8();
			}
			
			if (this.hasCacheAsBitmap) {
				this.bitmapCache = data.readUI8();
			}
			
			if (this.hasVisible) {
				this.visible = data.readUI8();
			}
			
			if (this.hasOpaqueBackground) {
				this.bitmapBackgroundColor = data.readRGBA();
			}
			
			if (this.hasClipActions) {
				this.clipActions = data.readCLIPACTIONS(version);
			}
		}
		
		protected prepareBody():SWFData {
			var body:SWFData = new SWFData();
			var flags1:number = 0;
			if (this.hasClipActions) { flags1 |= 0x80; }
			if (this.hasClipDepth) { flags1 |= 0x40; }
			if (this.hasName) { flags1 |= 0x20; }
			if (this.hasRatio) { flags1 |= 0x10; }
			if (this.hasColorTransform) { flags1 |= 0x08; }
			if (this.hasMatrix) { flags1 |= 0x04; }
			if (this.hasCharacter) { flags1 |= 0x02; }
			if (this.hasMove) { flags1 |= 0x01; }
			body.writeUI8(flags1);
			var flags2:number = 0;
			if (this.hasOpaqueBackground) { flags2 |= 0x40; }
			if (this.hasVisible) { flags2 |= 0x20; }
			if (this.hasImage) { flags2 |= 0x10; }
			if (this.hasClassName) { flags2 |= 0x08; }
			if (this.hasCacheAsBitmap) { flags2 |= 0x04; }
			if (this.hasBlendMode) { flags2 |= 0x02; }
			if (this.hasFilterList) { flags2 |= 0x01; }
			body.writeUI8(flags2);
			body.writeUI16(this.depth);
			if (this.hasClassName) {
				body.writeString(this.className);
			}
			if (this.hasCharacter) {
				body.writeUI16(this.characterId);
			}
			if (this.hasMatrix) {
				body.writeMATRIX(this.matrix);
			}
			if (this.hasColorTransform) {
				body.writeCXFORM(this.colorTransform);
			}
			if (this.hasRatio) {
				body.writeUI16(this.ratio);
			}
			if (this.hasName) {
				body.writeString(this.instanceName);
			}
			if (this.hasClipDepth) {
				body.writeUI16(this.clipDepth);
			}
			if (this.hasFilterList) {
				var numberOfFilters:number =  ((this.surfaceFilterList.length) >>> 0);
				body.writeUI8(numberOfFilters);
				for (var i:number = 0; i < numberOfFilters; i++) {
					body.writeFILTER(this.surfaceFilterList[i]);
				}
			}
			if (this.hasBlendMode) {
				body.writeUI8(this.blendMode);
			}
			if (this.hasCacheAsBitmap) {
				body.writeUI8(this.bitmapCache);
			}
			if (this.hasVisible) {
				body.writeUI8(this.visible);
			}
			if (this.hasOpaqueBackground) {
				body.writeRGBA(this.bitmapBackgroundColor);
			}
			if (this.hasClipActions) {
				body.writeCLIPACTIONS(this.clipActions, this.version);
			}
			
			return body;
		}
		
		/*override*/ public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = this.prepareBody();
			
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*override*/ public get type():number { return TagPlaceObject3.TYPE; }
		/*override*/ public get name():string { return "PlaceObject3"; }
		/*override*/ public get version():number { return 8; }
		/*override*/ public get level():number { return 3; }

		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"Depth: " + this.depth;
			if (this.hasClassName /*|| (hasImage && hasCharacter)*/) { str += ", ClassName: " + this.className; }
			if (this.hasCharacter) { str += ", CharacterID: " + this.characterId; }
			if (this.hasMatrix) { str += ", Matrix: " + this.matrix.toString(); }
			if (this.hasColorTransform) { str += ", ColorTransform: " + this.colorTransform; }
			if (this.hasRatio) { str += ", Ratio: " + this.ratio; }
			if (this.hasName) { str += ", Name: " + this.instanceName; }
			if (this.hasClipDepth) { str += ", ClipDepth: " + this.clipDepth; }
			if (this.hasBlendMode) { str += ", BlendMode: " + BlendMode.toString(this.blendMode); }
			if (this.hasCacheAsBitmap) { str += ", CacheAsBitmap: " + this.bitmapCache; }
			if (this.hasVisible) { str += ", Visible: " + this.visible; }
			if (this.hasOpaqueBackground) { str += ", BackgroundColor: " + ColorUtils.rgbaToString(this.bitmapBackgroundColor); }
			if (this.hasFilterList) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Filters:"
				for (var i:number = 0, len:number =  ((this.surfaceFilterList.length) >>> 0); i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this.surfaceFilterList[i].toString(indent + 4);
				}
			}
			if (this.hasClipActions) {
				str += "\n" + StringUtils.repeat(indent + 2) + this.clipActions.toString(indent + 2);
			}
			return str;
		}
	}

}