/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/SWFAsset.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFAsset = flash.__native.format.swf.data.SWFAsset;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagExportAssets implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 56;
		
		protected _assets:SWFAsset[] = undefined;
		
		constructor() {
			this._assets = new Array<SWFAsset>();
		}
		
		public get assets():SWFAsset[] { return this._assets; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			var numAssets:number = data.readUI16();
			for (var i:number = 0; i < numAssets; i++) {
				this._assets.push(data.readASSET());
			}
		}

		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			var numAssets:number =  ((this._assets.length) >>> 0);
			body.writeUI16(numAssets);
			for (var i:number = 0; i < numAssets; i++) {
				body.writeASSET(this._assets[i]);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagExportAssets.TYPE; }
		public get name():string { return "ExportAssets"; }
		public get version():number { return 5; }
		public get level():number { return 1; }
	
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent);
			if (this._assets.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Assets:";
				for (var i:number = 0, len:number =  ((this._assets.length) >>> 0); i < len; i++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + i + "] " + this._assets[i].toString();
				}
			}
			return str;
		}
	}

}