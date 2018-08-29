/// <reference path="../../base.d.ts" />

namespace mx.core
{
	
   export  class EdgeMetrics
   {
      
      static VERSION:string = "3.0.0.0";
      
      public static EMPTY:EdgeMetrics = asc.sti(EdgeMetrics,()=>{ EdgeMetrics.EMPTY = new EdgeMetrics(0,0,0,0); });
       
      
      public top:number = NaN;
      
      public left:number = NaN;
      
      public bottom:number = NaN;
      
      public right:number = NaN;
      
      constructor(param1:number = 0, param2:number = 0, param3:number = 0, param4:number = 0)
      {
         /**/ param1 = (+(param1)); param2 = (+(param2)); param3 = (+(param3)); param4 = (+(param4));
         
         this.left = param1;
         this.top = param2;
         this.right = param3;
         this.bottom = param4;
      }
      
      public clone() : EdgeMetrics
      {
         return new EdgeMetrics(this.left,this.top,this.right,this.bottom);
      }
   }

}