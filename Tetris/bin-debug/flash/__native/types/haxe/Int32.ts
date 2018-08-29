/// <reference path="../../../../base.d.ts" />

namespace flash.__native.types.haxe {
	
	
	export  class Int32 {
		
		private x : number = 0;
		
		constructor (x:number) {
			/**/ x = ((x) >> 0);
			this.x = x;
		}
		
		public static make( a : number, b : number ) : Int32 {
			/**/ a = ((a) >> 0); b = ((b) >> 0);
			return new Int32 ((a << 16) | b);
		}
		
		public ofInt( /*x : int*/ ) : Int32 {
			return this;
		}
		
		public toInt( /*x : Int32*/ ) : number {
			return this.x;
		}
		
		public add( /*a : Int32,*/ b : Int32 ) : Int32 {
			/**/ b = strict(b, Int32);
			return new Int32(this.x + b.x);
		}
		
		public sub( /*a : Int32,*/ b : Int32 ) : Int32 {
			/**/ b = strict(b, Int32);
			return new Int32(this.x - b.x);
		}
		
		public mul( /*a : Int32,*/ b : Int32 ) : Int32 {
			/**/ b = strict(b, Int32);
			return new Int32(this.x * b.x);
		}
		
		public div( /*a : Int32,*/ b : Int32 ) : Int32 {
			/**/ b = strict(b, Int32);
			return new Int32(this.x / b.x);
		}
		
		public mod( /*a : Int32,*/ b : Int32 ) : Int32 {
			/**/ b = strict(b, Int32);
			return new Int32(this.x % b.x);
		}
		
		public shl( /*a : Int32,*/ b : number ) : Int32 {
			/**/ b = ((b) >> 0);
			return new Int32(this.x << b);
		}
		
		public shr( /*a : Int32,*/ b : number ) : Int32 {
			/**/ b = ((b) >> 0);
			return new Int32(this.x >> b);
		}
		
		public ushr( /*a : Int32,*/ b : number ) : Int32 {
			/**/ b = ((b) >> 0);
			return new Int32(this.x >>> b);
		}
		
		public and( /*a : Int32,*/ b : Int32 ) : Int32 {
			/**/ b = strict(b, Int32);
			return new Int32(this.x & b.x);
		}
		
		public or( /*a : Int32,*/ b : Int32 ) : Int32 {
			/**/ b = strict(b, Int32);
			return new Int32(this.x | b.x);
		}
		
		public xor( /*a : Int32, */b : Int32 ) : Int32 {
			/**/ b = strict(b, Int32);
			return new Int32(this.x ^ b.x);
		}
		
		public static neg( a : Int32 ) : Int32 {
			/**/ a = strict(a, Int32);
			return new Int32(-a.x);
		}
		
		public isNeg( /*a : Int32*/ ) : boolean {
			return this.x < 0;
		}
		
		public isZero( /*a : Int32*/ ) : boolean {
			return this.x == 0;
		}
		
		public static complement( a : Int32 ) : Int32 {
			/**/ a = strict(a, Int32);
			return new Int32(~a.x);
		}
		
		public static compare( a : Int32, b : Int32 ) : number {
			/**/ a = strict(a, Int32); b = strict(b, Int32);
			return a.x - b.x;
		}
		
		/**
		 Compare two Int32 in unsigned mode.
		 **/
		public static ucompare( a : Int32, b : Int32 ) : number {
			/**/ a = strict(a, Int32); b = strict(b, Int32);
			if( a.isNeg() )
				return b.isNeg() ? Int32.compare(Int32.complement(b),Int32.complement(a)) : 1;
			return b.isNeg() ? -1 : Int32.compare(a,b);
		}
		
	}
	
}