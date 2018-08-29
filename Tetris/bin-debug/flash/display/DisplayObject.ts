/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Vector3D.ts" />
/// <reference path="../geom/Transform.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../filters/ColorMatrixFilter.ts" />
/// <reference path="../filters/BitmapFilter.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
/// <reference path="../__native/format/swf/data/filters/IFilter.ts" />
/// <reference path="../__native/display/SystemBitmapData.ts" />

namespace flash.display
{
	export import SystemBitmapData = flash.__native.display.SystemBitmapData;
	export import IFilter = flash.__native.format.swf.data.filters.IFilter;
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import BitmapFilter = flash.filters.BitmapFilter;
	export import ColorMatrixFilter = flash.filters.ColorMatrixFilter;
	export import Matrix = flash.geom.Matrix;
	export import Point = flash.geom.Point;
	export import Rectangle = flash.geom.Rectangle;
	export import Transform = flash.geom.Transform;
	export import Vector3D = flash.geom.Vector3D;
	
	
	/**
	 * The DisplayObject class is the base class for all objects that can be placed on the display list. 
	 * The display list manages all objects displayed in the Flash runtimes. Use the DisplayObjectContainer class to arrange the 
	 * display objects in the display list. DisplayObjectContainer objects can have child display objects, while other display objects, 
	 * such as Shape and TextField objects, are "leaf" nodes that have only parents and siblings, no children.
	 * 
	 * The DisplayObject class supports basic functionality like the x and y position of an object, as well as more advanced 
	 * properties of the object such as its transformation matrix.
	 * 
	 * DisplayObject is an abstract base class; therefore, you cannot call DisplayObject directly. 
	 * Invoking new DisplayObject() throws an ArgumentError exception.
	 * 
	 * All display objects inherit from the DisplayObject class.
	 * 
	 * The DisplayObject class itself does not include any APIs for rendering content onscreen. For that reason, 
	 * if you want create a custom subclass of the DisplayObject class, you will want to extend one of its subclasses that do have APIs 
	 * for rendering content onscreen, such as the Shape, Sprite, Bitmap, SimpleButton, TextField, or MovieClip class.
	 * 
	 * The DisplayObject class contains several broadcast events. Normally, the target of any particular event is a 
	 * specific DisplayObject instance. For example, the target of an added event is the specific DisplayObject instance that was 
	 * added to the display list. Having a single target restricts the placement of event listeners to that target and in some 
	 * cases the target's ancestors on the display list. With broadcast events, however, the target is not a specific DisplayObject instance, 
	 * but rather all DisplayObject instances, including those that are not on the display list. 
	 * This means that you can add a listener to any DisplayObject instance to listen for broadcast events. 
	 * In addition to the broadcast events listed in the DisplayObject class's Events table, the DisplayObject class also inherits two 
	 * broadcast events from the EventDispatcher class: activate and deactivate.
	 * 
	 * Some properties previously used in the ActionScript 1.0 and 2.0 MovieClip, TextField, and Button classes 
	 * (such as _alpha, _height, _name, _width, _x, _y, and others) have equivalents in the ActionScript 3.0 DisplayObject class that 
	 * are renamed so that they no longer begin with the underscore (_) character.
	 * 
	 * For more information, see the "Display Programming" chapter of the ActionScript 3.0 Developer's Guide.
	 * @author pkulikov
	 * 
	 */	
	export  class DisplayObject extends EventDispatcher implements IBitmapDrawable
	{
		implements_flash_display_IBitmapDrawable = null;
		/*[internal]*/ protected static sID : number = 0;
		/*[internal]*/ protected static sCachedObjects : any[] = [];
		/*[internal]*/ protected static sDOMElements : any[] = [];
		/*[internal]*/ protected static sTimelineObjects : any[] = [];
		/*[internal]*/ protected static sProxyFilterList : any[] = [];
		/*[internal]*/ protected static sDebugCache : boolean = false;
		/*[internal]*/ protected static sEventStage : Event;
		/*[internal]*/ protected static sEventNoStage : Event;
		/*[internal]*/ protected static sBroadcastEvents : any;
		/*[internal]*/ protected static sBroadcastEventsList : any[];
		static __block0 = function () { function $() {
			DisplayObject.sEventStage = new Event(Event.ADDED_TO_STAGE);
			DisplayObject.sEventNoStage = new Event(Event.REMOVED_FROM_STAGE);
			
			DisplayObject.sBroadcastEventsList = [
				'activate', 'deactivate', 'keyDown', 'keyUp',
				'enterFrame', 'exitFrame', 'frameConstructed', 'render'
			];
			
			DisplayObject.sBroadcastEvents = {};
			
			for (var i = 0, len = DisplayObject.sBroadcastEventsList.length; i < len; ++i) {
				
				DisplayObject.sBroadcastEvents[DisplayObject.sBroadcastEventsList[i]] = [];
				
			}
		}asc.stb(DisplayObject,$); }();
		
		/**
		 * An object with properties pertaining to a display object's matrix, color transform, and pixel bounds. 
		 */		
		/*[internal]*/ public transform : Transform;
		
		/*[internal]*/ protected _name : string;
		/*[internal]*/ protected _stage : Stage;
		/*[internal]*/ protected _root : boolean;
		/*[internal]*/ protected _loaderInfo : LoaderInfo;
		/*[internal]*/ protected _parent : DisplayObjectContainer;
		/*[internal]*/ protected _renderParent : DisplayObject;
		/*[internal]*/ protected _stageInternal : boolean; // IMPORTANT: must be initialized
		
		/*[internal]*/ protected _graphics : Graphics;
		/*[internal]*/ protected _mask : DisplayObject;
		/*[internal]*/ protected _maskParent : DisplayObject;
		/*[internal]*/ protected _visible : boolean;
		/*[internal]*/ protected _offStageEvents : boolean;
		/*[internal]*/ protected _blendMode : string;
		/*[internal]*/ protected _cacheAsBitmap : boolean;
		/*[internal]*/ protected _scrollRect : Rectangle;
		/*[internal]*/ protected _cropBounds : boolean;
		/*[internal]*/ protected _rsin : number;
		/*[internal]*/ protected _rcos : number;
		
		/*[internal]*/ protected _worldTransformInvalid : boolean;
		/*[internal]*/ protected _worldTransform : Matrix;
		/*[internal]*/ protected _renderTransform : Matrix;
		/*[internal]*/ protected _cacheTransform : Matrix;
		
		/*[internal]*/ protected _filters : any[];
		/*[internal]*/ protected _filtersPure : any[];
		/*[internal]*/ protected _filterHashes : any[];
		
		/*[internal]*/ protected _dirty : boolean;
		/*[internal]*/ protected _dirtyContent : boolean;
		/*[internal]*/ protected _dirtyCache : boolean;
		
		/*[internal]*/ protected _cache : BitmapData;
		/*[internal]*/ protected _cacheNeed : boolean;
		/*[internal]*/ protected _cacheCreating : boolean;
		/*[internal]*/ protected _cacheWorldTransform : Matrix; // with a matrix was created
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor()
		{
			/**/ this._stageInternal === void 0 && (this._stageInternal = false);
			/**/ this._visible === void 0 && (this._visible = true);
			/**/ this._offStageEvents === void 0 && (this._offStageEvents = true);
			/**/ this._blendMode === void 0 && (this._blendMode = 'normal');
			/**/ this._cacheAsBitmap === void 0 && (this._cacheAsBitmap = false);
			/**/ this._rsin === void 0 && (this._rsin = 0);
			/**/ this._rcos === void 0 && (this._rcos = 1);
			/**/ this._worldTransform === void 0 && (this._worldTransform = new Matrix);
			/**/ this._renderTransform === void 0 && (this._renderTransform = new Matrix);
			super(); 
			if (!this._name) {
				
				this._name = 'instance' + (DisplayObject.sID++);
				
			}
			
			if (!this.transform) {
				
				this.transform = new Transform(this);
				
			}
		}
		
		/**
		 * The Stage of the display object. 
		 * @return 
		 * 
		 */		
		public get stage():Stage { return this._stageInternal ? null : this._stage; }
		
		/**
		 * For a display object in a loaded SWF file, the root property is the top-most display object in the portion of the 
		 * display list's tree structure represented by that SWF file. 
		 * @return 
		 * 
		 */		
		public get root():DisplayObject
		{
			return this.__getRoot();
		}
		
		/**
		 * Indicates the instance name of the DisplayObject. 
		 * @return 
		 * 
		 */		
		public get name():string  { return this._name; }
		public set name(v:string)  { /**/ v = as(v, 'String'); this._name = v; }
		
		/**
		 *  Indicates the DisplayObjectContainer object that contains this display object. 
		 * @return 
		 * 
		 */		
		public get parent():DisplayObjectContainer { return this._parent; }

		/**
		 * The calling display object is masked by the specified mask object. 
		 * @return 
		 * 
		 */		
		public get mask () : DisplayObject { return this._mask; }
		public set mask (value : DisplayObject) { /**/ value = strict(value, DisplayObject); this.__setMask(value); }
		
		/**
		 * Whether or not the display object is visible. 
		 * @return 
		 * 
		 */		
		public get visible():boolean  { return this._visible; }
		public set visible(v:boolean)
		{
			/**/ v = Boolean(v);
			if (this._visible == v) {
				
				return;
				
			}
			
			this._visible = v;
			this.__setDirty(1, true); // IMPORTANT: upwards
		}
		
		/**
		 * Indicates the x coordinate of the DisplayObject instance relative to the local coordinates of the parent DisplayObjectContainer. 
		 * @return 
		 * 
		 */		
		public get x():number  { return this.transform ? this.transform._matrix.tx : 0; }
		public set x(v:number)
		{
			/**/ v = (+(v));
			if (!this.transform) {
				
				this.transform = new Transform(this);
				
			}
			
			var m = this.transform._matrix;
			if (m.tx == v) {
				
				return;
				
			}
			
			m.tx = v;
			this.__setDirty(1);
		}
		
		/**
		 * Indicates the y coordinate of the DisplayObject instance relative to the local coordinates of the parent DisplayObjectContainer. 
		 * @return 
		 * 
		 */		
		public get y():number  { return this.transform ? this.transform._matrix.ty : 0; }
		public set y(v:number)
		{
			/**/ v = (+(v));
			if (!this.transform) {
				
				this.transform = new Transform(this);
				
			}
			
			var m = this.transform._matrix;
			
			if (m.ty == v) {
				
				return;
				
			}
			
			m.ty = v;
			this.__setDirty(1);
		}
		
		/**
		 * Indicates the z coordinate position along the z-axis of the DisplayObject instance relative to the 3D parent container. 
		 * @return 
		 * 
		 */		
		public get z():number  { return 0; }
		public set z(v:number)  { /**/ v = (+(v)); /**/ }
		
		/**
		 * Indicates the horizontal scale (percentage) of the object as applied from the registration point. 
		 * @return 
		 * 
		 */		
		public get scaleX():number
		{
			if (!this.transform) {
				
				return 1;
				
			}
			
			var m = this.transform._matrix, ma = m.a, mb = m.b;
			if (mb == 0) {
				
				return ma;
				
			}
			
			return Math.sqrt(ma * ma + mb * mb);
		}
		
		public set scaleX(v:number)
		{
			/**/ v = (+(v));
			if (!this.transform) {
				
				this.transform = new Transform(this);
				
			}
			
			var m = this.transform._matrix;
			if (m.c == 0) {
				
				if (m.a == v) {
					
					return;
					
				}
				
				m.a = v;
				
			} else {
				
				var a = this._rcos * v;
				var b = this._rsin * v;
				
				if (m.a == a && m.b == b) {
					
					return;
					
				}
				
				m.a = a;
				m.b = b;
				
			}
			
			this.__setDirty(2);
		}
		
		/**
		 * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object. 
		 * @return 
		 * 
		 */		
		public get scaleY():number
		{
			if (!this.transform) {
				
				return 1;
				
			}
			
			var m = this.transform._matrix, mc = m.c, md = m.d;
			
			if (mc == 0) {
				
				return md;
				
			}
			
			return Math.sqrt(mc * mc + md * md);
		}
		
		public set scaleY(v:number)
		{
			/**/ v = (+(v));
			if (!this.transform) {
				
				this.transform = new Transform(this);
				
			}
			
			var m = this.transform._matrix;
			if (m.c == 0) {
				
				if (m.d == v) {
					
					return;
					
				}
				
				m.d = v;
				
			} else {
				
				var c = -this._rsin * v;
				var d = this._rcos * v;
				
				if (m.c == c && m.d == d) {
					
					return;
					
				}
				
				m.c = c;
				m.d = d;
				
			}
			
			this.__setDirty(2);
		}
		
		/**
		 * Indicates the depth scale (percentage) of an object as applied from the registration point of the object. 
		 * @return 
		 * 
		 */		
		public get scaleZ():number  { return 1; }
		public set scaleZ(v:number)  { /**/ v = (+(v)); /**/ }
		
		/**
		 * Indicates the x coordinate of the mouse or user input device position, in pixels. 
		 * @return 
		 * 
		 */		
		public get mouseX():number
		{
			var s = Stage.sCurrent;
			var p1 = Point.__pool.get();
			var p2 = Point.__pool.get();
			
			p1.__setTo(s.mouseX, s.mouseY);
			this.__globalToLocal(p1, p2);
			
			var v = p2.x;
			
			Point.__pool.release(p1);
			Point.__pool.release(p2);
			
			return v;
		}
		
		/**
		 * Indicates the y coordinate of the mouse or user input device position, in pixels. 
		 * @return 
		 * 
		 */		
		public get mouseY():number
		{
			var s = Stage.sCurrent;
			var p1 = Point.__pool.get();
			var p2 = Point.__pool.get();
			
			p1.__setTo(s.mouseX, s.mouseY);
			this.__globalToLocal(p1, p2);
			
			var v = p2.y;
			
			Point.__pool.release(p1);
			Point.__pool.release(p2);
			
			return v;
		}
		
		/**
		 * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation. 
		 * @return 
		 * 
		 */		
		public get rotation():number
		{
			if (!this.transform) {
				
				return 0;
				
			}
			
			var m = this.transform._matrix;
			return (180 / Math.PI) * Math.atan2 (m.d, m.c) - 90;
		}
		
		public set rotation(v:number)
		{
			/**/ v = (+(v));
			if (!this.transform) {
				
				this.transform = new Transform(this);
				
			}
			
			var m = this.transform._matrix, ma = m.a, mb = m.b, mc = m.c, md = m.d;
			var r = v * Math.PI / 180;
			
			this._rsin = Math.sin(r);
			this._rcos = Math.cos(r);
			
			var sx = mb == 0 ? ma : Math.sqrt(ma * ma + mb * mb);
			var sy = mc == 0 ? md : Math.sqrt(mc * mc + md * md);
			var a = this._rcos * sx;
			var b = this._rsin * sx;
			var c = -this._rsin * sy;
			var d = this._rcos * sy;
			
			if (m.a == a && m.b == b && m.c == c && m.d == d) {
				
				return;
				
			}
			
			m.a = a;
			m.b = b;
			m.c = c;
			m.d = d;
			
			this.__setDirty(2);
		}
		
		/**
		 * Indicates the x-axis rotation of the DisplayObject instance, in degrees, from its original orientation relative to the 
		 * 3D parent container. 
		 * @return 
		 * 
		 */		
		public get rotationX():number  { return 0; }
		public set rotationX(v:number)  {/**/ v = (+(v));/**/ }
		
		/**
		 * Indicates the y-axis rotation of the DisplayObject instance, in degrees, from its original orientation relative to the 
		 * 3D parent container. 
		 * @return 
		 * 
		 */		
		public get rotationY():number  { return 0; }
		public set rotationY(v:number)  {/**/ v = (+(v));/**/ }
		
		/**
		 * Indicates the z-axis rotation of the DisplayObject instance, in degrees, from its original orientation relative to the 
		 * 3D parent container. 
		 * @return 
		 * 
		 */		
		public get rotationZ():number  { return 0; }
		public set rotationZ(v:number)  {/**/ v = (+(v));/**/ }
		
		/**
		 * Indicates the alpha transparency value of the object specified. 
		 * @return 
		 * 
		 */		
		public get alpha():number
		{
			if (!this.transform) {
				
				return 1;
				
			}
			
			return this.transform._colorTransform.alphaMultiplier;
		}
		
		public set alpha(v:number)
		{
			/**/ v = (+(v));
			if (!this.transform) {
				
				this.transform = new Transform(this);
				
			}
			
			var color = this.transform._colorTransform;
			if (color.alphaMultiplier == v) {
				
				return;
				
			}
			
			color.alphaMultiplier = v;
			this.__setDirty(1);
		}
		
		/**
		 * Indicates the width of the display object, in pixels. 
		 * @return 
		 * 
		 */		
		public get width():number
		{
			var rect = Rectangle.__pool.get ();
			var matrix = this.transform ? this.transform._matrix : null;
			
			this.__getBounds (rect, matrix);
			var width = rect.width;
			
			Rectangle.__pool.release (rect);
			
			return width;
		}
		
		public set width(v:number)
		{
			/**/ v = (+(v));
			var rect = Rectangle.__pool.get();
			this.getRect(this, rect);
			
			var sx = v / rect.width;
			if (this.scaleX != sx) {
				
				this.scaleX =(+( sx));
				
			}
			
			Rectangle.__pool.release(rect);
		}
		
		/**
		 * Indicates the height of the display object, in pixels. 
		 * @return 
		 * 
		 */		
		public get height():number
		{
			var rect = Rectangle.__pool.get ();
			var matrix = this.transform ? this.transform._matrix : null;
			
			this.__getBounds (rect, matrix);
			var height = rect.height;
			
			Rectangle.__pool.release (rect);
			
			return height;
		}
		
		public set height(v:number)
		{
			/**/ v = (+(v));
			var rect = Rectangle.__pool.get();
			this.getRect(this, rect);
			
			var sy = v / rect.height;
			if (this.scaleY != sy) {
				
				this.scaleY =(+( sy));
				
			}
			
			Rectangle.__pool.release(rect);
		}
		
		/**
		 * If set to true, Flash runtimes cache an internal bitmap representation of the display object. 
		 * @return 
		 * 
		 */		
		public get cacheAsBitmap():boolean  { return this._cacheAsBitmap; }
		public set cacheAsBitmap(v:boolean)
		{
			/**/ v = Boolean(v);
			if (this._cacheAsBitmap == v) {
				
				return;
				
			}
			
			this._cacheAsBitmap = v;
			this.__setNeedCache();
			this.__setDirty(1);
		}
		
		/**
		 * Specifies whether the display object is opaque with a certain background color. 
		 * @return 
		 * 
		 */		
		public get opaqueBackground():any  { return null; }
		public set opaqueBackground(v:any)  { /**/ }
		
		/**
		 * The scroll rectangle bounds of the display object. 
		 * @return 
		 * 
		 */		
		public get scrollRect():Rectangle { return this._scrollRect ? this._scrollRect.clone() : null; }
		public set scrollRect(value:Rectangle)
		{
			/**/ value = strict(value, Rectangle);
			if (this._scrollRect == value && (!value || this._scrollRect.__equals(value))) {
				
				return;
				
			}
			
			if (value) {
				
				this._scrollRect =this._scrollRect || new Rectangle;
				this._scrollRect.__copyFrom(value);
				
			} else {
				
				this._scrollRect = null;
				
			}
			
			this.__setDirty(2);
			this.__setNeedCache();
		}
		
		/**
		 * An indexed array that contains each filter object currently associated with the display object. 
		 * @return 
		 * 
		 */		
		public get filters () : any[] { return this._filters ? this._filters.concat() : null; }
		public set filters (value : any[]) { /**/ value = strict(value, Array); this.__setFlashFilters(value); }
		
		/**
		 * A value from the BlendMode class that specifies which blend mode to use. 
		 * @return 
		 * 
		 */		
		public get blendMode():string  { return this._blendMode; }
		public set blendMode(v:string)
		{
			/**/ v = as(v, 'String');
			if (this._blendMode == v) {
				
				return;
				
			}
			
			if (!v || !(v.toUpperCase() in BlendMode)) {
				
				throw new ArgumentError('Parameter blendMode must be one of the accepted values.', 2008);
				
			}
			
			this._blendMode = v;
			this.__setDirty(2);
		}
		
		/**
		 * The current scaling grid that is in effect. 
		 * @return 
		 * 
		 */		
		public get scale9Grid():Rectangle  { return null; }
		public set scale9Grid(v:Rectangle)  { /**/ v = strict(v, Rectangle); /**/ }
		
		/**
		 * Converts the point object from the display object's (local) coordinates to the Stage (global) coordinates. 
		 * @param localPoint
		 * @param resultPoint
		 * @return 
		 * 
		 */		
		public localToGlobal(localPoint:Point):Point
		{
			/**/ localPoint = strict(localPoint, Point);
			return this.__localToGlobal(localPoint, new Point);
		}
		
		/**
		 * Converts the point object from the Stage (global) coordinates to the display object's (local) coordinates. 
		 * @param globalPoint
		 * @param resultPoint
		 * @return 
		 * 
		 */		
		public globalToLocal(globalPoint:Point):Point
		{
			/**/ globalPoint = strict(globalPoint, Point);
			return this.__globalToLocal(globalPoint, new Point);
		}
		
		/**
		 * Returns a rectangle that defines the area of the display object relative to the coordinate system of the 
		 * targetCoordinateSpace object. 
		 * @param targetSpace
		 * @param resultRect
		 * @return 
		 * 
		 */		
		public getBounds(targetSpace:DisplayObject, resultRect:Rectangle = null):Rectangle
		{
			/**/ targetSpace = strict(targetSpace, DisplayObject); resultRect = strict(resultRect, Rectangle);
			var matrix = Matrix.__pool.get ();
			
			if (targetSpace != null && targetSpace != this) {
				
				matrix.__copyFrom (this.__getWorldTransform ());
				
				var targetMatrix = Matrix.__pool.get ();
				
				targetMatrix.__copyFrom (targetSpace.__getWorldTransform ());
				targetMatrix.invert ();
				
				matrix.__concat (targetMatrix);
				
				Matrix.__pool.release (targetMatrix);
				
			} else {
				
				matrix.identity ();
				
			}
			
			if (resultRect) {
				
				resultRect.setEmpty();
				
			} else {
				
				resultRect = new Rectangle;
				
			}
			
			this.__getBounds (resultRect, matrix);
			
			Matrix.__pool.release (matrix);
			
			return resultRect;
		}
		
		/**
		 * Returns a rectangle that defines the boundary of the display object, based on the coordinate system defined by the 
		 * targetCoordinateSpace parameter, excluding any strokes on shapes. 
		 * @param targetSpace
		 * @param resultRect
		 * @return 
		 * 
		 */		
		public getRect(targetSpace:DisplayObject, resultRect:Rectangle = null):Rectangle
		{
			/**/ targetSpace = strict(targetSpace, DisplayObject); resultRect = strict(resultRect, Rectangle);
			// should not account for stroke widths, but is that possible?
			return this.getBounds (targetSpace, resultRect);
		}
		
		/**
		 * Returns a LoaderInfo object containing information about loading the file to which this display object belongs. 
		 * @return 
		 * 
		 */		
		public get loaderInfo():LoaderInfo
		{
			return this.__getLoaderInfo();
		}
		
		/**
		 * Evaluates the bounding box of the display object to see if it overlaps or intersects with the bounding box of the obj display object. 
		 * @param obj
		 * @return 
		 * 
		 */		
		public hitTestObject(obj:DisplayObject):boolean
		{
			/**/ obj = strict(obj, DisplayObject);
			if (!obj) {
				
				return false;
				
			}
			
			// WARNING: trouble with rotated objects
			return this.getBounds(this).__intersects(obj.getBounds(this));
		}
		
		/**
		 * Evaluates the display object to see if it overlaps or intersects with the point specified by the x and y parameters. 
		 * The x and y parameters specify a point in the coordinate space of the Stage, 
		 * not the display object container that contains the display object (unless that display object container is the Stage).
		 * @param x
		 * @param y
		 * @param shapeFlag
		 * @return 
		 * 
		 */		
		public hitTestPoint(x:number, y:number, shapeFlag:boolean = false):boolean
		{
			/**/ x = (+(x)); y = (+(y)); shapeFlag = Boolean(shapeFlag);
			return this.__doMouse(x, y) != null;
		}
		
		/**
		 * The current accessibility options for this display object. 
		 * @param value
		 * @return 
		 * 
		 */		
		// public function get accessibilityProperties() : AccessibilityProperties;
		// public function set accessibilityProperties(param1:AccessibilityProperties) : void;
		
		/**
		 * Converts a two-dimensional point from the Stage (global) coordinates to a three-dimensional display object's (local) coordinates. 
		 * @param value
		 * @return 
		 * 
		 */		
		public globalToLocal3D(value:Point):Vector3D  { /**/ value = strict(value, Point); return null; }
		
		/**
		 * Converts a three-dimensional point of the three-dimensional display object's (local) coordinates to a two-dimensional 
		 * point in the Stage (global) coordinates. 
		 * @param value
		 * @return 
		 * 
		 */		
		public local3DToGlobal(value:Vector3D):Point  { /**/ value = strict(value, Vector3D); return null; }
		
		/**
		 * Sets a shader that is used for blending the foreground and background. 
		 * @return 
		 * 
		 */		
		//public function set blendShader(param1:Shader) : void;
		
		/**
		 * Obtains the meta data object of the DisplayObject instance if meta data was stored alongside the the instance of this 
		 * DisplayObject in the SWF file through a PlaceObject4 tag. 
		 * @return 
		 * 
		 */		
		public get metaData():any  { return null; }
		public set metaData(value:any)  { /**/ }
		
		/*override*/ public addEventListener (type : string, listener : Function, useCapture : boolean = false, priority : number = 0, useWeakReference : boolean = false) : void
		{
			/**/ type = as(type, 'String'); useCapture = Boolean(useCapture); priority = ((priority) >> 0); useWeakReference = Boolean(useWeakReference);
			if (DisplayObject.sBroadcastEventsList.indexOf(type) > -1) {
				
				var dispatchers = DisplayObject.sBroadcastEvents[type];
				if (dispatchers.indexOf (this) == -1) {
					
					dispatchers[dispatchers.length] = this;
					
				}
				
			}
			
			super.addEventListener(type, listener, useCapture, priority, useWeakReference);
		}
		
		/*override*/ public removeEventListener (type : string, listener : Function, useCapture : boolean = false) : void
		{
			/**/ type = as(type, 'String'); useCapture = Boolean(useCapture);
			super.removeEventListener(type, listener, useCapture);
			
			if (DisplayObject.sBroadcastEventsList.indexOf(type) > -1) {
				
				if (!this.hasEventListener (type)) {
					
					var dispatchers = DisplayObject.sBroadcastEvents[type];
					var index = dispatchers.indexOf(this);
					if (index > -1) {
						
						dispatchers.splice(index, 1);
						
					}
					
				}
					
			}
		}
		
		/*override*/ public dispatchEvent(event:Event):boolean
		{
			/**/ event = strict(event, Event);
			var stops = this.__dispatchEvent(event);
			if (event.bubbles && this._parent && !stops) {
				
				event.eventPhase = 3; // EventPhase.BUBBLING_PHASE;
				this._parent.dispatchEvent(event);
				
			}
			
			return stops;
		}
		
		/*[internal]*/ protected __setMask (value : DisplayObject) : void
		{
			// value = strict(value, DisplayObject);
			if (this._mask == value) {
				
				return;
				
			}
			
			// возвращаем предыдущую маску на место
			if (this._mask) {
				
				this._mask.__setMaskParent(null);
				
			}
			
			// не null
			if (this._mask = value) {
				
				// забираем чью-то маску
				if (this._mask._maskParent) {
					
					this._mask._maskParent.mask = null;
					
				}
				
				// присваиваем себе
				this._mask.__setMaskParent(this);
				
			}
			
			this.__setDirty(2);
			this.__setNeedCache();
		}
		
		/**
		 * Evaluates the display object to see if it overlaps or intersects with the point specified by the x and y parameters. 
		 * The x and y parameters specify a point in the coordinate space of the Stage, 
		 * not the display object container that contains the display object (unless that display object container is the Stage).
		 * @param x
		 * @param y
		 * @param shapeFlag
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __insideVisibleArea (stageX:number, stageY:number, shapeFlag:boolean):boolean
		{
			// stageX = (+(stageX)); stageY = (+(stageY)); shapeFlag = Boolean(shapeFlag);
			var globalPoint = Point.__pool.get();
			var localPoint = Point.__pool.get();
			var bounds = Rectangle.__pool.get();
			
			globalPoint.__setTo(stageX, stageY);
			this.__globalToLocal(globalPoint, localPoint);
			this.__getBounds(bounds);
			
			var contains = bounds.__containsPoint(localPoint);
			if (contains) {
				
				var pt = this, sr, msk;
				while (pt) {
					
					if ((sr = pt._scrollRect) && !sr.__containsPoint(pt.__globalToLocal(globalPoint, localPoint))) {
						
						contains = false;
						break;
						
					}
					
					// WARNING: is it works?
					if ((msk = pt._mask) && !msk.getBounds(this.__getBase(), bounds).__containsPoint(pt.__globalToLocal(globalPoint, localPoint))) {
						
						contains = false;
						break;
						
					}
					
					pt = pt._renderParent || pt._parent;
					
				}
				
			}
			
			Rectangle.__pool.release(bounds);
			Point.__pool.release(globalPoint);
			Point.__pool.release(localPoint);
			
			return contains;
		}
		
		/*[internal]*/ protected __enterInternal ():void
		{
			// need to override
		}
		
		/*[internal]*/ protected __exitInternal (nextFrame : number):void
		{
			// nextFrame = ((nextFrame) >> 0);
			// need to override
		}
		
		/*[internal]*/ protected __drawEnter ():void
		{
			// need to override
		}
		
		/*[internal]*/ protected __drawExit ():void
		{
			// need to override
		}
		
		/*[internal]*/ protected __isFocused ():boolean
		{
			// need to override
			return false;
		}
		
		/*[internal]*/ protected __setFocus ():void
		{
			// need to override
		}
		
		/*[internal]*/ protected __setFlashFilters (value : any[]) : void
		{
			// value = strict(value, Array);
			// validation
			var f : BitmapFilter; // IMPORTANT: casting
			var vlen = value ? value.length : 0;
			for (var i = 0; i < vlen; ++i) {
				
				f =strict( value[i], BitmapFilter);
				if (!f) {
					
					throw new ArgumentError('Parameter ' + i + ' is of the incorrect type. Should be type Filter.', 2005);
					
				}
				
			}
			
			this.__setFilters(value, vlen);
		}
		
		/*[internal]*/ protected __setSWFFilters (value : IFilter[]) : void
		{
			var vlen = value.length;
			for (var i = 0; i < vlen; ++i) {
				
				DisplayObject.sProxyFilterList[i] = value[i].filter;
				
			}
			
			this.__setFilters(DisplayObject.sProxyFilterList, vlen);
		}
		
		/*[internal]*/ protected __setFilters (value : any[], vlen : number) : void
		{
			// value = strict(value, Array); vlen = ((vlen) >>> 0);
			// both zero length
			var flen = this._filters ? this._filters.length : 0;
			if (!flen && !vlen) {
				
				this.__setNeedCache();
				return;
				
			}
			
			// the same by content
			if (flen == vlen) {
				
				var elen = 0;
				for (var i = 0; i < vlen; ++i) {
					
					var v = value[i];
					if (this._filterHashes[i] == v.__getHash()) {
						
						elen++;
						
					}
					
				}
				
				if (elen == vlen) {
					
					return;
					
				}
				
			}
			
			// hash
			this._filters =this._filters || [];
			this._filtersPure =this._filtersPure || [];
			this._filterHashes =this._filterHashes || [];
			this._filters.length = this._filtersPure.length = this._filterHashes.length = 0;
			for (i = 0; i < vlen; ++i) {
				
				var f = value[i].clone();
				
				this._filters[this._filters.length] = f;
				this._filterHashes[this._filterHashes.length] = f.__getHash();
				
				if (f.__notImplemented) {
					
					continue;
					
				}
				
				if (is(f , ColorMatrixFilter) && f.__isIdentical()) {
					
					continue;
					
				}
				
				this._filtersPure[this._filtersPure.length] = f;
				
			}
			
			// update
			this.__setNeedCache();
			this.__setDirty(2);
		}
		
		/*[internal]*/ protected __setMaskParent (value:DisplayObject):void
		{
			// value = strict(value, DisplayObject);
			this._maskParent = value;
			this.__setDirty(2);
		}
		
		/*[internal]*/ protected __setRenderParent (value:DisplayObject):void
		{
			// value = strict(value, DisplayObject);
			this._renderParent = value;
			this.__setDirty(1);
		}
		
		/** The topmost object in the display tree the object is part of. */
		/*[internal]*/ protected __getBase () : DisplayObject
		{
			var currentObject = this, currentParent;
			while (currentParent = currentObject._renderParent || currentObject._parent) {
				
				currentObject = currentParent;
				
			}
			
			return currentObject;
		}
		
		/*[internal]*/ protected __getRoot () : DisplayObject
		{
			var pt = this;
			while (pt) {
				
				if (pt._root) {
					
					return pt;
					
				}
				
				pt = pt._renderParent || pt._parent;
				
			}
			
			return null;
		}
		
		/*[internal]*/ protected __getLoaderInfo () : LoaderInfo
		{
			var r = this.__getRoot();
			if (r) {
				
				return r._loaderInfo;
				
			}
			
			return null;
		}
		
		/*[internal]*/ protected __getBounds (rect : Rectangle, matrix : Matrix = null) : void
		{
			// rect = strict(rect, Rectangle); matrix = strict(matrix, Matrix);
			if (!this._graphics) {
				
				return;
				
			}
			
			this._graphics.__getBounds (rect, matrix);
		}
		
		/*[internal]*/ protected __setDirty (value : number, recursive : boolean = false) : void
		{
			// value = ((value) >> 0); recursive = Boolean(recursive);
			if (value == -1) {
				
				return;
				
			}
			
			if (value == 0) {
				
				this._dirty = this._dirtyContent = false;
				
				if (this._graphics) {
					
					this._graphics.dirty = false;
					
				}
				
				return;
				
			}
			
			if (value >= 1) {
				
				this._dirty = true;
				this.__setWorldTransformInvalid();
				
				if (this._maskParent) {
					
					this._maskParent.__setDirty(2);
					
				}
				
			}
			
			if (value >= 2) {
				
				this._dirtyContent = true;
				
			}
			
			if (!recursive) {
				
				return;
				
			}
			
			var p = this._parent || this._renderParent;
			if (p && !p._dirty) {
				
				p.__setDirty(value, recursive);
				
			}
		}
		
		/*[internal]*/ protected __setWorldTransformInvalid():void
		{
			this._worldTransformInvalid = true;
		}
		
		/*[internal]*/ protected __setNeedCache():void
		{
			this._cacheNeed = (this._filtersPure != null && this._filtersPure.length > 0)
				|| this._cacheAsBitmap == true
				|| this._scrollRect != null
				|| this._mask != null
				|| this._cropBounds == true
				|| this._blendMode != 'normal';
		}
		
		/*[internal]*/ protected __predraw(ctx:WebGLContext2D, skipCache:any):boolean
		{
			// ctx = strict(ctx, WebGLContext2D);
			return this.__predrawDisplayObject(ctx, skipCache);
		}
		
		/*[internal]*/ protected __predrawDisplayObject(ctx:WebGLContext2D, skipCache:any):boolean
		{
			// ctx = strict(ctx, WebGLContext2D);
			if (this._graphics) {
				
				if (this._graphics._commandsSize && skipCache != true) {
					
					this._graphics.__getCache(this.__getWorldTransform());
					DisplayObject.__addCachedObject(this);
				
				}
				
				if (this._graphics.dirty) {
					
					this.__setDirty(2);
					
				}
				
			}
			
			if (!this._cacheNeed) {
				
				if (this._cache) {
					
					this._cache.dispose();
					this._cache = null;
					this._dirtyCache = false;
					this._cacheTransform.identity();
					
				}
				
				return this._dirty;
			}
			
			if (this._dirtyContent) {
				
				this._dirtyCache = true;
				
			}
			
			if (this._cacheWorldTransform && !this._cacheWorldTransform.__equals(this.__getWorldTransform(), this._mask != null)) {
				
				this._dirtyCache = true;
				
			}
			
			if (!this._cache || this._dirtyCache) {
				
				if (skipCache != true) {
					
					this.__updateCache();
					
				}
				
			}
			
			return this._dirty;
		}
		
		/*[internal]*/ protected __draw(ctx:WebGLContext2D, dirtyFlag:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); dirtyFlag = ((dirtyFlag) >> 0);
			return true;
		}
		
		/*[internal]*/ protected __drawCache(ctx:WebGLContext2D):boolean
		{
			// ctx = strict(ctx, WebGLContext2D);
			if (!this._cache || this._cacheCreating) {
				
				return false;
				
			}
			
			var m = this.__getWorldTransform();
			ctx.setTransformFromMatrix(this._cacheTransform);
			ctx.translate(m.tx, m.ty);
			ctx.drawImage(this._cache, true); // IMPORTANT: smoothing = true
			
			return true;
		}
		
		/*[internal]*/ protected __updateCache():void
		{
			if (this._cacheCreating) {
				
				return;
				
			}
			
			this._cacheCreating = true;
			
			// clip rect
			var clipRect = Rectangle.__pool.get();
			
			// matrix
			var worldMatrix = this.__getWorldTransform();
			
			// filters
			var flen = this._filtersPure ? this._filtersPure.length : 0;
			var needFilters = flen > 0;
			
			// crop
			var scrollRect = this._scrollRect;
			var mask = this._mask;
			var needCrop = scrollRect != null || this._cropBounds == true;
			
			// draw matrix
			var drawMatrix = Matrix.__pool.get();
			drawMatrix.__copyFrom(worldMatrix, false);
			
			// cache matrix
			this._cacheWorldTransform =this._cacheWorldTransform || new Matrix;
			this._cacheWorldTransform.__copyFrom(worldMatrix);
			this._cacheTransform =this._cacheTransform || new Matrix;
			this._cacheTransform.identity();
			
			// self rect
			var localRect = Rectangle.__pool.get();
			this.__getBounds (localRect);
			
			// world rect
			var globalRect = Rectangle.__pool.get();
			globalRect.__copyFrom(localRect);
			if (scrollRect) {
				
				globalRect.width = Math.min(scrollRect.width - globalRect.x, globalRect.width);
				globalRect.height = Math.min(scrollRect.height - globalRect.y, globalRect.height);
				
			}
			drawMatrix.__transformRectangleInPlace(globalRect);
			
			// scale matrix
			var scaleMatrix = Matrix.__pool.get();
			scaleMatrix.__scale(drawMatrix.__getScaleX(), drawMatrix.__getScaleY());
			
			// with filters
			if (needFilters) {
				
				this.__unionFilterBounds(globalRect, globalRect);
				globalRect.__inflateCeil(1, 1); // math fix
				
			}
			
			// cache size
			var w = Math.max(Math.ceil(globalRect.width), 1);
			var h = Math.max(Math.ceil(globalRect.height), 1);
			
			// with crop
			var tempBuff:BitmapData;
			if (needCrop) {
				
				var buffMatrix = Matrix.__pool.get();
				var tempPoint = Point.__pool.get();
				var transformedLocalRect = Rectangle.__pool.get();
				
				// transformed local
				transformedLocalRect.__copyFrom(localRect);
				
				if (scrollRect) {
					
					transformedLocalRect.width = Math.min(scrollRect.width - transformedLocalRect.x, transformedLocalRect.width);
					transformedLocalRect.height = Math.min(scrollRect.height - transformedLocalRect.y, transformedLocalRect.height);
					
				}
				
				// buff matrix
				buffMatrix.__copyFrom(scaleMatrix);
				buffMatrix.__transformRectangleInPlace(transformedLocalRect);
				buffMatrix.__translate(-transformedLocalRect.x, -transformedLocalRect.y);
				
				if (scrollRect) {
					
					buffMatrix.__translateTransformed(-scrollRect.x, -scrollRect.y);
					
				}
				
				// draw matrix
				tempPoint.__setTo(transformedLocalRect.x, transformedLocalRect.y);
				drawMatrix.__transformPointInPlace(tempPoint);
				drawMatrix.__scale(1 / scaleMatrix.a, 1 / scaleMatrix.d);
				drawMatrix.__translate(-globalRect.x + tempPoint.x / scaleMatrix.a, -globalRect.y + tempPoint.y / scaleMatrix.d);
				
				// clip
				clipRect.__setTo(0, 0, transformedLocalRect.width, transformedLocalRect.height);
				
				// clip with scroll
				if (scrollRect) {
					
					clipRect.x += -transformedLocalRect.x;
					clipRect.y += -transformedLocalRect.y;
					
				}
				
				tempBuff = SystemBitmapData.__popBuffer(transformedLocalRect.width, transformedLocalRect.height, true);
				tempBuff.__drawWithQuality(this, buffMatrix, null, null, clipRect);
				
				Rectangle.__pool.release(transformedLocalRect);
				Point.__pool.release(tempPoint);
				Matrix.__pool.release(buffMatrix);
				
			} else {
				
				// draw shift
				drawMatrix.__translate(-globalRect.x, -globalRect.y);
				
			}
			
			// cache shift
			this._cacheTransform.__translate(globalRect.x, globalRect.y);
			
			// draw cache
			if (this._cache) {
				
				if (this._cache.width == w && this._cache.height == h) {
					
					this._cache.fillRect(this._cache.rect, 0x0);
					
				} else {
					
					this._cache.dispose();
					this._cache = null;
					
				}
				
			}
			
			// mask
			if (mask) {
				
				// TODO
				// реализуется блендингом, но для начала нужно этот blendMode реализовать в BitmapData
				
				/*var maskBounds = Rectangle.__pool.get();
				
				mask.__getBounds(maskBounds, _renderParent.__getWorldTransform());
				
				maskBounds.x -= worldMatrix.tx;
				maskBounds.y -= worldMatrix.ty;
				
				maskBounds.x -= globalRect.x;
				maskBounds.y -= globalRect.y;
				
				clipRect.__intersectInPlace(maskBounds);
				
				Rectangle.__pool.release(maskBounds);*/
				
			}
			
			// cache
			this._cache =this._cache || new SystemBitmapData(SystemBitmapData.DISPLAY, w, h, true, 0x0);
			this._cache.__drawWithQuality(tempBuff || this, drawMatrix);
			
			// free
			if (tempBuff) {
				
				tempBuff.dispose();
				
			}
			
			// apply filters
			if (needFilters) {
				
				var ctx = this._cache._ctx;
				
				// iterate
				for (var i = 0; i < flen; i++) {
					
					var filteredSource = this._filtersPure[i].__apply(ctx, this._cache, i < flen - 1);
					this._cache.dispose();
					this._cache =strict( filteredSource, BitmapData);
					
				}
				
			}
			
			DisplayObject.__addCachedObject(this);
			
			if (DisplayObject.sDebugCache) {
				
				this._cache.fillRect(new Rectangle(0,0,5,5), 0xffff0000);
				this._cache.fillRect(new Rectangle(this._cache._width - 5,this._cache._height - 5,5,5), 0xffff0000);
				
			}
			
			this._dirty = true;
			this._cacheCreating = this._dirtyCache = false;
			
			Matrix.__pool.release(scaleMatrix);
			Matrix.__pool.release(drawMatrix);
			Rectangle.__pool.release(localRect);
			Rectangle.__pool.release(globalRect);
			Rectangle.__pool.release(clipRect);
		}
		
		/*[internal]*/ protected __unionFilterBounds (source:Rectangle, destination:Rectangle = null):Rectangle
		{
			// source = strict(source, Rectangle); destination = strict(destination, Rectangle);
			destination =destination || new Rectangle;
			destination.__copyFrom(source);
			
			var len;
			if (!this._filtersPure || !(len=this._filtersPure.length)) {
				
				return destination;
				
			}
			
			for (var i = 0; i < len; i++) {
				
				this._filtersPure[i].__bounds(destination);
				
			}
			
			return destination;
		}
		
		/*[internal]*/ protected __doMouse(stageX:number, stageY:number, isHitArea:boolean = false):DisplayObject
		{
			// stageX = (+(stageX)); stageY = (+(stageY)); isHitArea = Boolean(isHitArea);
			if (!isHitArea && (!this._visible || this._maskParent)) {
				
				return null;
				
			}
			
			var target;
			if (this._graphics && this._graphics._commandsSize) {
				
				var globalPoint = Point.__pool.get();
				var localPoint = Point.__pool.get();
				var bounds = Rectangle.__pool.get();
				
				globalPoint.__setTo(stageX, stageY);
				this.__globalToLocal(globalPoint, localPoint);
				this._graphics.__getBounds (bounds);
				
				if (bounds.__containsPoint(localPoint)) {
					
					target = this;
					
				}
				
			}
			
			Rectangle.__pool.release(bounds);
			Point.__pool.release(globalPoint);
			Point.__pool.release(localPoint);
			
			return target;
		}
		
		/*[internal]*/ protected __updateContext (ctx:WebGLContext2D):void
		{
			// ctx = strict(ctx, WebGLContext2D);
			this.__updateContextTransformation(ctx);
			ctx.colorTransform(this.transform._colorTransform);
			ctx.blendMode(this._blendMode);
		}
		
		/*[internal]*/ protected __updateContextTransformation (ctx:WebGLContext2D):void
		{
			// ctx = strict(ctx, WebGLContext2D);
			ctx.setTransformFromMatrix(this.__getWorldTransform());
		}
		
		/*[internal]*/ protected __getWorldTransform ():Matrix
		{
			if (this._worldTransformInvalid) {
				
				var local = this.transform._matrix;
				
				var renderParent = this._renderParent != null ? this._renderParent : this._parent;
				
				if (renderParent != null) {
					
					DisplayObject.__calculateAbsoluteTransform (local, renderParent.__getWorldTransform(), this._worldTransform);
					DisplayObject.__calculateAbsoluteTransform (local, renderParent.__getRenderTransform(), this._renderTransform);
					
				} else {
					
					this._worldTransform.__copyFrom (local);
					this._renderTransform.__copyFrom (local);
					
				}
				
				if (this._scrollRect != null) {
					
					this._renderTransform.__translateTransformed (-this._scrollRect.x, -this._scrollRect.y);
					
				}
				
				this._worldTransformInvalid = false;
				
			}
			
			return this._worldTransform;
		}
		
		/*[internal]*/ protected __getRenderTransform ():Matrix
		{
			this.__getWorldTransform ();
			return this._renderTransform;
		}
		
		/*[internal]*/ protected __setStage (s : Stage, si : boolean, force : boolean) : boolean
		{
			// s = strict(s, Stage); si = Boolean(si); force = Boolean(force);
			if (this._stage === s && this._stageInternal == si && force != true) {
				
				return false;
				
			}
			
			this._stage = s;
			this._stageInternal = si;
			return true;
		}
		
		/*[internal]*/ protected __broadcastSetStage (s : Stage, si : boolean, force : boolean) : boolean
		{
			// s = strict(s, Stage); si = Boolean(si); force = Boolean(force);
			if (this.__setStage(s, si, force) && !si) {
				
				if (s) {
					
					DisplayObject.sEventStage.target = null;
					this.dispatchEvent(DisplayObject.sEventStage);
					
				} else {
					
					DisplayObject.sEventNoStage.target = null;
					this.dispatchEvent(DisplayObject.sEventNoStage);
					
				}
				
			}
		}
		
		/*[internal]*/ protected __getTransformationMatrix(targetSpace:DisplayObject, resultMatrix:Matrix, renderMode:boolean = false):Matrix
		{
			// targetSpace = strict(targetSpace, DisplayObject); resultMatrix = strict(resultMatrix, Matrix); renderMode = Boolean(renderMode);
			if (targetSpace && targetSpace != this) {
				
				var targetMatrix = Matrix.__pool.get ();
				
				if (renderMode) {
					
					resultMatrix.__copyFrom (this.__getRenderTransform ());
					targetMatrix.__copyFrom (targetSpace.__getRenderTransform ());
					
				} else {
					
					resultMatrix.__copyFrom (this.__getWorldTransform ());
					targetMatrix.__copyFrom (targetSpace.__getWorldTransform ());
					
				}
				
				targetMatrix.invert ();
				
				resultMatrix.__concat (targetMatrix);
				
				Matrix.__pool.release (targetMatrix);
				
			} else {
				
				resultMatrix.identity ();
				
			}
			
			return resultMatrix;
		}
		
		/**
		 * Converts the point object from the display object's (local) coordinates to the Stage (global) coordinates. 
		 * @param localPoint
		 * @param resultPoint
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __localToGlobal(localPoint:Point, resultPoint:Point):Point
		{
			// localPoint = strict(localPoint, Point); resultPoint = strict(resultPoint, Point);
			var m = Matrix.__pool.get();
			
			this.__getTransformationMatrix(this.__getBase(), m, true);
			resultPoint.__copyFrom(localPoint);
			m.__transformPointInPlace(resultPoint);
			
			Matrix.__pool.release(m);
			return resultPoint;
		}
		
		/**
		 * Converts the point object from the Stage (global) coordinates to the display object's (local) coordinates. 
		 * @param globalPoint
		 * @param resultPoint
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __globalToLocal(globalPoint:Point, resultPoint:Point):Point
		{
			// globalPoint = strict(globalPoint, Point); resultPoint = strict(resultPoint, Point);
			var m = Matrix.__pool.get();
			
			this.__getTransformationMatrix(this.__getBase(), m, true);
			m.invert();
			resultPoint.__copyFrom(globalPoint);
			m.__transformPointInPlace(resultPoint);
			
			Matrix.__pool.release(m);
			return resultPoint;
		}
		
		/*[internal]*/ protected static __calculateAbsoluteTransform (local:Matrix, parentTransform:Matrix, target:Matrix):void
		{
			// local = strict(local, Matrix); parentTransform = strict(parentTransform, Matrix); target = strict(target, Matrix);
			if (parentTransform) {
				
				target.a = local.a * parentTransform.a + local.b * parentTransform.c;
				target.b = local.a * parentTransform.b + local.b * parentTransform.d;
				target.c = local.c * parentTransform.a + local.d * parentTransform.c;
				target.d = local.c * parentTransform.b + local.d * parentTransform.d;
				target.tx = local.tx * parentTransform.a + local.ty * parentTransform.c + parentTransform.tx;
				target.ty = local.tx * parentTransform.b + local.ty * parentTransform.d + parentTransform.ty;
				
			} else {
				
				target.__copyFrom(local);
				
			}
		}
		
		/*[internal]*/ protected static __addCachedObject(target:DisplayObject):void
		{
			// target = strict(target, DisplayObject);
			var i = DisplayObject.sCachedObjects.indexOf(target);
			if (i >= 0) {
				
				return;
				
			}
			
			DisplayObject.sCachedObjects[DisplayObject.sCachedObjects.length] = target;
		}
		
		/*[internal]*/ protected static __removeCachedObject(target:DisplayObject):void
		{
			// target = strict(target, DisplayObject);
			var i = DisplayObject.sCachedObjects.indexOf(target);
			if (i == -1) {
				
				return;
				
			}
			
			DisplayObject.sCachedObjects.splice(i, 1);
		}
		
		/*[internal]*/ protected static __freeCachedObject(target:DisplayObject):boolean
		{
			// target = strict(target, DisplayObject);
			var i = DisplayObject.sCachedObjects.indexOf(target);
			if (i == -1) {
				
				return true;
				
			}
			
			var cache = target._cache;
			if (cache) {
				
				cache.dispose(); // BitmapData
				target._cache = null;
				
			}
			
			if (target._graphics && (cache = target._graphics._cache)) {
				
				if (--cache.notStagedFrames > 0) {
					
					return false;
					
				}
				
				cache.dispose(); // GLCacheDisplayObject
				target._graphics._cache = null;
				
			}
			
			DisplayObject.sCachedObjects.splice(i, 1);
			return true;
		}
		
		/*[internal]*/ protected static __addTimelineObject(target:DisplayObject):void
		{
			// target = strict(target, DisplayObject);
			var i = DisplayObject.sTimelineObjects.indexOf(target);
			if (i == -1) {
				
				DisplayObject.sTimelineObjects.push(target);
				
			}
		}
		
		/*[internal]*/ protected static __removeTimelineObject(target:DisplayObject):void
		{
			// target = strict(target, DisplayObject);
			var i = DisplayObject.sTimelineObjects.indexOf(target);
			if (i >= 0) {
				
				DisplayObject.sTimelineObjects.splice(i, 1);
				
			}
		}
		
		/*[internal]*/ protected static __addDOMElement(target:DisplayObject):void
		{
			// target = strict(target, DisplayObject);
			var i = DisplayObject.sDOMElements.indexOf(target);
			if (i == -1) {
				
				DisplayObject.sDOMElements.push(target);
				
			}
		}
		
		/*[internal]*/ protected static __removeDOMElement(target:DisplayObject):void
		{
			// target = strict(target, DisplayObject);
			var i = DisplayObject.sDOMElements.indexOf(target);
			if (i >= 0) {
				
				DisplayObject.sDOMElements.splice(i, 1);
				
			}
		}
		
		public toString ():string
		{
			return '[object DisplayObject]';
		}
	}
}