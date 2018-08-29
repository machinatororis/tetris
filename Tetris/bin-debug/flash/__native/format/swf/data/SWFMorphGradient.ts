/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFMorphGradient
	{
		public spreadMode:number = 0;
		public interpolationMode:number = 0;
		
		// Forward declarations of properties in SWFMorphFocalGradient
		public startFocalPoint:number = 0.0;
		public endFocalPoint:number = 0.0;

		protected _records:SWFMorphGradientRecord[] = undefined;
		
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this._records = new Array<SWFMorphGradientRecord>();
			if (data != null) {
				this.parse(data, level);
			}
		}
		
		public get records():SWFMorphGradientRecord[] { return this._records; }
		
		public parse(data:SWFData, level:number):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			data.resetBitsPending();
			this.spreadMode = data.readUB(2);
			this.interpolationMode = data.readUB(2);
			var numGradients:number = data.readUB(4);
			for (var i:number = 0; i < numGradients; i++) {
				this._records.push(data.readMORPHGRADIENTRECORD());
			}
		}
		
		public publish(data:SWFData, level:number):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			var numGradients:number =  ((this.records.length) >>> 0);
			data.resetBitsPending();
			data.writeUB(2, this.spreadMode);
			data.writeUB(2, this.interpolationMode);
			data.writeUB(4, numGradients);
			for (var i:number = 0; i < numGradients; i++) {
				data.writeMORPHGRADIENTRECORD(this._records[i]);
			}
		}
		
		public getMorphedGradient(ratio:number = 0):SWFGradient {
			/**/ ratio = (+(ratio));
			var gradient:SWFGradient = new SWFGradient();
			for(var i:number = 0, len:number =  ((this.records.length) >>> 0); i < len; i++) {
				gradient.records.push(this.records[i].getMorphedGradientRecord(ratio)); 
			}
			return gradient;
		}
		
		public toString():string {
			return "(" + this._records.join(",") + "), spread:" + this.spreadMode + ", interpolation:" + this.interpolationMode;
		}
	}

}