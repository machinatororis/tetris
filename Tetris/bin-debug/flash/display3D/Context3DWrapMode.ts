/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for sampler wrap mode 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DWrapMode
   {
			/**
			 * Repeat (tile) texture coordinates outside the 0..1 range. 
			 */      
      public static REPEAT:string = "repeat";
      
			/**
			 * Clamp texture coordinates outside the 0..1 range. 
			 */			
      public static CLAMP:string = "clamp";
      
			/**
			 * Clamp in U axis but Repeat in V axis. 
			 */			
      public static CLAMP_U_REPEAT_V:string = "clamp_u_repeat_v";
      
			/**
			 * Repeat in U axis but Clamp in V axis. 
			 */			
      public static REPEAT_U_CLAMP_V:string = "repeat_u_clamp_v";
   }

}