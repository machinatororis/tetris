/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFKerningRecord
	{
		/*[internal]*/ public code1 : number;
		/*[internal]*/ public code2 : number;
		/*[internal]*/ public adjustment : number;

		/*[internal]*/ constructor (data : SWFData, wideCodes : boolean = false)
		{
			// data = strict(data, SWFData); wideCodes = Boolean(wideCodes);
			if (data != null) {
				
				this.parse (data, wideCodes);
				
			}
		}

		/*[internal]*/ public parse (data : SWFData, wideCodes : boolean) : void
		{
			// data = strict(data, SWFData); wideCodes = Boolean(wideCodes);
			this.code1 = wideCodes ? data.readUI16() : data.readUI8();
			this.code2 = wideCodes ? data.readUI16() : data.readUI8();
			this.adjustment = data.readSI16();
		}
		
		public publish(data:SWFData, wideCodes:boolean):void {
			/**/ data = strict(data, SWFData); wideCodes = Boolean(wideCodes);
			if(wideCodes) { data.writeUI16(this.code1); } else { data.writeUI8(this.code1); }
			if(wideCodes) { data.writeUI16(this.code2); } else { data.writeUI8(this.code2); }
			data.writeSI16(this.adjustment);
		}
		
		public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "Code1: " + this.code1 + ", " + "Code2: " + this.code2 + ", " + "Adjustment: " + this.adjustment;
		}
	}

}