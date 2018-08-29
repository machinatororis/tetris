/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFGradient
	{
		public spreadMode:number = 0;
		public interpolationMode:number = 0;

		// Forward declarations of properties in SWFFocalGradient
		public focalPoint:number = 0.0;
		
		protected _records:SWFGradientRecord[] = undefined;
		
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this._records = new Array<SWFGradientRecord>();
			if (data != null) {
				this.parse(data, level);
			}
		}
		
		public get records():SWFGradientRecord[] { return this._records; }
		
		public parse(data:SWFData, level:number):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			data.resetBitsPending();
			this.spreadMode = data.readUB(2);
			this.interpolationMode = data.readUB(2);
			var numGradients:number = data.readUB(4);
			for (var i:number = 0; i < numGradients; i++) {
				this._records.push(data.readGRADIENTRECORD(level));
			}
		}

		public publish(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			var numRecords:number =  ((this.records.length) >>> 0);
			data.resetBitsPending();
			data.writeUB(2, this.spreadMode);
			data.writeUB(2, this.interpolationMode);
			data.writeUB(4, numRecords);
			for(var i:number = 0; i < numRecords; i++) {
				data.writeGRADIENTRECORD(this.records[i], level);
			}
		}
		
		public clone():SWFGradient {
			var gradient:SWFGradient = new SWFGradient();
			gradient.spreadMode = this.spreadMode;
			gradient.interpolationMode = this.interpolationMode;
			gradient.focalPoint = this.focalPoint;
			for(var i:number = 0; i < this.records.length; i++) {
				gradient.records.push(this.records[i].clone());
			}
			return gradient;
		}

		public toString():string {
			return "(" + this._records.join(",") + "), SpreadMode: " + this.spreadMode + ", InterpolationMode: " + this.interpolationMode;
		}
	}

}