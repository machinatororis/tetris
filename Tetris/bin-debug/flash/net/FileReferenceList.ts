/// <reference path="../../base.d.ts" />
/// <reference path="../utils/setTimeout.ts" />
/// <reference path="../utils/clearTimeout.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../events/Event.ts" />
﻿
namespace flash.net
{
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import clearTimeout = flash.utils.clearTimeout;
	export import setTimeout = flash.utils.setTimeout;
	
	
	/**
	 * The FileReferenceList class provides a means to let users select one or more files for uploading. 
	 * A FileReferenceList object represents a group of one or more local files on the user's disk as an array of FileReference objects. 
	 * For detailed information and important considerations about FileReference objects and the FileReference class, 
	 * which you use with FileReferenceList, see the FileReference class.
	 * To work with the FileReferenceList class:
	 * 
	 * Instantiate the class: var myFileRef = new FileReferenceList();
	 * 
	 * Call the FileReferenceList.browse() method, which opens a dialog box that lets the user select one or more files for upload: 
	 * myFileRef.browse();
	 * 
	 * After the browse() method is called successfully, the fileList property of the FileReferenceList object is populated with an array 
	 * of FileReference objects.
	 * 
	 * Call FileReference.upload() on each element in the fileList array.
	 * 
	 * The FileReferenceList class includes a browse() method and a fileList property for working with multiple files. 
	 * While a call to FileReferenceList.browse() is executing, SWF file playback pauses in stand-alone and external versions of 
	 * Flash Player and in AIR for Linux and Mac OS X 10.1 and earlier.
	 * 
	 * @author pkulikov
	 */
	export  class FileReferenceList extends EventDispatcher
	{
		private _input:HTMLElement;
		private _files:any[];
		
		/**
		 * Creates a new FileReferenceList object. 
		 * 
		 */		
		constructor()
		{
			/**/ this._input === void 0 && (this._input = null);
			/**/ this._files === void 0 && (this._files = null);
			super(); 
			
		}
		
		/**
		 * An array of FileReference objects. 
		 * @return 
		 * 
		 */		
		public get fileList () : any[]
		{
			return this._files;
		}
			
		/**
		 * Displays a file-browsing dialog box that lets the user select one or more local files to upload. 
		 */		
		public browse(typeFilter:any[] = null):boolean
		{
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
			this._input.setAttribute('multiple', 'true');
			if (accept) {
				this._input.setAttribute('accept', accept.join(','));
			}
			
			var timeout:number = 0;
			this._input.addEventListener('change', function (e)
			{
				clearTimeout(timeout);
				this._input = null;
				this._files = [];
				var files = e.target.files;
				for (var i = 0, f; f = files[i]; i++) {
					this._files.push(new FileReference()._fromFile(f));
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
	}	
}