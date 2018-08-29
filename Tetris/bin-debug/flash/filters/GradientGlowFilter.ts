/// <reference path="../../base.d.ts" />
﻿
namespace flash.filters
{
	
	/**
	 * The GradientGlowFilter class lets you apply a gradient glow effect to display objects. A gradient glow is a realistic-looking 
	 * glow with a color gradient that you can control. You can apply a gradient glow around the inner or outer edge of an object 
	 * or on top of an object. You can apply the filter to any display object (objects that inherit from the DisplayObject class), 
	 * such as MovieClip, SimpleButton, TextField, and Video objects, as well as to BitmapData objects.
	 * 
	 * The use of filters depends on the object to which you apply the filter:
	 * 
	 *     To apply filters to display objects, use the filters property. Setting the filters property of an object does not modify 
	 * the object, and you can remove the filter by clearing the filters property.
	 *     To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a BitmapData object 
	 * takes the source BitmapData object and the filter object and generates a filtered image as a result.
	 * 
	 * If you apply a filter to a display object, the cacheAsBitmap property of the display object is set to true. If you clear all filters, 
	 * the original value of cacheAsBitmap is restored.
	 * 
	 * This filter supports Stage scaling. However, it does not support general scaling, rotation, and skewing; if the object itself is 
	 * scaled (if scaleX and scaleY are set to a value other than 1.0), the filter effect is not scaled. It is scaled only when the user 
	 * zooms in on the Stage.
	 * 
	 * A filter is not applied if the resulting image exceeds the maximum dimensions. In AIR 1.5 and Flash Player 10, 
	 * the maximum is 8,191 pixels in width or height, and the total number of pixels cannot exceed 16,777,215 pixels. 
	 * (So, if an image is 8,191 pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and earlier and AIR 1.1 and earlier, 
	 * the limitation is 2,880 pixels in height and 2,880 pixels in width. For example, if you zoom in on a large movie clip with a 
	 * filter applied, the filter is turned off if the resulting image exceeds the maximum dimensions.
	 * @author pkulikov
	 */
	export  class GradientGlowFilter extends BitmapFilter
	{
		/**
		 * An array of alpha transparency values for the corresponding colors in the colors array. 
		 */		
		public alphas : any[];

		/**
		 * The angle, in degrees. 
		 */		
		public angle : number;

		/**
		 * The amount of horizontal blur. 
		 */		
		public blurX : number;

		/**
		 * The amount of vertical blur. 
		 */		
		public blurY : number;

		/**
		 * An array of colors that defines a gradient. 
		 */		
		public colors : any[];

		/**
		 * The offset distance of the glow. 
		 */		
		public distance : number;

		/**
		 * Specifies whether the object has a knockout effect. 
		 */		
		public knockout : boolean;

		/**
		 * The number of times to apply the filter. 
		 */		
		public quality : number;

		/**
		 * An array of color distribution ratios for the corresponding colors in the colors array. 
		 */		
		public ratios : any[];

		/**
		 * The strength of the imprint or spread. 
		 */		
		public strength : number;

		/**
		 * The placement of the filter effect. 
		 */		
		public type : string;


		/**
		 * Initializes the filter with the specified parameters. 
		 * @param distance
		 * @param angle
		 * @param colors
		 * @param alphas
		 * @param ratios
		 * @param blurX
		 * @param blurY
		 * @param strength
		 * @param quality
		 * @param type
		 * @param knockout
		 * 
		 */			
		constructor(distance:number = 4.0, angle:number = 45, colors:any[] = null, alphas:any[] = null, ratios:any[] = null, blurX:number = 4.0, blurY:number = 4.0, strength:number = 1, quality:number = 1, type:string = "inner", knockout:boolean = false)
		{
			/**/ distance = (+(distance)); angle = (+(angle)); colors = strict(colors, Array); alphas = strict(alphas, Array); ratios = strict(ratios, Array); blurX = (+(blurX)); blurY = (+(blurY)); strength = (+(strength)); quality = ((quality) >> 0); type = as(type, 'String'); knockout = Boolean(knockout);
			/**/ this.alphas === void 0 && (this.alphas = null);
			/**/ this.angle === void 0 && (this.angle = NaN);
			/**/ this.blurX === void 0 && (this.blurX = NaN);
			/**/ this.blurY === void 0 && (this.blurY = NaN);
			/**/ this.colors === void 0 && (this.colors = null);
			/**/ this.distance === void 0 && (this.distance = NaN);
			/**/ this.knockout === void 0 && (this.knockout = false);
			/**/ this.quality === void 0 && (this.quality = 0);
			/**/ this.ratios === void 0 && (this.ratios = null);
			/**/ this.strength === void 0 && (this.strength = NaN);
			/**/ this.type === void 0 && (this.type = null);
			super(); 
			this.alphas = alphas;
			this.angle = angle;
			this.blurX = blurX;
			this.blurY = blurY;
			this.colors = colors;
			this.distance = distance;
			this.knockout = knockout;
			this.quality = quality;
			this.ratios = ratios;
			this.strength = strength;
			this.type = type;
			
			// Not implemented
			this.__notImplemented = true;
		}
		
		/*override*/ public clone():BitmapFilter
		{
			return new GradientGlowFilter(this.distance, this.angle, this.colors, this.alphas, this.ratios, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout);
		}
	}
}