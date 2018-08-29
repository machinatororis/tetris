/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for sampler mipmap filter mode 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DMipFilter
   {
			/**
			 * Always use the top level texture (has a performance penalty when downscaling). 
			 */      
      public static MIPNONE:string = "mipnone";
      
			/**
			 * Use the nearest neighbor metric to select MIP levels (the fastest rendering method). 
			 */			
      public static MIPNEAREST:string = "mipnearest";
      
			/**
			 * Select the two closest MIP levels and linearly blend between them (the highest quality mode, but has some performance cost). 
			 */			
      public static MIPLINEAR:string = "miplinear";
   }

}