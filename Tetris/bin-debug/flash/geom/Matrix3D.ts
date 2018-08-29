/// <reference path="../../base.d.ts" />

namespace flash.geom
{
	
	/**
	 * The Matrix3D class represents a transformation matrix that determines the position and orientation of a 
	 * three-dimensional (3D) display object. The matrix can perform transformation functions including translation 
	 * (repositioning along the x, y, and z axes), rotation, and scaling (resizing). 
	 * The Matrix3D class can also perform perspective projection, 
	 * which maps points from the 3D coordinate space to a two-dimensional (2D) view.
	 * A single matrix can combine multiple transformations and apply them at once to a 3D display object. 
	 * For example, a matrix can be applied to 3D coordinates to perform a rotation followed by a translation.
	 * 
	 * When you explicitly set the z property or any of the rotation or scaling properties of a display object, 
	 * a corresponding Matrix3D object is automatically created.
	 * 
	 * You can access a 3D display object's Matrix3D object through the transform.matrix3d property. 
	 * 2D objects do not have a Matrix3D object.
	 * 
	 * The value of the z property of a 2D object is zero and the value of its matrix3D property is null.
	 * 
	 * Note: If the same Matrix3D object is assigned to two different display objects, a runtime error is thrown. 
	 * @author pkulikov
	 * 
	 */	
	export  class Matrix3D
	{
		/**
		 * Creates a Matrix3D object. 
		 * @param v
		 * 
		 */		
		constructor(v : number[] = null)
		{ 
			if (v != null && v.length == 16) {
				
				this.rawData = v.concat ();
				
			} else {
				
				this.rawData = (<number[]>[ 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0 ]);
				
			}
		}
		
		/**
		 * A Number that determines whether a matrix is invertible. 
		 * @return 
		 * 
		 */		
		public get determinant() : number
		{ 
			return 1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) 
				- (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7])
				+ (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7])
				+ (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3])
				- (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3])
				+ (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3])); 
		}
		
		/**
		 * A Vector3D object that holds the position, 
		 * the 3D coordinate (x,y,z) of a display object within the transformation's frame of reference. 
		 * @return 
		 * 
		 */		
		public get position() : Vector3D
		{
			return new Vector3D (this.rawData[12], this.rawData[13], this.rawData[14]);
		}
		
		public set position( val : Vector3D )
		{	
			/**/ val = strict(val, Vector3D);	
			this.rawData[12] = val.x;
			this.rawData[13] = val.y;
			this.rawData[14] = val.z;
		}
		
		/**
		 * A Vector of 16 Numbers, where every four elements is a column of a 4x4 matrix. 
		 */		
		public rawData : number[] = undefined;
		
		/**
		 * Appends the matrix by multiplying another Matrix3D object by the current Matrix3D object 
		 * @param lhs
		 * 
		 */		
		public append(lhs : Matrix3D) : void
		{
			/**/ lhs = strict(lhs, Matrix3D);
			var m111:number =  (+(this.rawData[0])), m121:number =  (+(this.rawData[4])), m131:number =  (+(this.rawData[8])), m141:number =  (+(this.rawData[12])),
				m112:number =  (+(this.rawData[1])), m122:number =  (+(this.rawData[5])), m132:number =  (+(this.rawData[9])), m142:number =  (+(this.rawData[13])),
				m113:number =  (+(this.rawData[2])), m123:number =  (+(this.rawData[6])), m133:number =  (+(this.rawData[10])), m143:number =  (+(this.rawData[14])),
				m114:number =  (+(this.rawData[3])), m124:number =  (+(this.rawData[7])), m134:number =  (+(this.rawData[11])), m144:number =  (+(this.rawData[15])),
				m211:number =  (+(lhs.rawData[0])), m221:number =  (+(lhs.rawData[4])), m231:number =  (+(lhs.rawData[8])), m241:number =  (+(lhs.rawData[12])),
				m212:number =  (+(lhs.rawData[1])), m222:number =  (+(lhs.rawData[5])), m232:number =  (+(lhs.rawData[9])), m242:number =  (+(lhs.rawData[13])),
				m213:number =  (+(lhs.rawData[2])), m223:number =  (+(lhs.rawData[6])), m233:number =  (+(lhs.rawData[10])), m243:number =  (+(lhs.rawData[14])),
				m214:number =  (+(lhs.rawData[3])), m224:number =  (+(lhs.rawData[7])), m234:number =  (+(lhs.rawData[11])), m244:number =  (+(lhs.rawData[15]));
			
			this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
			this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
			this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
			this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
			
			this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
			this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
			this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
			this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
			
			this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
			this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
			this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
			this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
			
			this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
			this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
			this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
			this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
		}
		
		/**
		 * Appends an incremental rotation to a Matrix3D object. 
		 * @param degrees
		 * @param axis
		 * @param pivotPoint
		 * 
		 */		
		public appendRotation(degrees : number, axis : Vector3D, pivotPoint : Vector3D = null) : void
		{
			/**/ degrees = (+(degrees)); axis = strict(axis, Vector3D); pivotPoint = strict(pivotPoint, Vector3D);
			var tx:number = NaN, ty:number = NaN, tz:number = NaN;
			tx = ty = tz = 0;
			
			if (pivotPoint != null) {
				tx = pivotPoint.x;
				ty = pivotPoint.y;
				tz = pivotPoint.z;
			}
			var radian = degrees * Math.PI/180;
			var cos = Math.cos(radian);
			var sin = Math.sin(radian);
			var x = axis.x;
			var y = axis.y;
			var z = axis.z;
			var x2 = x * x;
			var y2 = y * y;
			var z2 = z * z;
			var ls = x2 + y2 + z2;
			if (ls != 0) {
				var l = Math.sqrt(ls);
				x /= l;
				y /= l;
				z /= l;
				x2 /= ls;
				y2 /= ls;
				z2 /= ls;
			}
			var ccos = 1 - cos;
			var m = new Matrix3D();
			var d = m.rawData;
			d[0]  = x2 + (y2 + z2) * cos;
			d[1]  = x * y * ccos + z * sin;
			d[2]  = x * z * ccos - y * sin;
			d[4]  = x * y * ccos - z * sin;
			d[5]  = y2 + (x2 + z2) * cos;
			d[6]  = y * z * ccos + x * sin;
			d[8]  = x * z * ccos + y * sin;
			d[9]  = y * z * ccos - x * sin;
			d[10] = z2 + (x2 + y2) * cos;
			d[12] = (tx * (y2 + z2) - x * (ty * y + tz * z)) * ccos + (ty * z - tz * y) * sin;
			d[13] = (ty * (x2 + z2) - y * (tx * x + tz * z)) * ccos + (tz * x - tx * z) * sin;
			d[14] = (tz * (x2 + y2) - z * (tx * x + ty * y)) * ccos + (tx * y - ty * x) * sin;
			this.append(m);
		}
		
		/**
		 * Appends an incremental scale change along the x, y, and z axes to a Matrix3D object. 
		 * @param xScale
		 * @param yScale
		 * @param zScale
		 * 
		 */		
		public appendScale(xScale : number, yScale : number, zScale : number) : void 
		{
			/**/ xScale = (+(xScale)); yScale = (+(yScale)); zScale = (+(zScale));
			this.append (new Matrix3D ((<number[]>[ xScale, 0.0, 0.0, 0.0, 0.0, yScale, 0.0, 0.0, 0.0, 0.0, zScale, 0.0, 0.0, 0.0, 0.0, 1.0 ])));
		}
		
		/**
		 * Appends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object. 
		 * @param x
		 * @param y
		 * @param z
		 * 
		 */		
		public appendTranslation(x : number, y : number, z : number) : void
		{
			/**/ x = (+(x)); y = (+(y)); z = (+(z));
			this.rawData[12] += x;
			this.rawData[13] += y;
			this.rawData[14] += z;
		}
		
		/**
		 * Returns a new Matrix3D object that is an exact copy of the current Matrix3D object. 
		 * @return 
		 * 
		 */		
		public clone() : Matrix3D
		{
			return new Matrix3D (this.rawData.concat ());
		}
		
		/**
		 * Copies a Vector3D object into specific column of the calling Matrix3D ob 
		 * @param column
		 * @param vector3D
		 * 
		 */		
		public copyColumnFrom(column : number, vector3D : Vector3D) : void
		{
			/**/ column = ((column) >> 0); vector3D = strict(vector3D, Vector3D);
			switch (column) {
				
				case 0:
					
					this.rawData[0] = vector3D.x;
					this.rawData[1] = vector3D.y;
					this.rawData[2] = vector3D.z;
					this.rawData[3] = vector3D.w;
					break;
				
				case 1:
					
					this.rawData[4] = vector3D.x;
					this.rawData[5] = vector3D.y;
					this.rawData[6] = vector3D.z;
					this.rawData[7] = vector3D.w;
					break;
				
				case 2:
					
					this.rawData[8] = vector3D.x;
					this.rawData[9] = vector3D.y;
					this.rawData[10] = vector3D.z;
					this.rawData[11] = vector3D.w;
					break;
				
				case 3:
					
					this.rawData[12] = vector3D.x;
					this.rawData[13] = vector3D.y;
					this.rawData[14] = vector3D.z;
					this.rawData[15] = vector3D.w;
					break;
				
			}
		}
		
		/**
		 * Copies specific column of the calling Matrix3D object into the Vector3D object. 
		 * @param column
		 * @param vector3D
		 * 
		 */		
		public copyColumnTo(column : number, vector3D : Vector3D) : void
		{
			/**/ column = ((column) >> 0); vector3D = strict(vector3D, Vector3D);
			switch (column) {
				
				case 0:
					
					vector3D.x =(+( this.rawData[0]));
					vector3D.y =(+( this.rawData[1]));
					vector3D.z =(+( this.rawData[2]));
					vector3D.w =(+( this.rawData[3]));
					break;
				
				case 1:
					
					vector3D.x =(+( this.rawData[4]));
					vector3D.y =(+( this.rawData[5]));
					vector3D.z =(+( this.rawData[6]));
					vector3D.w =(+( this.rawData[7]));
					break;
				
				case 2:
					
					vector3D.x =(+( this.rawData[8]));
					vector3D.y =(+( this.rawData[9]));
					vector3D.z =(+( this.rawData[10]));
					vector3D.w =(+( this.rawData[11]));
					break;
				
				case 3:
					
					vector3D.x =(+( this.rawData[12]));
					vector3D.y =(+( this.rawData[13]));
					vector3D.z =(+( this.rawData[14]));
					vector3D.w =(+( this.rawData[15]));
					break;
				
			}
		}
		
		/**
		 * Copies all of the matrix data from the source Matrix3D object into the calling Matrix3D object. 
		 * @param other
		 * 
		 */		
		public copyFrom(other : Matrix3D) : void
		{
			/**/ other = strict(other, Matrix3D);
			this.rawData = other.rawData.concat ();
		}
		
		/**
		 * Copies all of the vector data from the source vector object into the calling Matrix3D object. 
		 * @param vector
		 * @param index
		 * @param transpose
		 * 
		 */		
		public copyRawDataFrom(vector : number[], index : number = 0, transpose : boolean = false) : void
		{
			/**/ index = ((index) >>> 0); transpose = Boolean(transpose);
			if (transpose) {
				
				this.transpose ();
				
			}
			
			var length = vector.length - index;
			
			for (var i = 0; i < length; ++i) {
				
				this.rawData[i] = vector[i + index];
				
			}
			
			if (transpose) {
				
				this.transpose ();
				
			}
		}
		
		/**
		 * Copies all of the matrix data from the calling Matrix3D object into the provided vector. 
		 * @param vector
		 * @param index
		 * @param transpose
		 * 
		 */		
		public copyRawDataTo(vector : number[], index : number = 0, transpose : boolean = false) : void
		{
			/**/ index = ((index) >>> 0); transpose = Boolean(transpose);
			if (transpose) {
				
				this.transpose ();
				
			}
			
			var length = this.rawData.length;
			for (var i = 0; i < length; ++i) {
				
				vector[i + index] = this.rawData[i];
				
			}
			
			if (transpose) {
				
				this.transpose ();
				
			}
		}
		
		/**
		 * Copies a Vector3D object into specific row of the calling Matrix3D object. 
		 * @param row
		 * @param vector3D
		 * 
		 */		
		public copyRowFrom(row : number, vector3D : Vector3D) : void
		{
			/**/ row = ((row) >>> 0); vector3D = strict(vector3D, Vector3D);
			switch (row) {
				
				case 0:
					
					this.rawData[0] = vector3D.x;
					this.rawData[4] = vector3D.y;
					this.rawData[8] = vector3D.z;
					this.rawData[12] = vector3D.w;
					break;
				
				case 1:
					
					this.rawData[1] = vector3D.x;
					this.rawData[5] = vector3D.y;
					this.rawData[9] = vector3D.z;
					this.rawData[13] = vector3D.w;
					break;
				
				case 2:
					
					this.rawData[2] = vector3D.x;
					this.rawData[6] = vector3D.y;
					this.rawData[10] = vector3D.z;
					this.rawData[14] = vector3D.w;
					break;
				
				case 3:
					
					this.rawData[3] = vector3D.x;
					this.rawData[7] = vector3D.y;
					this.rawData[11] = vector3D.z;
					this.rawData[15] = vector3D.w;
					break;
				
			}
		}
		
		/**
		 * Copies specific row of the calling Matrix3D object into the Vector3D object. 
		 * @param row
		 * @param vector3D
		 * 
		 */		
		public copyRowTo(row : number,vector3D : Vector3D) : void
		{
			/**/ row = ((row) >> 0); vector3D = strict(vector3D, Vector3D);
			switch (row) {
				
				case 0:
					
					vector3D.x =(+( this.rawData[0]));
					vector3D.y =(+( this.rawData[4]));
					vector3D.z =(+( this.rawData[8]));
					vector3D.w =(+( this.rawData[12]));
					break;
				
				case 1:
					
					vector3D.x =(+( this.rawData[1]));
					vector3D.y =(+( this.rawData[5]));
					vector3D.z =(+( this.rawData[9]));
					vector3D.w =(+( this.rawData[13]));
					break;
				
				case 2:
					
					vector3D.x =(+( this.rawData[2]));
					vector3D.y =(+( this.rawData[6]));
					vector3D.z =(+( this.rawData[10]));
					vector3D.w =(+( this.rawData[14]));
					break;
				
				case 3:
					
					vector3D.x =(+( this.rawData[3]));
					vector3D.y =(+( this.rawData[7]));
					vector3D.z =(+( this.rawData[11]));
					vector3D.w =(+( this.rawData[15]));
					break;
				
			}
		}
		
		/**
		 * 
		 * @param other
		 * 
		 */		
		public copyToMatrix3D(other : Matrix3D) : void
		{
			/**/ other = strict(other, Matrix3D);
			other.rawData = this.rawData.concat ();
		}
		
		/**
		 * 
		 * @param x
		 * @param y
		 * @param scale
		 * @param rotation
		 * @return 
		 * 
		 */		
		public static create2D (x:number, y:number, scale:number = 1, rotation:number = 0):Matrix3D
		{
			
			/**/ x = (+(x)); y = (+(y)); scale = (+(scale)); rotation = (+(rotation));
			
			var theta = rotation * Math.PI / 180.0;
			var c = Math.cos (theta);
			var s = Math.sin (theta);
			
			return new Matrix3D ((<number[]>[ c * scale, -s * scale, 0, 0, s * scale, c * scale, 0, 0, 0, 0, 1, 0, x, y, 0, 1 ]));
			
		}
		
		/**
		 * 
		 * @param a
		 * @param b
		 * @param c
		 * @param d
		 * @param tx
		 * @param ty
		 * @return 
		 * 
		 */		
		public static createABCD (a:number, b:number, c:number, d:number, tx:number, ty:number):Matrix3D
		{
			
			/**/ a = (+(a)); b = (+(b)); c = (+(c)); d = (+(d)); tx = (+(tx)); ty = (+(ty));
			
			return new Matrix3D ((<number[]>[ a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1 ]));
			
		}
		
		/**
		 * 
		 * @param x0
		 * @param x1
		 * @param y0
		 * @param y1
		 * @param zNear
		 * @param zFar
		 * @return 
		 * 
		 */		
		public static createOrtho (x0:number, x1:number, y0:number, y1:number, zNear:number, zFar:number):Matrix3D
		{
			
			/**/ x0 = (+(x0)); x1 = (+(x1)); y0 = (+(y0)); y1 = (+(y1)); zNear = (+(zNear)); zFar = (+(zFar));
			
			var sx = 1.0 / (x1 - x0);
			var sy = 1.0 / (y1 - y0);
			var sz = 1.0 / (zFar - zNear);
			
			return new Matrix3D ((<number[]>[ 2.0 * sx, 0, 0, 0, 0, 2.0 * sy, 0, 0, 0, 0, -2.0 * sz, 0, -(x0 + x1) * sx, -(y0 + y1) * sy, -(zNear + zFar) * sz, 1 ]));
			
		}
		
		/**
		 * Returns the transformation matrix's translation, rotation, and scale settings as a Vector of three Vector3D objects. 
		 * @param orientationStyle
		 * @return 
		 * 
		 */		
		public decompose(orientationStyle : string = null) : Vector3D[]
		{
			/**/ orientationStyle = as(orientationStyle, 'String');
			if (orientationStyle == null) {
				
				orientationStyle = Orientation3D.EULER_ANGLES;
				
			}
			
			var vec = new Array<Vector3D> ();
			var m = this.clone ();
			var mr = m.rawData.concat ();
			
			var pos = new Vector3D (mr[12], mr[13], mr[14]);
			mr[12] = 0;
			mr[13] = 0;
			mr[14] = 0;
			
			var scale = new Vector3D ();
			
			scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
			scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
			scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);
			
			if (mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0) {
				
				scale.z = -scale.z;
				
			}
			
			mr[0] /= scale.x;
			mr[1] /= scale.x;
			mr[2] /= scale.x;
			mr[4] /= scale.y;
			mr[5] /= scale.y;
			mr[6] /= scale.y;
			mr[8] /= scale.z;
			mr[9] /= scale.z;
			mr[10] /= scale.z;
			
			var rot = new Vector3D ();
			
			switch (orientationStyle) {
				
				case Orientation3D.AXIS_ANGLE:
					
					rot.w = Math.acos ((mr[0] + mr[5] + mr[10] - 1) / 2);
					
					var len = Math.sqrt ((mr[6] - mr[9]) * (mr[6] - mr[9]) + (mr[8] - mr[2]) * (mr[8] - mr[2]) + (mr[1] - mr[4]) * (mr[1] - mr[4]));
					
					if (len != 0) {
						
						rot.x = (mr[6] - mr[9]) / len;
						rot.y = (mr[8] - mr[2]) / len;
						rot.z = (mr[1] - mr[4]) / len;
						
					} else {
						
						rot.x = rot.y = rot.z = 0;
						
					}
					break;
				
				case Orientation3D.QUATERNION:
					
					var tr = mr[0] + mr[5] + mr[10];
					
					if (tr > 0) {
						
						rot.w = Math.sqrt (1 + tr) / 2;
						
						rot.x = (mr[6] - mr[9]) / (4 * rot.w);
						rot.y = (mr[8] - mr[2]) / (4 * rot.w);
						rot.z = (mr[1] - mr[4]) / (4 * rot.w);
						
					} else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
						
						rot.x = Math.sqrt (1 + mr[0] - mr[5] - mr[10]) / 2;
						
						rot.w = (mr[6] - mr[9]) / (4 * rot.x);
						rot.y = (mr[1] + mr[4]) / (4 * rot.x);
						rot.z = (mr[8] + mr[2]) / (4 * rot.x);
						
					} else if (mr[5] > mr[10]) {
						
						rot.y = Math.sqrt (1 + mr[5] - mr[0] - mr[10]) / 2;
						
						rot.x = (mr[1] + mr[4]) / (4 * rot.y);
						rot.w = (mr[8] - mr[2]) / (4 * rot.y);
						rot.z = (mr[6] + mr[9]) / (4 * rot.y);
						
					} else {
						
						rot.z = Math.sqrt (1 + mr[10] - mr[0] - mr[5]) / 2;
						
						rot.x = (mr[8] + mr[2]) / (4 * rot.z);
						rot.y = (mr[6] + mr[9]) / (4 * rot.z);
						rot.w = (mr[1] - mr[4]) / (4 * rot.z);
						
					}
					break;
				
				case Orientation3D.EULER_ANGLES:
					
					rot.y = Math.asin (-mr[2]);
					
					if (mr[2] != 1 && mr[2] != -1) {
						
						rot.x = Math.atan2 (mr[6], mr[10]);
						rot.z = Math.atan2 (mr[1], mr[0]);
						
					} else {
						
						rot.z = 0;
						rot.x = Math.atan2 (mr[4], mr[5]);
						
					}
					break;
				
			}
			
			vec.push (pos);
			vec.push (rot);
			vec.push (scale);
			
			return vec;
		}
		
		/**
		 * Uses the transformation matrix without its translation elements to transform a Vector3D object from one space coordinate to another. 
		 * @param v
		 * @return 
		 * 
		 */		
		public deltaTransformVector(v : Vector3D) : Vector3D
		{
			/**/ v = strict(v, Vector3D);
			var x:number = v.x, y:number = v.y, z:number = v.z;
			
			return new Vector3D ((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[3]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[7]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[11]), 0);
		}
		
		/**
		 * Converts the current matrix to an identity or unit matrix. 
		 * 
		 */		
		public identity() : void
		{
			this.rawData = (<number[]>[ 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0 ]);
		}
		
		/**
		 * Interpolates this matrix towards the translation, rotation, and scale transformations of the target matrix. 
		 * @param toMat
		 * @param percent
		 * 
		 */		
		public interpolateTo(toMat : Matrix3D, percent : number) : void
		{
			/**/ toMat = strict(toMat, Matrix3D); percent = (+(percent));
			for (var i = 0; i < 16; ++i) {
				
				this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
				
			}
		}
		
		/**
		 * Inverts the current matrix. 
		 * @return 
		 * 
		 */		
		public invert() : boolean
		{
			var d = this.determinant;
			var invertable = Math.abs (d) > 0.00000000001;
			
			if (invertable) {
				
				d = 1 / d;
				
				var m11:number =  (+(this.rawData[0])); var m21:number =  (+(this.rawData[4])); var m31:number =  (+(this.rawData[8])); var m41:number =  (+(this.rawData[12]));
				var m12:number =  (+(this.rawData[1])); var m22:number =  (+(this.rawData[5])); var m32:number =  (+(this.rawData[9])); var m42:number =  (+(this.rawData[13]));
				var m13:number =  (+(this.rawData[2])); var m23:number =  (+(this.rawData[6])); var m33:number =  (+(this.rawData[10])); var m43:number =  (+(this.rawData[14]));
				var m14:number =  (+(this.rawData[3])); var m24:number =  (+(this.rawData[7])); var m34:number =  (+(this.rawData[11])); var m44:number =  (+(this.rawData[15]));
				
				this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
				this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
				this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
				this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
				this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
				this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
				this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
				this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
				this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
				this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
				this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
				this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
				this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
				this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
				this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
				this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
				
			}
			
			return invertable;
		}
		
		/**
		 * Rotates the display object so that it faces a specified position. 
		 * @param pos
		 * @param at
		 * @param up
		 * 
		 */		
		public pointAt(pos : Vector3D, at : Vector3D = null, up : Vector3D = null) : void
		{
			/**/ pos = strict(pos, Vector3D); at = strict(at, Vector3D); up = strict(up, Vector3D);
			if (at == null) {
				
				at = new Vector3D (0, 0, -1);
				
			}
			
			if (up == null) {
				
				up = new Vector3D (0, -1, 0);
				
			}
			
			var dir = at.subtract (pos);
			var vup = up.clone ();
			var right:Vector3D;
			
			dir.normalize ();
			vup.normalize ();
			
			var dir2 = dir.clone ();
			dir2.scaleBy (vup.dotProduct (dir));
			
			vup = vup.subtract (dir2);
			
			if (vup.length > 0) {
				
				vup.normalize ();
				
			} else {
				
				if (dir.x != 0) {
					
					vup = new Vector3D (-dir.y, dir.x, 0);
					
				} else {
					
					vup = new Vector3D (1, 0, 0);
					
				}
				
			}
			
			right =strict( vup.crossProduct (dir), Vector3D);
			right.normalize ();
			
			this.rawData[0] = right.x;
			this.rawData[4] = right.y;
			this.rawData[8] = right.z;
			this.rawData[12] = 0.0;
			this.rawData[1] = vup.x;
			this.rawData[5] = vup.y;
			this.rawData[9] = vup.z;
			this.rawData[13] = 0.0;
			this.rawData[2] = dir.x;
			this.rawData[6] = dir.y;
			this.rawData[10] = dir.z;
			this.rawData[14] = 0.0;
			this.rawData[3] = pos.x;
			this.rawData[7] = pos.y;
			this.rawData[11] = pos.z;
			this.rawData[15] = 1.0;
		}
		
		/**
		 * Prepends a matrix by multiplying the current Matrix3D object by another Matrix3D object. 
		 * @param rhs
		 * 
		 */		
		public prepend(rhs : Matrix3D) : void
		{
			/**/ rhs = strict(rhs, Matrix3D);
			var m111:number =  (+(rhs.rawData[0])), m121:number =  (+(rhs.rawData[4])), m131:number =  (+(rhs.rawData[8])), m141:number =  (+(rhs.rawData[12])),
				m112:number =  (+(rhs.rawData[1])), m122:number =  (+(rhs.rawData[5])), m132:number =  (+(rhs.rawData[9])), m142:number =  (+(rhs.rawData[13])),
				m113:number =  (+(rhs.rawData[2])), m123:number =  (+(rhs.rawData[6])), m133:number =  (+(rhs.rawData[10])), m143:number =  (+(rhs.rawData[14])),
				m114:number =  (+(rhs.rawData[3])), m124:number =  (+(rhs.rawData[7])), m134:number =  (+(rhs.rawData[11])), m144:number =  (+(rhs.rawData[15])),
				m211:number =  (+(this.rawData[0])), m221:number =  (+(this.rawData[4])), m231:number =  (+(this.rawData[8])), m241:number =  (+(this.rawData[12])),
				m212:number =  (+(this.rawData[1])), m222:number =  (+(this.rawData[5])), m232:number =  (+(this.rawData[9])), m242:number =  (+(this.rawData[13])),
				m213:number =  (+(this.rawData[2])), m223:number =  (+(this.rawData[6])), m233:number =  (+(this.rawData[10])), m243:number =  (+(this.rawData[14])),
				m214:number =  (+(this.rawData[3])), m224:number =  (+(this.rawData[7])), m234:number =  (+(this.rawData[11])), m244:number =  (+(this.rawData[15]));
			
			this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
			this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
			this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
			this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
			
			this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
			this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
			this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
			this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
			
			this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
			this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
			this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
			this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
			
			this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
			this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
			this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
			this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
		}
		
		/**
		 * Prepends an incremental rotation to a Matrix3D object. 
		 * @param degrees
		 * @param axis
		 * @param pivotPoint
		 * 
		 */		
		public prependRotation(degrees : number, axis : Vector3D, pivotPoint : Vector3D = null) : void
		{
			/**/ degrees = (+(degrees)); axis = strict(axis, Vector3D); pivotPoint = strict(pivotPoint, Vector3D);
			var tx:number = NaN, ty:number = NaN, tz:number = NaN;
			tx = ty = tz = 0;
			if ( pivotPoint != null ) {
				tx = pivotPoint.x;
				ty = pivotPoint.y;
				tz = pivotPoint.z;
			}
			var radian = degrees *  Math.PI/180;
			var cos = Math.cos(radian);
			var sin = Math.sin(radian);
			var x = axis.x;
			var y = axis.y;
			var z = axis.z;
			var x2 = x * x;
			var y2 = y * y;
			var z2 = z * z;
			var ls = x2 + y2 + z2;
			if (ls != 0) {
				var l = Math.sqrt(ls);
				x /= l;
				y /= l;
				z /= l;
				x2 /= ls;
				y2 /= ls;
				z2 /= ls;
			}
			var ccos = 1 - cos;
			var m = new Matrix3D();
			var d = m.rawData;
			d[0]  = x2 + (y2 + z2) * cos;
			d[1]  = x * y * ccos + z * sin;
			d[2]  = x * z * ccos - y * sin;
			d[4]  = x * y * ccos - z * sin;
			d[5]  = y2 + (x2 + z2) * cos;
			d[6]  = y * z * ccos + x * sin;
			d[8]  = x * z * ccos + y * sin;
			d[9]  = y * z * ccos - x * sin;
			d[10] = z2 + (x2 + y2) * cos;
			d[12] = (tx * (y2 + z2) - x * (ty * y + tz * z)) * ccos + (ty * z - tz * y) * sin;
			d[13] = (ty * (x2 + z2) - y * (tx * x + tz * z)) * ccos + (tz * x - tx * z) * sin;
			d[14] = (tz * (x2 + y2) - z * (tx * x + ty * y)) * ccos + (tx * y - ty * x) * sin;
			
			this.prepend (m);
		}
		
		/**
		 * Prepends an incremental scale change along the x, y, and z axes to a Matrix3D object. 
		 * @param xScale
		 * @param yScale
		 * @param zScale
		 * 
		 */		
		public prependScale(xScale : number, yScale : number, zScale : number) : void
		{
			/**/ xScale = (+(xScale)); yScale = (+(yScale)); zScale = (+(zScale));
			this.prepend (new Matrix3D ((<number[]>[xScale, 0.0, 0.0, 0.0, 0.0, yScale, 0.0, 0.0, 0.0, 0.0, zScale, 0.0, 0.0, 0.0, 0.0, 1.0])));
		}
		
		/**
		 * Prepends an incremental translation, a repositioning along the x, y, and z axes, to a Matrix3D object. 
		 * @param x
		 * @param y
		 * @param z
		 * 
		 */		
		public prependTranslation(x : number, y : number, z : number) : void
		{
			/**/ x = (+(x)); y = (+(y)); z = (+(z));
			var m = new Matrix3D ();
			m.position = new Vector3D (x, y, z);
			this.prepend (m);
		}
		
		/**
		 * Sets the transformation matrix's translation, rotation, and scale settings. 
		 * @param components
		 * @param orientationStyle
		 * @return 
		 * 
		 */		
		public recompose(components : Vector3D[], orientationStyle : string = null) : boolean
		{
			/**/ orientationStyle = as(orientationStyle, 'String');
			if (components.length < 3 || components[2].x == 0 || components[2].y == 0 || components[2].z == 0) {
				
				return false;
				
			}
			
			if (orientationStyle == null) {
				
				orientationStyle = Orientation3D.EULER_ANGLES;
				
			}
			
			this.identity ();
			
			var scale = [];
			scale[0] = scale[1] = scale[2] = components[2].x;
			scale[4] = scale[5] = scale[6] = components[2].y;
			scale[8] = scale[9] = scale[10] = components[2].z;
			
			switch (orientationStyle) {
				
				case Orientation3D.EULER_ANGLES:
					
					var cx = Math.cos (components[1].x);
					var cy = Math.cos (components[1].y);
					var cz = Math.cos (components[1].z);
					var sx = Math.sin (components[1].x);
					var sy = Math.sin (components[1].y);
					var sz = Math.sin (components[1].z);
					
					this.rawData[0] = cy * cz * scale[0];
					this.rawData[1] = cy * sz * scale[1];
					this.rawData[2] = - sy * scale[2];
					this.rawData[3] = 0;
					this.rawData[4] = (sx * sy * cz - cx * sz) * scale[4];
					this.rawData[5] = (sx * sy * sz + cx * cz) * scale[5];
					this.rawData[6] = sx * cy * scale[6];
					this.rawData[7] = 0;
					this.rawData[8] = (cx * sy * cz + sx * sz) * scale[8];
					this.rawData[9] = (cx * sy * sz - sx * cz) * scale[9];
					this.rawData[10] = cx * cy * scale[10];
					this.rawData[11] = 0;
					this.rawData[12] = components[0].x;
					this.rawData[13] = components[0].y;
					this.rawData[14] = components[0].z;
					this.rawData[15] = 1;
					break;
				
				default:
					
					var x = components[1].x;
					var y = components[1].y;
					var z = components[1].z;
					var w = components[1].w;
					
					if (orientationStyle == Orientation3D.AXIS_ANGLE) {
						
						x *= Math.sin (w / 2);
						y *= Math.sin (w / 2);
						z *= Math.sin (w / 2);
						w = Math.cos (w / 2);
						
					}
					
					this.rawData[0] = (1 - 2 * y * y - 2 * z * z) * scale[0];
					this.rawData[1] = (2 * x * y + 2 * w * z) * scale[1];
					this.rawData[2] = (2 * x * z - 2 * w * y) * scale[2];
					this.rawData[3] = 0;
					this.rawData[4] = (2 * x * y - 2 * w * z) * scale[4];
					this.rawData[5] = (1 - 2 * x * x - 2 * z * z) * scale[5];
					this.rawData[6] = (2 * y * z + 2 * w * x) * scale[6];
					this.rawData[7] = 0;
					this.rawData[8] = (2 * x * z + 2 * w * y) * scale[8];
					this.rawData[9] = (2 * y * z - 2 * w * x) * scale[9];
					this.rawData[10] = (1 - 2 * x * x - 2 * y * y) * scale[10];
					this.rawData[11] = 0;
					this.rawData[12] = components[0].x;
					this.rawData[13] = components[0].y;
					this.rawData[14] = components[0].z;
					this.rawData[15] = 1;
					
			}
			
			if (components[2].x == 0) {
				
				this.rawData[0] = 1e-15;
				
			}
			
			if (components[2].y == 0) {
				
				this.rawData[5] = 1e-15;
				
			}
			
			if (components[2].z == 0) {
				
				this.rawData[10] = 1e-15;
				
			}
			
			return !(components[2].x == 0 || components[2].y == 0 || components[2].y == 0);
		}
		
		/**
		 * Uses the transformation matrix to transform a Vector3D object from one space coordinate to another. 
		 * @param v
		 * @return 
		 * 
		 */		
		public transformVector(v : Vector3D) : Vector3D
		{
			/**/ v = strict(v, Vector3D);
			var x = v.x;
			var y = v.y;
			var z = v.z;
			
			return new Vector3D ((x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12]), (x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13]), (x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14]), (x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15]));
		}
		
		/**
		 * Uses the transformation matrix to transform a Vector of Numbers from one coordinate space to another. 
		 * @param vin
		 * @param vout
		 * 
		 */		
		public transformVectors(vin : number[], vout : number[]) : void
		{
			var i = 0;
			var x, y, z;
			var length = vin.length;
			
			while (i + 3 <= length) {
				
				x = vin[i];
				y = vin[i + 1];
				z = vin[i + 2];
				
				vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
				vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
				vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
				
				i += 3;
				
			}
		}
		
		/**
		 * Converts the current Matrix3D object to a matrix where the rows and columns are swapped. 
		 * 
		 */		
		public transpose() : void
		{
			var oRawData = this.rawData.concat ();
			this.rawData[1] = oRawData[4];
			this.rawData[2] = oRawData[8];
			this.rawData[3] = oRawData[12];
			this.rawData[4] = oRawData[1];
			this.rawData[6] = oRawData[9];
			this.rawData[7] = oRawData[13];
			this.rawData[8] = oRawData[2];
			this.rawData[9] = oRawData[6];
			this.rawData[11] = oRawData[14];
			this.rawData[12] = oRawData[3];
			this.rawData[13] = oRawData[7];
			this.rawData[14] = oRawData[11];
		}
		
		/**
		 * Interpolates the translation, rotation, and scale transformation of one matrix toward those of the target matrix. 
		 * @param thisMat
		 * @param toMat
		 * @param percent
		 * @return 
		 * 
		 */		
		public static interpolate(thisMat : Matrix3D, toMat : Matrix3D, percent : number) : Matrix3D
		{
			/**/ thisMat = strict(thisMat, Matrix3D); toMat = strict(toMat, Matrix3D); percent = (+(percent));
			var m = new Matrix3D ();
			
			for (var i = 0; i < 16; ++i) {
				
				m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;
				
			}
			
			return m;
		}
		
		protected static getAxisRotation(x : number, y : number, z : number, degrees : number, target:Matrix3D = null) : Matrix3D
		{
			/**/ x = (+(x)); y = (+(y)); z = (+(z)); degrees = (+(degrees)); target = strict(target, Matrix3D);
			var m = new Matrix3D ();
			
			var a1 = new Vector3D (x, y, z);
			var rad = -degrees * (Math.PI / 180);
			var c = Math.cos (rad);
			var s = Math.sin (rad);
			var t = 1.0 - c;
			
			m.rawData[0] = c + a1.x * a1.x * t;
			m.rawData[5] = c + a1.y * a1.y * t;
			m.rawData[10] = c + a1.z * a1.z * t;
			
			var tmp1 = a1.x * a1.y * t;
			var tmp2 = a1.z * s;
			m.rawData[4] = tmp1 + tmp2;
			m.rawData[1] = tmp1 - tmp2;
			tmp1 = a1.x * a1.z * t;
			tmp2 = a1.y * s;
			m.rawData[8] = tmp1 - tmp2;
			m.rawData[2] = tmp1 + tmp2;
			tmp1 = a1.y * a1.z * t;
			tmp2 = a1.x*s;
			m.rawData[9] = tmp1 + tmp2;
			m.rawData[6] = tmp1 - tmp2;
			
			return m;
		}
	}
}