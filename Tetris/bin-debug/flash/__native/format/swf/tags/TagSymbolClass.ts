/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/SWFSymbol.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFSymbol = flash.__native.format.swf.data.SWFSymbol;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagSymbolClass implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 76;
		
		protected _symbols:SWFSymbol[] = undefined;
		
		constructor() {
			this._symbols = new Array<SWFSymbol>();
		}
		
		public get symbols():SWFSymbol[] { return this._symbols; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var numSymbols:number = data.readUI16();
			for (var i:number = 0; i < numSymbols; i++) {
				this._symbols.push(data.readSYMBOL());
			}
		}

		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			var numSymbols:number =  ((this._symbols.length) >>> 0);
			body.writeUI16(numSymbols);
			for (var i:number = 0; i < numSymbols; i++) {
				body.writeSYMBOL(this._symbols[i]);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagSymbolClass.TYPE; }
		public get name():string { return "SymbolClass"; }
		public get version():number { return 9; } // educated guess (not specified in SWF10 spec)
		public get level():number { return 1; }
	
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent);
			if (this._symbols.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Symbols:";
				for (var i:number = 0, len:number =  ((this._symbols.length) >>> 0); i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._symbols[i].toString();
				}
			}
			return str;
		}
	}

}