/// <reference path="../../base.d.ts" />
/// <reference path="../display/Stage.ts" />

namespace flash.events
{
	export import Stage = flash.display.Stage;
	

	/** The EventDispatcher class is the base class for all classes that dispatch events. 
	 *  This is the Starling version of the Flash class with the same name. 
	 *  
	 *  <p>The event mechanism is a key feature of playerglobal's architecture. Objects can communicate 
	 *  with each other through events. Compared the the Flash event system, playerglobal's event system
	 *  was simplified. The main difference is that Starling events have no "Capture" phase.
	 *  They are simply dispatched at the target and may optionally bubble up. They cannot move 
	 *  in the opposite direction.</p>  
	 *  
	 *  <p>As in the conventional Flash classes, display objects inherit from EventDispatcher 
	 *  and can thus dispatch events. Beware, though, that the Starling event classes are 
	 *  <em>not compatible with Flash events:</em> playerglobal display objects dispatch 
	 *  playerglobal events, which will bubble along Starling display objects - but they cannot 
	 *  dispatch Flash events or bubble along Flash display objects.</p>
	 *  
	 *  @see Event
	 */
	export  class EventDispatcher implements IEventDispatcher
	{
		implements_flash_events_IEventDispatcher = null;
		/**
		 * Helpers 
		 */		
		/*[internal]*/ private static __pool : any[] = [];
		/*[internal]*/ private static __size : number = 0;
		
		/**
		 * Handlers 
		 */		
		/*[internal]*/ private _eventListeners : any;
		
		/**
		 * Constructor 
		 * @param target
		 * 
		 */		
		constructor (target : IEventDispatcher = null)
		{
			
		/**/ target = strict(target, 'implements_flash_events_IEventDispatcher');
			
		}
		
		/**
		 * Registers an event listener at a certain object. 
		 * @param type
		 * @param listener
		 * @param useCapture
		 * @param priority
		 * @param useWeakReference
		 * 
		 */		
		public addEventListener (type:string, listener:Function, useCapture:boolean = false, priority:number = 0, useWeakReference:boolean = false):void
		{
			/**/ type = as(type, 'String'); useCapture = Boolean(useCapture); priority = ((priority) >> 0); useWeakReference = Boolean(useWeakReference);
			if (!this._eventListeners) {
				
				this._eventListeners = {};
				
			}
			
			var funcs = this._eventListeners[type] = this._eventListeners[type] || [];
			if (this.__listenerIndexOf(funcs, listener) >= 0) {
				
				return;
				
			}
			
			funcs[funcs.length] = listener;
		}
		
		/**
		 * Removes an event listener from the object. 
		 * @param type
		 * @param listener
		 * @param useCapture
		 * 
		 */		
		public removeEventListener (type:string, listener:Function, useCapture:boolean = false):void
		{
			/**/ type = as(type, 'String'); useCapture = Boolean(useCapture);
			if (!this._eventListeners) {
				
				return;
				
			}
			
			var funcs = this._eventListeners[type];
			if (!funcs) {
				
				return;
				
			}
			
			var index = this.__listenerIndexOf(funcs, listener);
			if (index === -1) {
				
				return;
				
			}
			
			funcs.splice(index, 1);
		}
		
		/**
		 * Removes all event listeners with a certain type, or all of them if type is null. 
		 * Be careful when removing all event listeners: you never know who else was listening. 
		 * @param type
		 * 
		 */		
		public removeEventListeners (type:string = null):void
		{
			/**/ type = as(type, 'String');
			if (!this._eventListeners) {
				
				return;
				
			}
			
			if (type) {
				
				delete this._eventListeners[type];
				
			} else {
				
				this._eventListeners = null;
				
			}
		}
		
		/**
		 * Dispatches an event to all objects that have registered listeners for its type. 
		 * If an event with enabled 'bubble' property is dispatched to a display object, it will 
		 * travel up along the line of parents, until it either hits the root object or someone
		 * stops its propagation manually. 
		 * @param event
		 * @return 
		 * 
		 */		
		public dispatchEvent (event:Event):boolean
		{
			/**/ event = strict(event, Event);
			return this.__dispatchEvent(event);
		}
		
		/**
		 * Returns if there are listeners registered for a certain event type. 
		 * @param type
		 * @return 
		 * 
		 */		
		public hasEventListener (type:string):boolean
		{
			/**/ type = as(type, 'String');
			var listeners = this._eventListeners ? this._eventListeners[type] : null;
			return listeners ? listeners.length != 0 : false;
		}
		
		public willTrigger (param1:string):boolean
		{
			/**/ param1 = as(param1, 'String');
			return false;
		}
		
		/*[internal]*/ protected __dispatchEvent (event:Event):boolean
		{
			// event = strict(event, Event);
			if (!event.target) event.target = this;
			event.currentTarget = this;
			
			if (this._eventListeners) {
				
				var funcs = this._eventListeners[event.type];
				if (funcs) {
					
					var q;
					if (EventDispatcher.__size > 0) {
						
						q = EventDispatcher.__pool[EventDispatcher.__size - 1];
						EventDispatcher.__pool[--EventDispatcher.__size] = null;
						
					} else {
						
						q = [];
						
					}
					
					var len = funcs.length;
					for (var i = 0; i < len; i++) {
						
						q[i] = funcs[i];
						
					}
					
					for (var i = 0; i < len; i++) {
						
						try {
							
							q[i](event);
							
						} catch (e  ) {
							
							e = window.asc.e2e(e);
							
							var s = Stage.sCurrent;
							if (s) {
								
								s.__handleError(e);
								
							} else {
								
								trace(e.getStackTrace());
								
							}
							
						}
						
						if (event.stopsImmediatePropagation) {
							
							EventDispatcher.__pool[EventDispatcher.__size++] = q;
							return true;
							
						}
						
					}
					
					EventDispatcher.__pool[EventDispatcher.__size++] = q;
					return event.stopsPropagation;
					
				}
				
			}
			
			return false;
		}
		
		/*[internal]*/ protected __listenerIndexOf (funcs:any[], listener:Function):number
		{
			// funcs = strict(funcs, Array);
			for (var i = 0, len = funcs.length; i < len; ++i) {
				
				var current:Function = funcs[i];
				if (unbind(current) === unbind(listener)) {
					
					if ('BoundThis' in current && 'BoundThis' in listener 
						&& current.BoundThis != listener.BoundThis) {
						
						return -1;
						
					}
					
					return i;
					
				}
				
			}
			
			return -1;
		}
	}

}