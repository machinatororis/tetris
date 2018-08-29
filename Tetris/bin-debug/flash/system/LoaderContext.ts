/// <reference path="../../base.d.ts" />
/// <reference path="../display/DisplayObjectContainer.ts" />

namespace flash.system 
{
	export import DisplayObjectContainer = flash.display.DisplayObjectContainer;
	

	/**
	 * The LoaderContext class provides options for loading SWF files and other media by using the Loader class. 
	 * The LoaderContext class is used as the context parameter in the load() and loadBytes() methods of the Loader class.
	 * When loading SWF files with the Loader.load() method, you have two decisions to make: into which security domain the loaded SWF file 
	 * should be placed, and into which application domain within that security domain? For more details on these choices, 
	 * see the applicationDomain and securityDomain properties.
	 * 
	 * When loading a SWF file with the Loader.loadBytes() method, you have the same application domain choice to make as for Loader.load(), 
	 * but it's not necessary to specify a security domain, because Loader.loadBytes() always places its loaded SWF file into the security 
	 * domain of the loading SWF file.
	 * 
	 * When loading images (JPEG, GIF, or PNG) instead of SWF files, there is no need to specify a SecurityDomain or an application domain, 
	 * because those concepts are meaningful only for SWF files. Instead, you have only one decision to make: do you need programmatic 
	 * access to the pixels of the loaded image? If so, see the checkPolicyFile property. 
	 * If you want to apply deblocking when loading an image, use the JPEGLoaderContext class instead of the LoaderContext class.
	 * @author pkulikov
	 * 
	 */	
	export  class LoaderContext 
	{
		/**
		 * Specifies whether you can use a Loader object to import content with executable code, 
		 * such as a SWF file, into the caller's security sandbox. 
		 */		
		public allowCodeImport : boolean = false;

		/**
		 * Legacy property, replaced by allowCodeImport, but still supported for compatibility. 
		 */		
		public allowLoadBytesCodeExecution : boolean = false;

		/**
		 * Specifies the application domain to use for the Loader.load() or Loader.loadBytes() method. 
		 */		
		public applicationDomain : ApplicationDomain = null;

		/**
		 * Specifies whether the application should attempt to download a URL policy file from the loaded object's server before 
		 * beginning to load the object itself. 
		 */			
		public checkPolicyFile : boolean = false;
	
		/**
		 * Specifies whether to decode bitmap image data when it is used or when it is loaded. 
		 */		
		public imageDecodingPolicy : string = null;
	
		/**
		 * An Object containing the parameters to pass to the LoaderInfo object of the content. 
		 */		
		public parameters : any = null;
	
		/**
		 * The parent to which the Loader will attempt to add the loaded content. 
		 */		
		public requestedContentParent : DisplayObjectContainer = null;

		/**
		 * Specifies the security domain to use for a Loader.load() operation. 
		 */		
		public securityDomain : SecurityDomain = null;
		
		/**
		 * Creates a new LoaderContext object, with the specified settings. 
		 * @param checkPolicyFile
		 * @param applicationDomain
		 * @param securityDomain
		 * 
		 */		
		constructor(checkPolicyFile:boolean = false, applicationDomain:ApplicationDomain = null, securityDomain:SecurityDomain = null) 
		{
			/**/ checkPolicyFile = Boolean(checkPolicyFile); applicationDomain = strict(applicationDomain, ApplicationDomain); securityDomain = strict(securityDomain, SecurityDomain);
			this.checkPolicyFile = checkPolicyFile;
			this.applicationDomain = applicationDomain;
			this.securityDomain = securityDomain;
		}
	}
}