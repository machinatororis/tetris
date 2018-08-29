/// <reference path="../__native/format/amf/AMF.ts" />
﻿
namespace flash.net
{
	export import AMF = flash.__native.format.amf.AMF;
	

	/**
	 * Preserves the class (type) of an object when the object is encoded in Action Message Format (AMF). 
	 * When you encode an object into AMF, this function saves the alias for its class, so that you can recover the class when decoding 
	 * the object. If the encoding context did not register an alias for an object's class, the object is encoded as an anonymous object. 
	 * Similarly, if the decoding context does not have the same alias registered, an anonymous object is created for the decoded data.
	 * 
	 * LocalConnection, ByteArray, SharedObject, NetConnection and NetStream are all examples of classes that encode objects in AMF.
	 * 
	 * The encoding and decoding contexts do not need to use the same class for an alias; they can intentionally change classes, 
	 * provided that the destination class contains all of the members that the source class serializes. 
	 */	
	export  function registerClassAlias(aliasName:string, classObject:{new(...a)})
	{
		/**/ aliasName = as(aliasName, 'String');
		AMF.classMap.set(classObject,  aliasName);
		AMF.nameMap[aliasName] = classObject;
	}
}