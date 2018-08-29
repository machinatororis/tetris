/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/SWFSoundInfo.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFSoundInfo = flash.__native.format.swf.data.SWFSoundInfo;
	
	
	export  class TagStartSound implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 15;
		
		public soundId:number = 0;
		public soundInfo:SWFSoundInfo = null;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.soundId = data.readUI16();
			this.soundInfo = data.readSOUNDINFO();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.soundId);
			body.writeSOUNDINFO(this.soundInfo);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagStartSound.TYPE; }
		public get name():string { return "StartSound"; }
		public get version():number { return 1; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"SoundID: " + this.soundId + ", " +
				"SoundInfo: " + this.soundInfo;
			return str;
		}
	}

}