/// <reference path="../../base.d.ts" />
/// <reference path="../utils/IDataInput.ts" />
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
	export import IDataInput = flash.utils.IDataInput;
	
	
	/**
	 * The URLStream class provides low-level access to downloading URLs. Data is made available to application code immediately as 
	 * it is downloaded, instead of waiting until the entire file is complete as with URLLoader. 
	 * The URLStream class also lets you close a stream before it finishes downloading. 
	 * The contents of the downloaded file are made available as raw binary data.
	 * The read operations in URLStream are nonblocking. This means that you must use the bytesAvailable property to determine whether 
	 * sufficient data is available before reading it. An EOFError exception is thrown if insufficient data is available.
	 * 
	 * All binary data is encoded by default in big-endian format, with the most significant byte first.
	 * 
	 * The security rules that apply to URL downloading with the URLStream class are identical to the rules applied to URLLoader objects. 
	 * Policy files may be downloaded as needed. Local file security rules are enforced, and security warnings are raised as needed.
	 *  
	 * @author pkulikov
	 * 
	 */	
	export  class URLStream extends EventDispatcher implements IDataInput
	{
		implements_flash_utils_IDataInput = null;
		/**
		 * Синхронные или асинхронные запросы
		 */
		public static sync:boolean = false;
		
		/**
		 * Базовый путь 
		 */		
		public static __base:string = '';
		
		/**
		 * Helpers 
		 */		
		private _xhr:XMLHttpRequest;
		private _data:ByteArray;
		
		/**
		 * Constructor
		 */		
		constructor()
		{
			/**/ this._xhr === void 0 && (this._xhr = null);
			/**/ this._data === void 0 && (this._data = null);
			super();
			this._data = new ByteArray;
		}
		
		/**
		 * Begins downloading the URL specified in the request parameter. 
		 * @param v
		 * 
		 */		
		public load(request:URLRequest):void
		{
			/**/ request = strict(request, URLRequest);
			// request headers
			var headers:any[] = [];
			var __for0 = window.asc.of(request.requestHeaders);
			for  (var h of __for0) {
				
				if (h.name.toLowerCase() == 'X-HTTP-Method-Override'.toLowerCase()) {

					continue; // ломает общение с parse.com
					
				}
				
				headers[headers.length] = {
					name: h.name,
					value: h.value
				};
			}
			
			// content-type
			var len:number =  ((headers.length) >> 0);
			var contentType:boolean = false;
			for (var i:number = 0; i < len; ++i) {
				
				if (headers[i].name.toLowerCase() == 'content-type') {
					
					contentType = true;
					break;
					
				}
				
			}
			
			if (request.contentType && !contentType) {
				
				headers.push({
					name: 'Content-Type',
					value: request.contentType
				});
				
			}
			
			// url
			var _url:string = request.url;
			if (_url.substr(0, 3).toLowerCase() != 'www' && _url.substr(0, 4).toLowerCase() != 'http' && URLStream.__base) {
				
				_url = URLStream.__base + _url;
				
			}
			
			// data
			var data:any;
			if (request.data) {
				
				if (is(request.data , 'String')) {
					
					data = request.data;
					
				} else if (is(request.data , ByteArray)) {
					
					data = new DataView(request.data.buffer);
					
				} else if (is(request.data , URLVariables)) {
					
					_url += '?' + request.data.toString();
					
				} else {
					
					try {
						
						data = JSON.stringify(request.data);
						
					} catch (e) {
						
						
						
					e = window.asc.e2e(e);
						
						
						
					}
					
				}
				
			}
		
			try {
				
				_create.__bind(this)();
				_open.__bind(this)(request.method || URLRequestMethod.GET, _url, URLStream.sync);
				
				for (var i:number = 0; i < headers.length; ++i) {
					
					_header.__bind(this)(headers[i].name, headers[i].value);
					
				}
				
				_load.__bind(this)(data);
				
			} catch (e) {
				
				e = window.asc.e2e(e);
				
				this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, e.message));
				
			}
			
			function _create ():void {
				this._xhr = new XMLHttpRequest;
			}
			
			function _open ( method, url, sync ):void {
				this._xhr.open(method, url, !sync);
			}
			
			function _header ( name, value ): void {
				this._xhr.setRequestHeader(name, value);
			}
			
			function _load ( data ):void {
				this._xhr.responseType = "arraybuffer";
				this._xhr.onreadystatechange = this.xhr_onreadystatechange.__bind(this);
				this._xhr.onprogress = this.xhr_progress.__bind(this);
				this._xhr.send(data);
			}
		}
		
		/**
		 * Reads length bytes of data from the stream.
		 * @param b
		 * @param offset
		 * @param length
		 * 
		 */		
		public readBytes(b:ByteArray, offset:number = 0, length:number = 0):void {
			/**/ b = strict(b, ByteArray); offset = ((offset) >>> 0); length = ((length) >>> 0);
			this._data.readBytes(b, offset, length);
		}
		
		/**
		 * Reads a Boolean value from the stream. 
		 * @return 
		 * 
		 */		
		public readBoolean():boolean {
			return this._data.readBoolean();
		}
		
		/**
		 * Reads a signed byte from the stream. 
		 * @return 
		 * 
		 */		
		public readByte():number {
			return this._data.readByte();
		}
		
		/**
		 * Reads an unsigned byte from the stream. 
		 * @return 
		 * 
		 */		
		public readUnsignedByte():number {
			return this._data.readUnsignedByte();
		}
		
		/**
		 * Reads a signed 16-bit integer from the stream. 
		 * @return 
		 * 
		 */		
		public readShort():number {
			return this._data.readShort();
		}
		
		/**
		 * Reads an unsigned 16-bit integer from the stream. 
		 * @return 
		 * 
		 */		
		public readUnsignedShort():number {
			return this._data.readUnsignedShort();
		}
		
		/**
		 * Reads an unsigned 32-bit integer from the stream. 
		 * @return 
		 * 
		 */		
		public readUnsignedInt():number {
			return this._data.readUnsignedInt();
		}
		
		/**
		 * Reads a signed 32-bit integer from the stream. 
		 * @return 
		 * 
		 */		
		public readInt():number {
			return this._data.readInt();
		}
		
		/**
		 * Reads an IEEE 754 single-precision floating-point number from the stream. 
		 * @return 
		 * 
		 */		
		public readFloat():number {
			return this._data.readFloat();
		}
		
		/**
		 * Reads an IEEE 754 double-precision floating-point number from the stream. 
		 * @return 
		 * 
		 */		
		public readDouble():number {
			return this._data.readDouble();
		}
		
		/**
		 * Reads a multibyte string of specified length from the byte stream using the specified character set. 
		 * @param param1
		 * @param param2
		 * @return 
		 * 
		 */		
		public readMultiByte(param1:number, param2:string):string {
			/**/ param1 = ((param1) >>> 0); param2 = as(param2, 'String');
			return this._data.readMultiByte(param1, param2);
		}
		
		/**
		 * Reads a UTF-8 string from the stream. 
		 * @return 
		 * 
		 */		
		public readUTF():string {
			return this._data.readUTF();
		}
		
		/**
		 * Reads a sequence of length UTF-8 bytes from the stream, and returns a string. 
		 * @param param1
		 * @return 
		 * 
		 */		
		public readUTFBytes(param1:number):string {
			/**/ param1 = ((param1) >>> 0);
			return this._data.readUTFBytes(param1);
		}
		
		/**
		 * Indicates whether this URLStream object is currently connected. 
		 * @return 
		 * 
		 */		
		public get connected():boolean { return false; }
		
		/**
		 * Returns the number of bytes of data available for reading in the input buffer. 
		 * @return 
		 * 
		 */		
		public get bytesAvailable():number {
			return this._data.bytesAvailable;
		}
		
		/**
		 * Immediately closes the stream and cancels the download operation. 
		 * 
		 */		
		public close():void {
			try {
				
				this._xhr.onreadystatechange = undefined;
				this._xhr.onprogress = undefined;
				this._xhr.abort();
				
			} catch (e) {
				
				
				
			e = window.asc.e2e(e);
				
				
				
			}
		}
		
		/**
		 * Reads an object from the socket, encoded in Action Message Format (AMF). 
		 * @return 
		 * 
		 */		
		public readObject():any {
			return this._data.readObject();
		}
		
		/**
		 * Controls the version of Action Message Format (AMF) used when writing or reading an object. 
		 * @return 
		 * 
		 */		
		public get objectEncoding():number { return this._data.objectEncoding; }
		public set objectEncoding(param1:number) { /**/ param1 = ((param1) >>> 0); this._data.objectEncoding = param1; }
		
		/**
		 * Indicates the byte order for the data 
		 * @return 
		 * 
		 */		
		public get endian():string { return this._data.endian; }
		public set endian(param1:string) { /**/ param1 = as(param1, 'String'); this._data.endian = param1; }
		
		/**
		 * Helpers 
		 * @param e
		 * 
		 */		
		private xhr_progress(e:any):void
		{
			this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false, e.loaded, e.total));
		}
		
		private xhr_onreadystatechange(e:any):void
		{
			// readyState
			var state:number =  ((this._xhr.readyState) >> 0);
			// status
			var status:number =  ((this._xhr.status) >> 0);
			
			// check readyState and status
			var complete:boolean = state == 4 && status == 200;
			var error:boolean = state == 4 && (status == 400 || status == 403 || status == 404);
			var securityError:boolean = state == 4 && status == 0;
			
			// HTTPStatusEvent
			var ev:HTTPStatusEvent = new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS, false, false, status || 0);
			var headersRaw:string = 'getAllResponseHeaders' in this._xhr ? this._xhr.getAllResponseHeaders() : undefined;
			if (headersRaw && (complete || error || securityError)) {
				
				var headers:URLRequestHeader[] = new Array;
				var tmp:any[] = headersRaw.split('\n');
				var len:number =  ((tmp.length) >> 0);
				
				for (var i:number = 0; i < len; ++i) {
					
					var str:string =  as(tmp[i].replace(/\r/, ''), 'String');
					var index:number = str.indexOf(': ');
					if (index == -1) {
						
						continue;
						
					}
					
					headers.push(new URLRequestHeader(str.substring(0, index), str.substr(index + 2)));
				}
				
				ev.responseHeaders =strict( headers, Array);
				
			}
			
			this.dispatchEvent(ev);
			
			// ByteArray
			if (state == 4) {
				
				var buffer:ArrayBuffer = as(this._xhr.response , ArrayBuffer);
				if (buffer) {
					
					this._data = this._data.__fromArrayBuffer(buffer);
					
				}
				
			}
			
			// dispatch
			if (complete) {
				
				// ProgressEvent
				this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false, this._data.length, this._data.length));
				
				// Event
				this.dispatchEvent(new Event(Event.COMPLETE));
				
			} else if (error) {
				
				// IOErrorEvent
				this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR));
				
			} else if (securityError) {
				
				// SecurityErrorEvent
				this.dispatchEvent(new SecurityErrorEvent(SecurityErrorEvent.SECURITY_ERROR));
				
			}
		}
	}

}