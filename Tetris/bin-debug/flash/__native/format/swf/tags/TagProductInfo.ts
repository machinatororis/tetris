/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagProductInfo implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 41;
		
		private static UINT_MAX_CARRY:number = asc.sti(TagProductInfo,()=>{ TagProductInfo.UINT_MAX_CARRY = uint.MAX_VALUE + 1; });

		public productId:number = 0;
		public edition:number = 0;
		public majorVersion:number = 0;
		public minorVersion:number = 0;
		public build:number = NaN;
		public compileDate:Date = null;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.productId = data.readUI32();
			this.edition = data.readUI32();
			this.majorVersion = data.readUI8();
			this.minorVersion = data.readUI8();

			this.build = data.readUI32()
					+ data.readUI32() * TagProductInfo.UINT_MAX_CARRY;

			var sec:number = data.readUI32()
					+ data.readUI32() * TagProductInfo.UINT_MAX_CARRY;

			this.compileDate = new Date(sec);
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI32(this.productId);
			body.writeUI32(this.edition);
			body.writeUI8(this.majorVersion);
			body.writeUI8(this.minorVersion);
			body.writeUI32(this.build);
			body.writeUI32(this.build / TagProductInfo.UINT_MAX_CARRY);
			body.writeUI32(this.compileDate.time);
			body.writeUI32(this.compileDate.time / TagProductInfo.UINT_MAX_CARRY);
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagProductInfo.TYPE; }
		public get name():string { return "ProductInfo"; }
		public get version():number { return 3; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			return Tag.toStringCommon(this.type, this.name, indent) +
				"ProductID: " + this.productId + ", " +
				"Edition: " + this.edition + ", " +
				"Version: " + this.majorVersion + "." + this.minorVersion + " r" + this.build + ", " +
				"CompileDate: " + this.compileDate.toString();
		}
	}

}