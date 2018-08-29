/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFShapeRecord
	{
		public static TYPE_UNKNOWN : number = 0;
		public static TYPE_END : number = 1;
		public static TYPE_STYLECHANGE : number = 2;
		public static TYPE_STRAIGHTEDGE : number = 3;
		public static TYPE_CURVEDEDGE : number = 4;
		
		/*[internal]*/ constructor (data : SWFData, level : number = 1)
		{
			// data = strict(data, SWFData); level = ((level) >>> 0);
			if (data != null) {
				
				this.parse(data, level);
				
			}
		}
		
		public get type():number { return SWFShapeRecord.TYPE_UNKNOWN; }
		
		public get isEdgeRecord():boolean {
			return (this.type == SWFShapeRecord.TYPE_STRAIGHTEDGE || this.type == SWFShapeRecord.TYPE_CURVEDEDGE);
		}
		
		/*[internal]*/ public parse (data : SWFData, level : number = 1):void
		{
			// data = strict(data, SWFData); level = ((level) >>> 0);
			// need to override
		}

		public publish(data:SWFData = null, level:number = 1):void {/**/ data = strict(data, SWFData); level = ((level) >>> 0);}
		
		public clone():SWFShapeRecord { return null; }
		
		public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[SWFShapeRecord]";
		}
	}

}