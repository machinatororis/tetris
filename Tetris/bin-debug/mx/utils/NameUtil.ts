/// <reference path="../../base.d.ts" />
/// <reference path="../core/IRepeaterClient.ts" />
/// <reference path="../../flash/utils/getQualifiedClassName.ts" />
/// <reference path="../../flash/display/DisplayObject.ts" />

namespace mx.utils
{
	
   export import DisplayObject = flash.display.DisplayObject;
	export import getQualifiedClassName = flash.utils.getQualifiedClassName;
	export import IRepeaterClient = mx.core.IRepeaterClient;
	
   
   export  class NameUtil
   {
      
      static VERSION:string = "3.0.0.0";
      
      private static counter:number = 0;
       
      
      constructor()
      {
         
      }
      
      public static displayObjectToString(param1:DisplayObject) : string
      {
         /**/ param1 = strict(param1, DisplayObject);
         var _loc2_:string = null;
         var _loc4_:string = null;
         var _loc5_:any[] = null;
         var _loc3_:DisplayObject = param1;
         while(_loc3_ != null)
         {
            if(_loc3_.parent && _loc3_.stage && _loc3_.parent == _loc3_.stage)
            {
               break;
            }
            _loc4_ = _loc3_.name;
            if(is(_loc3_ , 'implements_mx_core_IRepeaterClient'))
            {
               _loc5_ = IRepeaterClient(_loc3_).instanceIndices;
               if(_loc5_)
               {
                  _loc4_ = _loc4_ + ("[" + _loc5_.join("][") + "]");
               }
            }
            _loc2_ = _loc2_ == null?_loc4_:_loc4_ + "." + _loc2_;
            _loc3_ = _loc3_.parent;
         }
         return _loc2_;
      }
      
      public static createUniqueName(param1:any) : string
      {
         if(!param1)
         {
            return null;
         }
         var _loc2_:any = getQualifiedClassName(param1);
         var _loc3_:number =  ((_loc2_.indexOf("::")) >> 0);
         if(_loc3_ != -1)
         {
            _loc2_ = _loc2_.substr(_loc3_ + 2);
         }
         var _loc4_:number =  ((_loc2_.charCodeAt(_loc2_.length - 1)) >> 0);
         if(_loc4_ >= 48 && _loc4_ <= 57)
         {
            _loc2_ = _loc2_ + "_";
         }
         return _loc2_ + NameUtil.counter++;
      }
   }

}