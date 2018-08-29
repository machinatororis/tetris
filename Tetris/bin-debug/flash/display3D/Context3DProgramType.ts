/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for specifying whether a shader program is a fragment or a vertex program. 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DProgramType
   {
			/**
			 * A vertex program. 
			 */      
      public static VERTEX:string = "vertex";
      
			/**
			 * A fragment (or pixel) program. 
			 */			
      public static FRAGMENT:string = "fragment";
   }

}