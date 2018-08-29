/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The PixelSnapping class is an enumeration of constant values for setting the pixel snapping options by using the 
	 * pixelSnapping property of a Bitmap object.
	 * 
	 * @author pkulikov
	 */
	export  class PixelSnapping
	{
		/**
		 * A constant value used in the pixelSnapping property of a Bitmap object to specify that the bitmap image is always 
		 * snapped to the nearest pixel, independent of any transformation. 
		 */		
		public static ALWAYS : string = "always";

		/**
		 * A constant value used in the pixelSnapping property of a Bitmap object to specify that the bitmap image is snapped to 
		 * the nearest pixel if it is drawn with no rotation or skew and it is drawn at a scale factor of 99.9% to 100.1%. 
		 */		
		public static AUTO : string = "auto";

		/**
		 * A constant value used in the pixelSnapping property of a Bitmap object to specify that no pixel snapping occurs. 
		 */		
		public static NEVER : string = "never";
	}	
}