/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />

namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagEnableTelemetry implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 93;
		
		protected _password:ByteArray = null;
		
		constructor() {
			this._password = new ByteArray();
		}
		
		public get password():ByteArray { return this._password; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			if (length > 2) {
				data.readByte();
				data.readByte();
				data.readBytes(this._password, 0, length - 2);
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeTagHeader(this.type, this._password.length + 2);
			data.writeByte(0);
			data.writeByte(0);
			if (this._password.length > 0) {
				data.writeBytes(this._password);
			}
		}
		
		public get type():number { return TagEnableTelemetry.TYPE; }
		public get name():string { return "EnableTelemetry"; }
		public get version():number { return 19; }
		public get level():number { return 1; }
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent);
		}
		
	}

}