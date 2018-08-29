/// <reference path="../../base.d.ts" />

namespace flash.text
{
	
	 /**
	  * The TextFormatAlign class provides values for text alignment in the TextFormat class. 
	  * @author pkulikov
	  * 
	  */	
   export  class TextFormatAlign
   {
			/**
			 * aligns text to the left within the text field. 
			 */      
      public static LEFT:string = "left";
      
			/**
			 * centers the text in the text field. 
			 */			
      public static CENTER:string = "center";
      
			/**
			 * aligns text to the right within the text field. 
			 */			
      public static RIGHT:string = "right";
      
			/**
			 * justifies text within the text field. 
			 */			
      public static JUSTIFY:string = "justify";
      
			/**
			 * aligns text to the start edge of a line. 
			 */			
      public static START:string = "start";
      
			/**
			 * aligns text to the end edge of a line. 
			 */			
      public static END:string = "end";
   }

}