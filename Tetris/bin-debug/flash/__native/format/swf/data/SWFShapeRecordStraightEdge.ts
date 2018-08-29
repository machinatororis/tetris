/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFShapeRecordStraightEdge extends SWFShapeRecord
	{
		/*[internal]*/ public generalLineFlag : boolean;
		/*[internal]*/ public vertLineFlag : boolean;
		/*[internal]*/ public deltaY : number;
		/*[internal]*/ public deltaX : number;
		
		/*[internal]*/ protected numBits : number;

		/*[internal]*/ constructor (data : SWFData, numBits : number = 0, level : number = 1)
		{
			// data = strict(data, SWFData); numBits = ((numBits) >>> 0); level = ((level) >>> 0);
			this.numBits = numBits;
			super(data, level);
		}
		
		/*[internal]*/ /*override*/ public parse (data : SWFData, level : number = 1) : void
		{
			// data = strict(data, SWFData); level = ((level) >>> 0);
			this.generalLineFlag = (data.readUB(1) == 1);
			this.vertLineFlag = !this.generalLineFlag ? (data.readUB(1) == 1) : false;
			this.deltaX = (this.generalLineFlag || !this.vertLineFlag) ? data.readSB(this.numBits) : 0;
			this.deltaY = (this.generalLineFlag || this.vertLineFlag) ? data.readSB(this.numBits) : 0;
		}
		
		/*override*/ public publish(data:SWFData = null, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			var deltas:any[] = [];
			if(this.generalLineFlag || !this.vertLineFlag) { deltas.push(this.deltaX); }
			if(this.generalLineFlag || this.vertLineFlag) { deltas.push(this.deltaY); }
			this.numBits = data.calculateMaxBits(true, deltas);
			if(this.numBits < 2) { this.numBits = 2; }
			data.writeUB(4, this.numBits - 2);
			data.writeUB(1, this.generalLineFlag ? 1 : 0);
			if(!this.generalLineFlag) {
				data.writeUB(1, this.vertLineFlag ? 1 : 0);
			}
			for(var i:number = 0; i < deltas.length; i++) {
				data.writeSB(this.numBits, ((deltas[i]) >> 0));
			}
		}
		
		/*override*/ public clone():SWFShapeRecord {
			var record:SWFShapeRecordStraightEdge = new SWFShapeRecordStraightEdge();
			record.deltaX = this.deltaX;
			record.deltaY = this.deltaY;
			record.generalLineFlag = this.generalLineFlag;
			record.vertLineFlag = this.vertLineFlag;
			record.numBits = this.numBits;
			return record;
		}
		
		/*override*/ public get type():number { return SWFShapeRecord.TYPE_STRAIGHTEDGE; }
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "[SWFShapeRecordStraightEdge] ";
			if (this.generalLineFlag) {
				str += "General: " + this.deltaX + "," + this.deltaY;
			} else {
				if (this.vertLineFlag) {
					str += "Vertical: " + this.deltaY;
				} else {
					str += "Horizontal: " + this.deltaX;
				}
			}
			return str;
		}
	}

}