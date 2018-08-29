/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />

namespace flash.display
{
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import Matrix = flash.geom.Matrix;
	export import Point = flash.geom.Point;
	export import Rectangle = flash.geom.Rectangle;
	
	
	/**
	 * The Bitmap class represents display objects that represent bitmap images. These can be images that you load with 
	 * the flash.display.Loader class, or they can be images that you create with the Bitmap() constructor.
	 * The Bitmap() constructor allows you to create a Bitmap object that contains a reference to a BitmapData object. 
	 * After you create a Bitmap object, use the addChild() or addChildAt() method of the parent DisplayObjectContainer instance 
	 * to place the bitmap on the display list.
	 * 
	 * A Bitmap object can share its BitmapData reference among several Bitmap objects, independent of translation or rotation properties. 
	 * Because you can create multiple Bitmap objects that reference the same BitmapData object, 
	 * multiple display objects can use the same complex BitmapData object without incurring the memory overhead 
	 * of a BitmapData object for each display object instance.
	 * 
	 * A BitmapData object can be drawn to the screen by a Bitmap object in one of two ways: 
	 * by using the vector renderer as a fill-bitmap shape, or by using a faster pixel-copying routine. 
	 * The pixel-copying routine is substantially faster than the vector renderer, 
	 * but the Bitmap object must meet certain conditions to use it:
	 * 
	 * No stretching, rotation, or skewing can be applied to the Bitmap object.
	 * No color transform can be applied to the Bitmap object.
	 * No blend mode can be applied to the Bitmap object.
	 * No clipping can be done through mask layers or setMask() methods.
	 * The image itself cannot be a mask.
	 * The destination coordinates must be on a whole pixel boundary.
	 * If you load a Bitmap object from a domain other than that of the Loader object used to load the image, 
	 * and there is no URL policy file that permits access to the domain of the Loader object, 
	 * then a script in that domain cannot access the Bitmap object or its properties and methods. 
	 * For more information, see the Flash Player Developer Center Topic: Security.
	 * 
	 * Note: The Bitmap class is not a subclass of the InteractiveObject class, so it cannot dispatch mouse events. 
	 * However, you can use the addEventListener() method of the display object container that contains the Bitmap object. 
	 * @author pkulikov
	 * 
	 */	
	export  class Bitmap extends DisplayObject
	{
		/*[internal]*/ protected _bitmapData:BitmapData;
		/*[internal]*/ protected _smoothing:boolean;
		
		/**
		 * Initializes a Bitmap object to refer to the specified BitmapData object.
		 * @param bitmapData
		 * @param pixelSnapping
		 * @param smoothing
		 * 
		 */		
		constructor(bitmapData:BitmapData = null, pixelSnapping:string = "auto", smoothing:boolean = false)
		{
			/**/ bitmapData = strict(bitmapData, BitmapData); pixelSnapping = as(pixelSnapping, 'String'); smoothing = Boolean(smoothing);
			super(); 
			this.bitmapData = bitmapData;
			this._smoothing = smoothing;
		}
		
		/**
		 * Controls whether or not the Bitmap object is snapped to the nearest pixel. 
		 * @return 
		 * 
		 */		
		public get pixelSnapping():string { return null; }
		public set pixelSnapping(param1:string) {/**/ param1 = as(param1, 'String');/**/ }
		
		/**
		 * Controls whether or not the bitmap is smoothed when scaled. 
		 * @return 
		 * 
		 */		
		public get smoothing():boolean { return this._smoothing; }
		public set smoothing(value:boolean)
		{
			/**/ value = Boolean(value);
			this._smoothing = value;
			this.__setDirty(1);
		}
		
		/**
		 * The BitmapData object being referenced. 
		 * @return 
		 * 
		 */		
		public get bitmapData():BitmapData  { return this._bitmapData; }
		public set bitmapData(value:BitmapData)
		{
			/**/ value = strict(value, BitmapData);
			if (this._bitmapData == value) {
				
				return;
				
			}
			
			this._bitmapData = value;
			this.__setDirty(2);
		}
		
		/*[internal]*/ /*override*/ protected __getBounds (rect:Rectangle, matrix:Matrix = null):void
		{
			// rect = strict(rect, Rectangle); matrix = strict(matrix, Matrix);
			if (!this._bitmapData) {
				
				return;
				
			}
			
			var bounds = Rectangle.__pool.get ();
			bounds.__setTo (0, 0, this._bitmapData.width, this._bitmapData.height);
			
			if (matrix) {
				
				bounds.__transform (bounds, matrix);
				
			}
			
			rect.__expand (bounds.x, bounds.y, bounds.width, bounds.height);
			
			Rectangle.__pool.release (bounds);
		}
		
		/*[internal]*/ /*override*/ protected __setDirty(value:number, recursive:boolean = false):void
		{
			// value = ((value) >> 0); recursive = Boolean(recursive);
			super.__setDirty(value, recursive);
			
			if (value == 0) {
				
				if (this._bitmapData) {
					
					this._bitmapData._dirtyDisplayObject = false;
					
				}
				
			}
		}
		
		/*[internal]*/ /*override*/ protected __predraw(ctx:WebGLContext2D, skipCache:any):boolean
		{
			// ctx = strict(ctx, WebGLContext2D);
			if (this._bitmapData && !this._bitmapData._invalid) {
				
				this._bitmapData.__getTexture();
				
				if (this._bitmapData._dirtyDisplayObject) {
					
					this.__setDirty(2);
					
				}
				
			}
			
			return this.__predrawDisplayObject(ctx, skipCache);
		}
		
		/*[internal]*/ /*override*/ protected __draw(ctx:WebGLContext2D, dirtyFlag:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); dirtyFlag = ((dirtyFlag) >> 0);
			if (this.__drawCache(ctx)) return false;
			if (!this._bitmapData || this._bitmapData._invalid) return false;
			ctx.drawImage(this._bitmapData, this._smoothing);
			return true;
		}
		
		/*[internal]*/ /*override*/ protected __doMouse(stageX:number, stageY:number, isHitArea:boolean = false):DisplayObject 
		{
			// stageX = (+(stageX)); stageY = (+(stageY)); isHitArea = Boolean(isHitArea);
			if (!isHitArea && (!this._visible || this._maskParent)) {
				
				return null;
				
			}
			
			var target;
			if (this._bitmapData && !this._bitmapData._invalid) {
				
				var globalPoint = Point.__pool.get();
				var localPoint = Point.__pool.get();
				
				globalPoint.__setTo(stageX, stageY);
				this.__globalToLocal(globalPoint, localPoint);
				
				if (this._bitmapData._rect.__containsPoint(localPoint)) {
					
					target = this;
					
				}
				
			}
			
			Point.__pool.release(globalPoint);
			Point.__pool.release(localPoint);
			
			return target;
		}
		
		/*override*/ public toString ():string
		{
			return '[object Bitmap]';
		}
	}
}