
namespace flash.utils
{
	
	/**
	 * The IDataOutput interface provides a set of methods for writing binary data. This interface is the I/O counterpart to the 
	 * IDataInput interface, which reads binary data. The IDataOutput interface is implemented by the FileStream, Socket and ByteArray classes.
	 * All IDataInput and IDataOutput operations are "bigEndian" by default (the most significant byte in the sequence is stored at 
	 * the lowest or first storage address), and are nonblocking.
	 * 
	 * Sign extension matters only when you read data, not when you write it. Therefore, you do not need separate write methods to work 
	 * with IDataInput.readUnsignedByte() and IDataInput.readUnsignedShort(). In other words:
	 * 
	 * Use IDataOutput.writeByte() with IDataInput.readUnsignedByte() and IDataInput.readByte().
	 * Use IDataOutput.writeShort() with IDataInput.readUnsignedShort() and IDataInput.readShort().
	 * 
	 * @author pkulikov
	 */
	export  interface IDataOutput
	{
		/**
		 * The byte order for the data, either the BIG_ENDIAN or LITTLE_ENDIAN constant from the Endian class. 
		 */		
		endian: string;
		/*function set endian (value:String): void;*/

		/**
		 * Used to determine whether the AMF3 or AMF0 format is used when writing or reading binary data using the readObject() method. 
		 */		
		objectEncoding : number;
		/*function set objectEncoding (value:uint): void;*/
		
		/**
		 * Writes a Boolean value. 
		 * @param value
		 * 
		 */		
		writeBoolean(value:boolean):void;

		/**
		 * Writes a byte. 
		 * @param value
		 * 
		 */		
		writeByte(value:number):void;

		/**
		 * Writes a sequence of bytes from the specified byte array, bytes, starting at the byte specified by offset 
		 * (using a zero-based index) with a length specified by length, into the file stream, byte stream, or byte array. 
		 * @param bytes
		 * @param offset
		 * @param length
		 * 
		 */		
		writeBytes(bytes:ByteArray, offset:number, length:number):void;

		/**
		 * Writes an IEEE 754 double-precision (64-bit) floating point number. 
		 * @param value
		 * 
		 */		
		writeDouble(value:number):void;

		/**
		 * Writes an IEEE 754 single-precision (32-bit) floating point number. 
		 * @param value
		 * 
		 */		
		writeFloat(value:number):void;

		/**
		 * Writes a 32-bit signed integer. 
		 * @param value
		 * 
		 */		
		writeInt(value:number):void;

		/**
		 * Writes a multibyte string to the file stream, byte stream, or byte array, using the specified character set. 
		 * @param value
		 * @param charSet
		 * 
		 */		
		writeMultiByte(value:string, charSet:string):void;

		/**
		 * Writes an object to the file stream, byte stream, or byte array, in AMF serialized format. 
		 * @param object
		 * 
		 */		
		writeObject(object:any):void;

		/**
		 * Writes a 16-bit integer. 
		 * @param value
		 * 
		 */		
		writeShort(value:number):void;
	
		/**
		 * Writes a 32-bit unsigned integer. 
		 * @param value
		 * 
		 */		
		writeUnsignedInt(value:number):void;

		/**
		 * Writes a UTF-8 string to the file stream, byte stream, or byte array. 
		 * @param value
		 * 
		 */		
		writeUTF(value:string):void;

		/**
		 * Writes a UTF-8 string. 
		 * @param value
		 * 
		 */		
		writeUTFBytes(value:string):void;
	}	
}