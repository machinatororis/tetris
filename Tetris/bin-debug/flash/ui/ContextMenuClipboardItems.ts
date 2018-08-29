/// <reference path="../../base.d.ts" />

namespace flash.ui
{
	
	/**
	 * The ContextMenuClipboardItems class lets you enable or disable the commands in the clipboard context menu.
	 * Enable or disable the context menu clipboard commands using the clipboardItems property of the ContextMenu object. 
	 * The clipboardItems property is an instance of this ContextMenuClipboardItems class. The clipboard context menu is shown in a 
	 * context menu when the clipboardMenu property of the context menu is true, unless the context menu is for a TextField object. 
	 * TextField objects control the display of the context menu and the state of its clipboard items automatically.
	 * 
	 * @author pkulikov
	 */
	export  class ContextMenuClipboardItems
	{
		/**
		 * Enables or disables the 'Delete' or 'Clear' item on the clipboard menu. 
		 */		
		public clear : boolean = false;

		/**
		 * Enables or disables the 'Copy' item on the clipboard menu. 
		 */		
		public copy : boolean = false;

		/**
		 * Enables or disables the 'Cut' item on the clipboard menu. 
		 */		
		public cut : boolean = false;

		/**
		 * Enables or disables the 'Paste' item on the clipboard menu. 
		 */		
		public paste : boolean = false;

		/**
		 * Enables or disables the 'Select All' item on the clipboard menu. 
		 */		
		public selectAll : boolean = false;
		
		/**
		 * Creates a new ContextMenuClipboardItems object. 
		 * 
		 */		
		constructor()
		{
			
		}
	}	
}