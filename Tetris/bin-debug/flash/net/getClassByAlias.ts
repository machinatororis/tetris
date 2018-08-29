/// <reference path="../__native/format/amf/AMF.ts" />
﻿
namespace flash.net
{
	export import AMF = flash.__native.format.amf.AMF;
	

	/**
	 * Looks up a class that previously had an alias registered through a call to the registerClassAlias() method.
	 * 
	 * This method does not interact with the flash.utils.getDefinitionByName() method.
	 */	
	export  function getClassByAlias(aliasName:string):{new(...a)}
	{
		/**/ aliasName = as(aliasName, 'String');
		return AMF.nameMap[aliasName];
	}
}