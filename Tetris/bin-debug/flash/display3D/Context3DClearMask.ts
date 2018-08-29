/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for specifying Context3D clear masks. 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DClearMask
   {
			/**
			 * Clear only the color buffer. 
			 */      
      public static COLOR:number = 1 << 0;
      
			/**
			 * Clear only the depth buffer. 
			 */			
      public static DEPTH:number = 1 << 1;
      
			/**
			 * Clear only the stencil buffer. 
			 */			
      public static STENCIL:number = 1 << 2;
      
			/**
			 * Clear all buffers. 
			 */			
      public static ALL:number = asc.sti(Context3DClearMask,()=>{ Context3DClearMask.ALL = Context3DClearMask.COLOR | Context3DClearMask.DEPTH | Context3DClearMask.STENCIL; });
   }
}