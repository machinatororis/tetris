/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import StringUtils = flash.__native.utils.StringUtils;
	
	
	export  class SWFShapeWithStyle extends SWFShape
	{
		/*[internal]*/ /*override*/ public parse (data : SWFData, level : number = 1) : void
		{
			// data = strict(data, SWFData); level = ((level) >>> 0);
			data.resetBitsPending ();
			
			var i;
			var fillStylesLen = this.readStyleArrayLength (data, level);
			for (i = 0; i < fillStylesLen; i++) {
				
				this._fillStyles[this._fillStyles.length] = data.readFILLSTYLE (level);
				
			}
			
			var lineStylesLen = this.readStyleArrayLength (data, level);
			for (i = 0; i < lineStylesLen; i++) {
				
				this._lineStyles[this._lineStyles.length] = level <= 3 ? data.readLINESTYLE (level) : data.readLINESTYLE2 (level);
				
			}
			
			data.resetBitsPending ();
			var numFillBits : number = data.readUB (4);
			var numLineBits : number = data.readUB (4);
			this.readShapeRecords (data, numFillBits, numLineBits, level);
		}
		
		/*override*/ public publish (data : SWFData, level : number = 1) : void
		{
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			data.resetBitsPending ();
			var i : number = 0;
			var fillStylesLen : number =  ((this._fillStyles.length) >>> 0);
			this.writeStyleArrayLength (data, fillStylesLen, level);
			for (i = 0; i < fillStylesLen; i++) {
				
				this._fillStyles[i].publish (data, level);
				
			}
			
			var lineStylesLen : number =  ((this._lineStyles.length) >>> 0);
			this.writeStyleArrayLength (data, lineStylesLen, level);
			for (i = 0; i < lineStylesLen; i++) {
				
				this._lineStyles[i].publish (data, level);
				
			}
			
			var fillBits : number = data.calculateMaxBits (false, [this.getMaxFillStyleIndex()]);
			var lineBits : number = data.calculateMaxBits (false, [this.getMaxLineStyleIndex()]);
			data.resetBitsPending ();
			data.writeUB (4, fillBits);
			data.writeUB (4, lineBits);
			this.writeShapeRecords (data, fillBits, lineBits, level);
		}
				
		protected readStyleArrayLength (data : SWFData, level : number = 1) : number
		{
			/**/ data = strict(data, SWFData); level = ((level) >>> 0);
			var len:number = data.readUI8 ();
			if (level >= 2 && len == 0xff) {
				
				len = data.readUI16 ();
				
			}
			
			return len;
		}
		
		protected writeStyleArrayLength (data : SWFData, length : number, level : number = 1) : void
		{
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); level = ((level) >>> 0);
			if (level >= 2 && length > 0xfe) {
				
				data.writeUI8 (0xff);
				data.writeUI16 (length);
				
			} else {
				
				data.writeUI8 (length);
				
			}
		}
		
		/*override*/ public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			var i : number = 0;
			var str : string = "";
			if (this._fillStyles.length > 0) {
				
				str += "\n" + StringUtils.repeat(indent) + "FillStyles:";
				for (i = 0; i < this._fillStyles.length; i++) {
					
					str += "\n" + StringUtils.repeat(indent + 2) + "[" + (i + 1) + "] " + this._fillStyles[i].toString();
					
				}
				
			}
			
			if (this._lineStyles.length > 0) {
				
				str += "\n" + StringUtils.repeat(indent) + "LineStyles:";
				for (i = 0; i < this._lineStyles.length; i++) {
					
					str += "\n" + StringUtils.repeat(indent + 2) + "[" + (i + 1) + "] " + this._lineStyles[i].toString();
					
				}
				
			}
			
			return str + super.toString (indent);
		}
	}

}