/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The TextExtent class contains information about the extents of some text in a text field.
	 * Objects of this class are returned by the TextFormat.getTextExtent method. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextExtent
	{
		public width:number = NaN;
		public height:number = NaN;
		public textFieldWidth:number = NaN;
		public textFieldHeight:number = NaN;
		public ascent:number = NaN;
		public descent:number = NaN;
		
		/**
		 * Constructor 
		 * @param width
		 * @param height
		 * @param textFieldWidth
		 * @param textFieldHeight
		 * @param ascent
		 * @param descent
		 * 
		 */		
		constructor(width:number, height:number, textFieldWidth:number, textFieldHeight:number, ascent:number, descent:number)
		{
			/**/ width = (+(width)); height = (+(height)); textFieldWidth = (+(textFieldWidth)); textFieldHeight = (+(textFieldHeight)); ascent = (+(ascent)); descent = (+(descent));
			this.width = width;
			this.height = height;
			this.textFieldWidth = textFieldWidth;
			this.textFieldHeight = textFieldHeight;
			this.ascent = ascent;
			this.descent = descent;
		}
	}
}