/// <reference path="../../base.d.ts" />

namespace flash.errors
{
	
	/**
	 * The IOError exception is thrown when some type of input or output failure occurs. 
	 * For example, an IOError exception is thrown if a read/write operation is attempted on a socket that has not connected or 
	 * that has become disconnected. 
	 * @author pkulikov
	 * 
	 */	
	export  class IOError extends Error
	{
		/**
		 * Creates a new IOError object. 
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