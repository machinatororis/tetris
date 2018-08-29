/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The BitmapDataChannel class is an enumeration of constant values that indicate which channel to use: red, blue, green, or alpha 
	 * transparency.
	 * When you call some methods, you can use the bitwise OR operator (|) to combine BitmapDataChannel constants to indicate multiple
	 *  color channels.
	 * 
	 * The BitmapDataChannel constants are provided for use as values in the following:
	 * 
	 * The sourceChannel and destChannel parameters of the flash.display.BitmapData.copyChannel() method
	 * The channelOptions parameter of the flash.display.BitmapData.noise() method
	 * The flash.filters.DisplacementMapFilter.componentX and flash.filters.DisplacementMapFilter.componentY properties
	 * 
	 * @author pkulikov
	 */
	export  class BitmapDataChannel
	{
		/**
		 * The alpha channel.
		 */		
		public static ALPHA : number = 8;

		/**
		 * The blue channel.
		 */
		public static BLUE : number = 4;

		/**
		 * The green channel.
		 */
		public static GREEN : number = 2;

		/**
		 * The red channel.
		 */
		public static RED : number = 1;
	}	
}