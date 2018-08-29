/// <reference path="../../base.d.ts" />

namespace flash.net
{
	
	 /**
	  * The URLLoaderDataFormat class provides values that specify how downloaded data is received. 
	  * @author pkulikov
	  * 
	  */	
   export  class URLLoaderDataFormat
   {
			/**
			 * Specifies that downloaded data is received as text. 
			 */      
      public static TEXT:string = "text";
      
			/**
			 * Specifies that downloaded data is received as raw binary data. 
			 */			
      public static BINARY:string = "binary";
      
			/**
			 * Specifies that downloaded data is received as URL-encoded variables. 
			 */			
      public static VARIABLES:string = "variables";
       
			/**
			 * Constructor 
			 */			
      constructor()
      {
         throw new Error('Abstract class error');
      }
   }

}