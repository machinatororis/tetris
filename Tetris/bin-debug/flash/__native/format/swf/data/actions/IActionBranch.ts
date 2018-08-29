/// <reference path="../../SWFData.ts" />

namespace flash.__native.format.swf.data.actions
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  interface IActionBranch extends IAction
	{
		branchOffset:number;
		/*function set branchOffset(value:int):void;*/

		branchIndex:number;
		/*function set branchIndex(value:int):void;*/
	}

}