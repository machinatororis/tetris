/// <reference path="../../base.d.ts" />
/// <reference path="../display/InteractiveObject.ts" />

namespace flash.events
{
	export import InteractiveObject = flash.display.InteractiveObject;
	

	/**
	 * An InteractiveObject dispatches a ContextMenuEvent object when the user opens or interacts with the context menu. 
	 * There are two types of ContextMenuEvent objects:
	 * ContextMenuEvent.MENU_ITEM_SELECT
	 * ContextMenuEvent.MENU_SELECT
	 * 
	 * @author pkulikov
	 */
	export  class ContextMenuEvent extends Event
	{
		/**
		 * Defines the value of the type property of a menuItemSelect event object. 
		 */		
		public static MENU_ITEM_SELECT : string = "menuItemSelect";

		/**
		 * Defines the value of the type property of a menuSelect event object. 
		 */		
		public static MENU_SELECT : string = "menuSelect";
		
		/**
		 * The display list object to which the menu is attached. 
		 */		
		public contextMenuOwner : InteractiveObject;

		/**
		 * Indicates whether the mouseTarget property was set to null for security reasons. 
		 */		
		public isMouseTargetInaccessible : boolean;

		/**
		 * The display list object on which the user right-clicked to display the context menu. 
		 */		
		public mouseTarget : InteractiveObject;
		
		/**
		 * Creates an Event object that contains specific information about menu events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param mouseTarget
		 * @param contextMenuOwner
		 * 
		 */					
		constructor (type:string, bubbles:boolean = false, cancelable:boolean = false, mouseTarget:InteractiveObject = null, contextMenuOwner:InteractiveObject = null)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); mouseTarget = strict(mouseTarget, InteractiveObject); contextMenuOwner = strict(contextMenuOwner, InteractiveObject);
			/**/ this.contextMenuOwner === void 0 && (this.contextMenuOwner = null);
			/**/ this.isMouseTargetInaccessible === void 0 && (this.isMouseTargetInaccessible = false);
			/**/ this.mouseTarget === void 0 && (this.mouseTarget = null);
			super(type, bubbles, cancelable);
			this.mouseTarget = mouseTarget;
			this.contextMenuOwner = contextMenuOwner;
		}
		
		/**
		 * Creates a copy of the ContextMenuEvent object and sets the value of each property to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone():Event {
			return new ContextMenuEvent(this.type, this.bubbles, this.cancelable, this.mouseTarget, this.contextMenuOwner);
		}
		
		/**
		 * Returns a string that contains all the properties of the ContextMenuEvent object. 
		 */		
		/*override*/ public toString():string {
			return this.formatToString("ContextMenuEvent", "type", "bubbles", "cancelable", "eventPhase", "mouseTarget", "contextMenuOwner");
		}
	}	
}