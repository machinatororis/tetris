/// <reference path="../../base.d.ts" />
﻿
namespace flash.display
{
	
	/**
	 * The ActionScriptVersion class is an enumeration of constant values that indicate the language version of a loaded SWF file. 
	 * The language version constants are provided for use in checking the actionScriptVersion property of a flash.display.LoaderInfo object.
	 * @author pkulikov
	 */
	export  class ActionScriptVersion
	{
		/**
		 * ActionScript language version 2.0 and earlier. 
		 */		
		public static ACTIONSCRIPT2 : number = 2;
			
		/**
		 * ActionScript language version 3.0. 
		 */			
		public static ACTIONSCRIPT3 : number = 3;
	}	
}