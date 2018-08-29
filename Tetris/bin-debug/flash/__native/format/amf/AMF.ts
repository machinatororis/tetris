/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../utils/getQualifiedClassName.ts" />
/// <reference path="../../../utils/getDefinitionByName.ts" />
/// <reference path="../../../utils/Dictionary.ts" />
/// <reference path="../../../utils/ByteArray.ts" />
/// <reference path="../../../net/getClassByAlias.ts" />
/// <reference path="../../../net/getAliasByClass.ts" />
/// <reference path="../../../net/ObjectEncoding.ts" />
/// <reference path="../../../../avmplus/describeTypeJSON.ts" />
/// <reference path="../../../../XML.ts" />
﻿/*
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This file implements the AMF0 and AMF3 serialization protocols secified in:
 * http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/amf/pdf/amf-file-format-spec.pdf
 */

namespace flash.__native.format.amf
{
	export import XML = global.XML;
	export import describeTypeJSON = avmplus.describeTypeJSON;
	export import ObjectEncoding = flash.net.ObjectEncoding;
	export import getAliasByClass = flash.net.getAliasByClass;
	export import getClassByAlias = flash.net.getClassByAlias;
	export import ByteArray = flash.utils.ByteArray;
	export import Dictionary = flash.utils.Dictionary;
	export import getDefinitionByName = flash.utils.getDefinitionByName;
	export import getQualifiedClassName = flash.utils.getQualifiedClassName;
	

	 class AMF3ReferenceTables {
    public strings: any[] = [];
		public objects: any[] = [];
		public traits: any[] = [];
    /**
     * Trait names are kept in sync with |traits| and are used to optimize fetching public trait names.
     */
		public traitNames: any[] = [];
  }

	 class AMF0Marker {
    public static NUMBER:number = 0x00;
		public static BOOLEAN:number = 0x01;
		public static STRING:number = 0x02;
		public static OBJECT:number = 0x03;
		public static NULL:number = 0x05;
		public static UNDEFINED:number = 0 /*0x06*//*;*/
		public static REFERENCE:number = 0x07;
		public static ECMA_ARRAY:number = 0x08;
		public static OBJECT_END:number = 0x09;
		public static STRICT_ARRAY:number = 0x0A;
		public static DATE:number = 0x0B;
		public static LONG_STRING:number = 0x0C;
		public static XML:number = 0x0F;
		public static TYPED_OBJECT:number = 0x10;
		public static AVMPLUS:number = 0x11;
  }
	
	 class AMF3Marker {
		public static UNDEFINED:number = 0x00;
		public static NULL:number = 0x01;
		public static FALSE:number = 0x02;
		public static TRUE:number = 0x03;
		public static INTEGER:number = 0x04;
		public static DOUBLE:number = 0x05;
		public static STRING:number = 0x06;
		public static XML_DOCUMENT:number = 0x07;
		public static DATE:number = 0x08;
		public static ARRAY:number = 0x09;
		public static OBJECT:number = 0x0A;
		public static XML:number = 0x0B;
		public static BYTEARRAY:number = 0x0C;
		public static VECTOR_INT:number = 0x0D;
		public static VECTOR_UINT:number = 0x0E;
		public static VECTOR_DOUBLE:number = 0x0F;
		public static VECTOR_OBJECT:number = 0x10;
		public static DICTIONARY:number = 0x11;
	}
	
	function isNumeric (object: any):boolean {
		return is(object , 'int') || is(object , 'uint') || is(object , 'Number');		
	}
	
	function axGetPublicProperty(object: any, nm: any): any {
		if (is(object , Dictionary)) {
			return object.get(nm);
		}
		if (is(object , ByteArray)) {
			if (isNumeric(nm)) {
				return object.get(nm);
			}
		}
		return object[nm];
	}
	
	function axSetPublicProperty(object: any, nm: any, value: any):void {
		if (is(object , Dictionary)) {
			object.set(nm, value);
		}
		if (is(object , ByteArray)) {
			if (isNumeric(nm)) {
				object.set(nm, value);
			}
		}
		object[nm] = value;
	}
	
	function forEachPublicProperty(object: any, callbackfn: Function) {
		var exclude:any[] = [];
		var axClassName:string = getQualifiedClassName(object);
		if (axClassName) {
			var axClass: {new(...a)} = getDefinitionByName(axClassName);
			if (axClass) {
				var classInfo = getClassInfo(axClass);
				if (classInfo) {
					exclude = getSlotTraitNames(classInfo, 'traits').concat(getSlotTraitNames(classInfo, 'privates'));
				}
			}
		}
		
		var properties = Object.keys(object);
		var len = properties.length;
		for (var i = 0; i < len; i++) {
			var property = properties[i];
			if (exclude.indexOf(property) >= 0) continue; 
			callbackfn.call(object, property, axGetPublicProperty(object, property));
		}
	}
	
	function getClassInfo (cl:{new(...a)}):any {
		return describeTypeJSON(cl, 
			avmplus.INCLUDE_BASES | 
			avmplus.INCLUDE_VARIABLES | 
			avmplus.INCLUDE_ACCESSORS | 
			avmplus.INCLUDE_TRAITS |
			avmplus.INCLUDE_PRIVATES |
			avmplus.USE_ITRAITS | 
			avmplus.HIDE_OBJECT);
	}
	
	function getSlotTraitNames (classInfo: any, field:string):any[] {
		/**/ field = as(field, 'String');
		if (!classInfo || !classInfo[field]) {
			return [];
		}
		var arr:any[] = [], i:number = 0, len:number = 0, o:any;
		if (classInfo[field].variables) {
			len =(( classInfo[field].variables.length) >>> 0);
			for (i = 0; i < len; ++i) {
				o = classInfo[field].variables[i];
				if (o.access != 'readwrite') continue;
				arr.push(o.name);
			}
		}
		if (classInfo[field].accessors) {
			len =(( classInfo[field].accessors.length) >>> 0);
			for (i = 0; i < len; ++i) {
				o = classInfo[field].accessors[i];
				if (o.access != 'readwrite') continue;
				arr.push(o.name);
			}
		}
		return arr;
	}

  function writeString(ba: ByteArray, s: string) {
    /**/ ba = strict(ba, ByteArray); s = as(s, 'String');
    if (s.length > 0xFFFF) {
      throw "AMF short string exceeded";
    }
    if (!s.length) {
      ba.writeByte(0x00);
      ba.writeByte(0x00);
      return;
    }
    var bytes = new ByteArray;
		bytes.writeUTFBytes(s);
    ba.writeByte((bytes.length >> 8) & 255);
    ba.writeByte(bytes.length & 255);
		ba.writeBytes(bytes);
  }

  function readString(ba: ByteArray): string {
    /**/ ba = strict(ba, ByteArray);
    var byteLength = (ba.readByte() << 8) | ba.readByte();
    if (!byteLength) {
      return '';
    }
		return ba.readUTFBytes(byteLength);
  }

	/**
	 * 8 byte IEEE-754 double precision floating point
	 * value in network byte order (sign bit in low
	 * memory) 
	 */	
  function writeDouble(ba: ByteArray, value: number) {
    /**/ ba = strict(ba, ByteArray); value = (+(value));
    var buffer = new ArrayBuffer(8);
    var view = new DataView(buffer);
    view.setFloat64(0, value, false);
		var len = buffer.byteLength;
    for (var i = 0; i < len; i++) {
      ba.writeByte(view.getUint8(i));
    }
  }

	/**
	 * 8 byte IEEE-754 double precision floating point
	 * value in network byte order (sign bit in low
	 * memory) 
	 */
  function readDouble(ba: ByteArray): number {
    /**/ ba = strict(ba, ByteArray);
    var buffer = new ArrayBuffer(8);
    var view = new DataView(buffer);
		var len = buffer.byteLength;
    for (var i = 0; i < len; i++) {
      view.setUint8(i, ba.readByte());
    }
    return view.getFloat64(0, false);
  }
	
	/**
	 * U29-1 | U29-2 | U29-3 | U29-4 
	 */	
  function readU29(ba: ByteArray): number {
    /**/ ba = strict(ba, ByteArray);
    var b1 = ba.readByte();
    if ((b1 & 0x80) == 0) {
      return b1;
    }
    var b2 = ba.readByte();
    if ((b2 & 0x80) == 0) {
      return ((b1 & 0x7F) << 7) | b2;
    }
    var b3 = ba.readByte();
    if ((b3 & 0x80) == 0) {
      return ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | b3;
    }
    var b4 = ba.readByte();
    return ((b1 & 0x7F) << 22) | ((b2 & 0x7F) << 15) | ((b3 & 0x7F) << 8) | b4;
  }

	/**
	 * U29-1 | U29-2 | U29-3 | U29-4 
	 */	
  function writeU29(ba: ByteArray, value: number) {
    /**/ ba = strict(ba, ByteArray); value = (+(value));
    if ((value & 0xFFFFFF80) == 0) {
      ba.writeByte(value & 0x7F);
    } else if ((value & 0xFFFFC000) == 0) {
      ba.writeByte(0x80 | ((value >> 7) & 0x7F));
      ba.writeByte(value & 0x7F);
    } else if ((value & 0xFFE00000) == 0) {
      ba.writeByte(0x80 | ((value >> 14) & 0x7F));
      ba.writeByte(0x80 | ((value >> 7) & 0x7F));
      ba.writeByte(value & 0x7F);
    } else if ((value & 0xC0000000) == 0) {
      ba.writeByte(0x80 | ((value >> 22) & 0x7F));
      ba.writeByte(0x80 | ((value >> 15) & 0x7F));
      ba.writeByte(0x80 | ((value >> 8) & 0x7F));
      ba.writeByte(value & 0xFF);
    } else {
      throw "AMF3 U29 range";
    }
  }

	/**
	 * U29S-ref | (U29S-value *(UTF8-char)) 
	 */	
  function readUTF8VR(ba: ByteArray, references: AMF3ReferenceTables) {
    /**/ ba = strict(ba, ByteArray); references = strict(references, AMF3ReferenceTables);
    var u29s = readU29(ba);
    if (u29s == 0x01) {
      return "";
    }
    var strings = references.strings;
    if ((u29s & 1) == 0) {
      return strings[u29s >> 1];
    }

    var byteLength = u29s >> 1;
    var value = ba.readUTFBytes(byteLength);
    strings.push(value);
    return value;
  }

	/**
	 * U29S-ref | (U29S-value *(UTF8-char)) 
	 */	
  function writeUTF8VR(ba: ByteArray, s: string, references: AMF3ReferenceTables) {
    /**/ ba = strict(ba, ByteArray); s = as(s, 'String'); references = strict(references, AMF3ReferenceTables);
    if (s == "") {
      ba.writeByte(0x01); // empty string
      return;
    }

    var strings = references.strings;
    var index = strings.indexOf(s);
    if (index >= 0) {
      writeU29(ba, index << 1);
      return;
    }
    strings.push(s);

    var bytes = new ByteArray;
		bytes.writeUTFBytes(s);
    writeU29(ba, 1 | (bytes.length << 1));
		ba.writeBytes(bytes);
  }
	
	/**
	 * U29O-ref | U29B-value *(U8) 
	 */	
	function readBytes(ba: ByteArray, references: AMF3ReferenceTables) {
		/**/ ba = strict(ba, ByteArray); references = strict(references, AMF3ReferenceTables);
		var u29o = readU29(ba);
		if (u29o == 0x01) {
			return new ByteArray;
		}
		
		if ((u29o & 1) == 0) {
			return references.objects[u29o >> 1];
		}
		
		var bytes:ByteArray = new ByteArray;
		references.objects.push(bytes);
		var byteLength = u29o >> 1;
		bytes.writeBytes(ba, ba.position, byteLength);
		bytes.position = 0;
		return bytes;
	}
	
	/**
	 * U29O-ref | U29B-value *(U8) 
	 */	
	function writeBytes(ba: ByteArray, bytes: ByteArray, references: AMF3ReferenceTables) {
		/**/ ba = strict(ba, ByteArray); bytes = strict(bytes, ByteArray); references = strict(references, AMF3ReferenceTables);
		if (bytes.length == 0) {
			ba.writeByte(0x01); // empty bytes
			return;
		}
		
		var objects = references.objects;
		var index = objects.indexOf(bytes);
		if (index >= 0) {
			writeU29(ba, index << 1);
			return;
		}
		objects.push(bytes);
		
		writeU29(ba, 1 | (bytes.length << 1));
		ba.writeBytes(bytes);
	}

	/**
	 * http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/amf/pdf/amf-file-format-spec.pdf 
	 */	
  function readAMF3Value(ba: ByteArray, references: AMF3ReferenceTables):any
	{
    /**/ ba = strict(ba, ByteArray); references = strict(references, AMF3ReferenceTables);
    var marker:number = ba.readByte();
    switch (marker)
		{
			//-------------------------
			// null-type = null-marker
			//-------------------------
      case AMF3Marker.NULL:
        return null;
				
			//-----------------------------------
			// undefined-type = undefined-marker 
			//-----------------------------------
      case AMF3Marker.UNDEFINED:
        return undefined;
				
			//-------------------------
			// false-type = false-marker
			//-------------------------
      case AMF3Marker.FALSE:
        return false;
				
			//-------------------------
			// true-type = true-marker
			//-------------------------
      case AMF3Marker.TRUE:
        return true;
			
			//--------------------------------------------------------------------
			// integer-type = integer-marker U29 	; Uses the U29 encoding scheme,
			//																		; though the value is sign
			//																		; extended.
			//--------------------------------------------------------------------
      case AMF3Marker.INTEGER:
        return readU29(ba); // U29
				
			//------------------------------------
			// double-type = double-marker DOUBLE
			//------------------------------------
      case AMF3Marker.DOUBLE:
        return readDouble(ba); // DOUBLE
				
			//--------------------------------------
			// string-type = string-marker UTF-8-vr
			//--------------------------------------
      case AMF3Marker.STRING:
        return readUTF8VR(ba, references); // UTF-8-vr
				
			//----------------------------------------------------------------
			// U29D-value = U29 				; The first (low) bit is a flag with
			//													; value 1. The remaining bits are not
			//													; used.
			//
			// date-time = DOUBLE 			; A 64-bit integer value transported
			//													; as a double.
			//
			// date-type = date-marker (U29O-ref | (U29D-value date-time))
			//----------------------------------------------------------------
      case AMF3Marker.DATE:
        var u29o = readU29(ba); // U29
				if ((u29o & 1) == 0) {
					return references.objects[u29o >> 1]; // U29O-ref
				}
				var date:Date = new Date;
				date.time = readDouble(ba); // date-time
				references.objects.push(date);
        return date;
				
			//-------------------------------------------------------------------------
			// U29O-ref 					= U29 			; The first (low) bit is a flag
			//																; (representing whether an instance
			//																; follows) with value 0 to imply that
			//																; this is not an instance but a
			//																; reference. The remaining 1 to 28
			//																; significant bits are used to encode an
			//																; object reference index (an integer).
			//
			// U29O-traits-ref 		= U29 			; The first (low) bit is a flag with
			//																; value 1. The second bit is a flag
			//																; (representing whether a trait
			//																; reference follows) with value 0 to
			//																; imply that this objects traits are
			//																; being sent by reference. The remaining
			//																; 1 to 27 significant bits are used to
			//																; encode a trait reference index (an
			//																; integer).
			//
			// U29O-traits-ext 		= U29 			; The first (low) bit is a flag with
			//																; value 1. The second bit is a flag with
			//																; value 1. The third bit is a flag with
			//																; value 1. The remaining 1 to 26
			//																; significant bits are not significant
			//																; (the traits member count would always
			//																; be 0).
			//
			// U29O-traits 				= U29 			; The first (low) bit is a flag with
			//																; value 1. The second bit is a flag with
			//																; value 1. The third bit is a flag with
			//																; value 0. The fourth bit is a flag
			//																; specifying whether the type is
			//																; dynamic. A value of 0 implies not
			//																; dynamic, a value of 1 implies dynamic.
			//																; Dynamic types may have a set of name
			//																; value pairs for dynamic members after
			//																; the sealed member section. The
			//																; remaining 1 to 25 significant bits are
			//																; used to encode the number of sealed
			//																; traits member names that follow after
			//																; the class name (an integer).
			//
			// class-name 				= UTF-8-vr	; Note: use the empty string for
			//																; anonymous classes.
			//
			// dynamic-member 		= UTF-8-vr		; Another dynamic member follows
			//											value-type	; until the string-type is the
			//																	; empty string.
			//
			// object-type 				= object-marker (U29O-ref | (U29O-traits-ext
			//											class-name *(U8)) | U29O-traits-ref | (U29Otraits
			//											class-name *(UTF-8-vr))) *(value-type)
			//											*(dynamic-member)))
			//-------------------------------------------------------------------------
      case AMF3Marker.OBJECT:
        var u29o = readU29(ba);
        if ((u29o & 1) == 0) {
          return references.objects[u29o >> 1];
        }
        //if ((u29o & 4) !== 0) {
				//	throw "AMF3 Traits-Ext is not supported";
        //}
        var axClass: {new(...a)};
        var traits: any;
        var isDynamic = true;
        var traitNames;
        if ((u29o & 2) == 0) {
          traits = axClass = references.traits[u29o >> 2];
          traitNames = references.traitNames[u29o >> 2];
					isDynamic = traitNames.isDynamic;
        } else {
          var alias = readUTF8VR(ba, references);
          if (alias) {
            traits = axClass = getClassByAlias(alias);
          }
          isDynamic = (u29o & 8) != 0;
          traitNames = [];
          for (var i = 0, j = u29o >> 4; i < j; i++) {
            traitNames.push(readUTF8VR(ba, references));
          }
          references.traits.push(traits);
          references.traitNames.push(traitNames);
					traitNames.isDynamic = isDynamic;
        }

        var object = axClass ? new axClass : {};
        references.objects.push(object);
        // Read trait properties.
				var len = traitNames.length;
        for (var i = 0; i < len; i++) {
          var value = readAMF3Value(ba, references);
					axSetPublicProperty(object, traitNames[i], value);
        }
        // Read dynamic properties.
        if (isDynamic) {
          while (true) {
            var key = readUTF8VR(ba, references);
            if (!key.length) break;
            var value = readAMF3Value(ba, references);
						axSetPublicProperty(object, key, value);
          }
        }
        return object;
				
			//----------------------------------------------------------------
			// U29A-value 	= U29 	; The first (low) bit is a flag with
			//											; value 1. The remaining 1 to 28
			//											; significant bits are used to encode the
			//											; count of the dense portion of the
			//											; Array.
			//
			// assoc-value 	= UTF-8-vr value-type
			// 
			// array-type 	= array-marker (U29O-ref | (U29A-value
			//								(UTF-8-empty | *(assoc-value) UTF-8-empty)
			//								*(value-type)))
			//----------------------------------------------------------------
      case AMF3Marker.ARRAY:
        var u29o = readU29(ba);
        if ((u29o & 1) == 0) {
          return references.objects[u29o >> 1]; // U29O-ref
        }
        var array = [];
        references.objects.push(array);
        var densePortionLength = u29o >> 1;
        while (true) {
          var key = readUTF8VR(ba, references);
          if (!key.length) break;
          var value = readAMF3Value(ba, references);
					axSetPublicProperty(array, key, value);
        }
        for (var i = 0; i < densePortionLength; i++) {
          var value = readAMF3Value(ba, references);
					axSetPublicProperty(array, i, value);
        }
        return array;
				
			//------------------------------------------------------------
			// U29X-value = U29 	; The first (low) bit is a flag with
			//										; value 1. The remaining 1 to 28
			//										; significant bits are used to encode the
			//										; byte-length of the UTF-8 encoded
			//										; representation of the XML or
			//										; XMLDocument.
			//
			// xml-type 	= xml-marker (U29O-ref |
			//						(U29X-value *(UTF8-char)))
				//------------------------------------------------------------
			case AMF3Marker.XML:
				var u29o = readU29(ba);
				if ((u29o & 1) == 0) {
					return references.objects[u29o >> 1]; // U29O-ref
				}
				var byteLength = u29o >> 1;
				var xml:XML = new XML(ba.readUTFBytes(byteLength));
				references.objects.push(xml);
				return xml;
			
			//--------------------------------------------------------------------
			// U29B-value 			= U29		; The first (low) bit is a flag with
			//													; value 1. The remaining 1 to 28
			//													; significant bits are used to encode the
			//													; byte-length of the ByteArray.
			//
			// bytearray-type 	= bytearray-marker (U29O-ref | U29B-value *(U8))
			//--------------------------------------------------------------------
			case AMF3Marker.BYTEARRAY:
				return readBytes(ba, references);
			
			//---------------------------------------------------------------
			// U29Dict-value 		= U29 				; The first (low) bit is a
			//																; flag with value 1. The
			//																; remaining 1 to 28
			//																; significant bits are used to
			//																; encode the number of entries
			//																; in the Dictionary.
			//
			// weak-keys 				= U8 					; Boolean U8 value, 0x00 if
			//																; not using weakly-referenced
			//																; keys, otherwise 0x01 if
			//																; using weakly-referenced
			//																; keys.
			//
			// entry-key 				= value-type 	; Keys can be objects and do
			//																; not have to be strings.
			//																; Though see note about
			//																; integer keys below.
			// entry-value 			= value-type
			//
			// dictionary-type 	= dictionary-marker (U29O-ref |
			//										U29Dict-value weak-keys *(entry-key
			//										entry-value))
			//---------------------------------------------------------------
			case AMF3Marker.DICTIONARY:
				var u29o = readU29(ba);
				if ((u29o & 1) == 0) {
					return references.objects[u29o >> 1]; // U29O-ref
				}
				var keysLength = u29o >> 1;
				var dict:Dictionary = new Dictionary(ba.readByte() == 0x01);
				for (var j = 0; j < keysLength; j++) {
					axSetPublicProperty(dict, readAMF3Value(ba, references), readAMF3Value(ba, references));
				}
				references.objects.push(dict);
				return dict;
			
			//----------------------------------------------------------------
			// U29V-value 				= U29 			; The first (low) bit is a flag
			//																; with value 1. The remaining 1
			//																; to 28 significant bits are
			//																; used to encode the count of
			//																; items in Vector.
			// fixed-vector 			= U8 				; Boolean U8 value, 0x00 if not
			//																; a fixed-length Vector,
			//																; otherwise 0x01 if
			//																; fixed-length.
			//
			// object-type-name 	= UTF-8-vr 	; uses '*' for the ANY type
			//
			// vector-int-type 		= vector-int-marker (U29O-ref | U29V-value
			//											fixed-vector *(U32))
			//
			// vector-uint-type 	= vector-uint-marker (U29O-ref | U29V-value
			//											fixed-vector *(U32))
			//
			// vector-double-type = vector-double-marker (U29O-ref | U29VPage
			//											value fixed-vector *(DOUBLE))
			//
			// vector-object-type = vector-object-marker (U29O-ref |
			//											U29V-value fixed-vector object-type-name
			//											*(value-type))
			//----------------------------------------------------------------
			case AMF3Marker.VECTOR_INT:
			case AMF3Marker.VECTOR_UINT:
			case AMF3Marker.VECTOR_DOUBLE:
			case AMF3Marker.VECTOR_OBJECT:
				throw "Not implemented AMF3 marker " + marker;
			
      default:
        throw "AMF3 Unknown marker " + marker;
    }
  }

	/**
	 * http://wwwimages.adobe.com/www.adobe.com/content/dam/Adobe/en/devnet/amf/pdf/amf-file-format-spec.pdf 
	 */	
  function writeAMF3Value(ba: ByteArray, value: any, references: AMF3ReferenceTables)
	{
    /**/ ba = strict(ba, ByteArray); references = strict(references, AMF3ReferenceTables);
    switch (typeof value)
		{
			case "undefined":
				//-----------------------------------
				// undefined-type = undefined-marker 
				//-----------------------------------
				ba.writeByte(AMF3Marker.UNDEFINED);
				break;
			
      case "boolean":
				if (value)
				{
					//-------------------------
					// true-type = true-marker
					//-------------------------
					ba.writeByte(AMF3Marker.TRUE);
				} else
				{
					//-------------------------
					// false-type = false-marker
					//-------------------------
					ba.writeByte(AMF3Marker.FALSE);
				}
        break;
			
      case "number":
        var useInteger = value === (value | 0);
        if (useInteger) {
					var MAX_INT =  268435456 - 1; // 2^28 - 1
					var MIN_INT = -268435456; // -2^28
          if (value > MAX_INT || value < MIN_INT) {
            useInteger = false;
          }
        }
        if (useInteger) {
					//--------------------------------------------------------------------
					// integer-type = integer-marker U29 	; Uses the U29 encoding scheme,
					//																		; though the value is sign
					//																		; extended.
					//--------------------------------------------------------------------
          ba.writeByte(AMF3Marker.INTEGER);
          writeU29(ba, value);
        } else {
					//------------------------------------
					// double-type = double-marker DOUBLE
					//------------------------------------
          ba.writeByte(AMF3Marker.DOUBLE);
          writeDouble(ba, value);
        }
        break;
			
      case "string":
				//--------------------------------------
				// string-type = string-marker UTF-8-vr
				//--------------------------------------
        ba.writeByte(AMF3Marker.STRING);
				writeUTF8VR(ba, value, references);
        break;
			
      case "object":
        if (value === null || value === undefined)
				{
					//-------------------------
					// null-type = null-marker
					//-------------------------
          ba.writeByte(AMF3Marker.NULL);
        } else if (is(value , Array))
				{
					//----------------------------------------------------------------
					// U29A-value 	= U29 	; The first (low) bit is a flag with
					//											; value 1. The remaining 1 to 28
					//											; significant bits are used to encode the
					//											; count of the dense portion of the
					//											; Array.
					//
					// assoc-value 	= UTF-8-vr value-type
					// 
					// array-type 	= array-marker (U29O-ref | (U29A-value
					//								(UTF-8-empty | *(assoc-value) UTF-8-empty)
					//								*(value-type)))
					//----------------------------------------------------------------
          ba.writeByte(AMF3Marker.ARRAY);
          if (tryWriteU29ORef(ba, value, references)) {
            break;
          }
          var densePortionLength = 0;
          while (value.hasOwnProperty(densePortionLength)) {
            ++densePortionLength;
          }
          writeU29(ba, (densePortionLength << 1) | 1);
          forEachPublicProperty(value, function (i: any, value: any) {
            if (isNumeric(i) && i >= 0 && i < densePortionLength) {
              return;
            }
						writeUTF8VR(ba, i, references);
            writeAMF3Value(ba, value, references);
          }.__bind(this));
					writeUTF8VR(ba, '', references);
          for (var j = 0; j < densePortionLength; j++) {
						writeAMF3Value(ba, axGetPublicProperty(value, j), references);
          }
        } else if (is(value , Date))
				{
					//----------------------------------------------------------------
					// U29D-value = U29 				; The first (low) bit is a flag with
					//													; value 1. The remaining bits are not
					//													; used.
					//
					// date-time = DOUBLE 			; A 64-bit integer value transported
					//													; as a double.
					//
					// date-type = date-marker (U29O-ref | (U29D-value date-time))
					//----------------------------------------------------------------
          ba.writeByte(AMF3Marker.DATE);
          if (tryWriteU29ORef(ba, value, references)) {
            break;
					}
          writeU29(ba, 1);
          writeDouble(ba, value.valueOf());
				} else if (is(value , XML))
				{
					//------------------------------------------------------------
					// U29X-value = U29 	; The first (low) bit is a flag with
					//										; value 1. The remaining 1 to 28
					//										; significant bits are used to encode the
					//										; byte-length of the UTF-8 encoded
					//										; representation of the XML or
					//										; XMLDocument.
					//
					// xml-type 	= xml-marker (U29O-ref |
					//						(U29X-value *(UTF8-char)))
					//------------------------------------------------------------
					ba.writeByte(AMF3Marker.XML);
					if (tryWriteU29ORef(ba, value, references)) {
						break;
					}
					var bytes = new ByteArray;
					bytes.writeUTFBytes(value.toXMLString());
					writeU29(ba, 1 | (bytes.length << 1));
					ba.writeBytes(bytes);
				} else if (is(value , ByteArray))
				{
					//--------------------------------------------------------------------
					// U29B-value 			= U29		; The first (low) bit is a flag with
					//													; value 1. The remaining 1 to 28
					//													; significant bits are used to encode the
					//													; byte-length of the ByteArray.
					//
					// bytearray-type 	= bytearray-marker (U29O-ref | U29B-value *(U8))
					//--------------------------------------------------------------------
					ba.writeByte(AMF3Marker.BYTEARRAY);
					writeBytes(ba, value, references);
				} else if (is(value , Dictionary))
				{
					//---------------------------------------------------------------
					// U29Dict-value 		= U29 				; The first (low) bit is a
					//																; flag with value 1. The
					//																; remaining 1 to 28
					//																; significant bits are used to
					//																; encode the number of entries
					//																; in the Dictionary.
					//
					// weak-keys 				= U8 					; Boolean U8 value, 0x00 if
					//																; not using weakly-referenced
					//																; keys, otherwise 0x01 if
					//																; using weakly-referenced
					//																; keys.
					//
					// entry-key 				= value-type 	; Keys can be objects and do
					//																; not have to be strings.
					//																; Though see note about
					//																; integer keys below.
					// entry-value 			= value-type
					//
					// dictionary-type 	= dictionary-marker (U29O-ref |
					//										U29Dict-value weak-keys *(entry-key
					//										entry-value))
					//---------------------------------------------------------------
					ba.writeByte(AMF3Marker.DICTIONARY);
					if (tryWriteU29ORef(ba, value, references)) {
						break;
					}
					var keys = value.__iterator(false);
					var keysLength = keys.length;
					writeU29(ba, (keysLength << 1) | 1); // U29Dict-value
					ba.writeByte(value.__weak ? 0x01 : 0x00); // weak-keys
					for (var j = 0; j < keysLength; j++) {
						writeAMF3Value(ba, keys[j], references);
						writeAMF3Value(ba, axGetPublicProperty(value, keys[j]), references);
					}
        } else
				{
					//-------------------------------------------------------------------------
					// U29O-ref 					= U29 			; The first (low) bit is a flag
					//																; (representing whether an instance
					//																; follows) with value 0 to imply that
					//																; this is not an instance but a
					//																; reference. The remaining 1 to 28
					//																; significant bits are used to encode an
					//																; object reference index (an integer).
					//
					// U29O-traits-ref 		= U29 			; The first (low) bit is a flag with
					//																; value 1. The second bit is a flag
					//																; (representing whether a trait
					//																; reference follows) with value 0 to
					//																; imply that this objects traits are
					//																; being sent by reference. The remaining
					//																; 1 to 27 significant bits are used to
					//																; encode a trait reference index (an
					//																; integer).
					//
					// U29O-traits-ext 		= U29 			; The first (low) bit is a flag with
					//																; value 1. The second bit is a flag with
					//																; value 1. The third bit is a flag with
					//																; value 1. The remaining 1 to 26
					//																; significant bits are not significant
					//																; (the traits member count would always
					//																; be 0).
					//
					// U29O-traits 				= U29 			; The first (low) bit is a flag with
					//																; value 1. The second bit is a flag with
					//																; value 1. The third bit is a flag with
					//																; value 0. The fourth bit is a flag
					//																; specifying whether the type is
					//																; dynamic. A value of 0 implies not
					//																; dynamic, a value of 1 implies dynamic.
					//																; Dynamic types may have a set of name
					//																; value pairs for dynamic members after
					//																; the sealed member section. The
					//																; remaining 1 to 25 significant bits are
					//																; used to encode the number of sealed
					//																; traits member names that follow after
					//																; the class name (an integer).
					//
					// class-name 				= UTF-8-vr	; Note: use the empty string for
					//																; anonymous classes.
					//
					// dynamic-member 		= UTF-8-vr		; Another dynamic member follows
					//											value-type	; until the string-type is the
					//																	; empty string.
					//
					// object-type 				= object-marker (U29O-ref | (U29O-traits-ext
					//											class-name *(U8)) | U29O-traits-ref | (U29Otraits
					//											class-name *(UTF-8-vr))) *(value-type)
					//											*(dynamic-member)))
					//-------------------------------------------------------------------------
          ba.writeByte(AMF3Marker.OBJECT);
          if (tryWriteU29ORef(ba, value, references)) {
            break;
          }

          var isDynamic = true;
					var axClassName:string = getQualifiedClassName(value);
          var axClass: {new(...a)} = getDefinitionByName(axClassName), i, len;
          if (axClass) {
            var classInfo = getClassInfo(axClass);
            isDynamic = classInfo.isDynamic;
            var alias = getAliasByClass(axClass) || "";
            var traitsRef = references.traits.indexOf(axClass);
            var traitNames: any[] = null;
            if (traitsRef < 0) {
              // Write traits since we haven't done so yet.
              traitNames = getSlotTraitNames(classInfo, 'traits');
              references.traits.push(axClass);
              references.traitNames.push(traitNames);
              writeU29(ba, (isDynamic ? 0x0B : 0x03) + (traitNames.length << 4));
							writeUTF8VR(ba, alias, references);
              // Write trait names.
							len = traitNames.length;
              for (i = 0; i < len; i++) {
								writeUTF8VR(ba, traitNames[i], references);
              }
            } else {
              // Write a reference to the previously written traits.
              traitNames =strict( references.traitNames[traitsRef], Array);
              writeU29(ba, 0x01 + (traitsRef << 2));
            }
            // Write the actual trait values.
						len = traitNames.length;
            for (i = 0; i < len; i++) {
              writeAMF3Value(ba, axGetPublicProperty(value, traitNames[i]), references);
            }
          } else {
            // REDUX: I don't understand in what situations we wouldn't have a class definition, ask Yury.
            // object with no class definition
            writeU29(ba, 0x0B);
						writeUTF8VR(ba, "", references); // empty alias name
          }

          // Write dynamic properties.
          if (isDynamic) {
            forEachPublicProperty(value, function (i, value) {
							writeUTF8VR(ba, i, references);
              writeAMF3Value(ba, value, references);
            }.__bind(this));
						writeUTF8VR(ba, "", references);
          }
        }
        return;
    }
  }
	
	/**
	 * Tries to write a reference to a previously written object.
	 */
	function tryWriteU29ORef(ba: ByteArray, object: any, references: AMF3ReferenceTables) {
		/**/ ba = strict(ba, ByteArray); references = strict(references, AMF3ReferenceTables);
		var objects = references.objects;
		var index = objects.indexOf(object);
		if (index < 0) {
			objects.push(object);
			return false;
		}
		writeU29(ba, index << 1); // U29O-ref
		return true;
	}

	/**
	 * AMF encoding proxy 
	 * @author pkulikov
	 * 
	 */	
	export  class AMF
	{
		public static classMap:Dictionary = asc.sti(AMF,()=>{ AMF.classMap = new Dictionary; });
		public static nameMap:any = {};
		
		public static write(objectEncoding: number, ba: ByteArray, object: any) {
			/**/ objectEncoding = ((objectEncoding) >>> 0); ba = strict(ba, ByteArray);
			switch (objectEncoding) {
				case ObjectEncoding.AMF0:
					AMF.writeAMF0(ba, object);
					break;
				case ObjectEncoding.AMF3:
					writeAMF3Value(ba, object, new AMF3ReferenceTables);
					break;
				default:
					throw new Error("Object Encoding");
			}
		}
		
		public static read(objectEncoding: number, ba: ByteArray):any {
			/**/ objectEncoding = ((objectEncoding) >>> 0); ba = strict(ba, ByteArray);
			switch (objectEncoding) {
				case ObjectEncoding.AMF0:
					return AMF.readAMF0(ba);
				case ObjectEncoding.AMF3:
					return readAMF3Value(ba, new AMF3ReferenceTables);
				default:
					throw new Error("Object Encoding");
			}
		}
		
		/**
		 * http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/amf/pdf/amf0-file-format-specification.pdf 
		 * @param ba
		 * @param value
		 * @return 
		 * 
		 */		
		public static writeAMF0(ba: ByteArray, value: any)
		{
			/**/ ba = strict(ba, ByteArray);
			switch (typeof value) {
				case "boolean":
					ba.writeByte(AMF0Marker.BOOLEAN);
					ba.writeByte(value ? 0x01: 0x00);
					break;
				case "number":
					ba.writeByte(AMF0Marker.NUMBER);
					writeDouble(ba, value);
					break;
				case "undefined":
					ba.writeByte(AMF0Marker.UNDEFINED);
					break;
				case "string":
					ba.writeByte(AMF0Marker.STRING);
					writeString(ba, value);
					break;
				case "object":
					var object = value;
					if (object === null || object === undefined) {
						ba.writeByte(AMF0Marker.NULL);
					} else if (is(object , Array)) {
						var array:any[] = as(object , Array);
						ba.writeByte(AMF0Marker.ECMA_ARRAY);
						ba.writeByte((array.length >>> 24) & 255);
						ba.writeByte((array.length >> 16) & 255);
						ba.writeByte((array.length >> 8) & 255);
						ba.writeByte(array.length & 255);
						// REDUX: What about sparse arrays?
						forEachPublicProperty(array, function (key: string, value: any):void {
							writeString(ba, key);
							AMF.writeAMF0(ba, value);
						}.__bind(this));
						ba.writeByte(0x00);
						ba.writeByte(0x00);
						ba.writeByte(AMF0Marker.OBJECT_END);
					} else {
						ba.writeByte(AMF0Marker.OBJECT);
						forEachPublicProperty(object, function (key: string, value: any):void {
							writeString(ba, key);
							AMF.writeAMF0(ba, value);
						}.__bind(this));
						ba.writeByte(0x00);
						ba.writeByte(0x00);
						ba.writeByte(AMF0Marker.OBJECT_END);
					}
					return;
			}
		}
		
		/**
		 * http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/amf/pdf/amf0-file-format-specification.pdf 
		 * @param ba
		 * @return 
		 * 
		 */		
		public static readAMF0(ba: ByteArray): any {
			/**/ ba = strict(ba, ByteArray);
			var marker = ba.readByte();
			switch (marker) {
				case AMF0Marker.NUMBER:
					return readDouble(ba);
				case AMF0Marker.BOOLEAN:
					return !!ba.readByte();
				case AMF0Marker.STRING:
					return readString(ba);
				case AMF0Marker.OBJECT:
					var object = {};
					while (true) {
						var key = readString(ba);
						if (!key.length) break;
						axSetPublicProperty(object, key, AMF.readAMF0(ba));
					}
					if (ba.readByte() != AMF0Marker.OBJECT_END) {
						throw "AMF0 End marker is not found";
					}
					return object;
				case AMF0Marker.NULL:
					return null;
				case AMF0Marker.UNDEFINED:
					return undefined;
				case AMF0Marker.ECMA_ARRAY:
					var array = [];
					array.length = (ba.readByte() << 24) | (ba.readByte() << 16) |
					(ba.readByte() << 8) | ba.readByte();
					while (true) {
						var key = readString(ba);
						if (!key.length) break;
						axSetPublicProperty(array, key, AMF.readAMF0(ba));
					}
					if (ba.readByte() != AMF0Marker.OBJECT_END) {
						throw "AMF0 End marker is not found";
					}
					return array;
				case AMF0Marker.STRICT_ARRAY:
					var array = [];
					var length = array.length = (ba.readByte() << 24) | (ba.readByte() << 16) |
					(ba.readByte() << 8) | ba.readByte();
					for (var i = 0; i < length; i++) {
						axSetPublicProperty(array, i, AMF.readAMF0(ba));
					}
					return array;
				case AMF0Marker.AVMPLUS:
					return readAMF3Value(ba, new AMF3ReferenceTables);
				default:
					throw "AMF0 Unknown marker " + marker;
			}
		}
	}
}