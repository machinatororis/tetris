/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/SWFSoundInfo.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFSoundInfo = flash.__native.format.swf.data.SWFSoundInfo;
	
	
	export  class TagStartSound2 implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 89;
		
		public soundClassName:string = null;
		public soundInfo:SWFSoundInfo = null;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.soundClassName = data.readString();
			this.soundInfo = data.readSOUNDINFO();
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeString(this.soundClassName);
			body.writeSOUNDINFO(this.soundInfo);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagStartSound2.TYPE; }
		public get name():string { return "StartSound2"; }
		public get version():number { return 9; }
		public get level():number { return 2; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"SoundClassName: " + this.soundClassName + ", " +
				"SoundInfo: " + this.soundInfo;
			return str;
		}
	}

}