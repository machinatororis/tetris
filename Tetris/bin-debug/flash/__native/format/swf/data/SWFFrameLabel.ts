/// <reference path="../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export  class SWFFrameLabel
	{
		public frameNumber:number = 0;
		public name:string = null;
		
		// TODO: parse() method?
		constructor(frameNumber:number, name:string)
		{
			/**/ frameNumber = ((frameNumber) >>> 0); name = as(name, 'String');
			this.frameNumber = frameNumber;
			this.name = name;
		}
		
		public toString():string {
			return "Frame: " + this.frameNumber + ", Name: " + this.name;
		}
	}

}