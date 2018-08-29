/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * Defines a line style or stroke.
	 * Use a GraphicsStroke object with the Graphics.drawGraphicsData() method. 
	 * Drawing a GraphicsStroke object is the equivalent of calling one of the methods of the Graphics class that sets the line style, 
	 * such as the Graphics.lineStyle() method, the Graphics.lineBitmapStyle() method, or the Graphics.lineGradientStyle() method.
	 * @author pkulikov
	 * 
	 */	
	export  class GraphicsStroke implements IGraphicsStroke, IGraphicsData
	{
		implements_flash_display_IGraphicsData = null;
		implements_flash_display_IGraphicsStroke = null;
		/**
		 * Indicates the thickness of the line in points; valid values are 0-255. 
		 */		
		public thickness:number = NaN;
		
		/**
		 * Specifies whether to hint strokes to full pixels. 
		 */		
		public pixelHinting:boolean = false;
		
		/**
		 * Indicates the limit at which a miter is cut off. 
		 */		
		public miterLimit:number = NaN;
		
		/**
		 * Specifies the instance containing data for filling a stroke. 
		 */		
		public fill:IGraphicsFill = null;
		
		/**
		 * Specifies the type of caps at the end of lines. 
		 * @return 
		 * 
		 */		
		public caps:string = null;
		
		/**
		 * Specifies the type of joint appearance used at angles. 
		 * @return 
		 * 
		 */		
		public joints:string = null;
		
		/**
		 * Specifies the stroke thickness scaling. 
		 * @return 
		 * 
		 */		
		public scaleMode:string = null;
		
		/**
		 * Creates a new GraphicsStroke object.
		 * @param thickness
		 * @param pixelHinting
		 * @param scaleMode
		 * @param caps
		 * @param joints
		 * @param miterLimit
		 * @param fill
		 * 
		 */		
		constructor (thickness:number = NaN, pixelHinting:boolean = false, scaleMode:string = "normal", caps:string = "none", joints:string = "round", miterLimit:number = 3.0, fill:IGraphicsFill = null)
		{
			/**/ thickness = (+(thickness)); pixelHinting = Boolean(pixelHinting); scaleMode = as(scaleMode, 'String'); caps = as(caps, 'String'); joints = as(joints, 'String'); miterLimit = (+(miterLimit)); fill = strict(fill, 'implements_flash_display_IGraphicsFill');
			this.thickness = thickness;
			this.pixelHinting = pixelHinting;
			this.caps = caps;
			this.joints = joints;
			this.miterLimit = miterLimit;
			this.scaleMode = scaleMode;
			this.fill = fill;
		}
	}

}