/// <reference path="../../base.d.ts" />
/// <reference path="../net/ObjectEncoding.ts" />
/// <reference path="../errors/IOError.ts" />
/// <reference path="../__native/utils/ObjectPool.ts" />
/// <reference path="../__native/format/amf/AMF.ts" />

namespace flash.utils
{
	export import AMF = flash.__native.format.amf.AMF;
	export import ObjectPool = flash.__native.utils.ObjectPool;
	export import IOError = flash.errors.IOError;
	export import ObjectEncoding = flash.net.ObjectEncoding;
	

	/**
	 * The ByteArray class provides methods and properties to optimize reading, writing, and working with binary data.
	 * Note: The ByteArray class is for advanced developers who need to access data on the byte level.
	 * 
	 * In-memory data is a packed array (the most compact representation for the data type) of bytes, 
	 * but an instance of the ByteArray class can be manipulated with the standard [] (array access) operators. 
	 * It also can be read and written to as an in-memory file, using methods similar to those in the URLStream and Socket classes.
	 * 
	 * In addition, zlib, deflate, and lzma compression and decompression are supported, as well as Action Message Format (AMF) 
	 * object serialization.
	 * 
	 * A ByteArray object can share its backing memory among multiple worker instances by setting its shareable property to true.
	 * 
	 * Possible uses of the ByteArray class include the following:
	 * 
	 * Creating a custom protocol to connect to a server.
	 * Writing your own URLEncoder/URLDecoder.
	 * Writing your own AMF/Remoting packet.
	 * Optimizing the size of your data by using data types.
	 * Working with binary data loaded from a file. 
	 * @author pkulikov
	 * 
	 */	
	export  class ByteArray implements IDataInput, IDataOutput
	{
		implements_flash_utils_IDataOutput = null;
		implements_flash_utils_IDataInput = null;
		protected static __pool = asc.sti(ByteArray,()=>{ ByteArray.__pool = new ObjectPool (function () { return new ByteArray; }.__bind(this), function (b) { b.clear(); }.__bind(this)); });
		
		/**
		 * ArrayBuffer length
		 */		
		protected static ARRAY_BUFFER_LENGTH : number =  ((1024*4) >> 0); // 4 Kb
		
		/**
		 * Static private 
		 */		
		protected static _defaultObjectEncoding : number = asc.sti(ByteArray,()=>{ ByteArray._defaultObjectEncoding = ObjectEncoding.DEFAULT; });
		
		/**
		 * Private 
		 */
		/*[internal]*/ protected _dataView : DataView;
		/*[internal]*/ protected _isLittleEndian : boolean;
		/*[internal]*/ protected _objectEncoding : number;
		/*[internal]*/ protected _endian : string;
		/*[internal]*/ protected _position : number = 0;
		/*[internal]*/ protected _length : number = 0;
		/*[internal]*/ protected _fixed : boolean;
		
		/**
		 * Creates a ByteArray instance representing a packed array of bytes, so that you can use the methods and properties in 
		 * this class to optimize your data storage and stream. 
		 */		
		constructor ()
		{
			this._objectEncoding = ByteArray._defaultObjectEncoding;
			this._endian = 'bigEndian';
			
			if (arguments[0] == false) {
				
				return;
				
			}
			
			this._dataView = new DataView (new ArrayBuffer(0));
		}
		
		/**
		 * Denotes the default object encoding for the ByteArray class to use for a new ByteArray instance. 
		 * @return 
		 * 
		 */		
		public static get defaultObjectEncoding () : number { return ByteArray._defaultObjectEncoding; }
		public static set defaultObjectEncoding (value : number) { /**/ value = ((value) >>> 0); ByteArray._defaultObjectEncoding = value; }
		
		public get (index : number) : number
		{
			/**/ index = ((index) >> 0);
			try {
				
				return this._dataView.getUint8(index);
				
			} catch (e  ) {
				
				e = window.asc.e2e(e);
				
				return undefined;
				
			}
		}
		
		public set (index : number, v : number) : void
		{
			/**/ index = ((index) >> 0); v = ((v) >> 0);
			if (index + 1 > this._length) {
				
				this.length =(( index + 1) >>> 0);
				
			}
			
			if (v < 0) {
				
				this._dataView.setInt8(index, v);
				
			} else {
				
				this._dataView.setUint8(index, v);
				
			}
		}
		
		/**
		 * Reads the number of data bytes, specified by the length parameter, from the byte stream. 
		 * @param b
		 * @param offset
		 * @param length
		 * 
		 */		
		public readBytes (b : ByteArray, offset : number = 0, length : number = 0) : void
		{
			/**/ b = strict(b, ByteArray); offset = ((offset) >>> 0); length = ((length) >>> 0);
			var pos = b.position;
			b.position = offset;
			b.writeBytes(this, this.position, length);
			b.position =(( pos) >>> 0);
		}
		
		/**
		 * Writes a sequence of length bytes from the specified byte array, bytes, starting offset(zero-based index) bytes into the byte stream. 
		 * @param bytes
		 * @param offset
		 * @param length
		 * 
		 */		
		public writeBytes (bytes : ByteArray, offset : number = 0, length : number = 0) : void
		{
			/**/ bytes = strict(bytes, ByteArray); offset = ((offset) >>> 0); length = ((length) >>> 0);
			if (length == 0) {
				
				length =(( bytes._length - offset) >>> 0);
				
			}
			
			this.__beforeWrite(length);
			
			var db = new Uint8Array(this._dataView.buffer);
			var sb = new Uint8Array(bytes._dataView.buffer, offset, length);
			db.set(sb, this._position);
			
			this._position += length;
			bytes._position += length;
		}
		
		/**
		 * Writes a Boolean value. 
		 * @param v
		 * 
		 */		
		public writeBoolean (v : boolean) : void
		{
			/**/ v = Boolean(v);
			this.__beforeWrite(1);
			this._dataView.setInt8(this._position++, v ? 1 : 0);
		}
		
		/**
		 * Writes a byte to the byte stream. 
		 * @param v
		 * 
		 */		
		public writeByte (v : number) : void
		{
			/**/ v = ((v) >> 0);
			this.__beforeWrite(1);
			this._dataView.setInt8(this._position++, v);
		}
		
		/**
		 * Writes a 16-bit integer to the byte stream.
		 * @param v
		 * 
		 */		
		public writeShort (v : number) : void
		{
			/**/ v = ((v) >> 0);
			this.__beforeWrite(2);
			this._dataView.setInt16(this._position, v, this._isLittleEndian);
			this._position += 2;
		}
		
		/**
		 * Writes a 32-bit signed integer to the byte stream.
		 * @param v
		 * 
		 */		
		public writeInt (v : number) : void
		{
			/**/ v = ((v) >> 0);
			this.__beforeWrite(4);
			this._dataView.setInt32(this._position, v, this._isLittleEndian);
			this._position += 4;
		}
		
		/**
		 * Writes a 32-bit unsigned integer to the byte stream.
		 * @param v
		 * 
		 */		
		public writeUnsignedInt (v : number) : void
		{
			/**/ v = ((v) >>> 0);
			this.__beforeWrite(4);
			this._dataView.setUint32(this._position, v, this._isLittleEndian);
			this._position += 4;
		}
		
		/**
		 * Writes an IEEE 754 single-precision (32-bit) floating-point number to the byte stream.
		 * @param v
		 * 
		 */		
		public writeFloat (v : number) : void
		{
			/**/ v = (+(v));
			this.__beforeWrite(4);
			this._dataView.setFloat32(this._position, v, this._isLittleEndian);
			this._position += 4;
		}
		
		/**
		 * Writes an IEEE 754 double-precision (64-bit) floating-point number to the byte stream.
		 * @param v
		 * 
		 */		
		public writeDouble (v : number) : void
		{
			/**/ v = (+(v));
			this.__beforeWrite(8);
			this._dataView.setFloat64(this._position, v, this._isLittleEndian);
			this._position += 8;
		}
		
		/**
		 * Writes a multibyte string to the byte stream using the specified character set.
		 * @param str
		 * @param charSet
		 * 
		 */		
		public writeMultiByte (str : string, charSet : string) : void
		{
			/**/ str = as(str, 'String'); charSet = as(charSet, 'String');
			var u8:Uint8Array;
			var Encoder:any = window.asc.vanilla.get('TextEncoder');
			
			if (charSet != 'utf-8' || !Encoder) {
				
				Encoder = window.TextEncoder;
				
			}
			
			if (Encoder) {
				
				u8 =strict( new Encoder(charSet, { NONSTANDARD_allowLegacyEncoding: true }).encode(str), Uint8Array);
				
			} else {
				
				u8 = new Uint8Array(as(window.asc.vanilla.get('unescape')(encodeURIComponent(str)).split('').map(function(c:string) : number {
					
					return c.charCodeAt(0);
					
				}.__bind(this)) , Array));
				
			}
			
			var length = u8.length;
			this.__beforeWrite(length);
			
			var db = new Uint8Array(this._dataView.buffer);
			db.set(u8, this._position);
			
			this._position += length;
		}
		
		/**
		 * Writes a UTF-8 string to the byte stream.
		 * @param v
		 * 
		 */		
		public writeUTF (v : string) : void
		{
			/**/ v = as(v, 'String');
			this._position += 2;
			
			var start : number = this._position;
			this.writeUTFBytes(v);
			
			var end : number = this._position;
			
			this._position =(( start - 2) >> 0);
			this.writeShort(start - end);
			this._position = end;
		}
		
		/**
		 * Writes a UTF-8 string to the byte stream.
		 * @param v
		 * 
		 */		
		public writeUTFBytes (v : string) : void
		{
			/**/ v = as(v, 'String');
			this.writeMultiByte(v, 'utf-8');
		}
		
		/**
		 * Reads a Boolean value from the byte stream. 
		 * @return 
		 * 
		 */		
		public readBoolean () : boolean
		{
			return this._dataView.getInt8(this._position++) != 0;
		}
		
		/**
		 * Reads a signed byte from the byte stream. 
		 * @return 
		 * 
		 */		
		public readByte () : number
		{
			return this._dataView.getInt8(this._position++);
		}
		
		/**
		 * Reads an unsigned byte from the byte stream. 
		 * @return 
		 * 
		 */		
		public readUnsignedByte () : number
		{
			return this._dataView.getUint8(this._position++);
		}
		
		/**
		 * Reads a signed 16-bit integer from the byte stream. 
		 * @return 
		 * 
		 */		
		public readShort () : number
		{
			var v:number = this._dataView.getInt16(this._position,this._isLittleEndian);
			this._position += 2;
			return v;
		}
		
		/**
		 * Reads an unsigned 16-bit integer from the byte stream. 
		 * @return 
		 * 
		 */		
		public readUnsignedShort () : number
		{
			var v:number = this._dataView.getUint16(this._position,this._isLittleEndian);
			this._position += 2;
			return v;
		}
		
		/**
		 * Reads a signed 32-bit integer from the byte stream. 
		 * @return 
		 * 
		 */		
		public readInt () : number
		{
			var v:number = this._dataView.getInt32(this._position,this._isLittleEndian);
			this._position += 4;
			return v;
		}
		
		/**
		 * Reads an unsigned 32-bit integer from the byte stream. 
		 * @return 
		 * 
		 */		
		public readUnsignedInt () : number
		{
			var v:number = this._dataView.getUint32(this._position,this._isLittleEndian);
			this._position += 4;
			return v;
		}
		
		/**
		 * Reads an IEEE 754 single-precision (32-bit) floating-point number from the byte stream. 
		 * @return 
		 * 
		 */		
		public readFloat () : number
		{
			var v:number = this._dataView.getFloat32(this._position,this._isLittleEndian);
			this._position += 4;
			return v;
		}
		
		/**
		 * Reads an IEEE 754 double-precision (64-bit) floating-point number from the byte stream. 
		 * @return 
		 * 
		 */		
		public readDouble () : number
		{
			var v:number = this._dataView.getFloat64(this._position,this._isLittleEndian);
			this._position += 8;
			return v;
		}
		
		/**
		 * Reads a multibyte string of specified length from the byte stream using the specified character set. 
		 * @param length
		 * @param charSet
		 * @return 
		 * 
		 */		
		public readMultiByte (length : number, charSet : string) : string
		{
			/**/ length = ((length) >>> 0); charSet = as(charSet, 'String');
			var str:string = '';
			var u8:Uint8Array =  strict(new Uint8Array(this._dataView.buffer).subarray(this._position, this._position + length), Uint8Array);
			var Decoder:any = window.asc.vanilla.get('TextDecoder');
			
			if (charSet != 'utf-8' || !Decoder) {
				
				Decoder = window.TextDecoder;
				
			}
			
			if (Decoder) {
				
				str =as( new Decoder(charSet, { NONSTANDARD_allowLegacyEncoding: true }).decode(u8), 'String');
				
			} else {
				
				var charArr:any[] = new Array(u8.length);
				var u8Length:number =  ((u8.length) >> 0);
				for (var i = 0; i < u8Length; i++){
					
					charArr[i] = String.fromCharCode(u8[i]);
					
				}
				
				str = charArr.join('');
				try {
					
					str = decodeURIComponent(window.asc.vanilla.get('escape')(str));
					
				} catch (e) {
					
				e = window.asc.e2e(e);
					
				}
				
			}
			
			this._position += length;
			return str;
		}
		
		/**
		 * Reads a UTF-8 string from the byte stream. 
		 * @return 
		 * 
		 */		
		public readUTF () : string 
		{
			return this.readUTFBytes(this.readUnsignedShort());
		}
		
		/**
		 * Reads a sequence of UTF-8 bytes specified by the length parameter from the byte stream and returns a string. 
		 * @param length
		 * @return 
		 * 
		 */		
		public readUTFBytes (length : number) : string
		{
			/**/ length = ((length) >>> 0);
			// Byte order mark (only UTF-8)
			// https://en.wikipedia.org/wiki/Byte_order_mark
			if (this._position + 3 <= this._length && this.get(this._position) == 0xef && this.get(this._position + 1) == 0xbb && this.get(this._position + 2) == 0xbf) {
				
				this._position += 3;
				length -= 3;
				
				if (length < 0) {
					
					length = 0;
					
				}
				
			}
			
			return this.readMultiByte (length, 'utf-8');
		}
		
		/**
		 * The length of the ByteArray object, in bytes. 
		 * @return 
		 * 
		 */		
		public get length () : number { return this._length; }
		public set length (v : number) { /**/ v = ((v) >>> 0); this.__setLength(v); }
		
		/**
		 * Writes an object into the byte array in AMF serialized format. 
		 * @param object
		 * 
		 */		
		public writeObject (object : any) : void
		{
			switch (this._objectEncoding) {
				
				case ObjectEncoding.AMF0:
				case ObjectEncoding.AMF3:
					AMF.write(this._objectEncoding, this, object);
					break;
				
				default:
					throw new Error('Object Encoding');
					
			}
		}
		
		/**
		 * Reads an object from the byte array, encoded in AMF serialized format. 
		 * @return 
		 * 
		 */		
		public readObject () : any
		{
			switch (this._objectEncoding) {
				
				case ObjectEncoding.AMF0:
				case ObjectEncoding.AMF3:
					return AMF.read(this._objectEncoding, this);
					
				default:
					throw new Error('Object Encoding');
					
			}
		}
		
		/**
		 * Compresses the byte array using the deflate compression algorithm. 
		 * 
		 */		
		public deflate () : void
		{
			this.__compress(CompressionAlgorithm.DEFLATE);
		}
		
		/**
		 * Compresses the byte array. 
		 * @param algorithm zlib, deflate, lzma
		 * 
		 */		
		public compress (algorithm : string = 'zlib') : void
		{
			/**/ algorithm = as(algorithm, 'String');
			this.__compress(algorithm);
		}
		
		/**
		 * Decompresses the byte array using the deflate compression algorithm. 
		 * 
		 */		
		public inflate () : void
		{
			this.__uncompress(CompressionAlgorithm.DEFLATE);
		}
		
		/**
		 * Decompresses the byte array. 
		 * @param algorithm zlib, deflate, lzma
		 * 
		 */		
		public uncompress (algorithm : string = 'zlib') : void
		{
			/**/ algorithm = as(algorithm, 'String');
			this.__uncompress(algorithm);
		}
		
		/**
		 * Converts the byte array to a string. 
		 * @return 
		 * 
		 */		
		public toString () : string
		{
			return this.__toString(0, this._length);
		}
		
		/**
		 * Provides an overridable method for customizing the JSON encoding of values in an ByteArray object. 
		 * @param k
		 * @return 
		 * 
		 */		
		public toJSON (k : string) : any
		{
			
		/**/ k = as(k, 'String');
			
		}
		
		/**
		 * The number of bytes of data available for reading from the current position in the byte array to the end of the array. 
		 * @return 
		 * 
		 */		
		public get bytesAvailable () : number
		{ 
			return this._length - this._position;
		}
		
		/**
		 * Moves, or returns the current position, in bytes, of the file pointer into the ByteArray object. 
		 * @return 
		 * 
		 */		
		public get position () : number { return this._position; }
		public set position (p : number) { /**/ p = ((p) >>> 0); this._position =(( p) >> 0); }
		
		/**
		 * Used to determine whether the ActionScript 3.0, ActionScript 2.0, or ActionScript 1.0 format should be used when writing to, 
		 * or reading from, a ByteArray instance. 
		 * @return 
		 * 
		 */		
		public get objectEncoding () : number { return this._objectEncoding; }
		public set objectEncoding (value : number) { /**/ value = ((value) >>> 0); this._objectEncoding = value; }
		
		/**
		 * Changes or reads the byte order for the data; either Endian.BIG_ENDIAN or Endian.LITTLE_ENDIAN. 
		 * @return 
		 * 
		 */		
		public get endian () : string { return this._endian; }
		public set endian (v : string)
		{
			/**/ v = as(v, 'String');
			this._endian = v;
			this._isLittleEndian = v == Endian.LITTLE_ENDIAN;
		}
		
		/**
		 * Clears the contents of the byte array and resets the length and position properties to 0. 
		 * 
		 */		
		public clear () : void
		{
			this._position = 0;
			this.__setLength(0);
		}
		
		/**
		 * In a single atomic operation, compares an integer value in this byte array with another integer value and, 
		 * if they match, swaps those bytes with another value. 
		 * @param param1
		 * @param param2
		 * @param param3
		 * @return 
		 * 
		 */		
		public atomicCompareAndSwapIntAt (param1 : number, param2 : number, param3 : number) : number
		{
			/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0); param3 = ((param3) >> 0);
			return 0;
		}
		
		/**
		 * In a single atomic operation, compares this byte array's length with a provided value and, if they match, 
		 * changes the length of this byte array. 
		 * @param param1
		 * @param param2
		 * @return 
		 * 
		 */		
		public atomicCompareAndSwapLength (param1 : number, param2 : number) : number
		{ 
			/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0); 
			return 0;
		}
		
		/**
		 * Specifies whether the underlying memory of the byte array is shareable. 
		 * @return 
		 * 
		 */		
		public get shareable () : boolean  { return false }
		public set shareable (param1 : boolean)  { /**/ param1 = Boolean(param1); /**/ }
		
		/**
		 * ВАЖНО
		 * Т.к. это по сути экспорт данных и размер ArrayBuffer больше чем реальные данные,
		 * обрезаем его до нужных размеров.
		 *  
		 * @return 
		 * 
		 */		
		public get buffer () : ArrayBuffer
		{
			return ByteArray.__slice(this._dataView.buffer, 0, this._length);
		}
		
		/*[internal]*/ protected __fromByteArray (bytes : ByteArray, copyOf : boolean = false) : ByteArray
		{
			// bytes = strict(bytes, ByteArray); copyOf = Boolean(copyOf);
			this._length =(( bytes.length) >> 0);
			this._position = 0;
			this._dataView = new DataView(copyOf ? bytes.buffer : bytes._dataView.buffer);
			return this;
		}
		
		/*[internal]*/ protected __fromArrayBuffer (buff : ArrayBuffer, copyOf : boolean = false) : ByteArray
		{
			// buff = strict(buff, ArrayBuffer); copyOf = Boolean(copyOf);
			this._length =(( buff.byteLength) >> 0);
			this._position = 0;
			this._dataView = new DataView(copyOf ? ByteArray.__slice(buff, 0, this._length) : buff);
			return this;
		}
		
		/**
		 * Helpers
		 * http://stackoverflow.com/questions/21440050/arraybuffer-prototype-slice-shim-for-ie
		 *  
		 * @param buff
		 * @param begin
		 * @param end
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected static __slice (buff : ArrayBuffer, begin : number, end : number) : ArrayBuffer
		{
			// buff = strict(buff, ArrayBuffer); begin = (+(begin)); end = (+(end));
			var newbuffer : ArrayBuffer;
			try {
				
				newbuffer = buff.slice(begin, end);
				
			} catch (e  ) {
				
				e = window.asc.e2e(e);
				
				if (end == 0) {
					
					end = buff.byteLength;
					
				}
				
				newbuffer = new ArrayBuffer(end - begin);
				var rb = new Uint8Array(newbuffer);
				var sb = new Uint8Array(buff, begin, end - begin);
				rb.set(sb);
				
			}
			
			return newbuffer;
		}
		
		/*[internal]*/ protected __setLength (v : number) : void
		{
			// v = ((v) >>> 0);
			this._length =(( v) >> 0);
			
			var byteLength = this._dataView.buffer.byteLength;
			if (v == 0) {
				
				this._dataView = new DataView(new ArrayBuffer(0));
				
			} else if (byteLength < v) {
				
				if (!this._fixed) {
					
					if (byteLength == 0) {
						
						v =(( Math.max(ByteArray.ARRAY_BUFFER_LENGTH, v)) >>> 0);
						
					} else {
						
						while (byteLength < v) {
							
							byteLength *= 2;
							
						}
						
						v =(( byteLength) >>> 0);
						
					}
					
				}
				
				var u8 = new Uint8Array(v);
				u8.set(new Uint8Array(this._dataView.buffer));
				this._dataView = new DataView(u8.buffer);
				
			}
		}
		
		/*[internal]*/ protected __beforeWrite (len : number) : void
		{
			// len = ((len) >> 0);
			if (this._position + len > this._length) {
				
				this.__setLength(this._position + len);
				
			}
		}
		
		/*[internal]*/ protected __fixed (value : boolean) : ByteArray
		{
			// value = Boolean(value);
			this._fixed = value;
			return this;
		}
		
		/*[internal]*/ protected __checkTools (algorithm : string) : string
		{
			// algorithm = as(algorithm, 'String');
			switch (algorithm) {
				
				case CompressionAlgorithm.ZLIB:
				case CompressionAlgorithm.DEFLATE:
					if (!window.pako) {
						
						throw new Error('pako lib is not defined');
						
					}
					break;
				
				case CompressionAlgorithm.LZMA:
					if (!window.LZMA) {
						
						throw new Error('lzma lib is not defined');
						
					}
					break;
				
				default:
					throw new Error('invalid algorithm');
					
			}
			
			return algorithm;
		}
		
		/*[internal]*/ protected __compress (algorithm : string) : void
		{
			// algorithm = as(algorithm, 'String');
			var u8Array:Uint8Array = new Uint8Array( this._dataView.buffer, 0, this.length);
			switch (this.__checkTools(algorithm)) {
				
				case CompressionAlgorithm.ZLIB:
					u8Array =strict( window.pako.gzip(u8Array), Uint8Array);
					break;
				
				case CompressionAlgorithm.DEFLATE:
					u8Array =strict( window.pako.deflateRaw(u8Array), Uint8Array);
					break;
				
				case CompressionAlgorithm.LZMA:
					u8Array = new Uint8Array(window.LZMA.compress(u8Array));
					break;
				
			}
			
			this.__fromArrayBuffer(u8Array.buffer);
		}
		
		/*[internal]*/ protected __uncompress (algorithm : string) : void
		{
			// algorithm = as(algorithm, 'String');
			try {
				
				var u8Array:Uint8Array = new Uint8Array( this._dataView.buffer, 0, this.length);
				switch (this.__checkTools(algorithm)) {
					
					case CompressionAlgorithm.ZLIB:
						u8Array =strict( window.pako.ungzip(u8Array), Uint8Array);
						break;
					
					case CompressionAlgorithm.DEFLATE:
						u8Array =strict( window.pako.inflateRaw(u8Array), Uint8Array);
						break;
					
					case CompressionAlgorithm.LZMA:
						u8Array = new Uint8Array(window.LZMA.decompress(u8Array));
						break;
					
				}
				
				this.__fromArrayBuffer(u8Array.buffer);
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				if (this.length) {
					
					throw new IOError('There was an error decompressing the data.', 2058);
					
				}
				
			}
		}
		
		/*[internal]*/ protected __toString (offset : number, length : number) : string
		{ 
			// offset = ((offset) >>> 0); length = ((length) >>> 0); 
			var p = this._position;
			this._position =(( offset) >> 0);
			var r = this.readUTFBytes(length);
			this._position =(( p) >> 0);
			return r;
		}
	}
}