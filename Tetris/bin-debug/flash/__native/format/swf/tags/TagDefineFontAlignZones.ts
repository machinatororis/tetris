/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../data/consts/CSMTableHint.ts" />
/// <reference path="../data/SWFZoneRecord.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SWFZoneRecord = flash.__native.format.swf.data.SWFZoneRecord;
	export import CSMTableHint = flash.__native.format.swf.data.consts.CSMTableHint;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class TagDefineFontAlignZones implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 73;
		
		public fontId:number = 0;
		public csmTableHint:number = 0;
		
		protected _zoneTable:SWFZoneRecord[] = undefined;
		
		constructor() {
			this._zoneTable = new Array<SWFZoneRecord>();
		}
		
		public get zoneTable():SWFZoneRecord[] { return this._zoneTable; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this.fontId = data.readUI16();
			this.csmTableHint =(( (data.readUI8() >> 6)) >>> 0);
			var recordsEndPos:number =  ((data.position + length - 3) >>> 0);
			while (data.position < recordsEndPos) {
				this._zoneTable.push(data.readZONERECORD());
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.fontId);
			body.writeUI8(this.csmTableHint << 6);
			for (var i:number = 0, len:number =  ((this._zoneTable.length) >>> 0); i < len; i++) {
				body.writeZONERECORD(this._zoneTable[i]);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagDefineFontAlignZones.TYPE; }
		public get name():string { return "DefineFontAlignZones"; }
		public get version():number { return 8; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"FontID: " + this.fontId + ", " +
				"CSMTableHint: " + CSMTableHint.toString(this.csmTableHint) + ", " +
				"Records: " + this._zoneTable.length;
			for (var i:number = 0, len:number =  ((this._zoneTable.length) >>> 0); i < len; i++) {
				str += "\n" + StringUtils.repeat(indent + 2) + "[" + i + "] " + this._zoneTable[i].toString(indent + 2);
			}
			return str;
		}
	}

}