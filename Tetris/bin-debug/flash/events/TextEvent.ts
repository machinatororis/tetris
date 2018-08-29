/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * An object dispatches a TextEvent object when a user enters text in a text field or clicks a hyperlink in an HTML-enabled text field. 
	 * There are two types of text events: TextEvent.LINK and TextEvent.TEXT_INPUT. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextEvent extends Event
	{
		/**
		 * Defines the value of the type property of a link event object. 
		 */		
		public static LINK:string = "link";
		
		/**
		 * Defines the value of the type property of a textInput event object. 
		 */		
		public static TEXT_INPUT:string = "textInput";
		
		/**
		 * Helpers 
		 */		
		private _text:string;
		
		/**
		 * Creates an Event object that contains information about text events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param text
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, text:string = "")
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); text = as(text, 'String');
			/**/ this._text === void 0 && (this._text = null);
			super(type,bubbles,cancelable);
			this._text = text;
		}
		
		/**
		 * For a textInput event, the character or sequence of characters entered by the user. 
		 * @return 
		 * 
		 */		
		public get text() : string
		{
			return this._text;
		}
		
		public set text(value:string)
		{
			/**/ value = as(value, 'String');
			this._text = value;
		}
		
		/**
		 * Creates a copy of the TextEvent object and sets the value of each property to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new TextEvent(this.type, this.bubbles, this.cancelable, this._text);
		}
		
		/**
		 * Returns a string that contains all the properties of the TextEvent object. 
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("TextEvent","type","bubbles","cancelable","eventPhase","text");
		}
	}

}