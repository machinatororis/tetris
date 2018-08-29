/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../events/IEventDispatcher.ts" />
/// <reference path="../../../../events/EventDispatcher.ts" />
/// <reference path="../../../../events/Event.ts" />

namespace flash.__native.format.swf.events
{
	
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import IEventDispatcher = flash.events.IEventDispatcher;
	
	
	export  class SWFEventDispatcher implements IEventDispatcher
	{
		implements_flash_events_IEventDispatcher = null;
		protected dispatcher:EventDispatcher = null;
		
		constructor() {
			this.dispatcher = new EventDispatcher(this);
		}
		
		public addEventListener(type:string, listener:Function, useCapture:boolean = false, priority:number = 0, useWeakReference:boolean = false):void {
			/**/ type = as(type, 'String'); useCapture = Boolean(useCapture); priority = ((priority) >> 0); useWeakReference = Boolean(useWeakReference);
			this.dispatcher.addEventListener(type, listener, useCapture, priority, useWeakReference);
		}
		public removeEventListener(type:string, listener:Function, useCapture:boolean = false):void {
			/**/ type = as(type, 'String'); useCapture = Boolean(useCapture);
			this.dispatcher.removeEventListener(type, listener, useCapture);
		}
		public dispatchEvent(event:Event):boolean {
			/**/ event = strict(event, Event);
			return this.dispatcher.dispatchEvent(event);
		}
		public hasEventListener(type:string):boolean {
			/**/ type = as(type, 'String');
			return this.dispatcher.hasEventListener(type);
		}
		public willTrigger(type:string):boolean {
			/**/ type = as(type, 'String');
			return this.dispatcher.willTrigger(type);
		}
	}
}