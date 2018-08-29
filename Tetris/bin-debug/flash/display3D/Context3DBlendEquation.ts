/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	/**
	 * The blend equation determines how a new pixel is combined with a pixel already in the WebGLFramebuffer. 
	 * @author pkulikov
	 * 
	 */	
	export  class Context3DBlendEquation
	{
		/**
		 * Source + destination.
		 */		
		public static ADD:string = "add";
		
		/**
		 * Source - destination.
		 */		
		public static SUBTRACT:string = "subtract";
		
		/**
		 * Destination - source.
		 */		
		public static REVERSE_SUBTRACT:string = "reverseSubtract";
		
		/**
		 * Minimum of source and destination.
		 * WebGL 2 context or EXT_blend_minmax extension.
		 */		
		public static MIN:string = "min";
		
		/**
		 * Maximum of source and destination.
		 * WebGL 2 context or EXT_blend_minmax extension.
		 */		
		public static MAX:string = "max";
	}
}