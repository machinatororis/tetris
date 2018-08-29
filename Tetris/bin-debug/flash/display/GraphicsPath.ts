/// <reference path="../../base.d.ts" />

namespace flash.display
{
	
	/**
	 * A collection of drawing commands and the coordinate parameters for those commands.
	 * Use a GraphicsPath object with the Graphics.drawGraphicsData() method. 
	 * Drawing a GraphicsPath object is the equivalent of calling the Graphics.drawPath() method.
	 * 
	 * The GraphicsPath class also has its own set of methods (curveTo(), lineTo(), moveTo() wideLineTo() and wideMoveTo())
	 *  similar to those in the Graphics class for making adjustments to the GraphicsPath.commands and GraphicsPath.data vector arrays.
	 * @author pkulikov
	 * 
	 */	
	export  class GraphicsPath implements IGraphicsPath, IGraphicsData
	{
		implements_flash_display_IGraphicsData = null;
		implements_flash_display_IGraphicsPath = null;
		/**
		 * The Vector of drawing commands as integers representing the path. 
		 */		
		public commands:number[] = undefined;
		
		/**
		 * The Vector of Numbers containing the parameters used with the drawing commands. 
		 */		
		public data:number[] = undefined;
		
		/**
		 * Specifies the winding rule using a value defined in the GraphicsPathWinding class. 
		 * @return 
		 * 
		 */		
		public winding:string = null;
		
		/**
		 * Creates a new GraphicsPath object.
		 * @param commands
		 * @param data
		 * @param winding
		 * 
		 */		
		constructor(commands:number[] = null, data:number[] = null, winding:string = "evenOdd")
		{
			/**/ winding = as(winding, 'String');
			this.commands = commands || new Array;
			this.data = data || new Array;
			this.winding = winding;
		}
		
		public clear():void
		{
			this.commands.length = 0;
			this.data.length = 0;
		}
		
		/**
		 * Adds a new "moveTo" command to the commands vector and new coordinates to the data vector. 
		 * @param x
		 * @param y
		 * 
		 */		
		public moveTo(x:number, y:number):void
		{
			/**/ x = (+(x)); y = (+(y));
			this.commands.push(GraphicsPathCommand.MOVE_TO);
			this.data.push(x, y);
		}
		
		/**
		 * Adds a new "lineTo" command to the commands vector and new coordinates to the data vector. 
		 * @param x
		 * @param y
		 * 
		 */		
		public lineTo(x:number, y:number):void
		{
			/**/ x = (+(x)); y = (+(y));
			this.commands.push(GraphicsPathCommand.LINE_TO);
			this.data.push(x, y);
		}
		
		/**
		 * Adds a new "curveTo" command to the commands vector and new coordinates to the data vector. 
		 * @param controlX
		 * @param controlY
		 * @param anchorX
		 * @param anchorY
		 * 
		 */		
		public curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):void
		{
			/**/ controlX = (+(controlX)); controlY = (+(controlY)); anchorX = (+(anchorX)); anchorY = (+(anchorY));
			this.commands.push(GraphicsPathCommand.CURVE_TO);
			this.data.push(controlX, controlY, anchorX, anchorY);
		}
		
		/**
		 * Adds a new "cubicCurveTo" command to the commands vector and new coordinates to the data vector. 
		 * @param controlX1
		 * @param controlY1
		 * @param controlX2
		 * @param controlY2
		 * @param anchorX
		 * @param anchorY
		 * 
		 */		
		public cubicCurveTo(controlX1:number, controlY1:number, controlX2:number, controlY2:number, anchorX:number, anchorY:number):void
		{
			/**/ controlX1 = (+(controlX1)); controlY1 = (+(controlY1)); controlX2 = (+(controlX2)); controlY2 = (+(controlY2)); anchorX = (+(anchorX)); anchorY = (+(anchorY));
			this.commands.push(GraphicsPathCommand.CUBIC_CURVE_TO);
			this.data.push(controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
		}
		
		/**
		 * Adds a new "wideLineTo" command to the commands vector and new coordinates to the data vector. 
		 * @param x
		 * @param y
		 * 
		 */		
		public wideLineTo(x:number, y:number):void
		{
			/**/ x = (+(x)); y = (+(y));
			this.commands.push(GraphicsPathCommand.WIDE_LINE_TO);
			this.data.push(0.0, 0.0, x, y);
		}
		
		/**
		 * Adds a new "wideMoveTo" command to the commands vector and new coordinates to the data vector. 
		 * @param x
		 * @param y
		 * 
		 */		
		public wideMoveTo(x:number, y:number):void
		{
			/**/ x = (+(x)); y = (+(y));
			this.commands.push(GraphicsPathCommand.WIDE_MOVE_TO);
			this.data.push(0.0, 0.0, x, y);
		}
	}
}