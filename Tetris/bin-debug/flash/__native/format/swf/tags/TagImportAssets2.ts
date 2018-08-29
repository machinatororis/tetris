/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class TagImportAssets2 extends TagImportAssets implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 71;

		constructor() {
			super(); }
		
		/*override*/ public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.url = data.readString();
			data.readUI8(); // reserved, always 1
			data.readUI8(); // reserved, always 0
			var numSymbols:number = data.readUI16();
			for (var i:number = 0; i < numSymbols; i++) {
				this._symbols.push(data.readSYMBOL());
			}
		}

		/*override*/ public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeString(this.url);
			body.writeUI8(1);
			body.writeUI8(0);
			var numSymbols:number =  ((this._symbols.length) >>> 0);
			body.writeUI16(numSymbols);
			for (var i:number = 0; i < numSymbols; i++) {
				body.writeSYMBOL(this._symbols[i]);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		/*override*/ public get type():number { return TagImportAssets2.TYPE; }
		/*override*/ public get name():string { return "ImportAssets2"; }
		/*override*/ public get version():number { return 8; }
		/*override*/ public get level():number { return 2; }
	}

}