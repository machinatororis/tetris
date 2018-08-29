/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.etc
{
	
	export  class StraightEdge implements IEdge
	{
		implements_flash___native_format_swf_data_etc_IEdge = null;
		protected _fromX : number = 0;
		protected _fromY : number = 0;
		protected _toX : number = 0;
		protected _toY : number = 0;
		protected _lineStyleIdx : number = 0;
		protected _fillStyleIdx : number = 0;
		
		constructor(fromX : number, fromY : number, toX : number, toY : number, 
																 lineStyleIdx : number = 0, fillStyleIdx : number = 0)
		{
			/**/ fromX = ((fromX) >> 0); fromY = ((fromY) >> 0); toX = ((toX) >> 0); toY = ((toY) >> 0); lineStyleIdx = ((lineStyleIdx) >> 0); fillStyleIdx = ((fillStyleIdx) >> 0);
			this._fromX = fromX;
			this._fromY = fromY;
			this._toX = toX;
			this._toY = toY;
			this._lineStyleIdx = lineStyleIdx;
			this._fillStyleIdx = fillStyleIdx;
		}
		
		public getFromX () : number { return this._fromX; }
		public getFromY () : number { return this._fromY; }
		public getToX () : number { return this._toX; }
		public getToY () : number { return this._toY; }
		public getLineStyleIdx () : number { return this._lineStyleIdx; }
		public getFillStyleIdx () : number { return this._fillStyleIdx; }
		
		public reverseWithNewFillStyle(newFillStyleIdx : number) : IEdge
		{
			/**/ newFillStyleIdx = ((newFillStyleIdx) >>> 0);
			return new StraightEdge (this._toX, this._toY, this._fromX, this._fromY, this._lineStyleIdx, newFillStyleIdx);
		}
		
		public toString():string
		{
			return "stroke:" + this._lineStyleIdx + ", fill:" + this._fillStyleIdx + ", start:" + this._fromX + " " + this._fromY + ", end:" + this._toX + " " + this._toY;
		}
	}

}