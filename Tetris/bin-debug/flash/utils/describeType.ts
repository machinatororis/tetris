/// <reference path="../../XML.ts" />
﻿
namespace flash.utils
{
	export import XML = global.XML;
	

	/**
	 * Produces an XML object that describes the ActionScript object named as the parameter of the method. 
	 */	
	export  function describeType(value:any):XML
	{
		return avmplus.describeType(value, avmplus.FLASH10_FLAGS);
	}
}