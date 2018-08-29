/// <reference path="../../base.d.ts" />

namespace flash.geom
{
	
	/**
	 * The ColorTransform class lets you adjust the color values in a display object. 
	 * The color adjustment or color transformation can be applied to all four channels: red, green, blue, and alpha transparency.
	 * When a ColorTransform object is applied to a display object, a new value for each color channel is calculated like this:
	 * 
	 * New red value = (old red value * redMultiplier) + redOffset
	 * New green value = (old green value * greenMultiplier) + greenOffset
	 * New blue value = (old blue value * blueMultiplier) + blueOffset
	 * New alpha value = (old alpha value * alphaMultiplier) + alphaOffset
	 * If any of the color channel values is greater than 255 after the calculation, it is set to 255. If it is less than 0, it is set to 0.
	 * 
	 * You can use ColorTransform objects in the following ways:
	 * 
	 * In the colorTransform parameter of the colorTransform() method of the BitmapData class
	 * As the colorTransform property of a Transform object (which can be used as the transform property of a display object)
	 * You must use the new ColorTransform() constructor to create a ColorTransform object 
	 * before you can call the methods of the ColorTransform object.
	 * 
	 * Color transformations do not apply to the background color of a movie clip (such as a loaded SWF object). 
	 * They apply only to graphics and symbols that are attached to the movie clip. 
	 * @author pkulikov
	 * 
	 */	
	export  class ColorTransform
	{
		/**
		 * A number from -255 to 255 that is added to the red channel value 
		 * after it has been multiplied by the redMultiplier value. 
		 */		
		public redOffset : number = NaN;
		
		/**
		 * A number from -255 to 255 that is added to the green channel value 
		 * after it has been multiplied by the greenMultiplier value. 
		 */		
		public greenOffset : number = NaN;
		
		/**
		 * A number from -255 to 255 that is added to the blue channel value 
		 * after it has been multiplied by the blueMultiplier value. 
		 */		
		public blueOffset : number = NaN;
		
		/**
		 * A number from -255 to 255 that is added to the alpha transparency channel value 
		 * after it has been multiplied by the alphaMultiplier value. 
		 */		
		public alphaOffset : number = NaN;
		
		/**
		 * A decimal value that is multiplied with the red channel value.  
		 */		
		public redMultiplier : number = NaN;
		
		/**
		 * A decimal value that is multiplied with the green channel value.  
		 */		
		public greenMultiplier : number = NaN;
		
		/**
		 * A decimal value that is multiplied with the blue channel value.  
		 */		
		public blueMultiplier : number = NaN;
		
		/**
		 * A decimal value that is multiplied with the alpha transparency channel value.  
		 */		
		public alphaMultiplier : number = NaN;
		
		/**
		 * 
		 * @param redMultiplier
		 * @param greenMultiplier
		 * @param blueMultiplier
		 * @param alphaMultiplier
		 * @param redOffset
		 * @param greenOffset
		 * @param blueOffset
		 * @param alphaOffset
		 * 
		 */		
		constructor (redMultiplier : number = 1.0, greenMultiplier : number = 1.0, blueMultiplier : number = 1.0, alphaMultiplier : number = 1.0, redOffset : number = 0, greenOffset : number = 0, blueOffset : number = 0, alphaOffset : number = 0)
		{
			/**/ redMultiplier = (+(redMultiplier)); greenMultiplier = (+(greenMultiplier)); blueMultiplier = (+(blueMultiplier)); alphaMultiplier = (+(alphaMultiplier)); redOffset = (+(redOffset)); greenOffset = (+(greenOffset)); blueOffset = (+(blueOffset)); alphaOffset = (+(alphaOffset));
			this.redMultiplier = redMultiplier;
			this.greenMultiplier = greenMultiplier;
			this.blueMultiplier = blueMultiplier;
			this.alphaMultiplier = alphaMultiplier;
			this.redOffset = redOffset;
			this.greenOffset = greenOffset;
			this.blueOffset = blueOffset;
			this.alphaOffset = alphaOffset;
		}
		
		/**
		 * The RGB color value for a ColorTransform object. 
		 * @return 
		 * 
		 */		
		public get color():number
		{
			return this.redOffset << 16 | this.greenOffset << 8 | this.blueOffset;
		}
		
		public set color(newColor:number)
		{
			/**/ newColor = ((newColor) >>> 0);
			this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 0;
			this.redOffset = newColor >> 16 & 255;
			this.greenOffset = newColor >> 8 & 255;
			this.blueOffset = newColor & 255;
		}
		
		/**
		 * Concatenates the ColorTranform object specified by the second parameter with the current ColorTransform object 
		 * and sets the current object as the result, which is an additive combination of the two color transformations. 
		 * @param second
		 * 
		 */		
		public concat(second:ColorTransform):void
		{
			/**/ second = strict(second, ColorTransform);
			this.__concat(second);
		}
		
		/**
		 * Formats and returns a string that describes all of the properties of the ColorTransform object. 
		 * @return 
		 * 
		 */		
		public toString():string
		{
			return "(redMultiplier=" + this.redMultiplier + ", greenMultiplier=" + this.greenMultiplier + ", blueMultiplier=" + this.blueMultiplier + ", alphaMultiplier=" + this.alphaMultiplier + ", redOffset=" + this.redOffset + ", greenOffset=" + this.greenOffset + ", blueOffset=" + this.blueOffset + ", alphaOffset=" + this.alphaOffset + ")";
		}
		
		/**
		 * Helpers 
		 * @return 
		 * 
		 */
		public copyFrom (sourceTransform:ColorTransform):void
		{
			/**/ sourceTransform = strict(sourceTransform, ColorTransform);
			this.redMultiplier = sourceTransform.redMultiplier;
			this.greenMultiplier = sourceTransform.greenMultiplier;
			this.blueMultiplier = sourceTransform.blueMultiplier;
			this.alphaMultiplier = sourceTransform.alphaMultiplier;
			this.redOffset = sourceTransform.redOffset;
			this.greenOffset = sourceTransform.greenOffset;
			this.blueOffset = sourceTransform.blueOffset;
			this.alphaOffset = sourceTransform.alphaOffset;
		}
		
		public identity ():void
		{
			this.redMultiplier = this.greenMultiplier = this.blueMultiplier = this.alphaMultiplier = 1.0;
			this.redOffset = this.greenOffset = this.blueOffset = this.alphaOffset = 0;
		}
		
		public get isIdentity ():boolean
		{
			return !this.isMultiplier && !this.isOffset;
		}
		
		public get isMultiplier():boolean
		{
			return this.redMultiplier != 1 || this.greenMultiplier != 1 || this.blueMultiplier != 1 || this.alphaMultiplier != 1;
		}
		
		public get isOffset():boolean
		{
			return this.redOffset != 0 || this.greenOffset != 0 || this.blueOffset != 0 || this.alphaOffset != 0;
		}

		/**
		 * Helpers 
		 * @return 
		 * 
		 */
		/*[internal]*/ protected __copyFrom (sourceTransform:ColorTransform):void
		{
			// sourceTransform = strict(sourceTransform, ColorTransform);
			this.redMultiplier = sourceTransform.redMultiplier;
			this.greenMultiplier = sourceTransform.greenMultiplier;
			this.blueMultiplier = sourceTransform.blueMultiplier;
			this.alphaMultiplier = sourceTransform.alphaMultiplier;
			this.redOffset = sourceTransform.redOffset;
			this.greenOffset = sourceTransform.greenOffset;
			this.blueOffset = sourceTransform.blueOffset;
			this.alphaOffset = sourceTransform.alphaOffset;
		}
		
		/**
		 * Concatenates the ColorTranform object specified by the second parameter with the current ColorTransform object 
		 * and sets the current object as the result, which is an additive combination of the two color transformations. 
		 * @param second
		 * 
		 */		
		/*[internal]*/ protected __concat(second:ColorTransform):void
		{
			// second = strict(second, ColorTransform);
			this.alphaOffset += this.alphaMultiplier * second.alphaOffset;
			this.alphaMultiplier *= second.alphaMultiplier;
			this.redOffset += this.redMultiplier * second.redOffset;
			this.redMultiplier *= second.redMultiplier;
			this.greenOffset += this.greenMultiplier * second.greenOffset;
			this.greenMultiplier *= second.greenMultiplier;
			this.blueOffset += this.blueMultiplier * second.blueOffset;
			this.blueMultiplier *= second.blueMultiplier;
		}
	}
}