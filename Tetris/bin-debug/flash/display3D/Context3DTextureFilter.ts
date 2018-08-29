/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for sampler filter mode. 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DTextureFilter
   {
			/**
			 * Use nearest neighbor sampling when upsampling textures	(gives a pixelated, sharp mosaic look). 
			 */      
      public static NEAREST:string = "nearest";
      
			/**
			 * Use linear interpolation when upsampling textures (gives a smooth, blurry look). 
			 */			
      public static LINEAR:string = "linear";
      
			/**
			 * Use anisotropic filter with radio 2 when upsampling textures 
			 */			
      public static ANISOTROPIC2X:string = "anisotropic2x";
      
			/**
			 * Use anisotropic filter with radio 4 when upsampling textures 
			 */			
      public static ANISOTROPIC4X:string = "anisotropic4x";
      
			/**
			 * Use anisotropic filter with radio 8 when upsampling textures 
			 */			
      public static ANISOTROPIC8X:string = "anisotropic8x";
      
			/**
			 * Use anisotropic filter with radio 16 when upsampling textures 
			 */			
      public static ANISOTROPIC16X:string = "anisotropic16x";
   }

}