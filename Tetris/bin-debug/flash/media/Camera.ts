/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../display/BitmapData.ts" />
/// <reference path="../events/EventDispatcher.ts" />

namespace flash.media
{
	
	export import EventDispatcher = flash.events.EventDispatcher;
	export import BitmapData = flash.display.BitmapData;
	export import Rectangle = flash.geom.Rectangle;
	export import ByteArray = flash.utils.ByteArray;
	
	
	/*[Event(name = "videoFrame", type = "flash.events.Event")]*/
	/*[Event(name = "status", type = "flash.events.StatusEvent")]*/
	/*[Event(name = "activity", type = "flash.events.ActivityEvent")]*/
	export  class Camera extends EventDispatcher
	{
		
		constructor()
		{
			super();
		}
		
		private static _scanHardware():void
		{
		}
		
		public static get names():any[]
		{
			return null;
		}
		
		public static get isSupported():boolean
		{
			return false;
		}
		
		public static getCamera(param1:string = null):Camera
		{
			/**/ param1 = as(param1, 'String');
			return null;
		}
		
		public get activityLevel():number
		{
			return 0;
		}
		
		public get bandwidth():number
		{
			return 0;
		}
		
		public get currentFPS():number
		{
			return 0;
		}
		
		public get fps():number
		{
			return 0;
		}
		
		public get height():number
		{
			return 0;
		}
		
		public get index():number
		{
			return 0;
		}
		
		public get keyFrameInterval():number
		{
			return 0;
		}
		
		public get loopback():boolean
		{
			return false;
		}
		
		public get motionLevel():number
		{
			return 0;
		}
		
		public get motionTimeout():number
		{
			return 0;
		}
		
		public get muted():boolean
		{
			return false;
		}
		
		public get name():string
		{
			return null;
		}
		
		public get position():string
		{
			return null;
		}
		
		public get quality():number
		{
			return 0;
		}
		
		public get width():number
		{
			return 0;
		}
		
		public setCursor(param1:boolean):void
		{
		
		/**/ param1 = Boolean(param1);
		
		}
		
		public setKeyFrameInterval(param1:number):void
		{
		
		/**/ param1 = ((param1) >> 0);
		
		}
		
		public setLoopback(param1:boolean = false):void
		{
		
		/**/ param1 = Boolean(param1);
		
		}
		
		public setMode(param1:number, param2:number, param3:number, param4:boolean = true):void
		{
		
		/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0); param3 = (+(param3)); param4 = Boolean(param4);
		
		}
		
		public setMotionLevel(param1:number, param2:number = 2000):void
		{
		
		/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0);
		
		}
		
		public setQuality(param1:number, param2:number):void
		{
		
		/**/ param1 = ((param1) >> 0); param2 = ((param2) >> 0);
		
		}
		
		public drawToBitmapData(param1:BitmapData):void
		{
		
		/**/ param1 = strict(param1, BitmapData);
		
		}
		
		public copyToByteArray(param1:Rectangle, param2:ByteArray):void
		{
		
		/**/ param1 = strict(param1, Rectangle); param2 = strict(param2, ByteArray);
		
		}
		
		public copyToVector(param1:Rectangle, param2:number[]):void
		{
		
		/**/ param1 = strict(param1, Rectangle);
		
		}
	}

}