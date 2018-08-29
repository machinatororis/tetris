/// <reference path="../__native/format/amf/AMF.ts" />
﻿
namespace flash.net
{
	
	export import AMF = flash.__native.format.amf.AMF;
	

	export  function getAliasByClass(classObject:{new(...a)}):string
	{
		return AMF.classMap.get(classObject);
	}
}