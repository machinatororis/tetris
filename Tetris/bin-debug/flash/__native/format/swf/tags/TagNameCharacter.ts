/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />

namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagNameCharacter implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 40;
		
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
			if (length > 2) {
				data.readBytes(this._binaryData, 0, length - 2);
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this._characterId);
			if (this._binaryData.length > 0) {
				body.writeBytes(this._binaryData);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():ITag {
			var tag:TagNameCharacter = new TagNameCharacter();
			tag.characterId = this.characterId;
			if (this._binaryData.length > 0) {
				tag.binaryData.writeBytes(this._binaryData);
			}
			return tag;
		}
		
		public get type():number { return TagNameCharacter.TYPE; }
		public get name():string { return "NameCharacter"; }
		public get version():number { return 3; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId;
			if (this.binaryData.length > 0) {
				this.binaryData.position = 0;
				str += ", Name: " + this.binaryData.readUTFBytes(this.binaryData.length - 1);
				this.binaryData.position = 0;
			}
			return str;
		}
	}

}