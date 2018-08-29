/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagVideoFrame implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 61;

		public streamId:number = 0;
		public frameNum:number = 0;
		
		protected _videoData:ByteArray = null;
		
		constructor() {
			this._videoData = new ByteArray();
		}
		
		public get videoData():ByteArray { return this._videoData; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.streamId = data.readUI16();
			this.frameNum = data.readUI16();
			data.readBytes(this._videoData, 0, length - 4);
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, this._videoData.length + 4);
			data.writeUI16(this.streamId);
			data.writeUI16(this.frameNum);
			if (this._videoData.length > 0) {
				data.writeBytes(this._videoData);
			}
		}
		
		public get type():number { return TagVideoFrame.TYPE; }
		public get name():string { return "VideoFrame"; }
		public get version():number { return 6; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"StreamID: " + this.streamId + ", " +
				"Frame: " + this.frameNum;
		}
	}

}