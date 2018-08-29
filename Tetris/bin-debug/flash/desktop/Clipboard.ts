/// <reference path="../../base.d.ts" />

namespace flash.desktop
{
	
	/**
	 * The Clipboard class provides a container for transferring data and objects through the clipboard. 
	 * The operating system clipboard can be accessed through the static generalClipboard property.
	 * A Clipboard object can contain the same information in more than one format. By supplying information in multiple formats, 
	 * you increase the chances that another application will be able to use that information. 
	 * Add data to a Clipboard object with the setData() or setDataHandler() method.
	 * 
	 * The standard formats are:
	 * 
	 * BITMAP_FORMAT: a BitmapData object (AIR only)
	 * FILE_LIST_FORMAT: an array of File objects (AIR only)
	 * HTML_FORMAT: HTML-formatted string data
	 * TEXT_FORMAT: string data
	 * RICH_TEXT_FORMAT: a ByteArray containing Rich Text Format data
	 * URL_FORMAT: a URL string (AIR only)
	 * These constants for the names of the standard formats are defined in the ClipboardFormats class.
	 * 
	 * When a transfer to or from the operating system occurs, the standard formats are automatically translated between ActionScript 
	 * data types and the native operating system clipboard types.
	 * 
	 * You can use application-defined formats to add ActionScript objects to a Clipboard object. If an object is serializable, 
	 * both a reference and a clone of the object can be made available. Object references are valid only within the originating application.
	 * 
	 * When it is computationally expensive to convert the information to be transferred into a particular format, 
	 * you can supply the name of a function that performs the conversion. The function is called if and only if that format is read by 
	 * the receiving component or application. Add a deferred rendering function to a Clipboard object with the setDataHandler() method. 
	 * Note that in some cases, the operating system calls the function before a drop occurs. For example, when you use a handler function 
	 * to provide the data for a file dragged from an AIR application to the file system, the operating system calls the data handler function 
	 * as soon as the drag gesture leaves the AIR application—typically resulting in an undesireable pause as the file data is downloaded or
	 *  created.
	 * 
	 * Note for AIR applications: The clipboard object referenced by the event objects dispatched for HTML drag-and-drop and copy-and-paste
	 *  events are not the same type as the AIR Clipboard object. The JavaScript clipboard object is described in the AIR developer's guide.
	 * 
	 * Note for Flash Player applications: In Flash Player 10, a paste operation from the clipboard first requires a user event 
	 * (such as a keyboard shortcut for the Paste command or a mouse click on the Paste command in a context menu). 
	 * Clipboard.getData() will return the contents of the clipboard only if the InteractiveObject has received and is acting on a paste event.
	 *  Calling Clipboard.getData() under any other circumstances will be unsuccessful. 
	 * The same restriction applies in AIR for content outside the application sandbox.
	 * 
	 * On Linux, clipboard data does not persist when an AIR application closes.
	 * @author pkulikov
	 */
	export  class Clipboard
	{
		/**
		 * The operating system clipboard. 
		 * @return 
		 * 
		 */		
		public static get generalClipboard () : Clipboard
		{
			if (!Clipboard._generalClipboard)
			{
				Clipboard._generalClipboard = new Clipboard;
				['cut', 'copy'].forEach(function(event) {
					document.addEventListener(event, function(e) {
						Clipboard._generalClipboard.setData(ClipboardFormats.TEXT_FORMAT, Clipboard.getSelectionText());
					}.__bind(this));
				}.__bind(this));
			}
			return Clipboard._generalClipboard;
		}
		
		/**
		 * Helpers 
		 */		
		private static _generalClipboard:Clipboard = null;
		private static getSelectionText ():string
		{
			var text = '';
			if (window.getSelection)
			{
				text = window.getSelection().toString();
			}
			return text;
		}
		
		/**
		 * @private 
		 */		
		private _data:any[] = null;
		private _dataFormat:any[] = null;
		
		/**
		 * Creates an empty Clipboard object. 
		 * 
		 */			
		constructor()
		{
			this._data = [];
			this._dataFormat = [];
		}
		
		/**
		 * An array of strings containing the names of the data formats available in this Clipboard object. 
		 * @return 
		 * 
		 */		
		public get formats () : any[]
		{
			return this._dataFormat;
		}
		
		/**
		 * Deletes all data representations from this Clipboard object. 
		 * 
		 */		
		public clear():void
		{
			this._data.length = 0;
			this._dataFormat.length = 0;
		}
		
		/**
		 * Deletes the data representation for the specified format. 
		 * @param format
		 * 
		 */		
		public clearData(format:string):void
		{
			/**/ format = as(format, 'String');
			var index:number = this._dataFormat.indexOf(format);
			if (index >= 0)
			{
				this._data.splice(index, 1);
				this._dataFormat.splice(index, 1);
			}
		}
		
		/**
		 * Gets the clipboard data if data in the specified format is present. 
		 * @param format
		 * @param transferMode
		 * @return 
		 * 
		 */		
		public getData(format:string, transferMode:string = "originalPreferred"):any
		{
			/**/ format = as(format, 'String'); transferMode = as(transferMode, 'String');
			if (this == Clipboard.generalClipboard && format == ClipboardFormats.TEXT_FORMAT && window.clipboardData)
			{
				var system:string =  as(window.clipboardData.getData('Text'), 'String');
				if (system) return system;
			}
			var index:number = this._dataFormat.indexOf(format);
			if (index >= 0)
			{
				return this._data[index];
			}
			return null;
		}
		
		/**
		 * Checks whether data in the specified format exists in this Clipboard object. 
		 */		
		public hasFormat(format:string):boolean
		{
			/**/ format = as(format, 'String');
			return this._dataFormat.indexOf(format) >= 0;
		}
		
		/**
		 * Adds a representation of the information to be transferred in the specified data format. 
		 */		
		public setData(format:string, data:any, serializable:boolean = true):void
		{
			/**/ format = as(format, 'String'); serializable = Boolean(serializable);
			if (this == Clipboard.generalClipboard && format == ClipboardFormats.TEXT_FORMAT && window.clipboardData)
			{
				window.clipboardData.setData('Text', data);
			}
			var index:number = this._dataFormat.indexOf(format);
			if (index == -1) index =(( this._dataFormat.length) >> 0);
			this._data[index] = data;
			this._dataFormat[index] = format;
		}
		
		/**
		 * Adds a reference to a handler function that produces the data to be transfered. 
		 */		
		public setDataHandler(format:string, handler:Function, serializable:boolean = true):boolean
		{
			/**/ format = as(format, 'String'); serializable = Boolean(serializable);
			return false;
		}
	}	
}