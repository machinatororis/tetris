/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for specifying the buffer usage type. 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DBufferUsage
   {
			/**
			 * Indicates the buffer will be used for drawing and be updated once This type is the default value for buffers in Stage3D. 
			 */      
      public static STATIC_DRAW:string = "staticDraw";
      
			/**
			 * Indicates the buffer will be used for drawing and be updated frequently 
			 */			
      public static DYNAMIC_DRAW:string = "dynamicDraw";
   }

}