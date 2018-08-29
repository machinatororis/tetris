/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * A class that provides constant values for visual blend mode effects. These constants are used in the following:
	 * The blendMode property of the flash.display.DisplayObject class.
	 * The blendMode parameter of the draw() method of the flash.display.BitmapData class 
	 * @author pkulikov
	 * 
	 */	
	export  class BlendMode
	{
		/**
		 * The display object appears in front of the background. 
		 */		
		public static NORMAL:string = "normal";
		
		/**
		 * Forces the creation of a transparency group for the display object. 
		 */		
		public static LAYER:string = "layer";
		
		/**
		 * Multiplies the values of the display object constituent colors by the constituent colors of the background color, 
		 * and normalizes by dividing by 0xFF, resulting in darker colors. 
		 */		
		public static MULTIPLY:string = "multiply";
		
		/**
		 * Multiplies the complement (inverse) of the display object color by the complement of the background color, 
		 * resulting in a bleaching effect. 
		 */		
		public static SCREEN:string = "screen";
		
		/**
		 * Selects the lighter of the constituent colors of the display object and the colors of the background 
		 * (the colors with the larger values). 
		 */		
		public static LIGHTEN:string = "lighten";
		
		/**
		 * Selects the darker of the constituent colors of the display object and the colors of the background 
		 * (the colors with the smaller values). 
		 */		
		public static DARKEN:string = "darken";
		
		/**
		 * Adds the values of the constituent colors of the display object to the colors of its background, applying a ceiling of 0xFF. 
		 */		
		public static ADD:string = "add";
		
		/**
		 * Subtracts the values of the constituent colors in the display object from the values of the background color, 
		 * applying a floor of 0. 
		 */		
		public static SUBTRACT:string = "subtract";
		
		/**
		 * Compares the constituent colors of the display object with the colors of its background, 
		 * and subtracts the darker of the values of the two constituent colors from the lighter value. 
		 */		
		public static DIFFERENCE:string = "difference";
		
		/**
		 * Inverts the background. 
		 */		
		public static INVERT:string = "invert";
		
		/**
		 * Adjusts the color of each pixel based on the darkness of the background. 
		 */		
		public static OVERLAY:string = "overlay";
		
		/**
		 * Adjusts the color of each pixel based on the darkness of the display object. 
		 */		
		public static HARDLIGHT:string = "hardlight";
		
		/**
		 * Applies the alpha value of each pixel of the display object to the background. 
		 */		
		public static ALPHA:string = "alpha";
		
		/**
		 * Erases the background based on the alpha value of the display object. 
		 */		
		public static ERASE:string = "erase";
		
		/**
		 * Uses a shader to define the blend between objects. 
		 */		
		public static SHADER:string = "shader";
		
		/**
		 * Leave the intersection and interchange the rendering.
		 */		
		public static INTERSECT_INTERCHANGE:string = "intersectInterchange";
		
	}

}