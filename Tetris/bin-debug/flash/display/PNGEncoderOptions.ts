/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The PNGEncoderOptions class defines a compression algorithm for the flash.display.BitmapData.encode() method.
	 * 
	 * @author pkulikov
	 */
	export  class PNGEncoderOptions
	{
		/**
		 * Chooses compression speed over file size. 
		 */		
		public fastCompression : boolean = false;
		
		/**
		 * Creates a PNGEncoderOptions object, optionally specifying compression settings. 
		 * @param fastCompression
		 * 
		 */			
		constructor(fastCompression:boolean = false)
		{
			/**/ fastCompression = Boolean(fastCompression);
			this.fastCompression = fastCompression;
		}
	}	
}