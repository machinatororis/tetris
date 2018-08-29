/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class SWFFillStyle
	{
		public type:number = 0;

		public rgb:number = 0;
		public gradient:SWFGradient = null;
		public gradientMatrix:SWFMatrix = null;
		public bitmapId:number = 0;
		public bitmapMatrix:SWFMatrix = null;

		protected _level:number = 0;
		
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			if (data != null) {
				this.parse(data, level);
			}
		}
		
		public parse(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this._level = level;
			this.type = data.readUI8();
			switch(this.type) {
				case 0x00:
					this.rgb = (level <= 2) ? data.readRGB() : data.readRGBA();
					break;
				case 0x10:
				case 0x12:
				case 0x13:
					this.gradientMatrix = data.readMATRIX();
					this.gradient = (this.type == 0x13) ? data.readFOCALGRADIENT(level) : data.readGRADIENT(level);
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					this.bitmapId = data.readUI16();
					this.bitmapMatrix = data.readMATRIX();
					break;
				default:
					throw(new Error("Unknown fill style type: 0x" + this.type.toString(16)));
			}
		}
		
		public publish(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			data.writeUI8(this.type);
			switch(this.type) {
				case 0x00:
					if(level <= 2) {
						data.writeRGB(this.rgb);
					} else {
						data.writeRGBA(this.rgb);
					}
					break;
				case 0x10:
				case 0x12:
					data.writeMATRIX(this.gradientMatrix);
					data.writeGRADIENT(this.gradient, level);
					break;
				case 0x13:
					data.writeMATRIX(this.gradientMatrix);
					data.writeFOCALGRADIENT(strict(this.gradient, SWFFocalGradient), level);
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					data.writeUI16(this.bitmapId);
					data.writeMATRIX(this.bitmapMatrix);
					break;
				default:
					throw(new Error("Unknown fill style type: 0x" + this.type.toString(16)));
			}
		}
		
		public clone():SWFFillStyle {
			var fillStyle:SWFFillStyle = new SWFFillStyle();
			fillStyle.type = this.type;
			fillStyle.rgb = this.rgb;
			fillStyle.bitmapId = this.bitmapId;
			if (this.gradient) fillStyle.gradient = this.gradient.clone();
			if (this.gradientMatrix) fillStyle.gradientMatrix = this.gradientMatrix.clone();
			if (this.bitmapMatrix) fillStyle.bitmapMatrix = this.bitmapMatrix.clone();
			return fillStyle;
		}
		
		public toString():string {
			var str:string = "[SWFFillStyle] Type: " + StringUtils.printf("%02x", this.type);
			switch(this.type) {
				case 0x00: str += " (solid), Color: " + ((this._level <= 2) ? ColorUtils.rgbToString(this.rgb) : ColorUtils.rgbaToString(this.rgb)); break;
				case 0x10: str += " (linear gradient), Gradient: " + this.gradient + ", Matrix: " + this.gradientMatrix; break;
				case 0x12: str += " (radial gradient), Gradient: " + this.gradient + ", Matrix: " + this.gradientMatrix; break;
				case 0x13: str += " (focal radial gradient), Gradient: " + this.gradient + ", Matrix: " + this.gradientMatrix + ", FocalPoint: " + this.gradient.focalPoint; break;
				case 0x40: str += " (repeating bitmap), BitmapID: " + this.bitmapId; break;
				case 0x41: str += " (clipped bitmap), BitmapID: " + this.bitmapId; break;
				case 0x42: str += " (non-smoothed repeating bitmap), BitmapID: " + this.bitmapId; break;
				case 0x43: str += " (non-smoothed clipped bitmap), BitmapID: " + this.bitmapId; break;
			}
			return str;
		}
	}

}