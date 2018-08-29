/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * Defines an ordered set of triangles that can be rendered using either (u,v) fill coordinates or a normal fill. 
	 * Each triangle in the path is represented by three sets of (x, y) coordinates, each of which is one point of the triangle.
	 * The triangle vertices do not contain z coordinates and do not necessarily represent 3D faces. 
	 * However a triangle path can be used to support the rendering of 3D geometry in a 2D space. 
	 * @author pkulikov
	 * 
	 */	
	export  class GraphicsTrianglePath implements IGraphicsPath, IGraphicsData
	{
		implements_flash_display_IGraphicsData = null;
		implements_flash_display_IGraphicsPath = null;
		/**
		 * A Vector of integers or indexes, where every three indexes define a triangle. 
		 */		
		public indices:number[] = undefined;
		
		/**
		 * A Vector of Numbers where each pair of numbers is treated as a point (an x, y pair). 
		 */		
		public vertices:number[] = undefined;
		
		/**
		 * A Vector of normalized coordinates used to apply texture mapping. 
		 */		
		public uvtData:number[] = undefined;
		
		/**
		 * Specifies whether to render triangles that face in a given direction. 
		 */		
		public culling:string = null;
		
		/**
		 * Creates a new GraphicsTrianglePath object.
		 * @param vertices
		 * @param indices
		 * @param uvtData
		 * @param culling
		 * 
		 */		
		constructor(vertices:number[] = null, indices:number[] = null, uvtData:number[] = null, culling:string = "none")
		{
			/**/ culling = as(culling, 'String');
			this.vertices = this.vertices;
			this.indices = this.indices;
			this.uvtData = this.uvtData;
			this.culling = culling;
		}
	}

}