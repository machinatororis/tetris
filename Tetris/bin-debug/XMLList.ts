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
	
	export  class XMLList
	{
		/**
		 * XML array 
		 */		
		private _xmlArray:any[] = [];
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor()
		{
			this.addIndex(0);
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
		
		/*
		9.2.1.2 [[Put]] (P, V)
		Overview
		The XMLList type overrides the internal [[Put]] method defined by the Object type. The XMLList [[Put]] method is used to modify or replace an XML object within the XMLList and the context of its parent. In addition, when the XMLList contains a single property with an XML object, the [[Put]] method is used to modify, replace, and insert properties or XML attributes of that value by name. The input argument P identifies which portion of the XMLList and associated XML objects will be affected and may be a numeric property name, an unqualified name for an XML attribute (distinguished from XML valued property names by a leading “@” symbol) or set of XML elements, a QName for a set of XML elements, an AttributeName for a set of XML attributes or the properties wildcard “*”. When the input argument P is an unqualified XML element name, it identifies XML elements in the default namespace. When the input argument P is an unqualified XML attribute name, it identifies XML attributes in no namespace. The input argument V may be a value of type XML, XMLList or any value that can be converted to a String with ToString().
		NOTE Unlike the internal Object [[Put]] method, the internal XMLList [[Put]] method is never used for modifying the set of methods associated with XMLList objects.
		Semantics
		When the [[Put]] method of an XMLList object x is called with property name P and value V, the following steps are taken:
		1. Let i = ToUint32(P)
		2. If ToString(i) == P
		a. If x.[[TargetObject]] is not null
		i. Let r be the result of calling the [[ResolveValue]] method of x.[[TargetObject]]
		ii. If r == null, return
		b. Else let r = null
		c. If i is greater than or equal to x.[[Length]]
		i. If Type(r) is XMLList
		1. If r.[[Length]] is not equal to 1, return
		2. Else let r = r[0]
		ii. If r.[[Class]] is not equal to "element", return
		iii. Create a new XML object y with y.[[Parent]] = r, y.[[Name]] = x.[[TargetProperty]], y.[[Attributes]] = {}, y.[[Length]] = 0
		iv. If Type(x.[[TargetProperty]]) is AttributeName
		1. Let attributeExists be the result of calling the [[Get]] method of r with argument y.[[Name]]
		2. If (attributeExists.[[Length]] > 0), return
		3. Let y.[[Class]] = "attribute"
		v. Else if x.[[TargetProperty]] == null or x.[[TargetProperty]].localName == "*"
		1. Let y.[[Name]] = null
		2. Let y.[[Class]] = "text"
		vi. Else let y.[[Class]] = "element"
		vii. Let i = x.[[Length]]
		viii. If (y.[[Class]] is not equal to "attribute")
		1. If r is not null
		a. If (i > 0)
		i. Let j = 0
		ii. While (j < r.[[Length]]-1) and (r[j] is not the same object as x[i-1])
		1. Let j = j + 1
		b. Else
		i. Let j = r.[[Length]]-1
		c. Call the [[Insert]] method of r with arguments ToString(j+1) and y
		2. If Type(V) is XML, let y.[[Name]] = V.[[Name]]
		3. Else if Type(V) is XMLList, let y.[[Name]] = V.[[TargetProperty]]
		ix. Call the [[Append]] method of x with argument y
			  d. If (Type(V) ? {XML, XMLList}) or (V.[[Class]] ? {"text", "attribute"}), let V = ToString(V)
		e. If x[i].[[Class]] == "attribute"
		i. Let z = ToAttributeName(x[i].[[Name]])
		ii. Call the [[Put]] method of x[i].[[Parent]] with arguments z and V
		iii. Let attr be the result of calling [[Get]] on x[i].[[Parent]] with argument z
		iv. Let x[i] = attr[0]
		f. Else if Type(V) is XMLList
		i. Create a shallow copy c of V
		ii. Let parent = x[i].[[Parent]]
		iii. If parent is not null
		1. Let q be the property of parent, such that parent[q] is the same object as x[i]
		2. Call the [[Replace]] method of parent with arguments q and c
		3. For j = 0 to c.[[Length]]-1
		a. Let c[j] = parent[ToUint32(q)+j]
		iv. If c.[[Length]] == 0
		1. For j = i + 1 to x.[[Length]] – 1, rename property j of x to ToString(j-1)
		v. Else
		1. For j = x.[[Length]]-1 downto i + 1, rename property j of x to ToString(j + c.[[Length]] - 1)
		vi. For j = 0 to c.[[Length]]-1, let x[i + j] = c[j]
		vii. Let x.[[Length]] = x.[[Length]] + c.[[Length]] - 1
			  g. Else if (Type(V) is XML) or (x[i].[[Class]] ? {"text", "comment", "processing-instruction"})
		i. Let parent = x[i].[[Parent]]
		ii. If parent is not null
		1. Let q be the property of parent, such that parent[q] is the same object as x[i]
		2. Call the [[Replace]] method of parent with arguments q and V
		3. Let V = parent[q]
		iii. If Type(V) is String
		1. Create a new XML object t with t.[[Class]] = "text", t.[[Parent]] = x and t.[[Value]] = V
		2. Let x[i] = t
		iv. Else
		1. Let x[i] = V
		h. Else
		i. Call the [[Put]] method of x[i] with arguments "*" and V
		3. Else if x.[[Length]] is less than or equal to 1
		a. If x.[[Length]] == 0
		i. Let r be the result of calling the [[ResolveValue]] method of x
		ii. If (r == null) or (r.[[Length]] is not equal to 1), return
		iii. Call the [[Append]] method of x with argument r
		b. Call the [[Put]] method of x[0] with arguments P and V
		4. Return
		*/
		private addIndex(idx:number):void
		{
			/**/ idx = ((idx) >> 0);
			Object.defineProperty(this, idx, {
				get: function():any {
					return this._xmlArray[idx].e4x();
				},
				set: function(newValue:any):void {
					if (idx >= this._xmlArray.length)
						this.append(newValue);
					else
						this.replaceChildAt(idx, newValue);
				},
				enumerable: false,
				configurable: true
			});
		}
		
		public append(child:XML):void
		{
			/**/ child = strict(child, XML);
			this._xmlArray[this._xmlArray.length] = child;
			this.addIndex(this._xmlArray.length);
			do
			{
				if (!this._targetObject) {
					break;
				}
				if (!this._targetProperty) {
					this._targetObject.appendChild(child);
					break;
				}
				var objToAppend:XMLList =  strict(this._targetObject.child(this._targetProperty), XMLList);
				if (!objToAppend.length()) {
					this._targetObject.appendChild(child);
					break;
				}
				this._targetObject.insertChildAfter(objToAppend[objToAppend.length()-1], child);
			} while(false);
		}
		
		public appendChild(child:any):XML
		{
			if (this.isSingle()) {
				return this._xmlArray[0].appendChild(child);
			}
			return null;
		}
		
		/**
		 * Calls the attribute() method of each XML object and returns an XMLList object of the results.
		 * 
		 * @param attributeName
		 * @return 
		 * 
		 */
		public attribute(attributeName:any):XMLList
		{
			var retVal:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++)
			{
				var list:XMLList =  strict(this._xmlArray[i].attribute(attributeName), XMLList);
				if (list.length()) {
					retVal.concat(list);
				}
			}
			return retVal;
		}
		/**
		 * Calls the attributes() method of each XML object and returns an XMLList object of attributes for each XML object.
		 * 
		 * @return 
		 * 
		 */
		
		public attributes():XMLList
		{
			var retVal:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++)
			{
				var list:XMLList =  strict(this._xmlArray[i].attributes(), XMLList);
				if (list.length()) {
					retVal.concat(list);
				}
			}
			return retVal;
		}
		/**
		 * Calls the child() method of each XML object and returns an XMLList object that contains the results in order.
		 * 
		 * @param propertyName
		 * @return 
		 * 
		 */
		public child(propertyName:any):XMLList
		{
			var retVal:XMLList = new XMLList;
			var propNum:number = ((propertyName ) >> 0);
			if (propNum.toString() == propertyName)
			{
				if (propNum >= 0 && propNum < this._xmlArray.length)
				{
					var child:any = this._xmlArray[propNum];
					retVal.append(child);
					retVal.targetObject = child;
				}
				return retVal.e4x();
			}
			
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++)
			{
				var list:XMLList =  strict(this._xmlArray[i].child(propertyName), XMLList);
				if (list.length()) {
					retVal.concat(list);
				}
			}
			
			return retVal.e4x();
		}

		public childIndex():number
		{
			if (this.isSingle()) {
				return this._xmlArray[0].childIndex();
			}

			throw new Error("childIndex can only be called on an XMLList with one item.");
		}
		
		/**
		 * Calls the children() method of each XML object and returns an XMLList object that contains the results.
		 * 
		 * @return 
		 * 
		 */
		public children():XMLList
		{
			var retVal:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++)
			{
				var list:XMLList =  strict(this._xmlArray[i].children(), XMLList);
				if (list.length()) {
					retVal.concat(list);
				}
			}
			
			return retVal.e4x();
		}
		
		/**
		 * Calls the comments() method of each XML object and returns an XMLList of comments.
		 * @return 
		 * 
		 */
		public comments():XMLList
		{
			var retVal:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++) {
				var list:XMLList =  strict(this._xmlArray[i].comments(), XMLList);
				if (list.length()) {
					retVal.concat(list);
				}
			}
			return retVal;
		}
		
		public concat(list:any):XMLList
		{
			if (is(list , XML)) {
				var newList:XMLList = new XMLList;
				newList.append(list);
				list = newList;
			}
			
			if (!(is(list , XMLList))) {
				throw new TypeError("invalid type");
			}
			
			var item:XML;
			//work-around for FLEX-35070
			var len:number =  ((list.length()) >> 0);
			var i:number = 0;
			while (i < len) {
				this.append(list[i++]);
			}
			
			//			var xmlList:XMLList = list;
			//			for each(item in xmlList)
			//			append(item);
			
			return this.e4x();
		}
		
		/**
		 * Checks whether the XMLList object contains an XML object that is equal to the given value parameter.
		 * 
		 * @param value
		 * @return 
		 * 
		 */
		public contains(value:any):boolean
		{
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++) {
				if (this._xmlArray[i].contains(value)) {
					return true;
				}
			}
			return false;
		}
		
		/**
		 * Returns a copy of the given XMLList object.
		 * 
		 * @return 
		 * 
		 */
		public copy():XMLList
		{
			var retVal:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++) {
				retVal.append(this._xmlArray[i].copy());
			}
			
			return retVal.e4x();
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
			var retVal:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++) {
				var list:XMLList =  strict(this._xmlArray[i].descendants(name), XMLList);
				if (list.length()) {
					retVal.concat(list);
				}
			}
			
			return retVal.e4x();
		}
		
		/**
		 * Calls the elements() method of each XML object.
		 * 
		 * @param name
		 * @return 
		 * 
		 */
		public elements(name:any = "*"):XMLList
		{
			var retVal:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++) {
				var list:XMLList =  strict(this._xmlArray[i].elements(name), XMLList);
				if (list.length()) {
					retVal.concat(list);
				}
			}
			
			return retVal.e4x();
		}
		
		public elementNames():any[]
		{
			var retVal:any[] = [];
			var i:number = 0, len:number = this._xmlArray.length;
			while (i < len) {
				retVal.push(i++);
			}
			return retVal;
		}
		
		public equals(list:any):boolean
		{
			/*
			Overview
			The XMLList type adds the internal [[Equals]] method to the internal properties defined by the Object type.
			The XMLList [[Equals]] method is used to compare this XMLList object for content equality 
			with another XMLList object V or determine whether this XMLList object contains a single XML object that compares equal to V. 
			The [[Equals]] operator returns true if this XMLList object is considered equal to V 
			or contains only one XML object that is considered equal to V. Otherwise, it returns false. 
			Empty XMLList objects are considered equal to undefined. 
			The input argument V may be a value of type XMLList, XML, undefined or any value that can be converted to a String with ToString().
			
			Semantics
			When the [[Equals]] method of an XML object x is called with value V, the following steps are taken:
			1. If V == undefined and x.[[Length]] == 0, return true
			2. If Type(V) is XMLList
			a. If x.[[Length]] is not equal to V.[[Length]], return false
			b. For i = 0 to x.[[Length]]
			i. If the result of the comparison x[i] == V[i] is false, return false
			c. Return true
			3. Else if x.[[Length]] == 1
			a. Return the result of the comparison x[0] == V
			4. Return false
			*/
			return false;
		}
		
		/**
		 * Filter function 
		 */
		public filter(callback:Function):XMLList
		{
			var list:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++) {
				var child:XML =  strict(this._xmlArray[i].e4x(), XML);
				if (callback(child)) {
					list.append(child);
				}
			}
			
			list.targetObject = this._targetObject;
			list.targetProperty = this._targetProperty;
			return list.e4x();
		}
		
		public hasComplexContent():boolean
		{
			//what to do with multiple nodes? If anything is complex, we return true.
			if (this.isEmpty()) {
				return false;
			}
			var len:number = this._xmlArray.length;
			for (var i:number = 1; i < len; i++)
			{
				if (this._xmlArray[i].hasComplexContent()) {
					return true;
				}
			}
			return false;
		}
		
		/*override*/ public hasOwnProperty(propertyName:any):boolean
		{
			/*
			Overview
			The XMLList type overrides the internal [[HasProperty]] method defined by the Object type. The XMLList [[HasProperty]] method is used to determine whether this XMLList object contains an XML element or attribute by its ordinal position or whether any of the objects contained in this XMLList object contains an XML element or attribute by its name. The input argument P may be a numeric property name, an unqualified name for an XML attribute (distinguished from the name of XML elements by a leading “@” symbol) or a set of XML elements, a QName for a set of XML elements, an AttributeName for a set of XML attributes, the properties wildcard “*” or the attributes wildcard “@*”. When the input argument P is an unqualified XML element name, it identifies XML elements in the default namespace. When the input argument P is an unqualified XML attribute name, it identifies XML attributes in no namespace.
			Semantics
			When the [[HasProperty]] method of an XMLList object x is called with property name P, the following steps are taken:
			1. If ToString(ToUint32(P)) == P
			a. Return (ToUint32(P) < x.[[Length]])
			2. For i = 0 to x.[[Length]]-1
			a. If x[i].[[Class]] == "element" and the result of calling the [[HasProperty]] method of x[i] with argument P == true, return true
			3. Return false			
			*/
			var propNum:number = ((propertyName ) >> 0);
			if (propNum.toString() == propertyName) {
				return propNum < this._xmlArray.length;
			}
			var len:number = this._xmlArray.length;
			for (var i:number = 1; i < len; i++)
			{
				if (this._xmlArray[i].hasOwnProperty(propertyName)) {
					return true;
				}
			}
			return false;
		}
		
		/**
		 * Checks whether the XMLList object contains simple content.
		 * 
		 * @return 
		 * 
		 */
		public hasSimpleContent():boolean
		{
			//what to do with multiple nodes? If anything is complex, we return false.
			if (this.isEmpty()) {
				return true;
			}
			var len:number = this._xmlArray.length;
			for (var i:number = 1; i < len; i++)
			{
				if (this._xmlArray[i].hasComplexContent()) {
					return false;
				}
			}
			return true;
		}
		
		/**
		 * Returns the number of items in the XMLList.
		 * 
		 * @return 
		 * 
		 */
		public length():number
		{
			return this._xmlArray.length;
		}
		
		public name():QName
		{
			if (this.isSingle()) {
				return this._xmlArray[0].name();
			}
			return null;
		}
		
		/**
		 * Merges adjacent text nodes and eliminates empty text nodes for each of the following:
		 * all text nodes in the XMLList, all the XML objects contained in the XMLList, and the descendants of all the XML objects in the XMLList.
		 * 
		 * @return 
		 * 
		 */
		public normalize():XMLList
		{
			/*
			When the normalize method is called on an XMLList object list, the following steps are taken:
			1. Let i = 0
			2. While i < list.[[Length]]
			a. If list[i].[[Class]] == "element"
			i. Call the normalize method of list[i]
			ii. Let i = i + 1
			b. Else if list[i].[[Class]] == "text"
			i. While ((i+1) < list.[[Length]]) and (list[i + 1].[[Class]] == "text")
			1. Let list[i].[[Value]] be the result of concatenating list[i].[[Value]] and list[i + 1].[[Value]]
			2. Call the [[Delete]] method of list with argument ToString(i + 1)
			ii. If list[i].[[Value]].length == 0
			1. Call the [[Delete]] method of list with argument ToString(i)
			iii. Else
			1. Let i = i + 1
			c. Else
			i. Let i = i + 1
			3. Return list
			*/
			return this;
		}
		
		/**
		 * Returns the parent of the XMLList object if all items in the XMLList object have the same parent.
		 * 
		 * @return 
		 * 
		 */
		public parent():any
		{
			if (this.isEmpty()) {
				return undefined;
			}
			var retVal:XML =  strict(this._xmlArray[0].parent(), XML);
			var len:number = this._xmlArray.length;
			for (var i:number = 1; i < len; i++)
			{
				if (this._xmlArray[i].parent() != retVal) {
					return undefined;
				}
			}
			return retVal;
		}
		
		public plus(rightHand:any):any
		{
			/*
			Semantics
			The production AdditiveExpression : AdditiveExpression + MultiplicativeExpression is evaluated as follows:
			
			1. Let a be the result of evalutating AdditiveExpression
			2. Let left = GetValue(a)
			3. Let m be the result of evaluating MultiplicativeExpression
			4. Let right = GetValue(m)
				5. If (Type(left) ? {XML, XMLList}) and (Type(right) ? {XML, XMLList})
			a. Let list be a new XMLList
			b. Call the [[Append]] method of list with argument x
			c. Call the [[Append]] method of list with argument y
			d. Return list
			6. Let pLeft = ToPrimitive(left)
			7. Let pRight = ToPrimitive(right)
			8. If Type(pLeft) is String or Type(pRight) is String
			a. Return the result of concatenating ToString(pLeft) and ToString(pRight)
			9. Else
			a. Apply the addition operation to ToNumber(pLeft) and ToNumber(pRight) and return the result. See ECMAScript Edition 3, section 11.6.3 for details.
			*/
			if (is(rightHand , XML) || is(rightHand , XMLList))
			{
				var list:XMLList = new XMLList;
				list.concat(this);
				list.concat(rightHand);
				if (is(rightHand , XML)) {
					list.targetObject = rightHand;
				} else {
					list.targetObject = rightHand.targetObject;
					list.targetProperty = rightHand.targetProperty;
				}
				return list;
			}
			
			if (is(rightHand , 'String'))
				return this.toString() + rightHand;
			
			if (is(rightHand , 'Number') && isNaN(rightHand))
				return NaN;
			
			if (isNaN((+( this.toString() ))) || isNaN((+( rightHand.toString() ))))
				return this.toString() + rightHand.toString();
			
			return (+(this.toString())) + rightHand;
		}
		
		/**
		 * If a name parameter is provided, lists all the children of the XMLList object that contain processing instructions with that name.
		 * 
		 * @param name
		 * @return 
		 * 
		 */
		public processingInstructions(name:string = "*"):XMLList
		{
			/**/ name = as(name, 'String');
			var retVal:XMLList = new XMLList;
			if (!name) {
				return retVal;
			}
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++) {
				var child:any = this._xmlArray[i];
				if (child.nodeKind() != "processing-instruction") {
					continue;
				}
				if (name == "*") {
					retVal.append(child);
				} else if(name == child.localName) {
					retVal.append(child);
				}
			}
			
			return retVal.e4x();
		}
		
		public removeChild(child:any):void
		{
			var i:number = 0;
			var len:number = 0;
			if (is(child , 'String'))
			{
				var propNum:number = ((child ) >> 0);
				if(propNum.toString() == child)
				{
					this.removeChildAt(propNum);
				}
				else if (this.isSingle())
				{
					this._xmlArray[0].removeChild(child);
				}
				return;
			}
			if (is(child , 'Number'))
			{
				i =(( child) >> 0);
				this.removeChildAt(i);
				return;
			}

			if (is(child , XMLList))
			{
				len =(( child.length()) >> 0);
				for(i = 0; i < len; i++)
				{
					this.removeChild(child[i]);
				}
			}
			else if (is(child , XML))
			{
				len =(( this._xmlArray.length-1) >> 0);
				for (i = len; i >= 0; i--)
				{
					if (this._xmlArray[i] == child)
					{
						this._xmlArray.splice(i,1);
						if (child.hasAncestor(this._targetObject)) {
							child.parent().removeChild(child);
						}
					}
				}
			}
		}
		
		public removeChildAt(idx:number):void
		{
			/**/ idx = ((idx) >> 0);
			if (idx >= 0 && idx < this._xmlArray.length)
			{
				var child:XML =  strict(this._xmlArray[idx], XML);
				this._xmlArray.splice(idx, 1);
				if (child.hasAncestor(this._targetObject)) {
					child.parent().removeChild(child);
				}
			}
		}
		
		private replaceChildAt(idx:number,child:any):void
		{
			/**/ idx = ((idx) >> 0);
			var i:number = 0;
			var childToReplace:XML =  strict(this._xmlArray[idx], XML);
			if (childToReplace && this._targetObject)
			{
				this._targetObject.replaceChildAt(childToReplace.childIndex(),child);
			}
			if (is(child , XML))
			{
				this._xmlArray[idx] = child;
			}
			else if(is(child , XMLList))
			{
				var len:number =  ((child.length()) >> 0);
				for (i = 0; i < len; i++)
				{
					// replace the first one and add each additonal one.
					if (i == 0)
						this._xmlArray[idx] = child[i];
					else
						this._xmlArray.splice(idx+i,0,child[i]);
				}
			}
			// add indexes as necessary
			while(idx++ < this._xmlArray.length)
			{
				if (!this.hasOwnProperty(idx))
					this.addIndex(idx);
			}
		}
		
		private _targetObject:any = undefined;
		/**
		 * @private
		 * 
		 * Internally used to store an associated XML or XMLList object which will be effected by operations
		 */
		public set targetObject(value:any)
		{
			this._targetObject = value;
		}
		
		public get targetObject():any
		{
			return this._targetObject;
		}
		
		private _targetProperty:any = undefined;
		/**
		 * @private
		 * 
		 * The name of a property that may be created in the targetObject when objects are added to an empty XMLList.
		 */
		public set targetProperty(value:any)
		{
			this._targetProperty = value;
		}
		
		public get targetProperty():any
		{
			return this._targetProperty;
		}
		
		public setAttribute(attr:any, value:string):void
		{
			/**/ value = as(value, 'String');
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++) {
				this._xmlArray[i].setAttribute(attr, value);
			}
		}
		
		public hasAncestor(obj:any):boolean
		{
			if (this.isSingle()) {
				return this._xmlArray[0].hasAncestor(obj);
			}

			return false;
		}
		
		public insertChildAfter(child1:XML, child2:XML):XML
		{
			/**/ child1 = strict(child1, XML); child2 = strict(child2, XML);
			if (this.isSingle()) {
				return this._xmlArray[0].insertChildAfter(child1, child2);
			}

			return null;
		}
		
		public insertChildBefore(child1:XML, child2:XML):XML
		{
			/**/ child1 = strict(child1, XML); child2 = strict(child2, XML);
			if (this.isSingle()) {
				return this._xmlArray[0].insertChildAfter(child1, child2);
			}

			return null;
		}

		public namespace(prefix:string = null):any
		{
			/**/ prefix = as(prefix, 'String');
			if (this.isSingle()) {
				return this._xmlArray[0].namespace(prefix);
			}

			return null;
		}
		
		public nodeKind():string
		{
			if (this.isSingle()) {
				return this._xmlArray[0].nodeKind();
			}

			return null;
		}

		public removeNamespace(ns:any):XML
		{
			if (this.isSingle()) {
				return this._xmlArray[0].removeNamespace(ns);
			}

			return null;
		}
		
		public replace(propertyName:any, value:any):any
		{
			if (this.isSingle()) {
				return this._xmlArray[0].replace(propertyName, value);
			}
		}
		
		public setChild(elementName:any, elements:any):void
		{
			if (this.isSingle()) {
				this._xmlArray[0].setChild(elementName, elements);
			}
			
		}

		public setParent(parent:XML):void
		{
			/**/ parent = strict(parent, XML);
			if (this.isSingle()) {
				this._xmlArray[0].setParent(parent);
			}

		}

		public setChildren(value:any):XML
		{
			if (this.isSingle()) {
				return this._xmlArray[0].setChildren(value);
			}

			return null;
		}
	
		public setLocalName(name:string):void
		{
			/**/ name = as(name, 'String');
			if (this.isSingle()) {
				this._xmlArray[0].setLocalName(name);
			}
		}
		
 	 	public setName(name:string):void
 	 	{
 	 		/**/ name = as(name, 'String');
 	 		if (this.isSingle()) {
				this._xmlArray[0].setName(name);
			}
 	 	}
 	 	
		public setNamespace(ns:Namespace):void
		{
			/**/ ns = strict(ns, Namespace);
			if (this.isSingle()) {
				this._xmlArray[0].setNamespace(ns);
			}
		}

		/**
		 * Calls the text() method of each XML object and returns an XMLList object that contains the results.
		 * 
		 * @return 
		 * 
		 */
		public text():XMLList
		{
			var retVal:XMLList = new XMLList;
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++)
			{
				var list:XMLList =  strict(this._xmlArray[i].text(), XMLList);
				if (list.length()) {
					retVal.concat(list);
				}
			}
			return retVal;
		}
		
		/**
		 * Returns the string representation of this object, formatted according to locale-specific conventions.
		 * 
		 * @return 
		 * 
		 */
		/*override*/ public toLocaleString():string
		{
			var retVal:any[] = [];
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++)
			{
				var str:string =  as(this._xmlArray[i].toLocaleString(), 'String');
				if (str) {
					retVal.push(str);
				}
			}
			return retVal.join('');
		}
		
		/**
		 * Returns a string representation of all the XML objects in an XMLList object.
		 * 
		 * @return 
		 * 
		 */
		public toString():string
		{
			var retVal:any[] = [];
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++)
			{
				var str:string =  as(this._xmlArray[i].toString(), 'String');
				if (str) {
					retVal.push(str);
				}
			}
			return retVal.join(''); // "\n"
		}
		
		/**
		 * Returns a string representation of all the XML objects in an XMLList object.
		 * 
		 * @return 
		 * 
		 */
		public toXMLString():string
		{
			var retVal:any[] = [];
			var len:number = this._xmlArray.length;
			for (var i:number = 0; i < len; i++)
			{
				var str:string =  as(this._xmlArray[i].toXMLString(), 'String');
				if (str) {
					retVal.push(str);
				}
			}
			return retVal.join('\n');
		}
		
		/**
		 * Returns the XMLList object.
		 * 
		 * @return 
		 * 
		 */
		/*override*/ public valueOf():any
		{
			if (this.isEmpty()) {
				return '';
			}
			if (this.isSingle()) {
				return this._xmlArray[0].valueOf();
			}
			return this.toString();
		}
		
		////////////////////////////////////////////////////////////////
		///
		///
		/// METHODS to allow XML to behave as if it's a string or number
		/// 
		///
		////////////////////////////////////////////////////////////////
		
		public anchor(name:string):string
		{
			/**/ name = as(name, 'String');
			return this.isSingle() ? this._xmlArray[0].anchor(name) : "";
		}
		public charAt(index:number):string
		{
			/**/ index = (+(index));
			return this.isSingle() ? this._xmlArray[0].charAt(index) : "";
		}
		public charCodeAt(index:number):number
		{
			/**/ index = (+(index));
			return this.isSingle() ? this._xmlArray[0].charCodeAt(index) : -1;
		}
		public codePointAt(pos:number):number
		{
			/**/ pos = (+(pos));
			return this.isSingle() ? this._xmlArray[0].codePointAt(pos): -1;
		}
/*
		public function concat(... args):Array
		{
			return isSingle() ? _xmlArray[0].concat(args) : null;
		}
*/

		public indexOf(searchValue:string,fromIndex:number=0):number
		{
			/**/ searchValue = as(searchValue, 'String'); fromIndex = (+(fromIndex));
			return this.isSingle() ? this._xmlArray[0].indexOf(searchValue,fromIndex) : -1;
		}
		public lastIndexOf(searchValue:string,fromIndex:number=0):number
		{
			/**/ searchValue = as(searchValue, 'String'); fromIndex = (+(fromIndex));
			return this.isSingle() ? this._xmlArray[0].lastIndexOf(searchValue,fromIndex) : -1;
		}
		public localeCompare(compareString:string,locales:any=undefined, options:any=undefined):number
		{
			/**/ compareString = as(compareString, 'String');
			return this.isSingle() ? this._xmlArray[0].localeCompare(compareString,locales,options) : NaN;
		}
		public match(regexp:any):any[]
		{
			return this.isSingle() ? this._xmlArray[0].match(regexp) : null;
		}
/*
		public function replace(regexp:*,withStr:*):String
		{
			return isSingle() ? _xmlArray[0].replace(regexp,withStr) : null;
		}
*/
		public search(regexp:any):number
		{
			return this.isSingle() ? this._xmlArray[0].search(regexp) : -1;
		}
		public slice(beginSlice:number, endSlice:any=undefined):string
		{
			/**/ beginSlice = (+(beginSlice));
			return this.isSingle() ? this._xmlArray[0].slice(beginSlice,endSlice) : null;
		}
		public split(separator:any=undefined,limit:any=undefined):any[]
		{
			return this.isSingle() ? this._xmlArray[0].split(separator,limit) : null;
		}
		public substr(start:number, length:any=undefined):string
		{
			/**/ start = (+(start));
			return this.isSingle() ? this._xmlArray[0].substr(start,length) : null;
		}
		public substring(indexStart:number, indexEnd:any=undefined):string
		{
			/**/ indexStart = (+(indexStart));
			return this.isSingle() ? this._xmlArray[0].substring(indexStart,indexEnd) :null;
		}
		public toLocaleLowerCase():string
		{
			return this.isSingle() ? this._xmlArray[0].toLocaleLowerCase() : null;
		}
		public toLocaleUpperCase():string
		{
			return this.isSingle() ? this._xmlArray[0].toLocaleUpperCase() : null;
		}
		public toLowerCase():string
		{
			return this.isSingle() ? this._xmlArray[0].toLowerCase() : null;
		}
		public toUpperCase():string
		{
			return this.isSingle() ? this._xmlArray[0].toUpperCase() : null;
		}
		public trim():string
		{
			return this.isSingle() ? this._xmlArray[0].trim() : null;
		}

		// Number methods
		
		
		public toExponential(fractionDigits:any=undefined):number
		{
			return this.isSingle() ? this._xmlArray[0].toExponential(fractionDigits) : NaN;
		}
		public toFixed(digits:any=undefined):number
		{
			return this.isSingle() ? this._xmlArray[0].toFixed(digits) : NaN;
		}
		public toPrecision(precision:any=undefined):number
		{
			return this.isSingle() ? this._xmlArray[0].toPrecision(precision) : NaN;
		}
		private isEmpty():boolean
		{
			return this._xmlArray.length == 0;
		}
		private isSingle():boolean
		{
			return this._xmlArray.length == 1;
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
			var l = this.length();
			var a = [], al = 0;
			
			for (var i = 0; i < l; ++i) {
				
				var v = this[i];
				if (v == null) {
					
					continue;
					
				}
				
				if (forEach) {
					
					a[al++] = v;
					
				} else {
					
					a[al++] = i;
					
				}
				
			}
			
			return a;
		}
	}

}