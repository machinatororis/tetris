/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../system/ApplicationDomain.ts" />
/// <reference path="../events/UncaughtErrorEvents.ts" />
/// <reference path="../events/ProgressEvent.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../events/Event.ts" />

namespace flash.display
{
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import ProgressEvent = flash.events.ProgressEvent;
	export import UncaughtErrorEvents = flash.events.UncaughtErrorEvents;
	export import ApplicationDomain = flash.system.ApplicationDomain;
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The LoaderInfo class provides information about a loaded SWF file or a loaded image file (JPEG, GIF, or PNG). 
	 * LoaderInfo objects are available for any display object. The information provided includes load progress, the URLs of the loader 
	 * and loaded content, the number of bytes total for the media, and the nominal height and width of the media.
	 * You can access LoaderInfo objects in two ways:
	 * 
	 * The contentLoaderInfo property of a flash.display.Loader object— The contentLoaderInfo property is always available for any 
	 * Loader object. For a Loader object that has not called the load() or loadBytes() method, or that has not sufficiently loaded, 
	 * attempting to access many of the properties of the contentLoaderInfo property throws an error.
	 * The loaderInfo property of a display object.
	 * The contentLoaderInfo property of a Loader object provides information about the content that the Loader object is loading, 
	 * whereas the loaderInfo property of a DisplayObject provides information about the root SWF file for that display object.
	 * 
	 * When you use a Loader object to load a display object (such as a SWF file or a bitmap), the loaderInfo property of the display 
	 * object is the same as the contentLoaderInfo property of the Loader object (DisplayObject.loaderInfo = Loader.contentLoaderInfo). 
	 * Because the instance of the main class of the SWF file has no Loader object, the loaderInfo property is the only way to access 
	 * the LoaderInfo for the instance of the main class of the SWF file.
	 * 
	 * The following diagram shows the different uses of the LoaderInfo object—for the instance of the main class of the SWF file, 
	 * for the contentLoaderInfo property of a Loader object, and for the loaderInfo property of a loaded object:
	 * 
	 * When a loading operation is not complete, some properties of the contentLoaderInfo property of a Loader object are not available. 
	 * You can obtain some properties, such as bytesLoaded, bytesTotal, url, loaderURL, and applicationDomain. 
	 * When the loaderInfo object dispatches the init event, you can access all properties of the loaderInfo object and the loaded image 
	 * or SWF file.
	 * 
	 * Note: All properties of LoaderInfo objects are read-only.
	 * 
	 * The EventDispatcher.dispatchEvent() method is not applicable to LoaderInfo objects. If you call dispatchEvent() on a LoaderInfo object, 
	 * an IllegalOperationError exception is thrown. 
	 * @author pkulikov
	 * 
	 */	
	export  class LoaderInfo extends EventDispatcher
	{
		/*[internal]*/ protected static _uncaughtErrorEvents : UncaughtErrorEvents = asc.sti(LoaderInfo,()=>{ LoaderInfo._uncaughtErrorEvents = new UncaughtErrorEvents; });
		
		/*[internal]*/ protected _url : string;
		/*[internal]*/ protected _content : DisplayObject;
		/*[internal]*/ protected _contentType : string;
		/*[internal]*/ protected _loader : Loader;
		/*[internal]*/ protected _bytes : ByteArray;
		/*[internal]*/ protected _bytesLoaded : number = 0;
		/*[internal]*/ protected _bytesTotal : number = 0;
		/*[internal]*/ protected _swfVersion : number = 40; // Flash Player 29 and AIR 29 (March 13, 2018) SWF version: 40
		/*[internal]*/ protected _frameRate : number = 60;
		/*[internal]*/ protected _actionScriptVersion : number = 3; // ActionScriptVersion.ACTIONSCRIPT3
		/*[internal]*/ protected _parameters : any = {};
		
		/**
		 * Returns the LoaderInfo object associated with a SWF file defined as an object. 
		 * @param value
		 * @return 
		 * 
		 */		
		public static getLoaderInfoByDefinition(value:any):LoaderInfo
		{
			return null;
		}
		
		/**
		 * The URL of the SWF file that initiated the loading of the media described by this LoaderInfo object. 
		 * @return 
		 * 
		 */		
		public get loaderURL():string  { return window.location.href; }
		
		/**
		 * The URL of the media being loaded. 
		 * @return 
		 * 
		 */		
		public get url():string { return this._url; }
		
		/**
		 * Indicates if the LoaderInfo.url property has been truncated. 
		 * @return 
		 * 
		 */		
		public get isURLInaccessible():boolean  { return true; }
		
		/**
		 * The number of bytes that are loaded for the media. 
		 * @return 
		 * 
		 */		
		public get bytesLoaded():number { return this._bytesLoaded; }
		
		/**
		 * The number of compressed bytes in the entire media file. 
		 * @return 
		 * 
		 */		
		public get bytesTotal():number { return this._bytesTotal; }
		
		/**
		 * The file format version of the loaded SWF file. 
		 * @return 
		 * 
		 */		
		public get swfVersion():number { return this._swfVersion; }
		
		/**
		 * The ActionScript version of the loaded SWF file. 
		 * @return 
		 * 
		 */		
		public get actionScriptVersion():number { return this._actionScriptVersion; }
		
		/**
		 * The nominal frame rate, in frames per second, of the loaded SWF file. 
		 * @return 
		 * 
		 */		
		public get frameRate():number { return this._frameRate; }
		
		/**
		 * An object that contains name-value pairs that represent the parameters provided to the loaded SWF file. 
		 * @return 
		 * 
		 */		
		public get parameters():any { return this._parameters; }
		
		/**
		 * The nominal width of the loaded content. 
		 * @return 
		 * 
		 */		
		public get width():number  { return this._content ? this._content.width : 0; }
		
		/**
		 * The nominal height of the loaded file. 
		 * @return 
		 * 
		 */		
		public get height():number  { return this._content ? this._content.height : 0; }
		
		/**
		 * The MIME type of the loaded file. 
		 * @return 
		 * 
		 */		
		public get contentType():string { return this._contentType; }
		
		/**
		 * An EventDispatcher instance that can be used to exchange events across security boundaries. 
		 * @return 
		 * 
		 */		
		public get sharedEvents():EventDispatcher  { return this; }
		
		/**
		 * A object that can be set by code in the Loader object's sandbox to expose properties and methods that can be 
		 * accessed by the loaded content's code. 
		 * @return 
		 * 
		 */		
		public get parentSandboxBridge():any  { return null; }
		public set parentSandboxBridge(param1:any) { /**/ }
		
		/**
		 * A object that can be set by the loaded content's code to expose properties and methods that can be accessed by code in the Loader object's sandbox. 
		 * @return 
		 * 
		 */		
		public get childSandboxBridge():any  { return null; }
		public set childSandboxBridge(param1:any) { /**/ }
		
		/**
		 * Expresses the domain relationship between the loader and the content: true if they have the same origin domain; false otherwise. 
		 * @return 
		 * 
		 */		
		public get sameDomain():boolean  { return false; }
		
		/**
		 * Expresses the trust relationship from content (child) to the Loader (parent). 
		 * @return 
		 * 
		 */		
		public get childAllowsParent():boolean  { return false; }
		
		/**
		 * Expresses the trust relationship from Loader (parent) to the content (child). 
		 * @return 
		 * 
		 */		
		public get parentAllowsChild():boolean  { return false; }
		
		/**
		 * The Loader object associated with this LoaderInfo object. 
		 * @return 
		 * 
		 */		
		public get loader():Loader  { return this._loader; }
		
		/**
		 * The loaded object associated with this LoaderInfo object.
		 * @return 
		 * 
		 */		
		public get content():DisplayObject  { return this._content; }
		
		/**
		 * The bytes associated with a LoaderInfo object. 
		 * @return 
		 * 
		 */		
		public get bytes():ByteArray { return this._bytes; }
		
		/**
		 * When an external SWF file is loaded, all ActionScript 3.0 definitions contained in the loaded class are stored in the 
		 * applicationDomain property. 
		 * @return 
		 * 
		 */		
		public get applicationDomain () : ApplicationDomain { return ApplicationDomain.currentDomain; }
		
		/**
		 * An object that dispatches an uncaughtError event when an unhandled error occurs in code in this LoaderInfo object's SWF file. 
		 * @return 
		 * 
		 */		
		public get uncaughtErrorEvents() : UncaughtErrorEvents { return LoaderInfo._uncaughtErrorEvents; }
		
		/**
		 * Set the progress and dispatch an event.
		 */
		/*[internal]*/ protected __setProgress (loaded : number, total : number) : void
		{
			// loaded = ((loaded) >>> 0); total = ((total) >>> 0);
			var changed;
			
			if (loaded > this._bytesLoaded) {
				
				this._bytesLoaded = loaded;
				changed = true;
				
			}
			
			if (total > this._bytesTotal) {
				
				this._bytesTotal = total;
				changed = true;
				
			}
			
			if (changed) {
				
				this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false, this._bytesLoaded, this._bytesTotal));
				
			}
		}
		
		/**
		 * Loading is complete.
		 */
		/*[internal]*/ protected __contentComplete ():void
		{
			this.__setProgress(this._bytesTotal, this._bytesTotal);
			this.dispatchEvent(new Event(Event.COMPLETE, false, false, this._bytesLoaded, this._bytesTotal));
		}
		
		/*override*/ public toString ():string
		{
			return '[object LoaderInfo]';
		}
	}
}