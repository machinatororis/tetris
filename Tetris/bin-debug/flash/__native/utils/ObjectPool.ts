/// <reference path="../../../base.d.ts" />

namespace flash.__native.utils
{
	
	export  class ObjectPool
	{
		private __pool:any[] = null;
		private __size:number = 0;
		private __create:Function = null;
		private __clean:Function = null;
		
		constructor (create:Function = null, clean:Function = null)
		{
			this.__create = create;
			this.__clean = clean;
			this.__pool = [];
		}
		
		/*[internal]*/ public get ():any
		{
			if (this.__size > 0) {
				
				var object = this.__pool.pop();
				this.__size--;
				this.__clean(object);
				
				return object;
			}
			
			return this.__create();
			
		}
		
		
		/*[internal]*/ public release (object:any):void
		{
			if (object == null) {
				
				return;
				
			}
			
			this.__pool[this.__size++] = object;
		}
	}
}