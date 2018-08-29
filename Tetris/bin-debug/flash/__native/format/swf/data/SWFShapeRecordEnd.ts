/// <reference path="../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export  class SWFShapeRecordEnd extends SWFShapeRecord
	{
		constructor() {
			super(); }
		
		/*override*/ public clone():SWFShapeRecord { return new SWFShapeRecordEnd(); }
		
		/*override*/ public get type():number { return SWFShapeRecord.TYPE_END; }

		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[SWFShapeRecordEnd]";
		}
	}

}