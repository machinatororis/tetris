/// <reference path="../../base.d.ts" />
/// <reference path="../utils/setTimeout.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../__native/utils/Base64.ts" />
/// <reference path="../events/IOErrorEvent.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../../XML.ts" />

namespace flash.net
{
	export import XML = global.XML;
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import IOErrorEvent = flash.events.IOErrorEvent;
	export import Base64 = flash.__native.utils.Base64;
	export import ByteArray = flash.utils.ByteArray;
	export import setTimeout = flash.utils.setTimeout;
	

	/**
	 * The FileReference class provides a means to upload and download files between a user's computer and a server. 
	 * An operating-system dialog box prompts the user to select a file to upload or a location for download. 
	 * Each FileReference object refers to a single file on the user's disk and has properties that contain information about 
	 * the file's size, type, name, creation date, modification date, and creator type (Macintosh only).
	 * Note: In Adobe AIR, the File class, which extends the FileReference class, 
	 * provides more capabilities and has less security restrictions than the FileReference class.
	 * 
	 * FileReference instances are created in the following ways:
	 * 
	 * When you use the new operator with the FileReference constructor: var myFileReference = new FileReference();
	 * When you call the FileReferenceList.browse() method, which creates an array of FileReference objects.
	 * During an upload operation, all the properties of a FileReference object are populated by calls to the FileReference.browse() or 
	 * FileReferenceList.browse() methods. During a download operation, the name property is populated when the select event is dispatched; all other properties are populated when the complete event is dispatched.

	 * The browse() method opens an operating-system dialog box that prompts the user to select a file for upload. 
	 * The FileReference.browse() method lets the user select a single file; the FileReferenceList.browse() method lets the user 
	 * select multiple files. After a successful call to the browse() method, call the FileReference.upload() method to 
	 * upload one file at a time. The FileReference.download() method prompts the user for a location to save the 
	 * file and initiates downloading from a remote URL.

	 * The FileReference and FileReferenceList classes do not let you set the default file location for the dialog box that the browse() 
	 * or download() methods generate. The default location shown in the dialog box is the most recently browsed folder, 
	 * if that location can be determined, or the desktop. The classes do not allow you to read from or write to the transferred file. 
	 * They do not allow the SWF file that initiated the upload or download to access the uploaded or downloaded file or 
	 * the file's location on the user's disk.

	 * The FileReference and FileReferenceList classes also do not provide methods for authentication. 
	 * With servers that require authentication, you can download files with the Flash® Player browser plug-in, 
	 * but uploading (on all players) and downloading (on the stand-alone or external player) fails. 
	 * Listen for FileReference events to determine whether operations complete successfully and to handle errors.

	 * For content running in Flash Player or for content running in Adobe AIR outside of the application security sandbox, 
	 * uploading and downloading operations can access files only within its own domain and within any domains that a URL policy file specifies. Put a policy file on the file server if the content initiating the upload or download doesn't come from the same domain as the file server.

	 * Note that because of new functionality added to the Flash Player, when publishing to Flash Player 10, 
	 * you can have only one of the following operations active at one time: FileReference.browse(), FileReference.upload(), 
	 * FileReference.download(), FileReference.load(), FileReference.save(). Otherwise, Flash Player throws a runtime error (code 2174). 
	 * Use FileReference.cancel() to stop an operation in progress. This restriction applies only to Flash Player 10. 
	 * Previous versions of Flash Player are unaffected by this restriction on simultaneous multiple operations.

	 * While calls to the FileReference.browse(), FileReferenceList.browse(), or FileReference.download() methods are executing, 
	 * SWF file playback pauses in stand-alone and external versions of Flash Player and in AIR for Linux and Mac OS X 10.1 and earlie
	 * 
	 * @author pkulikov
	 */
	export  class FileReference extends EventDispatcher
	{
		/**
		 * The creation date of the file on the local disk. 
		 * @return 
		 * 
		 */		
		public get creationDate () : Date {
			return null;
		}
			
		/**
		 * The Macintosh creator type of the file, which is only used in Mac OS versions prior to Mac OS X. 
		 * @return 
		 * 
		 */		
		public get creator () : string {
			return null;
		}
		
		/**
		 * The ByteArray object representing the data from the loaded file after a successful call to the load() method. 
		 * @return 
		 * 
		 */		
		public get data () : ByteArray {
			return this._data;
		}
		
		/**
		 * The filename extension. 
		 * @return 
		 * 
		 */		
		public get extension () : string {
			return this._extension;
		}
		
		/**
		 * The date that the file on the local disk was last modified. 
		 * @return 
		 * 
		 */		
		public get modificationDate () : Date {
			return null;
		}
		
		/**
		 * The name of the file on the local disk. 
		 * @return 
		 * 
		 */		
		public get name () : string {
			return this._name;
		}
		
		/**
		 * The size of the file on the local disk in bytes. 
		 * @return 
		 * 
		 */		
		public get size () : number {
			return !isNaN(this._size) ? this._size : 0;
		}
			
		/**
		 * The file type. 
		 * @return 
		 * 
		 */		
		public get type () : string {
			return this._type;
		}
		
		/**
		 * Helpers 
		 */		
		private _data:ByteArray;
		private _extension:string;
		private _name:string;
		private _type:string;
		private _size:number;
		private _file:File;
		private _input:HTMLElement;
		
		/**
		 * Creates a new FileReference object.
		 */		
		constructor()
		{
			/**/ this._data === void 0 && (this._data = null);
			/**/ this._extension === void 0 && (this._extension = null);
			/**/ this._name === void 0 && (this._name = null);
			/**/ this._type === void 0 && (this._type = null);
			/**/ this._size === void 0 && (this._size = NaN);
			/**/ this._file === void 0 && (this._file = null);
			/**/ this._input === void 0 && (this._input = null);
			super(); 
			
		}
		
		/**
		 * Displays a file-browsing dialog box that lets the user select a file to upload. 
		 * @param typeFilter
		 * @return 
		 * 
		 */		
		public browse(typeFilter:any[] = null):boolean {
			/**/ typeFilter = strict(typeFilter, Array);
			var accept:any[];
			var __for0 = window.asc.of(typeFilter);
			for  (var f of __for0)
			{
				accept = accept || [];
				var ext:string = f.extension;
				if (!ext) continue;
				ext = ext.substr(ext.lastIndexOf('.'));
				if (!ext.length) continue;
				accept.push(ext);
			}
			this._input = document.createElement('input');
			this._input.setAttribute('type', 'file');
			if (accept) {
				this._input.setAttribute('accept', accept.join(','));
			}
			
			var timeout:number = 0;
			this._input.addEventListener('change', function (e)
			{
				clearTimeout(timeout);
				this._input = null;
				var files = e.target.files;
				for (var i = 0, f; f = files[i]; i++) {
					this._fromFile(f);
					this.dispatchEvent(new Event(Event.SELECT));
					return;
				}
				this.dispatchEvent(new Event(Event.CANCEL));
			}.__bind(this));
			
			var onfocus:any = document.body.onfocus;
			document.body.onfocus = function(e)
			{
				document.body.onfocus = onfocus;
				if (onfocus != undefined) onfocus(e);
				timeout = setTimeout(function ():void {
					this._input = null;
					this.dispatchEvent(new Event(Event.CANCEL));
				}.__bind(this), 1000);
			}.__bind(this);
			
			this._input.click();
			return true;
		}
		
		/**
		 * Cancels any ongoing upload or download operation on this FileReference object. 
		 * 
		 */		
		public cancel():void {
			
		}
		
		/**
		 * Opens a dialog box that lets the user download a file from a remote server. 
		 * @param request
		 * @param defaultFileName
		 * 
		 */		
		public download(request:URLRequest, defaultFileName:string = null):void {
			
		/**/ request = strict(request, URLRequest); defaultFileName = as(defaultFileName, 'String');
			
		}
		
		/**
		 * Starts the load of a local file selected by a user. 
		 * 
		 */		
		public load():void {
			try
			{
				var reader:FileReader =  strict(new FileReader(), FileReader);
				reader.onload = function() {
					try
					{
						this._data = new ByteArray;
						this._data.__fromArrayBuffer(reader.result);
						this.dispatchEvent(new Event(Event.COMPLETE));
					} catch (e) {
						e = window.asc.e2e(e);
						this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR));
					}
				}.__bind(this);
				reader.readAsArrayBuffer(this._file);
				this.dispatchEvent(new Event(Event.OPEN));
			} catch (e) {
				e = window.asc.e2e(e);
				this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR));
			}
		}
		
		/**
		 * Opens a dialog box that lets the user save a file to the local filesystem. 
		 * @param data 
		 * @param defaultFileName
		 * 
		 */		
		public save(data:any, defaultFileName:string = null):void {
			/**/ defaultFileName = as(defaultFileName, 'String');
			this._name = this._name || defaultFileName || 'saved_file';
			var ba:ByteArray;
			if (is(data , ByteArray)) {
				ba =strict( this.data, ByteArray);
			} else if (is(data , XML)) {
				ba = new ByteArray;
				ba.writeUTFBytes(data.toXMLString());
			} else if (is(data , 'String')) {
				ba = new ByteArray;
				ba.writeUTFBytes(data);
			} else {
				throw new ArgumentError('invalid data');
			}
			this.dispatchEvent(new Event(Event.OPEN));
			try
			{
				var blob:Blob =  strict(new Blob([ba.buffer], {type: "octet/stream"}), Blob);
				var a:any = document.createElement('a');
				document.body.appendChild(a);
				a.href = window.URL.createObjectURL(blob);
				a.setAttribute('download', this._name);
				a.click();
				document.body.removeChild(a);
				this.dispatchEvent(new Event(Event.COMPLETE));
			} catch (e) {
				e = window.asc.e2e(e);
				this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR));
			}
		}
		
		/**
		 * Starts the upload of the file to a remote server. 
		 * @param request
		 * @param uploadDataFieldName
		 * @param testUpload
		 * 
		 */		
		public upload(request:URLRequest, uploadDataFieldName:string = "Filedata", testUpload:boolean = false):void {
			
		/**/ request = strict(request, URLRequest); uploadDataFieldName = as(uploadDataFieldName, 'String'); testUpload = Boolean(testUpload);
			
		}
		
		/**
		 * Initiate uploading a file to a URL without any encoding. 
		 * @param request
		 * 
		 */		
		public uploadUnencoded(request:URLRequest):void {
			
		/**/ request = strict(request, URLRequest);
			
		}
		
		public _fromFile (f:any):FileReference {
			if (!f) return this;
			this._file =strict( f, File);
			this._name =as( f.name, 'String');
			this._size =(+( f.size));
			this._type = this._name.substr(this._name.lastIndexOf('.'));
			return this;
		}
	}	
}