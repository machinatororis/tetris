/// <reference path="../../base.d.ts" />
/// <reference path="../utils/setTimeout.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../display3D/Context3D.ts" />

namespace flash.display
{
	export import Context3D = flash.display3D.Context3D;
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import setTimeout = flash.utils.setTimeout;
	
	
	/**
	 * The Stage3D class provides a display area and a programmable rendering context for drawing 2D and 3D graphics.
	 * Stage3D provides a high-performance rendering surface for content rendered using the Context3D class. 
	 * This surface uses the graphics processing unit (GPU) when possible. The runtime stage provides a fixed number of Stage3D objects. 
	 * The number of instances varies by the type of device. Desktop computers typically provide four Stage3D instances.
	 * 
	 * Content drawn to the Stage3D viewport is composited with other visible graphics objects in a predefined order. 
	 * The most distant are all StageVideo surfaces. 
	 * Stage3D comes next, with traditional Flash display object content being rendered last, on top of all others. 
	 * StageVideo and Stage3D layers are rendered with no transparency; 
	 * thus a viewport completely obscures any other Stage3D or StageVideo viewports positioned underneath it. 
	 * Display list content is rendered with transparency.
	 * 
	 * Note: You can use the visible property of a Stage3D object to remove it from the display temporarily, 
	 * such as when playing a video using the StageVideo class.
	 * 
	 * A Stage3D object is retrieved from the Player stage using its stage3Ds member. 
	 * Use the Stage3D instance to request an associated rendering context and to position the display on the runtime stage.
	 * @author pkulikov
	 * 
	 */	
	export  class Stage3D extends EventDispatcher
	{
		private static sID:number = 0;
		
		private __id:number;
		private __stage:Stage;
		private __context3D:Context3D;
		private __canvas:HTMLCanvasElement;
		
		private __x:number;
		private __y:number;
		private __visible:boolean;
		
		/**
		 * Constructor
		 * @param stage
		 * 
		 */		
		constructor(stage:Stage)
		{
			/**/ stage = strict(stage, Stage);
			/**/ this.__id === void 0 && (this.__id = 0);
			/**/ this.__stage === void 0 && (this.__stage = null);
			/**/ this.__context3D === void 0 && (this.__context3D = null);
			/**/ this.__canvas === void 0 && (this.__canvas = null);
			/**/ this.__x === void 0 && (this.__x = 0);
			/**/ this.__y === void 0 && (this.__y = 0);
			/**/ this.__visible === void 0 && (this.__visible = false);
			super(); 
			this.__stage = stage;
			this.__id =(( Stage3D.sID++) >> 0);
			this.__visible = true;
		}
		
		/**
		 * The Context3D object associated with this Stage3D instance. 
		 * @return 
		 * 
		 */		
		public get context3D():Context3D 
		{
			return this.__context3D;
		}
		
		/**
		 * Request the creation of a Context3D object for this Stage3D instance. 
		 * @param context3DRenderMode
		 * @param profile
		 * 
		 */		
		public requestContext3D(context3DRenderMode:string = 'auto', profile:string = 'baseline'):void
		{
			/**/ context3DRenderMode = as(context3DRenderMode, 'String'); profile = as(profile, 'String');
			// create canvas
			this.__canvas = as(this.__stage.__getBodyInternal().appendChild(document.createElement('canvas')) , HTMLCanvasElement);
			this.__canvas.style.width = this.__canvas.style.height = '100%';
			this.__canvas.style.position = 'absolute';
			this.__canvas.style.zIndex = this.__id;
			
			// create Context3D
			this.__context3D = new Context3D(this.__canvas, {
				alpha: false,
				premultipliedAlpha: true,
				depth: true,
				stencil: true
			}, this);
			
			// complete
			setTimeout (function () {
				
				this.dispatchEvent(new Event(Event.CONTEXT3D_CREATE));
				
			}.__bind(this), 1);
		}
		
		/**
		 * Request the creation of a Context3D object for this Stage3D instance. 
		 * @param param1
		 * 
		 */		
		public requestContext3DMatchingProfiles(param1:string[]):void
		{
			this.requestContext3D();
		}
		
		/**
		 * The horizontal coordinate of the Stage3D display on the stage, in pixels. 
		 * @return 
		 * 
		 */		
		public get x():number { return this.__x; }
		public set x(value:number) {
			/**/ value = (+(value));
			if (this.__x == value) return;
			
			this.__x =(( value) >> 0);
			
			if (this.context3D != null) {
				
				this.context3D.__updateBackbufferViewport ();
				
			}
		}
		
		/**
		 * The vertical coordinate of the Stage3D display on the stage, in pixels. 
		 * @return 
		 * 
		 */		
		public get y():number  { return this.__y; }
		public set y(value:number) {
			/**/ value = (+(value));
			if (this.__y == value) return;
			
			this.__y =(( value) >> 0);
			
			if (this.__context3D != null) {
				
				this.__context3D.__updateBackbufferViewport ();
				
			}
		}
		
		/**
		 * Specifies whether this Stage3D object is visible. 
		 * @return 
		 * 
		 */		
		public get visible():boolean  { return this.__visible; }
		public set visible(value:boolean) {
			/**/ value = Boolean(value);
			this.__canvas.style.visibility = (this.__visible = value) ? 'visible' : 'hidden';
		}
	}
}