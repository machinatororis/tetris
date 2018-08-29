/// <reference path="../../flash/geom/Transform.ts" />
/// <reference path="../../flash/geom/Rectangle.ts" />
/// <reference path="../../flash/geom/Point.ts" />
/// <reference path="../../flash/events/IEventDispatcher.ts" />
/// <reference path="../../flash/display/Stage.ts" />
/// <reference path="../../flash/display/LoaderInfo.ts" />
/// <reference path="../../flash/display/IBitmapDrawable.ts" />
/// <reference path="../../flash/display/DisplayObjectContainer.ts" />
/// <reference path="../../flash/display/DisplayObject.ts" />

namespace mx.core
{
	
   export import DisplayObject = flash.display.DisplayObject;
	export import DisplayObjectContainer = flash.display.DisplayObjectContainer;
	export import IBitmapDrawable = flash.display.IBitmapDrawable;
	export import LoaderInfo = flash.display.LoaderInfo;
	export import Stage = flash.display.Stage;
	export import IEventDispatcher = flash.events.IEventDispatcher;
	export import Point = flash.geom.Point;
	export import Rectangle = flash.geom.Rectangle;
	export import Transform = flash.geom.Transform;
	
   
   export  interface IFlexDisplayObject extends IBitmapDrawable, IEventDispatcher
   {
       
      
      visible : boolean;
      
      rotation : number;
      
      localToGlobal(param1:Point) : Point;
      
      name : string;
      
      width:number;
      
      measuredHeight : number;
      
      blendMode : string;
      
      scale9Grid : Rectangle;
      
      /*function set name(param1:String) : void;*/
      
      scaleX:number;
      
      scaleY:number;
      
      measuredWidth : number;
      
      accessibilityProperties : AccessibilityProperties;
      
      scrollRect:Rectangle;
      
      cacheAsBitmap : boolean;
      
      globalToLocal(param1:Point) : Point;
      
      height : number;
      
      /*function set blendMode(param1:String) : void;*/
      
      parent : DisplayObjectContainer;
      
      getBounds(param1:DisplayObject) : Rectangle;
      
      opaqueBackground : any;
      
      /*function set scale9Grid(param1:Rectangle) : void;*/
      
      setActualSize(param1:number, param2:number) : void;
      
      alpha:number;
      
      /*function set accessibilityProperties(param1:AccessibilityProperties) : void;*/
      
      /*function get width() : Number;*/
      
      hitTestPoint(param1:number, param2:number, param3:boolean) : boolean;
      
      /*function set cacheAsBitmap(param1:Boolean) : void;*/
      
      /*function get scaleX() : Number;*/
      
      /*function get scaleY() : Number;*/
      
      /*function get scrollRect() : Rectangle;*/
      
      mouseX : number;
      
      mouseY : number;
      
      /*function set height(param1:Number) : void;*/
      
      mask:DisplayObject;
      
      getRect(param1:DisplayObject) : Rectangle;
      
      /*function get alpha() : Number;*/
      
      transform:Transform;
      
      move(param1:number, param2:number) : void;
      
      loaderInfo : LoaderInfo;
      
      root : DisplayObject;
      
      hitTestObject(param1:DisplayObject) : boolean;
      
      /*function set opaqueBackground(param1:Object) : void;*/
      
      /*function set visible(param1:Boolean) : void;*/
      
      /*function get mask() : DisplayObject;*/
      
      x:number;
      
      y:number;
      
      /*function get transform() : Transform;*/
      
      filters:any[];
      
      /*function get x() : Number;*/
      
      /*function get y() : Number;*/
      
      /*function get filters() : Array;*/
      
      /*function set rotation(param1:Number) : void;*/
      
      stage : Stage;
   }

}