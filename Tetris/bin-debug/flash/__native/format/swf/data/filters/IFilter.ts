/// <reference path="../../../../../filters/BitmapFilter.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BitmapFilter = flash.filters.BitmapFilter;
	
	
	export  interface IFilter
	{
		id:number;
		filter:BitmapFilter;
		
		parse(data:SWFData):void;
		publish(data:SWFData):void;
		clone():IFilter;
		toString(indent:number):string;
	}

}