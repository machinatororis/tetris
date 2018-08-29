/// <reference path="../../base.d.ts" />
/// <reference path="../display/DisplayObject.ts" />

namespace flash.text
{
	
   export import DisplayObject = flash.display.DisplayObject;
	
   
   export  class StaticText extends DisplayObject
   {
       
      constructor()
      {
         super();
      }
      
       public get text() : string{
		   
		   return null;
	   }
   }

}