/// <reference path="../../base.d.ts" />
﻿
namespace flash.events
{
	
	/**
	 * An object dispatches a DataEvent object when raw data has completed loading. There are two types of data event:
	 * DataEvent.DATA: dispatched for data sent or received.
	 * DataEvent.UPLOAD_COMPLETE_DATA: dispatched when data is sent and the server has responded.
	 * 
	 * @author pkulikov
	 */
	export  class DataEvent extends TextEvent
	{
		/**
		 * Defines the value of the type property of a data event object. 
		 */		
		public static DATA : string = "data";

		/**
		 * Defines the value of the type property of an uploadCompleteData event object. 
		 */		
		public static UPLOAD_COMPLETE_DATA : string = "uploadCompleteData";
		
		/**
		 * The raw data loaded into Flash Player or Adobe AIR. 
		 */		
		public data : string;
		
		/**
		 * Creates an event object that contains information about data events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param data
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:string = "")
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); data = as(data, 'String');
			/**/ this.data === void 0 && (this.data = null);
			super(type, bubbles, cancelable);
			this.data = data;
		}
		
		/**
		 * Creates a copy of the DataEvent object and sets the value of each property to match that of the original.
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new DataEvent(this.type, this.bubbles, this.cancelable, this.data);
		}
		
		/**
		 * Returns a string that contains all the properties of the DataEvent object.
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("DataEvent","type","bubbles","cancelable","eventPhase","data");
		}
	}	
}