/// <reference path="../../base.d.ts" />
/// <reference path="../media/SoundTransform.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../events/MouseEvent.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
﻿
namespace flash.display
{
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import MouseEvent = flash.events.MouseEvent;
	export import Matrix = flash.geom.Matrix;
	export import Rectangle = flash.geom.Rectangle;
	export import SoundTransform = flash.media.SoundTransform;
	

	/**
	 * The SimpleButton class lets you control all instances of button symbols in a SWF file.
	 * In Flash Professional, you can give a button an instance name in the Property inspector. 
	 * SimpleButton instance names are displayed in the Movie Explorer and in the Insert Target Path dialog box in the Actions panel. 
	 * After you create an instance of a button in Flash Professional, you can use the methods and properties of the SimpleButton class to 
	 * manipulate buttons with ActionScript.
	 * 
	 * In ActionScript 3.0, you use the new SimpleButton() constructor to create a SimpleButton instance.
	 * 
	 * The SimpleButton class inherits from the InteractiveObject class.
	 * 
	 * Starting with Player version 11.2 / AIR version 3.2, the parent property of the states of a SimpleButton object will report null if 
	 * queried.
	 * 
	 * @author pkulikov
	 */
	export  class SimpleButton extends InteractiveObject
	{
		/**
		 * Specifies a display object that is used as the visual object for the button "Down" state —the state that the button is in when the user selects the hitTestState object. 
		 */		
		public downState : DisplayObject;

		/**
		 * A Boolean value that specifies whether a button is enabled. 
		 */		
		public enabled : boolean;

		/**
		 * Specifies a display object that is used as the hit testing object for the button. 
		 */		
		public hitTestState : DisplayObject;

		/**
		 * Specifies a display object that is used as the visual object for the button over state — the state that the button is in when the pointer is positioned over the button. 
		 */		
		public overState : DisplayObject;

		/**
		 * The SoundTransform object assigned to this button. 
		 */		
		public soundTransform : SoundTransform;

		/**
		 * Indicates whether other display objects that are SimpleButton or MovieClip objects can receive user input release events. 
		 */		
		public trackAsMenu : boolean;

		/**
		 * Specifies a display object that is used as the visual object for the button up state — the state that the button is in when the pointer is not positioned over the button. 
		 */		
		public upState : DisplayObject;

		/**
		 * A Boolean value that, when set to true, indicates whether the hand cursor is shown when the pointer rolls over a button. 
		 */		
		public useHandCursor : boolean;
		
		/**
		 * Private 
		 */		
		/*[internal]*/ protected __currentState : DisplayObject;
		/*[internal]*/ protected __ignoreEvent : boolean;
		
		/**
		 * Creates a new SimpleButton instance. 
		 * @param upState
		 * @param overState
		 * @param downState
		 * @param hitTestState
		 * 
		 */		
		constructor(upState:DisplayObject = null, overState:DisplayObject = null, downState:DisplayObject = null, hitTestState:DisplayObject = null)
		{
			/**/ upState = strict(upState, DisplayObject); overState = strict(overState, DisplayObject); downState = strict(downState, DisplayObject); hitTestState = strict(hitTestState, DisplayObject);
			/**/ this.downState === void 0 && (this.downState = null);
			/**/ this.enabled === void 0 && (this.enabled = false);
			/**/ this.hitTestState === void 0 && (this.hitTestState = null);
			/**/ this.overState === void 0 && (this.overState = null);
			/**/ this.soundTransform === void 0 && (this.soundTransform = null);
			/**/ this.trackAsMenu === void 0 && (this.trackAsMenu = false);
			/**/ this.upState === void 0 && (this.upState = null);
			/**/ this.useHandCursor === void 0 && (this.useHandCursor = false);
			super(); 
			this.upState = upState;
			this.overState = overState;
			this.downState = downState;
			this.hitTestState = hitTestState;
			
			this.addEventListener (MouseEvent.MOUSE_DOWN, this.__onMouseDown.__bind(this));
			this.addEventListener (MouseEvent.MOUSE_OUT, this.__onMouseOut.__bind(this));
			this.addEventListener (MouseEvent.MOUSE_OVER, this.__onMouseOver.__bind(this));
			this.addEventListener (MouseEvent.MOUSE_UP, this.__onMouseUp.__bind(this));
			
			this.enabled = true;
			this.trackAsMenu = false;
			this.useHandCursor = true;
			this.__setCurrentState(upState);
		}
		
		/*[internal]*/ /*override*/ protected __getBounds (rect:Rectangle, matrix:Matrix = null):void
		{
			// rect = strict(rect, Rectangle); matrix = strict(matrix, Matrix);
			super.__getBounds (rect, matrix);
			
			if (!this.__currentState) {
				
				return;
				
			}
			
			var childWorldTransform = Matrix.__pool.get();
			
			DisplayObject.__calculateAbsoluteTransform (this.__currentState.transform._matrix, matrix, childWorldTransform);
			
			this.__currentState.__getBounds (rect, childWorldTransform);
			
			Matrix.__pool.release(childWorldTransform);
		}
		
		/*[internal]*/ /*override*/ protected __setDirty(value:number, recursive:boolean = false):void
		{
			// value = ((value) >> 0); recursive = Boolean(recursive);
			super.__setDirty(value, recursive);
			
			if (value == 0) {
				
				if (this.__currentState) {
					
					this.__currentState.__setDirty(0);
					
				}
				
			}
		}
		
		/*[internal]*/ /*override*/ protected __predraw(ctx:WebGLContext2D, skipCache:any):boolean
		{
			// ctx = strict(ctx, WebGLContext2D);
			var skipChildCache = skipCache == undefined ? this._cacheNeed : skipCache;
			
			if (this.__currentState && this.__currentState._visible && !this.__currentState._maskParent) {
				
				if (this.__currentState.__predraw(ctx, skipChildCache)) {
					
					this.__setDirty(2);
					
				}
				
			}
			
			return this.__predrawDisplayObject(ctx, skipCache);
		}
		
		/*[internal]*/ /*override*/ protected __draw(ctx:WebGLContext2D, dirtyFlag:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); dirtyFlag = ((dirtyFlag) >> 0);
			if (this.__drawCache(ctx)) return false;
			if (!this.__currentState || !this.__currentState.visible || this.__currentState._maskParent) return false;
			
			ctx.save();
			this.__currentState.__updateContext(ctx);
			this.__currentState.__draw(ctx, dirtyFlag);
			this.__currentState.__setDirty(dirtyFlag);
			ctx.restore();
			
			return true;
		}
		
		/*[internal]*/ /*override*/ protected __doMouse(stageX:number, stageY:number, isHitArea:boolean = false):DisplayObject 
		{
			// stageX = (+(stageX)); stageY = (+(stageY)); isHitArea = Boolean(isHitArea);
			if (!isHitArea && (!this._visible || !this._mouseEnabled || this._maskParent)) {
				
				return null;
				
			}
			
			if (this.hitTestState) {
				
				this.hitTestState.__setRenderParent(this);
				var obj = this.hitTestState.__doMouse(stageX, stageY, true);
				this.hitTestState.__setRenderParent(this.hitTestState._parent);
				
				if (obj) {
					
					return this;
					
				}
				
			}
			
			if (this.__currentState && this.__currentState._visible && !this.__currentState._maskParent) {
				
				if (this.__currentState.__doMouse(stageX, stageY, isHitArea)) {
					
					if (this.__currentState.__insideVisibleArea(stageX, stageY, isHitArea)) {
						
						return this;
						
					}
					
				}
				
			}
			
			return null;
		}
		
		/*[internal]*/ /*override*/ protected __setStage (s : Stage, si : boolean) : boolean
		{
			// s = strict(s, Stage); si = Boolean(si);
			if (this._stage === s && this._stageInternal == si) {
				
				return false;
				
			}
			
			this._stage = s;
			this._stageInternal = si;
			
			if (this.__currentState) {
				
				this.__currentState.__setStage(s, true);
				
			}
			
			return true;
		}
		
		/*[internal]*/ /*override*/ protected __setWorldTransformInvalid ():void
		{
			if (this._worldTransformInvalid) {
				
				return;
				
			}
			
			if (this.__currentState) {
				
				this.__currentState.__setWorldTransformInvalid ();
				
			}
			
			this._worldTransformInvalid = true;
		}
		
		/*[internal]*/ protected __setCurrentState (value : DisplayObject) : void
		{
			// value = strict(value, DisplayObject);
			if (this.__currentState == value) {
				
				return;
				
			}
			
			if (this.__currentState) {
				
				this.__currentState.__setRenderParent(null);
				this.__currentState.__setStage(null, false);
				
			}
			
			if (value) {
				
				var vp = value._parent, vpc;
				if (vp && (vpc = vp._children)) {
					
					vp.__removeChildAt(vpc.indexOf(value));
					
				}
				
				value.__setRenderParent(this);
				value.__setStage(this._stage, true);
				
			}
			
			this.__currentState = value;
			this.__setDirty(2);
		}
		
		/*[internal]*/ protected __onMouseDown (event:MouseEvent):void
		{
			// event = strict(event, MouseEvent);
			this.__setCurrentState(this.downState);
		}
		
		/*[internal]*/ protected __onMouseOut (event:MouseEvent):void
		{
			// event = strict(event, MouseEvent);
			this.__ignoreEvent = false;
			
			if (this.__currentState != this.upState) {
				
				this.__setCurrentState(this.upState);
				
			}
		}
		
		/*[internal]*/ protected __onMouseOver (event:MouseEvent):void
		{
			// event = strict(event, MouseEvent);
			if (event.buttonDown) {
				
				this.__ignoreEvent = true;
				
			}
			
			if (this.__currentState != this.overState && this.overState && !this.__ignoreEvent) {
				
				this.__setCurrentState(this.overState);
				
			}
		}
		
		/*[internal]*/ protected __onMouseUp (event:MouseEvent):void
		{
			// event = strict(event, MouseEvent);
			this.__ignoreEvent = false;
			
			this.__setCurrentState(this.overState || this.upState);
		}
		
		/*[internal]*/ /*override*/ protected __unionFilterBounds (source:Rectangle, destination:Rectangle = null):Rectangle
		{
			// source = strict(source, Rectangle); destination = strict(destination, Rectangle);
			destination = super.__unionFilterBounds(source, destination);
			
			if (!this.__currentState || !this.__currentState._visible || this.__currentState._maskParent || !this.__currentState._filtersPure || !this.__currentState._filtersPure.length) {
				
				return destination;
				
			}
			
			destination.__unionInPlace(this.__currentState.__unionFilterBounds(destination, destination));
			return destination;
		}
		
		/*override*/ public toString ():string
		{
			return '[object SimpleButton]';
		}
	}	
}