/// <reference path="../../../../../base.d.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="consts/LineJointStyle.ts" />
/// <reference path="consts/LineCapsStyle.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import LineCapsStyle = flash.__native.format.swf.data.consts.LineCapsStyle;
	export import LineJointStyle = flash.__native.format.swf.data.consts.LineJointStyle;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	
	
	export  class SWFLineStyle
	{
		public width:number = 0;
		public color:number = 0;

		public _level:number = 0;
		
		// Forward declaration of SWFLineStyle2 properties
		public startCapsStyle:number = LineCapsStyle.ROUND;
		public endCapsStyle:number = LineCapsStyle.ROUND;
		public jointStyle:number = LineJointStyle.ROUND;
		public hasFillFlag:boolean = false;
		public noHScaleFlag:boolean = false;
		public noVScaleFlag:boolean = false;
		public pixelHintingFlag:boolean = false;
		public noClose:boolean = false;
		public miterLimitFactor:number = 3;
		public fillType:SWFFillStyle = null;

		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			if (data != null) {
				this.parse(data, level);
			}
		}
		
		public parse(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this._level = level;
			this.width = data.readUI16();
			this.color = (level <= 2) ? data.readRGB() : data.readRGBA();
		}
		
		public publish(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			data.writeUI16(this.width);
			if(level <= 2) {
				data.writeRGB(this.color);
			} else {
				data.writeRGBA(this.color);
			}
		}
		
		public clone():SWFLineStyle {
			var lineStyle:SWFLineStyle = new SWFLineStyle();
			lineStyle.width = this.width;
			lineStyle.color = this.color;
			lineStyle.startCapsStyle = this.startCapsStyle;
			lineStyle.endCapsStyle = this.endCapsStyle;
			lineStyle.jointStyle = this.jointStyle;
			lineStyle.hasFillFlag = this.hasFillFlag;
			lineStyle.noHScaleFlag = this.noHScaleFlag;
			lineStyle.noVScaleFlag = this.noVScaleFlag;
			lineStyle.pixelHintingFlag = this.pixelHintingFlag;
			lineStyle.noClose = this.noClose;
			lineStyle.miterLimitFactor = this.miterLimitFactor;
			if (this.fillType) lineStyle.fillType = this.fillType.clone();
			return lineStyle;
		}
		
		public toString():string {
			return "[SWFLineStyle] Width: " + this.width + " Color: " + ((this._level <= 2) ? ColorUtils.rgbToString(this.color) : ColorUtils.rgbaToString(this.color));
		}
	}

}