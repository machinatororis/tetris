/// <reference path="../../../../../base.d.ts" />
/// <reference path="../utils/MatrixUtils.ts" />
/// <reference path="../utils/ColorUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import MatrixUtils = flash.__native.format.swf.utils.MatrixUtils;
	
	
	export  class SWFMorphFillStyle
	{
		public type:number = 0;

		public startColor:number = 0;
		public endColor:number = 0;
		public startGradientMatrix:SWFMatrix = null;
		public endGradientMatrix:SWFMatrix = null;
		public gradient:SWFMorphGradient = null;
		public bitmapId:number = 0;
		public startBitmapMatrix:SWFMatrix = null;
		public endBitmapMatrix:SWFMatrix = null;
		
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			if (data != null) {
				this.parse(data, level);
			}
		}
		
		public parse(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this.type = data.readUI8();
			switch(this.type) {
				case 0x00:
					this.startColor = data.readRGBA();
					this.endColor = data.readRGBA();
					break;
				case 0x10:
				case 0x12:
				case 0x13:
					this.startGradientMatrix = data.readMATRIX();
					this.endGradientMatrix = data.readMATRIX();
					this.gradient = (this.type == 0x13) ? data.readMORPHFOCALGRADIENT(level) : data.readMORPHGRADIENT(level);
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					this.bitmapId = data.readUI16();
					this.startBitmapMatrix = data.readMATRIX();
					this.endBitmapMatrix = data.readMATRIX();
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
					data.writeRGBA(this.startColor);
					data.writeRGBA(this.endColor);
					break;
				case 0x10:
				case 0x12:
				case 0x13:
					data.writeMATRIX(this.startGradientMatrix);
					data.writeMATRIX(this.endGradientMatrix);
					if (this.type == 0x13) {
						data.writeMORPHFOCALGRADIENT(strict(this.gradient, SWFMorphFocalGradient), level);
					} else {
						data.writeMORPHGRADIENT(this.gradient, level);
					}
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					data.writeUI16(this.bitmapId);
					data.writeMATRIX(this.startBitmapMatrix);
					data.writeMATRIX(this.endBitmapMatrix);
					break;
				default:
					throw(new Error("Unknown fill style type: 0x" + this.type.toString(16)));
			}
		}
		
		public getMorphedFillStyle(ratio:number = 0):SWFFillStyle {
			/**/ ratio = (+(ratio));
			var fillStyle:SWFFillStyle = new SWFFillStyle();
			fillStyle.type = this.type;
			switch(this.type) {
				case 0x00:
					fillStyle.rgb = ColorUtils.interpolate(this.startColor, this.endColor, ratio);
					break;
				case 0x10:
				case 0x12:
					fillStyle.gradientMatrix = MatrixUtils.interpolate(this.startGradientMatrix, this.endGradientMatrix, ratio);
					fillStyle.gradient = this.gradient.getMorphedGradient(ratio);
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					fillStyle.bitmapId = this.bitmapId;
					fillStyle.bitmapMatrix = MatrixUtils.interpolate(this.startBitmapMatrix, this.endBitmapMatrix, ratio);
					break;
			}
			return fillStyle;
		}
		
		public toString():string {
			var str:string = "[SWFMorphFillStyle] Type: " + this.type.toString(16);
			switch(this.type) {
				case 0x00: str += " (solid), StartColor: " + ColorUtils.rgbaToString(this.startColor) + ", EndColor: " + ColorUtils.rgbaToString(this.endColor); break;
				case 0x10: str += " (linear gradient), Gradient: " + this.gradient; break;
				case 0x12: str += " (radial gradient), Gradient: " + this.gradient; break;
				case 0x13: str += " (focal radial gradient), Gradient: " + this.gradient; break;
				case 0x40: str += " (repeating bitmap), BitmapID: " + this.bitmapId; break;
				case 0x41: str += " (clipped bitmap), BitmapID: " + this.bitmapId; break;
				case 0x42: str += " (non-smoothed repeating bitmap), BitmapID: " + this.bitmapId; break;
				case 0x43: str += " (non-smoothed clipped bitmap), BitmapID: " + this.bitmapId; break;
			}
			return str;
		}
	}

}