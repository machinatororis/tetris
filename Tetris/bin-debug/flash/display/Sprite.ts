/// <reference path="../../base.d.ts" />
/// <reference path="../media/SoundTransform.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />

namespace flash.display
{
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import Point = flash.geom.Point;
	export import Rectangle = flash.geom.Rectangle;
	export import SoundTransform = flash.media.SoundTransform;
	
	
	/**
	 * The Sprite class is a basic display list building block: a display list node that can display graphics and can also contain children.
	 * 
	 * A Sprite object is similar to a movie clip, but does not have a timeline. Sprite is an appropriate base class for objects that 
	 * do not require timelines. For example, Sprite would be a logical base class for user interface (UI) components that 
	 * typically do not use the timeline.
	 * 
	 * The Sprite class is new in ActionScript 3.0. It provides an alternative to the functionality of the MovieClip class, 
	 * which retains all the functionality of previous ActionScript releases to provide backward compatibility. 
	 * @author pkulikov
	 * 
	 */	
	export  class Sprite extends DisplayObjectContainer
	{
		/**
		 * Helpers 
		 */		
		/*[internal]*/ protected static sDragObject : Sprite;
		/*[internal]*/ protected static sDragLockCenter : boolean;
		/*[internal]*/ protected static sDragBounds : Rectangle = asc.sti(Sprite,()=>{ Sprite.sDragBounds = new Rectangle; });
		/*[internal]*/ protected static sDragStagePoint : Point = asc.sti(Sprite,()=>{ Sprite.sDragStagePoint = new Point; });
		
		/**
		 * Specifies the Graphics object that belongs to this sprite where vector drawing commands can occur.
		 */		
		public get graphics () : Graphics { return this._graphics || (this._graphics=new Graphics); }
		
		/**
		 * Helpers 
		 */		
		/*[internal]*/ protected _hitArea : Sprite;
		/*[internal]*/ protected _buttonMode : boolean;
		/*[internal]*/ protected _useHandCursor : boolean;
		
		/**
		 * Creates a new Sprite instance.
		 */		
		constructor()
		{
			/**/ this._useHandCursor === void 0 && (this._useHandCursor = true);
			super(); 
			
		}
		
		/**
		 * Specifies the button mode of this sprite. 
		 * @return 
		 * 
		 */		
		public get buttonMode():boolean  { return this._buttonMode; }
		public set buttonMode(value:boolean)  { /**/ value = Boolean(value); this._buttonMode = value; }
		
		/**
		 * Lets the user drag the specified sprite. 
		 * @param lockCenter
		 * @param bounds
		 * 
		 */		
		public startDrag(lockCenter:boolean = false, bounds:Rectangle = null):void
		{
			/**/ lockCenter = Boolean(lockCenter); bounds = strict(bounds, Rectangle);
			if (Sprite.sDragObject) {
				
				Sprite.sDragObject.stopDrag();
				
			}
			
			if (!this._parent) {
				
				return;
				
			}
			
			Sprite.sDragObject = this;
			
			if (bounds) {
				
				Sprite.sDragBounds.__copyFrom(bounds);
				
			} else {
				
				Sprite.sDragBounds.setEmpty();
				
			}
			
			if (Sprite.sDragLockCenter = lockCenter) {
				
				Sprite.sDragStagePoint.__setTo(0x8000000, 0x8000000); // force update
				
			} else {
				
				var p1 = Point.__pool.get();
				var p2 = Point.__pool.get();
				
				var s = Stage.sCurrent;
				
				p1.__setTo(s.mouseX, s.mouseY);
				Sprite.sDragObject._parent.__globalToLocal(p1, p2);
				Sprite.sDragStagePoint.__setTo(p2.x, p2.y);
				
				Point.__pool.release(p1);
				Point.__pool.release(p2);
				
			}
			
			Sprite.__updateDragObject();
		}
		
		/**
		 * Ends the startDrag() method. 
		 * 
		 */		
		public stopDrag():void
		{
			Sprite.sDragObject = null;
		}
		
		/**
		 * Lets the user drag the specified sprite on a touch-enabled device. 
		 * @param touchPointID
		 * @param lockCenter
		 * @param bounds
		 * 
		 */		
		public startTouchDrag(touchPointID:number, lockCenter:boolean = false, bounds:Rectangle = null):void  {/**/ touchPointID = ((touchPointID) >> 0); lockCenter = Boolean(lockCenter); bounds = strict(bounds, Rectangle);/**/ }
		
		/**
		 * Ends the startTouchDrag() method, for use with touch-enabled devices. 
		 * @return 
		 * 
		 */		
		public stopTouchDrag(touchPointID:number):void  {/**/ touchPointID = ((touchPointID) >> 0);/**/ }
		
		/**
		 * Specifies the display object over which the sprite is being dragged, or on which the sprite was dropped. 
		 * @return 
		 * 
		 */		
		public get dropTarget():DisplayObject { return null; }
		
		/**
		 * Designates another sprite to serve as the hit area for a sprite. 
		 * @return 
		 * 
		 */		
		public get hitArea():Sprite  { return this._hitArea; }
		public set hitArea(value:Sprite)  { /**/ value = strict(value, Sprite); this._hitArea = value; }
		
		/**
		 * A Boolean value that indicates whether the pointing hand (hand cursor) appears when the pointer rolls over a sprite 
		 * in which the buttonMode property is set to true. 
		 * @return 
		 * 
		 */		
		public get useHandCursor():boolean  { return this._useHandCursor; }
		public set useHandCursor(value:boolean)  { /**/ value = Boolean(value); this._useHandCursor = value; }
		
		/**
		 * Controls sound within this sprite. 
		 * @return 
		 * 
		 */		
		public get soundTransform() : SoundTransform { return null; }
		public set soundTransform(value:SoundTransform) {/**/ value = strict(value, SoundTransform);/**/ }
		
		/*[internal]*/ /*override*/ protected __draw(ctx:WebGLContext2D, dirtyFlag:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); dirtyFlag = ((dirtyFlag) >> 0);
			if (this.__drawCache(ctx)) return false;
			
			// graphics
			if (this._graphics && this._graphics._commandsSize) {
				
				ctx.drawGraphics(this, this._graphics);
				
			}
			
			// children
			var len = this._childrenLength;
			for (var i = 0; i < len; i++) {
				
				var child = this._children[i];
				if (!child._visible || child._maskParent) continue;
				ctx.save();
				child.__updateContext(ctx);
				child.__draw(ctx, dirtyFlag);
				child.__setDirty(dirtyFlag);
				ctx.restore();
				
			}
			
			this.__setDirty(dirtyFlag);
			
			return true;
		}
		
		/*[internal]*/ /*override*/ protected __doMouse(stageX:number, stageY:number, isHitArea:boolean = false):DisplayObject 
		{
			// stageX = (+(stageX)); stageY = (+(stageY)); isHitArea = Boolean(isHitArea);
			if (!isHitArea && (!this._visible || (!this._mouseEnabled && !this._mouseChildren) || this._maskParent)) {
				
				return null;
				
			}
			
			if (this._hitArea && this._hitArea != this) {
				
				if (this._hitArea.__doMouse(stageX, stageY, true)) {
					
					return this;
					
				}
				
				return null;
				
			}
			
			return super.__doMouse(stageX, stageY, isHitArea);
		}
		
		/**
		 * Если флаг lockCenter == true:
		 * при startDrag или MOUSE_MOVE, перемещаем объект к мышке.
		 * 
		 * Если флаг lockCenter == false:
		 * при startDrag то ничего не делаем, а смещаем на difference в последующих MOUSE_MOVE.
		 */		
		/*[internal]*/ protected static __updateDragObject ():void
		{
			if (!Sprite.sDragObject) {
				
				return;
				
			}
			
			if (!Sprite.sDragObject._parent) {
				
				Sprite.sDragObject.stopDrag();
				return;
				
			}
			
			// helpers
			var p1 = Point.__pool.get();
			var p2 = Point.__pool.get();
			
			// stage mouse
			var s = Stage.sCurrent;
			var mouseX = s.mouseX;
			var mouseY = s.mouseY;
			
			// local mouse
			p1.__setTo(mouseX, mouseY);
			Sprite.sDragObject._parent.__globalToLocal(p1, p2);
			mouseX = p2.x;
			mouseY = p2.y;
			
			// local dx / dy
			var dx = mouseX - Sprite.sDragStagePoint.x;
			var dy = mouseY - Sprite.sDragStagePoint.y;
			if (dx == 0 && dy == 0) {
				
				return;
				
			}
			
			// moving
			var m = Sprite.sDragObject.transform._matrix;
			if (Sprite.sDragLockCenter) {
				
				m.tx = mouseX;
				m.ty = mouseY;
				
			} else {
				
				m.tx += dx;
				m.ty += dy;
				
			}
			
			// bounds
			if (!Sprite.sDragBounds.isEmpty()) {
				
				var left = Sprite.sDragBounds.x;
				var top = Sprite.sDragBounds.y;
				var right = Sprite.sDragBounds.x + Sprite.sDragBounds.width;
				var bottom = Sprite.sDragBounds.y + Sprite.sDragBounds.height;
				if (m.tx < left) m.tx = left;
				if (m.tx > right) m.tx = right;
				if (m.ty < top) m.ty = top;
				if (m.ty > bottom) m.ty = bottom;
				
			}
			
			// dirty
			Sprite.sDragObject.__setDirty(1);
			
			// save
			Sprite.sDragStagePoint.__setTo(mouseX, mouseY);
			
			// free
			Point.__pool.release(p1);
			Point.__pool.release(p2);
		}
		
		/*override*/ public toString ():string
		{
			return '[object Sprite]';
		}
	}
}