/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../__native/utils/Base64.ts" />
/// <reference path="../../Namespace.ts" />
/// <reference path="../../Main.ts" />

namespace flash.net
{
	export import Main = global.Main;
	export import Namespace = global.Namespace;
	export import Base64 = flash.__native.utils.Base64;
	export import ByteArray = flash.utils.ByteArray;
	

	/**
	 * The SharedObject class is used to read and store limited amounts of data on a user's computer or on a server. Shared objects offer real-time data sharing between multiple client SWF files and objects that are persistent on the local computer or remote server. Local shared objects are similar to browser cookies and remote shared objects are similar to real-time data transfer devices. To use remote shared objects, you need Adobe Flash Media Server.
	 * Use shared objects to do the following:
	 * 
	 * Maintain local persistence. This is the simplest way to use a shared object, and does not require Flash Media Server. For example, you can call SharedObject.getLocal() to create a shared object in an application, such as a calculator with memory. When the user closes the calculator, Flash Player saves the last value in a shared object on the user's computer. The next time the calculator is run, it contains the values it had previously. Alternatively, if you set the shared object's properties to null before the calculator application is closed, the next time the application runs, it opens without any values. Another example of maintaining local persistence is tracking user preferences or other data for a complex website, such as a record of which articles a user read on a news site. Tracking this information allows you to display articles that have already been read differently from new, unread articles. Storing this information on the user's computer reduces server load.
	 * Store and share data on Flash Media Server. A shared object can store data on the server for other clients to retrieve. For example, call SharedObject.getRemote() to create a remote shared object, such as a phone list, that is persistent on the server. Whenever a client makes changes to the shared object, the revised data is available to all clients currently connected to the object or who later connect to it. If the object is also persistent locally, and a client changes data while not connected to the server, the data is copied to the remote shared object the next time the client connects to the object.
	 * Share data in real time. A shared object can share data among multiple clients in real time. For example, you can open a remote shared object that stores a list of users connected to a chat room that is visible to all clients connected to the object. When a user enters or leaves the chat room, the object is updated and all clients that are connected to the object see the revised list of chat room users.
	 * To create a local shared object, call SharedObject.getLocal(). To create a remote shared object, call SharedObject.getRemote().
	 * 
	 * When an application closes, shared objects are flushed, or written to a disk. You can also call the flush() method to explicitly write data to a disk.
	 * 
	 * Local disk space considerations. Local shared objects have some limitations that are important to consider as you design your application. Sometimes SWF files may not be allowed to write local shared objects, and sometimes the data stored in local shared objects can be deleted without your knowledge. Flash Player users can manage the disk space that is available to individual domains or to all domains. When users decrease the amount of disk space available, some local shared objects may be deleted. Flash Player users also have privacy controls that can prevent third-party domains (domains other than the domain in the current browser address bar) from reading or writing local shared objects. Also note that on Mac OS, starting with AIR 3.3, the location for local shared objects changed, so if you upgrade to the 3.3 namespace, it may appear as if the objects were lost.
	 * 
	 * Note: SWF files that are stored and run on a local computer, not from a remote server, can always write third-party shared objects to disk. For more information about third-party shared objects, see the Global Storage Settings panel in Flash Player Help.
	 * 
	 * It's a good idea to check for failures related to the amount of disk space and to user privacy controls. Perform these checks when you call getLocal() and flush():
	 * 
	 * SharedObject.getLocal() — Flash Player throws an exception when a call to this method fails, such as when the user has disabled third-party shared objects and the domain of your SWF file does not match the domain in the browser address bar.
	 * SharedObject.flush() — Flash Player throws an exception when a call to this method fails. It returns SharedObjectFlushStatus.FLUSHED when it succeeds. It returns SharedObjectFlushStatus.PENDING when additional storage space is needed. Flash Player prompts the user to allow an increase in storage space for locally saved information. Thereafter, the netStatus event is dispatched with an information object indicating whether the flush failed or succeeded.
	 * If your SWF file attempts to create or modify local shared objects, make sure that your SWF file is at least 215 pixels wide and at least 138 pixels high (the minimum dimensions for displaying the dialog box that prompts users to increase their local shared object storage limit). If your SWF file is smaller than these dimensions and an increase in the storage limit is required, SharedObject.flush() fails, returning SharedObjectFlushedStatus.PENDING and dispatching the netStatus event.
	 * 
	 * Remote shared objects. With Flash Media Server, you can create and use remote shared objects, that are shared in real-time by all clients connected to your application. When one client changes a property of a remote shared object, the property is changed for all connected clients. You can use remote shared objects to synchronize clients, for example, users in a multi-player game.
	 * 
	 * Each remote shared object has a data property which is an Object with properties that store data. Call setProperty() to change an property of the data object. The server updates the properties, dispatches a sync event, and sends the properties back to the connected clients.
	 * 
	 * You can choose to make remote shared objects persistent on the client, the server, or both. By default, Flash Player saves locally persistent remote shared objects up to 100K in size. When you try to save a larger object, Flash Player displays the Local Storage dialog box, which lets the user allow or deny local storage for the shared object. Make sure your Stage size is at least 215 by 138 pixels; this is the minimum size Flash requires to display the dialog box.
	 * 
	 * If the user selects Allow, the server saves the shared object and dispatches a netStatus event with a code property of SharedObject.Flush.Success. If the user select Deny, the server does not save the shared object and dispatches a netStatus event with a code property of SharedObject.Flush.Failed. 
	 * @author pkulikov
	 * 
	 */	
	export  class SharedObject
	{
		/**
		 * Indicates the object on which callback methods are invoked. 
		 */		
		public client : any = null;
			
		/**
		 * The collection of attributes assigned to the data property of the object; these attributes can be shared and stored. 
		 * @return 
		 * 
		 */		
		public data : any = {};
			
		/**
		 * The default object encoding (AMF version) for all local shared objects created in the SWF file. 
		 */		
		public static defaultObjectEncoding : number = asc.sti(SharedObject,()=>{ SharedObject.defaultObjectEncoding = ObjectEncoding.DEFAULT; });
			
		/**
		 * Specifies the number of times per second that a client's changes to a shared object are sent to the server. 
		 * @return 
		 * 
		 */		
		public set fps (value:number)
		{
			/**/ value = (+(value));
			// not supported
		}
		
		/**
		 * The object encoding (AMF version) for this shared object. 
		 */		
		public objectEncoding : number = 0;
		
		/**
		 * Specifies whether or not local shared objects will be backed up on the iOS cloud backup service. 
		 */		
		public static preventBackup : boolean = false;
		
		/**
		 * The current size of the shared object, in bytes. 
		 * @return 
		 * 
		 */		
		public get size () : number
		{
			if (this.data) {
				SharedObject.sHelperByteArray =SharedObject.sHelperByteArray || new ByteArray;
				SharedObject.sHelperByteArray.position = 0;
				SharedObject.sHelperByteArray.writeObject(this.data);
				return SharedObject.sHelperByteArray.length;
			}
			return 0;
		}
		
		/**
		 * Helpers 
		 */		
		protected _name : string = null;
		protected static sHelperByteArray : ByteArray = null;
		
		/**
		 * For local shared objects, purges all of the data and deletes the shared object from the disk. 
		 */		
		public clear():void
		{
			this.data = {};
			try
			{
				window.asc.getLocalStorage().removeItem(this._name);
			} catch (e) {
				
			e = window.asc.e2e(e);
				
			}
		}
		
		/**
		 * Closes the connection between a remote shared object and the server. 
		 */		
		public close():void
		{
			// not supported
		}
		
		/**
		 * Connects to a remote shared object on a server through a specified NetConnection object. 
		 * @param myConnection
		 * @param params
		 * 
		 */		
		public connect(myConnection:any/*NetConnection*/, params:string = null):void
		{
			/**/ params = as(params, 'String');
			// not supported
		}
		
		/**
		 * Immediately writes a locally persistent shared object to a local file. 
		 * @param minDiskSpace
		 * @return 
		 * 
		 */		
		public flush(minDiskSpace:number = 0):string
		{
			/**/ minDiskSpace = ((minDiskSpace) >> 0);
			var encodedData:string = '';
			try {
				var serializedData:ByteArray = new ByteArray;
				serializedData.objectEncoding = this.objectEncoding;
				serializedData.writeObject(this.data);
				encodedData = Base64.encode(serializedData);
			} catch (e) {
				e = window.asc.e2e(e);
				trace(e.getStackTrace());
			}
			
			try {
				window.asc.getLocalStorage().setItem(this._name, encodedData);
				return SharedObjectFlushStatus.FLUSHED;
			} catch (e) {
				
			e = window.asc.e2e(e);
				
			}
			
			return SharedObjectFlushStatus.PENDING;
		}
		
		/**
		 * Returns a reference to a locally persistent shared object that is only available to the current client. 
		 * @param name
		 * @param localPath
		 * @param secure
		 * @return 
		 * 
		 */		
		public static getLocal(name:string, localPath:string = null, secure:boolean = false):SharedObject
		{
			/**/ name = as(name, 'String'); localPath = as(localPath, 'String'); secure = Boolean(secure);
			var encodedData:string =  as(window.asc.getLocalStorage().getItem(name), 'String');
			var data, encoding = SharedObject.defaultObjectEncoding;
			if (encodedData) {
				try {
					var serializedData:ByteArray = Base64.decode(encodedData);
					serializedData.position = 0;
					data = serializedData.readObject();
					encoding = serializedData.objectEncoding;
				} catch (e) {
					e = window.asc.e2e(e);
					trace('Error encountered while decoding LocalStorage entry. Resetting data.');
				}
				if (!data || typeof data != 'object') {
					data = {};
				}
			} else {
				data = {};
			}
			var so:SharedObject = new SharedObject;
			so.data = data;
			so._name = name;
			so.objectEncoding =(( encoding) >>> 0);
			return so;
		}
		
		/**
		 * Returns a reference to a shared object on Flash Media Server that multiple clients can access. 
		 * @param name
		 * @param remotePath
		 * @param persistence
		 * @param secure
		 * @return 
		 * 
		 */		
		public static getRemote(name:string, remotePath:string = null, persistence:any = false, secure:boolean = false):SharedObject
		{
			/**/ name = as(name, 'String'); remotePath = as(remotePath, 'String'); secure = Boolean(secure);
			return null;
		}
		
		/**
		 * Broadcasts a message to all clients connected to a remote shared object, including the client that sent the message. 
		 * @param arguments
		 * 
		 */		
		public send(...args):void
		{
			// not supported
		}
		
		/**
		 * Indicates to the server that the value of a property in the shared object has changed. 
		 * @param propertyName
		 * 
		 */		
		public setDirty(propertyName:string):void
		{
			/**/ propertyName = as(propertyName, 'String');
			// not supported
		}
		
		/**
		 * Updates the value of a property in a shared object and indicates to the server that the value of the property has changed. 
		 * @param propertyName
		 * @param value
		 * 
		 */			
		public setProperty(propertyName:string, value:any = null):void
		{
			/**/ propertyName = as(propertyName, 'String');
			// not supported
		}
	}	
}