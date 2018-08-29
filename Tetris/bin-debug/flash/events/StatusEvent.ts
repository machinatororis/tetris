/// <reference path="../../base.d.ts" />
﻿
namespace flash.events
{
	
	/**
	 * An object dispatches a StatusEvent object when a device, such as a camera or microphone, or an object such as a LocalConnection 
	 * object reports its status. There is only one type of status event: StatusEvent.STATUS.
	 * 
	 * @author pkulikov
	 */
	export  class StatusEvent extends Event
	{
		/**
		 * Defines the value of the type property of a status event object. 
		 */		
		public static STATUS : string = "status";
		
		/**
		 * A description of the object's status. 
		 */		
		public code : string;

		/**
		 * The category of the message, such as "status", "warning" or "error". 
		 */		
 	 	public level : string;
		
		/**
		 * Creates an Event object that contains information about status events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param code
		 * @param level
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, code:string = "", level:string = "")
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); code = as(code, 'String'); level = as(level, 'String');
			/**/ this.code === void 0 && (this.code = null);
			/**/ this.level === void 0 && (this.level = null);
			super(type, bubbles, cancelable);
			this.code = code;
			this.level = level;
		}
		
		/**
		 * Creates a copy of the StatusEvent object and sets the value of each property to match that of the original.
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new StatusEvent(this.type, this.bubbles, this.cancelable, this.code, this.level);
		}
		
		/**
		 * Returns a string that contains all the properties of the StatusEvent object.
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("StatusEvent","type","bubbles","cancelable","eventPhase","code","level");
		}
	}	
}