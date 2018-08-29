/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/SWFSoundInfo.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFSoundInfo = flash.__native.format.swf.data.SWFSoundInfo;
	
	
	export  class TagDefineButtonSound implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 17;
		
		public buttonSoundChar0:number = 0;
		public buttonSoundChar1:number = 0;
		public buttonSoundChar2:number = 0;
		public buttonSoundChar3:number = 0;
		public buttonSoundInfo0:SWFSoundInfo = null;
		public buttonSoundInfo1:SWFSoundInfo = null;
		public buttonSoundInfo2:SWFSoundInfo = null;
		public buttonSoundInfo3:SWFSoundInfo = null;

		protected _characterId:number = 0;
		
		constructor() {}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }

		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.buttonSoundChar0 = data.readUI16();
			if (this.buttonSoundChar0 != 0) {
				this.buttonSoundInfo0 = data.readSOUNDINFO();
			}
			this.buttonSoundChar1 = data.readUI16();
			if (this.buttonSoundChar1 != 0) {
				this.buttonSoundInfo1 = data.readSOUNDINFO();
			}
			this.buttonSoundChar2 = data.readUI16();
			if (this.buttonSoundChar2 != 0) {
				this.buttonSoundInfo2 = data.readSOUNDINFO();
			}
			this.buttonSoundChar3 = data.readUI16();
			if (this.buttonSoundChar3 != 0) {
				this.buttonSoundInfo3 = data.readSOUNDINFO();
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeUI16(this.buttonSoundChar0);
			if (this.buttonSoundChar0 != 0) {
				body.writeSOUNDINFO(this.buttonSoundInfo0);
			}
			body.writeUI16(this.buttonSoundChar1);
			if (this.buttonSoundChar1 != 0) {
				body.writeSOUNDINFO(this.buttonSoundInfo1);
			}
			body.writeUI16(this.buttonSoundChar2);
			if (this.buttonSoundChar2 != 0) {
				body.writeSOUNDINFO(this.buttonSoundInfo2);
			}
			body.writeUI16(this.buttonSoundChar3);
			if (this.buttonSoundChar3 != 0) {
				body.writeSOUNDINFO(this.buttonSoundInfo3);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineButtonSound = new TagDefineButtonSound();
			tag.characterId = this.characterId;
			tag.buttonSoundChar0 = this.buttonSoundChar0;
			tag.buttonSoundChar1 = this.buttonSoundChar1;
			tag.buttonSoundChar2 = this.buttonSoundChar2;
			tag.buttonSoundChar3 = this.buttonSoundChar3;
			tag.buttonSoundInfo0 = this.buttonSoundInfo0.clone();
			tag.buttonSoundInfo1 = this.buttonSoundInfo1.clone();
			tag.buttonSoundInfo2 = this.buttonSoundInfo2.clone();
			tag.buttonSoundInfo3 = this.buttonSoundInfo3.clone();
			return tag;
		}
		
		public get type():number { return TagDefineButtonSound.TYPE; }
		public get name():string { return "DefineButtonSound"; }
		public get version():number { return 2; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"ButtonID: " + this.characterId + ", " +
				"ButtonSoundChars: " + this.buttonSoundChar0 + "," + this.buttonSoundChar1 + "," + this.buttonSoundChar2 + "," + this.buttonSoundChar3;;
			return str;
		}
	}

}