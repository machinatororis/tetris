
namespace flash.utils
{
	
	

	/**
	 * Returns the fully qualified class name of the base class of the object specified by the value parameter. 
	 */	
	export  function getQualifiedSuperclassName(value:any):string
	{
		return avmplus.getQualifiedSuperclassName(value);
	}
}