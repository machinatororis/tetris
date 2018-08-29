/// <reference path="../../base.d.ts" />

namespace flash.net
{
	
	/**
	 * The SharedObjectFlushStatus class provides values for the code returned from a call to the SharedObject.flush() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class SharedObjectFlushStatus
	{
		/**
		 * Indicates that the flush completed successfully. 
		 */		
		public static FLUSHED : string = "flushed";
		
		/**
		 * Indicates that the user is being prompted to increase disk space for the shared object before the flush can occur. 
		 */			
		public static PENDING : string = "pending";
		
		/**
		 * Constructor
		 */		
		constructor()
		{
			throw new Error('Abstract class error');
		}
	}	
}