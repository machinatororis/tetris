/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  interface ITag
	{
		type:number;
		name:string;
		version:number;
		level:number;
		
		parse(data:SWFData, length:number, version:number, async:boolean):void;
		publish(data:SWFData, version:number):void;
		toString(indent:number, flags:number):string;
	}

}