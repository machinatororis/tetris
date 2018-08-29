/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDebugID implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 63;
		
		protected _uuid:ByteArray = null;
		
		constructor() {
			this._uuid = new ByteArray();
		}
		
		public get uuid():ByteArray { return this._uuid; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			if(length > 0) {
				data.readBytes(this._uuid, 0, length);
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, this._uuid.length);
			if(this._uuid.length > 0) {
				data.writeBytes(this._uuid);
			}
		}
		
		public get type():number { return TagDebugID.TYPE; }
		public get name():string { return "DebugID"; }
		public get version():number { return 6; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) + "UUID: ";
			if (this._uuid.length == 16) {
				str += StringUtils.printf("%02x%02x%02x%02x-", this._uuid.get(0), this._uuid.get(1), this._uuid.get(2), this._uuid.get(3));
				str += StringUtils.printf("%02x%02x-", this._uuid.get(4), this._uuid.get(5));
				str += StringUtils.printf("%02x%02x-", this._uuid.get(6), this._uuid.get(7));
				str += StringUtils.printf("%02x%02x-", this._uuid.get(8), this._uuid.get(9));
				str += StringUtils.printf("%02x%02x%02x%02x%02x%02x", this._uuid.get(10), this._uuid.get(11), this._uuid.get(12), this._uuid.get(13), this._uuid.get(14), this._uuid.get(15));
			} else {
				str += "(invalid length: " + this._uuid.length + ")";
			}
			return str;
		}
	}

}