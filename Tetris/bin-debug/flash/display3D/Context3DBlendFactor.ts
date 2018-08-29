/// <reference path="../../base.d.ts" />

namespace flash.display3D
{
	
	 /**
	  * Defines the values to use for specifying the source and destination blend factors.
	  * A blend factor represents a particular four-value vector that is multiplied with the source or 
		 * destination color in the blending formula. The blending formula is:
	  * 
	  * result = source * sourceFactor + destination * destinationFactor
	  * 
	  * In the formuls, the source color is the output color of the pixel shader program. 
		 * The destination color is the color that currently exists in the color buffer, as set by previous clear and draw operations.
	  * 
	  * For example, if the source color is (.6, .6, .6, .4) and the source blend factor is Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA, 
		 * then the source part of the blending equation is calculated as:
	  * 
	  * (.6, .6, .6, .4) * (1-0.4, 1-0.4, 1-0.4, 1-0.4) = (.36, .36, .36, .24)
	  * 
	  * The final calculation is clamped to the range [0,1]. 
	  * @author pkulikov
	  * 
	  */	
   export  class Context3DBlendFactor
   {
			/**
			 * The blend factor is (1,1,1,1). 
			 */      
      public static ONE:string = "one";
      
			/**
			 * The blend factor is (0,0,0,0). 
			 */			
      public static ZERO:string = "zero";
      
			/**
			 * The blend factor is (Sa,Sa,Sa,Sa), where Sa is the alpha component of the fragment color computed by the pixel program. 
			 */			
      public static SOURCE_ALPHA:string = "sourceAlpha";
      
			/**
			 * The blend factor is (Sr,Sg,Sb,Sa), where Sr/g/b/a is the corresponding component of the fragment color 
			 * computed by the pixel program. 
			 */			
      public static SOURCE_COLOR:string = "sourceColor";
      
			/**
			 * The blend factor is (1-Sa,1-Sa,1-Sa,1-Sa), where Sa is the alpha component of the fragment color computed by the pixel program. 
			 */			
      public static ONE_MINUS_SOURCE_ALPHA:string = "oneMinusSourceAlpha";
      
			/**
			 * The blend factor is (1-Sr,1-Sg,1-Sb,1-Sa), where Sr/g/b/a is the corresponding component of the fragment color 
			 * computed by the pixel program. 
			 */			
      public static ONE_MINUS_SOURCE_COLOR:string = "oneMinusSourceColor";
      
			/**
			 * The blend factor is (Da,Da,Da,Da), where Da is the alpha component of the fragment color computed by the pixel program. 
			 */			
      public static DESTINATION_ALPHA:string = "destinationAlpha";
      
			/**
			 * The blend factor is (Dr,Dg,Db,Da), where Dr/g/b/a is the corresponding component of the current color in the color buffer. 
			 */			
      public static DESTINATION_COLOR:string = "destinationColor";
      
			/**
			 * The blend factor is (1-Da,1-Da,1-Da,1-Da), where Da is the alpha component of the current color in the color buffer. 
			 */			
      public static ONE_MINUS_DESTINATION_ALPHA:string = "oneMinusDestinationAlpha";
      
			/**
			 * The blend factor is (1-Dr,1-Dg,1-Db,1-Da), where Dr/g/b/a is the corresponding component of the current color in the color buffer. 
			 */			
      public static ONE_MINUS_DESTINATION_COLOR:string = "oneMinusDestinationColor";
   }

}