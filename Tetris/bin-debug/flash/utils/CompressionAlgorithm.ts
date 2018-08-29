/// <reference path="../../base.d.ts" />
﻿
namespace flash.utils
{
	
	/**
	 * The CompressionAlgorithm class defines string constants for the names of compress and uncompress options. 
	 * These constants are used as values of the algorithm parameter of the ByteArray.compress() and ByteArray.uncompress() methods.
	 */
	export  class CompressionAlgorithm
	{
		/**
		 * Defines the string to use for the deflate compression algorithm. 
		 */		
		public static DEFLATE : string = "deflate";
			
		/**
		 * Defines the string to use for the lzma compression algorithm. 
		 */			
		public static LZMA : string = "lzma";
			
		/**
		 * Defines the string to use for the zlib compression algorithm. 
		 */			
		public static ZLIB : string = "zlib";
	}	
}