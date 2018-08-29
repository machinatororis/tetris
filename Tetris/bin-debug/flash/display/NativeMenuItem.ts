/// <reference path="../../base.d.ts" />
/// <reference path="../events/EventDispatcher.ts" />
﻿
namespace flash.display
{
	export import EventDispatcher = flash.events.EventDispatcher;
	

	/**
	 * The NativeMenuItem class represents a single item in a menu.
	 * A menu item can be a command, a submenu, or a separator line:
	 * 
	 * To create a command item, call the NativeMenuItem constructor, passing in a string for the label and false for the isSeparator parameter.
	 * 
	 * To create a submenu, create a command item for the parent menu and assign the NativeMenu object of the submenu to the item's 
	 * submenu property. You can also call the addSubmenu() method of the parent NativeMenu object to create the item and set the 
	 * submenu property at the same time.
	 * 
	 * To create a separator, call the NativeMenuItem constructor, passing in an empty string for the label and true for the isSeparator 
	 * parameter.
	 * 
	 * Listen for select events on an item or a parent menu to detect when a menu command is selected. Neither submenus nor separators 
	 * dispatch select events. Listen for preparing events to determine when a menu item is about to be displayed or activated through 
	 * a key equivalent.
	 * 
	 * @author pkulikov
	 */
	export  class NativeMenuItem extends EventDispatcher
	{
		/**
		 * Creates a new NativeMenuItem object. 
		 * 
		 */		
		constructor(label:string = "", isSeparator:boolean = false)
		{
			/**/ label = as(label, 'String'); isSeparator = Boolean(isSeparator);
			super(); 
			
		}
	}	
}