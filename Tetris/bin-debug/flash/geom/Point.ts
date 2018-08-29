/// <reference path="../../base.d.ts" />
/// <reference path="../__native/utils/ObjectPool.ts" />

namespace flash.geom
{
	export import ObjectPool = flash.__native.utils.ObjectPool;
	

	/**
	 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
	 * The following code creates a point at (0,0):
	 * 
	 * var myPoint:Point = new Point();
	 * Methods and properties of the following classes use Point objects:
	 * 
	 * BitmapData
	 * DisplayObject
	 * DisplayObjectContainer
	 * DisplacementMapFilter
	 * NativeWindow
	 * Matrix
	 * Rectangle
	 * You can use the new Point() constructor to create a Point object. 
	 * @author pkulikov
	 * 
	 */	
	export  class Point
	{
		private static __pool = asc.sti(Point,()=>{ Point.__pool = new ObjectPool (function () { return new Point; }.__bind(this), function (p) { p.x = p.y = 0; }.__bind(this)); });
		
		/**
		 * The horizontal coordinate of the point. 
		 */		
		public x:number = NaN;
		
		/**
		 * The vertical coordinate of the point. 
		 */		
		public y:number = NaN;
		
		/**
		 * Creates a new point.
		 * @param x
		 * @param y
		 * 
		 */			
		constructor(x:number = 0, y:number = 0)
		{
			/**/ x = (+(x)); y = (+(y));
			this.x = x;
			this.y = y;
		}
		
		/**
		 * Determines a point between two specified points. 
		 * @param p1
		 * @param p2
		 * @param f
		 * @return 
		 * 
		 */		
		public static interpolate(p1:Point, p2:Point, f:number) : Point
		{
			/**/ p1 = strict(p1, Point); p2 = strict(p2, Point); f = (+(f));
			var f1: number = 1 - f;
			return new Point(p1.x * f + p2.x * f1, p1.y * f + p2.y * f1);
		}
		
		/**
		 * Returns the distance between pt1 and pt2. 
		 * @param p1
		 * @param p2
		 * @return 
		 * 
		 */		
		public static distance(p1:Point, p2:Point) : number
		{
			/**/ p1 = strict(p1, Point); p2 = strict(p2, Point);
			var dx = p2.x - p1.x;
			var dy = p2.y - p1.y;
			return dx == 0 ? Math.abs(dy) : dy == 0 ? Math.abs(dx) : Math.sqrt(dx * dx + dy * dy);
		}
		
		/**
		 * Converts a pair of polar coordinates to a Cartesian point coordinate. 
		 * @param length
		 * @param angle
		 * @return 
		 * 
		 */		
		public static polar(length:number, angle:number) : Point
		{
			/**/ length = (+(length)); angle = (+(angle));
			return new Point(length * Math.cos(angle),
				length * Math.sin(angle));
		}
		
		/**
		 * The length of the line segment from (0,0) to this point. 
		 * @return 
		 * 
		 */			
		public get length() : number
		{
			return Math.sqrt(this.x * this.x + this.y * this.y);
		}
		
		/**
		 * Creates a copy of this Point object. 
		 * @return 
		 * 
		 */		
		public clone() : Point
		{
			return new Point (this.x, this.y);
		}
		
		/**
		 * Offsets the Point object by the specified amount. 
		 * @param dx
		 * @param dy
		 * 
		 */		
		public offset(dx:number, dy:number) : void
		{
			/**/ dx = (+(dx)); dy = (+(dy));
			this.__offset(dx, dy);
		}
		
		/**
		 * Determines whether two points are equal. 
		 * @param toCompare
		 * @return 
		 * 
		 */		
		public equals(toCompare:Point) : boolean
		{
			/**/ toCompare = strict(toCompare, Point);
			this.__equals(toCompare);
		}
		
		/**
		 * Subtracts the coordinates of another point from the coordinates of this point to create a new point. 
		 * @param v
		 * @return 
		 * 
		 */		
		public subtract(v:Point) : Point
		{
			/**/ v = strict(v, Point);
			return new Point (this.x - v.x, this.y - v.y);
		}
		
		/**
		 * Adds the coordinates of another point to the coordinates of this point to create a new point. 
		 * @param v
		 * @return 
		 * 
		 */		
		public add(v:Point) : Point
		{
			/**/ v = strict(v, Point);
			return new Point (v.x + this.x, v.y + this.y);
		}
		
		/**
		 * Scales the line segment between (0,0) and the current point to a set length. 
		 * @param thickness
		 * 
		 */		
		public normalize(thickness:number) : void
		{
			/**/ thickness = (+(thickness));
			if (this.x == 0 && this.y == 0) {
				
				return;
				
			}
			
			var norm = thickness / Math.sqrt (this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
		
		/**
		 * Returns a string that contains the values of the x and y coordinates. 
		 * @return 
		 * 
		 */		
		public toString() : string
		{
			return '(x='+this.x+', y='+this.y+')';
		}
		
		/**
		 * Copies all of the point data from the source Point object into the calling Point object. 
		 * @param sourcePoint
		 * 
		 */		
		public copyFrom(sourcePoint:Point) : void
		{
			/**/ sourcePoint = strict(sourcePoint, Point);
			this.__copyFrom(sourcePoint);
		}
		
		/**
		 * Sets the members of Point to the specified values 
		 * @param xa
		 * @param ya
		 * 
		 */		
		public setTo(xa:number, ya:number) : void
		{
			/**/ xa = (+(xa)); ya = (+(ya));
			this.__setTo(xa, ya);
		}
		
		/**
		 * Sets the members of Point to the specified values 
		 * @param xa
		 * @param ya
		 * 
		 */		
		/*[internal]*/ protected __setTo(xa:number, ya:number) : void
		{
			// xa = (+(xa)); ya = (+(ya));
			this.x = xa;
			this.y = ya;
		}
		
		/**
		 * Determines whether two points are equal. 
		 * @param toCompare
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __equals(toCompare:Point) : boolean
		{
			// toCompare = strict(toCompare, Point);
			return toCompare != null && toCompare.x == this.x && toCompare.y == this.y;
		}
		
		/**
		 * Copies all of the point data from the source Point object into the calling Point object. 
		 * @param sourcePoint
		 * 
		 */		
		/*[internal]*/ protected __copyFrom(sourcePoint:Point) : void
		{
			// sourcePoint = strict(sourcePoint, Point);
			this.x = sourcePoint.x;
			this.y = sourcePoint.y;
		}
		
		/**
		 * Offsets the Point object by the specified amount. 
		 * @param dx
		 * @param dy
		 * 
		 */		
		/*[internal]*/ protected __offset(dx:number, dy:number) : void
		{
			// dx = (+(dx)); dy = (+(dy));
			this.x += dx;
			this.y += dy;
		}
	}
}