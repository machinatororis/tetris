/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The JPEGXREncoderOptions class defines a compression algorithm for the flash.display.BitmapData.encode() method.
	 * 
	 * @author pkulikov
	 */
	export  class JPEGXREncoderOptions
	{
		/**
		 * Specifies how color channels are sampled. 
		 */		
		public colorSpace : string = null;

		/**
		 * Specifies the amount of lossy in the compression. 
		 */		
		public quantization : number = 0;

		/**
		 * Determines the amount of extra entropy data that is cut after quantization. 
		 */		
		public trimFlexBits : number = 0;
		
		/**
		 * Creates a JPEGEXREncoderOptions object with the specified settings. 
		 * @param quantization
		 * @param colorSpace
		 * @param trimFlexBits
		 * 
		 */		
		constructor(quantization:number = 20, colorSpace:string = "auto", trimFlexBits:number = 0)
		{
			/**/ quantization = ((quantization) >>> 0); colorSpace = as(colorSpace, 'String'); trimFlexBits = ((trimFlexBits) >>> 0);
			this.quantization = quantization;
			this.colorSpace = colorSpace;
			this.trimFlexBits = trimFlexBits;
		}
	}	
}