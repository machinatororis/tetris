/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Matrix.ts" />

namespace flash.display
{
	export import Matrix = flash.geom.Matrix;
	
	
	/**
	 * Defines a bitmap fill. The bitmap can be smoothed, repeated or tiled to fill the area; or manipulated using a transformation matrix.
	 * Use a GraphicsBitmapFill object with the Graphics.drawGraphicsData() method. 
	 * Drawing a GraphicsBitmapFill object is the equivalent of calling the Graphics.beginBitmapFill() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class GraphicsBitmapFill implements IGraphicsFill, IGraphicsData
	{
		implements_flash_display_IGraphicsData = null;
		implements_flash_display_IGraphicsFill = null;
		/**
		 * A transparent or opaque bitmap image. 
		 */		
		public bitmapData:BitmapData = null;
		
		/**
		 * A matrix object (of the flash.geom.Matrix class) that defines transformations on the bitmap. 
		 */		
		public matrix:Matrix = null;
		
		/**
		 * Specifies whether to repeat the bitmap image in a tiled pattern. 
		 */		
		public repeat:boolean = false;
		
		/**
		 * Specifies whether to apply a smoothing algorithm to the bitmap image. 
		 */		
		public smooth:boolean = false;
		
		/**
		 * Creates a new GraphicsBitmapFill object.
		 * @param bitmapData
		 * @param matrix
		 * @param repeat
		 * @param smooth
		 * 
		 */		
		constructor(bitmapData:BitmapData = null, matrix:Matrix = null, repeat:boolean = true, smooth:boolean = false)
		{
			/**/ bitmapData = strict(bitmapData, BitmapData); matrix = strict(matrix, Matrix); repeat = Boolean(repeat); smooth = Boolean(smooth);
			this.bitmapData = bitmapData;
			this.matrix = matrix || new Matrix;
			this.repeat = repeat;
			this.smooth = smooth;
		}
	}

}