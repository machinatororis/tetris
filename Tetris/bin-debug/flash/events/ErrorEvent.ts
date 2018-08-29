/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	 /**
	  * An object dispatches an ErrorEvent object when an error causes an asynchronous operation to fail.
	  * The ErrorEvent class defines only one type of error event: ErrorEvent.ERROR. The ErrorEvent class also serves as the base class for 
		 * several other error event classes, including the AsyncErrorEvent, IOErrorEvent, SecurityErrorEvent, SQLErrorEvent, 
		 * and UncaughtErrorEvent classes.
	  * 
	  * You can check for error events that do not have any listeners by registering a listener for the uncaughtError 
		 * (UncaughtErrorEvent.UNCAUGHT_ERROR) event.
	  * 
	  * An uncaught error also causes an error dialog box displaying the error event to appear when content is running in the 
		 * debugger version of Flash Player or the AIR Debug Launcher (ADL) application. 
	  * @author pkulikov
	  * 
	  */	
   export  class ErrorEvent extends TextEvent
   {
			/**
			 * Defines the value of the type property of an error event object. 
			 */		 
      public static ERROR:string = "error";
      
			/**
			 * Helpers 
			 */			
      protected _errorID:number;
      
			/**
			 * Creates an Event object that contains information about error events. 
			 * @param type
			 * @param bubbles
			 * @param cancelable
			 * @param text
			 * @param id
			 * 
			 */			
      constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, text:string = '', id:number = 0)
      {
         /**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); text = as(text, 'String'); id = ((id) >> 0);
         /**/ this._errorID === void 0 && (this._errorID = 0);
         super(type, bubbles, cancelable, text);
         this._errorID = id;
      }
      
			/**
			 * Contains the reference number associated with the specific error. 
			 * @return 
			 * 
			 */			
      public get errorID() : number
      {
         return this._errorID;
      }
      
			/**
			 * Creates a copy of the ErrorEvent object and sets the value of each property to match that of the original. 
			 * @return 
			 * 
			 */			
      /*override*/ public clone() : Event
      {
         return new ErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this._errorID);
      }
      
			/**
			 * Returns a string that contains all the properties of the ErrorEvent object. 
			 * @return 
			 * 
			 */			
      /*override*/ public toString() : string
      {
         return this.formatToString("ErrorEvent","type","bubbles","cancelable","eventPhase","text","errorID");
      }
   }

}