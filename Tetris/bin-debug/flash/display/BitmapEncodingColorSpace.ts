/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The BitmapEncodingColorSpace class defines the constants that specify how color channels are sampled by the 
	 * flash.display.BitmapData.encode() method when specifying the compressor as flash.display.JPEGXREncoderOptions.
	 * For more information on these constants, see http://en.wikipedia.org/wiki/Chroma_subsampling.
	 * 
	 * @author pkulikov
	 */
	export  class BitmapEncodingColorSpace
	{
		/**
		 * Specifies a subsampling scheme of 4:2:0.
		 */		
		public static COLORSPACE_4_2_0 : string = "4:2:0";

		/**
		 * Specifies a subsampling scheme of 4:2:2.
		 */
		public static COLORSPACE_4_2_2 : string = "4:2:2";

		/**
		 * Specifies a subsampling scheme of 4:4:4.
		 */
		public static COLORSPACE_4_4_4 : string = "4:4:4";

		/**
		 * Specifies a subsampling scheme of auto.
		 */
		public static COLORSPACE_AUTO : string = "auto";
	}	
}