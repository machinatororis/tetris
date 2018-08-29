/// <reference path="../../../../base.d.ts" />

namespace flash.__native.types.haxe {
	
	
	export  class Int64 {
		
		public high : Int32 = null;
		public low : Int32 = null;
		
		constructor (high:Int32, low:Int32) {
			/**/ high = strict(high, Int32); low = strict(low, Int32);
			this.high = high;
			this.low = low;
		}
		
		public toString():string {
			var str:string = '';
			var neg:boolean = false;
			var i:Int64 = this;
			if( Int64.isNeg(i) ) {
				neg = true;
				i = Int64.neg(i);
			}
			var ten:Int64 = Int64.ofInt(10);
			while( !Int64.isZero(i) ) {
				var r:any = Int64.divMod(i, ten);
				str = r.modulus.low.toInt() + str;
				i =strict( r.quotient, Int64);
			}
			if ( neg ) str = "-" + str;
			return str == '' ? '0' : str;
		}
		
		public static make( high : number, low : number ) : Int64 {
			/**/ high = ((high) >> 0); low = ((low) >> 0);
			return new Int64(new Int32(high), new Int32(low));
		}
		
		public static ofInt( x : number ) : Int64 {
			/**/ x = ((x) >> 0);
			return new Int64(new Int32(x >> 31), new Int32(x));
		}
		
		public static ofInt32( x : Int32 ) : Int64 {
			/**/ x = strict(x, Int32);
			return new Int64(x.shr(31), x);
		}
		
		public static toInt( x : Int64 ) : number {
			/**/ x = strict(x, Int64);
			if( x.high.toInt() != 0 ) {
				if( x.high.isNeg() )
					return -Int64.toInt(Int64.neg(x));
				throw "Overflow";
			}
			return x.low.toInt();
		}
		
		public static getLow( x : Int64 ) : Int32 {
			/**/ x = strict(x, Int64);
			return x.low;
		}
		
		public static getHigh( x : Int64 ) : Int32 {
			/**/ x = strict(x, Int64);
			return x.high;
		}
		
		public static add( a : Int64, b : Int64 ) : Int64 {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			var high:Int32 = a.high.add(b.high);
			var low:Int32 = a.low.add(b.low);
			if( Int32.ucompare(low, a.low) < 0 )
				high = high.add(new Int32(1));
			return new Int64(high, low);
		}
		
		public static sub( a : Int64, b : Int64 ) : Int64 {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			var high:Int32 = a.high.sub(b.high);
			var low:Int32 = a.low.sub(b.low);
			if( Int32.ucompare(a.low, b.low) < 0 )
				high = high.sub(new Int32(1));
			return new Int64(high, low);
		}
		
		public static mul( a : Int64, b : Int64 ) : Int64 {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			var mask:Int32 = new Int32(0xFFFF);
			var al:Int32 = a.low.and(mask), ah:Int32 = a.low.ushr(16);
			var bl:Int32 = b.low.and(mask), bh:Int32 = b.low.ushr(16);
			var p00:Int32 = al.mul(bl);
			var p10:Int32 = ah.mul(bl);
			var p01:Int32 = al.mul(bh);
			var p11:Int32 = ah.mul(bh);
			var low:Int32 = p00;
			var high:Int32 = p11.add(p01.ushr(16)).add(p10.ushr(16));
			p01 = p01.shl(16); low = low.add(p01); if( Int32.ucompare(low, p01) < 0 ) high = high.add(new Int32(1));
			p10 = p10.shl(16); low = low.add(p10); if( Int32.ucompare(low, p10) < 0 ) high = high.add(new Int32(1));
			high = high.add(a.low.mul(b.high));
			high = high.add(a.high.mul(b.low));
			return new Int64(high, low);
		}
		
		private static divMod( modulus : Int64, divisor : Int64 ):any {
			/**/ modulus = strict(modulus, Int64); divisor = strict(divisor, Int64);
			var quotient:Int64 = new Int64(new Int32(0), new Int32(0));
			var mask:Int64 = new Int64(new Int32(0), new Int32(1));
			divisor = new Int64(divisor.high, divisor.low);
			while( !divisor.high.isNeg() ) {
				var cmp:number = Int64.ucompare(divisor, modulus);
				divisor.high = divisor.high.shl(1).or(divisor.low.ushr(31));
				divisor.low = divisor.low.shl(1);
				mask.high = mask.high.shl(1).or(mask.low.ushr(31));
				mask.low = mask.low.shl(1);
				if( cmp >= 0 ) break;
			}
			while( !mask.low.or(mask.high).isZero() ) {
				if( Int64.ucompare(modulus, divisor) >= 0 ) {
					quotient.high = quotient.high.or(mask.high);
					quotient.low = quotient.low.or(mask.low);
					modulus = Int64.sub(modulus, divisor);
				}
				mask.low = mask.low.ushr(1).or(mask.high.shl(31));
				mask.high = mask.high.ushr(1);
				
				divisor.low = divisor.low.ushr(1).or(divisor.high.shl(31));
				divisor.high = divisor.high.ushr(1);
			}
			return { quotient : quotient, modulus : modulus };
		}
		
		public static div( a : Int64, b : Int64 ) : Int64 {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			var sign:boolean = a.high.or(b.high).isNeg();
			if( a.high.isNeg() ) a = Int64.neg(a);
			if( b.high.isNeg() ) b = Int64.neg(b);
			var q:Int64 =  strict(Int64.divMod(a, b).quotient, Int64);
			return sign ? Int64.neg(q) : q;
		}
		
		public static mod( a : Int64, b : Int64 ) : Int64 {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			var sign:boolean = a.high.or(b.high).isNeg();
			if( a.high.isNeg() ) a = Int64.neg(a);
			if( b.high.isNeg() ) b = Int64.neg(b);
			var m:Int64 =  strict(Int64.divMod(a, b).modulus, Int64);
			return sign ? Int64.neg(m) : m;
		}
		
		public static shl( a : Int64, b : number ) : Int64 {
			/**/ a = strict(a, Int64); b = ((b) >> 0);
			if( b & 63 == 0 ) return a; else if( b & 63 < 32 ) return new Int64( a.high.shl(b).or(a.low.ushr(32 - (b&63))), a.low.shl(b) ) else return new Int64( a.low.shl(b - 32), new Int32(0) );
		}
		
		public static shr( a : Int64, b : number ) : Int64 {
			/**/ a = strict(a, Int64); b = ((b) >> 0);
			if( b & 63 == 0 ) return a; else if( b & 63 < 32 ) return new Int64( a.high.shr(b), a.low.ushr(b).or(a.high.shl(32 - (b&63))) ) else return new Int64( a.high.shr(31), a.high.shr(b - 32) );
		}
		
		public static ushr( a : Int64, b : number ) : Int64 {
			/**/ a = strict(a, Int64); b = ((b) >> 0);
			if( b & 63 == 0 ) return a; else if( b & 63 < 32 ) return new Int64( a.high.ushr(b), a.low.ushr(b).or(a.high.shl(32 - (b&63))) ) else return new Int64( new Int32(0), a.high.ushr(b - 32) );
		}
		
		public static and( a : Int64, b : Int64 ) : Int64 {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			return new Int64( a.high.and(b.high), a.low.and(b.low) );
		}
		
		public static or( a : Int64, b : Int64 ) : Int64 {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			return new Int64( a.high.or(b.high), a.low.or(b.low) );
		}
		
		public static xor( a : Int64, b : Int64 ) : Int64 {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			return new Int64( a.high.xor(b.high), a.low.xor(b.low) );
		}
		
		public static neg( a : Int64 ) : Int64 {
			/**/ a = strict(a, Int64);
			var high:Int32 = Int32.complement(a.high);
			var low:Int32 = Int32.neg(a.low);
			if( low.isZero() )
				high = high.add(new Int32(1));
			return new Int64(high,low);
		}
		
		public static isNeg( a : Int64 ) : boolean {
			/**/ a = strict(a, Int64);
			return a.high.isNeg();
		}
		
		public static isZero( a : Int64 ) : boolean {
			/**/ a = strict(a, Int64);
			return a.high.or(a.low).isZero();
		}
		
		public static compare( a : Int64, b : Int64 ) : number {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			var v:number = Int32.compare(a.high,b.high);
			if( v != 0 ) return v; else return Int32.ucompare(a.low, b.low);
		}
		
		/**
		 Compare two Int64 in unsigned mode.
		 **/
		public static ucompare( a : Int64, b : Int64 ) : number {
			/**/ a = strict(a, Int64); b = strict(b, Int64);
			var v:number = Int32.ucompare(a.high,b.high);
			if( v != 0 ) return v; else return Int32.ucompare(a.low, b.low);
		}
		
	}
	
}