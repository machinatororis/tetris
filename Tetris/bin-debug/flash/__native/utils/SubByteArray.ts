/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/ByteArray.ts" />

namespace flash.__native.utils
{
	
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class SubByteArray extends ByteArray
	{
		/*[internal]*/ protected _array : ByteArray;
		/*[internal]*/ protected _start : number;
		/*[internal]*/ protected _end : number;
		
		/*[internal]*/ constructor (array : ByteArray, start : number = 0, end : number = 0)
		{
			// array = strict(array, ByteArray); start = ((start) >>> 0); end = ((end) >>> 0);
			/**/ this._start === void 0 && (this._start = 0);
			/**/ this._end === void 0 && (this._end = 0);
			if (!array) {
				
				super ();
				return;
				
			}
			
			// without self dataView and arrayBuffer
			super (false);
			
			this._array = array;
			this._start = start;
			this._end = end;
			this._length =(( this._end - this._start) >> 0);
			this._fixed = true;
		}
		
		/*override*/ public get (index : number) : number
		{
			/**/ index = ((index) >> 0);
			if (!this._array) {
				
				return super.get (index);
				
			}
			
			return this._array.get (this._start + index);
		}
		
		/*override*/ public set (index : number, v : number) : void
		{
			/**/ index = ((index) >> 0); v = ((v) >> 0);
			if (!this._array) {
				
				super.set (index, v);
				return;
				
			}
			
			this._array.set (this._start + index, v);
		}
		
		/*override*/ public readBytes (b : ByteArray, offset : number = 0, length : number = 0) : void
		{
			/**/ b = strict(b, ByteArray); offset = ((offset) >>> 0); length = ((length) >>> 0);
			if (!this._array) {
				
				super.readBytes (b, offset, length);
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.readBytes (b, offset, length);
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeBytes (bytes : ByteArray, offset : number = 0, length : number = 0) : void
		{
			/**/ bytes = strict(bytes, ByteArray); offset = ((offset) >>> 0); length = ((length) >>> 0);
			if (!this._array) {
				
				super.writeBytes(bytes, offset, length);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeBytes (bytes, offset, length);
			this._position += p - this._array._position;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeBoolean (v : boolean) : void
		{
			/**/ v = Boolean(v);
			if (!this._array) {
				
				super.writeBoolean (v);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeBoolean (v);
			this._position++;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeByte (v : number) : void
		{
			/**/ v = ((v) >> 0);
			if (!this._array) {
				
				super.writeByte (v);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeByte (v);
			this._position++;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeShort (v : number) : void
		{
			/**/ v = ((v) >> 0);
			if (!this._array) {
				
				super.writeShort (v);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeShort (v);
			this._position += 2;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeInt (v : number) : void
		{
			/**/ v = ((v) >> 0);
			if (!this._array) {
				
				super.writeInt (v);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeInt (v);
			this._position += 4;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeUnsignedInt (v : number) : void
		{
			/**/ v = ((v) >>> 0);
			if (!this._array) {
				
				super.writeUnsignedInt (v);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeUnsignedInt (v);
			this._position += 4;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeFloat (v : number) : void
		{
			/**/ v = (+(v));
			if (!this._array) {
				
				super.writeFloat (v);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeFloat (v);
			this._position += 4;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeDouble (v : number) : void
		{
			/**/ v = (+(v));
			if (!this._array) {
				
				super.writeDouble (v);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeDouble (v);
			this._position += 8;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeMultiByte (str : string, charSet : string) : void
		{
			/**/ str = as(str, 'String'); charSet = as(charSet, 'String');
			if (!this._array) {
				
				super.writeMultiByte (str, charSet);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeMultiByte (str, charSet);
			this._position += p - this._array._position;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public writeUTF (v : string) : void
		{
			/**/ v = as(v, 'String');
			if (!this._array) {
				
				super.writeUTF (v);
				return;
				
			}
			
			if (this._position == this._length) {
				
				return;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			this._array.writeUTF (v);
			this._position += p - this._array._position;
			this._array._position =(( p) >> 0);
		}
		
		/*override*/ public readBoolean () : boolean
		{
			if (!this._array) {
				
				return super.readBoolean ();
				
			}
			
			if (this._position == this._length) {
				
				return false;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readBoolean ();
			this._position++;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readByte () : number
		{
			if (!this._array) {
				
				return super.readByte ();
				
			}
			
			if (this._position == this._length) {
				
				return 0;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readByte ();
			this._position++;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readUnsignedByte () : number
		{
			if (!this._array) {
				
				return super.readUnsignedByte ();
				
			}
			
			if (this._position == this._length) {
				
				return 0;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readUnsignedByte ();
			this._position++;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readShort () : number
		{
			if (!this._array) {
				
				return super.readShort ();
				
			}
			
			if (this._position == this._length) {
				
				return 0;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readShort ();
			this._position += 2;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readUnsignedShort () : number
		{
			if (!this._array) {
				
				return super.readUnsignedShort ();
				
			}
			
			if (this._position == this._length) {
				
				return 0;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readUnsignedShort ();
			this._position += 2;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readInt () : number
		{
			if (!this._array) {
				
				return super.readInt ();
				
			}
			
			if (this._position == this._length) {
				
				return 0;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readInt ();
			this._position += 4;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readUnsignedInt () : number
		{
			if (!this._array) {
				
				return super.readUnsignedInt ();
				
			}
			
			if (this._position == this._length) {
				
				return 0;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readUnsignedInt ();
			this._position += 4;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readFloat () : number
		{
			if (!this._array) {
				
				return super.readFloat ();
				
			}
			
			if (this._position == this._length) {
				
				return 0;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readFloat ();
			this._position += 4;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readDouble () : number
		{
			if (!this._array) {
				
				return super.readDouble ();
				
			}
			
			if (this._position == this._length) {
				
				return 0;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readDouble ();
			this._position += 8;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public readMultiByte (length : number, charSet : string) : string
		{
			/**/ length = ((length) >>> 0); charSet = as(charSet, 'String');
			if (!this._array) {
				
				return super.readMultiByte (length, charSet);
				
			}
			
			if (this._position == this._length) {
				
				return null;
				
			}
			
			var p = this._array._position;
			this._array._position =(( this._start + this._position) >> 0);
			var r = this._array.readMultiByte (length, charSet);
			this._position += p - this._array._position;
			this._array._position =(( p) >> 0);
			return r;
		}
		
		/*override*/ public writeObject (object : any) : void
		{
			if (!this._array) {
				
				super.writeObject (object);
				return;
				
			}
			
			throw new Error('Not supported');
		}
		
		/*override*/ public readObject () : any
		{
			if (!this._array) {
				
				return super.readObject ();
				
			}
			
			throw new Error('Not supported');
		}
		
		/*override*/ public toString () : string
		{
			if (!this._array) {
				
				return super.toString ();
				
			}
			
			return this.__toString (this._start, this._length);
		}
		
		/*override*/ public clear () : void
		{
			if (!this._array) {
				
				super.clear ();
				return;
				
			}
			
			this._position = 0;
			new Uint8Array(this._array._dataView.buffer).fill(0, this._start, this._end);
		}
		
		/*override*/ public get buffer () : ArrayBuffer
		{
			if (!this._array) {
				
				return this.super('flash.utils.ByteArray', 'buffer') ();
				
			}
			
			return ByteArray.__slice(this._array._dataView.buffer, this._start, this._end);
		}
		
		/*[internal]*/ /*override*/ protected __fromByteArray (bytes : ByteArray, copyOf : boolean = false) : ByteArray
		{
			// bytes = strict(bytes, ByteArray); copyOf = Boolean(copyOf);
			if (!this._array) {
				
				return super.__fromByteArray (bytes, copyOf);
				
			}
			
			throw new Error('Not supported');
		}
		
		/*[internal]*/ /*override*/ protected __fromArrayBuffer (buff : ArrayBuffer, copyOf : boolean = false) : ByteArray
		{
			// buff = strict(buff, ArrayBuffer); copyOf = Boolean(copyOf);
			if (!this._array) {
				
				return super.__fromArrayBuffer (buff, copyOf);
				
			}
			
			throw new Error('Not supported');
		}
		
		/*[internal]*/ /*override*/ protected __setLength (v : number) : void
		{
			// v = ((v) >>> 0);
			if (!this._array) {
				
				super.__setLength (v);
				return;
				
			}
			
			if (v > this._length) {
				
				throw new RangeError;
				
			}
			
			this._end =(( this._start + v) >>> 0);
			this._length =(( this._end - this._start) >> 0);
			
			if (this._position > this._length) {
				
				this._position = this._length;
				
			}
		}
		
		/*[internal]*/ /*override*/ protected __beforeWrite (len : number) : void
		{
			// len = ((len) >> 0);
			if (!this._array) {
				
				super.__beforeWrite (len);
				return;
				
			}
			
			// nothing to do
		}
		
		/*[internal]*/ /*override*/ protected __fixed (value : boolean) : ByteArray
		{
			// value = Boolean(value);
			if (!this._array) {
				
				super.__fixed (value);
				return;
				
			}
			
			// allways fixed
			return this;
		}
		
		/*[internal]*/ /*override*/ protected __compress (algorithm : string) : void
		{
			// algorithm = as(algorithm, 'String');
			if (!this._array) {
				
				super.__compress (algorithm);
				return;
				
			}
			
			throw new Error('Not supported');
		}
		
		/*[internal]*/ /*override*/ protected __uncompress (algorithm : string) : void
		{
			// algorithm = as(algorithm, 'String');
			if (!this._array) {
				
				super.__uncompress (algorithm);
				return;
				
			}
			
			throw new Error('Not supported');
		}
	}
}