/// <reference path="../../base.d.ts" />
/// <reference path="../events/ContextMenuEvent.ts" />
/// <reference path="../display/NativeMenuItem.ts" />

namespace flash.ui
{
	export import NativeMenuItem = flash.display.NativeMenuItem;
	export import ContextMenuEvent = flash.events.ContextMenuEvent;
	

	/**
	 * The ContextMenuItem class represents an item in the context menu. Each ContextMenuItem object has a caption (text) that is displayed 
	 * in the context menu. To add a new item to a context menu, you add it to the customItems array of a ContextMenu object.
	 * With the properties of the ContextMenuItem class you can enable or disable specific menu items, and you can make items visible or 
	 * invisible.
	 * 
	 * You write an event handler for the menuItemSelect event to add functionality to the menu item when the user selects it.
	 * Custom menu items appear at the top of the context menu, above any built-in items. A separator bar divides custom menu items 
	 * from built-in items. In AIR, there are no built-in items and the following restrictions do not apply to content in the 
	 * AIR application sandbox.
	 * 
	 * Restrictions:
	 * 
	 * You can add no more than 15 custom items to a context menu.
	 * Each caption must contain at least one visible character.
	 * Control characters, newlines, and other white space characters are ignored.
	 * No caption can be more than 100 characters long.
	 * Captions that are identical to any built-in menu item, or to another custom item, are ignored, whether the matching item is 
	 * visible or not. Menu captions are compared to built-in captions or existing custom captions without regard to case, punctuation, 
	 * or white space.
	 * The following captions are not allowed, but the words may be used in conjunction with other words to form a custom caption 
	 * (for example, although "Paste" is not allowed, "Paste tastes great" is allowed):
 	 * Save
 	 * Zoom In
 	 * Zoom Out
 	 * 100%
 	 * Show All
 	 * Quality
 	 * Play
 	 * Loop
 	 * Rewind
 	 * Forward
 	 * Back
 	 * Movie not loaded
 	 * About
 	 * Print
 	 * Show Redraw Regions
 	 * Debugger
 	 * Undo
 	 * Cut
 	 * Copy
 	 * Paste
 	 * Delete
 	 * Select All
 	 * Open
 	 * Open in new window
 	 * Copy link
 	 * 
	 * None of the following words can appear in a custom caption on their own or in conjunction with other words:
 	 * Adobe
 	 * Macromedia
 	 * Flash Player
 	 * Settings
	 *  
	 * Note: When the player is running on a non-English system, the caption strings are compared to both the English list and the localized equivalents
	 * 
	 * @author pkulikov
	 */
	export  class ContextMenuItem extends NativeMenuItem
	{
		/**
		 * Specifies the menu item caption (text) displayed in the context menu. 
		 */		
		public caption : string;

		/**
		 * Indicates whether a separator bar should appear above the specified menu item. 
		 */		
		public separatorBefore : boolean;

		/**
		 * Indicates whether the specified menu item is visible when the Flash Player context menu is displayed. 
		 */		
		public visible : boolean;
		
		/**
		 * Helpers 
		 */		
		public enabled:boolean;
		
		/**
		 * Creates a new ContextMenuItem object that can be added to the ContextMenu.customItems array. 
		 * @param caption
		 * @param separatorBefore
		 * @param enabled
		 * @param visible
		 * 
		 */		
		constructor(caption:string, separatorBefore:boolean = false, enabled:boolean = true, visible:boolean = true)
		{
			/**/ caption = as(caption, 'String'); separatorBefore = Boolean(separatorBefore); enabled = Boolean(enabled); visible = Boolean(visible);
			/**/ this.caption === void 0 && (this.caption = null);
			/**/ this.separatorBefore === void 0 && (this.separatorBefore = false);
			/**/ this.visible === void 0 && (this.visible = false);
			/**/ this.enabled === void 0 && (this.enabled = false);
			super(); 
			this.caption = caption;
			this.separatorBefore = separatorBefore;
			this.enabled = enabled;
			this.visible = visible;
		}
		
		/**
		 * Creates a copy of the NativeMenuItem object. 
		 * @return 
		 * 
		 */		
		public clone():ContextMenuItem
		{
			return new ContextMenuItem(this.caption, this.separatorBefore, this.enabled, this.visible);
		}
		
		/**
		 * Helpers 
		 * 
		 */		
		public click ():void
		{
			this.dispatchEvent(new ContextMenuEvent(ContextMenuEvent.MENU_ITEM_SELECT));
		}
	}	
}