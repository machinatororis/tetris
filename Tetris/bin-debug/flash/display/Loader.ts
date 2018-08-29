/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../system/LoaderContext.ts" />
/// <reference path="../net/URLRequest.ts" />
/// <reference path="../net/URLLoaderDataFormat.ts" />
/// <reference path="../net/URLLoader.ts" />
/// <reference path="../events/UncaughtErrorEvents.ts" />
/// <reference path="../events/SecurityErrorEvent.ts" />
/// <reference path="../events/ProgressEvent.ts" />
/// <reference path="../events/IOErrorEvent.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../events/ErrorEvent.ts" />
/// <reference path="../__native/format/swf/events/SWFProgressEvent.ts" />
/// <reference path="../__native/format/swf/events/SWFErrorEvent.ts" />
/// <reference path="../__native/format/swf/SWF.ts" />
/// <reference path="../__native/display/SystemBitmapData.ts" />

namespace flash.display
{
	export import SystemBitmapData = flash.__native.display.SystemBitmapData;
	export import SWF = flash.__native.format.swf.SWF;
	export import SWFErrorEvent = flash.__native.format.swf.events.SWFErrorEvent;
	export import SWFProgressEvent = flash.__native.format.swf.events.SWFProgressEvent;
	export import ErrorEvent = flash.events.ErrorEvent;
	export import Event = flash.events.Event;
	export import IOErrorEvent = flash.events.IOErrorEvent;
	export import ProgressEvent = flash.events.ProgressEvent;
	export import SecurityErrorEvent = flash.events.SecurityErrorEvent;
	export import UncaughtErrorEvents = flash.events.UncaughtErrorEvents;
	export import URLLoader = flash.net.URLLoader;
	export import URLLoaderDataFormat = flash.net.URLLoaderDataFormat;
	export import URLRequest = flash.net.URLRequest;
	export import LoaderContext = flash.system.LoaderContext;
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The Loader class is used to load SWF files or image (JPG, PNG, or GIF) files. Use the load() method to initiate loading. 
	 * The loaded display object is added as a child of the Loader object.
	 * Use the URLLoader class to load text or binary data.
	 * 
	 * The Loader class overrides the following methods that it inherits, because a Loader object can only have one child display 
	 * object—the display object that it loads. Calling the following methods throws an exception: addChild(), addChildAt(), 
	 * removeChild(), removeChildAt(), and setChildIndex(). To remove a loaded display object, 
	 * you must remove the Loader object from its parent DisplayObjectContainer child array.
	 * @author pkulikov
	 * 
	 */	
	export  class Loader extends DisplayObjectContainer
	{
		/**
		 * Базовый путь 
		 */		
		protected static __base : string = '';
		
		private _swf : SWF;
		private _loader : URLLoader;
		private _image : HTMLImageElement;
		private _contentLoaderInfo : LoaderInfo;
		private _predefinedData : BitmapData;
		private _predefinedAlphaData : ByteArray;
		
		/**
		 * Creates a Loader object that you can use to load files, such as SWF, JPEG, GIF, or PNG files.
		 */		
		constructor()
		{
			/**/ this._swf === void 0 && (this._swf = null);
			/**/ this._loader === void 0 && (this._loader = null);
			/**/ this._image === void 0 && (this._image = null);
			/**/ this._contentLoaderInfo === void 0 && (this._contentLoaderInfo = null);
			/**/ this._predefinedData === void 0 && (this._predefinedData = null);
			/**/ this._predefinedAlphaData === void 0 && (this._predefinedAlphaData = null);
			super(); 
			this._contentLoaderInfo = new LoaderInfo;
			this._contentLoaderInfo._loader = this;
		}
		
		/**
		 * Loads a SWF, JPEG, progressive JPEG, unanimated GIF, or PNG file into an object that is a child of this Loader object. 
		 * @param request
		 * @param context
		 * 
		 */		
		public load (request : URLRequest, context : LoaderContext = null) : void
		{
			/**/ request = strict(request, URLRequest); context = strict(context, LoaderContext);
			this.__unload();
			
			var url = request.url;
			if (url.substr(0, 3).toLowerCase() != 'www' && url.substr(0, 4).toLowerCase() != 'http' && Loader.__base) {
				
				url = Loader.__base + url;
				
			}
			
			this._loader = new URLLoader;
			this._loader.dataFormat = URLLoaderDataFormat.BINARY;
			this._loader.addEventListener(Event.COMPLETE, this.__onLoaderComplete.__bind(this));
			this._loader.addEventListener(ProgressEvent.PROGRESS, this.__onLoaderProgress.__bind(this));
			this._loader.addEventListener(IOErrorEvent.IO_ERROR, this.__onLoaderError.__bind(this));
			this._loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, this.__onLoaderError.__bind(this));
			this._loader.load(new URLRequest(this._contentLoaderInfo._url =as( url, 'String')));
		}
		
		/**
		 * Loads from binary data stored in a ByteArray object. 
		 * @param bytes
		 * @param context
		 * 
		 */		
		public loadBytes(bytes:ByteArray, context:LoaderContext = null) : void
		{
			/**/ bytes = strict(bytes, ByteArray); context = strict(context, LoaderContext);
			if (!bytes) {
				
				throw new TypeError('Parameter bytes must be non-null.', 2007);
				
			}
			
			if (bytes.length == 0) {
				
				throw new ArgumentError('The ByteArray parameter in Loader.loadBytes() must have length greater than 0.', 2100);
				
			}
			
			this.__unload();
			
			var mimeType = window.asc.getMimeType(bytes);
			if (mimeType == 'image/svg' || mimeType == 'image/svg-xml' || mimeType == 'text/xml') {
				
				mimeType = 'image/svg+xml';
				
			}
			
			// JPEG tables
			// https://wwwimages2.adobe.com/content/dam/acom/en/devnet/pdf/swf-file-format-spec.pdf
			//var jpegTable:ByteArray, jpegData:ByteArray, byte:int;
			//if (mimeType == 'image/jpeg+table') {
				
			//	mimeType = 'image/jpeg';
				
			//	for (var i = 2, len = bytes.length - 1; i < len; ++i) {
					
			//		if (bytes.get(i) == 0xff && ((byte = bytes.get(i + 1)) == 0xd9 || byte == 0xd8)) {
						
			//			jpegData = ByteArray.__pool.get();
			//			jpegTable = ByteArray.__pool.get();
						
			//			len = i + 2;
			//			jpegTable.writeBytes(bytes, 0, len);
			//			jpegData.writeBytes(bytes, len);
			//			break;
						
			//		}
					
			//	}
				
			//}
			
			switch (this._contentLoaderInfo._contentType =as( mimeType, 'String')) {
				
				case 'application/x-shockwave-flash':
					this._swf = new SWF (bytes);
					this._swf.addEventListener(SWFProgressEvent.COMPLETE, this.__decodeSWFAssetsComplete.__bind(this));
					this._swf.addEventListener(SWFErrorEvent.ERROR, this.__decodeSWFAssetsError.__bind(this));
					this._swf.decodeImageDataAsync();
					break;
				
				default:
					this._image = new Image;
					this._image.onload = this.__decompressComplete.__bind(this);
					this._image.onerror = this.__decompressError.__bind(this);
					
					var data = bytes;
					//if (jpegTable && jpegData) {
						
					//	data = __jpegWithTables(jpegTable, jpegData, true);
					//	ByteArray.__pool.release(jpegTable);
					//	ByteArray.__pool.release(jpegData);
						
					//}
					
					
					var blob = new window.Blob( [ new Uint8Array(data._dataView.buffer) ], { type: mimeType } );
					this._image.src = (window.URL || window.webkitURL).createObjectURL( blob );
					
					//if (data != bytes) {
						
					//	ByteArray.__pool.release(data);
						
					//}
					
			}
		}
		
		/**
		 * Cancels a load() method operation that is currently in progress for the Loader instance. 
		 * 
		 */		
		public close():void
		{
			if (this._loader) {
				
				this._loader.close();
				
			}
			
			this.__forgetImage();
		}
		
		/**
		 * Removes a child of this Loader object that was loaded by using the load() method. 
		 * 
		 */		
		public unload():void
		{
			this.__unload(false, false);
		}
		
		/**
		 * Attempts to unload child SWF file contents and stops the execution of commands from loaded SWF files. 
		 * @param gc
		 * 
		 */		
		public unloadAndStop(gc:boolean = true):void
		{
			/**/ gc = Boolean(gc);
			this.__unload(true, gc);
		}
		
		/**
		 * Contains the root display object of the SWF file or image (JPG, PNG, or GIF) 
		 * file that was loaded by using the load() or loadBytes() methods. 
		 * @return 
		 * 
		 */		
		public get content():DisplayObject
		{
			return this._contentLoaderInfo._content;
		}
		
		/**
		 * Returns a LoaderInfo object corresponding to the object being loaded. 
		 * @return 
		 * 
		 */		
		public get contentLoaderInfo():LoaderInfo
		{
			return this._contentLoaderInfo;
		}
		
		/**
		 * An object that dispatches an uncaughtError event when an unhandled error occurs in the SWF that's loaded by this Loader object. 
		 * @return 
		 * 
		 */		
		public get uncaughtErrorEvents ():UncaughtErrorEvents
		{
			return this.contentLoaderInfo.uncaughtErrorEvents;
		}
		
		/*[internal]*/ protected __unload (stop:boolean = false, gc:boolean = false):void
		{
			// stop = Boolean(stop); gc = Boolean(gc);
			this.__forgetImage();
			
			if (this._swf) {
				
				if (stop) {
					
					this.stopAllMovieClips(true);
					
				}
				
				this._swf.removeEventListener(SWFProgressEvent.COMPLETE, this.__decodeSWFAssetsComplete.__bind(this));
				this._swf.removeEventListener(SWFErrorEvent.ERROR, this.__decodeSWFAssetsError.__bind(this));
				this._swf = null;
				
			}
			
			var c = this._contentLoaderInfo._content;
			if (c) {
				
				var cp = c.parent, cpc;
				if (cp && (cpc = cp._children)) {
					
					cp.__removeChildAt(cpc.indexOf(c));
					
				}
				
				this._contentLoaderInfo._content = null;
				
			}
			
			if (this._loader) {
				
				this._loader.removeEventListener(Event.COMPLETE, this.__onLoaderComplete.__bind(this));
				this._loader.removeEventListener(ProgressEvent.PROGRESS, this.__onLoaderProgress.__bind(this));
				this._loader.removeEventListener(IOErrorEvent.IO_ERROR, this.__onLoaderError.__bind(this));
				this._loader.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, this.__onLoaderError.__bind(this));
				
				if (stop) {
					
					this._loader.close();
					
				}
				
				this._loader = null;
				
			}
		}
		
		/*[internal]*/ protected __forgetImage () : void
		{
			if (!this._image) {
				
				return;
				
			}
			
			this._image.onload = undefined;
			this._image.onerror = undefined;
			this._image = null;
		}
		
		/////////////////////////////////////////////////////
		//                                                 //
		//                  content from swf               //
		//                                                 //
		/////////////////////////////////////////////////////
		
		/*[internal]*/ protected __fromSWF (data : SWF) : Loader
		{
			// data = strict(data, SWF);
			// info
			this._contentLoaderInfo._contentType = 'application/x-shockwave-flash';
			this._contentLoaderInfo._swfVersion =(( data.version) >>> 0);
			this._contentLoaderInfo._frameRate = data.frameRate;
			
			// root
			window.asc.mapSWF(data);
			var mainClass = data.getDisplayObjectConstructor(0);
			var mainClassArgs = [ data ];
			window.asc.createDisplayObject(mainClass, mainClassArgs, this, this._childrenLength, true, this._contentLoaderInfo);
			
			// evaluate scripts (without changing frames)
			Stage.sCurrent.__exitInternal(0);
			
			// progress
			this._contentLoaderInfo.__setProgress(0, data.sourceLength);
			this._contentLoaderInfo.__contentComplete();
			
			return this;
		}
		
		/////////////////////////////////////////////////////
		//                                                 //
		//               bytes loader handlers             //
		//                                                 //
		/////////////////////////////////////////////////////
		
		/*[internal]*/ protected __onLoaderComplete (event:Event):void
		{
			// event = strict(event, Event);
			this.loadBytes(this._contentLoaderInfo._bytes =strict( this._loader.data, ByteArray));
		}
		
		/*[internal]*/ protected __onLoaderProgress (event:ProgressEvent):void
		{
			// event = strict(event, ProgressEvent);
			this._contentLoaderInfo.__setProgress(this._loader.bytesLoaded, this._loader.bytesTotal);
		}
		
		/*[internal]*/ protected __onLoaderError(event:ErrorEvent):void
		{
			// event = strict(event, ErrorEvent);
			this._contentLoaderInfo.dispatchEvent(event);
		}
		
		/////////////////////////////////////////////////////
		//                                                 //
		//                decompress handlers              //
		//                                                 //
		/////////////////////////////////////////////////////
		
		/*[internal]*/ protected __decompressComplete(e:any):void
		{
			try {
				
				var width : number =  ((this._image.width || 1) >> 0);
				var height : number =  ((this._image.height || 1) >> 0);
				
				var systemBitmapDataType = SystemBitmapData.LOADER;
				var transparent = this._contentLoaderInfo._contentType != 'image/jpeg';
				
				if (this._predefinedAlphaData) {
					
					systemBitmapDataType = SystemBitmapData.SWF;
					transparent = true;
					
				}
				
				var bd = (this._predefinedData || new SystemBitmapData (systemBitmapDataType, width, height, transparent, 0x0, false));
				var element = this._image;
				if (this._predefinedAlphaData) {
					
					element = BitmapData.__getElementFromImageAndRawAlpha(this._image, this._predefinedAlphaData);
					
				}
				
				var ins = new Bitmap(bd.__fromElement (element));
				ins._root = true;
				ins._loaderInfo = this._contentLoaderInfo;
				this._contentLoaderInfo._content = this.__addChildAt(ins, this._childrenLength);
				
			} catch (e  ) {
				
				e = window.asc.e2e(e);
				
				trace(e.getStackTrace());
				this.__onLoaderError(new IOErrorEvent(IOErrorEvent.IO_ERROR));
				return;
				
			}
			
			this.__forgetImage();
			this._contentLoaderInfo.__contentComplete();
		}
		
		/*[internal]*/ protected __decompressError(e:any):void
		{
			this.__forgetImage();
			this.__onLoaderError(new IOErrorEvent(IOErrorEvent.IO_ERROR));
		}
		
		/////////////////////////////////////////////////////
		//                                                 //
		//                    SWF handlers                 //
		//                                                 //
		/////////////////////////////////////////////////////
		
		/*[internal]*/ protected __decodeSWFAssetsComplete(e:SWFProgressEvent):void
		{
			// e = strict(e, SWFProgressEvent);
			this.__fromSWF (this._swf);
		}
		
		/*[internal]*/ protected __decodeSWFAssetsError(e:SWFErrorEvent):void
		{
			// e = strict(e, SWFErrorEvent);
			this.__onLoaderError(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, e.reason));
		}
		
		//////////////////////////////////////////////////////////////////////////////
		//                                                                          //
		//                                JPEGTable                                 //
		//                                                                          //
		//////////////////////////////////////////////////////////////////////////////
		//                                                                          //
		// https://osdn.net/projects/flapp/scm/git/flapp/blobs/master/src/ibit.js   //
		// https://osdn.net/projects/flapp/scm/git/flapp/blobs/master/src/bitmap.js //
		//                                                                          //
		//////////////////////////////////////////////////////////////////////////////
		
		
		/*[internal] protected function __jpegWithTables(swfJpeg:ByteArray, jpegTables:ByteArray, systemBuffer:Boolean = false):ByteArray
		{
			var b:ByteArray;
			if (systemBuffer) {
				
				b = ByteArray.__pool.get();
				
			} else {
				
				b = new ByteArray;
				
			}
			
			var offsetTable = __jpegChunkOffsets(swfJpeg), offsetTable2;
			var hasDQT = 0xffdb in offsetTable;
			if (hasDQT == false) {
				
				if (jpegTables == null) {
					
					// An error
					return b;
					
				}
				
				offsetTable2 = __jpegChunkOffsets(jpegTables);
				
			}
			
			// SOI
			b[0] = 0xff;
			b[1] = 0xd8;
			
			// APP0, SOF0, DQT, DHT, SOS
			var jpegOrder = [ 0xffe0, 0xffc0, 0xffdb, 0xffc4, 0xffda ];
			for (var i = 0, len = jpegOrder.length; i < len ; i++) {
				
				var marker = jpegOrder[i];
				var table, jpeg;
				
				if (marker in offsetTable) {
					
					table = offsetTable;
					jpeg = swfJpeg;
					
				} else {
					
					table = offsetTable2;
					jpeg = jpegTables;
					
				}
				
				var chunkOffsets = table[marker];
				for (var j = 0, jlen = chunkOffsets.length; j < jlen ; j++) {
					
					var offset = chunkOffsets[j][0];
					var endoffset = offset + chunkOffsets[j][1];
					
					for (var k = offset; k < endoffset ; k++) {
						
						b.writeByte(jpeg.get(k));
						
					}
					
				}
				
			}
			
			return b;
		}
		
		[internal] protected function __jpegChunkOffsets (jpegData:ByteArray):Object
		{
			jpegData.position = 0;
			
			var offsetTable = {};
			var len = jpegData.length;
			
			while (jpegData.bytesAvailable > 1) {
				
				var offset = jpegData.position;
				var marker = jpegData.readUnsignedShort();
				var length;
				
				switch (marker) {
					
					case 0xFFD8: // SOI
					case 0xFFD9: // EOI
						break;
					
					case 0xFFDA: // SOS + [RST] + EOI
						length = len - offset;
						offsetTable[marker] = [[offset, length]];
						break;
					
					default:
						length = 2 + jpegData.readUnsignedShort();
						jpegData.position += length - 4;
						
						if (marker in offsetTable) {
							
							offsetTable[marker].push([offset, length]);
							
						} else {
							
							offsetTable[marker] = [[offset, length]];
							
						}
						break;
				}
				
			}
			
			return offsetTable;
		};*/
		
		/*override*/ public toString ():string
		{
			return '[object Loader]';
		}
	}
}