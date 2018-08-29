/// <reference path="../../base.d.ts" />
﻿
namespace flash.system
{
	
	/**
	 * The SecurityDomain class represents the current security "sandbox," also known as a security domain. 
	 * By passing an instance of this class to Loader.load(), you can request that loaded media be placed in a particular sandbox.
	 * 
	 * @author pkulikov
	 */
	export  class SecurityDomain
	{
		/**
		 * Gets the current security domain.
		 * @return 
		 * 
		 */		
		public static get currentDomain () : SecurityDomain
		{
			SecurityDomain.sCurrentDomain = SecurityDomain.sCurrentDomain || new SecurityDomain;
			return SecurityDomain.sCurrentDomain;
		}
		
		/**
		 * Helpers 
		 */		
		private static sCurrentDomain:SecurityDomain = null;
	}
}