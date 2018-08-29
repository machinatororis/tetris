/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * A ProgressEvent object is dispatched when a load operation has begun or a socket has received data. 
	 * These events are usually generated when SWF files, images or data are loaded into an application. 
	 * There are two types of progress events: ProgressEvent.PROGRESS and ProgressEvent.SOCKET_DATA. 
	 * Additionally, in AIR ProgressEvent objects are dispatched when a data is sent to or from a child process using the NativeProcess class. 
	 * @author pkulikov
	 * 
	 */	
	export  class ProgressEvent extends Event
	{
		/**
		 * Defines the value of the type property of a progress event object. 
		 */		
		public static PROGRESS:string = "progress";
		
		/**
		 * Defines the value of the type property of a socketData event object. 
		 */		
		public static SOCKET_DATA:string = "socketData";
		
		private _bytesLoaded:number;
		private _bytesTotal:number;
		
		/**
		 * Creates an Event object that contains information about progress events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param bytesLoaded
		 * @param bytesTotal
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, bytesLoaded:number = 0, bytesTotal:number = 0)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); bytesLoaded = (+(bytesLoaded)); bytesTotal = (+(bytesTotal));
			/**/ this._bytesLoaded === void 0 && (this._bytesLoaded = NaN);
			/**/ this._bytesTotal === void 0 && (this._bytesTotal = NaN);
			super(type, bubbles, cancelable);
			this._bytesLoaded = bytesLoaded;
			this._bytesTotal = bytesTotal;
		}
		
		/**
		 * Creates a copy of the ProgressEvent object and sets each property's value to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone():Event
		{
			return new ProgressEvent(this.type, this.bubbles, this.cancelable, this._bytesLoaded, this._bytesTotal);
		}
		
		/**
		 * Returns a string that contains all the properties of the ProgressEvent object. 
		 * @return 
		 * 
		 */		
		/*override*/ public toString():string
		{
			return this.formatToString("ProgressEvent", "type", "bubbles", "cancelable", "eventPhase", "bytesLoaded", "bytesTotal");
		}
		
		/**
		 * The number of items or bytes loaded when the listener processes the event. 
		 * @return 
		 * 
		 */		
		public get bytesLoaded():number { return this._bytesLoaded; }
		public set bytesLoaded(value:number) { /**/ value = (+(value)); this._bytesLoaded = value; }
		
		/**
		 * The total number of items or bytes that will be loaded if the loading process succeeds. 
		 * @return 
		 * 
		 */		
		public get bytesTotal():number { return this._bytesTotal; }
		public set bytesTotal(value:number) { /**/ value = (+(value)); this._bytesTotal = value; }
	}

}