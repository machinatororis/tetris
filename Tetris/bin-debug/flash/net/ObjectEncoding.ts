/// <reference path="../../base.d.ts" />
/// <reference path="../../XML.ts" />
﻿
namespace flash.net
{
	export import XML = global.XML;
	
	/**
	 * The ObjectEncoding class is used in defining serialization settings in classes that serialize objects 
	 * (such as FileStream, NetStream, NetConnection, SharedObject, and ByteArray) to work with prior versions of ActionScript.
	 * 
	 * Object encoding controls how objects are represented in Action Message Format (AMF). Flash Player uses AMF to enable efficient 
	 * communication between an application and a remote server. AMF encodes remote procedure calls into a compact binary representation 
	 * that can be transferred over HTTP/HTTPS or the RTMP/RTMPS protocol used by Flash Media Server. 
	 * Objects and data values are serialized into this binary format, which is generally more compact than other representations, such as XML.
	 * 
	 * Adobe AIR and Flash Player 9 can serialize in two different formats: AMF3 and AMF0. AMF3, the default serialization 
	 * developed for ActionScript 3.0, provides various advantages over AMF0, which is used for ActionScript 1.0 and 2.0. 
	 * AMF3 sends data over the network more efficiently than AMF0. AMF3 supports sending int and uint objects as integers 
	 * and supports data types that are available only in ActionScript 3.0, such as ByteArray, XML, and IExternalizable. 
	 * It is available only in ActionScript 3.0 and with servers that use AMF3 encoding, such as Flex 2.
	 * 
	 * The ByteArray, FileStream, NetConnection, NetStream, SharedObject, Socket, and URLStream classes contain an objectEncoding 
	 * property that is assigned a constant from the ObjectEncoding class. The behavior of the objectEncoding property differs 
	 * depending on the object; each class's objectEncoding property description explains the behavior more thoroughly.
	 * @author pkulikov
	 */
	export  class ObjectEncoding
	{
		/**
		 * Specifies that objects are serialized using the Action Message Format for ActionScript 1.0 and 2.0. 
		 */		
		public static AMF0 : number = 0;
		
		/**
		 * Specifies that objects are serialized using the Action Message Format for ActionScript 3.0. 
		 */		
		public static AMF3 : number = 3;
			
		/**
		 * Specifies the default (latest) format for the current runtime (either Flash Player or AIR). 
		 */		
		public static DEFAULT : number = 3;
			
		/**
		 * Allows greater control over the serialization of dynamic properties of dynamic objects. 
		 */		
		public static dynamicPropertyWriter : IDynamicPropertyWriter = null;
	}	
}