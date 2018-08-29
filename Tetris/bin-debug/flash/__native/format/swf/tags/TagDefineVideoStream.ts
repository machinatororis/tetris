/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/consts/VideoDeblockingType.ts" />
/// <reference path="../data/consts/VideoCodecID.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import VideoCodecID = flash.__native.format.swf.data.consts.VideoCodecID;
	export import VideoDeblockingType = flash.__native.format.swf.data.consts.VideoDeblockingType;
	
	
	export  class TagDefineVideoStream implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 60;

		public numFrames:number = 0;
		public width:number = 0;
		public height:number = 0;
		public deblocking:number = 0;
		public smoothing:boolean = false;
		public codecId:number = 0;
		
		protected _characterId:number = 0;
		
		constructor() {}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.numFrames = data.readUI16();
			this.width = data.readUI16();
			this.height = data.readUI16();
			data.readUB(4);
			this.deblocking = data.readUB(3);
			this.smoothing = (data.readUB(1) == 1);
			this.codecId = data.readUI8();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, 10);
			data.writeUI16(this.characterId);
			data.writeUI16(this.numFrames);
			data.writeUI16(this.width);
			data.writeUI16(this.height);
			data.writeUB(4, 0); // Reserved
			data.writeUB(3, this.deblocking);
			data.writeUB(1, this.smoothing ? 1 : 0);
			data.writeUI8(this.codecId);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineVideoStream = new TagDefineVideoStream();
			tag.characterId = this.characterId;
			tag.numFrames = this.numFrames;
			tag.width = this.width;
			tag.height = this.height;
			tag.deblocking = this.deblocking;
			tag.smoothing = this.smoothing;
			tag.codecId = this.codecId;
			return tag;
		}
		
		public get type():number { return TagDefineVideoStream.TYPE; }
		public get name():string { return "DefineVideoStream"; }
		public get version():number { return 6; }
		public get level():number { return 1; }
	
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"ID: " + this.characterId + ", " +
				"Frames: " + this.numFrames + ", " +
				"Width: " + this.width + ", " +
				"Height: " + this.height + ", " +
				"Deblocking: " + VideoDeblockingType.toString(this.deblocking) + ", " +
				"Smoothing: " + this.smoothing + ", " +
				"Codec: " + VideoCodecID.toString(this.codecId);
		}
	}

}