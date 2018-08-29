/// <reference path="../../base.d.ts" />

namespace flash.geom
{
	
	/**
	 * The Utils3D class contains static methods that simplify the implementation of certain three-dimensional matrix operations. 
	 * @author pkulikov
	 * 
	 */	
	export  class Utils3D
	{
		/**
		 * Using a projection Matrix3D object, projects a Vector3D object from one space coordinate to another. 
		 * @param m
		 * @param v
		 * @return 
		 * 
		 */		
		public static projectVector(m:Matrix3D, v:Vector3D) : Vector3D
		{
			/**/ m = strict(m, Matrix3D); v = strict(v, Vector3D);
			var n = m.rawData;
			var l_oProj = new Vector3D ();
			
			l_oProj.x = v.x * n[0] + v.y * n[4] + v.z * n[8] + n[12];
			l_oProj.y = v.x * n[1] + v.y * n[5] + v.z * n[9] + n[13];
			l_oProj.z = v.x * n[2] + v.y * n[6] + v.z * n[10] + n[14];
			var w:number =  (+(v.x * n[3] + v.y * n[7] + v.z * n[11] + n[15]));
			
			l_oProj.z /= w;
			l_oProj.x /= w;
			l_oProj.y /= w;
			
			return l_oProj;
		}
		
		/**
		 * Using a projection Matrix3D object, projects a Vector of three-dimensional space coordinates (verts) to 
		 * a Vector of two-dimensional space coordinates (projectedVerts). 
		 * @param m
		 * @param verts
		 * @param projectedVerts
		 * @param uvts
		 * 
		 */		
		public static projectVectors(m:Matrix3D, verts:number[], projectedVerts:number[], uvts:number[]) : void
		{
			/**/ m = strict(m, Matrix3D);
			if ( verts.length % 3 != 0 ) return;
			
			var n = m.rawData,
				x:number = NaN, y:number = NaN, z:number = NaN, w:number = NaN,
				x1:number = NaN, y1:number = NaN, z1:number = NaN, w1:number = NaN,
				i:number = 0, length = verts.length;
			
			while ( i < length ) {
				x =(+( verts[i]));
				y =(+( verts[i + 1]));
				z =(+( verts[i + 2]));
				w = 1;
				
				x1 = x * n[0] + y * n[4] + z * n[8] + w * n[12];
				y1 = x * n[1] + y * n[5] + z * n[9] + w * n[13];
				z1 = x * n[2] + y * n[6] + z * n[10] + w * n[14];
				w1 = x * n[3] + y * n[7] + z * n[11] + w * n[15];
				
				projectedVerts.push( x1 / w1 );
				projectedVerts.push( y1 / w1 );
				
				uvts[i + 2] = 1 / w1;
				
				i += 3;
			}
		}
		
		/**
		 * Interpolates the orientation of an object toward a position. 
		 * @param percent
		 * @param mat
		 * @param pos
		 * @param at
		 * @param up
		 * @return 
		 * 
		 */		
		public static pointTowards(percent : number, mat : Matrix3D, pos : Vector3D, at : Vector3D = null, up : Vector3D = null) : Matrix3D
		{
			/**/ percent = (+(percent)); mat = strict(mat, Matrix3D); pos = strict(pos, Vector3D); at = strict(at, Vector3D); up = strict(up, Vector3D);
			return null;
		}
	}

}