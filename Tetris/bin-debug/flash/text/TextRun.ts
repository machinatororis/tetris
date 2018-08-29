/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/*[ExcludeClass]*/
	export  class TextRun
	{
		public beginIndex:number = 0;
		public endIndex:number = 0;
		public textFormat:TextFormat = null;
		
		/**
		 * Constructor 
		 * @param beginIndex
		 * @param endIndex
		 * @param textFormat
		 * 
		 */		
		constructor(beginIndex:number, endIndex:number, textFormat:TextFormat)
		{
			/**/ beginIndex = ((beginIndex) >> 0); endIndex = ((endIndex) >> 0); textFormat = strict(textFormat, TextFormat);
			this.beginIndex = beginIndex;
			this.endIndex = endIndex;
			this.textFormat = textFormat;
		}
	}
}