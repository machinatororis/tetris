/// <reference path="../../base.d.ts" />
/// <reference path="../system/Capabilities.ts" />
/// <reference path="../net/URLRequest.ts" />
/// <reference path="../events/MouseEvent.ts" />
/// <reference path="../events/ContextMenuEvent.ts" />
/// <reference path="../display/Stage.ts" />
/// <reference path="../display/NativeMenu.ts" />

namespace flash.ui
{
	export import NativeMenu = flash.display.NativeMenu;
	export import Stage = flash.display.Stage;
	export import ContextMenuEvent = flash.events.ContextMenuEvent;
	export import MouseEvent = flash.events.MouseEvent;
	export import URLRequest = flash.net.URLRequest;
	export import Capabilities = flash.system.Capabilities;
	

	/**
	 * The ContextMenu class provides control over the items displayed in context menus.
	 * Mobile Browser Support: This class is not supported in mobile browsers.
	 * 
	 * AIR profile support: This feature is not supported on mobile devices or AIR for TV devices. 
	 * See AIR Profile Support for more information regarding API support across multiple profiles.
	 * 
	 * In Flash Player, users open the context menu by right-clicking (Windows or Linux) or Control-clicking (Macintosh) Flash Player. 
	 * You can use the methods and properties of the ContextMenu class to add custom menu items, control the display of the built-in 
	 * context menu items (for example, Zoom In, and Print), or create copies of menus. In AIR, there are no built-in 
	 * items and no standard context menu.
	 * 
	 * In Flash Professional, you can attach a ContextMenu object to a specific button, movie clip, or text field object, 
	 * or to an entire movie level. You use the contextMenu property of the InteractiveObject class to do this.
	 * 
	 * In Flex or Flash Builder, only top-level components in the application can have context menus. For example, 
	 * if a DataGrid control is a child of a TabNavigator or VBox container, the DataGrid control cannot have its own context menu.
	 * 
	 * To add new items to a ContextMenu object, you create a ContextMenuItem object, and then add that object to the 
	 * ContextMenu.customItems array. For more information about creating context menu items, see the ContextMenuItem class entry.
	 * 
	 * Flash Player has three types of context menus: the standard menu (which appears when you right-click in Flash Player), 
	 * the edit menu (which appears when you right-click a selectable or editable text field), and an error menu 
	 * (which appears when a SWF file has failed to load into Flash Player). Only the standard and edit menus can be modified 
	 * with the ContextMenu class. Only the edit menu appears in AIR.
	 * 
	 * Custom menu items always appear at the top of the Flash Player context menu, above any visible built-in menu items; 
	 * a separator bar distinguishes built-in and custom menu items. You cannot remove the Settings menu item from the context menu. 
	 * The Settings menu item is required in Flash so that users can access the settings that affect privacy and storage on their computers. 
	 * You also cannot remove the About menu item, which is required so that users can find out what version of Flash Player they are using. 
	 * (In AIR, the built-in Settings and About menu items are not used.)
	 * 
	 * You can add no more than 15 custom items to a context menu in Flash Player. In AIR, there is no explicit limit imposed on the number 
	 * of items in a context menu.
	 * 
	 * You must use the ContextMenu() constructor to create a ContextMenu object before calling its methods.
	 * 
	 * @author pkulikov
	 */
	export  class ContextMenu extends NativeMenu
	{
		/**
		 * An instance of the ContextMenuBuiltInItems class with the following properties: 
		 * forwardAndBack, loop, play, print, quality, rewind, save, and zoom. 
		 */		
		public builtInItems : ContextMenuBuiltInItems;

		/**
		 * An instance of the ContextMenuClipboardItems class with the following properties: cut, copy, paste, delete, selectAll. 
		 */		
		public clipboardItems : ContextMenuClipboardItems;

		/**
		 * Specifies whether or not the clipboard menu should be used. 
		 */		
		public clipboardMenu : boolean;

		/**
		 * An array of ContextMenuItem objects. 
		 */		
		public customItems : any[];
		
		/**
		 * The isSupported property is set to true if the ContextMenu class is supported on the current platform, otherwise it is set to false. 
		 * @return 
		 * 
		 */		
		public static get isSupported () : boolean
		{
			return Mouse.supportsCursor;
		}
		
		/**
		 * The isOpened property is set to true if the ContextMenu is opened, otherwise it is set to false.
		 * @return 
		 * 
		 */		
		public static get isOpened () : boolean
		{
			return ContextMenu.sMenu && ContextMenu.sMenu.opened;
		}
			
		/**
		 * The URLRequest of the link. 
		 */		
		public link : URLRequest;
		
		/**
		 * Helpers 
		 */		
		private static sMenu : any = null;
		private static sDefaultBuiltInItems:ContextMenuBuiltInItems = null;
		
		/**
		 * Magic 
		 */		
		private static sDefaultMenuItem:ContextMenuItem = null;
		private static sDefaultMenuItemCaption:any[] = [
			65, 83, 67, 74, 83, 32, 98, 121, 32, 80, 101, 116, 
			101, 114, 32, 75, 117, 108, 105, 107, 111, 118, 44,
			32, 112, 111, 119, 101, 114, 101, 100, 32, 98, 121, 
			32, 65, 98, 115, 111, 108, 117, 116, 105, 115, 116, 
			32, 76, 116, 100
		];
		
		/**
		 * Creates a ContextMenu object.
		 * @return 
		 * 
		 */		
		constructor()
		{
			/**/ this.builtInItems === void 0 && (this.builtInItems = null);
			/**/ this.clipboardItems === void 0 && (this.clipboardItems = null);
			/**/ this.clipboardMenu === void 0 && (this.clipboardMenu = false);
			/**/ this.customItems === void 0 && (this.customItems = null);
			/**/ this.link === void 0 && (this.link = null);
			super(); 
			var cl;
			if (typeof window.asc.menu == 'object' && typeof (cl = window.asc.menu.ContextMenu) == 'function') {
				
				ContextMenu.sMenu = new cl;
				
			}
			
			ContextMenu.sDefaultBuiltInItems =ContextMenu.sDefaultBuiltInItems || new ContextMenuBuiltInItems;
			this.builtInItems = ContextMenu.sDefaultBuiltInItems;
			this.customItems = [];
		}
		
		/**
		 * Creates a copy of the specified ContextMenu object. 
		 * @return 
		 * 
		 */		
		public clone():ContextMenu
		{
			var ins:ContextMenu = new ContextMenu;
			ins.link = this.link;
			
			if (this.customItems) {
				
				ins.customItems = this.customItems.concat();
				
			}
			
			ins.clipboardMenu = this.clipboardMenu;
			return ins;
		}
			
		/**
		 * Hides all built-in menu items (except Settings) in the specified ContextMenu object. 
		 * 
		 */		
		public hideBuiltInItems():void { /**/ }
		
		/**
		 * http://www.w3schools.com/tags/tag_menu.asp
		 * Element  Chrome         Edge           Firefox                   Safari         Opera
		 * <menu>	  Not supported	 Not supported	8.0 (only context menus)	Not supported	 Not supported 
		 * @return 
		 * 
		 */		
		public show (event:MouseEvent)
		{
			/**/ event = strict(event, MouseEvent);
			var base = event.base;
			if (!ContextMenu.sMenu || Capabilities.isMobile || !base) {
				
				return;
				
			}
			
			// disable native menu
			event.preventDefault();
			
			// copyright
			var items:any[] = this.customItems ? this.customItems.concat() : [];
			ContextMenu.sDefaultMenuItem =ContextMenu.sDefaultMenuItem || new ContextMenuItem('', true, false);
			if (!ContextMenu.sDefaultMenuItem.caption || ContextMenu.sDefaultMenuItem.caption.length != ContextMenu.sDefaultMenuItemCaption.length) {
				
				ContextMenu.sDefaultMenuItem.caption = ContextMenu.sDefaultMenuItemCaption.map(function (code) {
					
					return String.fromCharCode(code);
					
				}.__bind(this)).join('');
				
			}
			items.push(ContextMenu.sDefaultMenuItem);
			
			// dom
			var ratio = Capabilities.__getPixelAspectRatio();
			var div = Stage.sCurrent.displayState == 'normal' ? document.body : Stage.sCurrent.body;
			ContextMenu.sMenu.open(div, items, base.pageX * ratio, base.pageY * ratio);
			
			// dispatch
			this.dispatchEvent(new ContextMenuEvent(ContextMenuEvent.MENU_SELECT));
		}
	}	
}