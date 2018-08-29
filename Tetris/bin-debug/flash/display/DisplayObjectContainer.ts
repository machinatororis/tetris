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
	 * The DisplayObjectContainer class is the base class for all objects that can serve as display object containers on the display list. 
	 * The display list manages all objects displayed in the Flash runtimes. Use the DisplayObjectContainer class to arrange the display 
	 * objects in the display list. Each DisplayObjectContainer object has its own child list for organizing the z-order of the objects. 
	 * The z-order is the front-to-back order that determines which object is drawn in front, which is behind, and so on.
	 * 
	 * DisplayObject is an abstract base class; therefore, you cannot call DisplayObject directly. Invoking new DisplayObject() throws an 
	 * ArgumentError exception.
	 * The DisplayObjectContainer class is an abstract base class for all objects that can contain child objects. 
	 * It cannot be instantiated directly; calling the new DisplayObjectContainer() constructor throws an ArgumentError exception.
	 * 
	 * For more information, see the "Display Programming" chapter of the ActionScript 3.0 Developer's Guide. 
	 * @author pkulikov
	 * 
	 */	
	export  class DisplayObjectContainer extends InteractiveObject
	{
		/*[internal]*/ protected _children : DisplayObject[];
		/*[internal]*/ protected _childrenLength : number;
		/*[internal]*/ protected _mouseChildren : boolean;
		
		/**
		 * Calling the new DisplayObjectContainer() constructor throws an ArgumentError exception. 
		 * 
		 */		
		constructor()
		{
			/**/ this._children === void 0 && (this._children = new Array);
			/**/ this._childrenLength === void 0 && (this._childrenLength = 0);
			/**/ this._mouseChildren === void 0 && (this._mouseChildren = true);
			super(); 
			
		}
		
		/**
		 * Adds a child DisplayObject instance to this DisplayObjectContainer instance. 
		 * @param child
		 * @return 
		 * 
		 */		
		public addChild (child : DisplayObject) : DisplayObject
		{
			/**/ child = strict(child, DisplayObject);
			return this.__addChildAt(child, this._childrenLength);
		}
		
		/**
		 * Adds a child DisplayObject instance to this DisplayObjectContainer instance. 
		 * @param child
		 * @param index
		 * @return 
		 * 
		 */		
		public addChildAt (child : DisplayObject, index : number) :DisplayObject
		{
			/**/ child = strict(child, DisplayObject); index = ((index) >> 0);
			return this.__addChildAt(child, index);
		}
		
		/**
		 * Removes the specified child DisplayObject instance from the child list of the DisplayObjectContainer instance. 
		 * @param child
		 * @return 
		 * 
		 */		
		public removeChild (child : DisplayObject) : DisplayObject
		{
			/**/ child = strict(child, DisplayObject);
			if (!this._children) {
				
				return child;
				
			}
			
			var i = this._children.indexOf(child);
			if (i == -1) {
				
				return child;
				
			}
			
			return this.__removeChildAt(i);
		}
		
		/**
		 * Removes a child DisplayObject from the specified index position in the child list of the DisplayObjectContainer. 
		 * @param i
		 * @return 
		 * 
		 */		
		public removeChildAt (i : number) : DisplayObject
		{
			/**/ i = ((i) >> 0);
			return this.__removeChildAt(i);
		}
		
		/**
		 * Returns the index position of a child DisplayObject instance. 
		 * @param child
		 * @return 
		 * 
		 */		
		public getChildIndex(child:DisplayObject):number
		{
			/**/ child = strict(child, DisplayObject);
			return this._children ? this._children.indexOf(child) : -1;
		}
		
		/**
		 * Changes the position of an existing child in the display object container. 
		 * @param child
		 * @param index
		 * 
		 */		
		public setChildIndex(child:DisplayObject, index:number):void
		{
			/**/ child = strict(child, DisplayObject); index = ((index) >> 0);
			if (!this._children) {
				
				return;
				
			}
			
			var i = this._children.indexOf(child);
			if (i == -1) {
				
				return;
				
			}
			
			this.__addChildAt(child, index);
		}
		
		/**
		 * Returns the child display object instance that exists at the specified index. 
		 * @param index
		 * @return 
		 * 
		 */		
		public getChildAt(index:number):DisplayObject
		{
			/**/ index = ((index) >> 0);
			return this._children ? this._children[index] : null;
		}
		
		/**
		 * Returns the child display object that exists with the specified name. 
		 * @param name
		 * @return 
		 * 
		 */		
		public getChildByName(name:string):DisplayObject
		{
			/**/ name = as(name, 'String');
			for (var i = 0; i < this._childrenLength; i++) {
				
				var child = this._children[i];
				if (child.name == name) {
					
					return child;
					
				}
				
			}
			
			return null;
		}
		
		/**
		 * Returns the number of children of this object. 
		 * @return 
		 * 
		 */		
		public get numChildren():number { return this._childrenLength; }
		
		/**
		 * Returns a TextSnapshot object for this DisplayObjectContainer instance. 
		 * @param p
		 * @return 
		 * 
		 */		
		// public function get textSnapshot() : TextSnapshot;
		
		/**
		 * Returns an array of objects that lie under the specified point and are children (or grandchildren, and so on) of this 
		 * DisplayObjectContainer instance. 
		 * @param p
		 * @return 
		 * 
		 */		
		public getObjectsUnderPoint(p:Point):any[]  { /**/ p = strict(p, Point); return null }
		
		/**
		 * Indicates whether the security restrictions would cause any display objects to be omitted from the list returned by calling 
		 * the DisplayObjectContainer.getObjectsUnderPoint() method with the specified point point. 
		 * @param p
		 * @return 
		 * 
		 */		
		public areInaccessibleObjectsUnderPoint(p:Point):boolean  { /**/ p = strict(p, Point); return false }
		
		/**
		 * Determines whether the children of the object are tab enabled. 
		 * @return 
		 * 
		 */		
		public get tabChildren():boolean  { return false }
		public set tabChildren(v:boolean)  {/**/ v = Boolean(v);/**/ }
		
		/**
		 * Determines whether or not the children of the object are mouse, or user input device, enabled. 
		 * @return 
		 * 
		 */		
		public get mouseChildren():boolean  { return this._mouseChildren; }
		public set mouseChildren(v:boolean)  { /**/ v = Boolean(v); this._mouseChildren = v; }
		
		/**
		 * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself. 
		 * @param child
		 * @return 
		 * 
		 */		
		public contains(child:DisplayObject):boolean
		{
			/**/ child = strict(child, DisplayObject);
			return this._children && this._children.indexOf(child) != -1;
		}
		
		/**
		 * Swaps the z-order (front-to-back order) of the child objects at the two specified index positions in the child list. 
		 * @param i1
		 * @param i2
		 * 
		 */		
		public swapChildrenAt(index1 : number, index2 : number):void
		{
			/**/ index1 = ((index1) >> 0); index2 = ((index2) >> 0);
			if (!this._children) {
				
				return;
				
			}
			
			if (!this._children[index1] || !this._children[index2]) {
				
				return;
				
			}
			
			var temp = this._children[index1];
			this._children[index1] = this._children[index2];
			this._children[index2] = temp;
			
			if (!this._dirtyContent) {
				
				this.__setDirty(2);
				
			}
		}
		
		/**
		 * Swaps the z-order (front-to-back order) of the two specified child objects. 
		 * @param c1
		 * @param c2
		 * 
		 */		
		public swapChildren(child1:DisplayObject, child2:DisplayObject):void
		{
			/**/ child1 = strict(child1, DisplayObject); child2 = strict(child2, DisplayObject);
			this.swapChildrenAt(this.getChildIndex(child1), this.getChildIndex(child2));
		}
		
		/**
		 * Removes all child DisplayObject instances from the child list of the DisplayObjectContainer instance. 
		 * @param start
		 * @param len
		 * 
		 */		
		public removeChildren(start:number = 0, len:number = 2147483647):void
		{
			/**/ start = ((start) >> 0); len = ((len) >> 0);
			for (var i = Math.min(this._childrenLength - 1, start + len - 1); i >= start; i--) {
				
				this.__removeChildAt(i);
				
			}
		}
		
		/**
		 * Recursively stops the timeline execution of all MovieClips rooted at this object. 
		 * 
		 */		
		public stopAllMovieClips(unload:boolean = false):void
		{
			/**/ unload = Boolean(unload);
			for (var i = 0; i < this._childrenLength; i++) {
				
				var child = this._children[i];
				
				if (is(child , DisplayObjectContainer)) {
					
					child.stopAllMovieClips(unload);
					
				}
				
			}
			
			if (unload) {
				
				this.removeEventListeners();
				
			}
		}
		
		/**
		 * Adds a child DisplayObject instance to this DisplayObjectContainer instance. 
		 * @param child
		 * @param index
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __addChildAt (child : DisplayObject, index : number) : DisplayObject
		{
			// child = strict(child, DisplayObject); index = ((index) >> 0);
			if (!this._children) {
				
				this._children = new Array;
				this._childrenLength = 0;
				
			}
			
			if (index < 0) {
				
				index = 0;
				
			}
			
			if (index > this._childrenLength) {
				
				index = this._childrenLength;
				
			}
			
			var childStage;
			var childParent = child._parent;
			
			if (childParent) {
				
				if (childParent == this) {
					
					//    _
					//   |⯆
					//  [0]
					//
					///////////////////////
					if (this._childrenLength == 1) {
						
						return child;
						
					}
					
					var childIndex = this._children.indexOf(child);
					if (childIndex < index) {
						
						//        ___
						//       |  ⯆
						//  [0] [1] 
						//
						///////////////////////
						if (childIndex + 1 == this._childrenLength) {
							
							return child;
							
						}
						
						//    ________
						//   |       ⯆
						//  [0] [1] 
						//    ____
						//   |   ⯆
						//  [0] [1]
						//
						///////////////////////
						if (index == this._childrenLength) {
							
							index =(( this._childrenLength - 1) >> 0);
							
						}
						
						//        ________
						//       |       ⯆
						//  [0] [1] [2] [3] [4]
						//         /   /
						//  [0] [2] [3] [1] [4]
						//
						///////////////////////
						for (var i = childIndex + 1; i <= index; ++i) {
							
							this._children[i - 1] = this._children[i];
							
						}
						
					} else if (childIndex > index) {
						
						//        ________
						//       ⯆              |
						//  [0] [1] [2] [3] [4]
						//         \   \
						//  [0] [3] [1] [2] [4]
						//
						///////////////////////
						for (var i = childIndex - 1; i >= index; --i) {
							
							this._children[i + 1] = this._children[i];
							
						}
						
					} else {
						
						//       _
						//      |⯆
						//  [0] [1] [2] [3] [4]
						//
						///////////////////////
						return child;
						
					}
					
					this._children[index] = child;
					
					if (!this._dirtyContent) {
						
						this.__setDirty(2);
						
					}
					
					return child;
					
				} else {
					
					var childIndex = childParent._children.indexOf(child);
					childStage = child._stage;
					childParent.__removeChildAt(childIndex, false);
					
				}
				
			}
			
			//
			//           ⯆
			//  [0] [1] [2] [3]
			//             \   \
			//  [0] [1] [4] [2] [3]
			//
			///////////////////////
			for (var i = this._childrenLength - 1; i >= index; --i) {
				
				this._children[i + 1] = this._children[i];
				
			}
			
			this._children[index] = child;
			this._childrenLength++;
			
			if (!child._dirty) {
				
				child.__setDirty(1);
				
			}
			
			child._parent = child._renderParent = this;
			
			if (childStage == null) {
				
				child.__broadcastSetStage(this._stage, this._stageInternal);
				
			}
			
			if (!this._dirtyContent) {
				
				this.__setDirty(2);
				
			}
			
			return child;
		}
		
		/**
		 * Removes a child DisplayObject from the specified index position in the child list of the DisplayObjectContainer. 
		 * @param i
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __removeChildAt (index : number) : DisplayObject
		{
			// index = ((index) >> 0);
			if (!this._children || index < 0 || index >= this._childrenLength) {
				
				return null;
				
			}
			
			var child = this._children[index];
			if (!child) {
				
				return null;
				
			}
			
			//
			//           X
			//  [0] [1] [2] [3] [4]
			//             /   /
			//  [0] [1] [3] [4]
			//
			///////////////////////
			for (var i = index + 1; i < this._childrenLength; ++i) {
				
				this._children[i - 1] = this._children[i];
				
			}
			
			this._children[--this._childrenLength] = null;
			
			if (arguments[1] != false) {
				
				child._parent = child._renderParent = null;
				
				if (!child._dirty) {
					
					child.__setDirty(1);
					
				}
				
				child.__broadcastSetStage(null, this._stageInternal);
				
			}
			
			if (!this._dirtyContent) {
				
				this.__setDirty(2);
				
			}
			
			return child;
		}
		
		/*[internal]*/ /*override*/ protected __getBounds (rect:Rectangle, matrix:Matrix = null):void
		{
			// rect = strict(rect, Rectangle); matrix = strict(matrix, Matrix);
			super.__getBounds (rect, matrix);
			
			if (this._childrenLength == 0) return;
			
			var childWorldTransform = Matrix.__pool.get();
			
			for (var i = 0; i < this._childrenLength; i++) {
				
				var child = this._children[i];
				
				if (child.scaleX == 0 || child.scaleY == 0) continue;
				
				DisplayObject.__calculateAbsoluteTransform (child.transform._matrix, matrix, childWorldTransform);
				
				child.__getBounds (rect, childWorldTransform);
				
			}
			
			Matrix.__pool.release(childWorldTransform);
		}
		
		/*[internal]*/ /*override*/ protected __predraw(ctx:WebGLContext2D, skipCache:any):boolean
		{
			// ctx = strict(ctx, WebGLContext2D);
			var skipChildCache = skipCache == undefined ? this._cacheNeed : skipCache;
			
			for (var i = this._childrenLength-1; i >= 0; i--) {
				
				var child = this._children[i];
				if (!child._visible || child._maskParent) {
					
					continue;
					
				}
				
				if (child.__predraw(ctx, skipChildCache) && !this._dirtyContent) {
					
					this.__setDirty(2);
					
				}
				
			}
			
			return this.__predrawDisplayObject(ctx, skipCache);
		}
		
		/*[internal]*/ /*override*/ protected __draw(ctx:WebGLContext2D, dirtyFlag:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); dirtyFlag = ((dirtyFlag) >> 0);
			if (this.__drawCache(ctx)) return false;
			
			// children
			for (var i = 0; i < this._childrenLength; i++) {
				
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
			
			var target = null;
			var len = this._childrenLength - 1;
			for (var i = len; i >= 0; i--) {
				
				var child = this._children[i];
				if (!child._visible || child._maskParent) {
					
					continue;
					
				}
				
				var obj = child.__doMouse(stageX, stageY, isHitArea);
				if (!obj) {
					
					continue;
					
				}
				
				if (!obj.__insideVisibleArea(stageX, stageY, isHitArea)) {
					
					continue;
					
				}
				
				if (!this._mouseChildren) {
					
					return this;
					
				}
				
				if (is(obj , InteractiveObject)) {
					
					return obj;
					
				}

				target = obj;
			}
			
			if (!this.mouseEnabled) {
				
				return null;
				
			}
			
			if (target) {
				
				return this;
				
			}
			
			return super.__doMouse(stageX, stageY, isHitArea);
		}
		
		/*[internal]*/ /*override*/ protected __setStage (s : Stage, si : boolean, force : boolean) : boolean
		{
			// s = strict(s, Stage); si = Boolean(si); force = Boolean(force);
			if (this._stage === s && this._stageInternal == si && force != true) {

				return false;
				
			}
			
			this._stage = s;
			this._stageInternal = si;
			
			for (var i = 0; i < this._childrenLength; i++) {
				
				this._children[i].__broadcastSetStage(s, si, force);
				
			}
			
			return true;
		}
		
		/*[internal]*/ /*override*/ protected __setWorldTransformInvalid () : void
		{
			if (this._worldTransformInvalid) {
				
				return;
				
			}
			
			for (var i = 0; i < this._childrenLength; i++) {
				
				this._children[i].__setWorldTransformInvalid ();
				
			}
			
			this._worldTransformInvalid = true;
		}
		
		/*[internal]*/ /*override*/ protected __unionFilterBounds (source:Rectangle, destination:Rectangle = null):Rectangle
		{
			// source = strict(source, Rectangle); destination = strict(destination, Rectangle);
			destination = super.__unionFilterBounds(source, destination);
			
			var len = this._childrenLength;
			for (var i = 0; i < len; i++) {
				
				var child = this._children[i];
				if (!child || !child._visible || child._maskParent || !child._filtersPure || !child._filtersPure.length) {
					
					continue;
					
				}
				
				destination.__unionInPlace(child.__unionFilterBounds(destination, destination));
				
			}
			
			return destination;
		}
		
		/*override*/ public toString ():string
		{
			return '[object DisplayObjectContainer]';
		}
	}
}