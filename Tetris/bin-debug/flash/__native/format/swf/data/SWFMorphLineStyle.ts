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
	
	
	export  class SWFMorphLineStyle
	{
		public startWidth:number = 0;
		public endWidth:number = 0;
		public startColor:number = 0;
		public endColor:number = 0;

		// Forward declaration of SWFMorphLineStyle2 properties
		public startCapsStyle:number = LineCapsStyle.ROUND;
		public endCapsStyle:number = LineCapsStyle.ROUND;
		public jointStyle:number = LineJointStyle.ROUND;
		public hasFillFlag:boolean = false;
		public noHScaleFlag:boolean = false;
		public noVScaleFlag:boolean = false;
		public pixelHintingFlag:boolean = false;
		public noClose:boolean = false;
		public miterLimitFactor:number = 3;
		public fillType:SWFMorphFillStyle = null;
		
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			if (data != null) {
				this.parse(data, level);
			}
		}
		
		public parse(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this.startWidth = data.readUI16();
			this.endWidth = data.readUI16();
			this.startColor = data.readRGBA();
			this.endColor = data.readRGBA();
		}
		
		public publish(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			data.writeUI16(this.startWidth);
			data.writeUI16(this.endWidth);
			data.writeRGBA(this.startColor);
			data.writeRGBA(this.endColor);
		}
		
		public getMorphedLineStyle(ratio:number = 0):SWFLineStyle {
			/**/ ratio = (+(ratio));
			var lineStyle:SWFLineStyle = new SWFLineStyle();
			if(this.hasFillFlag) {
				lineStyle.fillType = this.fillType.getMorphedFillStyle(ratio);
			} else {
				lineStyle.color = ColorUtils.interpolate(this.startColor, this.endColor, ratio);
				lineStyle.width =(( this.startWidth + (this.endWidth - this.startWidth) * ratio) >>> 0);
			}
			lineStyle.startCapsStyle = this.startCapsStyle;
			lineStyle.endCapsStyle = this.endCapsStyle;
			lineStyle.jointStyle = this.jointStyle;
			lineStyle.hasFillFlag = this.hasFillFlag;
			lineStyle.noHScaleFlag = this.noHScaleFlag;
			lineStyle.noVScaleFlag = this.noVScaleFlag;
			lineStyle.pixelHintingFlag = this.pixelHintingFlag;
			lineStyle.noClose = this.noClose;
			lineStyle.miterLimitFactor = this.miterLimitFactor;
			return lineStyle;
		}
		
		public toString():string {
			return "[SWFMorphLineStyle] " +
				"StartWidth: " + this.startWidth + ", " +
				"EndWidth: " + this.endWidth + ", " +
				"StartColor: " + ColorUtils.rgbaToString(this.startColor) + ", " +
				"EndColor: " + ColorUtils.rgbaToString(this.endColor);
		}
	}

}