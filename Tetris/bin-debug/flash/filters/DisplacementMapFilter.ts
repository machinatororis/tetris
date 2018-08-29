/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../display/BitmapData.ts" />
﻿
namespace flash.filters
{
	export import BitmapData = flash.display.BitmapData;
	export import Point = flash.geom.Point;
	

	/**
	 * The DisplacementMapFilter class uses the pixel values from the specified BitmapData object (called the displacement map image) to perform a displacement of an object. You can use this filter to apply a warped or mottled effect to any object that inherits from the DisplayObject class, such as MovieClip, SimpleButton, TextField, and Video objects, as well as to BitmapData objects.
	 * 
	 * The use of filters depends on the object to which you apply the filter:

	 *     To apply filters to a display object, use the filters property of the display object. Setting the filters property of an object does not modify the object, and you can remove the filter by clearing the filters property.
	 *     To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a BitmapData object takes the source BitmapData object and the filter object and generates a filtered image.
	 * 
	 * If you apply a filter to a display object, the value of the cacheAsBitmap property of the display object is set to true. If you clear all filters, the original value of cacheAsBitmap is restored.
	 * 
	 * The filter uses the following formula:
	 * 
	 * dstPixel[x, y] = srcPixel[x + ((componentX(x, y) - 128) * scaleX) / 256, y + ((componentY(x, y) - 128) *scaleY) / 256)
	 * 
	 * where componentX(x, y) gets the componentX property color value from the mapBitmap property at (x - mapPoint.x ,y - mapPoint.y).
	 * 
	 * The map image used by the filter is scaled to match the Stage scaling. It is not scaled when the object itself is scaled.
	 * 
	 * This filter supports Stage scaling. However, general scaling, rotation, and skewing are not supported. If the object itself is scaled (if the scaleX and scaleY properties are set to a value other than 1.0), the filter effect is not scaled. It is scaled only when the user zooms in on the Stage.
	 * @author pkulikov
	 */
	export  class DisplacementMapFilter extends BitmapFilter
	{
		/**
		 * Specifies the alpha transparency value to use for out-of-bounds displacements. 
		 */		
		public alpha : number;

		/**
		 * Specifies what color to use for out-of-bounds displacements. 
		 */		
		public color : number;

		/**
		 * Describes which color channel to use in the map image to displace the x result. 
		 */		
		public componentX : number;

		/**
		 * Describes which color channel to use in the map image to displace the y result. 
		 */		
		public componentY : number;

		/**
		 * A BitmapData object containing the displacement map data. 
		 */		
		public mapBitmap : BitmapData;

		/**
		 * A value that contains the offset of the upper-left corner of the target display object from the upper-left corner of the map image. 
		 */		
		public mapPoint : Point;

		/**
		 * The mode for the filter. 
		 */		
		public mode : string;

		/**
		 * The multiplier to use to scale the x displacement result from the map calculation. 
		 */		
		public scaleX : number;

		/**
		 * The multiplier to use to scale the y displacement result from the map calculation. 
		 */		
		public scaleY : number;
		
		/**
		 * Initializes a DisplacementMapFilter instance with the specified parameters.
		 * @param mapBitmap
		 * @param mapPoint
		 * @param componentX
		 * @param componentY
		 * @param scaleX
		 * @param scaleY
		 * @param mode
		 * @param color
		 * @param alpha
		 * 
		 */		
		constructor(mapBitmap:BitmapData = null, mapPoint:Point = null, componentX:number = 0, componentY:number = 0, scaleX:number = 0.0, scaleY:number = 0.0, mode:string = "wrap", color:number = 0, alpha:number = 0.0)
		{
			/**/ mapBitmap = strict(mapBitmap, BitmapData); mapPoint = strict(mapPoint, Point); componentX = ((componentX) >>> 0); componentY = ((componentY) >>> 0); scaleX = (+(scaleX)); scaleY = (+(scaleY)); mode = as(mode, 'String'); color = ((color) >>> 0); alpha = (+(alpha));
			/**/ this.alpha === void 0 && (this.alpha = NaN);
			/**/ this.color === void 0 && (this.color = 0);
			/**/ this.componentX === void 0 && (this.componentX = 0);
			/**/ this.componentY === void 0 && (this.componentY = 0);
			/**/ this.mapBitmap === void 0 && (this.mapBitmap = null);
			/**/ this.mapPoint === void 0 && (this.mapPoint = null);
			/**/ this.mode === void 0 && (this.mode = null);
			/**/ this.scaleX === void 0 && (this.scaleX = NaN);
			/**/ this.scaleY === void 0 && (this.scaleY = NaN);
			super(); 
			this.alpha = alpha;
			this.color = color;
			this.componentX = componentX;
			this.componentY = componentY;
			this.mapBitmap = mapBitmap;
			this.mapPoint = mapPoint;
			this.mode = mode;
			this.scaleX = scaleX;
			this.scaleY = scaleY;
			
			// Not implemented
			this.__notImplemented = true;
		}
		
		/*override*/ public clone():BitmapFilter
		{
			return new DisplacementMapFilter(this.mapBitmap, this.mapPoint, this.componentX, this.componentY, this.scaleX, this.scaleY, this.mode, this.color, this.alpha);
		}
	}	
}