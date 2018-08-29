/// <reference path="../../base.d.ts" />
﻿
namespace flash.filters
{
	
	/**
	 * The ConvolutionFilter class applies a matrix convolution filter effect. A convolution combines pixels in the input 
	 * image with neighboring pixels to produce an image. A wide variety of image effects can be achieved through convolutions, 
	 * including blurring, edge detection, sharpening, embossing, and beveling. You can apply the filter to any display object 
	 * (that is, objects that inherit from the DisplayObject class), such as MovieClip, SimpleButton, TextField, and Video objects, 
	 * as well as to BitmapData objects.
	 * 
	 * To create a convolution filter, use the syntax new ConvolutionFilter(). The use of filters depends on the object to which you 
	 * apply the filter:
	 * 
	 *     To apply filters to movie clips, text fields, buttons, and video, use the filters property (inherited from DisplayObject). 
	 * Setting the filters property of an object does not modify the object, and you can remove the filter by clearing the filters property.
	 *     To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a BitmapData object
	 *  takes the source BitmapData object and the filter object and generates a filtered image as a result.
	 * 
	 * If you apply a filter to a display object, the value of the cacheAsBitmap property of the object is set to true. 
	 * If you clear all filters, the original value of cacheAsBitmap is restored.
	 * 
	 * A filter is not applied if the resulting image exceeds the maximum dimensions. In AIR 1.5 and Flash Player 10, 
	 * the maximum is 8,191 pixels in width or height, and the total number of pixels cannot exceed 16,777,215 pixels. 
	 * (So, if an image is 8,191 pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and earlier and AIR 1.1 and earlier, 
	 * the limitation is 2,880 pixels in height and 2,880 pixels in width. For example, if you zoom in on a large movie clip with a 
	 * filter applied, the filter is turned off if the resulting image exceeds maximum dimensions.
	 * @author pkulikov
	 */
	export  class ConvolutionFilter extends BitmapFilter
	{
		/**
		 * The alpha transparency value of the substitute color. 
		 */		
		public alpha : number;

		/**
		 * The amount of bias to add to the result of the matrix transformation. 
		 */		
		public bias : number;

		/**
		 * Indicates whether the image should be clamped. 
		 */		
		public clamp : boolean;

		/**
		 * The hexadecimal color to substitute for pixels that are off the source image. 
		 */		
		public color : number;

		/**
		 * The divisor used during matrix transformation. 
		 */		
		public divisor : number;

		/**
		 * An array of values used for matrix transformation. 
		 */		
		public matrix : any[];

		/**
		 * The x dimension of the matrix (the number of columns in the matrix). 
		 */		
		public matrixX : number;

		/**
		 * The y dimension of the matrix (the number of rows in the matrix). 
		 */		
		public matrixY : number;

		/**
		 * Indicates if the alpha channel is preserved without the filter effect or if the convolution filter is applied to the 
		 * alpha channel as well as the color channels. 
		 */		
		public preserveAlpha : boolean;
		
		/**
		 * Initializes a ConvolutionFilter instance with the specified parameters. 
		 * @param matrixX
		 * @param matrixY
		 * @param matrix
		 * @param divisor
		 * @param bias
		 * @param preserveAlpha
		 * @param clamp
		 * @param color
		 * @param alpha
		 * 
		 */			
		constructor(matrixX:number = 0, matrixY:number = 0, matrix:any[] = null, divisor:number = 1.0, bias:number = 0.0, preserveAlpha:boolean = true, clamp:boolean = true, color:number = 0, alpha:number = 0.0)
		{
			/**/ matrixX = (+(matrixX)); matrixY = (+(matrixY)); matrix = strict(matrix, Array); divisor = (+(divisor)); bias = (+(bias)); preserveAlpha = Boolean(preserveAlpha); clamp = Boolean(clamp); color = ((color) >>> 0); alpha = (+(alpha));
			/**/ this.alpha === void 0 && (this.alpha = NaN);
			/**/ this.bias === void 0 && (this.bias = NaN);
			/**/ this.clamp === void 0 && (this.clamp = false);
			/**/ this.color === void 0 && (this.color = 0);
			/**/ this.divisor === void 0 && (this.divisor = NaN);
			/**/ this.matrix === void 0 && (this.matrix = null);
			/**/ this.matrixX === void 0 && (this.matrixX = NaN);
			/**/ this.matrixY === void 0 && (this.matrixY = NaN);
			/**/ this.preserveAlpha === void 0 && (this.preserveAlpha = false);
			super(); 
			this.alpha = alpha;
			this.bias = bias;
			this.clamp = clamp;
			this.color = color;
			this.divisor = divisor;
			this.matrix = matrix;
			this.matrixX = matrixX;
			this.matrixY = matrixY;
			this.preserveAlpha = preserveAlpha;
			
			// Not implemented
			this.__notImplemented = true;
		}
		
		/*override*/ public clone():BitmapFilter
		{
			return new ConvolutionFilter(this.matrixX, this.matrixY, this.matrix, this.divisor, this.bias, this.preserveAlpha, this.clamp, this.color, this.alpha);
		}
	}
}