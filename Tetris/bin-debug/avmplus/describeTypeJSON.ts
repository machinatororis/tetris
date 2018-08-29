/// <reference path="../flash/utils/getDefinitionByName.ts" />
﻿
namespace avmplus
{
	export import getDefinitionByName = flash.utils.getDefinitionByName;
	
	
	/**
	 * Produces an JSON object that describes the ActionScript object named as the parameter of the method. 
	 */	
	export  function describeTypeJSON(o:any, flags:number):any
	{
		/**/ flags = ((flags) >>> 0);
		var nullOrUndefined:boolean = o === null || o === undefined;
		if (flags & USE_ITRAITS && nullOrUndefined) {
			return null;
		}
		
		if (nullOrUndefined) {
			return createNullOrUndefinedDescription(o, flags);
		}
		
		var className:string = getQualifiedClassName(o), cls:any;
		try {
			cls = getDefinitionByName(className);
		} catch (e) {
			e = window.asc.e2e(e);
			return null;
		}
		
		var describeClass:boolean = o.prototype && !(flags & USE_ITRAITS);
		var info = window.asc.classInfo[className];
		if (!info) {
			return null;
		}
		
		var hash:string = className + flags;
		var cached:any = window.asc.cache[hash];
		if (cached) {
			return cached;
		}
		
		var description:any = {
			name: info.name,
			isStatic: describeClass,
			isFinal: describeClass || info.isFinal,
			isDynamic: describeClass || info.isDynamic
		};
		
		if (flags & INCLUDE_TRAITS) {
			description.traits = addTraits(cls, info, flags, describeClass);
		}
		
		if (flags & INCLUDE_PRIVATES) {
			description.privates = addTraits(cls, info, flags, describeClass, true);
		}
		
		return window.asc.cache[hash] = description;
	}
	
	function createNullOrUndefinedDescription (o:any, flags:number):any
	{
		/**/ flags = ((flags) >>> 0);
		var obj = {
			name: 'null',
			isStatic: false,
			isFinal: true,
			isDynamic: false,
			traits: null
		};
		
		if (flags & INCLUDE_TRAITS) {
			obj.traits = {
				variables: null,
				accessors: null,
				constructor: null,
				methods: null,
				metadata: flags & INCLUDE_METADATA ? [] : null,
				interfaces: flags & INCLUDE_INTERFACES ? [] : null,
				bases: flags & INCLUDE_BASES ? [] : null
			};
		}
		
		return obj;
	}
	
	function addTraits(cls: any, info: any, flags: number, describingClass: boolean, describingPrivates:boolean = false)
	{
		/**/ flags = ((flags) >>> 0); describingClass = Boolean(describingClass); describingPrivates = Boolean(describingPrivates);
		var includeBases = flags & INCLUDE_BASES;
		var includeMethods = flags & INCLUDE_METHODS;
		var obj = {};
		
		var variablesVal = obj.variables = flags & INCLUDE_VARIABLES ? [] : null;
		var accessorsVal = obj.accessors = flags & INCLUDE_ACCESSORS ? [] : null;
		
		var metadataList: any[] = null;
		// Somewhat absurdly, class metadata is only included when describing instances.
		if (flags & INCLUDE_METADATA && !describingClass && !describingPrivates) {
			metadataList =strict( info.factory.traits.metadata, Array);
		}
		// This particular metadata list is always created, even if no metadata exists.
		obj.metadata = metadataList || [];
		
		if (flags & INCLUDE_CONSTRUCTOR && !describingClass && !describingPrivates) {
			obj.constructor = info.factory.traits.constructor;
		}
		
		if (flags & INCLUDE_INTERFACES) {
			obj.interfaces = [];
		} else {
			obj.interfaces = null;
		}
		
		var methodsVal = obj.methods = includeMethods ? [] : null;
		var basesVal = obj.bases = includeBases ? [] : null;
		
		var addBase = false;
		var isInterface = info.type == 'interface';
		var className = info.name;
		var fieldName = describingPrivates ? 'privates' : 'traits';
		while (cls)
		{
			if (includeBases && addBase && !describingClass) {
				basesVal.push(className);
			} else {
				addBase = true;
			}
			if (flags & HIDE_OBJECT && cls === Object) {
				break;
			}
			if (!describingClass)
			{
				// instance
				describeTraits.__bind(this)(info.factory[fieldName], isInterface);
				
				// interfaces
				if (obj.interfaces && info.interfaces && !describingPrivates) {
					info.interfaces.forEach(function (iface) { 
						if (obj.interfaces.indexOf(iface) == -1) {
							obj.interfaces.push(iface);
						}
					}.__bind(this));
				}
			} else
			{
				// class
				describeTraits.__bind(this)(info[fieldName], isInterface);
			}
			
			try {
				className = getQualifiedSuperclassName(cls);
				info = window.asc.classInfo[className];
				if (info) {
					cls = getDefinitionByName(className);
				} else {
					cls = null;
				}
			} catch (e) {
				e = window.asc.e2e(e);
				cls = null;
			}
		}
		
		// When describing Class objects, the bases to add are always Class and Object.
		if (describingClass && !describingPrivates) {
			// When describing Class objects, accessors are ignored. *Except* the `prototype` accessor.
			var val:any;
			if (flags & INCLUDE_ACCESSORS && flags & HIDE_OBJECT) {
				val = {};
				val.name = 'prototype';
				val.type = '*';
				val.access = "readonly";
				val.metadata = null;
				val.uri = null;
				val.declaredBy = 'Class';
				accessorsVal.push(val);
			}
			// When describing Class objects, variables are ignored. *Except* the `length` variable.
			if (flags & INCLUDE_VARIABLES && flags & HIDE_OBJECT) {
				val = {};
				val.name = 'length';
				val.type = 'int';
				val.access = "readonly";
				val.metadata = null;
				val.uri = null;
				variablesVal.push(val);
			}
			// default bases
			if (includeBases) {
				basesVal.pop();
				basesVal.push('Class', 'Object');
			}
		}
		
		// Having a hot function closed over isn't all that great, but moving this out would involve
		// passing lots and lots of arguments. We might do that if performance becomes an issue.
		function describeTraits(traits: any, isInterface: boolean) {
			
			/**/ isInterface = Boolean(isInterface);
			
			// All types share some fields, but setting them in one place changes the order in which
			// they're defined - and hence show up in iteration. While it is somewhat unlikely that
			// real content relies on that order, tests certainly do, so we duplicate the code.
			if (flags & INCLUDE_VARIABLES) {
				iterate.__bind(this)('variables');
			}
			
			if (flags & INCLUDE_ACCESSORS) {
				iterate.__bind(this)('accessors');
			}
			
			if (flags & INCLUDE_METHODS) {
				iterate.__bind(this)('methods');
			}
			
			function iterate (field:string) {
				/**/ field = as(field, 'String');
				var list:any[] =  strict(traits ? traits[field] : null, Array), len:number =  ((list ? list.length : 0) >> 0);
				for (var i = 0; i < len; i++) {
					var t = list[i], val = {};
					var __for0 = window.asc.in(t);
					for (var f of __for0) {
						if (f == 'metadata' && !(flags & INCLUDE_METADATA)) {
							continue;
						}
						val[f] = t[f];
					}
					obj[field].push(val);
				}
			}
		}
		
		// `methods` and `variables` are the only list that are `null`-ed if empty.
		if (!methodsVal || (methodsVal && methodsVal.length == 0)) {
			obj.methods = null;
		}
		if (!variablesVal || (variablesVal && variablesVal.length == 0)) {
			obj.variables = null;
		}
		
		return obj;
	}
}