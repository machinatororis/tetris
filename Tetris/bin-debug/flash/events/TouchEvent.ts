/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../display/InteractiveObject.ts" />
/// <reference path="../display/DisplayObject.ts" />

namespace flash.events
{
	export import DisplayObject = flash.display.DisplayObject;
	export import InteractiveObject = flash.display.InteractiveObject;
	export import Point = flash.geom.Point;
	export import ByteArray = flash.utils.ByteArray;
	

	/**
	 * The TouchEvent class lets you handle events on devices that detect user contact with the device (such as a finger on a touch screen).
	 * When a user interacts with a device such as a mobile phone or tablet with a touch screen, 
	 * the user typically touches the screen with his or her fingers or a pointing device. 
	 * You can develop applications that respond to basic touch events (such as a single finger tap) with the TouchEvent class. 
	 * Create event listeners using the event types defined in this class. For user interaction with multiple points of contact 
	 * (such as several fingers moving across a touch screen at the same time) use the related GestureEvent, PressAndTapGestureEvent, and 
	 * TransformGestureEvent classes. And, use the properties and methods of these classes to construct event handlers that 
	 * respond to the user touching the device.
	 * 
	 * Use the Multitouch class to determine the current environment's support for touch interaction, and to manage the support of 
	 * touch interaction if the current environment supports it.
	 * 
	 * Note: When objects are nested on the display list, touch events target the deepest possible nested object that is visible in the 
	 * display list. This object is called the target node. To have a target node's ancestor (an object containing the target node in the 
	 * display list) receive notification of a touch event, use EventDispatcher.addEventListener() on the 
	 * ancestor node with the type parameter set to the specific touch event you want to detect.
	 * 
	 * In AIR 3, and above, you can listen for proximity events on supported Android devices that have an active stylus. 
	 * On such devices, proximityMove and touchMove event objects provide a byte array containing path and pressure samples taken since the 
	 * previous move event. You can use these samples to construct the path of the stylus between touch events. 
	 * (Note that hit-testing for interaction of the stylus input with the display list only occurs at the end of a path segment.) 
	 * @author pkulikov
	 * 
	 */	
	export  class TouchEvent extends Event
	{
		/**
		 * Defines the value of the type property of a TOUCH_BEGIN touch event object. 
		 */		
		public static TOUCH_BEGIN:string = "touchBegin";
		
		/**
		 * Defines the value of the type property of a TOUCH_END touch event object. 
		 */		
		public static TOUCH_END:string = "touchEnd";
		
		/**
		 * Defines the value of the type property of a TOUCH_MOVE touch event object. 
		 */		
		public static TOUCH_MOVE:string = "touchMove";
		
		/**
		 * Defines the value of the type property of a TOUCH_OVER touch event object. 
		 */		
		public static TOUCH_OVER:string = "touchOver";
		
		/**
		 * Defines the value of the type property of a TOUCH_OUT touch event object. 
		 */		
		public static TOUCH_OUT:string = "touchOut";
		
		/**
		 * Defines the value of the type property of a TOUCH_ROLL_OVER touch event object. 
		 */		
		public static TOUCH_ROLL_OVER:string = "touchRollOver";
		
		/**
		 * Defines the value of the type property of a TOUCH_ROLL_OUT touch event object. 
		 */		
		public static TOUCH_ROLL_OUT:string = "touchRollOut";
		
		/**
		 * Defines the value of the type property of a TOUCH_TAP touch event object. 
		 */		
		public static TOUCH_TAP:string = "touchTap";
		
		/**
		 * Defines the value of the type property of a PROXIMITY_BEGIN touch event object. 
		 */		
		public static PROXIMITY_BEGIN:string = "proximityBegin";
		
		/**
		 * Defines the value of the type property of a PROXIMITY_END touch event object. 
		 */		
		public static PROXIMITY_END:string = "proximityEnd";
		
		/**
		 * Defines the value of the type property of a PROXIMITY_MOVE touch event object.
		 */		
		public static PROXIMITY_MOVE:string = "proximityMove";
		
		/**
		 * Defines the value of the type property of a PROXIMITY_OUT touch event object. 
		 */		
		public static PROXIMITY_OUT:string = "proximityOut";
		
		/**
		 * Defines the value of the type property of a PROXIMITY_OVER touch event object. 
		 */		
		public static PROXIMITY_OVER:string = "proximityOver";
		
		/**
		 * Defines the value of the type property of a PROXIMITY_ROLL_OUT touch event object. 
		 */		
		public static PROXIMITY_ROLL_OUT:string = "proximityRollOut";
		
		/**
		 * Defines the value of the type property of a PROXIMITY_ROLL_OVER touch event object.
		 */		
		public static PROXIMITY_ROLL_OVER:string = "proximityRollOver";
		
		private _touchPointID:number;
		private _isPrimaryTouchPoint:boolean;
		private _sizeY:number;
		private _sizeX:number;
		private _pressure:number;
		private _relatedObject:any;
		private _isRelatedObjectInaccessible:boolean;
		private _ctrlKey:boolean;
		private _altKey:boolean;
		private _shiftKey:boolean;
		private _localX:number;
		private _localY:number;
		private _commandKey:boolean;
		private _controlKey:boolean;
		private _timestamp:number;
		private _touchIntent:string;
		private _samples:ByteArray;
		private _isTouchPointCanceled:boolean;
		
		/**
		 * Creates an Event object that contains information about touch events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param touchPointID
		 * @param isPrimaryTouchPoint
		 * @param localX
		 * @param localY
		 * @param sizeX
		 * @param sizeY
		 * @param pressure
		 * @param relatedObject
		 * @param ctrlKey
		 * @param altKey
		 * @param shiftKey
		 * @param commandKey
		 * @param controlKey
		 * @param timestamp
		 * @param touchIntent
		 * @param samples
		 * @param isTouchPointCanceled
		 * 
		 */		
		constructor(type:string, bubbles:boolean = true, cancelable:boolean = false, touchPointID:number = 0, isPrimaryTouchPoint:boolean = false, localX:number = NaN, localY:number = NaN, sizeX:number = NaN, sizeY:number = NaN, pressure:number = NaN, relatedObject:InteractiveObject = null, ctrlKey:boolean = false, altKey:boolean = false, shiftKey:boolean = false, commandKey:boolean = false, controlKey:boolean = false, timestamp:number = NaN, touchIntent:string, samples:ByteArray = null, isTouchPointCanceled:boolean = false)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); touchPointID = ((touchPointID) >> 0); isPrimaryTouchPoint = Boolean(isPrimaryTouchPoint); localX = (+(localX)); localY = (+(localY)); sizeX = (+(sizeX)); sizeY = (+(sizeY)); pressure = (+(pressure)); relatedObject = strict(relatedObject, InteractiveObject); ctrlKey = Boolean(ctrlKey); altKey = Boolean(altKey); shiftKey = Boolean(shiftKey); commandKey = Boolean(commandKey); controlKey = Boolean(controlKey); timestamp = (+(timestamp)); touchIntent = as(touchIntent, 'String'); samples = strict(samples, ByteArray); isTouchPointCanceled = Boolean(isTouchPointCanceled);
			/**/ this._touchPointID === void 0 && (this._touchPointID = 0);
			/**/ this._isPrimaryTouchPoint === void 0 && (this._isPrimaryTouchPoint = false);
			/**/ this._sizeY === void 0 && (this._sizeY = NaN);
			/**/ this._sizeX === void 0 && (this._sizeX = NaN);
			/**/ this._pressure === void 0 && (this._pressure = NaN);
			/**/ this._relatedObject === void 0 && (this._relatedObject = null);
			/**/ this._isRelatedObjectInaccessible === void 0 && (this._isRelatedObjectInaccessible = false);
			/**/ this._ctrlKey === void 0 && (this._ctrlKey = false);
			/**/ this._altKey === void 0 && (this._altKey = false);
			/**/ this._shiftKey === void 0 && (this._shiftKey = false);
			/**/ this._localX === void 0 && (this._localX = 0);
			/**/ this._localY === void 0 && (this._localY = 0);
			/**/ this._commandKey === void 0 && (this._commandKey = false);
			/**/ this._controlKey === void 0 && (this._controlKey = false);
			/**/ this._timestamp === void 0 && (this._timestamp = NaN);
			/**/ this._touchIntent === void 0 && (this._touchIntent = null);
			/**/ this._samples === void 0 && (this._samples = null);
			/**/ this._isTouchPointCanceled === void 0 && (this._isTouchPointCanceled = false);
			super(type,bubbles,cancelable);
			this._touchPointID = touchPointID;
			this._isPrimaryTouchPoint = isPrimaryTouchPoint;
			this._localX = localX;
			this._localY = localY;
			this._sizeX = sizeX;
			this._sizeY = sizeY;
			this._pressure = pressure;
			this._relatedObject = this.relatedObject;
			this._ctrlKey = ctrlKey;
			this._altKey = altKey;
			this._shiftKey = shiftKey;
			this._commandKey = commandKey;
			this._controlKey = controlKey;
			this._timestamp = timestamp;
			this._touchIntent = touchIntent;
			this._samples = samples;
			this._isTouchPointCanceled = isTouchPointCanceled;
		}
		
		/**
		 * Creates a copy of the TouchEvent object and sets the value of each property to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone() : Event
		{
			return new TouchEvent(this.type, this.bubbles, this.cancelable, this._touchPointID, this._isPrimaryTouchPoint, this._localX, this._localY, this._sizeX, this._sizeY, this._pressure, this._relatedObject, this._ctrlKey, this._altKey, this._shiftKey, this._commandKey, this._controlKey, this._timestamp, this._touchIntent, this._samples, this._isTouchPointCanceled);
		}
		
		/**
		 * Returns a string that contains all the properties of the TouchEvent object. 
		 * @return 
		 * 
		 */		
		/*override*/ public toString() : string
		{
			return this.formatToString("TouchEvent","type","bubbles","cancelable","eventPhase","touchPointID","isPrimaryTouchPoint","localX","localY","stageX","stageY","sizeX","sizeY","pressure","relatedObject","ctrlKey","altKey","shiftKey","commandKey", "controlKey", "timestamp", "touchIntent", "isTouchPointCanceled");
		}
		
		/**
		 * Updates the specified ByteArray object with the high-frequency data points for a multi-point touch event. 
		 * @param buffer
		 * @param append
		 * @return 
		 * 
		 */		
		public getSamples(buffer:ByteArray, append:boolean = false):number
		{
			/**/ buffer = strict(buffer, ByteArray); append = Boolean(append);
			return 0;
		}
		
		/**
		 * Reports that the hardware button at the specified index is pressed. 
		 * @param index
		 * @return 
		 * 
		 */		
		public isToolButtonDown(index:number):boolean
		{
			/**/ index = ((index) >> 0);
			return false;
		}
		
		/**
		 * The horizontal coordinate at which the event occurred relative to the containing sprite. 
		 * @return 
		 * 
		 */		
		public get localX() : number { return this._localX; }
		public set localX(value:number) { /**/ value = (+(value)); this._localX = value; }
		
		/**
		 * The vertical coordinate at which the event occurred relative to the containing sprite. 
		 * @return 
		 * 
		 */		
		public get localY() : number { return this._localY; }
		public set localY(value:number){ /**/ value = (+(value)); this._localY = value; }
		
		/**
		 * A unique identification number (as an int) assigned to the touch point. 
		 * @return 
		 * 
		 */		
		public get touchPointID() : number { return this._touchPointID; }
		public set touchPointID(value:number) { /**/ value = ((value) >> 0); this._touchPointID = value; }
		
		/**
		 * Indicates whether the first point of contact is mapped to mouse events. 
		 * @return 
		 * 
		 */		
		public get isPrimaryTouchPoint() : boolean { return this._isPrimaryTouchPoint; }
		public set isPrimaryTouchPoint(value:boolean) { /**/ value = Boolean(value); this._isPrimaryTouchPoint = value; }
		
		/**
		 * Width of the contact area. 
		 * @return 
		 * 
		 */		
		public get sizeX() : number { return this._sizeX; }
		public set sizeX(value:number) { /**/ value = (+(value)); this._sizeX = value; }
		
		/**
		 * Height of the contact area. 
		 * @return 
		 * 
		 */		
		public get sizeY() : number { return this._sizeY; }
		public set sizeY(value:number) { /**/ value = (+(value)); this._sizeY = value; }
		
		/**
		 * A value between 0.0 and 1.0 indicating force of the contact with the device. 
		 * @return 
		 * 
		 */		
		public get pressure() : number { return this._pressure; }
		public set pressure(value:number) { /**/ value = (+(value)); this._pressure = value; }
		
		/**
		 * A reference to a display list object that is related to the event. 
		 * @return 
		 * 
		 */		
		public get relatedObject() : any { return this._relatedObject; }
		public set relatedObject(value:any) { this._relatedObject = value; }
		
		/**
		 * On Windows or Linux, indicates whether the Ctrl key is active (true) or inactive (false). 
		 * @return 
		 * 
		 */		
		public get ctrlKey() : boolean { return this._ctrlKey; }
		public set ctrlKey(value:boolean) { /**/ value = Boolean(value); this._ctrlKey = value; }
		
		/**
		 * Indicates whether the Alt key is active (true) or inactive (false). 
		 * @return 
		 * 
		 */		
		public get altKey() : boolean { return this._altKey; }
		public set altKey(value:boolean) { /**/ value = Boolean(value); this._altKey = value; }
		
		/**
		 * Indicates whether the Shift key is active (true) or inactive (false). 
		 * @return 
		 * 
		 */		
		public get shiftKey() : boolean { return this._shiftKey; }
		public set shiftKey(value:boolean) { /**/ value = Boolean(value); this._shiftKey = value; }
		
		/**
		 * Indicates whether the command key is activated (Mac only).
		 * @return 
		 * 
		 */		
		public get commandKey ():boolean { return this._commandKey; }
		public set commandKey (value:boolean) { /**/ value = Boolean(value); this._commandKey = value; }
		
		/**
		 * Indicates whether the Control key is activated on Mac and whether the Ctrl key is activated on Windows or Linux.
		 * @return 
		 * 
		 */		
		public get controlKey():boolean { return this._controlKey; }
		public set controlKey(value:boolean) { /**/ value = Boolean(value); this._controlKey = value }/*;*/ 
		
		/**
		 * Reports the time of the event in relative milliseconds.
		 * @return 
		 * 
		 */		
		public get timestamp():number { return this._timestamp; }
		public set timestamp(value:number) { /**/ value = (+(value)); this._timestamp = value; }
		
		/**
		 * Reports whether the touch was generated by the primary or the eraser end of a stylus.
		 * @return 
		 * 
		 */		
		public get touchIntent():string { return this._touchIntent; }
		public set touchIntent(value:string) { /**/ value = as(value, 'String'); this._touchIntent = value; }
		
		/**
		 * The horizontal coordinate at which the event occurred in global Stage coordinates. 
		 * @return 
		 * 
		 */		
		public get stageX() : number
		{
			if (isNaN(this.localX) || isNaN(this.localY))
			{
				return Number.NaN;
			}
			return this.getStageX();
		}
		
		/**
		 * The vertical coordinate at which the event occurred in global Stage coordinates. 
		 * @return 
		 * 
		 */		
		public get stageY() : number
		{
			if (isNaN(this.localX) || isNaN(this.localY))
			{
				return Number.NaN;
			}
			return this.getStageY();
		}
		
		private getStageX():number
		{
			if (!(is(this.target , DisplayObject))) {
				return 0;
			}
			
			var p = Point.__pool.get();
			
			p.__setTo(this.localX, this.localY);
			var v = this.target.__localToGlobal(p, p).x;
			
			Point.__pool.release(p);
			return v;
		}
		
		private getStageY():number
		{
			if (!(is(this.target , DisplayObject))) {
				return 0;
			}
			
			var p = Point.__pool.get();
			
			p.__setTo(this.localX, this.localY);
			var v = this.target.__localToGlobal(p, p).y;
			
			Point.__pool.release(p);
			return v;
		}
		
		/**
		 * If true, the relatedObject property is set to null for reasons related to security sandboxes. 
		 * @return 
		 * 
		 */		
		public get isRelatedObjectInaccessible() : boolean { return this._isRelatedObjectInaccessible; }
		public set isRelatedObjectInaccessible(value:boolean) { /**/ value = Boolean(value); this._isRelatedObjectInaccessible = value; }
		
		/**
		 * Reports that this touch input sequence was canceled by the operating system.
		 * @return 
		 * 
		 */		
		public get isTouchPointCanceled() : boolean { return this._isTouchPointCanceled; }
		public set isTouchPointCanceled(value:boolean) { /**/ value = Boolean(value); this._isTouchPointCanceled = value; }
		
		/**
		 * Instructs Flash Player or Adobe AIR to render after processing of this event completes, if the display list has been modified. 
		 * 
		 */		
		public updateAfterEvent() : void
		{
			
		}
	}

}