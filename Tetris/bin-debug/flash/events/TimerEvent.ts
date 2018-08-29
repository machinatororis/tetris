/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * A Timer object dispatches a TimerEvent objects whenever the Timer object reaches the interval specified by the Timer.delay property. 
	 * @author pkulikov
	 * 
	 */	
	export  class TimerEvent extends Event
	{
		/**
		 * Defines the value of the type property of a timer event object. 
		 */		
		public static TIMER:string = "timer";
		
		/**
		 * Defines the value of the type property of a timerComplete event object. 
		 */		
		public static TIMER_COMPLETE:string = "timerComplete";
		
		/**
		 * Creates an Event object with specific information relevant to timer events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable);
			super(type, bubbles, cancelable);
		}
		
		/**
		 * Creates a copy of the TimerEvent object and sets each property's value to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone():Event
		{
			return new TimerEvent(this.type, this.bubbles, this.cancelable);
		}
		
		/**
		 * Returns a string that contains all the properties of the TimerEvent object. 
		 * @return 
		 * 
		 */		
		/*override*/ public toString():string
		{
			return this.formatToString("TimerEvent", "type", "bubbles", "cancelable", "eventPhase");
		}
		
		/**
		 * Instructs Flash Player or the AIR runtime to render after processing of this event completes, if the display list has been modified. 
		 * 
		 */		
		public updateAfterEvent():void
		{
			// not implemented
		}
	}
}