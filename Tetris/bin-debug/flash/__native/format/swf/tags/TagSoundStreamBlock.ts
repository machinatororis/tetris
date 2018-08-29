/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagSoundStreamBlock implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 19;
		
		protected _soundData:ByteArray = null;
		
		constructor() {
			this._soundData = new ByteArray();
		}
		
		public get soundData():ByteArray { return this._soundData; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			data.readBytes(this._soundData, 0, length);
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, this._soundData.length, true);
			if (this._soundData.length > 0) {
				data.writeBytes(this._soundData);
			}
		}
		
		public get type():number { return TagSoundStreamBlock.TYPE; }
		public get name():string { return "SoundStreamBlock"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) + "Length: " + this._soundData.length;
		}
	}

}