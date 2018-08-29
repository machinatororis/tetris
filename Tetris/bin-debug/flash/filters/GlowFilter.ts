/// <reference path="../../base.d.ts" />
﻿
namespace flash.filters
{
	
	

	/**
	 * The GlowFilter class lets you apply a glow effect to display objects. You have several options for the style of the glow, 
	 * including inner or outer glow and knockout mode. The glow filter is similar to the drop shadow filter with the distance and 
	 * angle properties of the drop shadow filter set to 0. You can apply the filter to any display object 
	 * (that is, objects that inherit from the DisplayObject class), such as MovieClip, SimpleButton, TextField, and Video objects, 
	 * as well as to BitmapData objects.
	 * The use of filters depends on the object to which you apply the filter:
	 * 
	 * To apply filters to display objects, use the filters property (inherited from DisplayObject). Setting the filters property 
	 * of an object does not modify the object, and you can remove the filter by clearing the filters property.
	 * To apply filters to BitmapData objects, use the BitmapData.applyFilter() method. Calling applyFilter() on a BitmapData 
	 * object takes the source BitmapData object and the filter object and generates a filtered image as a result.
	 * If you apply a filter to a display object, the cacheAsBitmap property of the display object is set to true. 
	 * If you clear all filters, the original value of cacheAsBitmap is restored.
	 * 
	 * This filter supports Stage scaling. However, it does not support general scaling, rotation, and skewing. 
	 * If the object itself is scaled (if scaleX and scaleY are set to a value other than 1.0), the filter is not scaled. 
	 * It is scaled only when the user zooms in on the Stage.
	 * 
	 * A filter is not applied if the resulting image exceeds the maximum dimensions. In AIR 1.5 and Flash Player 10, 
	 * the maximum is 8,191 pixels in width or height, and the total number of pixels cannot exceed 16,777,215 pixels. 
	 * (So, if an image is 8,191 pixels wide, it can only be 2,048 pixels high.) In Flash Player 9 and earlier and AIR 1.1 and earlier, 
	 * the limitation is 2,880 pixels in height and 2,880 pixels in width. For example, if you zoom in on a large movie clip with a 
	 * filter applied, the filter is turned off if the resulting image exceeds the maximum dimensions.
	 * @author pkulikov
	 */
	export  class GlowFilter extends DropShadowFilter
	{
		/**
		 * Not needed
		 * @param value
		 * 
		 */		
		/*override*/ public set angle (value:number) { /**/ value = (+(value)); this.super('flash.filters.DropShadowFilter', 'angle',   0.0); }
		/*override*/ public get angle():number { return this.super('flash.filters.DropShadowFilter', 'angle'); }
		/*override*/ public set distance (value:number) { /**/ value = (+(value)); this.super('flash.filters.DropShadowFilter', 'distance',   0.0); }
		/*override*/ public get distance():number { return this.super('flash.filters.DropShadowFilter', 'distance'); }
		
		/**
		 * Initializes a new GlowFilter instance with the specified parameters. 
		 * @param color
		 * @param alpha
		 * @param blurX
		 * @param blurY
		 * @param strength
		 * @param quality
		 * @param inner
		 * @param knockout
		 * 
		 */		
		constructor(color:number = 0xFF0000, alpha:number = 1.0, blurX:number = 6.0, blurY:number = 6.0, strength:number = 2, quality:number = 1, inner:boolean = false, knockout:boolean = false, hideObject:boolean = false)
		{
			/**/ color = ((color) >>> 0); alpha = (+(alpha)); blurX = (+(blurX)); blurY = (+(blurY)); strength = (+(strength)); quality = ((quality) >> 0); inner = Boolean(inner); knockout = Boolean(knockout); hideObject = Boolean(hideObject);
			super(0.0, 0.0, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject);
		}
		
		/*override*/ public clone():GlowFilter
		{
			return new GlowFilter(this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject);
		}
		
		/*[internal]*/ /*override*/ protected __getHash():string
		{
			return this.__fixedHash || [this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject].toString();
		}
	}	
}