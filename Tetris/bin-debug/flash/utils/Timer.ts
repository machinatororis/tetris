/// <reference path="../../base.d.ts" />
/// <reference path="../events/TimerEvent.ts" />
/// <reference path="../events/EventDispatcher.ts" />

namespace flash.utils
{
	export import EventDispatcher = flash.events.EventDispatcher;
	export import TimerEvent = flash.events.TimerEvent;
	

	/*[Event(name = "timerComplete", type = "flash.events.TimerEvent")]*/
	/*[Event(name = "timer", type = "flash.events.TimerEvent")]*/
	export  class Timer extends EventDispatcher
	{
		private _delay:number;
		private _repeatCount:number;
		private _iteration:number;
		private _intervalID:number;
		
		/**
		 * Constructor 
		 * @param delay
		 * @param repeatCount
		 * 
		 */		
		constructor(delay:number, repeatCount:number = 0)
		{
			/**/ delay = (+(delay)); repeatCount = ((repeatCount) >> 0);
			/**/ this._delay === void 0 && (this._delay = NaN);
			/**/ this._repeatCount === void 0 && (this._repeatCount = 0);
			/**/ this._iteration === void 0 && (this._iteration = 0);
			/**/ this._intervalID === void 0 && (this._intervalID = 0);
			super(); 
			if (delay < 0 || !isFinite(delay)) {
				
				Error.throwError(RangeError, 2066);
				
			}
			
			this._delay = delay;
			this._repeatCount = repeatCount;
		}
		
		public get delay():number
		{
			return this._delay;
		}
		
		public get repeatCount():number
		{
			return this._repeatCount;
		}
		
		public set repeatCount(value:number)
		{
			/**/ value = ((value) >> 0);
			this._repeatCount = value;
			
			if (this.running && this._repeatCount != 0 && this._iteration >= this._repeatCount) {
				
				this.stop();
				
			}
		}
		
		public get currentCount():number
		{
			return this._iteration;
		}
		
		public get running():boolean
		{
			return this._intervalID > 0;
		}
		
		public set delay(value:number)
		{
			/**/ value = (+(value));
			if (value < 0 || !isFinite(value)) {
				
				Error.throwError(RangeError, 2066);
				
			}
			
			this._delay = value;
			
			if (this.running) {
				
				this.stop();
				this.start();
				
			}
		}
		
		private tick():void
		{
			this._iteration++;
			this._timerDispatch();
			
			if (this._repeatCount != 0 && this._iteration >= this._repeatCount) {
				
				this.stop();
				this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE, false, false));
				
			}
		}
		
		public start():void
		{
			if (!this.running) {
				
				this._start(this._delay, this.tick.__bind(this));
				
			}
		}
		
		public reset():void
		{
			if (this.running) {
				
				this.stop();
				
			}
			
			this._iteration = 0;
		}
		
		private _start(delay:number, tick:Function):void
		{
			/**/ delay = (+(delay));
			this._intervalID =(( setInterval(tick, delay)) >> 0);
		}
		
		private _timerDispatch():void
		{
			this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
		}
		
		public stop():void
		{
			clearInterval(this._intervalID);
			this._intervalID = 0;
		}
	}
}