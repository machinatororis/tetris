/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * An IOErrorEvent object is dispatched when an error causes input or output operations to fail.
	 * You can check for error events that do not have any listeners by using the debugger version of Flash Player or the AIR Debug Launcher 
	 * (ADL). The string defined by the text parameter of the IOErrorEvent constructor is displayed. 
	 * @author pkulikov
	 * 
	 */	
	export  class IOErrorEvent extends ErrorEvent
	{
		/**
		 * Defines the value of the type property of an ioError event object. 
		 */		
		public static IO_ERROR:string = "ioError";
		
		/*[Inspectable(environment="none")]*/
		public static NETWORK_ERROR:string = "networkError";
		
		/*[Inspectable(environment="none")]*/
		public static DISK_ERROR:string = "diskError";
		
		/*[Inspectable(environment="none")]*/
		public static VERIFY_ERROR:string = "verifyError";
		
		/**
		 * Creates an Event object that contains specific information about ioError events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param text
		 * @param id
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, text:string = "", id:number = 0)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); text = as(text, 'String'); id = ((id) >> 0);
			super(type, bubbles, cancelable, text, id);
		}
		
		/**
		 * Creates a copy of the IOErrorEvent object and sets the value of each property to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new IOErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.errorID);
		}
		
		/**
		 * Returns a string that contains all the properties of the IOErrorEvent object. 
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("IOErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
		}
	}

}