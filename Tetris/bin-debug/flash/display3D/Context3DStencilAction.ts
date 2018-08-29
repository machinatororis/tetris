/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for specifying stencil actions.
	  * A stencil action specifies how the values in the stencil buffer should be changed. 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DStencilAction
   {
			/**
			 * Keep the current stencil buffer value. 
			 */      
      public static KEEP:string = "keep";
      
			/**
			 * Set the stencil buffer value to 0. 
			 */			
      public static ZERO:string = "zero";
      
			/**
			 * Increment the stencil buffer value, clamping at 255, the maximum value. 
			 */			
      public static INCREMENT_SATURATE:string = "incrementSaturate";
      
			/**
			 * Decrement the stencil buffer value, clamping at 0, the minimum value. 
			 */			
      public static DECREMENT_SATURATE:string = "decrementSaturate";
      
			/**
			 * Invert the stencil buffer value, bitwise. 
			 */			
      public static INVERT:string = "invert";
      
			/**
			 * Increment the stencil buffer value. 
			 */			
      public static INCREMENT_WRAP:string = "incrementWrap";
      
			/**
			 * Decrement the stencil buffer value. 
			 */			
      public static DECREMENT_WRAP:string = "decrementWrap";
      
			/**
			 * Replace the stencil buffer value with the reference value. 
			 */			
      public static SET:string = "set";
   }

}