/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../geom/ColorTransform.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorTransform = flash.geom.ColorTransform;
	
	
	export  class SWFColorTransformWithAlpha extends SWFColorTransform
	{
		public get aMult():number { return this._aMult / 256; }
		public set aMult(value:number) { /**/ value = (+(value)); this._aMult = this.clamp(value * 256); this.updateHasMultTerms(); }

		public get aAdd():number { return this._aAdd; }
		public set aAdd(value:number) { /**/ value = (+(value)); this._aAdd = this.clamp(value); this.updateHasAddTerms(); }

		/*[internal]*/ /*override*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			data.resetBitsPending();
			this.hasAddTerms = (data.readUB(1) == 1);
			this.hasMultTerms = (data.readUB(1) == 1);
			var bits:number = data.readUB(4);
			
			if (this.hasMultTerms) {
				
				this._rMult = data.readSB(bits);
				this._gMult = data.readSB(bits);
				this._bMult = data.readSB(bits);
				this._aMult = data.readSB(bits);
				
			} else {
				
				this._rMult = 256;
				this._gMult = 256;
				this._bMult = 256;
				this._aMult = 256;
				
			}
			
			if (this.hasAddTerms) {
				
				this._rAdd = data.readSB(bits);
				this._gAdd = data.readSB(bits);
				this._bAdd = data.readSB(bits);
				this._aAdd = data.readSB(bits);
				
			} else {
				
				this._rAdd = 0;
				this._gAdd = 0;
				this._bAdd = 0;
				this._aAdd = 0;
				
			}
			
			this.colorTransform = new ColorTransform(this.rMult, this.gMult, this.bMult, this.aMult, this.rAdd, this.gAdd, this.bAdd, this.aAdd);
		}
		
		/*override*/ public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.resetBitsPending();
			data.writeUB(1, this.hasAddTerms ? 1 : 0);
			data.writeUB(1, this.hasMultTerms ? 1 : 0);
			var values:any[] = [];
			if (this.hasMultTerms) { values.push(this._rMult, this._gMult, this._bMult, this._aMult); }
			if (this.hasAddTerms) { values.push(this._rAdd, this._gAdd, this._bAdd, this._aAdd); }
			var bits:number = (this.hasMultTerms || this.hasAddTerms) ? data.calculateMaxBits(true, values) : 1;
			data.writeUB(4, bits);
			if (this.hasMultTerms) {
				data.writeSB(bits, this._rMult);
				data.writeSB(bits, this._gMult);
				data.writeSB(bits, this._bMult);
				data.writeSB(bits, this._aMult);
			}
			if (this.hasAddTerms) {
				data.writeSB(bits, this._rAdd);
				data.writeSB(bits, this._gAdd);
				data.writeSB(bits, this._bAdd);
				data.writeSB(bits, this._aAdd);
			}
		}
		
		/*override*/ public clone():SWFColorTransform {
			var copy : SWFColorTransformWithAlpha = new SWFColorTransformWithAlpha();
			copy.hasAddTerms = this.hasAddTerms;
			copy.hasMultTerms = this.hasMultTerms;
			copy.rMult = this.rMult;
			copy.gMult = this.gMult;
			copy.bMult = this.bMult;
			copy.aMult = this.aMult;
			copy.rAdd = this.rAdd;
			copy.gAdd = this.gAdd;
			copy.bAdd = this.bAdd;
			copy.aAdd = this.aAdd;
			copy.colorTransform = new ColorTransform(this.rMult, this.gMult, this.bMult, this.aMult, this.rAdd, this.gAdd, this.bAdd, this.aAdd);
			return copy;
		}

		/*override*/ protected updateHasMultTerms():void {
			this.hasMultTerms = (this._rMult != 256) || (this._gMult != 256) || (this._bMult != 256) || (this._aMult != 256);
		}
		
		/*override*/ protected updateHasAddTerms():void {
			this.hasAddTerms = (this._rAdd != 0) || (this._gAdd != 0) || (this._bAdd != 0) || (this._aAdd != 0);
		}

		/*override*/ public toString():string {
			return "(" + this.rMult + "," + this.gMult + "," + this.bMult + "," + this.aMult + "," + this.rAdd + "," + this.gAdd + "," + this.bAdd + "," + this.aAdd + ")";
		}
	}

}