/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * Defines codes for culling algorithms that determine which triangles not to render when drawing triangle paths.
	 * The terms POSITIVE and NEGATIVE refer to the sign of a triangle's normal along the z-axis. 
	 * The normal is a 3D vector that is perpendicular to the surface of the triangle.
	 * 
	 * A triangle whose vertices 0, 1, and 2 are arranged in a clockwise order has a positive normal value. 
	 * That is, its normal points in a positive z-axis direction, away from the current view point. 
	 * When the TriangleCulling.POSITIVE algorithm is used, triangles with positive normals are not rendered. 
	 * Another term for this is backface culling.
	 * 
	 * A triangle whose vertices are arranged in a counter-clockwise order has a negative normal value. 
	 * That is, its normal points in a negative z-axis direction, toward the current view point. 
	 * When the TriangleCulling.NEGATIVE algorithm is used, triangles with negative normals will not be rendered. 
	 * @author pkulikov
	 * 
	 */	
	export  class TriangleCulling
	{
		/**
		 * Specifies no culling. 
		 */		
		public static NONE:string = "none";
		
		/**
		 * Specifies culling of all triangles facing away from the current view point. 
		 */		
		public static POSITIVE:string = "positive";
		
		/**
		 * Specifies culling of all triangles facing toward the current view point. 
		 */		
		public static NEGATIVE:string = "negative";
	}
}