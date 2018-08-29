/// <reference path="../../base.d.ts" />
/// <reference path="../utils/NameUtil.ts" />
/// <reference path="../../flash/display/BitmapData.ts" />
/// <reference path="../../flash/display/Bitmap.ts" />

namespace mx.core
{
	
   export import Bitmap = flash.display.Bitmap;
	export import BitmapData = flash.display.BitmapData;
	export import NameUtil = mx.utils.NameUtil;
	
   
   export  class FlexBitmap extends Bitmap
   {
      
      static VERSION:string = "3.0.0.0";
       
      
      constructor(param1:BitmapData = null, param2:string = "auto", param3:boolean = false)
      {
         /**/ param1 = strict(param1, BitmapData); param2 = as(param2, 'String'); param3 = Boolean(param3);
         var bitmapData:BitmapData = param1;
         var pixelSnapping:string = param2;
         var smoothing:boolean = param3;
         super(bitmapData,pixelSnapping,smoothing);
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