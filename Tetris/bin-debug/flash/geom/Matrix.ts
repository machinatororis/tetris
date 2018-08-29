/// <reference path="../../base.d.ts" />
/// <reference path="../__native/utils/ObjectPool.ts" />

namespace flash.geom
{
	export import ObjectPool = flash.__native.utils.ObjectPool;
	

	/**
	 * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to another. 
	 * You can perform various graphical transformations on a display object by setting the properties of a Matrix object, 
	 * applying that Matrix object to the matrix property of a Transform object, 
	 * and then applying that Transform object as the transform property of the display object. 
	 * These transformation functions include translation (x and y repositioning), rotation, scaling, and skewing.
	 * Together these types of transformations are known as affine transformations. 
	 * Affine transformations preserve the straightness of lines while transforming, so that parallel lines stay parallel.
	 * 
	 * To apply a transformation matrix to a display object, you create a Transform object, 
	 * set its matrix property to the transformation matrix, and then set the transform property of the display object to the Transform object.
	 *  Matrix objects are also used as parameters of some methods, such as the following:
	 * 
	 * The draw() method of a BitmapData object
	 * The beginBitmapFill() method, beginGradientFill() method, or lineGradientStyle() method of a Graphics object
	 * @author pkulikov
	 * 
	 */	
	export  class Matrix
	{
		private static __pool = asc.sti(Matrix,()=>{ Matrix.__pool = new ObjectPool (function () { return new Matrix; }.__bind(this), function (m) { m.a = m.d = 1; m.b = m.c = 0; m.tx = m.ty = 0; }.__bind(this)); });
		
		/**
		 * The value that affects the positioning of pixels along the x axis when scaling or rotating an image. 
		 */		
		public a:number = NaN;
		
		/**
		 * The value that affects the positioning of pixels along the y axis when rotating or skewing an image. 
		 */		
		public b:number = NaN;
		
		/**
		 * The value that affects the positioning of pixels along the x axis when rotating or skewing an image. 
		 */		
		public c:number = NaN;
		
		/**
		 * The value that affects the positioning of pixels along the y axis when scaling or rotating an image. 
		 */		
		public d:number = NaN;
		
		/**
		 * The distance by which to translate each point along the x axis. 
		 */		
		public tx:number = NaN;
		
		/**
		 * The distance by which to translate each point along the y axis. 
		 */		
		public ty:number = NaN;
		
		/**
		 * Creates a new Matrix object with the specified parameters.
		 * @param a
		 * @param b
		 * @param c
		 * @param d
		 * @param tx
		 * @param ty
		 * 
		 */		
		constructor(a:number = 1, b:number = 0, c:number = 0, d:number = 1, tx:number = 0, ty:number = 0)
		{
			/**/ a = (+(a)); b = (+(b)); c = (+(c)); d = (+(d)); tx = (+(tx)); ty = (+(ty));
			this.a = a;
			this.b = b;
			this.c = c;
			this.d = d;
			this.tx = tx;
			this.ty = ty;
		}
		
		/**
		 * Returns a new Matrix object that is a clone of this matrix, with an exact copy of the contained object. 
		 * @return 
		 * 
		 */		
		public clone():Matrix
		{
			return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
		}
		
		/**
		 * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. 
		 * @param m
		 * 
		 */		
		public concat(m:Matrix):void
		{
			/**/ m = strict(m, Matrix);
			this.__concat(m);
		}
		
		/**
		 * Performs the opposite transformation of the original matrix. 
		 * 
		 */		
		public invert():void
		{
			if (this.b == 0 && this.c == 0)
			{
				this.a = 1 / this.a;
				this.d = 1 / this.d;
				this.tx *= -this.a;
				this.ty *= -this.d;
			}
			else
			{
				var det = this.a * this.d - this.b * this.c;
				if (det == 0)
				{
					this.a = this.d = 1;
					this.b = this.c = 0;
					this.tx = this.ty = 0;
				} else {
					det = 1 / det;
					var t0 = this.a;
					var t1 = this.b;
					var t2 = this.c;
					var t3 = this.d;
					this.a = t3 * det;
					this.b = -t1 * det;
					this.c = -t2 * det;
					this.d = t0 * det;
					t0 = -(this.b * this.tx + this.d * this.ty);
					this.tx = -(this.a * this.tx + this.c * this.ty);
					this.ty =(+( t0));
				}
			}
		}
		
		/**
		 * Sets each matrix property to a value that causes a null transformation. 
		 * 
		 */		
		public identity():void 
		{
			this.a = this.d = 1;
			this.b = this.c = 0;
			this.tx = this.ty = 0;
		}
		
		/**
		 * Includes parameters for scaling, rotation, and translation. 
		 * @param scaleX
		 * @param scaleY
		 * @param rotation
		 * @param tx
		 * @param ty
		 * 
		 */		
		public createBox(scaleX:number, scaleY:number, rotation:number = 0, tx:number = 0, ty:number = 0):void
		{
			/**/ scaleX = (+(scaleX)); scaleY = (+(scaleY)); rotation = (+(rotation)); tx = (+(tx)); ty = (+(ty));
			var u:number = Math.cos(rotation);
			var v:number = Math.sin(rotation);
			this.a = u * scaleX;
			this.b = v * scaleY;
			this.c = -v * scaleX;
			this.d = u * scaleY;
			this.tx = tx;
			this.ty = ty;
		}
		
		/**
		 * Creates the specific style of matrix expected by the beginGradientFill() and lineGradientStyle() methods of the Graphics class. 
		 * @param width
		 * @param height
		 * @param rotation
		 * @param tx
		 * @param ty
		 * 
		 */		
		public createGradientBox(width:number, height:number, rotation:number = 0, tx:number = 0, ty:number = 0):void
		{
			/**/ width = (+(width)); height = (+(height)); rotation = (+(rotation)); tx = (+(tx)); ty = (+(ty));
			this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
		}
		
		/**
		 * Applies a rotation transformation to the Matrix object. 
		 * @param angle
		 * 
		 */		
		public rotate(angle:number):void
		{
			/**/ angle = (+(angle));
			var u:number = Math.cos(angle);
			var v:number = Math.sin(angle);
			var t0 = this.a;
			var t1 = this.c;
			var t2 = this.tx;
			
			this.a = u * this.a - v * this.b;
			this.b = v * t0 + u * this.b;
			this.c = u * this.c - v * this.d;
			this.d = v * t1 + u * this.d;
			this.tx = u * this.tx - v * this.ty;
			this.ty = v * t2 + u * this.ty;
		}
		
		/**
		 * Translates the matrix along the x and y axes, as specified by the dx and dy parameters. 
		 * @param dx
		 * @param dy
		 * 
		 */		
		public translate(dx:number, dy:number):void
		{
			/**/ dx = (+(dx)); dy = (+(dy));
			this.__translate(dx, dy);
		}
		
		/**
		 * Applies a scaling transformation to the matrix. 
		 * @param sx
		 * @param sy
		 * 
		 */		
		public scale(sx:number, sy:number):void
		{
			/**/ sx = (+(sx)); sy = (+(sy));
			this.__scale(sx, sy);
		}
		
		/**
		 * Given a point in the pretransform coordinate space, returns the coordinates of that point after the transformation occurs. 
		 * @param point
		 * @return 
		 * 
		 */		
		public deltaTransformPoint(point:Point):Point
		{
			/**/ point = strict(point, Point);
			return this.__deltaTransformPointInPlace(point.clone());
		}
		
		/**
		 * Returns the result of applying the geometric transformation represented by the Matrix object to the specified point. 
		 * @param point
		 * @return 
		 * 
		 */		
		public transformPoint(point:Point):Point
		{
			/**/ point = strict(point, Point);
			return new Point(this.a * point.x + this.c * point.y + this.tx, this.d * point.y + this.b * point.x + this.ty);
		}
		
		/**
		 * Returns a text value listing the properties of the Matrix object. 
		 * @return 
		 * 
		 */		
		public toString():string
		{
			return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
		}
		
		/**
		 * Copies all of the matrix data from the source Point object into the calling Matrix object. 
		 * @param sourceMatrix
		 * 
		 */		
		public copyFrom(sourceMatrix:Matrix):void
		{
			/**/ sourceMatrix = strict(sourceMatrix, Matrix);
			this.__copyFrom(sourceMatrix);
		}
		
		/**
		 * Sets the members of Matrix to the specified values 
		 * @param aa
		 * @param ba
		 * @param ca
		 * @param da
		 * @param txa
		 * @param tya
		 * 
		 */		
		public setTo(aa:number, ba:number, ca:number, da:number, txa:number, tya:number):void
		{
			/**/ aa = (+(aa)); ba = (+(ba)); ca = (+(ca)); da = (+(da)); txa = (+(txa)); tya = (+(tya));
			this.__setTo(aa, ba, ca, da, txa, tya);
		}
		
		/**
		 * Copies specific row of the calling Matrix object into the Vector3D object. 
		 * @param row
		 * @param vector3D
		 * 
		 */		
		public copyRowTo(row:number, vector3D:Vector3D):void
		{
			/**/ row = ((row) >>> 0); vector3D = strict(vector3D, Vector3D);
			switch (row)
			{
				case 0: 
					break;
				case 1: 
					vector3D.x = this.b;
					vector3D.y = this.d;
					vector3D.z = this.ty;
					break;
				case 2: 
				case 3: 
					vector3D.x = 0;
					vector3D.y = 0;
					vector3D.z = 1;
					break;
				default: 
					vector3D.x = this.a;
					vector3D.y = this.c;
					vector3D.z = this.tx;
			}
		}
		
		/**
		 * Copies specific column of the calling Matrix object into the Vector3D object. 
		 * @param column
		 * @param vector3D
		 * 
		 */		
		public copyColumnTo(column:number, vector3D:Vector3D):void
		{
			/**/ column = ((column) >>> 0); vector3D = strict(vector3D, Vector3D);
			switch (column)
			{
				case 0: 
					break;
				case 1: 
					vector3D.x = this.c;
					vector3D.y = this.d;
					vector3D.z = 0;
					break;
				case 2: 
				case 3: 
					vector3D.x = this.tx;
					vector3D.y = this.ty;
					vector3D.z = 1;
					break;
				default: 
					vector3D.x = this.a;
					vector3D.y = this.b;
					vector3D.z = 0;
			}
		}
		
		/**
		 * Copies a Vector3D object into specific row of the calling Matrix object. 
		 * @param row
		 * @param vector3D
		 * 
		 */		
		public copyRowFrom(row:number, vector3D:Vector3D):void
		{
			/**/ row = ((row) >>> 0); vector3D = strict(vector3D, Vector3D);
			switch (row)
			{
				case 0: 
					break;
				case 1: 
				case 2: 
					this.b = vector3D.x;
					this.d = vector3D.y;
					this.ty = vector3D.z;
					break;
				default: 
					this.a = vector3D.x;
					this.c = vector3D.y;
					this.tx = vector3D.z;
			}
		}
		
		/**
		 * Copies a Vector3D object into specific column of the calling Matrix3D object. 
		 * @param column
		 * @param vector3D
		 * 
		 */		
		public copyColumnFrom(column:number, vector3D:Vector3D):void
		{
			/**/ column = ((column) >>> 0); vector3D = strict(vector3D, Vector3D);
			switch (column)
			{
				case 0: 
					break;
				case 1: 
				case 2: 
					this.b = vector3D.x;
					this.d = vector3D.y;
					this.ty = vector3D.z;
					break;
				default: 
					this.a = vector3D.x;
					this.c = vector3D.y;
					this.tx = vector3D.z;
			}
		}
		
		/**
		 * Copies all of the matrix data from the source Point object into the calling Matrix object. 
		 * @param sourceMatrix
		 * 
		 */
		/*[internal]*/ protected __copyFrom(sourceMatrix:Matrix, withPosition:boolean = true):void
		{
			// sourceMatrix = strict(sourceMatrix, Matrix); withPosition = Boolean(withPosition);
			this.a = sourceMatrix.a;
			this.b = sourceMatrix.b;
			this.c = sourceMatrix.c;
			this.d = sourceMatrix.d;
			
			if (withPosition) {
				
				this.tx = sourceMatrix.tx;
				this.ty = sourceMatrix.ty;
				
			} else {
				
				this.tx = this.ty = 0;
				
			}
		}
		
		/**
		 * Translates the matrix along the x and y axes, as specified by the dx and dy parameters. 
		 * @param dx
		 * @param dy
		 * 
		 */		
		/*[internal]*/ protected __translate(dx:number, dy:number):void
		{
			// dx = (+(dx)); dy = (+(dy));
			this.tx += dx;
			this.ty += dy;
		}
		
		/**
		 * Translates the matrix along the x and y axes, as specified by the dx and dy parameters. 
		 * @param dx
		 * @param dy
		 * 
		 */		
		/*[internal]*/ protected __translateTransformed(dx:number, dy:number):void
		{
			// dx = (+(dx)); dy = (+(dy));
			this.tx = dx * this.a + dy * this.c + this.tx;
			this.ty = dx * this.b + dy * this.d + this.ty;
		}
		
		/*[internal]*/ protected __transformRectangleInPlace(rect:Rectangle):Rectangle
		{
			// rect = strict(rect, Rectangle);
			var left = rect.left, top = rect.top, right = rect.right, bottom = rect.bottom;
			
			var x1 = this.a * left + this.c * top + this.tx;
			var x2 = this.a * right + this.c * top + this.tx;
			var x3 = this.a * left + this.c * bottom + this.tx;
			var x4 = this.a * right + this.c * bottom + this.tx;
			
			var y1 = this.d * top + this.b * left + this.ty;
			var y2 = this.d * top + this.b * right + this.ty;
			var y3 = this.d * bottom + this.b * left + this.ty;
			var y4 = this.d * bottom + this.b * right + this.ty;
			
			left = Math.min(x1, x2, x3, x4);
			right = Math.max(x1, x2, x3, x4);
			top = Math.min(y1, y2, y3, y4);
			bottom = Math.max(y1, y2, y3, y4);
			
			rect.__setTo(left, top, right - left, bottom - top);
			return rect;
		}
		
		/*[internal]*/ protected __transformPointInPlace(point:Point):Point
		{
			// point = strict(point, Point);
			var x = point.x;
			var y = point.y;
			
			point.x = this.a * x + this.c * y + this.tx;
			point.y = this.d * y + this.b * x + this.ty;
			
			return point;
		}
		
		/**
		 * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. 
		 * @param m
		 * 
		 */		
		/*[internal]*/ protected __concat(m:Matrix):void
		{
			// m = strict(m, Matrix);
			var t0 = this.a;
			this.a = this.a * m.a + this.b * m.c;
			this.b = t0 * m.b + this.b * m.d;
			
			t0 = this.c;
			this.c = this.c * m.a + this.d * m.c;
			this.d = t0 * m.b + this.d * m.d;
			
			t0 = this.tx;
			this.tx = this.tx * m.a + this.ty * m.c + m.tx;
			this.ty = t0 * m.b + this.ty * m.d + m.ty;
		}
		
		/**
		 * Applies a scaling transformation to the matrix. 
		 * @param sx
		 * @param sy
		 * 
		 */		
		/*[internal]*/ protected __scale(sx:number, sy:number):void
		{
			// sx = (+(sx)); sy = (+(sy));
			this.a *= sx;
			this.b *= sy;
			this.c *= sx;
			this.d *= sy;
			this.tx *= sx;
			this.ty *= sy;
		}
		
		/*[internal]*/ protected __getScaleX():number
		{
			if (this.b == 0) {
				
				return this.a;
				
			}
			
			return Math.sqrt(this.a * this.a + this.b * this.b);
		}
		
		/*[internal]*/ protected __getScaleY():number
		{
			if (this.c == 0) {
				
				return this.d;
				
			}
			
			return Math.sqrt(this.c * this.c + this.d * this.d);
		}
		
		/**
		 * Sets the members of Matrix to the specified values 
		 * @param aa
		 * @param ba
		 * @param ca
		 * @param da
		 * @param txa
		 * @param tya
		 * 
		 */		
		/*[internal]*/ protected __setTo(aa:number, ba:number, ca:number, da:number, txa:number, tya:number):void
		{
			// aa = (+(aa)); ba = (+(ba)); ca = (+(ca)); da = (+(da)); txa = (+(txa)); tya = (+(tya));
			this.a = aa;
			this.b = ba;
			this.c = ca;
			this.d = da;
			this.tx = txa;
			this.ty = tya;
		}
		
		/**
		 * Determines whether the object specified in the toCompare parameter is equal to this Matrix object. 
		 * @param toCompare
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __equals(toCompare:Matrix, withPosition:boolean = true):boolean
		{
			// toCompare = strict(toCompare, Matrix); withPosition = Boolean(withPosition);
			return this === toCompare ||
				this.a == toCompare.a && this.b == toCompare.b && this.c == toCompare.c && this.d == toCompare.d && 
				(!withPosition || this.tx == toCompare.tx && this.ty == toCompare.ty);
		}
		
		/*[internal]*/ protected __isIdentical():boolean
		{
			return this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1 && this.tx == 0 && this.ty == 0;
		}
		
		/**
		 * Given a point in the pretransform coordinate space, returns the coordinates of that point after the transformation occurs. 
		 * @param point
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __deltaTransformPointInPlace(point : Point) : Point
		{
			// point = strict(point, Point);
			point.__setTo(this.a * point.x + this.c * point.y, this.d * point.y + this.b * point.x);
			return this;
		}
	}
}