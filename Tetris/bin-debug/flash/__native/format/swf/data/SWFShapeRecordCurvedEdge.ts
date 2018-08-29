/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFShapeRecordCurvedEdge extends SWFShapeRecord
	{
		/*[internal]*/ public controlDeltaX : number;
		/*[internal]*/ public controlDeltaY : number;
		/*[internal]*/ public anchorDeltaX : number;
		/*[internal]*/ public anchorDeltaY : number;
		
		/*[internal]*/ protected numBits : number;

		/*[internal]*/ constructor (data : SWFData, numBits : number = 0, level : number = 1)
		{
			// data = strict(data, SWFData); numBits = ((numBits) >>> 0); level = ((level) >>> 0);
			this.numBits = numBits;
			super (data, level);
		}
		
		/*[internal]*/ /*override*/ public parse (data : SWFData, level : number = 1) : void
		{
			// data = strict(data, SWFData); level = ((level) >>> 0);
			this.controlDeltaX = data.readSB(this.numBits);
			this.controlDeltaY = data.readSB(this.numBits);
			this.anchorDeltaX = data.readSB(this.numBits);
			this.anchorDeltaY = data.readSB(this.numBits);
		}
		
		/*override*/ public publish(data:SWFData = null, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this.numBits = data.calculateMaxBits(true, [this.controlDeltaX, this.controlDeltaY, this.anchorDeltaX, this.anchorDeltaY]);
			if(this.numBits < 2) { this.numBits = 2; }
			data.writeUB(4, this.numBits - 2);
			data.writeSB(this.numBits, this.controlDeltaX);
			data.writeSB(this.numBits, this.controlDeltaY);
			data.writeSB(this.numBits, this.anchorDeltaX);
			data.writeSB(this.numBits, this.anchorDeltaY);
		}
		
		/*override*/ public clone():SWFShapeRecord {
			var record:SWFShapeRecordCurvedEdge = new SWFShapeRecordCurvedEdge();
			record.anchorDeltaX = this.anchorDeltaX;
			record.anchorDeltaY = this.anchorDeltaY;
			record.controlDeltaX = this.controlDeltaX;
			record.controlDeltaY = this.controlDeltaY;
			record.numBits = this.numBits;
			return record;
		}
		
		/*override*/ public get type():number { return SWFShapeRecord.TYPE_CURVEDEDGE; }
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			return "[SWFShapeRecordCurvedEdge] " +
				"ControlDelta: " + this.controlDeltaX + "," + this.controlDeltaY + ", " +
				"AnchorDelta: " + this.anchorDeltaX + "," + this.anchorDeltaY;
		}
	}

}