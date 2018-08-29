/// <reference path="../../base.d.ts" />

namespace flash.errors
{
	
	/**
	 * An EOFError exception is thrown when you attempt to read past the end of the available data. 
	 * For example, an EOFError is thrown when one of the read methods in the IDataInput interface is called and there is 
	 * insufficient data to satisfy the read request.
	 * 
	 */	
	export  class EOFError extends Error
	{
		/**
		 * Creates a new EOFError object.
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