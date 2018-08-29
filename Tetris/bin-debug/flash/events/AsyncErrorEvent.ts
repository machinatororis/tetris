/// <reference path="../../base.d.ts" />
﻿
namespace flash.events
{
	
	/**
	 * @author pkulikov
	 */
	export  class AsyncErrorEvent extends ErrorEvent
	{
		/**
		 * The AsyncErrorEvent.ASYNC_ERROR constant defines the value of the type property of an asyncError event object. 
		 */		
		public static ASYNC_ERROR:string = "asyncError";
		
		/**
		 * The exception that was thrown. 
		 */		
		public error:Error;
		
		/**
		 * Creates an AsyncErrorEvent object that contains information about asyncError events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param text
		 * @param error
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, text:string = "", error:Error = null)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); text = as(text, 'String'); error = strict(error, Error);
			/**/ this.error === void 0 && (this.error = null);
			if (this.error = error) {
				
				super(type, bubbles, cancelable, text, error.errorID);
				
			} else {
				
				super(type, bubbles, cancelable);
				
			}
		}
		
		/**
		 * Creates a copy of the AsyncErrorEvent object and sets the value of each property to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new AsyncErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.error);
		}
		
		/**
		 * Returns a string that contains all the properties of the AsyncErrorEvent object. 
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("AsyncErrorEvent", "type", "bubbles", "cancelable", "text", "error");
		}
	}	
}