/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/filters/IFilter.ts" />
/// <reference path="../data/SWFMatrix.ts" />
/// <reference path="../data/SWFColorTransform.ts" />
/// <reference path="../data/SWFClipActions.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFClipActions = flash.__native.format.swf.data.SWFClipActions;
	export import SWFColorTransform = flash.__native.format.swf.data.SWFColorTransform;
	export import SWFMatrix = flash.__native.format.swf.data.SWFMatrix;
	export import IFilter = flash.__native.format.swf.data.filters.IFilter;
	
	
	export  class TagPlaceObject implements IDisplayListTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDisplayListTag = null;
		public static TYPE:number = 4;
		
		public hasClipActions:boolean = false;
		public hasClipDepth:boolean = false;
		public hasName:boolean = false;
		public hasRatio:boolean = false;
		public hasColorTransform:boolean = false;
		public hasMatrix:boolean = false;
		public hasCharacter:boolean = false;
		public hasMove:boolean = false;
		public hasOpaqueBackground:boolean = false;
		public hasVisible:boolean = false;
		public hasImage:boolean = false;
		public hasClassName:boolean = false;
		public hasCacheAsBitmap:boolean = false;
		public hasBlendMode:boolean = false;
		public hasFilterList:boolean = false;
		
		public characterId:number = 0;
		public depth:number = 0;
		public matrix:SWFMatrix = null;
		public colorTransform:SWFColorTransform = null;
		
		// Forward declarations for TagPlaceObject2
		public ratio:number = 0;
		public instanceName:string = null;
		public clipDepth:number = 0;
		public clipActions:SWFClipActions = null;

		// Forward declarations for TagPlaceObject3
		public className:string = null;
		public blendMode:number = 0;
		public bitmapCache:number = 0;
		public bitmapBackgroundColor:number = 0;
		public visible:number = 0;

		// Forward declarations for TagPlaceObject4
		public metaData : any = null;
		public surfaceFilterList : IFilter[] = undefined;
		
		constructor() {
			this.surfaceFilterList = new Array<IFilter>();
		}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var pos:number = data.position;
			this.characterId = data.readUI16();
			this.depth = data.readUI16();
			this.matrix = data.readMATRIX();
			this.hasCharacter = true;
			this.hasMatrix = true;
			if (data.position - pos < length) {
				this.colorTransform = data.readCXFORM();
				this.hasColorTransform = true;
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeUI16(this.depth);
			body.writeMATRIX(this.matrix);
			if (this.hasColorTransform) {
				body.writeCXFORM(this.colorTransform);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagPlaceObject.TYPE; }
		public get name():string { return "PlaceObject"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"Depth: " + this.depth;
			if (this.hasCharacter) { str += ", CharacterID: " + this.characterId; }
			if (this.hasMatrix) { str += ", Matrix: " + this.matrix; }
			if (this.hasColorTransform) { str += ", ColorTransform: " + this.colorTransform; }
			return str;
		}
	}

}