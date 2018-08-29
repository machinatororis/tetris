/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class SWFShapeRecordStyleChange extends SWFShapeRecord
	{
		/*[internal]*/ public stateNewStyles : boolean;
		/*[internal]*/ public stateLineStyle : boolean;
		/*[internal]*/ public stateFillStyle1 : boolean;
		/*[internal]*/ public stateFillStyle0 : boolean;
		/*[internal]*/ public stateMoveTo : boolean;
		
		/*[internal]*/ public moveDeltaX : number;
		/*[internal]*/ public moveDeltaY : number;
		/*[internal]*/ public fillStyle0 : number;
		/*[internal]*/ public fillStyle1 : number;
		/*[internal]*/ public lineStyle : number;
		
		/*[internal]*/ public numFillBits : number;
		/*[internal]*/ public numLineBits : number;

		/*[internal]*/ protected _fillStyles : SWFFillStyle[];
		/*[internal]*/ protected _lineStyles : SWFLineStyle[];

		/*[internal]*/ constructor (data : SWFData, states : number = 0, fillBits : number = 0, lineBits : number = 0, level : number = 1)
		{
			// data = strict(data, SWFData); states = ((states) >>> 0); fillBits = ((fillBits) >>> 0); lineBits = ((lineBits) >>> 0); level = ((level) >>> 0);
			/**/ this.moveDeltaX === void 0 && (this.moveDeltaX = 0);
			/**/ this.moveDeltaY === void 0 && (this.moveDeltaY = 0);
			/**/ this.numFillBits === void 0 && (this.numFillBits = 0);
			/**/ this.numLineBits === void 0 && (this.numLineBits = 0);
			this._fillStyles = new Array<SWFFillStyle>();
			this._lineStyles = new Array<SWFLineStyle>();
			this.stateNewStyles = ((states & 0x10) != 0);
			this.stateLineStyle = ((states & 0x08) != 0);
			this.stateFillStyle1 = ((states & 0x04) != 0);
			this.stateFillStyle0 = ((states & 0x02) != 0);
			this.stateMoveTo = ((states & 0x01) != 0);
			this.numFillBits = fillBits;
			this.numLineBits = lineBits;
			super(data, level);
		}
		
		public get fillStyles():SWFFillStyle[] { return this._fillStyles; }
		public get lineStyles():SWFLineStyle[] { return this._lineStyles; }
		
		/*override*/ public get type():number { return SWFShapeRecord.TYPE_STYLECHANGE; }
		
		/*[internal]*/ /*override*/ public parse (data : SWFData, level : number = 1) : void {
			// data = strict(data, SWFData); level = ((level) >>> 0);
			if (this.stateMoveTo) {
				var moveBits : number = data.readUB(5);
				this.moveDeltaX = data.readSB(moveBits);
				this.moveDeltaY = data.readSB(moveBits);
			}
			this.fillStyle0 = this.stateFillStyle0 ? data.readUB(this.numFillBits) : 0;
			this.fillStyle1 = this.stateFillStyle1 ? data.readUB(this.numFillBits) : 0;
			this.lineStyle = this.stateLineStyle ? data.readUB(this.numLineBits) : 0;
			if (this.stateNewStyles) {
				data.resetBitsPending();
				var i:number = 0;
				var fillStylesLen:number = this.readStyleArrayLength(data, level);
				for (i = 0; i < fillStylesLen; i++) {
					this.fillStyles.push(data.readFILLSTYLE(level));
				}
				var lineStylesLen:number = this.readStyleArrayLength(data, level);
				for (i = 0; i < lineStylesLen; i++) {
					this.lineStyles.push(level <= 3 ? data.readLINESTYLE(level) : data.readLINESTYLE2(level));
				}
				data.resetBitsPending();
				this.numFillBits = data.readUB(4);
				this.numLineBits = data.readUB(4);
			}
		}

		/*override*/ public publish(data:SWFData = null, level:number = 1):void {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			if(this.stateMoveTo) {
				var moveBits:number = data.calculateMaxBits(true, [this.moveDeltaX, this.moveDeltaY]);
				data.writeUB(5, moveBits);
				data.writeSB(moveBits, this.moveDeltaX);
				data.writeSB(moveBits, this.moveDeltaY);
			}
			if(this.stateFillStyle0) { data.writeUB(this.numFillBits, this.fillStyle0); }
			if(this.stateFillStyle1) { data.writeUB(this.numFillBits, this.fillStyle1); }
			if(this.stateLineStyle) { data.writeUB(this.numLineBits, this.lineStyle); }
			if (this.stateNewStyles) {
				data.resetBitsPending();
				var i:number = 0;
				var fillStylesLen:number =  ((this.fillStyles.length) >>> 0);
				this.writeStyleArrayLength(data, fillStylesLen, level);
				for (i = 0; i < fillStylesLen; i++) {
					this.fillStyles[i].publish(data, level);
				}
				var lineStylesLen:number =  ((this.lineStyles.length) >>> 0);
				this.writeStyleArrayLength(data, lineStylesLen, level);
				for (i = 0; i < lineStylesLen; i++) {
					this.lineStyles[i].publish(data, level);
				}
				this.numFillBits = data.calculateMaxBits(false, [fillStylesLen]);
				this.numLineBits = data.calculateMaxBits(false, [lineStylesLen]);
				data.resetBitsPending();
				data.writeUB(4, this.numFillBits);
				data.writeUB(4, this.numLineBits);
			}
		}

		protected readStyleArrayLength(data:SWFData, level:number = 1):number {
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			var len:number = data.readUI8();
			if (level >= 2 && len == 0xff) {
				len = data.readUI16();
			}
			return len;
		}
		
		protected writeStyleArrayLength(data:SWFData, length:number, level:number = 1):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); level = ((level) >>> 0);
			if (level >= 2 && length > 0xfe) {
				data.writeUI8(0xff);
				data.writeUI16(length);
			} else {
				data.writeUI8(length);
			}
		}
		
		/*override*/ public clone():SWFShapeRecord {
			var record:SWFShapeRecordStyleChange = new SWFShapeRecordStyleChange();
			record.stateNewStyles = this.stateNewStyles;
			record.stateLineStyle = this.stateLineStyle;
			record.stateFillStyle1 = this.stateFillStyle1;
			record.stateFillStyle0 = this.stateFillStyle0;
			record.stateMoveTo = this.stateMoveTo;
			record.moveDeltaX = this.moveDeltaX;
			record.moveDeltaY = this.moveDeltaY;
			record.fillStyle0 = this.fillStyle0;
			record.fillStyle1 = this.fillStyle1;
			record.lineStyle = this.lineStyle;
			record.numFillBits = this.numFillBits;
			record.numLineBits = this.numLineBits;
			var i:number = 0;
			for(i = 0; i < this.fillStyles.length; i++) {
				record.fillStyles.push(this.fillStyles[i].clone());
			}
			for(i = 0; i < this.lineStyles.length; i++) {
				record.lineStyles.push(this.lineStyles[i].clone());
			}
			return record;
		}
		
		/*override*/ public toString(indent:number = 0):string {
			/**/ indent = ((indent) >>> 0);
			var str:string = "[SWFShapeRecordStyleChange] ";
			var cmds:any[] = [];
			if (this.stateMoveTo) { cmds.push("MoveTo: " + this.moveDeltaX + "," + this.moveDeltaY); }
			if (this.stateFillStyle0) { cmds.push("FillStyle0: " + this.fillStyle0); }
			if (this.stateFillStyle1) { cmds.push("FillStyle1: " + this.fillStyle1); }
			if (this.stateLineStyle) { cmds.push("LineStyle: " + this.lineStyle); }
			if (cmds.length > 0) { str += cmds.join(", "); }
			if (this.stateNewStyles) {
				var i:number = 0;
				if (this._fillStyles.length > 0) {
					str += "\n" + StringUtils.repeat(indent + 2) + "New FillStyles:";
					for (i = 0; i < this._fillStyles.length; i++) {
						str += "\n" + StringUtils.repeat(indent + 4) + "[" + (i + 1) + "] " + this._fillStyles[i].toString();
					}
				}
				if (this._lineStyles.length > 0) {
					str += "\n" + StringUtils.repeat(indent + 2) + "New LineStyles:";
					for (i = 0; i < this._lineStyles.length; i++) {
						str += "\n" + StringUtils.repeat(indent + 4) + "[" + (i + 1) + "] " + this._lineStyles[i].toString();
					}
				}
			}
			return str;
		}
	}

}