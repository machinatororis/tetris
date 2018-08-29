/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * Defines a solid fill.
	 * Use a GraphicsSolidFill object with the Graphics.drawGraphicsData() method. 
	 * Drawing a GraphicsSolidFill object is the equivalent of calling the Graphics.beginFill() method.
	 * @author pkulikov
	 * 
	 */	
	export  class GraphicsSolidFill implements IGraphicsFill, IGraphicsData
	{
		implements_flash_display_IGraphicsData = null;
		implements_flash_display_IGraphicsFill = null;
		/**
		 * The color of the fill. 
		 */		
		public color:number = 0;
		
		/**
		 * Indicates the alpha transparency value of the fill. 
		 */		
		public alpha:number = 1.0;
		
		/**
		 * Constrcutor
		 */
		constructor (color:number = 0, alpha:number = 1.0)
		{
			/**/ color = ((color) >>> 0); alpha = (+(alpha));
			this.color = color;
			this.alpha = alpha;
		}
	}

}