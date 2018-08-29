/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagEnableDebugger2 extends TagEnableDebugger implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 64;
		
		// Reserved, SWF File Format v10 says this is always zero.
		// Observed other values from generated SWFs, e.g. 0x1975.
		protected _reserved:number;
		
		constructor() {
			/**/ this._reserved === void 0 && (this._reserved = 0);
			super();
		}
		
		public get reserved():number { return this._reserved; }
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._reserved = data.readUI16(); 
			if (length > 2) {
				data.readBytes(this._password, 0, length - 2);
			}
		}
		
		/*override*/ public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, this._password.length + 2);
			data.writeUI16(this._reserved);
			if (this._password.length > 0) {
				data.writeBytes(this._password);
			}
		}
		
		/*override*/ public get type():number { return TagEnableDebugger2.TYPE; }
		/*override*/ public get name():string { return "EnableDebugger2"; }
		/*override*/ public get version():number { return 6; }
		/*override*/ public get level():number { return 2; }
	
		/*override*/ public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"Password: " + (this._password.length ? 'null' : this._password.readUTF()) + ", " +
				"Reserved: 0x" + this._reserved.toString(16);
		}
	}

}