/// <reference path="../../base.d.ts" />
﻿
namespace flash.filters
{
	
	/**
	 * The BevelFilter class lets you add a bevel effect to display objects. A bevel effect gives objects such as buttons a 
	 * three-dimensional look. You can customize the look of the bevel with different highlight and shadow colors, 
	 * the amount of blur on the bevel, the angle of the bevel, the placement of the bevel, and a knockout effect. 
	 * You can apply the filter to any display object (that is, objects that inherit from the DisplayObject class), such as MovieClip, 
	 * SimpleButton, TextField, and Video objects, as well as to BitmapData objects.
	 * 
	 * To create a new filter, use the constructor new BevelFilter(). The use of filters depends on the object to which you apply the filter:
	 * 
	 *     To apply filters to movie clips, text fields, buttons, and video, use the filters property (inherited from DisplayObject). 
	 * Setting the filters property of an object does not modify the object, and you can remove the filter by clearing the filters property.
	 *     To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a 
	 * BitmapData object takes the source BitmapData object and the filter object and generates a filtered image as a result.
	 * 
	 * If you apply a filter to a display object, the value of the cacheAsBitmap property of the object is set to true. 
	 * If you remove all filters, the original value of cacheAsBitmap is restored.
	 * 
	 * This filter supports Stage scaling. However, it does not support general scaling, rotation, and skewing. 
	 * If the object itself is scaled (if the scaleX and scaleY properties are not set to 100%), the filter is not scaled. 
	 * It is scaled only when the user zooms in on the Stage.
	 * 
	 * A filter is not applied if the resulting image exceeds the maximum dimensions. In AIR 1.5 and Flash Player 10, 
	 * the maximum is 8,191 pixels in width or height, and the total number of pixels cannot exceed 16,777,215 pixels. 
	 * (So, if an image is 8,191 pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and earlier and AIR 1.1 and earlier, 
	 * the limitation is 2,880 pixels in height and 2,880 pixels in width. If, for example, you zoom in on a large movie clip with a 
	 * filter applied, the filter is turned off if the resulting image exceeds the maximum dimensions.
	 * @author pkulikov
	 */
	export  class BevelFilter extends DropShadowFilter
	{
		/**
		 * The alpha transparency value of the highlight color. 
		 */		
		public highlightAlpha : number;

		/**
		 * The highlight color of the bevel. 
		 */		
		public highlightColor : number;

		/**
		 * The alpha transparency value of the shadow color. 
		 */		
 	 	public shadowAlpha : number;

		/**
		 * The shadow color of the bevel. 
		 */		
 	 	public shadowColor : number;

		/**
		 * The placement of the bevel on the object. 
		 */		
 	 	public type : string;
		
		/**
		 * Initializes a new BevelFilter instance with the specified parameters.
		 * @param distance
		 * @param angle
		 * @param highlightColor
		 * @param highlightAlpha
		 * @param shadowColor
		 * @param shadowAlpha
		 * @param blurX
		 * @param blurY
		 * @param strength
		 * @param quality
		 * @param type
		 * @param knockout
		 * 
		 */		
		constructor(distance:number = 4.0, angle:number = 45, highlightColor:number = 0xFFFFFF, highlightAlpha:number = 1.0, shadowColor:number = 0x000000, shadowAlpha:number = 1.0, blurX:number = 4.0, blurY:number = 4.0, strength:number = 1, quality:number = 1, type:string = "inner", knockout:boolean = false, hideObject:boolean = false)
		{
			/**/ distance = (+(distance)); angle = (+(angle)); highlightColor = ((highlightColor) >>> 0); highlightAlpha = (+(highlightAlpha)); shadowColor = ((shadowColor) >>> 0); shadowAlpha = (+(shadowAlpha)); blurX = (+(blurX)); blurY = (+(blurY)); strength = (+(strength)); quality = ((quality) >> 0); type = as(type, 'String'); knockout = Boolean(knockout); hideObject = Boolean(hideObject);
			/**/ this.highlightAlpha === void 0 && (this.highlightAlpha = NaN);
			/**/ this.highlightColor === void 0 && (this.highlightColor = 0);
			/**/ this.shadowAlpha === void 0 && (this.shadowAlpha = NaN);
			/**/ this.shadowColor === void 0 && (this.shadowColor = 0);
			/**/ this.type === void 0 && (this.type = null);
			///////////////////////////////////
			// Implemented as a stub
			highlightAlpha = shadowAlpha = 0;
			///////////////////////////////////
			
			this.highlightAlpha = highlightAlpha;
			this.highlightColor = highlightColor;
			this.shadowAlpha = shadowAlpha;
			this.shadowColor = shadowColor;
			this.type = type;
			
			super(distance, angle, highlightColor, highlightAlpha, blurX, blurY, strength, quality, type == BitmapFilterType.INNER, knockout, hideObject);
		}
		
		/*override*/ public clone():BitmapFilter
		{
			return new BevelFilter(this.distance, this.angle, this.highlightColor, this.highlightAlpha, this.shadowColor, this.shadowAlpha, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout, this.hideObject);
		}
		
		/*[internal]*/ /*override*/ protected __getHash():string
		{
			return this.__fixedHash || [this.distance, this.angle, this.highlightColor, this.highlightAlpha, this.shadowColor, this.shadowAlpha, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout, this.hideObject].toString();
		}
	}
}