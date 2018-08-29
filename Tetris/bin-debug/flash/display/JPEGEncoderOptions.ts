/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The JPEGEncoderOptions class defines a compression algorithm for the flash.display.BitmapData.encode() method.
	 * 
	 * @author pkulikov
	 */
	export  class JPEGEncoderOptions
	{
		/**
		 * A value between 1 and 100, where 1 means the lowest quality and 100 means the highest quality. 
		 */		
		public quality : number = 0;
		
		/**
		 * Creates a JPEGEncoderOptions object with the specified setting. 
		 * @param quality
		 * 
		 */		
		constructor(quality:number = 80)
		{
			/**/ quality = ((quality) >>> 0);
			this.quality = quality;
		}
	}	
}