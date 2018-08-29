/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for specifying the Context3D profile. 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DProfile
   {
			/**
			 * Use the default feature support profile. 
			 */      
      public static BASELINE:string = "baseline";
      
			/**
			 * Use a constrained feature support profile to target older GPUs This profile is primarily targeted at 
			 * devices that only support PS_2.0 level shaders like the Intel GMA 9xx series. 
			 */			
      public static BASELINE_CONSTRAINED:string = "baselineConstrained";
      
			/**
			 * Use an extended feature support profile to target newer GPUs which support larger textures This profile 
			 * increases the maximum 2D Texture and RectangleTexture size to 4096x4096 
			 */			
      public static BASELINE_EXTENDED:string = "baselineExtended";
      
			/**
			 * Use an standard profile to target GPUs which support MRT, AGAL2 and float textures. 
			 */			
      public static STANDARD:string = "standard";
      
			/**
			 * Use an standard profile to target GPUs which support AGAL2 and float textures. 
			 */			
      public static STANDARD_CONSTRAINED:string = "standardConstrained";
      
			/**
			 * Use standard extended profile to target GPUs which support AGAL3 and instanced drawing feature. 
			 */			
      public static STANDARD_EXTENDED:string = "standardExtended";
   }

}