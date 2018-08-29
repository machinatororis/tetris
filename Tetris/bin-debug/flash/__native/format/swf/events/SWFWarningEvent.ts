/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../events/Event.ts" />

namespace flash.__native.format.swf.events
{
	
	export import Event = flash.events.Event;
	
	
	export  class SWFWarningEvent extends Event
	{
		public static OVERFLOW:string = "overflow";
		public static UNDERFLOW:string = "underflow";
		
		public index:number;
		public data:any;
		
		constructor(type:string, index:number, data:any = null, bubbles:boolean=false, cancelable:boolean=false)
		{
			/**/ type = as(type, 'String'); index = ((index) >>> 0); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable);
			/**/ this.index === void 0 && (this.index = 0);
			/**/ this.data === void 0 && (this.data = null);
			super(type, bubbles, cancelable);
			this.index = index;
			this.data = data;
		}
		
		/*override*/ public clone():Event {
			return new SWFWarningEvent(this.type, this.index, this.data, this.bubbles, this.cancelable);
		}
		
		/*override*/ public toString():string {
			return "[SWFWarningEvent] index: " + this.index;
		}
	}
}