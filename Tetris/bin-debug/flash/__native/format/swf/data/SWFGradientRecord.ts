/// <reference path="../../../../../base.d.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	
	
	export  class SWFGradientRecord
	{
		public ratio:number = 0;
		public color:number = 0;
		
		protected _level:number = 0;
		
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			if (data != null) {
				this.parse(data, level);
			}
		}
		
		public parse(data:SWFData, level:number):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this._level = level;
			this.ratio = data.readUI8();
			this.color = (level <= 2) ? data.readRGB() : data.readRGBA();
		}
		
		public publish(data:SWFData, level:number):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			data.writeUI8(this.ratio);
			if(level <= 2) {
				data.writeRGB(this.color);
			} else {
				data.writeRGBA(this.color);
			}
		}
		
		public clone():SWFGradientRecord {
			var gradientRecord:SWFGradientRecord = new SWFGradientRecord();
			gradientRecord.ratio = this.ratio;
			gradientRecord.color = this.color;
			return gradientRecord;
		}
		
		public toString():string {
			return "[" + this.ratio + "," + ((this._level <= 2) ? ColorUtils.rgbToString(this.color) : ColorUtils.rgbaToString(this.color)) + "]";
		}
	}

}