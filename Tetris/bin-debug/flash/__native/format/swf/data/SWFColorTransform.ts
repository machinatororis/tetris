/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../geom/ColorTransform.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorTransform = flash.geom.ColorTransform;
	
	
	export  class SWFColorTransform
	{
		/*[internal]*/ protected _rMult : number;
		/*[internal]*/ protected _gMult : number;
		/*[internal]*/ protected _bMult : number;
		/*[internal]*/ protected _aMult : number = 256;

		/*[internal]*/ protected _rAdd : number;
		/*[internal]*/ protected _gAdd : number;
		/*[internal]*/ protected _bAdd : number;
		/*[internal]*/ protected _aAdd : number = 0;
		
		/*[internal]*/ public hasMultTerms : boolean;
		/*[internal]*/ public hasAddTerms : boolean;
		/*[internal]*/ public colorTransform : ColorTransform;
		
		/*[internal]*/ constructor (data:SWFData)
		{
			// data = strict(data, SWFData);
			if (data != null) {
				
				this.parse(data);
				
			}
		}
		
		public get rMult():number { return this._rMult / 256; }
		public get gMult():number { return this._gMult / 256; }
		public get bMult():number { return this._bMult / 256; }

		public set rMult(value:number) { /**/ value = (+(value)); this._rMult = this.clamp(value * 256); this.updateHasMultTerms(); }
		public set gMult(value:number) { /**/ value = (+(value)); this._gMult = this.clamp(value * 256); this.updateHasMultTerms(); }
		public set bMult(value:number) { /**/ value = (+(value)); this._bMult = this.clamp(value * 256); this.updateHasMultTerms(); }

		public get rAdd():number { return this._rAdd; }
		public get gAdd():number { return this._gAdd; }
		public get bAdd():number { return this._bAdd; }
		
		public set rAdd(value:number) { /**/ value = (+(value)); this._rAdd = this.clamp(value); this.updateHasAddTerms(); }
		public set gAdd(value:number) { /**/ value = (+(value)); this._gAdd = this.clamp(value); this.updateHasAddTerms(); }
		public set bAdd(value:number) { /**/ value = (+(value)); this._bAdd = this.clamp(value); this.updateHasAddTerms(); }

		/*[internal]*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			data.resetBitsPending();
			this.hasAddTerms = (data.readUB(1) == 1);
			this.hasMultTerms = (data.readUB(1) == 1);
			var bits : number = data.readUB(4);
			if (this.hasMultTerms) {
				
				this._rMult = data.readSB(bits);
				this._gMult = data.readSB(bits);
				this._bMult = data.readSB(bits);
				
			} else {
				
				this._rMult = 256;
				this._gMult = 256;
				this._bMult = 256;
				
			}
			
			if (this.hasAddTerms) {
				
				this._rAdd = data.readSB(bits);
				this._gAdd = data.readSB(bits);
				this._bAdd = data.readSB(bits);
				
			} else {
				
				this._rAdd = 0;
				this._gAdd = 0;
				this._bAdd = 0;
				
			}
			
			this.colorTransform = new ColorTransform(this.rMult, this.gMult, this.bMult, 1, this.rAdd, this.gAdd, this.bAdd, 0);
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.resetBitsPending();
			data.writeUB(1, this.hasAddTerms ? 1 : 0);
			data.writeUB(1, this.hasMultTerms ? 1 : 0);
			var values:any[] = [];
			if (this.hasMultTerms) { values.push(this._rMult, this._gMult, this._bMult); }
			if (this.hasAddTerms) { values.push(this._rAdd, this._gAdd, this._bAdd); }
			var bits:number = data.calculateMaxBits(true, values);
			data.writeUB(4, bits);
			if (this.hasMultTerms) {
				data.writeSB(bits, this._rMult);
				data.writeSB(bits, this._gMult);
				data.writeSB(bits, this._bMult);
			}
			if (this.hasAddTerms) {
				data.writeSB(bits, this._rAdd);
				data.writeSB(bits, this._gAdd);
				data.writeSB(bits, this._bAdd);
			}
		}
		
		public clone():SWFColorTransform {
			var copy : SWFColorTransform = new SWFColorTransform();
			copy.hasAddTerms = this.hasAddTerms;
			copy.hasMultTerms = this.hasMultTerms;
			copy.rMult = this.rMult;
			copy.gMult = this.gMult;
			copy.bMult = this.bMult;
			copy.rAdd = this.rAdd;
			copy.gAdd = this.gAdd;
			copy.bAdd = this.bAdd;
			copy.colorTransform = new ColorTransform(this.rMult, this.gMult, this.bMult, 1, this.rAdd, this.gAdd, this.bAdd, 0);
			return copy;
		}

		protected updateHasMultTerms():void {
			this.hasMultTerms = (this._rMult != 256) || (this._gMult != 256) || (this._bMult != 256);
		}
		
		protected updateHasAddTerms():void {
			this.hasAddTerms = (this._rAdd != 0) || (this._gAdd != 0) || (this._bAdd != 0);
		}
		
		protected clamp(value:number):number {
			/**/ value = (+(value));
			return Math.min(Math.max(value, -32768), 32767);
		}
		
		public isIdentity():boolean {
			return !this.hasMultTerms && !this.hasAddTerms;
		}
		
		public toString():string {
			return "(" + this.rMult + "," + this.gMult + "," + this.bMult + "," + this.rAdd + "," + this.gAdd + "," + this.bAdd + ")";
		}
	}

}