/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../geom/Rectangle.ts" />
/// <reference path="../utils/NumberUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import NumberUtils = flash.__native.format.swf.utils.NumberUtils;
	export import Rectangle = flash.geom.Rectangle;
	
	
	export  class SWFRectangle
	{
		public xmin:number = 0;
		public xmax:number = 11000;
		public ymin:number = 0;
		public ymax:number = 8000;
		
		protected _rectangle:Rectangle = null;
		
		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			this._rectangle = new Rectangle();
			if (data != null) {
				this.parse(data);
			}
		}

		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.resetBitsPending();
			var bits:number = data.readUB(5);
			this.xmin = data.readSB(bits);
			this.xmax = data.readSB(bits);
			this.ymin = data.readSB(bits);
			this.ymax = data.readSB(bits);
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var numBits:number = data.calculateMaxBits(true, [this.xmin, this.xmax, this.ymin, this.ymax]);
			data.resetBitsPending();
			data.writeUB(5, numBits);
			data.writeSB(numBits, this.xmin);
			data.writeSB(numBits, this.xmax);
			data.writeSB(numBits, this.ymin);
			data.writeSB(numBits, this.ymax);
		}
		
		public clone():SWFRectangle {
			var rect:SWFRectangle = new SWFRectangle();
			rect.xmin = this.xmin;
			rect.xmax = this.xmax;
			rect.ymin = this.ymin;
			rect.ymax = this.ymax;
			return rect;
		}
		
		public get rect():Rectangle {
			this._rectangle.left = NumberUtils.roundPixels20(this.xmin / 20);
			this._rectangle.right = NumberUtils.roundPixels20(this.xmax / 20);
			this._rectangle.top = NumberUtils.roundPixels20(this.ymin / 20);
			this._rectangle.bottom = NumberUtils.roundPixels20(this.ymax / 20);
			return this._rectangle;
		}
		
		public toString():string {
			return "(" + this.xmin + "," + this.xmax + "," + this.ymin + "," + this.ymax + ")";
		}
		
		public toStringSize():string {
			return "(" + ((+(this.xmax)) / 20 - (+(this.xmin)) / 20) + "," + ((+(this.ymax)) / 20 - (+(this.ymin)) / 20) + ")";
		}
	}

}