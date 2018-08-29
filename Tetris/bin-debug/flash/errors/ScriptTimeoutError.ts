/// <reference path="../../base.d.ts" />

namespace flash.errors
{
	
	/**
	 * The ScriptTimeoutError exception is thrown when the script timeout interval is reached. 
	 * The script timeout interval is 15 seconds.
	 * Two ScriptTimeoutError exceptions are thrown. The first exception you can catch and exit cleanly. 
	 * If there is no exception handler, the uncaught exception terminates execution. 
	 * The second exception is thrown but cannot be caught by user code; it goes to the uncaught exception handler. 
	 * It is uncatchable to prevent the player from hanging indefinitely.
	 * 
	 */	
	export  class ScriptTimeoutError extends Error
	{
		/**
		 * Creates a new ScriptTimeoutError object. 
		 * @param message
		 * @param id
		 * 
		 */		 
		constructor(message:string = "")
		{
			/**/ message = as(message, 'String');
			super(message) /**/ Object.setPrototypeOf(this, new.target.prototype);;
		}
	}
}