/// <reference path="../../base.d.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../../XML.ts" />
﻿
namespace flash.display
{
	export import XML = global.XML;
	export import EventDispatcher = flash.events.EventDispatcher;
	

	/**
	 * The NativeMenu class contains methods and properties for defining native menus.
	 * AIR profile support: This feature is supported on all desktop operating systems, but is not supported on mobile devices or 
	 * AIR for TV devices. You can test for support at run time using the NativeMenu.isSupported property. 
	 * See AIR Profile Support for more information regarding API support across multiple profiles.
	 * 
	 * A native menu is a menu that is controlled and drawn by the operating system rather than by your application. 
	 * AIR supports the following types of native menus:
	 * 
	 * Application menus are supported on OS X. Use the NativeApplication.supportsMenu property to test whether application menus are 
	 * supported on the host operating system. An application menu is displayed on the Menu bar at the top of the Mac desktop. 
	 * OS X provides a default menu for every application, but many of the menu commands are not functional. 
	 * You can add event listeners to the default items, replace individual menus and items, or even replace the default menu entirely. 
	 * Access the application menu object using the NativeApplication menu property.
	 * 
	 * Window menus are supported on Windows and Linux. Use the NativeWindow.supportsMenu property to test whether window menus are 
	 * supported on the host operating system. A window menu is displayed below the window title bar. The area occupied by the menu is 
	 * not part of the window stage. Applications cannot draw into this area. Assign a menu to a window using the NativeWindow menu property.
	 * 
	 * Dock icon menus are supported on OS X. Use the NativeApplication.supportsDockIcon property to test whether dock icons are 
	 * supported on the host operating system. Items in a dock icon menu are displayed above the default items provided by the operating system.
	 *  The default items cannot be accessed by application code. Assign a menu to the menu property of the application's DockIcon object.
	 * 
	 * System tray icon menus are supported on Windows and most Linux operating systems. 
	 * Use the NativeApplication.supportsSystemTrayIcon property to test whether system tray icons are supported on the host operating system.
	 *  A system tray icon menu is displayed in response to a right-click on the icon, in much the same fashion as a context menu.
	 *  Assign a menu to the menu property of the application's SystemTrayIcon object.
	 * 
	 * Context menus are supported on all operating systems. Context menus are displayed in response to a user interface event, 
	 * such as a right-click or a command-click on an InteractiveObject displayed in the application. The UI mechanism for showing 
	 * the menu varies by host operating system and hardware. Assign a menu to the contextMenu property of an InteractiveObject. 
	 * In AIR, a context menu can be created with either the NativeMenu class or the ContextMenu class. In Flash Player, 
	 * only the ContextMenu class can be used. ContextMenus in AIR do not have built-in items; a default context menu is not displayed.
	 * 
	 * Pop-up menus are supported on all operating systems. Pop-up menus are functionally the same as context menus, but are displayed 
	 * using the menu display() method rather than as a response to a user interface event. A pop-up menu is not attached to any other object.
	 *  Simply create the native menu and call the display() method.
	 * A menu object contains menu items. A menu item can represent a command, a submenu, or a separator line. 
	 * Add menu items to a menu using the addItem() or addItemAt() method. The display order of the menu items matches the order 
	 * of the items in the menu's items array.
	 * 
	 * To create a submenu, add a menu item to the parent menu object. Assign the menu object representing the submenu to the 
	 * submenu property of the matching menu item in the parent menu.
	 * 
	 * Note: The root menu of window and application menus must contain only submenu items; items that do not represent submenus 
	 * may not be displayed and are contrary to user expectation for these types of menus.
	 * 
	 * Menus dispatch select events when a command item in the menu or one of its submenus is selected. 
	 * (Submenu and separator items are not selectable.) The target property of the event object references the selected item.
	 * 
	 * Menus dispatch preparing events just before the menu is displayed and when a key equivalent attached to one of the items in 
	 * the menu is pressed. You can use this event to update the contents of the menu based on the current state of the application.
	 * 
	 * Note: If you are using the Flex Framework, consider using the FlexNativeMenu class. It is typically easier to define 
	 * menus declaratively in MXML than it is to write ActionScript code to create the menu structure item-by-item.
	 * 
	 * @author pkulikov
	 */
	export  class NativeMenu extends EventDispatcher
	{
		/**
		 * Creates a new NativeMenu object. 
		 * 
		 */		
		constructor()
		{
			super(); 
			
		}
	}	
}