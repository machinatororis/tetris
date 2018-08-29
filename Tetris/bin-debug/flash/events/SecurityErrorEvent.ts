/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * An object dispatches a SecurityErrorEvent object to report the occurrence of a security error. 
	 * Security errors reported through this class are generally from asynchronous operations, such as loading data, 
	 * in which security violations may not manifest immediately. 
	 * Your event listener can access the object's text property to determine what operation was attempted and any URLs that were involved. 
	 * If there are no event listeners, the debugger version of Flash Player or the AIR Debug Launcher (ADL) application automatically 
	 * displays an error message that contains the contents of the text property. 
	 * There is one type of security error event: SecurityErrorEvent.SECURITY_ERROR.
	 * Security error events are the final events dispatched for any target object. This means that any other events, 
	 * including generic error events, are not dispatched for a target object that experiences a security error. 
	 * @author pkulikov
	 * 
	 */	
	export  class SecurityErrorEvent extends ErrorEvent
	{
		/**
		 * The SecurityErrorEvent.SECURITY_ERROR constant defines the value of the type property of a securityError event object. 
		 */		
		public static SECURITY_ERROR:string = "securityError";
		
		/**
		 * Creates an Event object that contains information about security error events. 
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
		 * Creates a copy of the SecurityErrorEvent object and sets the value of each property to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new SecurityErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.errorID);
		}
		
		/**
		 * Returns a string that contains all the properties of the SecurityErrorEvent object. 
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("SecurityErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
		}
	}

}