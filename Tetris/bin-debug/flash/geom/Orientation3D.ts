/// <reference path="../../base.d.ts" />

namespace flash.geom
{
	
	/**
	 * The Orientation3D class is an enumeration of constant values for representing the orientation style of a Matrix3D object. 
	 * The three types of orientation are Euler angles, axis angle, and quaternion. 
	 * The decompose and recompose methods of the Matrix3D object take one of these enumerated types to identify 
	 * the rotational components of the Matrix. 
	 * @author pkulikov
	 * 
	 */	
	/*[Version("10")]*/
	export  class Orientation3D
	{
		/**
		 * Euler angles, the default orientation for decompose() and recompose() methods, 
		 * defines the orientation with three separate angles of rotation for each axis. 
		 */		
		public static EULER_ANGLES:string = "eulerAngles";
		
		/**
		 * The axis angle orientation uses a combination of an axis and an angle to determine the orientation. 
		 */		
		public static AXIS_ANGLE:string = "axisAngle";
		
		/**
		 * The quaternion orientation uses complex numbers. 
		 */		
		public static QUATERNION:string = "quaternion";
	}
}