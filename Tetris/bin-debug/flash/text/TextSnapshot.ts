/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	/**
	 * TextSnapshot objects let you work with static text in a movie clip. 
	 * You can use them, for example, to lay out text with greater precision than that allowed by dynamic text, 
	 * but still access the text in a read-only way.
	 * You don't use a constructor to create a TextSnapshot object; 
	 * it is returned by flash.display.DisplayObjectContainer.textSnapshot property. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextSnapshot
	{
		/**
		 * Searches the specified TextSnapshot object and returns the position of the first occurrence of textToFind found at or after beginIndex. 
		 * @param param1
		 * @param param2
		 * @param param3
		 * @return 
		 * 
		 */		
		public findText(param1:number, param2:string, param3:boolean) : number
		{
			/**/ param1 = ((param1) >> 0); param2 = as(param2, 'String'); param3 = Boolean(param3);
			return 0;
		}
		
		/**
		 * The number of characters in a TextSnapshot object. 
		 * @return 
		 * 
		 */		
		public get charCount() : number
		{
			return 0;
		}
		
		/**
		 * Returns a Boolean value that specifies whether a TextSnapshot object contains selected text in the specified range. 
		 * @param param1
		 * @param param2
		 * @return 
		 * 
		 */		
		public getSelected(param1:number, param2:number) : boolean
		{
			/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0);
			return true;
		}
		
		/**
		 * Returns a string that contains all the characters specified by the corresponding setSelected() method. 
		 * @param param1
		 * @return 
		 * 
		 */		
		public getSelectedText(param1:boolean = false) : string
		{
			/**/ param1 = Boolean(param1);
			return null;
		}
		
		/**
		 * Returns a string that contains all the characters specified by the beginIndex and endIndex parameters. 
		 * @param param1
		 * @param param2
		 * @param param3
		 * @return 
		 * 
		 */		
		public getText(param1:number, param2:number, param3:boolean = false) : string
		{
			/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0); param3 = Boolean(param3);
			return null;
		}
		
		/**
		 * Returns an array of objects that contains information about a run of text. 
		 * @param param1
		 * @param param2
		 * @return 
		 * 
		 */		
		public getTextRunInfo(param1:number, param2:number) : any[]
		{
			/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0);
			return null;
		}
		
		/**
		 * Lets you determine which character within a TextSnapshot object is on or near the specified x, 
		 * y coordinates of the movie clip containing the text in the TextSnapshot object. 
		 * @param param1
		 * @param param2
		 * @param param3
		 * @return 
		 * 
		 */		
		public hitTestTextNearPos(param1:number, param2:number, param3:number = 0) : number
		{
			/**/ param1 = (+(param1)); param2 = (+(param2)); param3 = (+(param3));
			return 0;
		}
		
		/**
		 * Specifies the color to use when highlighting characters that have been selected with the setSelected() method. 
		 * @param param1
		 * 
		 */		
		public setSelectColor(param1:number = 16776960) : void
		{
			
		/**/ param1 = ((param1) >>> 0);
			
		}
		
		/**
		 * Specifies a range of characters in a TextSnapshot object to be selected or deselected.
		 * @param param1
		 * @param param2
		 * @param param3
		 * 
		 */		
		public setSelected(param1:number, param2:number, param3:boolean) : void
		{
			
		/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0); param3 = Boolean(param3);
			
		}
	}
}