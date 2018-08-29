/// <reference path="../../base.d.ts" />
﻿
namespace flash.system
{
	
	/**
	 * The Security class lets you specify how content in different domains can communicate with each other.
	 * 
	 * @author pkulikov
	 */
	export  class Security
	{
		/**
		 *The file is running in an AIR application, and it was installed with the package (the AIR file) for that application. 
		 */		
		public static APPLICATION : string = "application";

		/**
		 * The file is a local file and has been trusted by the user, using either the Flash Player Settings Manager or a FlashPlayerTrust 
		 * configuration file.
		 */		
		public static LOCAL_TRUSTED : string = "localTrusted";

		/**
		 * The file is a local file, has not been trusted by the user, and it is not a SWF file that was published with 
		 * a networking designation. 
		 */
		public static LOCAL_WITH_FILE : string = "localWithFile";

		/**
		 * The file is a local file, has not been trusted by the user, and it is a SWF file that was published with a networking designation. 
		 */
		public static LOCAL_WITH_NETWORK : string = "localWithNetwork";

		/**
		 * The file is from an Internet URL and operates under domain-based sandbox rules.
		 */
		public static REMOTE : string = "remote";
		
		/**
		 * Determines how Flash Player or AIR chooses the domain to use for certain content settings, including settings 
		 * for camera and microphone permissions, storage quotas, and storage of persistent shared objects. 
		 * @return 
		 * 
		 */		
		public static exactSettings () : boolean
		{
			return false;
		}

		/**
		 * The domain portion of the HTML page containing the swf. 
		 * @return 
		 * 
		 */		
		public static get pageDomain () : string
		{
			return null;
		}

		/**
		 * Indicates the type of security sandbox in which the calling file is operating. 
		 * @return 
		 * 
		 */		
		public static get sandboxType () : string
		{
			return Security.APPLICATION;
		}
			
		/**
		 * Lets SWF files in the identified domains access objects and variables in the SWF file that contains the allowDomain() call. 
		 * @param domains
		 * 
		 */		
		public static allowDomain(... domains):void
		{
			
		}
		
		/**
		 * Lets SWF files and HTML files in the identified domains access objects and variables in the calling SWF file, 
		 * which is hosted by means of the HTTPS protocol. 
		 * @param domains
		 * 
		 */		
		public static allowInsecureDomain(... domains):void
		{
			
		}
		
		/**
		 * Looks for a policy file at the location specified by the url parameter. 
		 * @param url
		 * 
		 */		
		public static loadPolicyFile(url:string):void
		{
			
		/**/ url = as(url, 'String');
			
		}
		
		/**
		 * Displays the Security Settings panel in Flash Player. 
		 * @param panel
		 * 
		 */		
		public static showSettings(panel:string = "default"):void
		{
			
		/**/ panel = as(panel, 'String');
			
		}
	}	
}