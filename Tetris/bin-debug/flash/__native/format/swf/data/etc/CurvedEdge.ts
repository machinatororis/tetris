/// <reference path="../../../../../../base.d.ts" />
﻿
namespace flash.__native.format.swf.data.etc
{
	
	export  class CurvedEdge extends StraightEdge implements IEdge
	{
		implements_flash___native_format_swf_data_etc_IEdge = null;
		protected _controlX : number;
		protected _controlY : number;
		
		constructor(fromX : number, fromY : number, controlX : number, controlY : number, toX : number, toY : number,
															 lineStyleIdx : number = 0, fillStyleIdx : number = 0)
		{
			/**/ fromX = ((fromX) >> 0); fromY = ((fromY) >> 0); controlX = ((controlX) >> 0); controlY = ((controlY) >> 0); toX = ((toX) >> 0); toY = ((toY) >> 0); lineStyleIdx = ((lineStyleIdx) >> 0); fillStyleIdx = ((fillStyleIdx) >> 0);
			/**/ this._controlX === void 0 && (this._controlX = 0);
			/**/ this._controlY === void 0 && (this._controlY = 0);
			super (fromX, fromY, toX, toY, lineStyleIdx, fillStyleIdx);
			this._controlX = controlX;
			this._controlY = controlY;
		}
		
		public getControlX () : number { return this._controlX; }
		public getControlY () : number { return this._controlY; }
		
		/*override*/ public reverseWithNewFillStyle(newFillStyleIdx : number):IEdge
		{
			/**/ newFillStyleIdx = ((newFillStyleIdx) >>> 0);
			return new CurvedEdge (this._toX, this._toY, this._controlX, this._controlY, this._fromX, this._fromY, this._lineStyleIdx, newFillStyleIdx);
		}
		
		/*override*/ public toString():string
		{
			return "stroke:" + this._lineStyleIdx + ", fill:" + this._fillStyleIdx + ", start:" + this._fromX + " " + this._fromY + ", control:" + this._controlX + " " + this._controlY + ", end:" + this._toX + " " + this._toY;
		}
	}

}