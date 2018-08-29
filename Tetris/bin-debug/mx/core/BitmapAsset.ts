/// <reference path="../../base.d.ts" />
/// <reference path="../../flash/display/BitmapData.ts" />

namespace mx.core
{
	export import BitmapData = flash.display.BitmapData;
	
   
   export  class BitmapAsset extends FlexBitmap implements IFlexAsset, IFlexDisplayObject
   {
      
      implements_flash_display_IBitmapDrawable = null;
      
      implements_mx_core_IFlexDisplayObject = null;
      
      implements_mx_core_IFlexAsset = null;
      
      static VERSION:string = "3.0.0.0";
       
      
      constructor(param1:BitmapData = null, param2:string = "auto", param3:boolean = false)
      {
         /**/ param1 = strict(param1, BitmapData); param2 = as(param2, 'String'); param3 = Boolean(param3);
         super(param1,param2,param3);
      }
      
      public get measuredWidth() : number
      {
         if(this.bitmapData)
         {
            return this.bitmapData.width;
         }
         return 0;
      }
      
      public get measuredHeight() : number
      {
         if(this.bitmapData)
         {
            return this.bitmapData.height;
         }
         return 0;
      }
      
      public setActualSize(param1:number, param2:number) : void
      {
         /**/ param1 = (+(param1)); param2 = (+(param2));
         this.width = param1;
         this.height = param2;
      }
      
      public move(param1:number, param2:number) : void
      {
         /**/ param1 = (+(param1)); param2 = (+(param2));
         this.x = param1;
         this.y = param2;
      }
   }

}