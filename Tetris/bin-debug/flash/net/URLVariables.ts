/// <reference path="../../base.d.ts" />

namespace flash.net
{
	
	/**
	 * The URLVariables class allows you to transfer variables between an application and a server. 
	 * Use URLVariables objects with methods of the URLLoader class, with the data property of the URLRequest class, 
	 * and with flash.net package functions. 
	 * @author pkulikov
	 * 
	 */	
	export  class URLVariables
	{
		/**
		 * Creates a new URLVariables object. 
		 * @param source
		 * 
		 */		
		constructor(source:string = null)
		{
			/**/ source = as(source, 'String');
			if (source != null) {
				
				try {
					
					this.decode(source);
					
				} catch (e) {e = window.asc.e2e(e);}
				
			}
		}
		
		/**
		 * Converts the variable string to properties of the specified URLVariables object. 
		 * @param source
		 * 
		 */		
		public decode(source:string) : void
		{
			/**/ source = as(source, 'String');
			if (!source) {
				
				return;
				
			}
			
			var q = source.indexOf('?');
			if (q >= 0) {
				
				source = source.substr(q + 1);
				
			}
			
			var param:string = null;
			var equalsIndex:any = 0;
			var name:string = null;
			var value:string = null;
			var oldValue:any = undefined;
			var params:any[] = source.split("&");
			
			for (var i:number = 0; i < params.length; i++) {
				
				param =as( params[i], 'String');
				equalsIndex = param.indexOf("=");
				
				if (equalsIndex == -1) {
					
					Error.throwError(Error, 2101);
					
				} else {
					
					name = decodeURI(param.substr(0,equalsIndex));
					value = decodeURI(param.substr(equalsIndex + 1));
					oldValue = this[name];
					
					if (oldValue != undefined) {
						
						if (!(is(oldValue , Array))) {
							
							this[name] = oldValue = [oldValue];
							
						}
						
						oldValue.push(value);
						
					} else {
						
						this[name] = value;
						
					}
					
				}
				
			}
		}
		
		/**
		 * Returns a string containing all enumerable variables, in the MIME content encoding application/x-www-form-urlencoded. 
		 * @return 
		 * 
		 */		
		public toString() : string
		{
			var name:string = null;
			var escapedName:string = null;
			var value:any = undefined;
			var i:number = 0;
			var s:string = "";
			var first:boolean = true;
			
			var __for0 = window.asc.in(this);
			for (name of __for0) {
				
				if (name == 'decode') {
					
					continue;
					
				}
				
				escapedName = encodeURI(name);
				value = this[name];
				
				if (is(value , Array)) {
					
					for (i = 0; i < value.length; i++) {
						
						if(!first) {
							
							s = s + "&";
							
						}
						
						s = s + escapedName;
						s = s + "=";
						s = s + encodeURI(as(value[i], 'String'));
						first = false;
						
					}
					
				} else {
					
					if (!first) {
						
						s = s + "&";
						
					}
					
					s = s + escapedName;
					s = s + "=";
					s = s + encodeURI(as(value, 'String'));
					first = false;
					
				}
				
			}
			
			return s;
		}
	}

}