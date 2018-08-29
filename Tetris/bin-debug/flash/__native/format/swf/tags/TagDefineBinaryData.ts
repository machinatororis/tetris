/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDefineBinaryData implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 87;
		
		protected _characterId:number = 0;

		protected _binaryData:ByteArray = null;
		
		constructor() {
			this._binaryData = new ByteArray();
		}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public get binaryData():ByteArray { return this._binaryData; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			data.readUI32(); // reserved, always 0
			if (length > 6) {
				data.readBytes(this._binaryData, 0, length - 6);
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this._characterId);
			body.writeUI32(0); // reserved, always 0
			if (this._binaryData.length > 0) {
				body.writeBytes(this._binaryData);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineBinaryData = new TagDefineBinaryData();
			tag.characterId = this.characterId;
			if (this._binaryData.length > 0) {
				tag.binaryData.writeBytes(this._binaryData);
			}
			return tag;
		}
		
		public get type():number { return TagDefineBinaryData.TYPE; }
		public get name():string { return "DefineBinaryData"; }
		public get version():number { return 9; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Length: " + this._binaryData.length;
		}
	}

}