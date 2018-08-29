
namespace flash.net
{
	
	/**
	 * This interface is used with the IDynamicPropertyOutput interface to control the serialization of dynamic properties of dynamic objects. 
	 * To use this interface, assign an object that implements the IDynamicPropertyWriter interface to the 
	 * ObjectEncoding.dynamicPropertyWriter property. 
	 * @author pkulikov
	 */
	export  interface IDynamicPropertyWriter
	{
		/**
		 * Writes the name and value of an IDynamicPropertyOutput object to an object with dynamic properties. 
		 * @param obj
		 * @param output
		 * 
		 */		
		writeDynamicProperties(obj:any, output:IDynamicPropertyOutput):void;
	}	
}