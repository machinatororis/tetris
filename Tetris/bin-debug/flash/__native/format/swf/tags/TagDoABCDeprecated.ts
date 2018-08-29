/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../SWFData.ts" />

namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDoABCDeprecated implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE : number = 72;

		protected _bytes : ByteArray = null;

		constructor()
		{
			this._bytes = new ByteArray;
		}

		public static create (abcData : ByteArray = null) : TagDoABCDeprecated
		{
			/**/ abcData = strict(abcData, ByteArray);
			var doABC:TagDoABCDeprecated = new TagDoABCDeprecated();
			if (abcData != null && abcData.length > 0) {
				doABC.bytes.writeBytes(abcData);
			}
			return doABC;
		}

		public get bytes () : ByteArray { return this._bytes; }

		public parse (data : SWFData, length : number, version : number, async : boolean = false) : void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var pos:number = data.position;
			data.readBytes(this.bytes, 0, length - (data.position - pos));
		}

		public publish (data : SWFData, version : number) : void
		{
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			
			if (this._bytes.length > 0) {
				
				body.writeBytes(this._bytes);
				
			}
			
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}

		public get type():number { return TagDoABCDeprecated.TYPE; }
		public get name():string { return "DoABCDeprecated"; }
		public get version():number { return 9; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"Length: " + this._bytes.length;
		}
	}

}