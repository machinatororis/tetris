/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFZoneRecord
	{
		public maskX:boolean = false;
		public maskY:boolean = false;

		protected _zoneData:SWFZoneData[] = undefined;
		
		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			this._zoneData = new Array<SWFZoneData>();
			if (data != null) {
				this.parse(data);
			}
		}
		
		public get zoneData():SWFZoneData[] { return this._zoneData; }
		
		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var numZoneData:number = data.readUI8();
			for (var i:number = 0; i < numZoneData; i++) {
				this._zoneData.push(data.readZONEDATA());
			}
			var mask:number = data.readUI8();
			this.maskX = ((mask & 0x01) != 0);
			this.maskY = ((mask & 0x02) != 0);
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var numZoneData:number =  ((this._zoneData.length) >>> 0);
			data.writeUI8(numZoneData);
			for (var i:number = 0; i < numZoneData; i++) {
				data.writeZONEDATA(this._zoneData[i]);
			}
			var mask:number = 0;
			if(this.maskX) { mask |= 0x01; }
			if(this.maskY) { mask |= 0x02; }
			data.writeUI8(mask);
		}
		
		public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "MaskY: " + this.maskY + ", MaskX: " + this.maskX;
			for (var i:number = 0; i < this._zoneData.length; i++) {
				str += ", " + i + ": " + this._zoneData[i].toString();
			}
			return str;
		}
	}

}