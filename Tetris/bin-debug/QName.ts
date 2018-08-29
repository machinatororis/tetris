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
	
	export  class QName
	{
		/**
		 * Constructor 
		 * @param qNameOrUri
		 * @param localNameVal
		 * 
		 */		
		constructor(qNameOrUri:any=null,localNameVal:any=null)
		{
			/*
			When the QName constructor is called with a one argument Name or two arguments Namespace and Name the following steps are taken:
			1. If (Type(Name) is Object and Name.[[Class]] == "QName")
			a. If (Namespace is not specified), return a copy of Name
			b. Else let Name = Name.localName
			2. If (Name is undefined or not specified)
			a. Let Name = “”
			3. Else let Name = ToString(Name)
			4. If (Namespace is undefined or not specified)
			a. If Name = "*"
			i. Let Namespace = null
			b. Else
			i. Let Namespace = GetDefaultNamespace()
			5. Let q be a new QName with q.localName = Name
			6. If Namespace == null
			a. Let q.uri = null NOTE implementations that preserve prefixes in qualified names may also set q.[[Prefix]] to undefined
			7. Else
			a. Let Namespace be a new Namespace created as if by calling the constructor new Namespace(Namespace)
			b. Let q.uri = Namespace.uri NOTE implementations that preserve prefixes in qualified names may also set q.[[Prefix]] to Namespace.prefix
			8. Return q
			*/
			if (is(qNameOrUri , QName))
			{
				var qn:QName = as(qNameOrUri , QName);
				this._uri = qn.uri;
				this._localName = qn.localName;
				this._prefix = qn.prefix;
			}
			else if (is(qNameOrUri , Namespace))
			{
				var ns:Namespace = as(qNameOrUri , Namespace);
				this._uri = ns.uri;
				this._prefix = ns.prefix;
				if (localNameVal) {
					this._localName =as( localNameVal.toString(), 'String');
				}
			}
			else if (localNameVal)
			{
				this._localName =as( localNameVal, 'String');
				this._uri =as( qNameOrUri, 'String');
			}
			else if (qNameOrUri)
			{
				var s:string =  as(qNameOrUri.toString(), 'String');
				if (s) this._localName = s;
			}
		}
		
		private _uri:string = null;
		public get uri():string
		{
			return this._uri;
		}
		public set uri(value:string)
		{
			/**/ value = as(value, 'String');
			this._uri = value;
		}
		
		private _localName:string = null;
		public get localName():string
		{
			return this._localName;
		}
		public set localName(value:string)
		{
			/**/ value = as(value, 'String');
			this._localName = value;
		}
		
		private _prefix:string = null;
		public get prefix():string
		{
			return this._prefix;
		}
		public set prefix(value:string)
		{
			/**/ value = as(value, 'String');
			this._prefix = value;
		}
		
		
		public toString():string
		{
			var uriVal:string = this._uri ? this._uri : '*';
			return uriVal + '::' + this._localName;
		}
		
		
		public equals(name:QName):boolean
		{
			/**/ name = strict(name, QName);
			return /*this.uri == name.uri && */this.localName == name.localName; // this.prefix == name.prefix &&
		}
		
		
		public matches(name:QName):boolean
		{
			/**/ name = strict(name, QName);
			if (this.uri == "*" || name.uri == "*") {
				return this.localName == "*" || name.localName == "*" || this.localName == name.localName;
			}
			
			if (this.localName == "*" || name.localName == "*") {
				return /*this.uri == name.uri*/ true;
			}
			
			return /*this.uri == name.uri && */this.localName == name.localName;
		}
		
		private _isAttribute:boolean = false;
		public get isAttribute():boolean
		{
			return this._isAttribute;
		}
		public set isAttribute(value:boolean)
		{
			/**/ value = Boolean(value);
			this._isAttribute = value;
		}
		
		
		public getNamespace(namespaces:any[]=null):Namespace
		{
			/**/ namespaces = strict(namespaces, Array);
			/*
			When the [[GetNamespace]] method of a QName q is called with no arguments or one argument InScopeNamespaces, the following steps are taken:
			1. If q.uri is null, throw a TypeError exception NOTE the exception above should never occur due to the way [[GetNamespace]] is called in this specification
			2. If InScopeNamespaces was not specified, let InScopeNamespaces = { }
			3. Find a Namespace ns in InScopeNamespaces, such that ns.uri == q.uri. If more than one such Namespace ns exists, the implementation may choose one of the matching Namespaces arbitrarily. NOTE implementations that preserve prefixes in qualified names may additionally constrain ns, such that ns.prefix == q.[[Prefix]]
			4. If no such namespace ns exists
			a. Let ns be a new namespace created as if by calling the constructor new Namespace(q.uri) NOTE implementations that preserve prefixes and qualified names may create the new namespaces as if by calling the constructor Namespace(q.[[Prefix]], q.uri)
			5. Return ns
			*/
			var possibleMatch:Namespace;
			if (!namespaces) {
				namespaces = [];
			}
			var len:number = namespaces.length;
			for (var i:number = 0; i < len; i++)
			{
				if (namespaces[i].uri == this._uri)
				{
					possibleMatch = namespaces[i];
					if (possibleMatch.prefix == this._prefix) {
						return possibleMatch;
					}
				}
			}
			
			if (possibleMatch) {
				return possibleMatch;
			}
			
			if (!this._prefix) {
				return new Namespace(this._uri);
			}
			
			return new Namespace(this._prefix,this._uri);
		}
		
	}


}