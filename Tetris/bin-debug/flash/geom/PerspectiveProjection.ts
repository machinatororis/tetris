/// <reference path="../../base.d.ts" />
/// <reference path="../display/Stage.ts" />

namespace flash.geom
{
	export import Stage = flash.display.Stage;
	

	/**
	 * The PerspectiveProjection class provides an easy way to assign or modify the perspective transformations of a display object and 
	 * all of its children. For more complex or custom perspective transformations, use the Matrix3D class. 
	 * While the PerspectiveProjection class provides basic three-dimensional presentation properties, 
	 * the Matrix3D class provides more detailed control over the three-dimensional presentation of display objects.
	 * Projection is a way of representing a three-dimensional object in a two-dimensional space, 
	 * like a cube projected onto a computer screen. Perspective projection uses a viewing frustum (a rectangular pyramid) 
	 * to model and project a three-dimensional world and its objects on the screen. 
	 * The viewing frustum becomes increasingly wider as it moves further from the origin of the viewpoint. 
	 * The origin of the viewpoint could be a camera or the eyes of an observer facing the screen.
	 * The projected perspective produces the illusion of three dimensions with depth and distance, 
	 * where the objects closer to the screen appear larger than the objects farther from the screen. 
	 * @author pkulikov
	 * 
	 */	
	export  class PerspectiveProjection
	{
		/**
		 * Helpers 
		 */		
		public static TO_RADIAN:number = 0.01745329251994329577; // Math.PI / 180
		
		/**
		 * The distance between the eye or the viewpoint's origin (0,0,0) and the display object located in the z axis. 
		 * 
		 */		
		public focalLength : number = NaN;
		
		/**
		 * A two-dimensional point representing the center of the projection, the vanishing point for the display object. 
		 * 
		 */		
		public projectionCenter:Point = null; // FIXME: does this do anything at all?
		
		/**
		 * Helpers 
		 */		
		private mMatrix3D:Matrix3D = null;
		private mFieldOfView:number = NaN;
		
		/**
		 * Creates an instance of a PerspectiveProjection object. 
		 * 
		 */		
		constructor()
		{
			this.fieldOfView = 0;
			this.focalLength = 0;
			
			this.mMatrix3D = new Matrix3D ();
			this.projectionCenter = new Point (Stage.sCurrent.stageWidth / 2, Stage.sCurrent.stageHeight / 2);
		}
		
		/**
		 * Specifies an angle, as a degree between 0 and 180, for the field of view in three dimensions. 
		 * @return 
		 * 
		 */		
		public get fieldOfView() : number
		{
			return this.mFieldOfView;
		}
		
		public set fieldOfView(value:number)
		{
			/**/ value = (+(value));
			var p_nFovY = value * PerspectiveProjection.TO_RADIAN;
			this.mFieldOfView =(+( p_nFovY));
			var cotan = 1 / Math.tan (p_nFovY / 2);
			this.focalLength = Stage.sCurrent.stageWidth * (Stage.sCurrent.stageWidth / Stage.sCurrent.stageHeight) / 2 * cotan;
		}
		
		/**
		 * Returns the underlying Matrix3D object of the display object. 
		 * @return 
		 * 
		 */		
		public toMatrix3D() : Matrix3D
		{
			var _mp = this.mMatrix3D.rawData;
			_mp[0] = this.focalLength;
			_mp[5] = this.focalLength;
			_mp[11] = 1.0;
			_mp[15] = 0;
			
			return this.mMatrix3D;
		}
	}

}