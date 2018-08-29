/// <reference path="../../base.d.ts" />
﻿
namespace flash.events
{
	
	/**
	 * A Stage object dispatches a StageOrientationEvent object when the orientation of the stage changes. 
	 * This can occur when the device is rotated, when the user opens a slide-out keyboard, 
	 * or when the setAspectRatio() method of the Stage is called.
	 * There are two types of StageOrientationEvent event: The orientationChanging (StageOrientationEvent.ORIENTATION_CHANGING), 
	 * is dispatched before the screen changes to a new orientation. Calling the preventDefault() method of the event object dispatched 
	 * for orientationChanging prevents the stage from changing orientation. The orientationChange (StageOrientationEvent.ORIENTATION_CHANGE),
	 *  is dispatched after the screen changes to a new orientation.
	 * 
	 * Note: If the autoOrients property is false, then the stage orientation does not change when a device is rotated. 
	 * Thus, StageOrientationEvents are only dispatched for device rotation when autoOrients is true.
	 * @author pkulikov
	 */
	export  class StageOrientationEvent extends Event
	{
		/**
		 * The ORIENTATION_CHANGE constant defines the value of the type property of a orientationChange event object. 
		 */		
		public static ORIENTATION_CHANGE : string = "orientationChange";
			
		/**
		 * The ORIENTATION_CHANGING constant defines the value of the type property of a orientationChanging event object. 
		 */		
		public static ORIENTATION_CHANGING : string = "orientationChanging";
		
		/**
		 * Private
		 */		
		private mBeforeOrientation:string;
		private mAfterOrientation:string;
		
		/**
		 * Creates a StageOrientationEvent object with specific information relevant to stage orientation events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param beforeOrientation
		 * @param afterOrientation
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, beforeOrientation:string = null, afterOrientation:string = null)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); beforeOrientation = as(beforeOrientation, 'String'); afterOrientation = as(afterOrientation, 'String');
			/**/ this.mBeforeOrientation === void 0 && (this.mBeforeOrientation = null);
			/**/ this.mAfterOrientation === void 0 && (this.mAfterOrientation = null);
			super(type, bubbles, cancelable);
			this.mBeforeOrientation = beforeOrientation;
			this.mAfterOrientation = afterOrientation;
		}
		
		/**
		 * The orientation of the stage after the change. 
		 * @return 
		 * 
		 */		
		public get afterOrientation () : string
		{
			return this.mAfterOrientation;
		}
		
		/**
		 * The orientation of the stage before the change. 
		 * @return 
		 * 
		 */		
		public get beforeOrientation () : string
		{
			return this.mBeforeOrientation;
		}
		
		/**
		 * Creates a copy of the StageOrientationEvent object and sets the value of each property to match that of the original. 
		 * @return 
		 * 
		 */		
		/*override*/ public clone():Event
		{
			return new StageOrientationEvent(this.type, this.bubbles, this.cancelable, this.mBeforeOrientation, this.mAfterOrientation);
		}
		
		/**
		 * Returns a string that contains all the properties of the StageOrientationEvent object.
		 * @return 
		 * 
		 */		
		/*override*/ public toString():string
		{
			return this.formatToString("StageOrientationEvent", "type", "bubbles", "cancelable", "eventPhase", "beforeOrientation", "afterOrientation");
		}
	}	
}