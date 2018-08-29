
namespace avmplus
{
	
	/**
	 * Returns the fully qualified class name of the base class of the object specified by the value parameter. 
	 */	
	export  function getQualifiedSuperclassName(value:any):string
	{
		if (value === null || value === undefined) {
			return null;
		}
		
		if (typeof value.__extends != 'undefined') {
			return getQualifiedClassName(value.__extends);
		}
		
		var constructor:any = value.constructor;
		if (constructor && typeof constructor.__extends != 'undefined') {
			return getQualifiedClassName(constructor.__extends);
		}
		
		if (getQualifiedClassName(value) == 'Object') {
			return null;
		}
		
		return 'Object';
	}
}