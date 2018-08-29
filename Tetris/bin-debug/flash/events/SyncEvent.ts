/// <reference path="../../base.d.ts" />
﻿
namespace flash.events
{
	
	/**
	 * An SharedObject object representing a remote shared object dispatches a SyncEvent object when the remote shared object has 
	 * been updated by the server. There is only one type of sync event: SyncEvent.SYNC.
	 * 
	 * @author pkulikov
	 */
	export  class SyncEvent extends Event
	{
		/**
		 * Defines the value of the type property of a sync event object. 
		 */		
		public static SYNC : string = "sync";
		
		/**
		 * An array of objects; each object contains properties that describe the changed members of a remote shared object. 
		 */		
		public changeList : any[];
		
		/**
		 * Creates an Event object that contains information about sync events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param changeList
		 * 
		 */			
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, changeList:any[] = null)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); changeList = strict(changeList, Array);
			/**/ this.changeList === void 0 && (this.changeList = null);
			super(type, bubbles, cancelable);
			this.changeList = changeList;
		}
		
		/**
		 * Creates a copy of the SyncEvent object and sets the value of each property to match that of the original.
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new SyncEvent(this.type, this.bubbles, this.cancelable, this.changeList);
		}
		
		/**
		 * Returns a string that contains all the properties of the SyncEvent object.
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("SyncEvent","type","bubbles","cancelable","eventPhase","changeList");
		}
	}	
}