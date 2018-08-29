
namespace flash.net
{
	
	/**
	 * This interface controls the serialization of dynamic properties of dynamic objects. 
	 * You use this interface with the IDynamicPropertyWriter interface and the ObjectEncoding.dynamicPropertyWriter property. 
	 * @author pkulikov
	 */
	export  interface IDynamicPropertyOutput
	{
		/**
		 * Adds a dynamic property to the binary output of a serialized object. 
		 * @param name
		 * @param value
		 * 
		 */		
		writeDynamicProperty(name:string, value:any):void;
	}	
}