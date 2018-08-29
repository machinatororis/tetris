/// <reference path="../../base.d.ts" />
/// <reference path="../display/InteractiveObject.ts" />
﻿
namespace flash.events
{
	export import InteractiveObject = flash.display.InteractiveObject;
	

	/**
	 * An object dispatches a FocusEvent object when the user changes the focus from one object in the display list to another. 
	 * There are four types of focus events:
	 * FocusEvent.FOCUS_IN
	 * FocusEvent.FOCUS_OUT
	 * FocusEvent.KEY_FOCUS_CHANGE
	 * FocusEvent.MOUSE_FOCUS_CHANGE
	 * 
	 * @author pkulikov
	 */
	export  class FocusEvent extends Event
	{
		/**
		 * Defines the value of the type property of a focusIn event object. 
		 */		
		public static FOCUS_IN : string = "focusIn";

		/**
		 * Defines the value of the type property of a focusOut event object. 
		 */		
		public static FOCUS_OUT : string = "focusOut";

		/**
		 * Defines the value of the type property of a keyFocusChange event object. 
		 */		
		public static KEY_FOCUS_CHANGE : string = "keyFocusChange";

		/**
		 * Defines the value of the type property of a mouseFocusChange event object. 
		 */		
		public static MOUSE_FOCUS_CHANGE : string = "mouseFocusChange";
		
		/**
		 * Specifies direction of focus for a focusIn event.
		 */		
		public direction : string;

		/**
		 * If true, the relatedObject property is set to null for reasons related to security sandboxes.
		 */
		public isRelatedObjectInaccessible : boolean;

		/**
		 * The key code value of the key pressed to trigger a keyFocusChange event.
		 */
		public keyCode : number;

		/**
		 * A reference to the complementary InteractiveObject instance that is affected by the change in focus.
		 */
		public relatedObject : InteractiveObject;

		/**
		 * Indicates whether the Shift key modifier is activated, in which case the value is true. 
		 */		
		public shiftKey : boolean;
		
		/**
		 * Creates an Event object with specific information relevant to focus events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param relatedObject
		 * @param shiftKey
		 * @param keyCode
		 * @param direction
		 * 
		 */		
		constructor(type:string, bubbles:boolean = true, cancelable:boolean = false, relatedObject:InteractiveObject = null, shiftKey:boolean = false, keyCode:number = 0, direction:string = "none")
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); relatedObject = strict(relatedObject, InteractiveObject); shiftKey = Boolean(shiftKey); keyCode = ((keyCode) >>> 0); direction = as(direction, 'String');
			/**/ this.direction === void 0 && (this.direction = null);
			/**/ this.isRelatedObjectInaccessible === void 0 && (this.isRelatedObjectInaccessible = false);
			/**/ this.keyCode === void 0 && (this.keyCode = 0);
			/**/ this.relatedObject === void 0 && (this.relatedObject = null);
			/**/ this.shiftKey === void 0 && (this.shiftKey = false);
			super(type, bubbles, cancelable);
			this.relatedObject = relatedObject;
			this.shiftKey = shiftKey;
			this.keyCode = keyCode;
			this.direction = direction;
		}
		
		/**
		 * Creates a copy of the FocusEvent object and sets the value of each property to match that of the original.
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new FocusEvent(this.type, this.bubbles, this.cancelable, this.relatedObject, this.shiftKey, this.keyCode, this.direction);
		}
		
		/**
		 * Returns a string that contains all the properties of the FocusEvent object.
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("FocusEvent","type","bubbles","cancelable","eventPhase","relatedObject","shiftKey","keyCode","direction");
		}
	}	
}