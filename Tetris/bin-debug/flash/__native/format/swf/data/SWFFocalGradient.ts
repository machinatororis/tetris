/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFFocalGradient extends SWFGradient
	{
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			super(data, level);
		}
		
		/*override*/ public parse(data:SWFData, level:number):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			super.parse(data, level);
			this.focalPoint = data.readFIXED8();
		}
		
		/*override*/ public publish(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			super.publish(data, level);
			data.writeFIXED8(this.focalPoint);
		}
		
		/*override*/ public toString():string {
			return "(" + this._records.join(",") + ")";
		}
	}

}