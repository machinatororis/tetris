/// <reference path="../../base.d.ts" />
/// <reference path="../events/EventDispatcher.ts" />
﻿
namespace flash.net
{
	
	export import EventDispatcher = flash.events.EventDispatcher;
	

	/**
	 * The LocalConnection class lets you create a LocalConnection object that can invoke a method in another LocalConnection object. 
	 * The communication can be:
	 * Within a single SWF file
	 * Between multiple SWF files
	 * Between content (SWF-based or HTML-based) in AIR applications
	 * Between content (SWF-based or HTML-based) in an AIR application and SWF content running in a browser
	 * AIR profile support: This feature is supported on all desktop operating systems and on all AIR for TV devices, but is not supported on 
	 * mobile devices. You can test for support at run time using the LocalConnection.isSupported property. See AIR Profile Support for more 
	 * information regarding API support across multiple profiles.
	 * 
	 * Note: AIR for TV devices support communication only between SWF-based content in AIR applications.
	 * 
	 * Local connections enable this kind of communication between SWF files without the use of fscommand() or JavaScript. 
	 * LocalConnection objects can communicate only among files that are running on the same client computer, but they can be running in 
	 * different applications — for example, a file running in a browser and a SWF file running in Adobe AIR.
	 * 
	 * LocalConnection objects created in ActionScript 3.0 can communicate with LocalConnection objects created in ActionScript 1.0 or 2.0.
	 *  The reverse is also true: LocalConnection objects created in ActionScript 1.0 or 2.0 can communicate with LocalConnection objects 
	 * created in ActionScript 3.0. Flash Player handles this communication between LocalConnection objects of different versions automatically.
	 * 
	 * There are three ways to add callback methods to a LocalConnection object:
	 * 
	 * Subclass the LocalConnection class and add methods.
	 * Set the LocalConnection.client property to an object that implements the methods.
	 * Create a dynamic class that extends LocalConnection and dynamically attach methods.
	 * To understand how to use LocalConnection objects to implement communication between two files, it is helpful to identify the commands 
	 * used in each file. One file is called the receiving file; it is the file that contains the method to be invoked. 
	 * The receiving file must contain a LocalConnection object and a call to the connect() method. The other file is called the sending file; 
	 * it is the file that invokes the method. The sending file must contain another LocalConnection object and a call to the send() method.
	 * 
	 * Your use of send() and connect() differs depending on whether the files are in the same domain, in different domains with 
	 * predictable domain names, or in different domains with unpredictable or dynamic domain names. The following paragraphs explain the 
	 * three different situations, with code samples for each.
	 * 
	 * @author pkulikov
	 */
	export  class LocalConnection extends EventDispatcher
	{
		/**
		 * Indicates the object on which callback methods are invoked. 
		 */		
		public client : any;

		/**
		 * A string representing the domain of the location of the current file. 
		 * @return 
		 * 
		 */		
		public get domain () : string
		{
			return this._domain;
		}

		public isPerUser : boolean;

		/**
		 * The isSupported property is set to true if the LocalConnection class is supported on the current platform, otherwise it is set to false. 
		 * @return 
		 * 
		 */		
		public static get isSupported () : boolean
		{
			return false;
		}
		
		/**
		 * Helpers 
		 */		
		private _domain : string;
		
		/**
		 * Creates a LocalConnection object. 
		 * 
		 */		
		constructor()
		{
			/**/ this.client === void 0 && (this.client = null);
			/**/ this.isPerUser === void 0 && (this.isPerUser = false);
			/**/ this._domain === void 0 && (this._domain = null);
			super(); 
			this._domain =as( window.asc.utils.getHostName(window.location.href), 'String');
		}
		
		/**
		 * Specifies one or more domains that can send LocalConnection calls to this LocalConnection instance. 
		 * @param domains
		 * 
		 */		
		public allowDomain(... domains):void
		{
			
		}
		
		/**
		 * Specifies one or more domains that can send LocalConnection calls to this LocalConnection object. 
		 * @param domains
		 * 
		 */		
		public allowInsecureDomain(... domains):void
		{
			
		}
		
		/**
		 * Closes (disconnects) a LocalConnection object. 
		 * 
		 */		
		public close():void
		{
			
		}
		
		/**
		 * Prepares a LocalConnection object to receive commands that are sent from a send() command (from the sending LocalConnection object). 
		 * @param connectionName
		 * 
		 */		
		public connect(connectionName:string):void
		{
			
		/**/ connectionName = as(connectionName, 'String');
			
		}

		/**
		 * Invokes the method named methodName on a connection that was opened with the connect(connectionName) method 
		 * (in the receiving LocalConnection object). 
		 * @param connectionName
		 * @param methodName
		 * @param arguments
		 * 
		 */		
		public send(connectionName:string, methodName:string, ... args):void
		{
			
		/**/ connectionName = as(connectionName, 'String'); methodName = as(methodName, 'String');
			
		}
	}	
}