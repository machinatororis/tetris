/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFRegisterParam
	{
		public register:number = 0;
		public name:string = null;
		
		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			if (data != null) {
				this.parse(data);
			}
		}

		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.register = data.readUI8();
			this.name = data.readString();
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.writeUI8(this.register);
			data.writeString(this.name);
		}
		
		public toString():string {
			return "$" + this.register + ":" + this.name;
		}
	}

}