/// <reference path="../../base.d.ts" />

namespace mx.core
{
	
   export  class SpriteAsset extends FlexSprite implements IFlexAsset, IFlexDisplayObject, IBorder
   {
      
      implements_flash_display_IBitmapDrawable = null;
      
      implements_mx_core_IBorder = null;
      
      implements_mx_core_IFlexDisplayObject = null;
      
      implements_mx_core_IFlexAsset = null;
      
      static VERSION:string = "3.0.0.0";
       
      
      private _measuredHeight:number;
      
      private _measuredWidth:number;
      
      constructor()
      {
         /**/ this._measuredHeight === void 0 && (this._measuredHeight = NaN);
         /**/ this._measuredWidth === void 0 && (this._measuredWidth = NaN);
         super();
         this._measuredWidth = this.width;
         this._measuredHeight = this.height;
      }
      
      public get measuredWidth() : number
      {
         return this._measuredWidth;
      }
      
      public get measuredHeight() : number
      {
         return this._measuredHeight;
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
      
      public get borderMetrics() : EdgeMetrics
      {
         if(this.scale9Grid == null)
         {
            return EdgeMetrics.EMPTY;
         }
         return new EdgeMetrics(this.scale9Grid.left,this.scale9Grid.top,Math.ceil(this.measuredWidth - this.scale9Grid.right),Math.ceil(this.measuredHeight - this.scale9Grid.bottom));
      }
   }

}