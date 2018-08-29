/// <reference path="../../base.d.ts" />

namespace flash.geom
{
	
	/**
	 * The Vector3D class represents a point or a location in the three-dimensional space using the Cartesian coordinates x, y, and z. 
	 * As in a two-dimensional space, the x property represents the horizontal axis and the y property represents the vertical axis. 
	 * In three-dimensional space, the z property represents depth. The value of the x property increases as the object moves to the right. 
	 * The value of the y property increases as the object moves down. 
	 * The z property increases as the object moves farther from the point of view. Using perspective projection and scaling, 
	 * the object is seen to be bigger when near and smaller when farther away from the screen. 
	 * As in a right-handed three-dimensional coordinate system, 
	 * the positive z-axis points away from the viewer and the value of the z property increases as the object moves away 
	 * from the viewer's eye. The origin point (0,0,0) of the global space is the upper-left corner of the stage. 
	 * @author pkulikov
	 * 
	 */	
	export  class Vector3D
	{
		/**
		 * The x axis defined as a Vector3D object with coordinates (1,0,0). 
		 */		
		public static X_AXIS:Vector3D = asc.sti(Vector3D,()=>{ Vector3D.X_AXIS = new Vector3D(1, 0, 0); });
		
		/**
		 * The y axis defined as a Vector3D object with coordinates (0,1,0). 
		 */		
		public static Y_AXIS:Vector3D = asc.sti(Vector3D,()=>{ Vector3D.Y_AXIS = new Vector3D(0, 1, 0); });
		
		/**
		 * The z axis defined as a Vector3D object with coordinates (0,0,1). 
		 */		
		public static Z_AXIS:Vector3D = asc.sti(Vector3D,()=>{ Vector3D.Z_AXIS = new Vector3D(0, 0, 1); });
		
		/**
		 * The first element of a Vector3D object, such as the x coordinate of a point in the three-dimensional space. 
		 */		
		public x:number = NaN;
		
		/**
		 * The second element of a Vector3D object, such as the y coordinate of a point in the three-dimensional space. 
		 */		
		public y:number = NaN;
		
		/**
		 * The third element of a Vector3D object, such as the z coordinate of a point in three-dimensional space. 
		 */		
		public z:number = NaN;
		
		/**
		 * The fourth element of a Vector3D object (in addition to the x, y, and z properties) can hold data such as the angle of rotation. 
		 */		
		public w:number = NaN;
		
		/**
		 * Creates an instance of a Vector3D object.
		 * @param x
		 * @param y
		 * @param z
		 * @param w
		 * 
		 */		
		constructor(x:number = 0.0, y:number = 0.0, z:number = 0.0, w:number = 0.0)
		{
			/**/ x = (+(x)); y = (+(y)); z = (+(z)); w = (+(w));
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
		}
		
		/**
		 * Returns the angle in radians between two vectors. 
		 * @param a
		 * @param b
		 * @return 
		 * 
		 */		
		public static angleBetween(a:Vector3D, b:Vector3D) : number
		{
			/**/ a = strict(a, Vector3D); b = strict(b, Vector3D);
			var la = a.length;
			var lb = b.length;
			var dot = a.dotProduct (b);
			
			if (la != 0) {
				
				dot /= la;
				
			}
			
			if (lb != 0) {
				
				dot /= lb;
				
			}
			
			return Math.acos (dot);
		}
		
		/**
		 * Returns the distance between two Vector3D objects. 
		 * @param pt1
		 * @param pt2
		 * @return 
		 * 
		 */		
		public static distance(pt1:Vector3D, pt2:Vector3D) : number
		{
			/**/ pt1 = strict(pt1, Vector3D); pt2 = strict(pt2, Vector3D);
			var x:number = pt2.x - pt1.x;
			var y:number = pt2.y - pt1.y;
			var z:number = pt2.z - pt1.z;
			
			return Math.sqrt (x * x + y * y + z * z);
		}
		
		/**
		 * Returns a new Vector3D object that is an exact copy of the current Vector3D object. 
		 * @return 
		 * 
		 */		
		public clone() : Vector3D
		{
			return new Vector3D (this.x, this.y, this.z, this.w);
		}
		
		/**
		 * If the current Vector3D object and the one specified as the parameter are unit vertices, 
		 * this method returns the cosine of the angle between the two vertices. 
		 * @param a
		 * @return 
		 * 
		 */		
		public dotProduct(a:Vector3D) : number
		{
			/**/ a = strict(a, Vector3D);
			return this.x * a.x + this.y * a.y + this.z * a.z;
		}
		
		/**
		 * Returns a new Vector3D object that is perpendicular (at a right angle) to the current Vector3D and another Vector3D object. 
		 * @param a
		 * @return 
		 * 
		 */		
		public crossProduct(a:Vector3D) : Vector3D
		{
			/**/ a = strict(a, Vector3D);
			return new Vector3D (this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x, 1);
		}
		
		/**
		 * The length, magnitude, of the current Vector3D object from the origin (0,0,0) to the object's x, y, and z coordinates. 
		 * @return 
		 * 
		 */		
		public get length() : number
		{
			return Math.sqrt (this.x * this.x + this.y * this.y + this.z * this.z);
		}
		
		/**
		 * The square of the length of the current Vector3D object, calculated using the x, y, and z properties. 
		 * @return 
		 * 
		 */		
		public get lengthSquared() : number
		{
			return this.x * this.x + this.y * this.y + this.z * this.z;
		}
		
		/**
		 * Converts a Vector3D object to a unit vector by dividing the first three elements (x, y, z) by the length of the vector. 
		 * @return 
		 * 
		 */		
		public normalize() : number
		{
			var l = this.length;
			
			if (l != 0) {
				
				this.x /= l;
				this.y /= l;
				this.z /= l;
				
			}
			
			return l;
		}
		
		/**
		 * Scales the current Vector3D object by a scalar, a magnitude. 
		 * @param s
		 * 
		 */		
		public scaleBy(s:number) : void
		{
			/**/ s = (+(s));
			this.x *= s;
			this.y *= s;
			this.z *= s;
		}
		
		/**
		 * Increments the value of the x, y, and z elements of the current Vector3D object by the values of the x, y, 
		 * and z elements of a specified Vector3D object. 
		 * @param a
		 * 
		 */		
		public incrementBy(a:Vector3D) : void
		{
			/**/ a = strict(a, Vector3D);
			this.x += a.x;
			this.y += a.y;
			this.z += a.z;
		}
		
		/**
		 * Decrements the value of the x, y, and z elements of the current Vector3D object by the values of the x, y, 
		 * and z elements of specified Vector3D object. 
		 * @param a
		 * 
		 */		
		public decrementBy(a:Vector3D) : void
		{
			/**/ a = strict(a, Vector3D);
			this.x -= a.x;
			this.y -= a.y;
			this.z -= a.z;
		}
		
		/**
		 * Adds the value of the x, y, and z elements of the current Vector3D object to the values of the x, y, 
		 * and z elements of another Vector3D object. 
		 * @param a
		 * @return 
		 * 
		 */		
		public add(a:Vector3D) : Vector3D
		{
			/**/ a = strict(a, Vector3D);
			return new Vector3D (this.x + a.x, this.y + a.y, this.z + a.z);
		}
		
		/**
		 * Subtracts the value of the x, y, and z elements of the current Vector3D object from the values of the x, y, 
		 * and z elements of another Vector3D object. 
		 * @param a
		 * @return 
		 * 
		 */		
		public subtract(a:Vector3D) : Vector3D
		{
			/**/ a = strict(a, Vector3D);
			return new Vector3D (this.x - a.x, this.y - a.y, this.z - a.z);
		}
		
		/**
		 * Sets the current Vector3D object to its inverse. 
		 * 
		 */		
		public negate() : void
		{
			this.x *= -1;
			this.y *= -1;
			this.z *= -1;
		}
		
		/**
		 * Determines whether two Vector3D objects are equal by comparing the x, y, 
		 * and z elements of the current Vector3D object with a specified Vector3D object. 
		 * @param toCompare
		 * @param allFour
		 * @return 
		 * 
		 */		
		public equals(toCompare:Vector3D, allFour:boolean = false) : boolean
		{
			/**/ toCompare = strict(toCompare, Vector3D); allFour = Boolean(allFour);
			return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
		}
		
		/**
		 * Compares the elements of the current Vector3D object with the elements of a specified Vector3D object to 
		 * determine whether they are nearly equal. 
		 * @param toCompare
		 * @param tolerance
		 * @param allFour
		 * @return 
		 * 
		 */		
		public nearEquals(toCompare:Vector3D, tolerance:number, allFour:boolean = false) : boolean
		{
			/**/ toCompare = strict(toCompare, Vector3D); tolerance = (+(tolerance)); allFour = Boolean(allFour);
			return Math.abs (this.x - toCompare.x) < tolerance && Math.abs (this.y - toCompare.y) < tolerance && Math.abs (this.z - toCompare.z) < tolerance && (!allFour || Math.abs (this.w - toCompare.w) < tolerance);
		}
		
		/**
		 * Divides the value of the x, y, and z properties of the current Vector3D object by the value of its w property. 
		 * 
		 */		
		public project() : void
		{
			this.x /= this.w;
			this.y /= this.w;
			this.z /= this.w;
		}
		
		/**
		 * Returns a string representation of the current Vector3D object. 
		 * @return 
		 * 
		 */		
		public toString() : string
		{
			return 'Vector3D(' + this.x + ', ' + this.y + ', ' + this.z + ')';
		}
		
		/**
		 * Copies all of vector data from the source Vector3D object into the calling Vector3D object. 
		 * @param sourceVector3D
		 * 
		 */		
		public copyFrom(sourceVector3D:Vector3D) : void
		{
			/**/ sourceVector3D = strict(sourceVector3D, Vector3D);
			this.x = sourceVector3D.x;
			this.y = sourceVector3D.y;
			this.z = sourceVector3D.z;
		}
		
		/**
		 * Sets the members of Vector3D to the specified values 
		 * @param xa
		 * @param ya
		 * @param za
		 * 
		 */		
		public setTo(xa:number, ya:number, za:number) : void
		{
			/**/ xa = (+(xa)); ya = (+(ya)); za = (+(za));
			this.x = xa;
			this.y = ya;
			this.z = za;
		}
	}

}