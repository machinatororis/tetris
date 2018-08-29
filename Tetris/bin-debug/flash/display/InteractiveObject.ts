/// <reference path="../../base.d.ts" />
/// <reference path="../ui/ContextMenu.ts" />
/// <reference path="../geom/Rectangle.ts" />

namespace flash.display
{
	export import Rectangle = flash.geom.Rectangle;
	export import ContextMenu = flash.ui.ContextMenu;
	
	
	/**
	 * The InteractiveObject class is the abstract base class for all display objects with which the user can interact, using the mouse, 
	 * keyboard, or other user input device.
	 * You cannot instantiate the InteractiveObject class directly. A call to the new InteractiveObject() constructor throws an 
	 * ArgumentError exception.
	 * 
	 * The InteractiveObject class itself does not include any APIs for rendering content onscreen. To create a custom subclass of the 
	 * InteractiveObject class, extend one of the subclasses that do have APIs for rendering content onscreen, such as the Sprite, 
	 * SimpleButton, TextField, or MovieClip classes. 
	 * @author pkulikov
	 * 
	 */	
	export  class InteractiveObject extends DisplayObject
	{
		/*[internal]*/ protected _mouseEnabled : boolean;
		/*[internal]*/ protected _doubleClickEnabled : boolean;
		/*[internal]*/ protected _contextMenu : ContextMenu;
		
		/**
		 * Calling the new InteractiveObject() constructor throws an ArgumentError exception.
		 */		
		constructor()
		{
			super(); 
			this._mouseEnabled = true;
		}
		
		/**
		 * Specifies whether this object is in the tab order. 
		 * @return 
		 * 
		 */		
		public get tabEnabled():boolean  { return true }
		public set tabEnabled(value:boolean)  {/**/ value = Boolean(value);/**/ }
		
		/**
		 * Specifies the tab ordering of objects in a SWF file. 
		 * @return 
		 * 
		 */		
		public get tabIndex():number  { return 0 }
		public set tabIndex(value:number)  {/**/ value = ((value) >> 0);/**/ }
		
		/**
		 * Specifies whether this object displays a focus rectangle. 
		 * @return 
		 * 
		 */		
		public get focusRect():any  { return null }
		public set focusRect(value:any)  {/**/ }
		
		/**
		 * Specifies whether this object receives mouse, or other user input, messages. 
		 * @return 
		 * 
		 */		
		public get mouseEnabled():boolean  { return this._mouseEnabled }
		public set mouseEnabled(v:boolean)  { /**/ v = Boolean(v); this._mouseEnabled = v; }
		
		/**
		 * Specifies whether the object receives doubleClick events. 
		 * @return 
		 * 
		 */		
		public get doubleClickEnabled():boolean  { return this._doubleClickEnabled; }
		public set doubleClickEnabled(v:boolean)  { /**/ v = Boolean(v); this._doubleClickEnabled = v; }
		
		/**
		 * Defines the area that should remain on-screen when a soft keyboard is displayed (not available on iOS). 
		 * @return 
		 * 
		 */		
		public get softKeyboardInputAreaOfInterest():Rectangle  { return null }
		public set softKeyboardInputAreaOfInterest(value:Rectangle)  {/**/ value = strict(value, Rectangle);/**/ }
		
		/**
		 * Specifies whether a virtual keyboard (an on-screen, software keyboard) should display when this InteractiveObject 
		 * instance receives focus. 
		 * @return 
		 * 
		 */		
		public get needsSoftKeyboard():boolean  { return false }
		public set needsSoftKeyboard(value:boolean)  {/**/ value = Boolean(value);/**/ }
		
		/**
		 * Specifies the context menu associated with this object. 
		 * @return 
		 * 
		 */		
		public get contextMenu() : ContextMenu { return this._contextMenu; }
		public set contextMenu(value:ContextMenu) { /**/ value = strict(value, ContextMenu); this._contextMenu = value; }
		
		/**
		 * The current accessibility implementation (AccessibilityImplementation) for this InteractiveObject instance. 
		 * @return 
		 * 
		 */		
		//public function get accessibilityImplementation() : AccessibilityImplementation;
		//public function set accessibilityImplementation(param1:AccessibilityImplementation) : void;
		
		/**
		 * Raises a virtual keyboard. 
		 * @return 
		 * 
		 */		
		public requestSoftKeyboard () : boolean
		{
			return false;
		}
		
		/*[internal]*/ /*override*/ protected __doMouse (stageX:number, stageY:number, isHitArea:boolean = false) : DisplayObject 
		{
			// stageX = (+(stageX)); stageY = (+(stageY)); isHitArea = Boolean(isHitArea);
			if (!isHitArea && (!this._visible || !this._mouseEnabled || this._maskParent)) {
				
				return null;
				
			}
			
			return super.__doMouse(stageX, stageY, isHitArea);
		}
		
		/*override*/ public toString () : string
		{
			return '[object InteractiveObject]';
		}
	}
}