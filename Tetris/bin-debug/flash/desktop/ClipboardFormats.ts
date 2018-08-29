/// <reference path="../../base.d.ts" />

namespace flash.desktop
{
	
	/**
	 * The ClipboardFormats class defines constants for the names of the standard data formats used with the Clipboard class. 
	 * Flash Player 10 only supports TEXT_FORMAT, RICH_TEXT_FORMAT, and HTML_FORMAT.
	 * @author pkulikov
	 */
	export  class ClipboardFormats
	{
		/**
		 * Image data (AIR only). 
		 */		
		public static BITMAP_FORMAT : string = "air:bitmap";

		/**
		 * An array of files (AIR only). 
		 */		
		public static FILE_LIST_FORMAT : string = "air:file list";

		/**
		 * File promise list (AIR only). 
		 */		
		public static FILE_PROMISE_LIST_FORMAT : string = "air:file promise list";

		/**
		 * HTML data. 
		 */		
		public static HTML_FORMAT : string = "air:html";

		/**
		 * Rich Text Format data. 
		 */		
		public static RICH_TEXT_FORMAT : string = "air:rtf";

		/**
		 * String data. 
		 */		
		public static TEXT_FORMAT : string = "air:text";

		/**
		 * A URL string (AIR only). 
		 */		
		public static URL_FORMAT : string = "air:url";
		
		/**
		 * Constructor
		 */
		constructor()
		{
			throw new Error('Abstract class Error');
		}
	}	
}