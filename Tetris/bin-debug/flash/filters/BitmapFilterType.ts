/// <reference path="../../base.d.ts" />
﻿
namespace flash.filters
{
	
	/**
	 * The BitmapFilterType class contains values to set the type of a BitmapFilter.
	 * @author pkulikov
	 */
	export  class BitmapFilterType
	{
		/**
		 * Defines the setting that applies a filter to the entire area of an object. 
		 */		
		public static FULL : string = "full";
		
		/**
		 * Defines the setting that applies a filter to the inner area of an object. 
		 */		
		public static INNER : string = "inner";
		
		/**
		 * Defines the setting that applies a filter to the outer area of an object. 
		 */		
		public static OUTER : string = "outer";
	}	
}