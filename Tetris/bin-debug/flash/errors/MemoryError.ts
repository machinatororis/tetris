/// <reference path="../../base.d.ts" />

namespace flash.errors
{
	
	/**
	 * The MemoryError exception is thrown when a memory allocation request fails.
	 * On a desktop machine, memory allocation failures are rare unless an allocation request is extremely large. 
	 * For example, a 32-bit Windows program can access only 2GB of address space, so a request for 10 billion bytes is impossible.
	 * 
	 * By default, Flash Player does not impose a limit on how much memory an ActionScript program can allocate.
	 * 
	 */	
	export  class MemoryError extends Error
	{
		/**
		 * Creates a new MemoryError object. 
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