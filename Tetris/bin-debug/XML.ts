/// <reference path="base.d.ts" />
////////////////////////////////////////////////////////////////////////////////
//
//  Licensed to the Apache Software Foundation (ASF) under one or more
//  contributor license agreements.  See the NOTICE file distributed with
//  this work for additional information regarding copyright ownership.
//  The ASF licenses this file to You under the Apache License, Version 2.0
//  (the "License"); you may not use this file except in compliance with
//  the License.  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//
////////////////////////////////////////////////////////////////////////////////

namespace global
{
	
	export  class XML
	{
		/*
		* Dealing with namespaces:
		* If the name is qualified, it has a prefix. Otherwise, the prefix is null.
		* Additionally, it has a namespaceURI. Otherwise the namespaceURI is null.
		* the prefix together with the namespaceURI form a QName
		*/
		
		private static defaultNamespace:Namespace = null;
		
		public static setDefaultNamespace(ns:any):void
		{
			/*if (ns is Namespace) defaultNamespace = ns;
			else if (ns is String) defaultNamespace = new Namespace(ns);
			else defaultNamespace = null;*/
		}
		
		/**
		 * [static] Determines whether XML E4X syntax are ignored.
		 *  
		 */
		public static ignoreECMAScriptForXML:boolean = false;
		
		/**
		 * [static] Determines whether XML comments are ignored when XML objects parse the source XML data.
		 *  
		 */
		public static ignoreComments:boolean = true;
		
		/**
		 * [static] Determines whether XML processing instructions are ignored when XML objects parse the source XML data.
		 *  
		 */
		public static ignoreProcessingInstructions:boolean = true;
		
		/**
		 * [static] Determines whether white space characters at the beginning and end of text nodes are ignored during parsing.
		 *  
		 */
		public static ignoreWhitespace:boolean = true;
		
		private static _prettyIndent:number = 2;
		/**
		 * [static] Determines the amount of indentation applied by the toString() and toXMLString() methods when the XML.prettyPrinting property is set to true.
		 * 
		 */
		public static set prettyIndent(value:number)
		{
			/**/ value = ((value) >> 0);
			XML._prettyIndent = value;
			XML._indentStr = "";
			for (var i:number = 0; i < value; i++) {
				XML._indentStr = XML._indentStr + XML.INDENT_CHAR;
			}
		}
		
		public static get prettyIndent():number
		{
			return XML._prettyIndent;
		}
		
		private static _indentStr:string = "  ";
		private static INDENT_CHAR:string = " ";
		
		/**
		 * [static] Determines whether the toString() and toXMLString() methods normalize white space characters between some tags.
		 * 
		 */
		public static prettyPrinting:boolean = true;
		
		private static escapeAttributeValue(value:string):string
		{
			/**/ value = as(value, 'String');
			if (value == null) {
				return '';
			}
			var outArr:any[] = [];
			var arr:any[] = value.split('');
			var len:number = arr.length;
			for (var i:number = 0; i < len; i++)
			{
				switch(arr[i])
				{
					case "<":
						outArr[i] = "&lt;";
						break;
					case "&":
						outArr[i] = "&amp;";
						break;
					case "\u000A":
						outArr[i] = "&#xA;";
						break;
					case "\u000D":
						outArr[i] = "&#xD;";
						break;
					case "\u0009":
						outArr[i] = "&#x9;";
						break;
					default:
						outArr[i] = arr[i];
						break;
				}
			}
			return outArr.join('');
		}
		
		private static escapeElementValue(value:string):string
		{
			/**/ value = as(value, 'String');
			if (value == null) {
				return '';
			}
			var outArr:any[] = [];
			var arr:any[] = value.split("");
			var len:number = arr.length;
			for (var i:number = 0; i < len; i++)
			{
				switch (arr[i])
				{
					case "<":
						outArr[i] = "&lt;";
						break;
					case ">":
						outArr[i] = "&gt;";
						break;
					case "&":
						outArr[i] = "&amp;";
						break;
					default:
						outArr[i] = arr[i];
						break;
				}
			}
			return outArr.join('');
		}
		
		private static insertAttribute(att:Attr, parent:XML):XML
		{
			/**/ att = strict(att, Attr); parent = strict(parent, XML);
			var xml:XML = new XML;
			xml.setParent(parent);
			xml.setNodeKind("attribute");
			xml.setName(att.name);
			xml.setValue(att.value);
			parent.addChildInternal(xml);
			return xml;
		}
		
		/**
		 * 
		 * @param node Element, CharacterData, etc 
		 * @param xml
		 * 
		 */		
		private static iterateElement(node:any, xml:XML):void
		{
			/**/ xml = strict(xml, XML);
			// add attributes
			var attrs:any = node.attributes;
			var len:number =  ((attrs.length) >>> 0);
			for (var i:number = 0; i < len; i++) {
				XML.insertAttribute(attrs[i], xml);
			}
			// loop through childNodes which will be one of:
			// text, cdata, processing instrution or comment and add them as children of the element
			var childNodes:NodeList =  strict(node.childNodes, NodeList);
			len =(( childNodes.length) >>> 0);
			for (i = 0; i < len; i++) {
				xml.addChildInternal(XML.fromNode(childNodes[i]));
			}
		}
		
		/**
		 * returns an XML object from an existing node without the need to parse the XML.
		 * The new XML object is not normalized
		 * 
		 * @param node Element, CharacterData, etc
		 */
		private static fromNode(node:any):XML
		{
			var xml:XML;
			var i:number = 0;
			var data:any = node.nodeValue;
			var qname:QName = new QName(node.namespaceURI, node.nodeName);
			qname.prefix =as( node.prefix, 'String');
			switch (node.nodeType)
			{
				case 1:
					//ELEMENT_NODE
					xml = new XML;
					xml.setNodeKind("element");
					xml.setName(qname);
					XML.iterateElement(node,xml);
					break;
				//case 2:break;// ATTRIBUTE_NODE (handled separately)
				case 3:
					//TEXT_NODE
					xml = new XML;
					xml.setNodeKind("text");
					xml.setName(qname);
					xml.setValue(data);
					break;
				case 4:
					//CDATA_SECTION_NODE
					xml = new XML;
					xml.setName(qname);
					xml.setNodeKind("text");
					data = "<![CDATA[" + data + "]]>";
					xml.setValue(data);
					break;
				//case 5:break;//ENTITY_REFERENCE_NODE
				//case 6:break;//ENTITY_NODE
				case 7:
					//PROCESSING_INSTRUCTION_NODE
					xml = new XML;
					xml.setNodeKind("processing-instruction");
					xml.setName(qname);
					xml.setValue(data);
					break;
				case 8:
					//COMMENT_NODE
					xml = new XML;
					xml.setNodeKind("comment");
					xml.setValue(data);
					break;
				//case 9:break;//DOCUMENT_NODE
				//case 10:break;//DOCUMENT_TYPE_NODE
				//case 11:break;//DOCUMENT_FRAGMENT_NODE
				//case 12:break;//NOTATION_NODE
				default:
					throw new TypeError("Unknown XML node type!");
					break;
			}
			return xml;
		}
		
		private static namespaceInArray(ns:Namespace, arr:any[], considerPrefix:boolean = true):boolean
		{
			/**/ ns = strict(ns, Namespace); arr = strict(arr, Array); considerPrefix = Boolean(considerPrefix);
			if (!arr) {
				return false;
			}
			var len:number = arr.length;
			for (var i:number = 0; i < len; i++)
			{
				var a:any = arr[i];
				if (ns.uri == a.uri)
				{
					if (!considerPrefix) {
						return true;
					}
					if (ns.prefix == a.prefix) {
						return true;
					}
				}
			}
			return false;
		}
		
		private static trimXMLWhitespace(value:string):string
		{
			/**/ value = as(value, 'String');
			return value.replace(/^\s+|\s+$/gm,'');
		}
		
		/**
		 * [static] Returns an object with the following properties set to the default values: ignoreComments, ignoreProcessingInstructions, ignoreWhitespace, prettyIndent, and prettyPrinting.
		 * @return 
		 * 
		 */
		public static defaultSettings():any
		{
			return {
				ignoreComments : true,
				ignoreProcessingInstructions : true,
				ignoreWhitespace : true,
				prettyIndent : 2,
				prettyPrinting : true
			}
		}
		
		/**
		 * [static] Sets values for the following XML properties: ignoreComments, ignoreProcessingInstructions, ignoreWhitespace, prettyIndent, and prettyPrinting.
		 * @param rest
		 * 
		 */
		public static setSettings(value:any):void
		{
			if (!value) {
				return;
			}
			
			XML.ignoreComments =Boolean( value.ignoreComments === undefined ? XML.ignoreComments : value.ignoreComments);
			XML.ignoreProcessingInstructions =Boolean( value.ignoreProcessingInstructions === undefined ? XML.ignoreProcessingInstructions : value.ignoreProcessingInstructions);
			XML.ignoreWhitespace =Boolean( value.ignoreWhitespace === undefined ? XML.ignoreWhitespace : value.ignoreWhitespace);
			XML.prettyIndent =(( value.prettyIndent === undefined ? XML.prettyIndent : value.prettyIndent) >> 0);
			XML.prettyPrinting =Boolean( value.prettyPrinting === undefined ? XML.prettyPrinting : value.prettyPrinting);
		}
		
		/**
		 * [static] Retrieves the following properties: ignoreComments, ignoreProcessingInstructions, ignoreWhitespace, prettyIndent, and prettyPrinting.
		 * 
		 * @return 
		 * 
		 */
		public static settings():any
		{
			return {
				ignoreComments : XML.ignoreComments,
				ignoreProcessingInstructions : XML.ignoreProcessingInstructions,
				ignoreWhitespace : XML.ignoreWhitespace,
				prettyIndent : XML.prettyIndent,
				prettyPrinting : XML.prettyPrinting
			}
		}
		
		constructor(xml:string = null)
		{
			/**/ xml = as(xml, 'String');
			// _origStr = xml;
			this._children = [];
			if (xml)
			{
				var parser:DOMParser = new DOMParser();
				var errorNS:string;
				try
				{
					// get error namespace. It's different in different browsers.
					errorNS =as( parser.parseFromString('<', 'application/xml').getElementsByTagName("parsererror")[0].namespaceURI, 'String');
				} catch (e) {
					
				e = window.asc.e2e(e);
					
				}
				
				var doc:Document =  strict(parser.parseFromString(xml, "application/xml"), Document);
				
				// check for errors
				var errors:any[] = doc.getElementsByTagNameNS(errorNS, 'parsererror');
				if (errors.length > 0) {
					throw new Error('XML parse error: ' + errors);
				}
				
				var len:number =  (+(doc.childNodes.length));
				for (var i:number = 0; i < len; i++)
				{
					var node:any = doc.childNodes[i];
					if (node.nodeType == 1)
					{
						this._version =as( doc.xmlVersion, 'String');
						this._encoding =as( doc.xmlEncoding, 'String');
						this._name = new QName;
						this._name.prefix =as( node.prefix, 'String');
						this._name.uri =as( node.namespaceURI, 'String');
						this._name.localName =as( node.localName, 'String');
						XML.iterateElement(node, this);
					}
					else
					{
						// Do we record the nodes which are probably processing instructions?
						//						var child:XML = XML.fromNode(node);
						//						addChild(child);
					}
					
				}
				this.normalize();
			}
			//need to deal with errors https://bugzilla.mozilla.org/show_bug.cgi?id=45566
			
			// get rid of nodes we do not want 
			
			//loop through the child nodes and build XML obejcts for each.
			
			Object.defineProperty(this, "0", {
				get: function():any {
					return this.e4x();
				},
				set: function(newValue:any):void {
					// nothing to do
				},
				enumerable: false,
				configurable: true
			});
		}
		
		private _children:any[] = null;
		private _attributes:any[] = [];
		private _processingInstructions:any[] = null;
		private _parent:XML = null;
		private _value:string = null;
		private _version:string = null;
		private _encoding:string = null;
		private _appliedNamespace:Namespace = null;
		private _namespaces:any[] = [];
		private _origStr:string = null;
		
		/**
		 * For System.disposeXML
		 */		
		public dispose ():void
		{
			this._children = [];
			this._attributes = [];
			this._namespaces = [];
		}
		
		/**
		 * @private
		 * 
		 * Similar to appendChild, but accepts all XML types (text, comment, processing-instruction, attribute, or element)
		 *
		 * 	
		 */
		public addChild(child:XML):void
		{
			/**/ child = strict(child, XML);
			if (!child) {
				return;
			}
			
			this.addChildInternal(child);
			this.normalize();
		}
		
		private addChildInternal(child:XML):void
		{
			/**/ child = strict(child, XML);
			if (XML.ignoreWhitespace && child.nodeKind() == 'text' && !child.getValue().replace(/[\n\r\t]/g, '').length) {
				return;
			}
			
			var kind:string = child.nodeKind();
			child.setParent(this);
			
			if (kind == 'attribute')
			{
				if (!this._attributes) {
					this._attributes = [];
				}
				this._attributes.push(child);
			} else {
				this._children.push(child);
			}
			
			this.e4x(kind == 'attribute' ? XML.INDEX_ATTRIBUTES : XML.INDEX_CHILDREN, [ child ]);
		}
		
		
		/**
		 * Adds a namespace to the set of in-scope namespaces for the XML object.
		 *
		 * @param ns
		 * @return 
		 * 	
		 */
		public addNamespace(ns:Namespace):XML
		{
			/**/ ns = strict(ns, Namespace);
			/*
			When the [[AddInScopeNamespace]] method of an XML object x is called with a namespace N, the following steps are taken:
			1. If x.[[Class]] ? {"text", "comment", "processing-instruction", “attribute”}, return
			2. If N.prefix != undefined
			a. If N.prefix == "" and x.[[Name]].uri == "", return
			b. Let match be null
			c. For each ns in x.[[InScopeNamespaces]]
			i. If N.prefix == ns.prefix, let match = ns
			d. If match is not null and match.uri is not equal to N.uri
			i. Remove match from x.[[InScopeNamespaces]]
			e. Let x.[[InScopeNamespaces]] = x.[[InScopeNamespaces]] ? { N }
			f. If x.[[Name]].[[Prefix]] == N.prefix
			i. Let x.[[Name]].prefix = undefined
			g. For each attr in x.[[Attributes]]
			i. If attr.[[Name]].[[Prefix]] == N.prefix, let attr.[[Name]].prefix = undefined
			3. Return
			*/
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
				return this;
			}
			
			if (ns.prefix == null) {
				return this;
			}
			
			if (ns.prefix == "" && this.name().uri == "") {
				return this;
			}
			
			var match:Namespace = null;
			var len:number = this._namespaces.length;
			for (var i:number = 0; i < len; i++)
			{
				var ns:Namespace =  strict(this._namespaces[i], Namespace);
				if (ns.prefix == ns.prefix)
				{
					match = ns;
					break;
				}
			}
			if (match) {
				this._namespaces[i] = ns;
			} else {
				this._namespaces.push(ns);
			}
			
			if (ns.prefix == this.name().prefix) {
				this.name().prefix = null;
			}
			
			len = this._attributes.length;
			for (i = 0; i < len; i++)
			{
				var name:any = this._attributes[i].name();
				if (name.prefix == ns.prefix) {
					name.prefix = null;
				}
			}
			
			return this;
		}
		
		/**
		 * Appends the given child to the end of the XML object's properties.
		 *
		 * @param child
		 * @return 
		 * 
		 */
		public appendChild(child:any):XML
		{
			/*
			[[Insert]] (P, V)
			1. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return
			2. Let i = ToUint32(P)
			3. If (ToString(i) is not equal to P), throw a TypeError exception
			4. If Type(V) is XML and (V is x or an ancestor of x) throw an Error exception
			5. Let n = 1
			6. If Type(V) is XMLList, let n = V.[[Length]]
			7. If n == 0, Return
			8. For j = x.[[Length]]-1 downto i, rename property ToString(j) of x to ToString(j + n)
			9. Let x.[[Length]] = x.[[Length]] + n
			10. If Type(V) is XMLList
			a. For j = 0 to V.[[Length-1]]
			i. V[j].[[Parent]] = x
			ii. x[i + j] = V[j]
			11. Else
			a. Call the [[Replace]] method of x with arguments i and V
			12. Return
			*/
			if (!(is(child , 'Object')))
			{
				child = child.toString();
				var xml:XML = new XML;
				xml.setNodeKind("text");
				xml.setValue(child);
				child = xml;
			}
			
			if (is(child , XMLList)) {
				child = child[0];
			}

			child.setParent(this);
			this._children.push(child);
			this.normalize();
			this.e4x(XML.INDEX_CHILDREN, [ child ]);
			return child;
		}
		
		/**
		 * ECMAScript for XML
		 */		
		public e4x (flags:number = 7 /*0x0001 | 0x0002 | 0x0004*/, targets:any[] = null):any
		{
			/**/ flags = ((flags) >>> 0); targets = strict(targets, Array);
			if (XML.ignoreECMAScriptForXML) {
				return this;
			}
			return XML.__index(this, flags, targets);
		}
		
		/**
		 * Filter function 
		 */
		public filter(callback:Function):XML
		{
			if (callback(this.e4x())) {
				return this;
			}
			return new XML;
		}
		
		/**
		 * Returns the XML value of the attribute that has the name matching the attributeName parameter.
		 *
		 * @param attributeName
		 * @return 
		 * 
		 */
		public attribute(attributeName:any):XMLList
		{
			var i:number = 0;
			if (attributeName == '*') {
				return this.attributes();
			}
			
			attributeName = this.toAttributeName(attributeName);
			this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
			var list:XMLList = new XMLList;
			var len:number = this._attributes.length;
			for (i = 0; i < len; i++) {
				var a = this._attributes[i];
				if (a.name().matches(attributeName)) {
					list.append(a);
				}
			}
			
			list.targetObject = this;
			list.targetProperty = attributeName;
			return list;
		}
		
		/**
		 * Returns a list of attribute values for the given XML object.
		 *
		 * @return 
		 * 
		 */
		public attributes():XMLList
		{
			this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
			var list:XMLList = new XMLList;
			var len:number = this._attributes.length;
			for (var i:number = 0; i < len; i++) {
				list.append(this._attributes[i]);
			}
			
			list.targetObject = this;
			return list;
		}
		
		/**
		 * Lists the children of an XML object.
		 *
		 * @param propertyName
		 * @return 
		 * 
		 */
		public child(propertyName:any):XMLList
		{
			/*
			* 
			When the [[Get]] method of an XML object x is called with property name P, the following steps are taken:
			1. If ToString(ToUint32(P)) == P
			a. Let list = ToXMLList(x)
			b. Return the result of calling the [[Get]] method of list with argument P
			2. Let n = ToXMLName(P)
			3. Let list be a new XMLList with list.[[TargetObject]] = x and list.[[TargetProperty]] = n
			4. If Type(n) is AttributeName
			a. For each a in x.[[Attributes]]
			i. If ((n.[[Name]].localName == "*") or (n.[[Name]].localName == a.[[Name]].localName)) and ((n.[[Name]].uri == null) or (n.[[Name]].uri == a.[[Name]].uri))
			1. Call the [[Append]] method of list with argument a
			b. Return list
			5. For (k = 0 to x.[[Length]]-1)
			a. If ((n.localName == "*") or ((x[k].[[Class]] == "element") and (x[k].[[Name]].localName == n.localName))) and ((n.uri == null) or ((x[k].[[Class]] == “element”) and (n.uri == x[k].[[Name]].uri)))
			i. Call the [[Append]] method of list with argument x[k]
			6. Return list
			*/
			var i:number = 0, len:number = 0;
			var list:XMLList = new XMLList;
			if ((((propertyName ) >> 0)).toString() == propertyName)
			{
				if (propertyName != "0") {
					return null;
				}
				list.append(this);
				list.targetObject = this;
				return list.e4x();
			}
			propertyName = this.toXMLName(propertyName);
			if (propertyName.isAttribute)
			{
				this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
				len = this._attributes.length;
				for (i = 0; i < len; i++)
				{
					var a = this._attributes[i];
					if (propertyName.matches(a.name())) {
						list.append(a);
					}
				}
			}
			else
			{
				len = this._children.length;
				for (i = 0; i < len; i++)
				{
					var c = this._children[i];
					if (propertyName.matches(c.name())) {
						list.append(c);
					}
				}
			}
			
			list.targetObject = this;
			list.targetProperty = propertyName;
			return list.e4x();
		}
		
		/**
		 * Identifies the zero-indexed position of this XML object within the context of its parent.
		 *
		 * @return 
		 * 
		 */
		public childIndex():number
		{
			if (!this._parent) {
				return -1;
			}
			
			return this._parent.getIndexOf(this);
		}
		
		/**
		 * Lists the children of the XML object in the sequence in which they appear.
		 *
		 * @return 
		 * 
		 */
		public children():XMLList
		{
			var list:XMLList = new XMLList;
			var len:number = this._children.length;
			for (var i:number = 0; i < len; i++) {
				list.append(this._children[i]);
			}
			
			list.targetObject = this;
			return list.e4x();
		}
		
		/**
		 * Lists the properties of the XML object that contain XML comments.
		 *
		 * @return 
		 * 
		 */
		public comments():XMLList
		{
			var list:XMLList = new XMLList;
			var len:number = this._children.length;
			for (var i:number = 0; i < len; i++)
			{
				var c = this._children[i];
				if (c.nodeKind() == "comment") {
					list.append(c);
				}
			}
			
			list.targetObject = this;
			return list;
		}
		
		public concat(list:any):XMLList
		{
			if (is(list , XML))
			{
				var newList:XMLList = new XMLList;
				newList.append(list);
				list = newList;
			}
			
			if (!(is(list , XMLList))) {
				throw new TypeError("invalid type");
			}
			
			var retVal:XMLList = new XMLList;
			retVal.append(this);
			var item:XML;
			var __for0 = window.asc.of(list);
			for  (item of __for0) {
				retVal.append(item);
			}
			
			return retVal.e4x();
		}
		
		/**
		 * Compares the XML object against the given value parameter.
		 *
		 * @param value
		 * @return 
		 * 
		 */
		public contains(value:any):boolean
		{
			if (is(value , XML) || is(value , XMLList)) {
				return this.equals(value);
			}
			return value == this;
		}
		
		/**
		 * Returns a copy of the given XML object.
		 * 
		 * @return 
		 * 
		 */
		public copy():XML
		{
			/*
			When the [[DeepCopy]] method of an XML object x is called, the following steps are taken:
			1. Let y be a new XML object with y.[[Prototype]] = x.[[Prototype]], y.[[Class]] = x.[[Class]], y.[[Value]] = x.[[Value]], y.[[Name]] = x.[[Name]], y.[[Length]] = x.[[Length]]
			2. For each ns in x.[[InScopeNamespaces]]
			a. Let ns2 be a new Namespace created as if by calling the constructor new Namespace(ns)
				  b. Let y.[[InScopeNamespaces]] = y.[[InScopeNamespaces]] ? { ns2 }
			3. Let y.[[Parent]] = null
			4. For each a in x.[[Attributes]]
			a. Let b be the result of calling the [[DeepCopy]] method of a
			b. Let b.[[Parent]] = y
				  c. Let y.[[Attributes]] = y.[[Attributes]] ? { b }
			5. For i = 0 to x.[[Length]]-1
			a. Let c be the result of calling the [[DeepCopy]] method of x[i]
			b. Let y[i] = c
			c. Let c.[[Parent]] = y
			6. Return y
			*/
			var xml:XML = new XML;
			xml.setNodeKind(this._nodeKind);
			xml.setName(this.name());
			xml.setValue(this._value);
			var i:number = 0, len:number = this._namespaces.length;
			for (i = 0; i < len; i++) {
				xml.addNamespace(new Namespace(this._namespaces[i]));
			}
			
			//parent should be null by default
			this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
			len = this._attributes.length;
			for (i = 0; i < len; i++) {
				xml.addChildInternal(this._attributes[i].copy());
			}
			
			len = this._children.length;
			for (i = 0; i < len; i++) {
				xml.addChildInternal(this._children[i].copy());
			}
			
			return xml.e4x(XML.INDEX_ATTRIBUTES | XML.INDEX_CHILDREN);
		}
		
		private deleteChildAt(idx:number):void
		{
			/**/ idx = ((idx) >> 0);
			if (idx < 0) {
				return;
			}
			
			if (idx >= this._children.length) {
				return;
			}
			
			var child:XML =  strict(this._children[idx], XML);
			child.setParent(null);
			this._children.splice(idx, 1);
		}
		
		/**
		 * Returns all descendants (children, grandchildren, great-grandchildren, and so on) of the XML object that have the given name parameter.
		 * 
		 * @param name
		 * @return 
		 * 
		 */
		public descendants(name:any = "*"):XMLList
		{
			/*
			When the [[Descendants]] method of an XML object x is called with property name P, the following steps are taken:
			1. Let n = ToXMLName(P)
			2. Let list be a new XMLList with list.[[TargetObject]] = null
			3. If Type(n) is AttributeName
			a. For each a in x.[[Attributes]]
			i. If ((n.[[Name]].localName == "*") or (n.[[Name]].localName == a.[[Name]].localName)) and ((n.[[Name]].uri == null) or (n.[[Name]].uri == a.[[Name]].uri ))
			1. Call the [[Append]] method of list with argument a
			4. For (k = 0 to x.[[Length]]-1)
			a. If ((n.localName == "*") or ((x[k].[[Class]] == "element") and (x[k].[[Name]].localName == n.localName))) and ((n.uri == null) or ((x[k].[[Class]] == "element") and (n.uri == x[k].[[Name]].uri)))
			i. Call the [[Append]] method of list with argument x[k]
			b. Let dq be the resultsof calling the [[Descendants]] method of x[k] with argument P
			c. If dq.[[Length]] > 0, call the [[Append]] method of list with argument dq
			5. Return list
			*/
			var i:number = 0, len:number = 0;
			if (!name) {
				name = "*";
			}
			name = this.toXMLName(name);
			var list:XMLList = new XMLList;
			if (name.isAttribute)
			{
				this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
				len = this._attributes.length;
				for (i = 0; i < len; i++)
				{
					var a = this._attributes[i];
					if (name.matches(a.name())) {
						list.append(a);
					}
				}
			}
			
			len = this._children.length;
			for (i = 0; i < len; i++)
			{
				var c = this._children[i];
				if (c.nodeKind() == "element") {
					if (name.matches(c.name())) {
						list.append(c);
					}
					list.concat(c.descendants(name));
				}
			}
			
			return list.e4x();
		}
		
		/**
		 * Lists the elements of an XML object. (handles E4X dot notation)
		 * 
		 * @param name
		 * @return 
		 * 
		 */
		public elements(name:any = "*"):XMLList
		{
			if (!name) {
				name = "*";
			}
			name = this.toXMLName(name);
			var list:XMLList = new XMLList;
			var len:number = this._children.length;
			for (var i:number = 0; i < len; i++)
			{
				var child:any = this._children[i];
				if (child.nodeKind() == 'element' && name.matches(child.name())) {
					list.append(child);
				}
			}
			
			list.targetObject = this;
			list.targetProperty = name;
			return list.e4x();
		}
		
		public equals(xml:any):boolean
		{
			/*
			When the [[Equals]] method of an XML object x is called with value V, the following steps are taken:
			1. If Type(V) is not XML, return false
			2. If x.[[Class]] is not equal to V.[[Class]], return false
			3. If x.[[Name]] is not null
			a. If V.[[Name]] is null, return false
			b. If x.[[Name]].localName is not equal to V.[[Name]].localName, return false
			c. If x.[[Name]].uri is not equal to V.[[Name]].uri, return false
			4. Else if V.[[Name]] is not null, return false
			5. If x.[[Attributes]] does not contain the same number of items as V.[[Attributes]], return false
			6. If x.[[Length]] is not equal to V.[[Length]], return false
			7. If x.[[Value]] is not equal to y[[Value]], return false
			8. For each a in x.[[Attributes]]
			a. If V.[[Attributes]] does not contain an attribute b, such that b.[[Name]].localName == a.[[Name]].localName, b.[[Name]].uri == a.[[Name]].uri and b.[[Value]] == a.[[Value]], return false
			9. For i = 0 to x.[[Length]]-1
			a. Let r be the result of calling the [[Equals]] method of x[i] with argument V[i]
			b. If r == false, return false
			10. Return true
			*/
			var i:number = 0, len:number = 0;
			if (!(is(xml , XML)))
				return false;
			
			if (xml.nodeKind() != this._nodeKind)
				return false;
			
			if (!this.name().equals(xml.name()))
				return false;
			
			this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
			
			var selfAttrs:any[] = this.getAttributeArray();
			var xmlAttrs:any[] =  strict(xml.getAttributeArray(), Array);
			if (selfAttrs.length != xmlAttrs.length)
				return false;
			
			//length comparison should not be necessary because xml always has a length of 1
			if (this.getValue() != xml.getValue())
				return false;
			
			len = selfAttrs.length;
			for (i = 0; i < len; i++)
			{
				if (!xml.hasAttribute(selfAttrs[i])) {
					return false;
				}
			}
			
			var selfChldrn:any[] = this.getChildrenArray();
			var xmlChildren:any[] =  strict(xml.getChildrenArray(), Array);
			if (selfChldrn.length != xmlChildren.length)
				return false;
			
			len = selfChldrn.length;
			for (i = 0; i < len; i++)
			{
				if (!selfChldrn[i].equals(xmlChildren[i])) {
					return false;
				}
			}
			
			return true;
		}
		
		public hasAttribute(nameOrXML:any,value:string=null):boolean
		{
			/**/ value = as(value, 'String');
			if (!this._attributes) {
				return false;
			}
			var name:QName;
			if (is(nameOrXML , XML))
			{
				name =strict( nameOrXML.name(), QName);
				value =as( nameOrXML.getValue(), 'String');
			}
			else
			{
				name = new QName(nameOrXML);
			}
			this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
			var len:number = this._attributes.length;
			for (var i:number = 0; i < len; i++)
			{
				var a = this._attributes[i];
				if (name.matches(a.name()))
				{
					if (!value) {
						return true;
					}
					return value == a.getValue();
				}
			}
			return false;
		}
		
		private getAncestorNamespaces(namespaces:any[]):any[]
		{
			/**/ namespaces = strict(namespaces, Array);
			//don't modify original
			namespaces = namespaces.slice();
			var nsIdx:number = 0;
			var pIdx:number = 0;
			if (this._parent)
			{
				var parentNS:any[] = this._parent.inScopeNamespaces();
				var len:number =  ((parentNS.length) >> 0);
				for (pIdx = 0; pIdx < len; pIdx++)
				{
					var curNS:Namespace =  strict(parentNS[pIdx], Namespace);
					var doInsert:boolean = true;
					var nsLen:number = namespaces.length;
					for (nsIdx = 0; nsIdx < nsLen; nsIdx++)
					{
						var ns:Namespace =  strict(namespaces[nsIdx], Namespace);
						if (curNS.uri == ns.uri && curNS.prefix == ns.prefix)
						{
							doInsert = false;
							break;
						}
					}
					if (doInsert) {
						namespaces.push(curNS);
					}
				}
				namespaces = this._parent.getAncestorNamespaces(namespaces);
			}
			return namespaces;
		}
		
		public getAttributeArray():any[]
		{
			return this._attributes ? this._attributes.slice() : [];
		}
		
		public getChildrenArray():any[]
		{
			return this._children ? this._children.slice() : [];
		}
		
		public getIndexOf(elem:XML):number
		{
			/**/ elem = strict(elem, XML);
			return this._children.indexOf(elem);
		}
		
		private getURI(prefix:string):string
		{
			/**/ prefix = as(prefix, 'String');
			var namespaces:any[] = this.getAncestorNamespaces(this._namespaces);
			var len:number = namespaces.length;
			for (var i:number = 0; i < len; i++)
			{
				var ns = namespaces[i];
				if (ns.prefix == prefix) {
					return ns.uri;
				}
			}
			return "";
		}
		
		public getValue():string
		{
			return this._value;
		}

		public hasAncestor(obj:any):boolean
		{
			if (!obj) {
				return false;
			}
			
			var parent:XML =  strict(this.parent(), XML);
			while(parent)
			{
				if (obj == parent) {
					return true;
				}
				parent = parent.parent();
			}
			return false;
		}
		
		/**
		 * Checks to see whether the XML object contains complex content.
		 * 
		 * @return 
		 * 
		 */
		public hasComplexContent():boolean
		{
			/*
			When the hasComplexContent method is called on an XML object x, the following steps are taken:
			1. If x.[[Class]] ? {"attribute", "comment", "processing-instruction", "text"}, return false
			2. For each property p in x
			a. If p.[[Class]] == "element", return true
			3. Return false
			*/
			if (this._nodeKind == "attribute" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "text") {
				return false;
			}
			
			var len:number = this._children.length;
			for (var i:number = 0; i < len; i++)
			{
				if (this._children[i].nodeKind() == "element") {
					return true;
				}
			}
			
			return false;
		}
		
		/*override*/ public hasOwnProperty(p:any):boolean
		{
			/*
			When the [[HasProperty]] method of an XML object x is called with property name P, the following steps are taken:
			1. If ToString(ToUint32(P)) == P
			a. Return (P == "0")
			2. Let n = ToXMLName(P)
			3. If Type(n) is AttributeName
			a. For each a in x.[[Attributes]]
			i. If ((n.[[Name]].localName == "*") or (n.[[Name]].localName == a.[[Name]].localName)) and ((n.[[Name]].uri == null) or (n.[[Name]].uri == a.[[Name]].uri))
			1. Return true
			b. Return false
			4. For (k = 0 to x.[[Length]]-1)
			a. If ((n.localName == "*") or ((x[k].[[Class]] == "element") and (x[k].[[Name]].localName == n.localName))) and ((n.uri == null) or (x[k].[[Class]] == "element") and (n.uri == x[k].[[Name]].uri)))
			i. Return true
			5. Return false
			*/
			if ((((p ) >> 0)).toString() == p) {
				return p == "0";
			}
			var name:QName = this.toXMLName(p);
			this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
			var i:number = 0, len:number = this._attributes.length;
			for (i = 0; i < len; i++)
			{
				if (this._attributes[i].name().matches(name)) {
					return true;
				}
			}
			
			len = this._children.length;
			for (i = 0; i < len; i++)
			{
				var c = this._children[i];
				if (c.nodeKind() != "element") {
					continue;
				}
				if (c.name().matches(name)) {
					return true;
				}
			}
			
			return false;
		}
		
		/**
		 * Checks to see whether the XML object contains simple content.
		 * 
		 * @return 
		 * 
		 */
		public hasSimpleContent():boolean
		{
			/*
			When the hasSimpleContent method is called on an XML object x, the following steps are taken:
			1. If x.[[Class]] ? {"comment", "processing-instruction"}, return false
			2. For each property p in x
			a. If p.[[Class]] == "element", return false
			3. Return true
			*/
			if (this._nodeKind == "comment" || this._nodeKind == "processing-instruction") {
				return false;
			}
			
			var len:number = this._children.length;
			for (var i:number = 0; i < len; i++)
			{
				if (this._children[i].nodeKind() == "element") {
					return false;
				}
			}
			
			return true;
		}
		
		/**
		 * Lists the namespaces for the XML object, based on the object's parent.
		 * 
		 * @return 
		 * 
		 */
		public inScopeNamespaces():any[]
		{
			return this._namespaces.slice();
		}
		
		private insertChildAt(child:XML,idx:number):void{
			/**/ child = strict(child, XML); idx = ((idx) >> 0);
			/*
			When the [[Insert]] method of an XML object x is called with property name P and value V, the following steps are taken:
			1. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return
			2. Let i = ToUint32(P)
			3. If (ToString(i) is not equal to P), throw a TypeError exception
			4. If Type(V) is XML and (V is x or an ancestor of x) throw an Error exception
			5. Let n = 1
			6. If Type(V) is XMLList, let n = V.[[Length]]
			7. If n == 0, Return
			8. For j = x.[[Length]]-1 downto i, rename property ToString(j) of x to ToString(j + n)
			9. Let x.[[Length]] = x.[[Length]] + n
			10. If Type(V) is XMLList
			a. For j = 0 to V.[[Length-1]]
			i. V[j].[[Parent]] = x
			ii. x[i + j] = V[j]
			11. Else
			a. Call the [[Replace]] method of x with arguments i and V
			12. Return
			*/
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
				return;
			}
			if (!child) {
				return;
			}
			var parent:XML =  strict(child.parent(), XML);
			if (parent) {
				parent.removeChild(child);
			}
			child.setParent(this);
			this._children.splice(idx, 0, child);
			this.e4x(XML.INDEX_CHILDREN, [ child ]);
		}
		/**
		 * Inserts the given child2 parameter after the child1 parameter in this XML object and returns the resulting object.
		 * 
		 * @param child1
		 * @param child2
		 * @return 
		 * 
		 */
		public insertChildAfter(child1:XML, child2:XML):XML
		{
			/**/ child1 = strict(child1, XML); child2 = strict(child2, XML);
			/*
			When the insertChildAfter method is called on an XML object x with parameters child1 and child2, the following steps are taken:
			1. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return
			2. If (child1 == null)
			a. Call the [[Insert]] method of x with arguments "0" and child2
			b. Return x
			3. Else if Type(child1) is XML
			a. For i = 0 to x.[[Length]]-1
			i. If x[i] is the same object as child1
			1. Call the [[Insert]] method of x with a
			*/
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
				return null;
			}
			if (!child1) {
				this.insertChildAt(child2, 0);
				return child2;
			}
			var idx:number = this._children.indexOf(child1);
			if (idx >= 0) {
				this.insertChildAt(child2, idx+1);
			}
			return child2;
		}
		
		/**
		 * Inserts the given child2 parameter before the child1 parameter in this XML object and returns the resulting object.
		 * 
		 * @param child1
		 * @param child2
		 * @return 
		 * 
		 */
		public insertChildBefore(child1:XML, child2:XML):XML
		{
			/**/ child1 = strict(child1, XML); child2 = strict(child2, XML);
			/*
			When the insertChildBefore method is called on an XML object x with parameters child1 and child2, the following steps are taken:
			1. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return
			2. If (child1 == null)
			a. Call the [[Insert]] method of x with arguments ToString(x.[[Length]]) and child2
			b. Return x
			3. Else if Type(child1) is XML
			a. For i = 0 to x.[[Length]]-1
			i. If x[i] is the same object as child1
			1. Call the [[Insert]] method of x with arguments ToString(i) and child2
			2. Return x
			4. Return			
			*/
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
				return null;
			}
			if (!child1) {
				this.insertChildAt(child2, this._children.length);
				return child2;
			}
			var idx:number = this._children.indexOf(child1);
			if (idx >= 0) {
				this.insertChildAt(child2, idx);
			}
			return child2;
		}
		
		/**
		 * For XML objects, this method always returns the integer 1.
		 * 
		 * @return 
		 * 
		 */
		public length():number
		{
			return 1;
		}
		
		/**
		 * Gives the local name portion of the qualified name of the XML object.
		 * 
		 * @return 
		 * 
		 */
		public localName():any
		{
			return this.name().localName;
		}
		
		private _name:QName = null;
		
		/**
		 * Gives the qualified name for the XML object.
		 * 
		 * @return 
		 * 
		 */
		public name():any
		{
			if (!this._name) {
				this._name = new QName;
			}
			return this._name;
		}
		
		/**
		 * If no parameter is provided, gives the namespace associated with the qualified name of this XML object.
		 * 
		 * @param prefix
		 * @return 
		 * 
		 */
		public namespace(prefix:string = null):any
		{
			/**/ prefix = as(prefix, 'String');
			/*
			When the namespace method is called on an XML object x with zero arguments or one argument prefix, the following steps are taken:
			1. Let y = x
			2. Let inScopeNS = { }
			3. While (y is not null)
			a. For each ns in y.[[InScopeNamespaces]]
			i. If there exists no n ? inScopeNS, such that n.prefix == ns.prefix
				      1. Let inScopeNS = inScopeNS ? { ns }
			b. Let y = y.[[Parent]]
			4. If prefix was not specified
			a. If x.[[Class]] ? {"text", "comment", "processing-instruction"}, return null
			b. Return the result of calling the [[GetNamespace]] method of x.[[Name]] with argument inScopeNS
			5. Else
			a. Let prefix = ToString(prefix)
			b. Find a Namespace ns ? inScopeNS, such that ns.prefix = prefix. If no such ns exists, let ns = undefined.
			c. Return ns
			*/
			if (prefix)
			{
				var len:number = this._namespaces.length;
				for (var i:number = 0; i < len; i++)
				{
					var ns:Namespace =  strict(this._namespaces[i], Namespace);
					if (ns.prefix == prefix) {
						return ns;
					}
				}
				if (this._parent) {
					return this._parent.namespace(prefix);
				}
				return null;
			}
			//no prefix. get the namespace of our object
			if (this._nodeKind == "text" || this._nodeKind ==  "comment" || this._nodeKind ==  "processing-instruction") {
				return null;
			}
			return this.name().getNamespace(this.namespaceDeclarations());
		}
		
		/**
		 * Lists namespace declarations associated with the XML object in the context of its parent.
		 * 
		 * @return 
		 * 
		 */
		public namespaceDeclarations():any[]
		{
			/*
			When the namespaceDeclarations method is called on an XML object x, the following steps are taken:
			1. Let a be a new Array created as if by calling the constructor, new Array()
			2. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return a
			3. Let y = x.[[Parent]]
			4. Let ancestorNS = { }
			5. While (y is not null)
			a. For each ns in y.[[InScopeNamespaces]]
			i. If there exists no n ? ancestorNS, such that n.prefix == ns.prefix
				      1. Let ancestorNS = ancestorNS ? { ns }
			b. Let y = y.[[Parent]]
			6. Let declaredNS = { }
			7. For each ns in x.[[InScopeNamespaces]]
			a. If there exists no n ? ancestorNS, such that n.prefix == ns.prefix and n.uri == ns.uri
				    i. Let declaredNS = declaredNS ? { ns }
			8. Let i = 0
			9. For each ns in declaredNS
			a. Call the [[Put]] method of a with arguments ToString(i) and ns
			b. Let i = i + 1
			10. Return a
			*/
			var i:number = 0;
			var retVal:any[] = [];
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind ==  "attribute") {
				return retVal;
			}
			var declaredNS:any[] = this._namespaces.slice();
			var parent:XML = this._parent;
			while (parent)
			{
				var parentNS:any[] = parent.inScopeNamespaces();
				var idx:number = 0, pIdx:number = 0;
				var pNsLen:number = parentNS.length;
				for (pIdx = 0; i < pNsLen; pIdx++)
				{
					var uri:string =  as(parentNS[pIdx].uri, 'String');
					var prefix:string =  as(parentNS[pIdx].prefix, 'String');
					var decLen:number = declaredNS.length;
					for (idx = 0; i < decLen; idx++)
					{
						if (declaredNS[idx].uri == uri && declaredNS[idx].prefix == prefix)
						{
							declaredNS.push(parentNS[pIdx]);
							break;
						}
					}
				}
				parent = parent.parent();
			}
			
			return declaredNS;
		}
		
		private _nodeKind:string = "element";
		/**
		 * Specifies the type of node: text, comment, processing-instruction, attribute, or element.
		 * @return 
		 * 
		 */
		public nodeKind():string
		{
			return this._nodeKind;
		}
		
		/**
		 * For the XML object and all descendant XML objects, merges adjacent text nodes and eliminates empty text nodes.
		 * 
		 * @return 
		 * 
		 */
		public normalize():XML
		{
			var lastChild:XML;
			var len:number =  ((this._children.length-1) >> 0);
			for(var i:number = len; i >= 0; i--)
			{
				var child:XML =  strict(this._children[i], XML);
				// can we have a null child?
				
				if (child.nodeKind() == "element") {
					child.normalize();
				} else if(child.nodeKind() == "text") {
					if (lastChild && lastChild.nodeKind() == "text")
					{
						child.setValue(child.text() + lastChild.text());
						this.deleteChildAt(i+1);
					}
					if (!child.text()) {
						this.deleteChildAt(i);
					}
				}
				lastChild = child;
			}
			return this;
		}
		
		/**
		 * Returns the parent of the XML object.
		 * 
		 * @return 
		 * 
		 */
		public parent():any
		{
			return this._parent;
		}
		
		public plus(rightHand:any):any
		{
			var list:XMLList = new XMLList;
			list.append(this);
			return list.plus(rightHand);
		}
		
		/**
		 * Inserts the provided child object into the XML element before any existing XML properties for that element.
		 * @param value
		 * @return 
		 * 
		 */
		public prependChild(child:XML):XML
		{
			/**/ child = strict(child, XML);
			child.setParent(this);
			this._children.unshift(child);
			this.e4x(XML.INDEX_CHILDREN, [ child ]);
			return child;
		}
		
		/**
		 * If a name parameter is provided, lists all the children of the XML object that contain processing instructions with that name.
		 * 
		 * @param name
		 * @return 
		 * 
		 */
		public processingInstructions(name:string = "*"):XMLList
		{
			/**/ name = as(name, 'String');
			var list:XMLList = new XMLList;
			var len:number = this._children.length;
			for (var i:number = 0; i < len; i++)
			{
				var c = this._children[i];
				if (c.nodeKind() == "processing-instruction") {
					list.append(c);
				}
			}
			
			list.targetObject = this;
			return list;
		}
		
		/**
		 * Removes the given chid for this object and returns the removed child.
		 * 
		 * @param child
		 * @return 
		 * 
		 */
		public removeChild(child:XML):boolean
		{
			/**/ child = strict(child, XML);
			/*
			When the [[Delete]] method of an XML object x is called with property name P, the following steps are taken:
			1. If ToString(ToUint32(P)) == P, throw a TypeError exception
			NOTE this operation is reserved for future versions of E4X.
			2. Let n = ToXMLName(P)
			3. If Type(n) is AttributeName
			a. For each a in x.[[Attributes]]
			i. If ((n.[[Name]].localName == "*") or (n.[[Name]].localName == a.[[Name]].localName)) and ((n.[[Name]].uri == null) or (n.[[Name]].uri == a.[[Name]].uri))
			1. Let a.[[Parent]] = null
			2. Remove the attribute a from x.[[Attributes]]
			b. Return true
			4. Let dp = 0
			5. For q = 0 to x.[[Length]]-1
			a. If ((n.localName == "*") or (x[q].[[Class]] == "element" and x[q].[[Name]].localName == n.localName)) and ((n.uri == null) or (x[q].[[Class]] == “element” and n.uri == x[q].[[Name]].uri ))
			i. Let x[q].[[Parent]] = null
			ii. Remove the property with the name ToString(q) from x
			iii. Let dp = dp + 1
			b. Else
			i. If dp > 0, rename property ToString(q) of x to ToString(q – dp)
			6. Let x.[[Length]] = x.[[Length]] - dp
			7. Return true.
			*/
			var removed:XML;
			if (!child) {
				return false;
			}
			
			if (!this._attributes) {
				return false;
			}
			
			if (!(is(child , XML))) {
				return this.removeChildByName(child);
			}
			
			if (child.nodeKind() == "attribute")
			{
				var len:number = this._attributes.length;
				for (var i:number = 0; i < len; i++)
				{
					var a = this._attributes[i];
					if (child.equals(a))
					{
						removed = a;
						removed.setParent(null);
						this._attributes.splice(i, 1);
						return true;
					}
				}
			}
			
			var idx:number = this._children.indexOf(child);
			if (idx < 0) {
				return false;
			}
			
			removed = this._children.splice(idx,1);
			child.setParent(null);
			return removed;
		}
		
		private removeChildByName(name:any):boolean
		{
			var i:number = 0;
			name = this.toXMLName(name);
			var child:XML = null;
			var removedItem:boolean = false;
			if (name.isAttribute)
			{
				if (!this._attributes) {
					return false;
				}
				
				for (i = this._attributes.length-1; i >= 0; i--)
				{
					var a = this._attributes[i];
					if (a.name().matches(name))
					{
						child = a;
						child.setParent(null);
						this._attributes.splice(i, 1);
						removedItem = true;
					}
				}
				return removedItem;
			}
			
			//QUESTION am I handling non-elements correctly?
			if (!this._children) {
				return false;
			}
			
			for (i = this._children.length-1; i >= 0; i--)
			{
				var c = this._children[i];
				if (c.name().matches(name))
				{
					child = c;
					child.setParent(null);
					this._children.splice(i, 1);
					removedItem = true;
				}
			}
			
			return removedItem;
		}
		
		public removeChildAt(index:number):void
		{
			/**/ index = ((index) >> 0);
			/*
			When the [[DeleteByIndex]] method of an XML object x is called with property name P, the following steps are taken:
			1. Let i = ToUint32(P)
			2. If ToString(i) == P
			a. If i is less than x.[[Length]]
			i. If x has a property with name P
			1. Let x[P].[[Parent]] = null
			2. Remove the property with the name P from x
			ii. For q = i+1 to x.[[Length]]-1
			1. Rename property ToString(q) of x to ToString(q – 1)
			iii. Let x.[[Length]] = x.[[Length]] – 1
			b. Return true
			3. Else throw a TypeError exception
			*/
			//Do nothing for XML objects?
			throw new Error("Cannot call delete on XML");
		}
		
		/**
		 * Removes the given namespace for this object and all descendants.
		 * 
		 * @param ns
		 * @return 
		 * 
		 */
		public removeNamespace(ns:any):XML
		{
			/*
			Overview
			The removeNamespace method removes the given namespace from the in scope namespaces of this object and all its descendents,
			then returns a copy of this XML object. The removeNamespaces method will not remove a namespace from an object where it is referenced
			by that object’s QName or the QNames of that object’s attributes.
			Semantics
			When the removeNamespace method is called on an XML object x with parameter namespace, the following steps are taken:
			1. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return x
			2. Let ns be a Namespace object created as if by calling the function Namespace( namespace )
			3. Let thisNS be the result of calling [[GetNamespace]] on x.[[Name]] with argument x.[[InScopeNamespaces]]
			4. If (thisNS == ns), return x
			5. For each a in x.[[Attributes]]
			a. Let aNS be the result of calling [[GetNamespace]] on a.[[Name]] with argument x.[[InScopeNamespaces]]
			b. If (aNS == ns), return x
			6. If ns.prefix == undefined
			a. If there exists a namespace n ? x.[[InScopeNamespaces]], such that n.uri == ns.uri, remove the namespace n from x.[[InScopeNamespaces]]
			7. Else
			a. If there exists a namespace n ? x.[[InScopeNamespaces]], such that n.uri == ns.uri and n.prefix == ns.prefix, remove the namespace n from x.[[InScopeNamespaces]]
			8. For each property p of x
			a. If p.[[Class]] = "element", call the removeNamespace method of p with argument ns
			9. Return x
			*/
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind == "attribute") {
				return this;
			}
			
			if (!(is(ns , Namespace))) {
				ns = new Namespace(ns);
			}
			
			if (ns == this.name().getNamespace(this._namespaces)) {
				return this;
			}
			
			var i:number = 0, len:number = this._attributes.length;
			for (i = 0; i < len; i++)
			{
				if (ns == this._attributes[i].name().getNamespace(this._namespaces)) {
					return this;
				}
			}
			
			for (i = this._namespaces.length-1; i >= 0; i--)
			{
				if (this._namespaces[i].uri == ns.uri && this._namespaces[i].prefix == ns.prefix) {
					this._namespaces.splice(i,1);
				} else if (ns.prefix == null && this._namespaces[i].uri == ns.uri) {
					this._namespaces.splice(i,1);
				}
			}
			
			len = this._children.length;
			for (i = 0; i < len; i++)
			{
				var c =this._children[i];
				if (c.nodeKind() == "element") {
					c.removeNamespace(ns);
				}
			}
			
			return this;
		}
		
		/**
		 * Replaces the properties specified by the propertyName parameter with the given value parameter.
		 * 
		 * @param propertyName
		 * @param value
		 * @return 
		 * 
		 */
		public replace(propertyName:any, value:any):any
		{
			/*
			Semantics
			When the replace method is called on an XML object x with parameters propertyName and value, the following steps are taken:
			1. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return x
				2. If Type(value) ? {XML, XMLList}, let c = ToString(value)
			3. Else let c be the result of calling the [[DeepCopy]] method of value
			4. If ToString(ToUint32(P)) == P
			a. Call the [[Replace]] method of x with arguments P and c and return x
			5. Let n be a QName object created as if by calling the function QName(P)
			6. Let i = undefined
			7. For k = x.[[Length]]-1 downto 0
			a. If ((n.localName == "*") or ((x[k].[[Class]] == "element") and (x[k].[[Name]].localName==n.localName))) and ((n.uri == null) or ((x[k].[[Class]] == "element") and (n.uri == x[k].[[Name]].uri )))
			i. If (i is not undefined), call the [[DeleteByIndex]] method of x with argument ToString(i)
			ii. Let i = k
			8. If i == undefined, return x
			9. Call the [[Replace]] method of x with arguments ToString(i) and c
			10. Return x			
			*/
		
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind ==  "attribute") {
				// Changing this to pretend we're a string
				return this.s().replace(propertyName, value);
				//return this;
			}
			
			if (value === null || value === undefined) {
				return this;
			}
			
			if (is(value , XML) || is(value , XMLList)) {
				value = value.copy();
			} else {
				value = value.toString();
			}
			
			return null;
		}
		
		public replaceChildAt(idx:number,v:any):void
		{
			/**/ idx = ((idx) >> 0);
			/*
			When the [[Replace]] method of an XML object x is called with property name P and value V, the following steps are taken:
			1. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return
			2. Let i = ToUint32(P)
			3. If (ToString(i) is not equal to P), throw a TypeError exception
			4. If i is greater than or equal to x.[[Length]],
			a. Let P = ToString(x.[[Length]])
			b. Let x.[[Length]] = x.[[Length]] + 1
			5. If Type(V) is XML and V.[[Class]] ? {"element", "comment", "processing-instruction", "text"}
			a. If V.[[Class]] is “element” and (V is x or an ancestor of x) throw an Error exception
			b. Let V.[[Parent]] = x
			c. If x has a property with name P
			i. Let x[P].[[Parent]] = null
			d. Let x[P] = V
			6. Else if Type(V) is XMLList
			a. Call the [[DeleteByIndex]] method of x with argument P
			b. Call the [[Insert]] method of x with arguments P and V
			7. Else
			a. Let s = ToString(V)
			b. Create a new XML object t with t.[[Class]] = "text", t.[[Parent]] = x and t.[[Value]] = s
			c. If x has a property with name P
			i. Let x[P].[[Parent]] = null
			d. Let the value of property P of x be t
			8. Return
			*/
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction" || this._nodeKind ==  "attribute") {
				return;
			}
			
			if (idx > this._children.length) {
				idx =(( this._children.length) >> 0);
			}
			
			if (is(v , XML) && v.nodeKind() != "attribute")
			{
				if (v.nodeKind() == "element" && (v==this || this.isAncestor(v)) ) {
					throw new TypeError("cannot assign parent xml as child");
				}
				v.setParent(this);
				if (this._children[idx]) {
					this.removeChild(this._children[idx]);
				}
				this.insertChildAt(v,idx);
			}
			else if(is(v , XMLList))
			{
				//6.
				if (this._children[idx]) {
					this._children[idx].setParent(null);
				}
				
				var len:number =  ((v.length()) >> 0);
				v[0].setParent(this);
				this._children[idx] = v[0];
				var listIdx:number = 1;
				var chld:XML =  strict(v[0], XML);
				while (listIdx < len)
				{
					chld = v[listIdx];
					this.insertChildAt(chld, idx+listIdx);
					listIdx++;
				}
			}
			else
			{
				//7. attribute?
			}
		}
		
		private isAncestor(xml:XML):boolean
		{
			/**/ xml = strict(xml, XML);
			var p:XML =  strict(this.parent(), XML);
			while (p)
			{
				if (p == xml) {
					return true;
				}
				p = p.parent();
			}
			return false;
		}
		
		public setAttribute(attr:any, value:string):void
		{
			/**/ value = as(value, 'String');
			var i:number = 0, len:number = 0, a;
			if (!this._attributes) {
				this._attributes = [];
			}
			
			if (is(attr , XML))
			{
				if (attr.nodeKind() == "attribute")
				{
					len = this._attributes.length;
					for (i = 0; i < len; i++)
					{
						a = this._attributes[i];
						if (a.name().equals(attr.name()))
						{
							a.setValue(value);
							return;
						}
						//addChild(_att)
					}
					if (value) {
						attr.setValue(value);
					}
					this.addChild(attr);
				}
				return;
			}
			if (attr.indexOf("xmlns") == 0)
			{
				//it's a namespace declaration
				//TODO This does not seem right.
				var ns:Namespace = new Namespace(value.toString());
				if (attr.indexOf("xmlns:") == 0) {// it has a prefix
					ns.prefix =as( attr.split(":")[1], 'String');
				}
				this.addNamespace(ns);
			}
			else
			{
				//it's a regular attribute string
				//TODO use toXMLName or toAttributeName to convert attr and assing it
				var qname:QName = this.toAttributeName(attr);
				var attrXML:XML = new XML;
				attrXML.setNodeKind("attribute");
				attrXML.setName(this.toAttributeName(attr));
				attrXML.setValue(value);
				len = this._attributes.length;
				for (i = 0; i < len; i++)
				{
					a = this._attributes[i];
					if (a.name().equals(attrXML.name()))
					{
						a.setValue(value);
						return;
					}
					//addChild(_att)
				}
				this.addChild(attrXML);
			}
		}
		
		/**
		 * Replaces the child properties of the XML object with the specified name with the specified XML or XMLList.
		 * This is primarily used to support dot notation assignment of XML.
		 * 
		 * @param value
		 * @return 
		 * 
		 */
		public setChild(elementName:any, elements:any):void
		{
			
			/*
			* 
			1. If ToString(ToUint32(P)) == P, throw a TypeError exception NOTE this operation is reserved for future versions of E4X.
			2. If x.[[Class]] ? {"text", "comment", "processing-instruction", "attribute"}, return
			3. If (Type(V) ? {XML, XMLList}) or (V.[[Class]] ? {"text", "attribute"})
			a. Let c = ToString(V)
			4. Else
			a. Let c be the result of calling the [[DeepCopy]] method of V
			5. Let n = ToXMLName(P)
			6. If Type(n) is AttributeName
			a. Call the function isXMLName (section 13.1.2.1) with argument n.[[Name]] and if the result is false, return
			b. If Type(c) is XMLList
			i. If c.[[Length]] == 0, let c be the empty string
			ii. Else
			1. Let s = ToString(c[0])
			2. For i = 1 to c.[[Length]]-1
			a. Let s be the result of concatenating s, the string " " (space) and ToString(c[i])
			3. Let c = s
			c. Else
			i. Let c = ToString(c)
			d. Let a = null
			e. For each j in x.[[Attributes]]
			i. If (n.[[Name]].localName == j.[[Name]].localName) and ((n.[[Name]].uri == null) or (n.[[Name]].uri == j.[[Name]].uri))
			1. If (a == null), a = j
			2. Else call the [[Delete]] method of x with argument j.[[Name]]
			f. If a == null
			i. If n.[[Name]].uri == null
			1. Let nons be a new Namespace created as if by calling the constructor new Namespace()
			2. Let name be a new QName created as if by calling the constructor new QName(nons, n.[[Name]])
			ii. Else
			1. Let name be a new QName created as if by calling the constructor new QName(n.[[Name]])
			iii. Create a new XML object a with a.[[Name]] = name, a.[[Class]] == "attribute" and a.[[Parent]] = x
			    iv. Let x.[[Attributes]] = x.[[Attributes]] ? { a }
			v. Let ns be the result of calling the [[GetNamespace]] method of name with no arguments
			vi. Call the [[AddInScopeNamespace]] method of x with argument ns
			g. Let a.[[Value]] = c
			h. Return
			7. Let isValidName be the result of calling the function isXMLName (section 13.1.2.1) with argument n
			8. If isValidName is false and n.localName is not equal to the string "*", return
			9. Let i = undefined
			10. Let primitiveAssign = (Type(c) ? {XML, XMLList}) and (n.localName is not equal to the string "*")
			11. For (k = x.[[Length]]-1 downto 0)
			a. If ((n.localName == "*") or ((x[k].[[Class]] == "element") and (x[k].[[Name]].localName==n.localName))) and ((n.uri == null) or ((x[k].[[Class]] == “element”) and (n.uri == x[k].[[Name]].uri )))
			i. If (i is not undefined), call the [[DeleteByIndex]] property of x with argument ToString(i)
			ii. Let i = k
			12. If i == undefined
			a. Let i = x.[[Length]]
			b. If (primitiveAssign == true)
			i. If (n.uri == null)
			1. Let name be a new QName created as if by calling the constructor new QName(GetDefaultNamespace(), n)
			ii. Else
			1. Let name be a new QName created as if by calling the constructor new QName(n)
			iii. Create a new XML object y with y.[[Name]] = name, y.[[Class]] = "element" and y.[[Parent]] = x
			iv. Let ns be the result of calling [[GetNamespace]] on name with no arguments
			v. Call the [[Replace]] method of x with arguments ToString(i) and y
			vi. Call [[AddInScopeNamespace]] on y with argument ns
			13. If (primitiveAssign == true)
			a. Delete all the properties of the XML object x[i]
			b. Let s = ToString(c)
			c. If s is not the empty string, call the [[Replace]] method of x[i] with arguments "0" and s
			14. Else
			a. Call the [[Replace]] method of x with arguments ToString(i) and c
			15. Return
			*/
			var i:number = 0;
			var len:number = 0;
			var chld:XML;
			
			if (is(elements , XML))
			{
				var list:XMLList = new XMLList;
				list[0] = elements;
				elements = list;
			}
			
			if (is(elements , XMLList))
			{
				var chldrn:XMLList = this.child(elementName);
				var childIdx:number =  ((this.children().length() -1) >> 0);
				if (chldrn.length()) {
					childIdx =(( chldrn[0].childIndex()-1) >> 0);
				}
				
				len =(( chldrn.length() -1) >> 0);
				for (i = len; i >= 0; i--)
				{
					this.removeChild(chldrn[i]);
					// remove the nodes
					// remove the children
					// adjust the childIndexes
				}
				var curChild:XML =  strict(this._children[childIdx], XML);
				// Now add them in.
				len = elements.length();
				for(i = 0; i < len;i++)
				{
					chld = elements[i];
					if (!curChild)
					{
						if (childIdx < 0)
							curChild = this.prependChild(chld);
						else
							curChild = this.appendChild(chld);
					}
					else {
						curChild = this.insertChildAfter(curChild, chld);
					}
				}
			}
			//what to do if it's not XML or XMLList? Throw an error? Ignore?
			
		}
		
		/**
		 * Replaces the child properties of the XML object with the specified set of XML properties, provided in the value parameter.
		 * 
		 * @param value
		 * @return 
		 * 
		 */
		public setChildren(value:any):XML
		{
			var i:number = 0;
			var len:number = 0;
			var chld:XML;
			if (is(value , XML))
			{
				var list:XMLList = new XMLList;
				list[0] = value;
				value = list;
			}
			
			if (is(value , XMLList))
			{
				// remove all existing elements
				var chldrn:XMLList = this.children();
				var childIdx:number =  ((chldrn.length() -1) >> 0);
				if (chldrn.length()) {
					childIdx =(( chldrn[0].childIndex()) >> 0);
				}
				
				len =(( chldrn.length() -1) >> 0);
				for (i= len; i >= 0;  i--)
				{
					this.removeChild(chldrn[i]);
					// remove the nodes
					// remove the children
					// adjust the childIndexes
				}
				var curChild:XML =  strict(this._children[childIdx], XML);
				// Now add them in.
				len = value.length();
				for(i = 0; i < len; i++)
				{
					chld = value[i];
					if (!curChild)
					{
						curChild = this.appendChild(chld);
					}
					else {
						curChild = this.insertChildAfter(curChild, chld);
					}
				}
			}
			
			return this;
		}
		
		/**
		 * Changes the local name of the XML object to the given name parameter.
		 * 
		 * @param name
		 * 
		 */
		public setLocalName(name:string):void
		{
			/**/ name = as(name, 'String');
			if (!this._name) {
				this._name = new QName();
			}
			this._name.localName = name;
		}
		
		/**
		 * Sets the name of the XML object to the given qualified name or attribute name.
		 * 
		 * @param name
		 * 
		 */
		public setName(name:any):void
		{
			if (is(name , QName)) {
				this._name =strict( name, QName);
			} else {
				this._name = new QName(name);
			}
		}
		
		/**
		 * Sets the namespace associated with the XML object.
		 * 
		 * @param ns
		 * 
		 */
		public setNamespace(ns:any):void
		{
			if (this._nodeKind == "text" || this._nodeKind == "comment" || this._nodeKind == "processing-instruction") {
				return;
			}
			
			var ns2:Namespace = new Namespace(ns);
			this._name = new QName(ns2,this.name());
			
			if (this._nodeKind == "attribute") {
				this._name.isAttribute = true;
				if (this._parent == null) {
					return;
				}
				this._parent.addNamespace(ns2);
			}
			
			if (this._nodeKind == "element") {
				this.addNamespace(ns2);
			}
		}
		
		/**
		 * @private
		 * 
		 */
		public setNodeKind(value:string):void
		{
			/**/ value = as(value, 'String');
			this._nodeKind = value;
		}
		
		public setParent(parent:XML):void
		{
			/**/ parent = strict(parent, XML);
			if (parent == this._parent) {
				return;
			}
			
			var oldParent:XML = this._parent;
			this._parent = parent;
			//assign first to prevent the possiblity of a recursive loop
			if (oldParent) {
				oldParent.removeChild(this);
			}
		}
		
		public setValue(value:string):void
		{
			/**/ value = as(value, 'String');
			this._value = value;
		}
		
		/**
		 * Returns an XMLList object of all XML properties of the XML object that represent XML text nodes.
		 * 
		 * @return 
		 * 
		 */
		public text():XMLList
		{
			var list:XMLList = new XMLList();
			var len:number = this._children.length;
			for(var i:number = 0; i < len; i++)
			{
				var c = this._children[i];
				if (c.nodeKind() == "text") {
					list.append(c);
				}
			}
			
			list.targetObject = this;
			return list;
		}
		
		/**
		 * Provides an overridable method for customizing the JSON encoding of values in an XML object.
		 * 
		 * @param k
		 * @return 
		 * 
		 */
		/*
		override public function toJSON(k:String):String
		{
		return this.name();
		}
		*/
		
		/**
		 * Returns a string representation of the XML object.
		 * 
		 * @return 
		 * 
		 */
		public toString():string
		{
			// text, comment, processing-instruction, attribute, or element
			if (this._nodeKind == "text" || this._nodeKind == "attribute") return this._value;
			if (this._nodeKind == "comment") return "";
			if (this._nodeKind == "processing-instruction") return "";
			if (this.hasSimpleContent())
			{
				var s:string = '';
				var len:number = this._children.length;
				for (var i:number = 0; i < len; i++) {
					var c = this._children[i];
					if (c.nodeKind() == "comment" || c.nodeKind() == "processing-instruction") {
						continue;
					}
					s = s + c.toString();
				}
				return s;
			}
			return this.toXMLString();
		}
		
		
		private toAttributeName(name:any):QName
		{
			var qname:QName;
			if (!(is(name , QName)))
			{
				name = name.toString();
				var i:number =  ((name.indexOf("$")) >> 0);
				if (i >= 0) {
					name = name.substring(i);
				}
			}
			qname = this.toXMLName(name);
			qname.isAttribute = true;
			return qname;
		}
		
		private toXMLName(name:any):QName
		{
			var qname:QName;
			if (name.toString().indexOf('$') >= 0) {
				return this.toAttributeName(name);
			}
			
			/*
			Given a string s, the ToXMLName conversion function returns a QName object or AttributeName. If the first character of s is "@", ToXMLName creates an AttributeName using the ToAttributeName operator. Otherwise, it creates a QName object using the QName constructor.
			Semantics
			Given a String value s, ToXMLName operator converts it to a QName object or AttributeName using the following steps:
			1. If ToString(ToUint32(s)) == ToString(s), throw a TypeError exception
			2. If the first character of s is "@"
			a. Let name = s.substring(1, s.length)
			b. Return ToAttributeName(name)
			3. Else
			a. Return a QName object created as if by calling the constructor new QName(s)
			*/
			if ((((name ) >> 0)).toString() == name) {
				throw new TypeError("invalid element name");
			}
			
			if (!is(name , QName))
			{
				var nameStr:string =  as(name.toString(), 'String');
				if (nameStr.indexOf(":") >= 0)
				{
					// Get the QName for prefix
					qname = new QName;
					qname.prefix = nameStr.substring(0, nameStr.indexOf(":"));
					qname.localName = nameStr.substring(nameStr.lastIndexOf(":") + 1);
					//get the qname uri
					qname.uri = this.getURI(qname.prefix);
				}
				else
				{
					qname = new QName(this.name());
					if (!qname.uri && XML.defaultNamespace) {
						qname = new QName(XML.defaultNamespace);
					}
					qname.localName = nameStr;
				}
			}
			else
			{
				qname = new QName(name);
			}
			return qname;
		}
		
		/**
		 * Returns a string representation of the XML object.
		 * 
		 * @return 
		 * 
		 */
		public toXMLString(indentLevel:number=0,ancestors:any[]=null):string
		{
			/**/ indentLevel = ((indentLevel) >> 0); ancestors = strict(ancestors, Array);
			/*
			Given an XML object x and an optional argument AncestorNamespaces and an optional argument IndentLevel, ToXMLString converts it to an XML encoded string s by taking the following steps:
			1. Let s be the empty string
			2. If IndentLevel was not provided, Let IndentLevel = 0
			3. If (XML.prettyPrinting == true)
			a. For i = 0 to IndentLevel-1, let s be the result of concatenating s and the space <SP> character
			4. If x.[[Class]] == "text",
			a. If (XML.prettyPrinting == true)
			i. Let v be the result of removing all the leading and trailing XMLWhitespace characters from x.[[Value]]
			ii. Return the result of concatenating s and EscapeElementValue(v)
			b. Else
			i. Return EscapeElementValue(x.[[Value]])
			5. If x.[[Class]] == "attribute", return the result of concatenating s and EscapeAttributeValue(x.[[Value]])
			6. If x.[[Class]] == "comment", return the result of concatenating s, the string "<!--", x.[[Value]] and the string "-->"
			7. If x.[[Class]] == "processing-instruction", return the result of concatenating s, the string "<?", x.[[Name]].localName, the space <SP> character, x.[[Value]] and the string "?>"
			8. If AncestorNamespaces was not provided, let AncestorNamespaces = { }
			9. Let namespaceDeclarations = { }
			10. For each ns in x.[[InScopeNamespaces]]
			a. If there is no ans ? AncestorNamespaces, such that ans.uri == ns.uri and ans.prefix == ns.prefix
			i. Let ns1 be a copy of ns
				    ii. Let namespaceDeclarations = namespaceDeclarations ? { ns1 } NOTE implementations may also exclude unused namespace declarations from namespaceDeclarations
			11. For each name in the set of names consisting of x.[[Name]] and the name of each attribute in x.[[Attributes]]
				  a. Let namespace be a copy of the result of calling [[GetNamespace]] on name with argument (AncestorNamespaces ? namespaceDeclarations)
			b. If (namespace.prefix == undefined),
				    i. Let namespace.prefix be an arbitrary implementation defined namespace prefix, such that there is no ns2 ? (AncestorNamespaces ? namespaceDeclarations) with namespace.prefix == ns2.prefix
				    ii. Note: implementations should prefer the empty string as the implementation defined prefix if it is not already used in the set (AncestorNamespaces ? namespaceDeclarations)
				    iii. Let namespaceDeclarations = namespaceDeclarations ? { namespace }
			12. Let s be the result of concatenating s and the string "<"
			13. If namespace.prefix is not the empty string,
			a. Let s be the result of concatenating s, namespace.prefix and the string ":"
			14. Let s be the result of concatenating s and x.[[Name]].localName
				15. Let attrAndNamespaces = x.[[Attributes]] ? namespaceDeclarations
			16. For each an in attrAndNamespaces
			a. Let s be the result of concatenating s and the space <SP> character
			b. If Type(an) is XML and an.[[Class]] == "attribute"
			i. Let ans be a copy of the result of calling [[GetNamespace]] on a.[[Name]] with argument AncestorNamespaces
			ii. If (ans.prefix == undefined),
				      1. Let ans.prefix be an arbitrary implementation defined namespace prefix, such that there is no ns2 ? (AncestorNamespaces ? namespaceDeclarations) with ans.prefix == ns2.prefix
				      2. If there is no ns2 ? (AncestorNamespaces ? namespaceDeclarations), such that ns2.uri == ans.uri and ns2.prefix == ans.prefix
				        a. Let namespaceDeclarations = namespaceDeclarations ? { ans }
			iii. If ans.prefix is not the empty string
			1. Let s be the result of concatenating s, namespace.prefix and the string ":"
			iv. Let s be the result of concatenating s and a.[[Name]].localName
			c. Else
			i. Let s be the result of concatenating s and the string "xmlns"
			ii. If (an.prefix == undefined),
				      1. Let an.prefix be an arbitrary implementation defined namespace prefix, such that there is no ns2 ? (AncestorNamespaces ? namespaceDeclarations) with an.prefix == ns2.prefix
			iii. If an.prefix is not the empty string
			1. Let s be the result of concatenating s, the string ":" and an.prefix
			d. Let s be the result of concatenating s, the string "=" and a double-quote character (i.e. Unicode codepoint \u0022)
			e. If an.[[Class]] == "attribute"
			i. Let s be the result of concatenating s and EscapeAttributeValue(an.[[Value]])
			f. Else
			i. Let s be the result of concatenating s and EscapeAttributeValue(an.uri)
			g. Let s be the result of concatenating s and a double-quote character (i.e. Unicode codepoint \u0022)
			17. If x.[[Length]] == 0
			a. Let s be the result of concatenating s and "/>"
			b. Return s
			18. Let s be the result of concatenating s and the string ">"
			19. Let indentChildren = ((x.[[Length]] > 1) or (x.[[Length]] == 1 and x[0].[[Class]] is not equal to "text"))
			20. If (XML.prettyPrinting == true and indentChildren == true)
			a. Let nextIndentLevel = IndentLevel + XML.PrettyIndent.
			21. Else
			a. Let nextIndentLevel = 0
			22. For i = 0 to x.[[Length]]-1
			a. If (XML.prettyPrinting == true and indentChildren == true)
			i. Let s be the result of concatenating s and a LineTerminator
				  b. Let child = ToXMLString (x[i], (AncestorNamespaces ? namespaceDeclarations), nextIndentLevel)
			c. Let s be the result of concatenating s and child
			23. If (XML.prettyPrinting == true and indentChildren == true),
			a. Let s be the result of concatenating s and a LineTerminator
			b. For i = 0 to IndentLevel, let s be the result of concatenating s and a space <SP> character
			24. Let s be the result of concatenating s and the string "</"
			25. If namespace.prefix is not the empty string
			a. Let s be the result of concatenating s, namespace.prefix and the string ":"
			26. Let s be the result of concatenating s, x.[[Name]].localName and the string ">"
			27. Return s
			NOTE Implementations may also preserve insignificant whitespace (e.g., inside and between element tags) and attribute quoting conventions in ToXMLString().			
			*/
			this.e4x(XML.INDEX_UNATTACHED_ATTRIBUTES);
			var ns:Namespace;
			var strArr:any[] = [];
			indentLevel = isNaN(indentLevel) ? 0 : indentLevel;
			var indentArr:any[] = [];
			for (var i:number = 0; i < indentLevel; i++) {
				indentArr.push(XML._indentStr);
			}
			
			var indent:string = indentArr.join("");
			if (this.nodeKind() == "text")
			{
				if (XML.prettyPrinting)
				{
					var v:string = XML.trimXMLWhitespace(this._value);
					return indent + XML.escapeElementValue(v);
				}
				return XML.escapeElementValue(this._value);
			}
			if (this.nodeKind() == "attribute")
				return indent + XML.escapeAttributeValue(this._value);
			
			if (this.nodeKind() == "comment")
				return indent + "<!--" +  this._value + "-->";
			
			if (this.nodeKind() == "processing-instruction")
				return indent + "<?" + this.name().localName + " " + this._value + "?>";
			
			// We excluded the other types, so it's a normal element
			// step 8.
			//ancestors
			if (!ancestors) {
				ancestors = [];
			}
			
			var declarations:any[] = [];
			var len:number = this._namespaces.length;
			for (i = 0; i < len; i++)
			{
				ns = this._namespaces[i];
				if (!XML.namespaceInArray(ns, ancestors)) {
					declarations.push(new Namespace(ns));
				}
			}
			
			//11
			len = this._attributes.length;
			for (i = 0; i < len; i++)
			{
				ns = new Namespace(this._attributes[i].name().getNamespace(ancestors.concat(declarations)));
				if (ns.prefix == null)
				{
					ns.prefix = "";
					declarations.push(ns);
				}
			}
			ns = new Namespace(this.name().getNamespace(ancestors.concat(declarations)));
			if (ns.prefix == null)
			{
				ns.prefix = "";
				declarations.push(ns);
			}
			if (XML.prettyPrinting)
			{
				strArr.push(new Array(indentLevel).join(' '));
			}
			strArr.push("<");
			if (ns.prefix) {
				strArr.push(ns.prefix + ":");
			}
			strArr.push(this.name().localName);
			
			//attributes and namespace declarations... (15-16)
			len = declarations.length;
			for (i = 0; i < len; i++)
			{
				var decVal:string = XML.escapeAttributeValue(declarations[i].uri);
				if (decVal)
				{
					strArr.push(" xmlns");
					var d = declarations[i];
					if (d.prefix)
					{
						strArr.push(":");
						strArr.push(d.prefix);
					}
					strArr.push('="');
					strArr.push(decVal);
					strArr.push('"');
				}
			}
			
			len = this._attributes.length;
			for (i = 0; i < len; i++)
			{
				strArr.push(" ");
				// the following seems to be the spec, but it does not make sense to me.
				//var ans:Namespace = _attributes[i].name().getNamespace(ancestors);
				var a = this._attributes[i];
				var aName:QName =  strict(a.name(), QName);
				var ans:Namespace = aName.getNamespace(ancestors.concat(declarations));
				if (ans.prefix)
				{
					strArr.push(ans.prefix);
					strArr.push(":");
				}
				strArr.push(aName.localName);
				strArr.push('="');
				strArr.push(XML.escapeAttributeValue(a.getValue()));
				strArr.push('"');
			}
			// now write elements or close the tag if none exist
			if (this._children.length == 0)
			{
				strArr.push("/>");
				return strArr.join("");
			}
			strArr.push(">");
			var indentChildren:boolean = this._children.length > 1 || (this._children.length == 1 && this._children[0].nodeKind() != "text");
			var nextIndentLevel:number = 0;
			if (XML.prettyPrinting && indentChildren) {
				nextIndentLevel =(( indentLevel + XML.prettyIndent) >> 0);
			} else {
				nextIndentLevel = 0;
			}
			len = this._children.length;
			for (i = 0; i < len; i++)
			{
				if (XML.prettyPrinting && indentChildren) {
					strArr.push("\n");
				}
				strArr.push(this._children[i].toXMLString(nextIndentLevel, ancestors.concat(declarations)));
			}
			if (XML.prettyPrinting && indentChildren)
			{
				strArr.push("\n");
				strArr.push(new Array(indentLevel + 1).join(' '));
			}
			strArr.push("</");
			if (ns.prefix)
			{
				strArr.push(ns.prefix);
				strArr.push(":");
			}
			strArr.push(this.name().localName);
			strArr.push(">");
			return strArr.join("");
		}
		
		/**
		 * Returns the XML object.
		 * 
		 * @return 
		 * 
		 */
		/*override*/ public valueOf():any
		{
			var str:string = this.toString();
			var num:number =  (+(str));
			return isNaN(num) ? str : num;
		}
		
		////////////////////////////////////////////////////////////////
		///
		///
		/// METHODS to allow XML to behave as if it's a string or number
		/// 
		///
		////////////////////////////////////////////////////////////////
		
		public charAt(index:number):string
		{
			/**/ index = (+(index));
			return this.s().charAt(index);
		}
		public charCodeAt(index:number):number
		{
			/**/ index = (+(index));
			return this.s().charCodeAt(index);
		}
		public codePointAt(pos:number):number
		{
			/**/ pos = (+(pos));
			return this.s().codePointAt(pos);
		}
		/*
		public function concat(... args):Array
		{
		return s().concat(args);
		}
		*/
		
		public indexOf(searchValue:string,fromIndex:number=0):number
		{
			/**/ searchValue = as(searchValue, 'String'); fromIndex = (+(fromIndex));
			return this.s().indexOf(searchValue,fromIndex);
		}
		public lastIndexOf(searchValue:string,fromIndex:number=0):number
		{
			/**/ searchValue = as(searchValue, 'String'); fromIndex = (+(fromIndex));
			return this.s().lastIndexOf(searchValue,fromIndex);
		}
		public localeCompare(compareString:string,locales:any=undefined, options:any=undefined):number
		{
			/**/ compareString = as(compareString, 'String');
			return this.s().localeCompare(compareString,locales,options);
		}
		public match(regexp:any):any[]
		{
			return this.s().match(regexp);
		}
		/*
		Moved this logic (partially) into the other replace method
		
		public function replace(regexp:*,withStr:*):String
		{
		return s().replace(regexp,withStr);
		}
		*/
		public search(regexp:any):number
		{
			return this.s().search(regexp);
		}
		public slice(beginSlice:number, endSlice:any=undefined):string
		{
			/**/ beginSlice = (+(beginSlice));
			return this.s().slice(beginSlice,endSlice);
		}
		public split(separator:any=undefined,limit:any=undefined):any[]
		{
			return this.s().split(separator,limit);
		}
		public substr(start:number, length:any=undefined):string
		{
			/**/ start = (+(start));
			return this.s().substr(start,length);
		}
		public substring(indexStart:number, indexEnd:any=undefined):string
		{
			/**/ indexStart = (+(indexStart));
			return this.s().substring(indexStart,indexEnd);
		}
		public toLocaleLowerCase():string
		{
			return this.s().toLocaleLowerCase();
		}
		public toLocaleUpperCase():string
		{
			return this.s().toLocaleUpperCase();
		}
		public toLowerCase():string
		{
			return this.s().toLowerCase();
		}
		public toUpperCase():string
		{
			return this.s().toUpperCase();
		}
		public trim():string
		{
			return this.s().trim();
		}
		
		// Number methods
		
		/**
		 * @flexjsignorecoercion Number
		 */
		public toExponential(fractionDigits:any=undefined):number
		{
			return (+(this.v().toExponential(fractionDigits) ));
		}
		/**
		 * @flexjsignorecoercion Number
		 */
		public toFixed(digits:any=undefined):number
		{
			return (+(this.v().toFixed(digits) ));
		}
		/**
		 * @flexjsignorecoercion Number
		 */
		public toPrecision(precision:any=undefined):number
		{
			return (+(this.v().toPrecision(precision) ));
		}
		
		/*[internal]*/ protected s () : string
		{
			return this.toString();
		}
		
		/*[internal]*/ protected v () : number
		{
			return (+(this.s()));
		}
		
		/**
		 * Возвращает объект для for each конструкции.
		 * Когда TypeScript перегоняет всё в ES5, то он использует геттер length а не функцию.
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __iterator (forEach : boolean) : any[]
		{
			// forEach = Boolean(forEach);
			if (forEach) {
				
				return [this];
				
			}
			
			return [0];
		}
		
		/**
		 * Index elements
		 */		
		/*internal*/ static INDEX_CHILDREN:number = 0x0001;
		
		/**
		 * Index attributes
		 */
		/*internal*/ static INDEX_ATTRIBUTES:number = 0x0002;
		
		/**
		 * Index attributes
		 */
		/*internal*/ static INDEX_UNATTACHED_ATTRIBUTES:number = 0x0004;
		
		/**
		 *  
		 * @param target
		 * 
		 */		
		/*internal*/ static __index(target:any, flags:number, targets:any[]):any
		{
			/**/ flags = ((flags) >>> 0); targets = strict(targets, Array);
			// vars
			var list:XMLList, child:XML, localName:string, len:number = 0;
			
			// elements
			if (flags & XML.INDEX_CHILDREN)
			{
				var prev:boolean = XML.ignoreECMAScriptForXML;
				XML.ignoreECMAScriptForXML = true;
				try {
					list = targets || target.elements('*');
					len =(( targets ? list.length : list.length()) >> 0);
				} catch (error) {
					error = window.asc.e2e(error);
					trace(error.getStackTrace());
				} finally {
					XML.ignoreECMAScriptForXML = prev;
				}
				for (var i:number = 0; i < len; i++) {
					child = as(list[i] , XML);
					if (!child) continue;
					localName =as( child.name().localName, 'String');
					XML.__mapElement(target, localName);
				}
			}
			
			// unattached attributes
			if (flags & XML.INDEX_UNATTACHED_ATTRIBUTES || flags & XML.INDEX_ATTRIBUTES)
			{
				XML.__addAttribute(target);
			}
			
			// attributes
			if (flags & XML.INDEX_ATTRIBUTES)
			{
				list = targets || target.attributes();
				len =(( targets ? list.length : list.length()) >> 0);
				for (var i:number = 0; i < len; i++) {
					child = as(list[i] , XML);
					if (!child) continue;
					localName =as( child.name().localName, 'String');
					XML.__mapAttribute(target, localName);
				}
			}
			
			// return
			return target;
		}
		
		/*internal*/ static __addAttribute(target:any):any
		{
			var itm, keys:any[] = Object.keys(target), len = keys.length;
			for (var i:number = 0; i < len; ++i) {
				var a:string =  as(keys[i], 'String');
				if (a[0] != '$') {
					continue; // not what we need
				}
				if (a.length < 2) {
					continue; // too short
				}
				var itm:any = target[a];
				if (is(itm , XMLList)) {
					continue; // already
				}
				delete target[a]; // delete simple value
				target.setAttribute(a.substr(1), itm); // set
			}
			
			return target;
		}
		
		private static __mapElement (target:any, propertyName:string):void
		{
			/**/ propertyName = as(propertyName, 'String');
			if (Object.getOwnPropertyDescriptor(target, propertyName)) {
				return;
			}
			Object.defineProperty(target, propertyName, {
				get: function():XMLList {
					return target.elements(propertyName);
				},
				enumerable: false,
				configurable: true
			});
		}
		
		private static __mapAttribute (target:any, attributeName:string):void
		{
			/**/ attributeName = as(attributeName, 'String');
			var n:string = '$' + attributeName;
			if (Object.getOwnPropertyDescriptor(target, n)) {
				return;
			}
			Object.defineProperty(target, n, {
				get: function():XMLList {
					return target.attribute(attributeName);
				},
				set: function (newValue:any):void {
					target.setAttribute(attributeName, newValue);
				},
				enumerable: false,
				configurable: true
			});
		}
	}
}