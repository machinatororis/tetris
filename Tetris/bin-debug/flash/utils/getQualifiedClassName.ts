namespace flash.utils
{
	
	

	/**
	 * Returns the fully qualified class name of an object. 
	 */	
	export  function getQualifiedClassName(value:any):string
	{
		return avmplus.getQualifiedClassName(value);
	}
}