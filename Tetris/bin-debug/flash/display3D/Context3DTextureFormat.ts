/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for specifying a texture format. 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DTextureFormat
   {
			/**
			 * bgra 
			 */      
      public static BGRA:string = "bgra";
      
			/**
			 * rgba half float 
			 */			
      public static RGBA_HALF_FLOAT:string = "rgbaHalfFloat";
      
			/**
			 * compressed 
			 */			
      public static COMPRESSED:string = "compressed";
      
			/**
			 * compressed alpha 
			 */			
      public static COMPRESSED_ALPHA:string = "compressedAlpha";
      
			/**
			 * 16 bit, bgr packed as 5:6:5 
			 */			
      public static BGR_PACKED:string = "bgrPacked565";
      
			/**
			 * 16 bit, bgra packed as 4:4:4:4 
			 */			
      public static BGRA_PACKED:string = "bgraPacked4444";
   }

}