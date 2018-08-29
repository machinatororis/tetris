namespace flash.events
{
	
	/**
	 * The IEventDispatcher interface defines methods for adding or removing event listeners, 
	 * checks whether specific types of event listeners are registered, and dispatches events.
	 * Event targets are an important part of the Flash® Player and Adobe AIR event model. 
	 * The event target serves as the focal point for how events flow through the display list hierarchy. 
	 * When an event such as a mouse click or a keypress occurs, 
	 * an event object is dispatched into the event flow from the root of the display list. 
	 * The event object makes a round-trip journey to the event target, which is conceptually divided into three phases: 
	 * the capture phase includes the journey from the root to the last node before the event target's node; 
	 * the target phase includes only the event target node; 
	 * and the bubbling phase includes any subsequent nodes encountered on the return trip to the root of the display list.
	 * 
	 * In general, the easiest way for a user-defined class to gain event dispatching capabilities is to extend EventDispatcher. 
	 * If this is impossible (that is, if the class is already extending another class), 
	 * you can instead implement the IEventDispatcher interface, create an EventDispatcher member, 
	 * and write simple hooks to route calls into the aggregated EventDispatcher. 
	 * @author pkulikov
	 * 
	 */	
	export  interface IEventDispatcher
	{
		/**
		 * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event. 
		 * @param type
		 * @param listener
		 * @param useCapture
		 * @param priority
		 * @param useWeakReference
		 * 
		 */		
		addEventListener(type:string, listener:Function, useCapture:boolean, priority:number, useWeakReference:boolean):void;
		
		/**
		 * Dispatches an event into the event flow. 
		 * @param event
		 * @return 
		 * 
		 */		
		dispatchEvent(event:Event):boolean;
		
		/**
		 * Checks whether the EventDispatcher object has any listeners registered for a specific type of event. 
		 * @param type
		 * @return 
		 * 
		 */		
		hasEventListener(type:string):boolean;
		
		/**
		 * Removes a listener from the EventDispatcher object. 
		 * @param type
		 * @param listener
		 * @param useCapture
		 * 
		 */		
		removeEventListener(type:string, listener:Function, useCapture:boolean):void;
		
		/**
		 * Checks whether an event listener is registered with this EventDispatcher object or any of its ancestors for the specified event type. 
		 * @param type
		 * @return 
		 * 
		 */		
		willTrigger(type:string):boolean;
	}
}