/// <reference path="../../base.d.ts" />

namespace flash.utils
{
	
	/**
	 * The Endian class contains values that denote the byte order used to represent multibyte numbers. 
	 * The byte order is either bigEndian (most significant byte first) or littleEndian (least significant byte first).
	 * 
	 * Content in Flash Player or Adobe® AIR™ can interface with a server by using the binary protocol of that server, directly. 
	 * Some servers use the bigEndian byte order and some servers use the littleEndian byte order. 
	 * Most servers on the Internet use the bigEndian byte order because "network byte order" is bigEndian. 
	 * The littleEndian byte order is popular because the Intel x86 architecture uses it. 
	 * Use the endian byte order that matches the protocol of the server that is sending or receiving data. 
	 * @author pkulikov
	 * 
	 */	
	export  class Endian
	{
		/**
		 * Indicates the most significant byte of the multibyte number appears first in the sequence of bytes. 
		 */		
		public static BIG_ENDIAN:string = "bigEndian";
		
		/**
		 * Indicates the least significant byte of the multibyte number appears first in the sequence of bytes. 
		 */		
		public static LITTLE_ENDIAN:string = "littleEndian";
	}
}