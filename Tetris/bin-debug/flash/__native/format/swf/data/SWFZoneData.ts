/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFZoneData
	{
		public alignmentCoordinate:number = NaN;
		public range:number = NaN;
		
		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			if (data != null) {
				this.parse(data);
			}
		}
		
		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.alignmentCoordinate = data.readFLOAT16();
			this.range = data.readFLOAT16();
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.writeFLOAT16(this.alignmentCoordinate);
			data.writeFLOAT16(this.range);
		}
		
		public toString():string {
			return "(" + this.alignmentCoordinate + "," + this.range + ")";
		}
	}

}