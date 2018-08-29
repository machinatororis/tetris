/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * The TextLineMetrics class contains information about the text position and measurements of a line of text within a text field. 
	 * All measurements are in pixels. Objects of this class are returned by the flash.text.TextField.getLineMetrics() method.
	 * For measurements related to the text field containing the line of text 
	 * (for example, the "Text Field height" measurement in the diagram), see flash.text.TextField. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextLineMetrics
	{
		/**
		 * The x value is the left position of the first character in pixels. 
		 */		
		public x:number = NaN;
		
		/**
		 * The width value is the width of the text of the selected lines (not necessarily the complete text) in pixels. 
		 */		
		public width:number = NaN;
		
		/**
		 * The height value of the text of the selected lines (not necessarily the complete text) in pixels. 
		 */		
		public height:number = NaN;
		
		/**
		 * The ascent value of the text is the length from the baseline to the top of the line height in pixels. 
		 */		
		public ascent:number = NaN;
		
		/**
		 * The descent value of the text is the length from the baseline to the bottom depth of the line in pixels. 
		 */		
		public descent:number = NaN;
		
		/**
		 * The leading value is the measurement of the vertical distance between the lines of text. 
		 */		
		public leading:number = NaN;
		
		/**
		 * Creates a TextLineMetrics object. 
		 * @param x
		 * @param width
		 * @param height
		 * @param ascent
		 * @param descent
		 * @param leading
		 * 
		 */		
		constructor(x:number, width:number, height:number, ascent:number, descent:number, leading:number)
		{
			/**/ x = (+(x)); width = (+(width)); height = (+(height)); ascent = (+(ascent)); descent = (+(descent)); leading = (+(leading));
			this.x = x;
			this.width = width;
			this.height = height;
			this.ascent = ascent;
			this.descent = descent;
			this.leading = leading;
		}
	}
}