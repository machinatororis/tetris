/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../system/Capabilities.ts" />
/// <reference path="../display/PNGEncoderOptions.ts" />
/// <reference path="../display/BitmapData.ts" />
/// <reference path="../__native/utils/Base64.ts" />

namespace flash.ui
{
	export import Base64 = flash.__native.utils.Base64;
	export import BitmapData = flash.display.BitmapData;
	export import PNGEncoderOptions = flash.display.PNGEncoderOptions;
	export import Capabilities = flash.system.Capabilities;
	export import ByteArray = flash.utils.ByteArray;
	

	/**
	 * The methods of the Mouse class are used to hide and show the mouse pointer, or to set the pointer to a specific style. 
	 * The Mouse class is a top-level class whose properties and methods you can access without using a constructor. 
	 * The pointer is visible by default, but you can hide it and implement a custom pointer. 
	 * @author pkulikov
	 * 
	 */	
	export  class Mouse
	{
		/**
		 * Hides the pointer. 
		 */		
		public static hide():void
		{
			document.body.style.cursor = 'none';
			Mouse.sCursorShowed = false;
		}
		
		/**
		 * Displays the pointer.
		 */		
		public static show():void
		{
			var cursor:string = Mouse.sSystemCursor || Mouse.sCursor, style:string = cursor, custom:MouseCursorData =  strict(Mouse.sCursorData[cursor], MouseCursorData);
			
			// Edge bug: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/5781679/
			// url(data:image/cur;base64,...),auto
			if (Capabilities.browser.indexOf('Microsoft') >= 0) {
				
				custom = null;
				
			}
			
			if (ContextMenu.isOpened == true) {
				
				style = MouseCursor.AUTO;
				
			} else if (custom) {
				
				style = 'url(data:image/png;base64,' + custom.base64 + '),auto';
				
			} else if (!MouseCursor.isValid(cursor)) {
				
				style = MouseCursor.AUTO;
				
			}
			
			if (MouseCursor.isValid(cursor)) {
				
				style = MouseCursor.toCSS(style);
				
			}
			
			document.body.style.cursor = style;
			Mouse.sCursorShowed = true;
		}
		
		/**
		 * Indicates whether the computer or device displays a persistent cursor. 
		 * @return 
		 * 
		 */		
		public static get supportsCursor():boolean
		{
			return true;
		}
		
		/**
		 * Indicates whether the current configuration supports native cursors. 
		 * @return 
		 * 
		 */		
		public static get supportsNativeCursor():boolean
		{
			return Mouse.supportsCursor;
		}
		
		/**
		 * The name of the native cursor. 
		 * @return 
		 * 
		 */		
		public static get cursor():string { return Mouse.sCursor; }
		public static set cursor(name:string)
		{
			/**/ name = as(name, 'String');
			if (!MouseCursor.isValid(name) && !Mouse.sCursorData[name]) {
				
				throw new ArgumentError('Parameter cursor must be one of the accepted values.', 2008);
				
			}
			
			Mouse.sCursor = name;
			if (Mouse.sCursorShowed) Mouse.show();
		}
		
		/**
		 * Internal 
		 * @return 
		 * 
		 */		
		public static get systemCursor():string { return Mouse.sSystemCursor; }
		public static set systemCursor(name:string)
		{
			/**/ name = as(name, 'String');
			Mouse.sSystemCursor = name;
			if (Mouse.sCursorShowed) Mouse.show();
		}
		
		/**
		 * Registers a native cursor under the given name, with the given data. 
		 * @param name
		 * @param cursor
		 * 
		 */		
		public static registerCursor(name:string, cursor:MouseCursorData):void
		{
			/**/ name = as(name, 'String'); cursor = strict(cursor, MouseCursorData);
			if (!Mouse.supportsCursor) {
				
				return;
				
			}
			
			if (!cursor || !cursor.data.length) {
				
				throw new ArgumentError('One of the parameters is invalid.', 2004);
				
			}
			
			var bd:BitmapData = as(cursor.data[0] , BitmapData);
			var png:ByteArray = bd.encode(bd.rect, new PNGEncoderOptions);
			cursor.base64 = Base64.encode(png);
			Mouse.sCursorData[name] = cursor;
		}
		
		/**
		 * Unregisters the native cursor with the given name. 
		 * @param name
		 * 
		 */		
		public static unregisterCursor(name:string):void
		{
			/**/ name = as(name, 'String');
			delete Mouse.sCursorData[name];
		}
		
		/**
		 * Helpers 
		 */		
		private static sCursor:string = asc.sti(Mouse,()=>{ Mouse.sCursor = MouseCursor.AUTO; });
		private static sCursorShowed:boolean = true;
		private static sSystemCursor:string = null;
		private static sCursorData:any = {};
	}

}