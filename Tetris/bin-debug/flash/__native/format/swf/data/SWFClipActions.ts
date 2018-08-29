/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class SWFClipActions
	{
		public eventFlags:SWFClipEventFlags = null;
		
		protected _records:SWFClipActionRecord[] = undefined;
		
		constructor(data:SWFData = null, version:number = 0) {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			this._records = new Array<SWFClipActionRecord>();
			if (data != null) {
				this.parse(data, version);
			}
		}
		
		public get records():SWFClipActionRecord[] { return this._records; }
		
		public parse(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.readUI16(); // reserved, always 0
			this.eventFlags = data.readCLIPEVENTFLAGS(version);
			var record:SWFClipActionRecord;
			while ((record = data.readCLIPACTIONRECORD(version)) != null) {
				this._records.push(record);
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			data.writeUI16(0); // reserved, always 0
			data.writeCLIPEVENTFLAGS(this.eventFlags, version);
			for(var i:number = 0; i < this.records.length; i++) {
				data.writeCLIPACTIONRECORD(this.records[i], version);
			}
			if(version >= 6) {
				data.writeUI32(0);
			} else {
				data.writeUI16(0);
			}
		}
		
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = "ClipActions (" + this.eventFlags.toString() + "):";
			for (var i:number = 0; i < this._records.length; i++) {
				str += "\n" + StringUtils.repeat(indent + 2) + "[" + i + "] " + this._records[i].toString(indent + 2, flags);
			}
			return str;
		}
	}

}