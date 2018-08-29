/// <reference path="../../base.d.ts" />
/// <reference path="../__native/utils/ObjectPool.ts" />

namespace flash.geom
{
	export import ObjectPool = flash.__native.utils.ObjectPool;
	

	/**
	 * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and 
	 * by its width and its height.
	 * The x, y, width, and height properties of the Rectangle class are independent of each other; 
	 * changing the value of one property has no effect on the others. 
	 * However, the right and bottom properties are integrally related to those four properties. 
	 * For example, if you change the value of the right property, the value of the width property changes; 
	 * if you change the bottom property, the value of the height property changes.
	 * 
	 * The following methods and properties use Rectangle objects:
	 * 
	 * The applyFilter(), colorTransform(), copyChannel(), copyPixels(), draw(), fillRect(), generateFilterRect(), 
	 * getColorBoundsRect(), getPixels(), merge(), paletteMap(), pixelDisolve(), setPixels(), and threshold() methods, and 
	 * the rect property of the BitmapData class
	 * The getBounds() and getRect() methods, and the scrollRect and scale9Grid properties of the DisplayObject class
	 * The getCharBoundaries() method of the TextField class
	 * The pixelBounds property of the Transform class
	 * The bounds parameter for the startDrag() method of the Sprite class
	 * The printArea parameter of the addPage() method of the PrintJob class
	 * You can use the new Rectangle() constructor to create a Rectangle object.
	 * 
	 * Note: The Rectangle class does not define a rectangular Shape display object. 
	 * To draw a rectangular Shape object onscreen, use the drawRect() method of the Graphics class. 
	 * @author pkulikov
	 * 
	 */	
	export  class Rectangle
	{
		private static __pool = asc.sti(Rectangle,()=>{ Rectangle.__pool = new ObjectPool (function () { return new Rectangle; }.__bind(this), function (r) { r.x = r.y = r.width = r.height = 0; }.__bind(this)); });
		
		/**
		 * The x coordinate of the top-left corner of the rectangle. 
		 */		
		public x:number = NaN;
		
		/**
		 * The y coordinate of the top-left corner of the rectangle. 
		 */		
		public y:number = NaN;
		
		/**
		 * The width of the rectangle, in pixels. 
		 */		
		public width:number = NaN;
		
		/**
		 * The height of the rectangle, in pixels. 
		 */		
		public height:number = NaN;
		
		/**
		 * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and 
		 * with the specified width and height parameters.
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * 
		 */		
		constructor(x:number = 0, y:number = 0, width:number = 0, height:number = 0)
		{
			/**/ x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height));
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}
		
		/**
		 * The x coordinate of the top-left corner of the rectangle. 
		 * @return 
		 * 
		 */		
		public get left():number
		{
			return this.x;
		}
		
		public set left(value:number)
		{
			/**/ value = (+(value));
			this.width += this.x - (this.x = value);
		}
		
		public get right():number
		{
			return this.x + this.width;
		}
		
		/**
		 * The sum of the x and width properties. 
		 * @param value
		 * 
		 */		
		public set right(value:number)
		{
			/**/ value = (+(value));
			this.width = value - this.x;
		}
		
		/**
		 * The y coordinate of the top-left corner of the rectangle. 
		 * @return 
		 * 
		 */		
		public get top():number
		{
			return this.y;
		}
		
		public set top(value:number)
		{
			/**/ value = (+(value));
			this.height += this.y - (this.y = value);
		}
		
		/**
		 * The sum of the y and height properties. 
		 * @return 
		 * 
		 */		
		public get bottom():number
		{
			return this.y + this.height;
		}
		
		public set bottom(value:number)
		{
			/**/ value = (+(value));
			this.height = value - this.y;
		}
		
		/**
		 * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point. 
		 * @return 
		 * 
		 */		
		public get topLeft():Point
		{
			return new Point(this.x, this.y);
		}
		
		public set topLeft(value:Point)
		{
			/**/ value = strict(value, Point);
			this.top = value.y;
			this.left = value.x;
		}
		
		/**
		 * The location of the Rectangle object's bottom-right corner, determined by the values of the right and bottom properties. 
		 * @return 
		 * 
		 */		
		public get bottomRight():Point
		{
			return new Point(this.x + this.width, this.y + this.height);
		}
		
		public set bottomRight(value:Point)
		{
			/**/ value = strict(value, Point);
			this.width = value.x - this.x;
			this.height = value.y - this.y;
		}
		
		/**
		 * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties. 
		 * @return 
		 * 
		 */		
		public get size():Point
		{
			return new Point(this.width, this.height);
		}
		
		public set size(value:Point)
		{
			/**/ value = strict(value, Point);
			this.width = value.x; this.height = value.y;
		}
		
		/**
		 * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object. 
		 * @return 
		 * 
		 */		
		public clone():Rectangle
		{
			return new Rectangle(this.x, this.y, this.width, this.height);
		}
		
		/**
		 * Determines whether or not this Rectangle object is empty. 
		 * @return 
		 * 
		 */		
		public isEmpty():boolean
		{
			return this.width <= 0 || this.height <= 0;
		}
		
		/**
		 * Sets all of the Rectangle object's properties to 0. 
		 * 
		 */		
		public setEmpty():void
		{
			this.x = this.y = this.width = this.height = 0;
		}
		
		/**
		 * Increases the size of the Rectangle object by the specified amounts, in pixels. 
		 * @param dx
		 * @param dy
		 * 
		 */		
		public inflate(dx:number, dy:number):void
		{
			/**/ dx = (+(dx)); dy = (+(dy));
			this.__inflate(dx, dy);
		}
		
		/**
		 * Adds the specified padding to the rectangle's bounds. 
		 * @param top
		 * @param left
		 * @param bottom
		 * @param right
		 * 
		 */		
		public pad(top:number, left:number, bottom:number, right:number):void
		{
			/**/ top = (+(top)); left = (+(left)); bottom = (+(bottom)); right = (+(right));
			this.x -= left;
			this.y -= top;
			this.width += left + right;
			this.height += top + bottom;
		}
		
		/**
		 * Increases the size of the Rectangle object. 
		 * @param point
		 * 
		 */		
		public inflatePoint(point:Point):void
		{
			/**/ point = strict(point, Point);
			this.__inflate (point.x, point.y);
		}
		
		/**
		 * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts. 
		 * @param dx
		 * @param dy
		 * 
		 */		
		public offset(dx:number, dy:number):void
		{
			/**/ dx = (+(dx)); dy = (+(dy));
			this.x += dx;
			this.y += dy;
		}
		
		/**
		 * Adjusts the location of the Rectangle object using a Point object as a parameter. 
		 * @param point
		 * 
		 */		
		public offsetPoint(point:Point):void
		{
			/**/ point = strict(point, Point);
			this.__offsetPoint(point);
		}
		
		/**
		 * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. 
		 * @param x
		 * @param y
		 * @return 
		 * 
		 */		
		public contains(x:number, y:number):boolean
		{
			/**/ x = (+(x)); y = (+(y));
			return x >= this.x && x < this.right &&
				y >= this.y && y < this.bottom;
		}
		
		/**
		 * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. 
		 * @param point
		 * @return 
		 * 
		 */		
		public containsPoint(point:Point):boolean
		{
			/**/ point = strict(point, Point);
			return this.__containsPoint(point);
		}
		
		/**
		 * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object. 
		 * @param rect
		 * @return 
		 * 
		 */		
		public containsRect(rect:Rectangle):boolean
		{
			/**/ rect = strict(rect, Rectangle);
			var r1 = rect.x + rect.width;
			var b1 = rect.y + rect.height;
			var r2 = this.x + this.width;
			var b2 = this.y + this.height;
			return (rect.x >= this.x) &&
				(rect.x < r2)      &&
				(rect.y >= this.y)      &&
				(rect.y < b2)      &&
				(r1 > this.x)           &&
				(r1 <= r2)         &&
				(b1 > this.y)           &&
				(b1 <= b2);
		}
		
		/**
		 * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, 
		 * returns the area of intersection as a Rectangle object. 
		 * @param toIntersect
		 * @return 
		 * 
		 */		
		public intersection(toIntersect:Rectangle):Rectangle
		{
			/**/ toIntersect = strict(toIntersect, Rectangle);
			return this.clone().__intersectInPlace(toIntersect);
		}
		
		/**
		 * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object. 
		 * @param toIntersect
		 * @return 
		 * 
		 */		
		public intersects(toIntersect:Rectangle):boolean
		{
			/**/ toIntersect = strict(toIntersect, Rectangle);
			this.__intersects(toIntersect);
		}
		
		/**
		 * Adds two rectangles together to create a new Rectangle object, 
		 * by filling in the horizontal and vertical space between the two rectangles. 
		 * @param toUnion
		 * @return 
		 * 
		 */		
		public union(toUnion:Rectangle):Rectangle
		{
			/**/ toUnion = strict(toUnion, Rectangle);
			return this.clone().__unionInPlace(toUnion);
		}
		
		/**
		 * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object. 
		 * @param toCompare
		 * @return 
		 * 
		 */		
		public equals(toCompare:Rectangle):boolean
		{
			/**/ toCompare = strict(toCompare, Rectangle);
			this.__equals(toCompare);
		}
		
		/**
		 * Builds and returns a string that lists the horizontal and vertical positions and the width and height of the Rectangle object. 
		 * @return 
		 * 
		 */		
		public toString():string
		{
			return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")";
		}
		
		/**
		 * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object. 
		 * @param sourceRect
		 * 
		 */		
		public copyFrom(sourceRect:Rectangle):void
		{
			/**/ sourceRect = strict(sourceRect, Rectangle);
			this.__copyFrom(sourceRect);
		}
		
		/**
		 * Sets the members of Rectangle to the specified values 
		 * @param xa
		 * @param ya
		 * @param widtha
		 * @param heighta
		 * 
		 */		
		public setTo(xa:number, ya:number, widtha:number, heighta:number):void
		{
			/**/ xa = (+(xa)); ya = (+(ya)); widtha = (+(widtha)); heighta = (+(heighta));
			this.__setTo(xa, ya, widtha, heighta);
		}
		
		/**
		 * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object. 
		 * @param sourceRect
		 * 
		 */		
		/*[internal]*/ protected __copyFrom(sourceRect:Rectangle):void
		{
			// sourceRect = strict(sourceRect, Rectangle);
			this.x = sourceRect.x;
			this.y = sourceRect.y;
			this.width = sourceRect.width;
			this.height = sourceRect.height;
		}
		
		/**
		 * Sets the members of Rectangle to the specified values 
		 * @param xa
		 * @param ya
		 * @param widtha
		 * @param heighta
		 * 
		 */		
		/*[internal]*/ protected __setTo(xa:number, ya:number, widtha:number, heighta:number):void
		{
			// xa = (+(xa)); ya = (+(ya)); widtha = (+(widtha)); heighta = (+(heighta));
			this.x = xa;
			this.y = ya;
			this.width = widtha;
			this.height = heighta;
		}
		
		/**
		 * Adjusts the location of the Rectangle object using a Point object as a parameter. 
		 * @param point
		 * 
		 */		
		/*[internal]*/ protected __offsetPoint(point:Point):void
		{
			// point = strict(point, Point);
			this.x += point.x;
			this.y += point.y;
		}
		
		/**
		 * Helpers 
		 * @param clipRect
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __intersectInPlace(toIntersect: Rectangle): Rectangle
		{
			// toIntersect = strict(toIntersect, Rectangle);
			var x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
			var x1 = this.right > toIntersect.right ? toIntersect.right : this.right;
			
			if (x1 <= x0) {
				
				this.setEmpty();
				return this;
				
			}
			
			var y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
			var y1 = this.bottom > toIntersect.bottom ? toIntersect.bottom : this.bottom;
			
			if (y1 <= y0) {
				
				this.setEmpty();
				return this;
				
			}
			
			this.__setTo(x0, y0, x1 - x0, y1 - y0);
			return this;
		}
		
		/*[internal]*/ protected __unionInPlace(toUnion: Rectangle): Rectangle
		{
			// toUnion = strict(toUnion, Rectangle);
			if (toUnion.isEmpty()) {
				
				return this;
				
			}
			
			if (this.isEmpty()) {
				
				this.__copyFrom(toUnion);
				return this;
				
			}
			
			var l: number = Math.min(this.x, toUnion.x);
			var t: number = Math.min(this.y, toUnion.y);
			this.__setTo(l, t,
				Math.max(this.right, toUnion.right) - l,
				Math.max(this.bottom, toUnion.bottom) - t);
			
			return this;
		}
		
		/**
		 * Increases the size of the Rectangle object by the specified amounts, in pixels. 
		 * @param dx
		 * @param dy
		 * 
		 */		
		/*[internal]*/ protected __inflate(dx:number, dy:number):void
		{
			// dx = (+(dx)); dy = (+(dy));
			this.x -= dx; this.width += dx * 2;
			this.y -= dy; this.height += dy * 2;
		}
		
		/*[internal]*/ protected __inflateCeil(dx:number, dy:number): void
		{
			// dx = (+(dx)); dy = (+(dy));
			this.__inflate(dx, dy);
			this.x = this.x >= 0 ? this.x|0 : Math.floor(this.x);
			this.y = this.y >= 0 ? this.y|0 : Math.floor(this.y);
			this.width = Math.ceil(this.width);
			this.height = Math.ceil(this.height);
		}
		
		/**
		 * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object. 
		 * @param toIntersect
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __intersects(toIntersect:Rectangle):boolean
		{
			// toIntersect = strict(toIntersect, Rectangle);
			return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right) &&
				Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
		}
		
		/**
		 * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. 
		 * @param point
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __containsPoint(point:Point):boolean
		{
			// point = strict(point, Point);
			var x = point.x, y = point.y;
			return x >= this.x && x < this.right &&
				y >= this.y && y < this.bottom;
		}
		
		/**
		 * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object. 
		 * @param toCompare
		 * @return 
		 * 
		 */
		/*[internal]*/ protected __equals(toCompare:Rectangle):void
		{
			// toCompare = strict(toCompare, Rectangle);
			return this === toCompare ||
				this.x == toCompare.x && this.y == toCompare.y
				&& this.width == toCompare.width && this.height == toCompare.height;
		}
		
		/*[internal]*/ protected __transform (rect:Rectangle, m:Matrix):void
		{
			// rect = strict(rect, Rectangle); m = strict(m, Matrix);
			var tx0 = m.a * this.x + m.c * this.y;
			var tx1 = tx0;
			var ty0 = m.b * this.x + m.d * this.y;
			var ty1 = ty0;
			
			var tx = m.a * (this.x + this.width) + m.c * this.y;
			var ty = m.b * (this.x + this.width) + m.d * this.y;
			
			if (tx < tx0) tx0 = tx;
			if (ty < ty0) ty0 = ty;
			if (tx > tx1) tx1 = tx;
			if (ty > ty1) ty1 = ty;
			
			tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
			ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
			
			if (tx < tx0) tx0 = tx;
			if (ty < ty0) ty0 = ty;
			if (tx > tx1) tx1 = tx;
			if (ty > ty1) ty1 = ty;
			
			tx = m.a * this.x + m.c * (this.y + this.height);
			ty = m.b * this.x + m.d * (this.y + this.height);
			
			if (tx < tx0) tx0 = tx;
			if (ty < ty0) ty0 = ty;
			if (tx > tx1) tx1 = tx;
			if (ty > ty1) ty1 = ty;
			
			rect.__setTo (tx0 + m.tx, ty0 + m.ty, tx1 - tx0, ty1 - ty0);
		}
		
		/*[internal]*/ protected __expand (x:number, y:number, width:number, height:number):void
		{
			// x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height));
			if (this.width == 0 && this.height == 0) {
				
				this.x = x;
				this.y = y;
				this.width = width;
				this.height = height;
				return;
				
			}
			
			var cacheRight = this.right;
			var cacheBottom = this.bottom;
			
			if (this.x > x) {
				
				this.x = x;
				this.width =(+( cacheRight - x));
				
			}
			
			if (this.y > y) {
				
				this.y = y;
				this.height =(+( cacheBottom - y));
				
			}
			
			if (cacheRight < x + width) this.width = x + width - this.x;
			if (cacheBottom < y + height) this.height = y + height - this.y;
		}
		
		/*[internal]*/ protected __verify ():Rectangle
		{
			if (this.width < 0) {
				
				this.x += this.width;
				this.width *= -1;
				
			}
			
			if (this.height < 0) {
				
				this.y += this.height;
				this.height *= -1;
				
			}
			
			return this;
		}
		
	}
}