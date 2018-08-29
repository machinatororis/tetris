/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../events/Event.ts" />

namespace flash.__native.format.swf.events
{
	
	export import Event = flash.events.Event;
	
	
	export  class SWFProgressEvent extends Event
	{
		public static PROGRESS:string = "progress";
		public static COMPLETE:string = "complete";
		
		protected processed:number;
		protected total:number;
		
		constructor(type:string, processed:number, total:number, bubbles:boolean=false, cancelable:boolean=false)
		{
			/**/ type = as(type, 'String'); processed = ((processed) >>> 0); total = ((total) >>> 0); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable);
			/**/ this.processed === void 0 && (this.processed = 0);
			/**/ this.total === void 0 && (this.total = 0);
			super(type, bubbles, cancelable);
			this.processed = processed;
			this.total = total;
		}
		
		public get progress():number {
			return this.processed / this.total;
		}
		
		public get progressPercent():number {
			return Math.round(this.progress * 100);
		}
		
		/*override*/ public clone():Event {
			return new SWFProgressEvent(this.type, this.processed, this.total, this.bubbles, this.cancelable);
		}
		
		/*override*/ public toString():string {
			return "[SWFProgressEvent] processed: " + this.processed + ", total: " + this.total + " (" + this.progressPercent + "%)";
		}
	}
}