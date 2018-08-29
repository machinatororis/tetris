/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Matrix.ts" />

namespace flash.display
{
	export import Matrix = flash.geom.Matrix;
	
	
	/**
	 * Defines a gradient fill.
	 * Use a GraphicsGradientFill object with the Graphics.drawGraphicsData() method. 
	 * Drawing a GraphicsGradientFill object is the equivalent of calling the Graphics.beginGradientFill() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class GraphicsGradientFill implements IGraphicsFill, IGraphicsData
	{
		implements_flash_display_IGraphicsData = null;
		implements_flash_display_IGraphicsFill = null;
		/**
		 * An array of RGB hexadecimal color values to use in the gradient. 
		 */		
		public colors:any[] = null;
		
		/**
		 * An array of alpha values for the corresponding colors in the colors array. 
		 */		
		public alphas:any[] = null;
		
		/**
		 * An array of color distribution ratios. 
		 */		
		public ratios:any[] = null;
		
		/**
		 * A transformation matrix as defined by the Matrix class. 
		 */		
		public matrix:Matrix = null;
		
		/**
		 * A value from the InterpolationMethod class that specifies which value to use. 
		 */		
		public interpolationMethod:string = null;
		
		/**
		 * A value from the GradientType class that specifies which gradient type to use. 
		 */		
		public type:string = null;
		
		/**
		 * A value from the SpreadMethod class that specifies which spread method to use. 
		 */		
		public spreadMethod:string = null;
		
		/**
		 * A number that controls the location of the focal point of the gradient. 
		 */		
		public focalPointRatio:number = NaN;
		
		/**
		 * Creates a new GraphicsGradientFill object. 
		 * @param type
		 * @param colors
		 * @param alphas
		 * @param ratios
		 * @param matrix
		 * @param spreadMethod
		 * @param interpolationMethod
		 * @param focalPointRatio
		 * 
		 */		
		constructor(type:string = "linear", colors:any[] = null, alphas:any[] = null, ratios:any[] = null, matrix:Matrix = null, spreadMethod:any = "pad", interpolationMethod:string = "rgb", focalPointRatio:number = 0.0)
		{
			/**/ type = as(type, 'String'); colors = strict(colors, Array); alphas = strict(alphas, Array); ratios = strict(ratios, Array); matrix = strict(matrix, Matrix); interpolationMethod = as(interpolationMethod, 'String'); focalPointRatio = (+(focalPointRatio));
			this.type = type;
			this.colors = colors;
			this.alphas = alphas;
			this.ratios = ratios;
			this.matrix = matrix;
			this.spreadMethod =as( this.spreadMethod, 'String');
			this.interpolationMethod = interpolationMethod;
			this.focalPointRatio = focalPointRatio;
		}
	}

}