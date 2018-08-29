/// <reference path="../../base.d.ts" />
﻿
namespace flash.system
{
	
	/**
	 * The ImageDecodingPolicy class provides values for imageDecodingPolicy in the LoaderContext class.
	 * 
	 * @author pkulikov
	 */
	export  class ImageDecodingPolicy
	{
		/**
		 * Constant; specifies that the image being loaded will be decoded when needed and that the decoded data may be flushed at 
		 * will by the system. 
		 */		
		public static ON_DEMAND : string = "onDemand";

		/**
		 * Constant; specifies that the image being loaded will be decoded on load, prior to the complete event being sent. 
		 */		
		public static ON_LOAD : string = "onLoad";
	}	
}