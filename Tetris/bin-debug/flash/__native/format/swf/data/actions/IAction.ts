/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.actions
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  interface IAction
	{
		code:number;
		length:number;
		lengthWithHeader:number;
		pos:number;

		lbl:string;
		/*function set lbl(value:String):void;*/

		parse(data:SWFData):void;
		publish(data:SWFData):void;
		clone():IAction;
		toString(indent:number):string;
		toBytecode(indent:number, context:ActionExecutionContext):string;
	}

}