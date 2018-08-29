/// <reference path="../../../base.d.ts" />
﻿
namespace flash.__native.utils
{
	
	export  class BitArray extends SubByteArray
	{
		/*[internal]*/ protected bitsPending : number = 0;
		
		/*[internal]*/ public readBits (bits : number, bitBuffer : number = 0) : number
		{
			// bits = ((bits) >>> 0); bitBuffer = ((bitBuffer) >>> 0);
			if (bits == 0) {
				
				return bitBuffer;
			
			}
			
			var partial;
			var bitsConsumed;
			if (this.bitsPending > 0) {
				
				var byte = ((this.get(this._position - 1) & (0xff >> (8 - this.bitsPending))) >>> 0);
				bitsConsumed = this.bitsPending < bits ? this.bitsPending : bits;
				this.bitsPending -= bitsConsumed;
				partial = ((byte >> this.bitsPending) >>> 0);
				
			} else {
				
				bitsConsumed = 8 < bits ? 8 : bits;
				this.bitsPending =(( 8 - bitsConsumed) >>> 0);
				partial = ((this.readUnsignedByte() >> this.bitsPending) >>> 0);
				
			}
			
			bits = ((bits - bitsConsumed) >>> 0);
			bitBuffer =(( (bitBuffer << bitsConsumed) | partial) >>> 0);
			return bits > 0 ? this.readBits(bits, bitBuffer) : bitBuffer;
		}
		
		/*[internal]*/ public writeBits (bits : number, value : number) : void
		{
			// bits = ((bits) >>> 0); value = ((value) >>> 0);
			if (bits == 0) {
				
				return;
				
			}
			
			value &= (0xffffffff >>> (32 - bits));
			var bitsConsumed;
			if (this.bitsPending > 0) {
				
				if (this.bitsPending > bits) {
					
					this.set(this.position - 1,this.position.get(this.position - 1) |  value << (this.bitsPending - bits));
					bitsConsumed = bits;
					this.bitsPending = ((this.bitsPending - bits) >>> 0);
					
				} else if (this.bitsPending == bits) {
					
					this.set(this.position - 1,this.position.get(this.position - 1) |  value);
					bitsConsumed = bits;
					this.bitsPending = 0;
					
				} else {
					
					this.set(this.position - 1,this.position.get(this.position - 1) |  value >> (bits - this.bitsPending));
					bitsConsumed = this.bitsPending;
					this.bitsPending = 0;
					
				}
				
			} else {
				
				bitsConsumed = Math.min(8, bits);
				this.bitsPending =(( 8 - bitsConsumed) >>> 0);
				this.writeByte((value >> (bits - bitsConsumed)) << this.bitsPending);
				
			}
			
			bits -= bitsConsumed;
			
			if (bits > 0) {
				
				this.writeBits(bits, value);
				
			}
		}
		
		/*[internal]*/ public resetBitsPending () : void
		{
			this.bitsPending = 0;
		}
		
		/*[internal]*/ public calculateMaxBits (signed : boolean, values : any[]) : number
		{
			// signed = Boolean(signed); values = strict(values, Array);
			var b:number = 0;
			var vmax:number = int.MIN_VALUE;
			if (!signed) {
				
				var __for0 = window.asc.of(values);
				for (var usvalue of __for0) {
					
					b |= usvalue;
					
				}
				
			} else {
				
				var __for1 = window.asc.of(values);
				for (var svalue of __for1) {
					
					if (svalue >= 0) {
						
						b |= svalue;
						
					} else {
						
						b |= ~svalue << 1;
						
					}
					
					if (vmax < svalue) {
						
						vmax = svalue;
						
					}
				}
				
			}
			var bits:number = 0;
			if (b > 0) {
				
				bits =(( b.toString(2).length) >>> 0);
				if (signed && vmax > 0 && vmax.toString(2).length >= bits) {
					
					bits++;
					
				}
				
			}
			
			return bits;
		}
	}

}