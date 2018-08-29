/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />

namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFMorphFocalGradient extends SWFMorphGradient
	{
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			super(data, level);
		}
		
		/*override*/ public parse(data:SWFData, level:number):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			super.parse(data, level);
			this.startFocalPoint = data.readFIXED8();
			this.endFocalPoint = data.readFIXED8();
		}
		
		/*override*/ public publish(data:SWFData, level:number):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			super.publish(data, level);
			data.writeFIXED8(this.startFocalPoint);
			data.writeFIXED8(this.endFocalPoint);
		}
		
		/*override*/ public getMorphedGradient(ratio:number = 0):SWFGradient {
			/**/ ratio = (+(ratio));
			var gradient:SWFGradient = new SWFGradient();
			// TODO: focalPoint
			for(var i:number = 0, len:number =  ((this.records.length) >>> 0); i < len; i++) {
				gradient.records.push(this.records[i].getMorphedGradientRecord(ratio)); 
			}
			return gradient;
		}
		
		/*override*/ public toString():string {
			return "FocalPoint: " + this.startFocalPoint + "," + this.endFocalPoint + " (" + this._records.join(",") + ")";
		}
	}

}