/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/SWFColorTransform.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFColorTransform = flash.__native.format.swf.data.SWFColorTransform;
	
	
	export  class TagDefineButtonCxform implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 23;
		
		public buttonColorTransform:SWFColorTransform = null;

		protected _characterId:number = 0;

		constructor() {}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.buttonColorTransform = data.readCXFORM();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeCXFORM(this.buttonColorTransform);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineButtonCxform = new TagDefineButtonCxform();
			tag.characterId = this.characterId;
			tag.buttonColorTransform = this.buttonColorTransform.clone();
			return tag;
		}
		
		public get type():number { return TagDefineButtonCxform.TYPE; }
		public get name():string { return "DefineButtonCxform"; }
		public get version():number { return 2; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"ColorTransform: " + this.buttonColorTransform;
			return str;
		}
	}

}