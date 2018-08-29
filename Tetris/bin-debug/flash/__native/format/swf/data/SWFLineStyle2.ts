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
	
	
	export  class SWFLineStyle2 extends SWFLineStyle
	{
		constructor(data:SWFData = null, level:number = 1) {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			super(data, level);
		}
		
		/*override*/ public parse(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			this.width = data.readUI16();
			this.startCapsStyle = data.readUB(2);
			this.jointStyle = data.readUB(2);
			this.hasFillFlag = (data.readUB(1) == 1);
			this.noHScaleFlag = (data.readUB(1) == 1);
			this.noVScaleFlag = (data.readUB(1) == 1);
			this.pixelHintingFlag = (data.readUB(1) == 1);
			data.readUB(5);
			this.noClose = (data.readUB(1) == 1);
			this.endCapsStyle = data.readUB(2);
			if (this.jointStyle == LineJointStyle.MITER) {
				this.miterLimitFactor = data.readFIXED8();
			}
			if (this.hasFillFlag) {
				this.fillType = data.readFILLSTYLE(level);
			} else {
				this.color = data.readRGBA();
			}
		}
		
		/*override*/ public publish(data:SWFData, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			data.writeUI16(this.width);
			data.writeUB(2, this.startCapsStyle);
			data.writeUB(2, this.jointStyle);
			data.writeUB(1, this.hasFillFlag ? 1 : 0);
			data.writeUB(1, this.noHScaleFlag ? 1 : 0);
			data.writeUB(1, this.noVScaleFlag ? 1 : 0);
			data.writeUB(1, this.pixelHintingFlag ? 1 : 0);
			data.writeUB(5, 0);
			data.writeUB(1, this.noClose ? 1 : 0);
			data.writeUB(2, this.endCapsStyle);
			if (this.jointStyle == LineJointStyle.MITER) {
				data.writeFIXED8(this.miterLimitFactor);
			}
			if (this.hasFillFlag) {
				data.writeFILLSTYLE(this.fillType, level);
			} else {
				data.writeRGBA(this.color);
			}
		}
		
		/*override*/ public toString():string {
			var str:string = "[SWFLineStyle2] Width: " + this.width + ", " +
				"StartCaps: " + LineCapsStyle.toString(this.startCapsStyle) + ", " +
				"EndCaps: " + LineCapsStyle.toString(this.endCapsStyle) + ", " +
				"Joint: " + LineJointStyle.toString(this.jointStyle) + ", ";
			if(this.noClose) { str += "NoClose, "; }
			if(this.noHScaleFlag) { str += "NoHScale, "; }
			if(this.noVScaleFlag) { str += "NoVScale, "; }
			if(this.pixelHintingFlag) { str += "PixelHinting, "; }
			if (this.hasFillFlag) {
				str += "Fill: " + this.fillType.toString();
			} else {
				str += "Color: " + ColorUtils.rgbaToString(this.color);
			}
			return str;
		}
	}

}