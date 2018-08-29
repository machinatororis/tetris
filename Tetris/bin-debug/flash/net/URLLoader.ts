/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../events/SecurityErrorEvent.ts" />
/// <reference path="../events/ProgressEvent.ts" />
/// <reference path="../events/IOErrorEvent.ts" />
/// <reference path="../events/HTTPStatusEvent.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../../XML.ts" />

namespace flash.net
{
	export import XML = global.XML;
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import HTTPStatusEvent = flash.events.HTTPStatusEvent;
	export import IOErrorEvent = flash.events.IOErrorEvent;
	export import ProgressEvent = flash.events.ProgressEvent;
	export import SecurityErrorEvent = flash.events.SecurityErrorEvent;
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The URLLoader class downloads data from a URL as text, binary data, or URL-encoded variables. 
	 * It is useful for downloading text files, XML, or other information to be used in a dynamic, data-driven application.
	 * A URLLoader object downloads all of the data from a URL before making it available to code in the applications. 
	 * It sends out notifications about the progress of the download, which you can monitor through the bytesLoaded and bytesTotal properties, 
	 * as well as through dispatched events.
	 * 
	 * When loading very large video files, such as FLV's, out-of-memory errors may occur.
	 * 
	 * When you use this class in Flash Player and in AIR application content in security sandboxes other than then application security sandbox,
	 *  consider the following security model:
	 * 
	 * A SWF file in the local-with-filesystem sandbox may not load data from, or provide data to, a resource that is in the network sandbox.
	 * By default, the calling SWF file and the URL you load must be in exactly the same domain. 
	 * For example, a SWF file at www.adobe.com can load data only from sources that are also at www.adobe.com. 
	 * To load data from a different domain, place a URL policy file on the server hosting the data.
	 * For more information related to security, see the Flash Player Developer Center Topic: Security. 
	 * @author pkulikov
	 * 
	 */	
	export  class URLLoader extends EventDispatcher
	{
		/**
		 * The data received from the load operation. 
		 */		
		public data:any;
		
		/**
		 * Controls whether the downloaded data is received as text (URLLoaderDataFormat.TEXT), 
		 * raw binary data (URLLoaderDataFormat.BINARY), or URL-encoded variables (URLLoaderDataFormat.VARIABLES). 
		 */		
		public dataFormat:string;
		
		/**
		 * Indicates the number of bytes that have been loaded thus far during the load operation. 
		 */		
		public bytesLoaded:number;
		
		/**
		 * Indicates the total number of bytes in the downloaded data. 
		 */		
		public bytesTotal:number;
		
		/**
		 * Helpers 
		 */		
		private stream:URLStream;
		
		/**
		 * Creates a URLLoader object. 
		 * @param request
		 * 
		 */		
		constructor(request:URLRequest = null)
		{
			/**/ request = strict(request, URLRequest);
			/**/ this.data === void 0 && (this.data = null);
			/**/ this.dataFormat === void 0 && (this.dataFormat = "text");
			/**/ this.bytesLoaded === void 0 && (this.bytesLoaded = 0);
			/**/ this.bytesTotal === void 0 && (this.bytesTotal = 0);
			/**/ this.stream === void 0 && (this.stream = null);
			super();
			this.stream = new URLStream();
			this.stream.addEventListener(Event.OPEN, this.redirectEvent.__bind(this));
			this.stream.addEventListener(IOErrorEvent.IO_ERROR, this.redirectEventWithData.__bind(this));
			this.stream.addEventListener(SecurityErrorEvent.SECURITY_ERROR, this.redirectEventWithData.__bind(this));
			this.stream.addEventListener(HTTPStatusEvent.HTTP_STATUS, this.redirectEvent.__bind(this));
			this.stream.addEventListener(ProgressEvent.PROGRESS, this.onProgress.__bind(this));
			this.stream.addEventListener(Event.COMPLETE, this.redirectEventWithData.__bind(this));
			if (request != null)
			{
				this.load(request);
			}
		}
		
		/**
		 * Sends and loads data from the specified URL. 
		 * @param request
		 * 
		 */		
		public load(request:URLRequest):void
		{
			/**/ request = strict(request, URLRequest);
			this.stream.load(request);
		}
		
		/**
		 * Closes the load operation in progress. 
		 * 
		 */		
		public close():void
		{
			this.stream.close();
		}
		
		/**
		 * Helpers 
		 * @param event
		 * 
		 */		
		private redirectEvent(event:Event):void
		{
			/**/ event = strict(event, Event);
			event.target = this;
			this.dispatchEvent(event);
		}
		
		private redirectEventWithData(event:Event):void
		{
			/**/ event = strict(event, Event);
			event.target = this;
			var bytes:ByteArray = this.stream['_data'];
			switch (this.dataFormat)
			{
				case URLLoaderDataFormat.TEXT:
					this.data = bytes.toString();
					break;
				case URLLoaderDataFormat.VARIABLES:
					if (bytes.length > 0) {
						this.data = new URLVariables(bytes.toString());
					}
					break;
				default:
					this.data = bytes;
			}
			this.dispatchEvent(event);
		}
		
		private onProgress(event:ProgressEvent):void
		{
			/**/ event = strict(event, ProgressEvent);
			event.target = this;
			this.bytesLoaded =(( event.bytesLoaded) >>> 0);
			this.bytesTotal =(( event.bytesTotal) >>> 0);
			this.dispatchEvent(event);
		}
	}

}