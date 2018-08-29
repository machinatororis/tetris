/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../display/BitmapData.ts" />

namespace flash.ui
{
	export import BitmapData = flash.display.BitmapData;
	export import Point = flash.geom.Point;
	

	/**
	 * The MouseCursorData class lets you define the appearance of a "native" mouse cursor.
	 * 
	 * To display the cursor, use the Mouse.registerCursor() function. To return control of the cursor image to the operating system, call Mouse.unregisterCursor(). Call Mouse.supportsNativeCursor to test whether native cursors are supported on the current computer.
	 * 
	 * The maximum cursor size is 32x32 pixels.Transparency is supported on most operating systems.
	 * 
	 * A native mouse cursor is implemented directly through the operating system cursor mechanism and is a more efficient means for displaying a custom cursor image than using a display object. You can animate the cursor by supplying more than one image in the data property and setting the frame rate.
	 * 
	 * The cursor is only displayed within the bounds of the stage. Outside the stage, control of the cursor image returns to the operating system
	 * 
	 * @author pkulikov
	 */
	export  class MouseCursorData
	{
		/** A Vector of BitmapData objects containing the cursor image or images. */
		public data: BitmapData[] = new Array;
		
		/** The frame rate for animating the cursor. */
		public frameRate: number = 0;
		
		/** The hot spot of the cursor in pixels. */
		public hotSpot: Point = null;
		
		/** Helpers */
		public base64:string = null;
		
		/**
		 * Constructor
		 */		
		constructor()
		{
			
		}
	}	
}