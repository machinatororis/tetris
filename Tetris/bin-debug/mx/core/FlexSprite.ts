/// <reference path="../../base.d.ts" />
/// <reference path="../utils/NameUtil.ts" />
/// <reference path="../../flash/display/Sprite.ts" />

namespace mx.core
{
	
   export import Sprite = flash.display.Sprite;
	export import NameUtil = mx.utils.NameUtil;
	
   
   export  class FlexSprite extends Sprite
   {
      
      static VERSION:string = "3.0.0.0";
       
      
      constructor()
      {
         super();
         try
         {
            this.name = NameUtil.createUniqueName(this);
            return;
         }
         catch(e)
         {
            e = window.asc.e2e(e);
            return;
         }
      }
      
      /*override*/ public toString() : string
      {
         return NameUtil.displayObjectToString(this);
      }
   }

}