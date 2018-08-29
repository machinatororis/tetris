/// <reference path="../../base.d.ts" />

namespace flash.utils
{
	
	/**
	 * The Dictionary object is a simple key/value map.
	 * Any value (both objects and primitive values) may be used as either a key or a value. 
	 * @author pkulikov
	 * 
	 */	
	export  class Dictionary
	{
		/**
		 * JavaScript native Map instance
		 */		
		/*[internal]*/ private __mapNative : Map;
		
		/**
		 * JavaScript simple Map instance
		 */		
		/*[internal]*/ private __mapSimple : any;
		
		/**
		 * Weak storage 
		 */		
		/*[internal]*/ private __weak : boolean;
		
		/**
		 * The constructor function.
		 * @param weakKeys
		 * 
		 */		
		constructor (weakKeys : boolean = false)
		{
			/**/ weakKeys = Boolean(weakKeys);
			if (window.asc.utils.NATIVE_MAP_AVAILABLE) {
				
				this.__mapNative = new Map;
				
			} else {
				
				this.__mapSimple = new window.asc.utils.MapSimple;
				
			}
			
			this.__weak = weakKeys;
		}
		
		/**
		 * Returns the value associated to the key, or undefined if there is none. 
		 * @param key
		 * @return 
		 * 
		 */		
		public get (key : any) : any
		{
			return (this.__mapNative || this.__mapSimple).get(key);
		}
		
		/**
		 * Sets the value for the key in the Dictionary object. 
		 * @param key
		 * @param value
		 * 
		 */		
		public set (key: any, value: any) : Dictionary
		{
			if (this.__mapNative) {
				
				this.__mapNative.set(key, value);
				return value;
				
			}
			
			return this.__mapSimple.set(key, value);
		}
		
		/**
		 * Removes any value associated to the key. 
		 * @param key
		 * 
		 */		
		public delete (key : any) : boolean
		{
			return (this.__mapNative || this.__mapSimple).delete(key);
		}
		
		/**
		 * Возвращает объект для for each конструкции.
		 * Когда TypeScript перегоняет всё в ES5, то он использует геттер length а не функцию.
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __iterator (forEach : boolean) : any[]
		{
			// forEach = Boolean(forEach);
			if (forEach) {
				
				if (this.__mapNative) {
					
					return Array.from(this.__mapNative.values());
					
				}
				
				return this.__mapSimple.values;
				
			}
			
			if (this.__mapNative) {
				
				return Array.from(this.__mapNative.keys());
				
			}
			
			return this.__mapSimple.keys;
		}
		
		/**
		 * An array of values
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __values () : any[]
		{
			
		}
	}
}