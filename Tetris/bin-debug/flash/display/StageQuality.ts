/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * The StageQuality class provides values for the Stage.quality property and for the value of the quality parameter to the 
	 * BitmapData.drawWithQuality() method.
	 * Higher quality settings produce better rendering of scaled bitmaps. However, higher quality settings are computationally more expensive.
	 *  In particular, when rendering scaled video, using higher quality settings can reduce the frame rate.
	 * 
	 * In the desktop profile of Adobe AIR, quality can be set to StageQuality.BEST or StageQuality.HIGH 
	 * (and the default value is StageQuality.HIGH). Attempting to set it to another value has no effect (and the property remains unchanged). 
	 * In the moble profile of AIR, all four quality settings are available. The default value on mobile devices is StageQuality.MEDIUM.
	 * 
	 * For content running in Adobe AIR, setting the quality property of one Stage object changes the rendering quality for all 
	 * Stage objects (used by different NativeWindow objects).
	 * 
	 * Note: The operating system draws the device fonts, which are therefore unaffected by the quality property. 
	 * @author pkulikov
	 * 
	 */	
	export  class StageQuality
	{
		/**
		 * Specifies low rendering quality. 
		 */		
		public static LOW:string = "low";
		
		/**
		 * Specifies medium rendering quality. 
		 */		
		public static MEDIUM:string = "medium";
		
		/**
		 * Specifies high rendering quality. 
		 */		
		public static HIGH:string = "high";
		
		/**
		 * Specifies very high rendering quality. 
		 */		
		public static BEST:string = "best";
		
		/**
		 * Specifies very high rendering quality. 
		 */		
		public static HIGH_8X8:string = "8x8";
		
		/**
		 * Specifies very high rendering quality. 
		 */		
		public static HIGH_8X8_LINEAR:string = "8x8linear";
		
		/**
		 * Specifies very high rendering quality. 
		 */		
		public static HIGH_16X16:string = "16x16";
		
		/**
		 * Specifies very high rendering quality. 
		 */		
		public static HIGH_16X16_LINEAR:string = "16x16linear";
	}
}