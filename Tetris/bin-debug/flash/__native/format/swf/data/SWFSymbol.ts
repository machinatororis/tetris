/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFSymbol
	{
		public tagId:number = 0;
		public name:string = null;
		
		constructor(data:SWFData = null)
		{
			/**/ data = strict(data, SWFData);
			if (data != null) {
				
				this.parse(data);
				
			}
		}

		public static create(tagId:number, name:string):SWFSymbol
		{
			/**/ tagId = ((tagId) >>> 0); name = as(name, 'String');
			var swfSymbol:SWFSymbol = new SWFSymbol;
			swfSymbol.tagId = tagId;
			swfSymbol.name = name;
			return swfSymbol;
		}
		
		public parse(data:SWFData):void
		{
			/**/ data = strict(data, SWFData);
			this.tagId = data.readUI16();
			this.name = data.readString();
		}
		
		public publish(data:SWFData):void
		{
			/**/ data = strict(data, SWFData);
			data.writeUI16(this.tagId);
			data.writeString(this.name);
		}
		
		public toString():string
		{
			return "TagID: " + this.tagId + ", Name: " + this.name;
		}
	}

}