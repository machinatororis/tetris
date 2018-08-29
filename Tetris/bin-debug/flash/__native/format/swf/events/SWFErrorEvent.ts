/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../events/Event.ts" />

namespace flash.__native.format.swf.events
{
	
	export import Event = flash.events.Event;
	
	
	export  class SWFErrorEvent extends Event
	{
		public static ERROR:string = "error";

		public static REASON_EOF:string = "eof";
		
		public reason:string;
		
		constructor(type:string, reason:string, bubbles:boolean=false, cancelable:boolean=false)
		{
			/**/ type = as(type, 'String'); reason = as(reason, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable);
			/**/ this.reason === void 0 && (this.reason = null);
			super(type, bubbles, cancelable);
			this.reason = reason;
		}
		
		/*override*/ public clone():Event {
			return new SWFErrorEvent(this.type, this.reason, this.bubbles, this.cancelable);
		}
		
		/*override*/ public toString():string {
			return "[SWFErrorEvent] reason: " + this.reason;
		}
	}
}