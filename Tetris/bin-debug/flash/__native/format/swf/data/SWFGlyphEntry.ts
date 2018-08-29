/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFGlyphEntry
	{
		public index:number = 0;
		public advance:number = 0;
		
		constructor(data:SWFData = null, glyphBits:number = 0, advanceBits:number = 0) {
			/**/ data = strict(data, SWFData); glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0);
			if (data != null) {
				this.parse(data, glyphBits, advanceBits);
			}
		}
		
		public parse(data:SWFData, glyphBits:number, advanceBits:number):void {
			/**/ data = strict(data, SWFData); glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0);
			// GLYPHENTRYs are not byte aligned
			this.index = data.readUB(glyphBits);
			this.advance =(( data.readSB(advanceBits) / 20) >> 0);
		}
		
		public publish(data:SWFData, glyphBits:number, advanceBits:number):void {
			/**/ data = strict(data, SWFData); glyphBits = ((glyphBits) >>> 0); advanceBits = ((advanceBits) >>> 0);
			// GLYPHENTRYs are not byte aligned
			data.writeUB(glyphBits, this.index);
			data.writeSB(advanceBits, this.advance);
		}
		
		public clone():SWFGlyphEntry {
			var entry:SWFGlyphEntry = new SWFGlyphEntry();
			entry.index = this.index;
			entry.advance = this.advance;
			return entry;
		}
		
		public toString():string {
			return "[SWFGlyphEntry] Index: " + this.index.toString() + ", Advance: " + this.advance.toString();
		}
	}

}