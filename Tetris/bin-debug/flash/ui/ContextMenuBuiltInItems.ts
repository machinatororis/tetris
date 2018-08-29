/// <reference path="../../base.d.ts" />

namespace flash.ui
{
	
	/**
	 * The ContextMenuBuiltInItems class describes the items that are built in to a context menu. 
	 * You can hide these items by using the ContextMenu.hideBuiltInItems() method.
	 * 
	 * @author pkulikov
	 */
	export  class ContextMenuBuiltInItems
	{
		/**
		 * Lets the user move forward or backward one frame in a SWF file at run time (does not appear for a single-frame SWF file). 
		 */		
		public forwardAndBack : boolean = false

		/**
		 * Lets the user set a SWF file to start over automatically when it reaches the final frame (does not appear for a single-frame SWF file). 
		 */		
		public loop : boolean = false;

		/**
		 * Lets the user start a paused SWF file (does not appear for a single-frame SWF file). 
		 */		
		public play : boolean = false;

		/**
		 * Lets the user send the displayed frame image to a printer. 
		 */		
		public print : boolean = false;

		/**
		 * Lets the user set the resolution of the SWF file at run time. 
		 */		
		public quality : boolean = false;

		/**
		 * Lets the user set a SWF file to play from the first frame when selected, at any time (does not appear for a single-frame SWF file). 
		 */		
		public rewind : boolean = false;

		/**
		 * Lets the user with Shockmachine installed save a SWF file. 
		 */		
		public save : boolean = false;

		/**
		 * Lets the user zoom in and out on a SWF file at run time. 
		 */		
		public zoom : boolean = false;
		
		/**
		 * Creates a new ContextMenuBuiltInItems object so that you can set the properties for Flash Player to display or hide each menu item. 
		 * 
		 */			
		constructor()
		{
			
		}
	}	
}