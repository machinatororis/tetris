/// <reference path="../../base.d.ts" />
/// <reference path="../events/EventDispatcher.ts" />
﻿
namespace flash.display
{
	export import EventDispatcher = flash.events.EventDispatcher;
	

	/**
	 * The FrameLabel object contains properties that specify a frame number and the corresponding label name.
	 * The MovieClip class includes a currentLabels property, which is an Array of FrameLabel objects for the current scene. 
	 * If the MovieClip instance does not use scenes, the Array includes all frame labels from the entire MovieClip instance.
	 * 
	 * The Scene class includes a labels property, which is an Array of FrameLabel objects for the scene.
	 * 
	 * @author pkulikov
	 */
	export  class FrameLabel extends EventDispatcher
	{
		/**
		 * The frame number containing the label. 
		 * @return 
		 * 
		 */		
		public get frame () : number
		{
			return this._frame;
		}

		/**
		 * The name of the label. 
		 * @return 
		 * 
		 */		
		public get name () : string
		{
			return this._name;
		}
		
		private _name:string;
		private _frame:number;
		
		/**
		 * Constructor. 
		 * @param name
		 * @param frame
		 * 
		 */		
		constructor(name:string, frame:number)
		{
			/**/ name = as(name, 'String'); frame = ((frame) >> 0);
			/**/ this._name === void 0 && (this._name = null);
			/**/ this._frame === void 0 && (this._frame = 0);
			super();
			this._name = name;
			this._frame = frame;
		}
	}	
}