/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/ByteArray.ts" />

namespace flash.__native.utils
{
	  
	export import ByteArray = flash.utils.ByteArray;
	

	export  class Base64
	{  
		private static _encodeChars:number[] = asc.sti(Base64,()=>{ Base64._encodeChars = Base64.InitEncoreChar(); });
		private static _decodeChars:number[] = asc.sti(Base64,()=>{ Base64._decodeChars = Base64.InitDecodeChar(); });
		
		public static encode(data:ByteArray):string
		{
			/**/ data = strict(data, ByteArray);
			var out:ByteArray = new ByteArray;
			//Presetting the length keep the memory smaller and optimize speed since there is no "grow" needed
			out.length =(( (2 + data._length - ((data._length + 2) % 3)) * 4 / 3) >>> 0); //Preset length //1.6 to 1.5 ms
			var i:number = 0;
			var r:number =  ((data._length % 3) >> 0);
			var len:number =  ((data._length - r) >> 0);
			var c:number = 0; //read (3) character AND write (4) characters
			var outPos:number = 0;
			
			while (i < len) {
				
				//Read 3 Characters (8bit * 3 = 24 bits)
				c =(( data.get(((i++) >> 0)) << 16 | data.get(((i++) >> 0)) << 8 | data.get(((i++) >> 0))) >>> 0);
				
				out.set(outPos++,  Base64._encodeChars[((c >>> 18) >> 0)]);
				out.set(outPos++,  Base64._encodeChars[((c >>> 12 & 0x3f) >> 0)]);
				out.set(outPos++,  Base64._encodeChars[((c >>> 6 & 0x3f) >> 0)]);
				out.set(outPos++,  Base64._encodeChars[((c & 0x3f) >> 0)]);
				
			}
			
			if (r == 1) { //Need two "=" padding
				
				//Read one char, write two chars, write padding  
				c =(( data.get(((i) >> 0))) >>> 0);
				
				out.set(outPos++,  Base64._encodeChars[((c >>> 2) >> 0)]);
				out.set(outPos++,  Base64._encodeChars[(((c & 0x03) << 4) >> 0)]);
				out.set(outPos++,  61);
				out.set(outPos++,  61);
				
			} else if (r == 2) { //Need one "=" padding
				
				c =(( data.get(((i++) >> 0)) << 8 | data.get(((i) >> 0))) >>> 0);
				
				out.set(outPos++,  Base64._encodeChars[((c >>> 10) >> 0)]);
				out.set(outPos++,  Base64._encodeChars[((c >>> 4 & 0x3f) >> 0)]);
				out.set(outPos++,  Base64._encodeChars[(((c & 0x0f) << 2) >> 0)]);
				out.set(outPos++,  61);
				
			}
			
			return out.readUTFBytes(out._length);
		}
		
		public static decode(str:string):ByteArray
		{
			/**/ str = as(str, 'String');
			var c1:number = 0;
			var c2:number = 0;
			var c3:number = 0;
			var c4:number = 0;
			var i:number = 0;
			var outPos:number = 0;
			var len:number = str.length;
			var byteString:ByteArray = new ByteArray;
			byteString.writeUTFBytes(str);
			
			while (i < len) {
				
				//c1
				c1 =(( Base64._decodeChars[((byteString.get(i++)) >> 0)]) >> 0);
				if (c1 == -1)
					break;
				
				//c2
				c2 =(( Base64._decodeChars[((byteString.get(i++)) >> 0)]) >> 0);
				if (c2 == -1)
					break;
				
				byteString.set(((outPos++) >> 0),  (c1 << 2) | ((c2 & 0x30) >> 4));
				
				//c3
				c3 =(( byteString.get(((i++) >> 0))) >> 0);
				if (c3 == 61) {
					
					byteString.length =(( outPos) >>> 0);
					return byteString;
					
				}
				
				c3 =(( Base64._decodeChars[((c3) >> 0)]) >> 0);
				if (c3 == -1)
					break;
				
				byteString.set(((outPos++) >> 0),  ((c2 & 0x0f) << 4) | ((c3 & 0x3c) >> 2));
				
				//c4
				c4 =(( byteString.get(((i++) >> 0))) >> 0);
				if (c4 == 61) {
					
					byteString.length =(( outPos) >>> 0);
					return byteString;
					
				}  
				
				c4 =(( Base64._decodeChars[((c4) >> 0)]) >> 0);
				if (c4 == -1)
					break;
				
				byteString.set(((outPos++) >> 0),  ((c3 & 0x03) << 6) | c4);
				
			}
			
			byteString.length =(( outPos) >>> 0);
			byteString.position = 0;
			return byteString;
		}  
		
		public static InitEncoreChar():number[]
		{  
			var encodeChars:number[] = new Array<number>(64);
			
			// We could push the number directly
			// but I think it's nice to see the characters (with no overhead on encode/decode)
			var chars:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			for (var i:number = 0; i < 64; i++) {
				
				encodeChars[i] = chars.charCodeAt(i);
				
			}  
			
			return encodeChars;
		}  
		
		public static InitDecodeChar():number[]  
		{  
			var decodeChars:number[] = (<number[]>[
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
				52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
				-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
				15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
				-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
				41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
			
			return decodeChars;
		}
		
	}
}