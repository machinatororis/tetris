/// <reference path="../../base.d.ts" />
﻿
namespace flash.filters
{
	
	/**
	 * The ShaderFilter class applies a filter by executing a shader on the object being filtered. The filtered object is used as an 
	 * input to the shader, and the shader output becomes the filter result.
	 * 
	 * To create a new filter, use the constructor new ShaderFilter(). The use of filters depends on the object to which you apply the filter:
	 * 
	 *     To apply filters to movie clips, text fields, buttons, and video, use the filters property (inherited from DisplayObject). 
	 * Setting the filters property of an object does not modify the object, and you can remove the filter by clearing the filters property.
	 *     To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a 
	 * BitmapData object takes the source BitmapData object and the filter object and generates a filtered image as a result.
	 * 
	 * If you apply a filter to a display object, the value of the cacheAsBitmap property of the object is set to true. 
	 * If you remove all filters, the original value of cacheAsBitmap is restored.
	 * 
	 * This filter supports stage scaling. However, it does not support general scaling, rotation, and skewing. 
	 * If the object itself is scaled (if the scaleX and scaleY properties are not set to 100%), the filter is not scaled. 
	 * It is scaled only when the user zooms in on the stage.
	 * 
	 * A filter is not applied if the resulting image exceeds the maximum dimensions. In AIR 1.5 and Flash Player 10, 
	 * the maximum is 8,191 pixels in width or height, and the total number of pixels cannot exceed 16,777,215 pixels. 
	 * (So, if an image is 8,191 pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and earlier and AIR 1.1 and earlier, 
	 * the limitation is 2,880 pixels in height and 2,880 pixels in width. If, for example, you zoom in on a large movie clip with a 
	 * filter applied, the filter is turned off if the resulting image exceeds the maximum dimensions.
	 * 
	 * To specify the Shader instance to use with the filter, pass the Shader instance as an argument to the ShaderFilter() constructor, 
	 * or set it as the value of the shader property.
	 * 
	 * To allow the shader output to extend beyond the bounds of the filtered object, use the leftExtension, rightExtension, 
	 * topExtension, and bottomExtension properties.
	 * @author pkulikov
	 */
	export  class ShaderFilter extends BitmapFilter
	{
		/**
		 * The growth in pixels on the bottom side of the target object. 
		 */		
		public bottomExtension : number;

		/**
		 * The growth in pixels on the left side of the target object. 
		 */		
		public leftExtension : number;

		/**
		 * The growth in pixels on the right side of the target object. 
		 */		
		public rightExtension : number;

		/**
		 * The shader to use for this filter. 
		 */		
		public shader/* : Shader*/;

		/**
		 * The growth in pixels on the top side of the target object. 
		 */		
		public topExtension : number;
		
		/**
		 *  Creates a new shader filter.
		 * @param shader
		 * 
		 */		
		constructor(shader/*:Shader*/ = null)
		{
			/**/ this.bottomExtension === void 0 && (this.bottomExtension = 0);
			/**/ this.leftExtension === void 0 && (this.leftExtension = 0);
			/**/ this.rightExtension === void 0 && (this.rightExtension = 0);
			/**/ this.shader === void 0 && (this.shader = undefined);
			/**/ this.topExtension === void 0 && (this.topExtension = 0);
			super(); 
			this.shader = this.shader;
			
			// Not implemented
			this.__notImplemented = true;
		}
		
		/*override*/ public clone():BitmapFilter
		{
			return new ShaderFilter(this.shader);
		}
	}	
}