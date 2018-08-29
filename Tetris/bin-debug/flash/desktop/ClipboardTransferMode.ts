/// <reference path="../../base.d.ts" />

namespace flash.desktop
{
	
	/**
	 * The ClipboardTransferMode class defines constants for the modes used as values of the transferMode parameter of the 
	 * Clipboard.getData() method.
	 * The transfer mode provides a hint about whether to return a reference or a copy when accessing an object contained on a clipboard.
	 * @author pkulikov
	 */
	export  class ClipboardTransferMode
	{
		/**
		 * The Clipboard object should only return a copy. 
		 */		
		public static CLONE_ONLY : string = "cloneOnly";

		/**
		 * The Clipboard object should return a copy if available and a reference if not. 
		 */		
		public static CLONE_PREFERRED : string = "clonePreferred";

		/**
		 * The Clipboard object should only return a reference. 
		 */		
		public static ORIGINAL_ONLY : string = "originalOnly";

		/**
		 * The Clipboard object should return a reference if available and a copy if not. 
		 */		
		public static ORIGINAL_PREFERRED : string = "originalPreferred";
		
		/**
		 * Constructor
		 */		
		constructor()
		{
			throw new Error('Abstract class Error');
		}
	}	
}