/// <reference path="../../base.d.ts" />
/// <reference path="../../XML.ts" />

namespace flash.system
{
	export import XML = global.XML;
	
	/**
	 * The System class contains properties related to local settings and operations. 
	 * Among these are settings for camers and microphones, operations with shared objects and the use of the Clipboard.
	 * Additional properties and methods are in other classes within the flash.system package: 
	 * the Capabilities class, the IME class, and the Security class.
	 * 
	 * This class contains only static methods and properties. You cannot create new instances of the System class. 
	 * @author pkulikov
	 * 
	 */	
	/*[(methods = "auto", cls = "SystemClass", construct = "none")]*/
	export  class System
	{
		/**
		 * The currently installed system IME. 
		 * @return 
		 * 
		 */		
		public static get ime() : any /*IME*/
		{
			return null;
		}
		
		/**
		 * Replaces the contents of the Clipboard with a specified text string. 
		 * @param text
		 * 
		 */		
		public static setClipboard(text:string):void
		{
			/**/ text = as(text, 'String');
			var textArea:any = document.createElement("textarea");
			textArea.style.position = 'fixed';
			textArea.style.top = 0;
			textArea.style.left = 0;
			textArea.style.width = '2em';
			textArea.style.height = '2em';
			textArea.style.padding = 0;
			textArea.style.border = 'none';
			textArea.style.outline = 'none';
			textArea.style.boxShadow = 'none';
			textArea.style.background = 'transparent';
			textArea.value = text;
			document.body.appendChild(as(textArea , HTMLElement));
			textArea.select();
			
			try {
				
				var successful:boolean =  Boolean(document.execCommand('copy'));
				var msg:string = successful ? 'successful' : 'unsuccessful';
				trace('Copying text command was ' + msg);
				
			} catch (err) {
				
				err = window.asc.e2e(err);
				
				trace('Oops, unable to copy');
				
			}
			
			document.body.removeChild(as(textArea , HTMLElement));
		}
		
		/**
		 * The amount of memory (in bytes) currently in use that has been directly allocated by Flash Player or AIR. 
		 * @return 
		 * 
		 */		
		public static get totalMemory():number
		{
			return ((System.totalMemoryNumber ) >>> 0);
		}
		
		/**
		 * The amount of memory (in bytes) currently in use that has been directly allocated by Flash Player or AIR. 
		 * @return 
		 * 
		 */		
		public static get totalMemoryNumber():number
		{
			return System.memory.totalJSHeapSize;
		}
		
		/**
		 * The amount of memory (in bytes) that is allocated to Adobe® Flash® Player or Adobe® AIR® and that is not in use. 
		 * @return 
		 * 
		 */		
		public static get freeMemory():number
		{
			return Math.max(System.memory.jsHeapSizeLimit - System.totalMemoryNumber, 0);
		}
		
		/**
		 * The entire amount of memory (in bytes) used by an application. 
		 * @return 
		 * 
		 */		
		public static get privateMemory():number
		{
			return System.memory.usedJSHeapSize;
		}
		
		/**
		 * A Boolean value that determines which code page to use to interpret external text files. 
		 * @return 
		 * 
		 */		
		public static get useCodePage():boolean { return false; }
		public static set useCodePage(param1:boolean) { /**/ param1 = Boolean(param1); /**/ }
		
		/**
		 * Pauses Flash Player or the AIR Debug Launcher (ADL). 
		 * 
		 */		
		public static pause():void
		{
			
		}
		
		/**
		 * Resumes the application after calling System.pause(). 
		 * 
		 */		
		public static resume():void
		{
			
		}
		
		/**
		 * Closes Flash Player. 
		 * @param param1
		 * 
		 */		
		public static exit(param1:number):void
		{
			
		/**/ param1 = ((param1) >>> 0);
			
		}
		
		/**
		 * Forces the garbage collection process. 
		 * 
		 */		
		public static gc():void
		{
			
		}
		
		/**
		 * Advise the garbage collector that if the collector's imminence exceeds the function's imminence parameter then 
		 * the collector should finish the incremental collection cycle. 
		 * @param param1
		 * 
		 */		
		public static pauseForGCIfCollectionImminent(param1:number = 0.75):void
		{
			
		/**/ param1 = (+(param1));
			
		}
		
		/**
		 * Makes the specified XML object immediately available for garbage collection. 
		 * @param value
		 * 
		 */		
		public static disposeXML(value:XML) : void
		{
			/**/ value = strict(value, XML);
			if (value && 'dispose' in value)
			{
				value.dispose();
			}
		}
		
		private static get memory ():any
		{
			if ('memory' in window.performance) return window.performance['memory'];
			return { jsHeapSizeLimit: 0, totalJSHeapSize: 0, usedJSHeapSize: 0 };
		}
	}

}