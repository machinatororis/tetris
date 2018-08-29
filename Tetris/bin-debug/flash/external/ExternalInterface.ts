/// <reference path="../../base.d.ts" />
/// <reference path="../../XMLList.ts" />
/// <reference path="../../XML.ts" />

namespace flash.external
{
	export import XML = global.XML;
	export import XMLList = global.XMLList;
	
	/**
	 * @author pkulikov
	 */
	export  class ExternalInterface
	{
		/**
		 * Helpers. 
		 */		
		private static __OBJECT_ID:string = null;
		private static __self:any = null;
		private static __inited:boolean = false;
		
		/**
		 * Indicates whether this player is in a container that offers an external interface. 
		 * @return 
		 * 
		 */		
		public static get available ():boolean {
			return true;
		}
		
		/**
		 * Returns the id attribute of the object tag in Internet Explorer, or the name attribute of the embed tag in Netscape. 
		 * @return 
		 * 
		 */		
		public static get objectID ():string {
			return ExternalInterface.__OBJECT_ID;
		}
		public static set objectID (value:string) {
			/**/ value = as(value, 'String');
			ExternalInterface.__OBJECT_ID = value;
		}
		
		/**
		 * Registers an ActionScript method as callable from the container. 
		 * @param functionName
		 * @param closure
		 * 
		 */		
		public static addCallback(functionName:string, closure:Function):void {
			/**/ functionName = as(functionName, 'String');
			ExternalInterface.__init();
			ExternalInterface.__self[functionName] = closure;
		}
		
		/**
		 * Calls a function exposed by the SWF container, passing zero or more arguments. 
		 * @param functionName
		 * @param arguments
		 * @return 
		 * 
		 */		
		public static call(functionName:any, ...args):any {
			const CDATA: string = '<![CDATA[';
			ExternalInterface.__init();
			// XML
			var CDATAIndex: number = -1;
			if (is(functionName , XML)) {
				var text:XMLList =  strict(functionName.text(), XMLList);
				if (text.length()) {
					functionName = text[0].getValue();
				} else {
					functionName = functionName.toXMLString();
				}
				// CDATA
				CDATAIndex =(( functionName.indexOf(CDATA)) >> 0);
				if (CDATAIndex >= 0) {
					functionName = functionName.substring(CDATAIndex + CDATA.length, functionName.indexOf(']]>'));
				}
			}
			// anonymous
			var functionIndex:number =  ((functionName.indexOf('function')) >> 0);
			if (functionIndex >= 0) {
				functionName = functionName.substring(functionName.indexOf('{', functionIndex)+1, functionName.lastIndexOf('}'));
			}
			// return and (...)
			if (CDATAIndex == -1 && functionName.indexOf('=') == -1 && functionName.indexOf('{') == -1) {
				if (functionName.indexOf('return') == -1) {
					functionName = 'return ' + functionName;
					if (functionName.indexOf('(') == -1) {
						functionName += '(' + ExternalInterface.newParameters(args.length).join(',') + ')';
					}
				}
			}
			return ExternalInterface.newFunction(functionName, ExternalInterface.newParameters(args.length)).apply(null, args);
		}
		
		/**
		 * Initialization.
		 */
		private static __init ():void {
			if (ExternalInterface.__inited) return;
			ExternalInterface.__self = document.createElement('object');
			ExternalInterface.__self.id = ExternalInterface.__OBJECT_ID;
			document.getElementsByTagName('head')[0].appendChild(ExternalInterface.__self);
			ExternalInterface.__inited = true;
		}
		
		/**
		 * Helper.
		 * @param code
		 * @param params
		 * @return 
		 * 
		 */		
		private static newFunction (code:string, args:any[]):Function {
			/**/ code = as(code, 'String'); args = strict(args, Array);
			if (!args.length) {
				return new Function(code);
			} else {
				return new Function(args.join(','), code);
			}
		}
		
		/**
		 * Helper.
		 * @param length
		 * @return 
		 * 
		 */		
		private static newParameters (length:number):any[] {
			/**/ length = ((length) >> 0);
			var list:any[] = [];
			while (list.length < length) list.push('__arg' + list.length);
			return list;
		}
		
		/**
		 * Constructor
		 */		
		constructor()
		{
			throw new Error('Abstract class error');
		}
	}	
}