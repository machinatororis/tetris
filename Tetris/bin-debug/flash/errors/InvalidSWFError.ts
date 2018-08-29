/// <reference path="../../base.d.ts" />

namespace flash.errors
{
	
	/**
	 * The Flash runtimes throw this exception when they encounter a corrupted SWF file.
	 * 
	 */	
	export  class InvalidSWFError extends Error
	{
		/**
		 * Creates a new InvalidSWFError object. 
		 * @param message
		 * @param id
		 * 
		 */		 
		constructor(message:string = "", id:number = 0)
		{
			/**/ message = as(message, 'String'); id = ((id) >> 0);
			super(message, id) /**/ Object.setPrototypeOf(this, new.target.prototype);;
		}
	}
}