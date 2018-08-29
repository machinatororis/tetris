/// <reference path="../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export  class SWFScene
	{
		public offset:number = 0;
		public name:string = null;
		
		// TODO: parse() method?
		constructor(offset:number, name:string)
		{
			/**/ offset = ((offset) >>> 0); name = as(name, 'String');
			this.offset = offset;
			this.name = name;
		}
		
		public toString():string {
			return "Frame: " + this.offset + ", Name: " + this.name;
		}
	}

}