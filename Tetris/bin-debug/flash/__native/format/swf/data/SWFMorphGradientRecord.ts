/// <reference path="../../../../../base.d.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	
	
	export  class SWFMorphGradientRecord
	{
		public startRatio:number = 0;
		public startColor:number = 0;
		public endRatio:number = 0;
		public endColor:number = 0;
		
		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			if (data != null) {
				this.parse(data);
			}
		}
		
		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.startRatio = data.readUI8();
			this.startColor = data.readRGBA();
			this.endRatio = data.readUI8();
			this.endColor = data.readRGBA();
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.writeUI8(this.startRatio);
			data.writeRGBA(this.startColor);
			data.writeUI8(this.endRatio);
			data.writeRGBA(this.endColor);
		}
		
		public getMorphedGradientRecord(ratio:number = 0):SWFGradientRecord {
			/**/ ratio = (+(ratio));
			var gradientRecord:SWFGradientRecord = new SWFGradientRecord();
			gradientRecord.color = ColorUtils.interpolate(this.startColor, this.endColor, ratio);
			gradientRecord.ratio =(( this.startRatio + (this.endRatio - this.startRatio) * ratio) >>> 0);
			return gradientRecord;
		}
		
		public toString():string {
			return "[" + this.startRatio + "," + ColorUtils.rgbaToString(this.startColor) + "," + this.endRatio + "," + ColorUtils.rgbaToString(this.endColor) + "]";
		}
	}

}