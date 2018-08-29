/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	/**
	 * Defines the values to use for specifying 3D buffer comparisons in the setDepthTest() and 
	 * setStencilAction() methods of a Context3D instance. 
	 * @author pkulikov
	 * 
	 */	
	export  class Context3DCompareMode
	{
		/**
		 * The comparison always evaluates as true. 
		 */		
		public static ALWAYS:string = "always";
		
		/**
		 * The comparison never evaluates as true. 
		 */		
		public static NEVER:string = "never";
		
		/**
		 * Less than (<). 
		 */		
		public static LESS:string = "less";
		
		/**
		 * Less than or equal (<=). 
		 */		
		public static LESS_EQUAL:string = "lessEqual";
		
		/**
		 * Equal (==). 
		 */		
		public static EQUAL:string = "equal";
		
		/**
		 * Greater than or equal (>=). 
		 */		
		public static GREATER_EQUAL:string = "greaterEqual";
		
		/**
		 * Greater than (>). 
		 */		
		public static GREATER:string = "greater";
		
		/**
		 * Not equal (!=). 
		 */		
		public static NOT_EQUAL:string = "notEqual";
	}

}