
namespace flash.utils
{
	
	/**
	 * The IDataInput interface provides a set of methods for reading binary data. This interface is the I/O counterpart to the IDataOutput 
	 * interface, which writes binary data.
	 * All IDataInput and IDataOutput operations are "bigEndian" by default (the most significant byte in the sequence is stored at the 
	 * lowest or first storage address), and are nonblocking. If insufficient data is available, an EOFError exception is thrown. 
	 * Use the IDataInput.bytesAvailable property to determine how much data is available to read.
	 * 
	 * Sign extension matters only when you read data, not when you write it. Therefore you do not need separate write methods to work with 
	 * IDataInput.readUnsignedByte() and IDataInput.readUnsignedShort(). In other words:
	 * 
	 * Use IDataOutput.writeByte() with IDataInput.readUnsignedByte() and IDataInput.readByte().
	 * Use IDataOutput.writeShort() with IDataInput.readUnsignedShort() and IDataInput.readShort().
	 * 
	 * @author pkulikov
	 */
	export  interface IDataInput
	{
		/**
		 * Returns the number of bytes of data available for reading in the input buffer. 
		 * @return 
		 * 
		 */		
		bytesAvailable : number;

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
		 * Reads a Boolean value from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readBoolean():boolean;
		
		/**
		 * Reads a signed byte from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readByte():number;
		
		/**
		 * Reads the number of data bytes, specified by the length parameter, from the file stream, byte stream, or byte array. 
		 * @param bytes
		 * @param offset
		 * @param length
		 * 
		 */		
		readBytes(bytes:ByteArray, offset:number, length:number):void;
		
		/**
		 * Reads an IEEE 754 double-precision floating point number from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readDouble():number;
		
		/**
		 * Reads an IEEE 754 single-precision floating point number from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readFloat():number;
		
		/**
		 * Reads a signed 32-bit integer from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readInt():number;
		
		/**
		 * Reads a multibyte string of specified length from the file stream, byte stream, or byte array using the specified character set. 
		 * @param length
		 * @param charSet
		 * @return 
		 * 
		 */		
		readMultiByte(length:number, charSet:string):string;
		
		/**
		 * Reads an object from the file stream, byte stream, or byte array, encoded in AMF serialized format. 
		 * @return 
		 * 
		 */		
		readObject():any;
		
		/**
		 * Reads a signed 16-bit integer from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readShort():number;
		
		/**
		 * Reads an unsigned byte from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readUnsignedByte():number;
		
		/**
		 * Reads an unsigned 32-bit integer from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readUnsignedInt():number;
		
		/**
		 * Reads an unsigned 16-bit integer from the file stream, byte stream, or byte array. 
		 * @return 
		 * 
		 */		
		readUnsignedShort():number;
		
		/**
		 * Reads a UTF-8 string from the file stream, byte stream, or byte array.
		 * @return 
		 * 
		 */		
		readUTF():string;
		
		/**
		 * Reads a sequence of UTF-8 bytes from the byte stream or byte array and returns a string. 
		 * @param length
		 * @return 
		 * 
		 */		
		readUTFBytes(length:number):string;
	}	
}