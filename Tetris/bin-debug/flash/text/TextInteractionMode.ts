/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * A class that defines the Interactive mode of a text field object. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextInteractionMode
	{
		/**
		 * The text field's default interaction mode is NORMAL and it varies across platform. 
		 */		
		public static NORMAL:string = "normal";
		
		/**
		 * On mobile platforms like Android, the text field starts in normal mode(which implies scroll and non-selectable mode). 
		 */		
		public static SELECTION:string = "selection";
	}
}