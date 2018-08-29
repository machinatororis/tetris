/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * A KeyboardEvent object id dispatched in response to user input through a keyboard. 
	 * There are two types of keyboard events: KeyboardEvent.KEY_DOWN and KeyboardEvent.KEY_UP
	 * Because mappings between keys and specific characters vary by device and operating system, 
	 * use the TextEvent event type for processing character input.
	 * 
	 * To listen globally for key events, listen on the Stage for the capture and target or bubble phase. 
	 * @author pkulikov
	 * 
	 */	
	export  class KeyboardEvent extends Event
	{
		/**
		 * The KeyboardEvent.KEY_DOWN constant defines the value of the type property of a keyDown event object. 
		 */		
		public static KEY_DOWN:string = "keyDown";
		
		/**
		 * The KeyboardEvent.KEY_UP constant defines the value of the type property of a keyUp event object. 
		 */		
		public static KEY_UP:string = "keyUp";
		
		private _keyLocation:number;
		private _charCode:number;
		private _keyCode:number;
		private _ctrlKey:boolean;
		private _altKey:boolean;
		private _shiftKey:boolean;
		
		/**
		 * Creates an Event object that contains specific information about keyboard events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param charCodeValue
		 * @param keyCodeValue
		 * @param keyLocationValue
		 * @param ctrlKeyValue
		 * @param altKeyValue
		 * @param shiftKeyValue
		 * 
		 */		
		constructor(type:string, bubbles:boolean = true, cancelable:boolean = false, charCodeValue:number = 0, keyCodeValue:number = 0, keyLocationValue:number = 0, ctrlKeyValue:boolean = false, altKeyValue:boolean = false, shiftKeyValue:boolean = false)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); charCodeValue = ((charCodeValue) >>> 0); keyCodeValue = ((keyCodeValue) >>> 0); keyLocationValue = ((keyLocationValue) >>> 0); ctrlKeyValue = Boolean(ctrlKeyValue); altKeyValue = Boolean(altKeyValue); shiftKeyValue = Boolean(shiftKeyValue);
			/**/ this._keyLocation === void 0 && (this._keyLocation = 0);
			/**/ this._charCode === void 0 && (this._charCode = 0);
			/**/ this._keyCode === void 0 && (this._keyCode = 0);
			/**/ this._ctrlKey === void 0 && (this._ctrlKey = false);
			/**/ this._altKey === void 0 && (this._altKey = false);
			/**/ this._shiftKey === void 0 && (this._shiftKey = false);
			super(type, bubbles, cancelable);
			this.charCode = charCodeValue;
			this.keyCode = keyCodeValue;
			this.keyLocation = keyLocationValue;
			this.ctrlKey = ctrlKeyValue;
			this.altKey = altKeyValue;
			this.shiftKey = shiftKeyValue;
		}
		
		/**
		 * Creates a copy of the KeyboardEvent object and sets the value of each property to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new KeyboardEvent(this.type, this.bubbles, this.cancelable, this.charCode, this.keyCode, this.keyLocation, this.ctrlKey, this.altKey, this.shiftKey);
		}
		
		/**
		 * Returns a string that contains all the properties of the KeyboardEvent object. 
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("KeyboardEvent", "type", "bubbles", "cancelable", "eventPhase", "charCode", "keyCode", "keyLocation", "ctrlKey", "altKey", "shiftKey");
		}
		
		/**
		 * Contains the character code value of the key pressed or released. 
		 * @return 
		 * 
		 */		
		public get charCode() : number { return this._charCode; }
		public set charCode(value:number) { /**/ value = ((value) >>> 0); this._charCode = value; }
		
		/**
		 * The key code value of the key pressed or released. 
		 * @return 
		 * 
		 */		
		public get keyCode() : number { return this._keyCode; }
		public set keyCode(value:number) { /**/ value = ((value) >>> 0); this._keyCode = value; }
		
		/**
		 * Indicates the location of the key on the keyboard. 
		 * @return 
		 * 
		 */		
		public get keyLocation() : number { return this._keyLocation; }
		public set keyLocation(value:number) { /**/ value = ((value) >>> 0); this._keyLocation = value; }
		
		/**
		 * On Windows and Linux, indicates whether the Ctrl key is active (true) or inactive (false); 
		 * On Mac OS, indicates whether either the Ctrl key or the Command key is active. 
		 * @return 
		 * 
		 */		
		public get ctrlKey() : boolean { return this._ctrlKey; }
		public set ctrlKey(value:boolean) { /**/ value = Boolean(value); this._ctrlKey = value; }
		
		/**
		 * Indicates whether the Alt key is active (true) or inactive (false) on Windows; indicates whether the Option key is active on Mac OS. 
		 * @return 
		 * 
		 */		
		public get altKey() : boolean { return this._altKey; }
		public set altKey(value:boolean) { /**/ value = Boolean(value); this._altKey = value; }
		
		/**
		 * Indicates whether the Shift key modifier is active (true) or inactive (false). 
		 * @return 
		 * 
		 */		
		public get shiftKey() : boolean { return this._shiftKey; }
		public set shiftKey(value:boolean) { /**/ value = Boolean(value); this._shiftKey = value; }
		
		/**
		 * Indicates that the display should be rendered after processing of this event completes, if the display list has been modified 
		 * 
		 */		
		public updateAfterEvent() : void {
			
		}
	}

}