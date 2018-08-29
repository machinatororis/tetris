/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
﻿
namespace flash.system
{
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The ApplicationDomain class is a container for discrete groups of class definitions. Application domains are used to partition 
	 * classes that are in the same security domain. They allow multiple definitions of the same class to exist and allow children to 
	 * reuse parent definitions.
	 * Application domains are used when an external SWF file is loaded through the Loader class. All ActionScript 3.0 definitions in 
	 * the loaded SWF file are stored in the application domain, which is specified by the applicationDomain property of the LoaderContext 
	 * object that you pass as a context parameter of the Loader object's load() or loadBytes() method. The LoaderInfo object also contains 
	 * an applicationDomain property, which is read-only.
	 * 
	 * All code in a SWF file is defined to exist in an application domain. The current application domain is where your main application runs.
	 * The system domain contains all application domains, including the current domain, which means that it contains all Flash Player classes.
	 * 
	 * Every application domain, except the system domain, has an associated parent domain. The parent domain of your main application's 
	 * application domain is the system domain. Loaded classes are defined only when their parent doesn't already define them. 
	 * You cannot override a loaded class definition with a newer definition.
	 * 
	 * For usage examples of application domains, see the ActionScript 3.0 Developer's Guide.
	 * 
	 * The ApplicationDomain() constructor function allows you to create an ApplicationDomain object.
	 * 
	 * @author pkulikov
	 */
	export  class ApplicationDomain
	{
		/**
		 * Gets the current application domain in which your code is executing. 
		 * @return 
		 * 
		 */		
		public static get currentDomain () : ApplicationDomain
		{
			ApplicationDomain.sCurrentDomain = ApplicationDomain.sCurrentDomain || new ApplicationDomain;
			return ApplicationDomain.sCurrentDomain;
		}
		
		/**
		 * Gets the minimum memory object length required to be used as ApplicationDomain.domainMemory. 
		 * @return 
		 * 
		 */		
		public static get MIN_DOMAIN_MEMORY_LENGTH () : number
		{
			return 0;
		}
		
		/**
		 * Helpers 
		 */		
		private static sCurrentDomain:ApplicationDomain = null;
		
		/**
		 * Creates a new application domain. 
		 * @param parentDomain
		 * 
		 */		
		constructor(parentDomain:ApplicationDomain = null)
		{
			
		/**/ parentDomain = strict(parentDomain, ApplicationDomain);
			
		}
		
		/**
		 * Gets and sets the object on which domain-global memory operations will operate within this ApplicationDomain. 
		 * @return 
		 * 
		 */		
		public domainMemory () : ByteArray
		{
			return null;
		}
		
		/**
		 * Gets the parent domain of this application domain. 
		 * @return 
		 * 
		 */		
		public get parentDomain () : ApplicationDomain
		{
			return null;
		}
		
		/**
		 * Gets a public definition from the specified application domain. 
		 * @param name
		 * @return 
		 * 
		 */		
		public getDefinition(name:string):any
		{
			/**/ name = as(name, 'String');
			return null;
		}
		
		/**
		 * Gets all fully-qualified names of public definitions from the specified application domain. 
		 * @return 
		 * 
		 */		
		public getQualifiedDefinitionNames():string[]
		{
			return null;
		}
		
		/**
		 * Checks to see if a public definition exists within the specified application domain. 
		 * @param name
		 * @return 
		 * 
		 */		
		public hasDefinition(name:string):boolean
		{
			/**/ name = as(name, 'String');
			return false;
		}
	}
}