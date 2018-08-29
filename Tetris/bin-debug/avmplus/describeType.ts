/// <reference path="../XMLList.ts" />
/// <reference path="../XML.ts" />
/// <reference path="../Namespace.ts" />
﻿/* -*- c-basic-offset: 4; indent-tabs-mode: nil; tab-width: 4 -*- */
/* vi: set ts=4 sw=4 expandtab: (add to ~/.vimrc: set modeline modelines=5) */
/* ***** BEGIN LICENSE BLOCK *****
* Version: MPL 1.1/GPL 2.0/LGPL 2.1
*
* The contents of this file are subject to the Mozilla Public License Version
* 1.1 (the "License"); you may not use this file except in compliance with
* the License. You may obtain a copy of the License at
* http://www.mozilla.org/MPL/
*
* Software distributed under the License is distributed on an "AS IS" basis,
* WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
* for the specific language governing rights and limitations under the
* License.
*
* The Original Code is [Open Source Virtual Machine.].
*
* The Initial Developer of the Original Code is
* Adobe System Incorporated.
* Portions created by the Initial Developer are Copyright (C) 2008
* the Initial Developer. All Rights Reserved.
*
* Contributor(s):
*   Adobe AS3 Team
*
* Alternatively, the contents of this file may be used under the terms of
* either the GNU General Public License Version 2 or later (the "GPL"), or
* the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
* in which case the provisions of the GPL or the LGPL are applicable instead
* of those above. If you wish to allow use of your version of this file only
* under the terms of either the GPL or the LGPL, and not to allow others to
* use your version of this file under the terms of the MPL, indicate your
* decision by deleting the provisions above and replace them with the notice
* and other provisions required by the GPL or the LGPL. If you do not delete
* the provisions above, a recipient may use your version of this file under
* the terms of any one of the MPL, the GPL or the LGPL.
*
* ***** END LICENSE BLOCK ***** */


namespace avmplus
{
	export import Namespace = global.Namespace;
	export import XML = global.XML;
	export import XMLList = global.XMLList;
	
	/*use namespace AS3;*/
	
	// -------------- internal --------------
	
	export  var extendsXml:XML;
	export  var implementsXml:XML;
	export  var constructorXml:XML;
	export  var constantXml:XML;
	export  var variableXml:XML;
	export  var accessorXml:XML;
	export  var methodXml:XML;
	export  var parameterXml:XML;
	export  var metadataXml:XML;
	export  var argXml:XML;
	export  var typeXml:XML;
	export  var factoryXml:XML;
	
	 function describeParams(x:XML, parameters:any):void
	{
		/**/ x = strict(x, XML);
		parameterXml =parameterXml || new XML(`<parameter />`);
		
		var c:XMLList = x.children();
		var __for0 = window.asc.in(parameters);
		for (var i of __for0)
		{
			var p = parameters[i];
			var f:XML = parameterXml.copy();
			f.setAttribute('index', ((i) >> 0) + 1);
			f.setAttribute('type', p.type);
			f.setAttribute('optional', p.optional);
			
			c[c.length()] = f;
		}
	}
	
	 function describeMetadata(x:XML, metadata:any[]):void
	{
		/**/ x = strict(x, XML); metadata = strict(metadata, Array);
		metadataXml =metadataXml || new XML(`<metadata />`);
		argXml =argXml || new XML(`<arg />`);
		
		var c:XMLList = x.children();
		var __for1 = window.asc.of(metadata);
		for  (var md of __for1)
		{
			var m:XML = metadataXml.copy();
			m.setAttribute('name', md.name);
			var __for2 = window.asc.of(md.value);
			for  (var i of __for2)
			{
				var a:XML = argXml.copy();
				a.setAttribute('key', i.key);
				a.setAttribute('value', i.value);
				m./*AS3::*/appendChild(a);
			}
			c[c.length()] = m;
		}
	}
	
	 function finish(e:XML, i:any):void
	{
		/**/ e = strict(e, XML);
		if (i.uri) e.setAttribute('uri', i.uri);
		if (i.metadata) describeMetadata(e, i.metadata);
	}
	
	 function describeTraits(x:XML, traits:any):void
	{
		/**/ x = strict(x, XML);
		extendsXml =extendsXml || new XML(`<extendsClass />`);
		implementsXml =implementsXml || new XML(`<implementsInterface />`);
		constructorXml =constructorXml || new XML(`<constructor />`);
		constantXml =constantXml || new XML(`<constant />`);
		variableXml =variableXml || new XML(`<variable />`);
		accessorXml =accessorXml || new XML(`<accessor />`);
		methodXml =methodXml || new XML(`<method />`);
		
		var c:XMLList = x.children();
		
		var __for3 = window.asc.of(traits.bases);
		for  (var base of __for3)
		{
			var e:XML = extendsXml.copy();
			e.setAttribute('type', base);
			c[c.length()] = e;
		}
		var __for4 = window.asc.of(traits.interfaces);
		for  (var interf of __for4)
		{
			var e:XML = implementsXml.copy();
			e.setAttribute('type', interf);
			c[c.length()] = e;
		}
		if (traits.constructor !== null)
		{
			var e:XML = constructorXml.copy();
			describeParams(e, traits.constructor);
			c[c.length()] = e;
		}
		
		var __for5 = window.asc.of(traits.variables);
		for  (var variable of __for5)
		{
			var e:XML = (variable.access == "readonly") ? constantXml.copy() : variableXml.copy();
			e.setAttribute('name', variable.name);
			e.setAttribute('type', variable.type);
			finish(e, variable);
			c[c.length()] = e;
		}
		var __for6 = window.asc.of(traits.accessors);
		for  (var accessor of __for6)
		{
			var e:XML = accessorXml.copy();
			e.setAttribute('name', accessor.name);
			e.setAttribute('access', accessor.access);
			e.setAttribute('type', accessor.type);
			e.setAttribute('declaredBy', accessor.declaredBy);
			finish(e, accessor);
			c[c.length()] = e;
		}
		var __for7 = window.asc.of(traits.methods);
		for  (var method of __for7)
		{
			var e:XML = methodXml.copy();
			e.setAttribute('name', method.name);
			e.setAttribute('declaredBy', method.declaredBy);
			e.setAttribute('returnType', method.returnType);
			describeParams(e, method.parameters);
			finish(e, method);
			c[c.length()] = e;
		}
		describeMetadata(x, traits.metadata);
	}
	
	// -------------- public --------------
	
	// this bit replicates a bug in Flash9/10, where a method that uses a custom namespace
	// won't be in the output if any of its base classes (or interfaces) also define a method
	// in that custom namespace.
	export const HIDE_NSURI_METHODS:number    = 0x0001;
	export const INCLUDE_BASES:number         = 0x0002;
	export const INCLUDE_INTERFACES:number    = 0x0004;
	export const INCLUDE_VARIABLES:number     = 0x0008;
	export const INCLUDE_ACCESSORS:number     = 0x0010;
	export const INCLUDE_METHODS:number       = 0x0020;
	export const INCLUDE_METADATA:number      = 0x0040;
	export const INCLUDE_CONSTRUCTOR:number   = 0x0080;
	export const INCLUDE_TRAITS:number        = 0x0100;
	export const USE_ITRAITS:number           = 0x0200;
	// if set, hide everything from the base Object class
	export const HIDE_OBJECT:number           = 0x0400;
	// if set, add internal fields with mods like private, protected, internal, etc
	export const INCLUDE_PRIVATES:number      = 0x0800;
	
	// set of flags that replicates the behavior of flash.util.describeType in FlashPlayer 9 & 10
	export const FLASH10_FLAGS:number =
		 ((0x0002 |
		0x0004 |
		0x0008 |
		0x0010 |
		0x0020 |
		0x0040 |
		0x0080 |
		0x0100 |
		// include this buggy behavior by default, to match legacy Flash behavior
		0x0001 |
		// Flash hides everything in class Object
		0x0400) >>> 0);
	
	/**
	 * Produces an XML object that describes the ActionScript object named as the parameter of the method. 
	 */	
	export  function describeType(value:any, flags:number):XML
	{
		/**/ flags = ((flags) >>> 0);
		typeXml =typeXml || new XML(`<type />`);
		factoryXml =factoryXml || new XML(`<factory />`);
		
		var x:XML, prevE4X:boolean = XML.ignoreECMAScriptForXML;
		try
		{
			XML.ignoreECMAScriptForXML = true;
			var o:any = describeTypeJSON(value, flags);
			x = typeXml.copy();
			if (!o) {
				throw new Error('can not describeTypeJSON');
			}
			
			o.traits =o.traits || {};
			o.traits.bases =o.traits.bases || [];
			
			x.setAttribute('name', o.name);
			if (o.traits.bases.length) {
				x.setAttribute('base', o.traits.bases[0]);
			}
			x.setAttribute('isDynamic', o.isDynamic);
			x.setAttribute('isFinal', o.isFinal);
			x.setAttribute('isStatic', o.isStatic);
			describeTraits(x, o.traits);
			
			o = describeTypeJSON(value, flags | USE_ITRAITS);
			if (o) {
				o.traits =o.traits || {};
				o.traits.bases =o.traits.bases || [];
				var e:XML = factoryXml.copy();
				e.setAttribute('type', o.name);
				describeTraits(e, o.traits);
				x./*AS3::*/appendChild(e);
			}
		} catch (error)
		{
			error = window.asc.e2e(error);
			trace(error.getStackTrace());
		} finally
		{
			XML.ignoreECMAScriptForXML = prevE4X;
			if (x) {
				x.e4x();
			}
		}
		
		return x;
	}
}