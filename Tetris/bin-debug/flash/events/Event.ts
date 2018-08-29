/// <reference path="../../base.d.ts" />

namespace flash.events
{
	
	/**
	 * The Event class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when 
	 * an event occurs.
	 * The properties of the Event class carry basic information about an event, such as the event's type or whether the event's default 
	 * behavior can be canceled. For many events, such as the events represented by the Event class constants, this basic information is 
	 * sufficient. Other events, however, may require more detailed information. Events associated with a mouse click, for example, 
	 * need to include additional information about the location of the click event and whether any keys were pressed during the click event.
	 *  You can pass such additional information to event listeners by extending the Event class, which is what the MouseEvent class does.
	 *  ActionScript 3.0 API defines several Event subclasses for common events that require additional information. 
	 * Events associated with each of the Event subclasses are described in the documentation for each class.
	 * 
	 * The methods of the Event class can be used in event listener functions to affect the behavior of the event object. 
	 * Some events have an associated default behavior. For example, the doubleClick event has an associated default behavior that 
	 * highlights the word under the mouse pointer at the time of the event. Your event listener can cancel this behavior by calling
	 *  the preventDefault() method. You can also make the current event listener the last one to process an event by calling 
	 * the stopPropagation() or stopImmediatePropagation() method.
	 * 
	 * Other sources of information include:
	 * 
	 * A useful description about the timing of events, code execution, and rendering at runtime in Ted Patrick's blog entry: 
	 * Flash Player Mental Model - The Elastic Racetrack.
	 * A blog entry by Johannes Tacskovics about the timing of frame events, such as ENTER_FRAME, EXIT_FRAME: The MovieClip Lifecycle.
	 * An article by Trevor McCauley about the order of ActionScript operations: Order of Operations in ActionScript.
	 * A blog entry by Matt Przybylski on creating custom events: AS3: Custom Events. 
	 * @author pkulikov
	 * 
	 */	
	export  class Event
	{
		/**
		 * The ACTIVATE constant defines the value of the type property of an activate event object.
		 */		
		public static ACTIVATE:string = "activate";
		
		/**
		 * The Event.ADDED constant defines the value of the type property of an added event object.
		 */
		public static ADDED:string = "added";
		
		/**
		 * The Event.ADDED_TO_STAGE constant defines the value of the type property of an addedToStage event object.
		 */
		public static ADDED_TO_STAGE:string = "addedToStage";
		
		/**
		 * The Event.BROWSER_ZOOM_CHANGE constant defines the value of the type property of an browserZoomChange event object.
		 */
		public static BROWSER_ZOOM_CHANGE:string = "browserZoomChange";
		
		/**
		 * The Event.CANCEL constant defines the value of the type property of a cancel event object.
		 */
		public static CANCEL:string = "cancel";
		
		/**
		 * The Event.CHANGE constant defines the value of the type property of a change event object.
		 */
		public static CHANGE:string = "change";
		
		/**
		 * The Event.CLEAR constant defines the value of the type property of a clear event object.
		 */
		public static CLEAR:string = "clear";
		
		/**
		 * The Event.CLOSE constant defines the value of the type property of a close event object.
		 */
		public static CLOSE:string = "close";
		
		/**
		 * The Event.CLOSING constant defines the value of the type property of a closing event object. 
		 */		
		public static CLOSING : string = "closing";
		
		/**
		 * The Event.COMPLETE constant defines the value of the type property of a complete event object.
		 */
		public static COMPLETE:string = "complete";
		
		/**
		 * The Event.CONNECT constant defines the value of the type property of a connect event object.
		 */
		public static CONNECT:string = "connect";
		
		/**
		 * Defines the value of the type property of a copy event object.
		 */
		public static COPY:string = "copy";
		
		/**
		 * Defines the value of the type property of a cut event object.
		 */
		public static CUT:string = "cut";
		
		/**
		 * The Event.DEACTIVATE constant defines the value of the type property of a deactivate event object.
		 */
		public static DEACTIVATE:string = "deactivate";
		
		/**
		 * The Event.DISPLAYING constant defines the value of the type property of a displaying event object. 
		 */		
		public static DISPLAYING : string = "displaying";
		
		/**
		 * The Event.ENTER_FRAME constant defines the value of the type property of an enterFrame event object.
		 */
		public static ENTER_FRAME:string = "enterFrame";
		
		/**
		 * The Event.FRAME_CONSTRUCTED constant defines the value of the type property of an frameConstructed event object.
		 */
		public static FRAME_CONSTRUCTED:string = "frameConstructed";
		
		/**
		 * The Event.EXIT_FRAME constant defines the value of the type property of an exitFrame event object.
		 */
		public static EXIT_FRAME:string = "exitFrame";
		
		/**
		 * The Event.EXITING constant defines the value of the type property of an exiting event object. 
		 */		
		public static EXITING : string = "exiting";
		
		/**
		 * The Event.FRAME_LABEL constant defines the value of the type property of an frameLabel event object.
		 */
		public static FRAME_LABEL:string = "frameLabel";
		
		/**
		 * The Event.ID3 constant defines the value of the type property of an id3 event object.
		 */
		public static ID3:string = "id3";
		
		/**
		 * The Event.INIT constant defines the value of the type property of an init event object.
		 */
		public static INIT:string = "init";
		
		/**
		 * The Event.LOCATION_CHANGE constant defines the value of the type property of a locationChange event object. 
		 */		
		public static LOCATION_CHANGE : string = "locationChange";
		
		/**
		 * The Event.MOUSE_LEAVE constant defines the value of the type property of a mouseLeave event object.
		 */
		public static MOUSE_LEAVE:string = "mouseLeave";
		
		/**
		 * The Event.NETWORK_CHANGE constant defines the value of the type property of a networkChange event object. 
		 */		
		public static NETWORK_CHANGE : string = "networkChange";
		
		/**
		 * The Event.OPEN constant defines the value of the type property of an open event object.
		 */
		public static OPEN:string = "open";
		
		/**
		 * The Event.PASTE constant defines the value of the type property of a paste event object.
		 */
		public static PASTE:string = "paste";
		
		/**
		 * The Event.REMOVED constant defines the value of the type property of a removed event object.
		 */
		public static REMOVED:string = "removed";
		
		/**
		 * The Event.REMOVED_FROM_STAGE constant defines the value of the type property of a removedFromStage event object.
		 */
		public static REMOVED_FROM_STAGE:string = "removedFromStage";
		
		/**
		 * The Event.RENDER constant defines the value of the type property of a render event object.
		 */
		public static RENDER:string = "render";
		
		/**
		 * The Event.RESIZE constant defines the value of the type property of a resize event object.
		 */
		public static RESIZE:string = "resize";
		
		/**
		 * The Event.SCROLL constant defines the value of the type property of a scroll event object.
		 */
		public static SCROLL:string = "scroll";
		
		/**
		 * The Event.TEXT_INTERACTION_MODE_CHANGE constant defines the value of the type property of a interaction mode event object.
		 */
		public static TEXT_INTERACTION_MODE_CHANGE:string = "textInteractionModeChange";
		
		/**
		 * The Event.SELECT constant defines the value of the type property of a select event object.
		 */
		public static SELECT:string = "select";
		
		/**
		 * The Event.SELECT_ALL constant defines the value of the type property of a selectAll event object.
		 */
		public static SELECT_ALL:string = "selectAll";
		
		/**
		 * The Event.SOUND_COMPLETE constant defines the value of the type property of a soundComplete event object.
		 */
		public static SOUND_COMPLETE:string = "soundComplete";
		
		/**
		 * The Event.STANDARD_ERROR_CLOSE constant defines the value of the type property of a standardErrorClose event object. 
		 */		
		public static STANDARD_ERROR_CLOSE : string = "standardErrorClose";
			
		/**
		 * The Event.STANDARD_INPUT_CLOSE constant defines the value of the type property of a standardInputClose event object. 
		 */		
		public static STANDARD_INPUT_CLOSE : string = "standardInputClose";
			
		/**
		 * The Event.STANDARD_OUTPUT_CLOSE constant defines the value of the type property of a standardOutputClose event object. 
		 */		
		public static STANDARD_OUTPUT_CLOSE : string = "standardOutputClose";
		
		/**
		 * The Event.TAB_CHILDREN_CHANGE constant defines the value of the type property of a tabChildrenChange event object.
		 */
		public static TAB_CHILDREN_CHANGE:string = "tabChildrenChange";
		
		/**
		 * The Event.TAB_ENABLED_CHANGE constant defines the value of the type property of a tabEnabledChange event object.
		 */
		public static TAB_ENABLED_CHANGE:string = "tabEnabledChange";
		
		/**
		 * The Event.TAB_INDEX_CHANGE constant defines the value of the type property of a tabIndexChange event object.
		 */
		public static TAB_INDEX_CHANGE:string = "tabIndexChange";
		
		/**
		 * The Event.UNLOAD constant defines the value of the type property of an unload event object.
		 */
		public static UNLOAD:string = "unload";
		
		/**
		 * The Event.USER_IDLE constant defines the value of the type property of a userIdle event object. 
		 */		
		public static USER_IDLE : string = "userIdle";
		
		/**
		 * The Event.USER_PRESENT constant defines the value of the type property of a userPresent event object. 
		 */		
		public static USER_PRESENT : string = "userPresent";
		
		/**
		 * The Event.FULL_SCREEN constant defines the value of the type property of a fullScreen event object.
		 */
		public static FULLSCREEN:string = "fullScreen";
		
		/**
		 * The Event.HTML_BOUNDS_CHANGE constant defines the value of the type property of an htmlBoundsChange event object. 
		 */		
		public static HTML_BOUNDS_CHANGE : string = "htmlBoundsChange";
			
		/**
		 * The Event.HTML_DOM_INITIALIZE constant defines the value of the type property of an htmlDOMInitialize event object. 
		 */		
		public static HTML_DOM_INITIALIZE : string = "htmlDOMInitialize";
		
		/**
		 * The Event.HTML_RENDER constant defines the value of the type property of an htmlRender event object. 
		 */		
		public static HTML_RENDER : string = "htmlRender";
		
		/**
		 * The Event.CONTEXT3D_CREATE constant defines the value of the type property of a context3Dcreate event object.
		 */
		public static CONTEXT3D_CREATE:string = "context3DCreate";
		
		/**
		 * The Event.TEXTURE_READY constant defines the value of the type property of a textureReady event object.
		 */
		public static TEXTURE_READY:string = "textureReady";
		
		/**
		 * The Event.VIDEO_FRAME constant defines the value of the type property of a videoFrame event object.
		 */
		public static VIDEO_FRAME:string = "videoFrame";
		
		/**
		 * The Event.SUSPEND constant defines the value of the type property of an suspend event object.
		 */
		public static SUSPEND:string = "suspend";
		
		/**
		 * The Event.CHANNEL_MESSAGE constant defines the value of the type property of a channelMessage event object.
		 */
		public static CHANNEL_MESSAGE:string = "channelMessage";
		
		/**
		 * The Event.CHANNEL_STATE constant defines the value of the type property of a channelState event object.
		 */
		public static CHANNEL_STATE:string = "channelState";
		
		/**
		 * The Event.WORKER_STATE constant defines the value of the type property of a workerState event object.
		 */
		public static WORKER_STATE:string = "workerState";
		
		/** JavaScript Event */
		public base:any = null;
		
		private _type:string = null;
		private _bubbles:boolean = false;
		private _cancelable:boolean = false;
		private _target:any = null;
		private _currentTarget:any = null;
		private _eventPhase:number = 0;
		private _prevented:boolean = false;
		private mStopsPropagation:boolean = false;
		private mStopsImmediatePropagation:boolean = false;

		/**
		 * Creates an Event object to pass as a parameter to event listeners.
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * 
		 */		
		constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
		{
			/**/ type = as(type, 'String'); bubbles = Boolean(bubbles); cancelable = Boolean(cancelable);
			this._eventPhase = 2; // EventPhase.AT_TARGET;
			this._type = type;
			this._bubbles = bubbles;
			this._cancelable = cancelable;
		}
		
		/**
		 * A utility function for implementing the toString() method in custom ActionScript 3.0 Event classes. 
		 * @param className
		 * @param args
		 * @return 
		 * 
		 */		
		public formatToString(className:string, ... args):string
		{
			/**/ className = as(className, 'String');
			var values:string = ' ';
			var len:number =  ((args.length) >> 0);
			for (var i:number = 0; i < len; ++i) {
				var a:string =  as(args[i], 'String');
				values += a + '=' + quotes.__bind(this)(this[a]) + '';
				if (i < len-1) values += ' ';
			}
			return '[' + className + values + ']';
			
			function quotes (v:any):string {
				if (typeof v == 'string') return '"'+v+'"';
				return v;
			}
		}
		
		/**
		 * Duplicates an instance of an Event subclass. 
		 * @return 
		 * 
		 */		
		public clone():Event
		{
			return new Event(this.type, this.bubbles, this.cancelable);
		}
		
		/**
		 * Returns a string containing all the properties of the Event object. 
		 * @return 
		 * 
		 */		
		public toString():string
		{
			return this.formatToString("Event", "type", "bubbles", "cancelable", "eventPhase");
		}
		
		/**
		 * The type of event. 
		 * @return 
		 * 
		 */		
		public get type():string  { return this._type; }
		
		/**
		 * Indicates whether an event is a bubbling event. 
		 * @return 
		 * 
		 */		
		public get bubbles():boolean  { return this._bubbles; }
		
		/**
		 * Indicates whether the behavior associated with the event can be prevented. 
		 * @return 
		 * 
		 */		
		public get cancelable():boolean  { return this._cancelable; }
		
		/**
		 * The event target. 
		 * @return 
		 * 
		 */		
		public get target():any  { return this._target; }
		public set target(value:any)  { this._target = value; }
		
		/**
		 * The object that is actively processing the Event object with an event listener. 
		 * @return 
		 * 
		 */		
		public get currentTarget():any  { return this._currentTarget; }
		public set currentTarget(value:any)  { this._currentTarget = value; }
		
		/**
		 * The current phase in the event flow. 
		 * @return 
		 * 
		 */		
		public get eventPhase():number
		{
			return this._eventPhase;
		}
		
		public set eventPhase (value:number)
		{
			/**/ value = ((value) >>> 0);
			if (value != 2 && value != 3) { // value != EventPhase.AT_TARGET && value != EventPhase.BUBBLING_PHASE
				return;
			}
			this._eventPhase = value;
		}
		
		/** Prevents listeners at the next bubble stage from receiving the event. */
		public stopPropagation():void
		{
			if (this.base && 'stopPropagation' in this.base) this.base.stopPropagation();
			this.mStopsPropagation = true;
		}
		
		/** Prevents any other listeners from receiving the event. */
		public stopImmediatePropagation():void
		{
			this.mStopsPropagation = this.mStopsImmediatePropagation = true;
		}
		
		/**
		 * Cancels an event's default behavior if that behavior can be canceled. 
		 * 
		 */		
		public preventDefault():void
		{
			if (this.base && 'preventDefault' in this.base) this.base.preventDefault();
			this._prevented = true;
		}
		
		/**
		 * Checks whether the preventDefault() method has been called on the event. 
		 * @return 
		 * 
		 */		
		public isDefaultPrevented():boolean
		{
			return this._prevented;
		}
		
		/**
		 * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow. 
		 * @return 
		 * 
		 */		
		public get stopsPropagation():boolean { return this.mStopsPropagation; }
		
		/**
		 * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow. 
		 * @return 
		 * 
		 */		
		public get stopsImmediatePropagation():boolean { return this.mStopsImmediatePropagation; }
	}

}