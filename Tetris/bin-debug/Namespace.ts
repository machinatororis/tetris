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
	
	export  class Namespace
	{
		
		constructor(prefixOrUri:any=null,uriValue:any=null)
		{
			/*
			When the Namespace constructor is called with a no arguments, one argument uriValue or two arguments prefixValue and uriValue, the following steps are taken:
			1. Create a new Namespace object n
			2. If prefixValue is not specified and uriValue is not specified
			a. Let n.prefix be the empty string
			b. Let n.uri be the empty string
			3. Else if prefixValue is not specified
			a. If Type(uriValue) is Object and uriValue.[[Class]] == "Namespace"
			i. Let n.prefix = uriValue.prefix
			ii. Let n.uri = uriValue.uri
			b. Else if Type(uriValue) is Object and uriValue.[[Class]] == "QName" and uriValue.uri is not null
			i. Let n.uri = uriValue.uri NOTE implementations that preserve prefixes in qualified names may also set n.prefix = uriValue.[[Prefix]]
			c. Else
			i. Let n.uri = ToString(uriValue)
			ii. If (n.uri is the empty string), let n.prefix be the empty string
			iii. Else n.prefix = undefined
			4. Else
			a. If Type(uriValue) is Object and uriValue.[[Class]] == "QName" and uriValue.uri is not null
			i. Let n.uri = uriValue.uri
			b. Else
			i. Let n.uri = ToString(uriValue)
			c. If n.uri is the empty string
			i. If prefixValue is undefined or ToString(prefixValue) is the empty string
			1. Let n.prefix be the empty string
			ii. Else throw a TypeError exception
			d. Else if prefixValue is undefined, let n.prefix = undefined
			e. Else if isXMLName(prefixValue) == false
			i. Let n.prefix = undefined
			f. Else let n.prefix = ToString(prefixValue)
			5. Return n
			*/
			if (!uriValue && prefixOrUri) //we don't have a prefix defined
			{
				var uriVal:any = uriValue ? uriValue : prefixOrUri;
				if (is(uriVal , Namespace))
				{
					this._prefix = (as(uriVal , Namespace)).prefix;
					this._uri = (as(uriVal , Namespace)).uri;
				}
				else if (this.isQName(uriVal ))
				{
					this._uri = uriVal.uri ? uriVal.uri : this._uri;
				}
				else {
					this._uri = is(uriVal , 'String') ? uriVal : uriVal.toString();
					if (this._uri == "") {
						this._prefix = "";
					}
				}
			}
			else if (uriValue)
			{
				// something is specified as the URI otherwise fall through and leave both the prefix and uri blank
				if (this.isQName(uriValue )) {
					if (uriValue.uri) {
						this._uri =as( uriValue.uri, 'String');
					}
				} else {
					this._uri = is(uriValue , 'String') ? uriValue : uriValue.toString();
				}
				
				if (!this._uri) {
					if (!prefixOrUri) {
						this._prefix = "";
					} else {
						throw new TypeError("invalid prefix");
					}
				} else {
					this._prefix = is(prefixOrUri , 'String') ? prefixOrUri : prefixOrUri.toString();
				}
			}
		}
		
		// Using this instead of simply using "is QName" because "is QName" causes a circular dependency.
		private isQName(val:any):boolean
		{
			if (val == null) {
				return false;
			}
			
			if (val.hasOwnProperty("uri") && val.hasOwnProperty("localName") && val.hasOwnProperty("prefix")) {
				return true;
			}
			
			return false;
		}
		
		private _uri:string = "";
		public get uri():string
		{
			return this._uri;
		}
		public set uri(value:string)
		{
			/**/ value = as(value, 'String');
			this._uri = value;
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
			return this.uri;
		}
		
		public valueOf():any
		{
			return this;
		}
	}


}