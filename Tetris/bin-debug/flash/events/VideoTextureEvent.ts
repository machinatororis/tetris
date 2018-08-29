/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class VideoTextureEvent extends Event
	{
		/**
		 * The VideoTextureEvent.RENDER_STATE constant defines the value of the type property of a renderState event object. 
		 */		
		public static RENDER_STATE:string = "renderState";
		
		private _status:string;
		private _colorSpace:string;
		
		/**
		 * Not implemented 
		 */		
		public codecInfo:string;
		
		/**
		 * Constructor 
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param status
		 * @param colorSpace
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, status:string = null, colorSpace:string = null)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable); status = as(status, 'String'); colorSpace = as(colorSpace, 'String');
			/**/ this._status === void 0 && (this._status = null);
			/**/ this._colorSpace === void 0 && (this._colorSpace = null);
			/**/ this.codecInfo === void 0 && (this.codecInfo = null);
			super(type, bubbles, cancelable);
			this._status = status;
			this._colorSpace = colorSpace;
		}
		
		/**
		 * The status of the VideoTexture object. 
		 * @return 
		 * 
		 */		
		public get status() : string { return this._status; }
		
		/**
		 * The color space used by the video being displayed in the VideoTexture object. 
		 * @return 
		 * 
		 */		
		public get colorSpace() : string { return this._colorSpace; }
	}
}