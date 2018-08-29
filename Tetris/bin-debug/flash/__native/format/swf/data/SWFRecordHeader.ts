/// <reference path="../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export  class SWFRecordHeader
	{
		public type:number = 0;
		public contentLength:number = 0;
		public headerLength:number = 0;
		
		constructor(type:number, contentLength:number, headerLength:number)
		{
			/**/ type = ((type) >>> 0); contentLength = ((contentLength) >>> 0); headerLength = ((headerLength) >>> 0);
			this.type = type;
			this.contentLength = contentLength;
			this.headerLength = headerLength;
		}
		
		public get tagLength():number {
			return this.headerLength + this.contentLength;
		}
		
		public toString():string {
			return "[SWFRecordHeader] type: " + this.type + ", headerLength: " + this.headerLength + ", contentlength: " + this.contentLength;
		}
	}

}