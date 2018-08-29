/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * The Stage object dispatches a FullScreenEvent object whenever the Stage enters or leaves full-screen display mode. 
	 * There are two types of fullScreen events: FullScreenEvent.FULL_SCREEN and FullScreenEvent.FULL_SCREEN_INTERACTIVE_ACCEPTED.
	 * @author pkulikov
	 */
	export  class FullScreenEvent extends Event
	{
		/**
		 * The FullScreenEvent.FULL_SCREEN constant defines the value of the type property of a fullScreen event object. 
		 */		
		public static FULL_SCREEN : string = "fullScreen";

		/**
		 * The FULL_SCREEN_INTERACTIVE_ACCEPTED:String constant defines the value of the type property of a 
		 * fullScreenInteractiveAccepted event object. 
		 */		
		public static FULL_SCREEN_INTERACTIVE_ACCEPTED : string = "fullScreenInteractiveAccepted";
		
		/**
		 * Helpers 
		 */		
		private _fullscreen:boolean;
		private _interactive:boolean;
		
		/**
		 * Creates an event object that contains information about fullScreen events. 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param fullScreen
		 * @param interactive
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, fullScreen:boolean = false, interactive:boolean = false)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); fullScreen = Boolean(fullScreen); interactive = Boolean(interactive);
			/**/ this._fullscreen === void 0 && (this._fullscreen = false);
			/**/ this._interactive === void 0 && (this._interactive = false);
			super(type, bubbles, cancelable);
			this._fullscreen = fullScreen;
			this._interactive = interactive;
		}
		
		/**
		 * Indicates whether the Stage object is in full-screen mode (true) or not (false). 
		 * @return 
		 * 
		 */		
		public get fullScreen () : boolean
		{
			return this._fullscreen;
		}
			
		/**
		 * Indicates whether the Stage object is in full-screen interactive mode (true) or not (false). 
		 * @return 
		 * 
		 */		
		public get interactive () : boolean
		{
			return this._interactive;
		}
		
		/**
		 * Creates a copy of a FullScreenEvent object and sets the value of each property to match that of the original.
		 * @return 
		 * 
		 */			
		/*override*/ public clone() : Event
		{
			return new FullScreenEvent(this.type,this.bubbles,this.cancelable,this._fullscreen,this._interactive);
		}
		
		/**
		 * Returns a string that contains all the properties of the FullScreenEvent object.
		 * @return 
		 * 
		 */			
		/*override*/ public toString() : string
		{
			return this.formatToString("FullScreenEvent","type","bubbles","cancelable","eventPhase","fullScreen","interactive");
		}
	}
}