/// <reference path="../../base.d.ts" />
/// <reference path="../geom/Rectangle.ts" />
/// <reference path="../geom/Matrix.ts" />
/// <reference path="../__native/utils/Bounds.ts" />
/// <reference path="../__native/renderer/webgl/GLCacheDisplayObject.ts" />
/// <reference path="../__native/display/SystemBitmapData.ts" />

namespace flash.display
{
	export import SystemBitmapData = flash.__native.display.SystemBitmapData;
	export import GLCacheDisplayObject = flash.__native.renderer.webgl.GLCacheDisplayObject;
	export import Bounds = flash.__native.utils.Bounds;
	export import Matrix = flash.geom.Matrix;
	export import Rectangle = flash.geom.Rectangle;
	
	
	/**
	 * The Graphics class contains a set of methods that you can use to create a vector shape. 
	 * Display objects that support drawing include Sprite and Shape objects. 
	 * Each of these classes includes a graphics property that is a Graphics object. 
	 * The following are among those helper functions provided for ease of use: drawRect(), drawRoundRect(), drawCircle(), and drawEllipse().
	 * You cannot create a Graphics object directly from ActionScript code. If you call new Graphics(), an exception is thrown.
	 * 
	 * The Graphics class is final; it cannot be subclassed.
	 * @author pkulikov
	 * 
	 */	
	export  class Graphics
	{
		public static BEGIN_FILL : number									= 0;
		public static BEGIN_GRADIENT_FILL : number				= 1;
		public static BEGIN_BITMAP_FILL : number					= 2;
		public static LINE_STYLE : number									= 3;
		public static LINE_GRADIENT_STYLE : number				= 4;
		public static LINE_BITMAP_STYLE : number					= 5;
		public static MOVE_TO : number										= 6;
		public static LINE_TO : number										= 7;
		public static CURVE_TO : number										= 8;
		public static CUBIC_CURVE_TO : number							= 9;
		public static END_FILL : number										= 10;
		
		/*[internal]*/ protected static sHelperRectangle : Rectangle = asc.sti(Graphics,()=>{ Graphics.sHelperRectangle = new Rectangle; });
		/*[internal]*/ protected static sHelperMatrix : Matrix = asc.sti(Graphics,()=>{ Graphics.sHelperMatrix = new Matrix; });
		
		/*[internal]*/ public dirty : boolean;
		
		/*[internal]*/ protected _commands : any[];
		/*[internal]*/ protected _commandsSize : number;
		/*[internal]*/ protected _dirtyRect : boolean;
		/*[internal]*/ protected _combinedBounds : Bounds;
		/*[internal]*/ protected _combinedRect : Rectangle;
		/*[internal]*/ protected _lastX : number;
		/*[internal]*/ protected _lastY : number;
		/*[internal]*/ protected _boundsIncludeLastCoordinates : boolean;
		/*[internal]*/ protected _topLeftStrokeWidth : number;
		/*[internal]*/ protected _bottomRightStrokeWidth : number;
		/*[internal]*/ protected _cache : GLCacheDisplayObject;
		
		/**
		 * Constrcutor
		 */		
		constructor()
		{
			this._commands = [];
			this._commandsSize = 0;
			this._combinedBounds = new Bounds;
			this._combinedRect = new Rectangle;
			this._lastX = this._lastY = 0;
			this._boundsIncludeLastCoordinates = true;
			this._topLeftStrokeWidth = this._bottomRightStrokeWidth = 0;
		}
		
		/**
		 * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings. 
		 * 
		 */		
		public clear():void
		{
			this._commands.length = 0;
			this._commandsSize = 0;
			this._dirtyRect = true;
			this._combinedBounds.setToSentinels();
			this._combinedRect.setEmpty();
			this._lastX = this._lastY = 0;
			this._boundsIncludeLastCoordinates = true;
			this._topLeftStrokeWidth = this._bottomRightStrokeWidth = 0;
			this.__invalidate();
		}
		
		/**
		 * Specifies a simple one-color fill that subsequent calls to other Graphics methods (such as lineTo() or drawCircle()) 
		 * use when drawing. 
		 * @param color
		 * @param alpha
		 * 
		 */		
		public beginFill(color:number, alpha:number = 1.0):void
		{
			/**/ color = ((color) >>> 0); alpha = (+(alpha));
			this.__cmd(Graphics.BEGIN_FILL, [ color, alpha ]);
		}
		
		/**
		 * Specifies a gradient fill used by subsequent calls to other Graphics methods (such as lineTo() or drawCircle()) for the object. 
		 * @param type
		 * @param colors
		 * @param alphas
		 * @param ratios
		 * @param matrix
		 * @param spreadMethod
		 * @param interpolationMethod
		 * @param focalPointRatio
		 * 
		 */		
		public beginGradientFill(type:string, colors:any[], alphas:any[], ratios:any[], matrix:Matrix = null, spreadMethod:string = "pad", interpolationMethod:string = "rgb", focalPointRatio:number = 0):void
		{
			/**/ type = as(type, 'String'); colors = strict(colors, Array); alphas = strict(alphas, Array); ratios = strict(ratios, Array); matrix = strict(matrix, Matrix); spreadMethod = as(spreadMethod, 'String'); interpolationMethod = as(interpolationMethod, 'String'); focalPointRatio = (+(focalPointRatio));
			var i, len;
			
			for (i = 0, len = alphas.length; i < len; ++i) {
				
				alphas[i] = Math.max(0, Math.min(alphas[i], 1));
				
			}
			
			for (i = 0, len = ratios.length; i < len; ++i) {
				
				ratios[i] = Math.max(0, Math.min(ratios[i], 255));
				
			}
			
			this.__cmd(Graphics.BEGIN_GRADIENT_FILL, [ type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio ]);
		}
		
		/**
		 * Fills a drawing area with a bitmap image. 
		 * @param bitmap
		 * @param matrix
		 * @param repeat
		 * @param smooth
		 * 
		 */		
		public beginBitmapFill(bitmap:BitmapData, matrix:Matrix = null, repeat:boolean = true, smooth:boolean = false):void
		{
			/**/ bitmap = strict(bitmap, BitmapData); matrix = strict(matrix, Matrix); repeat = Boolean(repeat); smooth = Boolean(smooth);
			if (!bitmap) {
				
				throw new TypeError ("Parameter bitmap must be non-null.", 2007);
				
			}
			
			this.__cmd(Graphics.BEGIN_BITMAP_FILL, [ bitmap, matrix, repeat, smooth ]);
		}
		
		// Specifies a shader fill used by subsequent calls to other Graphics methods (such as lineTo() or drawCircle()) for the object. 
		// public function beginShaderFill(param1:Shader, param2:Matrix = null) : void;
		
		/**
		 * Specifies a gradient to use for the stroke when drawing lines. 
		 * @param type
		 * @param colors
		 * @param alphas
		 * @param ratios
		 * @param matrix
		 * @param spreadMethod
		 * @param interpolationMethod
		 * @param focalPointRatio
		 * 
		 */		
		public lineGradientStyle(type:string, colors:any[], alphas:any[], ratios:any[], matrix:Matrix = null, spreadMethod:string = "pad", interpolationMethod:string = "rgb", focalPointRatio:number = 0):void
		{
			/**/ type = as(type, 'String'); colors = strict(colors, Array); alphas = strict(alphas, Array); ratios = strict(ratios, Array); matrix = strict(matrix, Matrix); spreadMethod = as(spreadMethod, 'String'); interpolationMethod = as(interpolationMethod, 'String'); focalPointRatio = (+(focalPointRatio));
			var i, len;
			
			for (i = 0, len = alphas.length; i < len; ++i) {
				
				alphas[i] = Math.max(0, Math.min(alphas[i], 1));
				
			}
			
			for (i = 0, len = ratios.length; i < len; ++i) {
				
				ratios[i] = Math.max(0, Math.min(ratios[i], 255));
				
			}
			
			this.__cmd(Graphics.LINE_GRADIENT_STYLE, [ type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio ]);
		}
		
		/**
		 * Specifies a line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method. 
		 * @param thickness
		 * @param color
		 * @param alpha
		 * @param pixelHinting
		 * @param scaleMode
		 * @param caps
		 * @param joints
		 * @param miterLimit
		 * 
		 */		
		public lineStyle(thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false, scaleMode:string = "normal", caps:string = null, joints:string = null, miterLimit:number = 3):void
		{
			/**/ thickness = (+(thickness)); color = ((color) >>> 0); alpha = (+(alpha)); pixelHinting = Boolean(pixelHinting); scaleMode = as(scaleMode, 'String'); caps = as(caps, 'String'); joints = as(joints, 'String'); miterLimit = (+(miterLimit));
			if (thickness < 1) {
				
				thickness = 1;
				
			}
			
			this.__cmd(Graphics.LINE_STYLE, [ thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit ]);
			
			// Flash stops drawing strokes whenever a thickness is supplied that can't be coerced to a
			// number.
			if (isNaN(thickness)) {
				
				this.__setStrokeWidth(0);
				return;
				
			}
			
			this.__setStrokeWidth(thickness);
		}
		
		/**
		 * Draws a rectangle. 
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * 
		 */		
		public drawRect(x:number, y:number, width:number, height:number):void
		{
			/**/ x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height));
			var x2 = x + width;
			var y2 = y + height;
			
			this.__cmd(Graphics.MOVE_TO, [ x, y ]);
			this.__cmd(Graphics.LINE_TO, [ x2, y ]);
			this.__cmd(Graphics.LINE_TO, [ x2, y2 ]);
			this.__cmd(Graphics.LINE_TO, [ x, y2 ]);
			this.__cmd(Graphics.LINE_TO, [ x, y ]);
			
			this.__applyLastCoordinates(x, y);
			this.__inflateBounds(x2, y2);
			this.__invalidate();
		}
		
		/**
		 * Draws a rounded rectangle. 
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * @param ellipseWidth
		 * @param ellipseHeight
		 * 
		 */		
		public drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight:number = NaN):void
		{
			/**/ x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height)); ellipseWidth = (+(ellipseWidth)); ellipseHeight = (+(ellipseHeight));
			if (isNaN(ellipseHeight)) {
				
				ellipseHeight = ellipseWidth;
				
			}
			
			if (!ellipseHeight || !ellipseWidth) {
				
				this.drawRect(x, y, width, height);
				return;
				
			}
			
			var radiusX:number = ellipseWidth >> 1;
			var radiusY:number = ellipseHeight >> 1;
			var hw = width >> 1;
			var hh = height >> 1;
			
			if (radiusX > hw) {
				
				radiusX =(( hw) >> 0);
				
			}
			
			if (radiusY > hh) {
				
				radiusY =(( hh) >> 0);
				
			}
			
			if (hw == radiusX && hh == radiusY) {
				
				if (radiusX == radiusY) {
					
					this.drawCircle(x + radiusX, y + radiusY, radiusX);
					
				} else {
					
					this.drawEllipse(x, y, radiusX * 2, radiusY * 2);
					
				}
				
				return;
				
			}
			
			//    A-----B
			//  H         C
			//  G         D
			//    F-----E
			//
			// Drawing starts and stops at `D`. This is visible when the drawn shape forms part of a
			// larger shape, with which it is then connected at `D`.
			var right = x + width;
			var bottom = y + height;
			var xlw = x + radiusX;
			var xrw = right - radiusX;
			var ytw = y + radiusY;
			var ybw = bottom - radiusY;
			
			this.__cmd(Graphics.MOVE_TO, [ right, ybw ]);
			this.__cmd(Graphics.CURVE_TO, [ right, bottom, xrw, bottom ]);
			this.__cmd(Graphics.LINE_TO, [ xlw, bottom ]);
			this.__cmd(Graphics.CURVE_TO, [ x, bottom, x, ybw ]);
			this.__cmd(Graphics.LINE_TO, [ x, ytw ]);
			this.__cmd(Graphics.CURVE_TO, [ x, y, xlw, y ]);
			this.__cmd(Graphics.LINE_TO, [ xrw, y ]);
			this.__cmd(Graphics.CURVE_TO, [ right, y, right, ytw ]);
			this.__cmd(Graphics.LINE_TO, [ right, ybw ]);
			
			this.__applyLastCoordinates(x, y);
			this.__inflateBounds(right, bottom);
			this.__invalidate();
		}
		
		public drawRoundRectComplex(x:number, y:number, width:number, height:number, topLeftRadius:number, topRightRadius:number, bottomLeftRadius:number, bottomRightRadius:number):void
		{
			/**/ x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height)); topLeftRadius = (+(topLeftRadius)); topRightRadius = (+(topRightRadius)); bottomLeftRadius = (+(bottomLeftRadius)); bottomRightRadius = (+(bottomRightRadius));
			if (!(topLeftRadius | topRightRadius | bottomLeftRadius | bottomRightRadius)) {
				
				this.drawRect(x, y, width, height);
				return;
				
			}
			
			var right = x + width;
			var bottom = y + height;
			var xtl = x + topLeftRadius;
			
			this.__cmd(this.moveTo.__bind(this), [ right, bottom - bottomRightRadius ]);
			this.__cmd(this.curveTo.__bind(this), [ right, bottom, right - bottomRightRadius, bottom ]);
			this.__cmd(this.lineTo.__bind(this), [ x + bottomLeftRadius, bottom ]);
			this.__cmd(this.curveTo.__bind(this), [ x, bottom, x, bottom - bottomLeftRadius ]);
			this.__cmd(this.lineTo.__bind(this), [ x, y + topLeftRadius ]);
			this.__cmd(this.curveTo.__bind(this), [ x, y, xtl, y ]);
			this.__cmd(this.lineTo.__bind(this), [ right - topRightRadius, y ]);
			this.__cmd(this.curveTo.__bind(this), [ right, y, right, y + topRightRadius ]);
			this.__cmd(this.lineTo.__bind(this), [ right, bottom - bottomRightRadius ]);
			
			this.__applyLastCoordinates(x, y);
			this.__inflateBounds(right, bottom);
			this.__invalidate();
		}
		
		/**
		 * Draws a circle. 
		 * @param x
		 * @param y
		 * @param radius
		 * 
		 */		
		public drawCircle(x:number, y:number, radius:number):void
		{
			/**/ x = (+(x)); y = (+(y)); radius = (+(radius));
			// TODO: Implement these using arcs not ellipses. The latter is not
			// visually correct when the stroke is very thick and the circle is
			// very small.
			this.drawEllipse(x - radius, y - radius, radius * 2, radius * 2);
		}
		
		/**
		 * Draws an ellipse.
		 * Here x and y are the top-left coordinates of the bounding box of the
		 * ellipse not the center as is the case for circles.
		 */
		public drawEllipse(x:number, y:number, width:number, height:number):void
		{
			/**/ x = (+(x)); y = (+(y)); width = (+(width)); height = (+(height));
			/*
			*          , - ~ 3 ~ - ,
			*      , '               ' ,
			*    ,                       ,
			*   ,                         ,
			*  ,                           ,
			*  2             o             0
			*  ,                           ,
			*   ,                         ,
			*    ,                       ,
			*      ,                  , '
			*        ' - , _ 1 _ ,  '
			*/
			var rx = width >> 1;
			var ry = height >> 1;
			// Move x, y to the middle of the ellipse.
			x += rx;
			y += ry;
			var currentX = x + rx;
			var currentY = y;
			this.moveTo(currentX, currentY); // 0
			var startAngle:number = 0;
			var u = 1;
			var v = 0;
			for (var i = 0; i < 4; i++) {
				
				var endAngle = startAngle + Math.PI / 2;
				var kappa = (4 / 3) * Math.tan((endAngle - startAngle) / 4);
				var cp1x = currentX - v * kappa * rx;
				var cp1y = currentY + u * kappa * ry;
				
				u = Math.cos(endAngle);
				v = Math.sin(endAngle);
				currentX = x + u * rx;
				currentY = y + v * ry;
				
				var cp2x = currentX + v * kappa * rx;
				var cp2y = currentY - u * kappa * ry;
				
				this.cubicCurveTo(
					cp1x,
					cp1y,
					cp2x,
					cp2y,
					currentX,
					currentY
				);
				startAngle =(+( endAngle));
				
			}
			
			this.__invalidate();
		}
		
		/**
		 * Moves the current drawing position to (x, y). 
		 * @param x
		 * @param y
		 * 
		 */		
		public moveTo(x:number, y:number):void
		{
			/**/ x = (+(x)); y = (+(y));
			this.__cmd(Graphics.MOVE_TO, [ x, y ]);
			
			// Don't use inflateBounds because that extends the bounds objects, too.
			this._lastX = x;
			this._lastY = y;
			this._boundsIncludeLastCoordinates = false;
		}
		
		/**
		 * Draws a line using the current line style from the current drawing position to (x, y); 
		 * the current drawing position is then set to (x, y). 
		 * @param x
		 * @param y
		 * 
		 */		
		public lineTo(x:number, y:number):void
		{
			/**/ x = (+(x)); y = (+(y));
			this.__cmd(Graphics.LINE_TO, [ x, y ]);
			this.__applyLastCoordinates(x, y);
			this.__invalidate();
		}
		
		/**
		 * Draws a quadratic Bezier curve using the current line style from the current drawing position to (anchorX, anchorY) 
		 * and using the control point that (controlX, controlY) specifies. 
		 * @param controlX
		 * @param controlY
		 * @param anchorX
		 * @param anchorY
		 * 
		 */		
		public curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):void
		{
			/**/ controlX = (+(controlX)); controlY = (+(controlY)); anchorX = (+(anchorX)); anchorY = (+(anchorY));
			this.__cmd(Graphics.CURVE_TO, [ controlX, controlY, anchorX, anchorY ]);
			
			if (controlX < this._lastX || controlX > anchorX) {
				
				this.__inflateBoundsX(this.__quadraticBezierExtreme(this._lastX, controlX, anchorX));
				
			}
			
			if (controlY < this._lastY || controlY > anchorY) {
				
				this.__inflateBoundsY(this.__quadraticBezierExtreme(this._lastY, controlY, anchorY));
				
			}
			
			this.__applyLastCoordinates(anchorX, anchorY);
			this.__invalidate();
		}
		
		/**
		 * Draws a cubic Bezier curve from the current drawing position to the specified anchor point. 
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
			this.__cmd(Graphics.CUBIC_CURVE_TO, [ controlX1, controlY1, controlX2, controlY2, anchorX, anchorY ]);
			
			var i;
			var extremes:any[];
			var fromX = this._lastX;
			var fromY = this._lastY;
			
			if (controlX1 < fromX || controlX2 < fromX || controlX1 > anchorX || controlX2 > anchorX) {
				
				extremes = this.__cubicBezierExtremes(fromX, controlX1, controlX2, anchorX);
				for (i = extremes.length; i--; ) {
					
					this.__inflateBoundsX(extremes[i]);
					
				}
				
			}
			
			if (controlY1 < fromY || controlY2 < fromY || controlY1 > anchorY || controlY2 > anchorY) {
				
				extremes = this.__cubicBezierExtremes(fromY, controlY1, controlY2, anchorY);
				
				for (i = extremes.length; i--; ) {
					
					this.__inflateBoundsY(extremes[i]);
					
				}
				
			}
			
			this.__applyLastCoordinates(anchorX, anchorY);
			this.__invalidate();
		}
		
		/**
		 * Applies a fill to the lines and curves that were added since the last call to the beginFill(), beginGradientFill(), 
		 * or beginBitmapFill() method. 
		 * 
		 */		
		public endFill():void
		{
			this.__cmd(Graphics.END_FILL);
			this.__invalidate();
		}
		
		/**
		 * Copies all of drawing commands from the source Graphics object into the calling Graphics object. 
		 * @param sourceGraphics
		 * 
		 */		
		public copyFrom (sourceGraphics : Graphics) : void
		{
			/**/ sourceGraphics = strict(sourceGraphics, Graphics);
			this._commands.length = 0;
			this._commandsSize = sourceGraphics._commandsSize;
			for (var i = 0; i < this._commandsSize; ++i) {
				
				this._commands[i] = sourceGraphics._commands[i];
				
			}
			
			this._combinedBounds.copyFrom(sourceGraphics._combinedBounds);
			this._lastX = sourceGraphics._lastX;
			this._lastY = sourceGraphics._lastY;
			this._boundsIncludeLastCoordinates = sourceGraphics._boundsIncludeLastCoordinates;
			this._topLeftStrokeWidth = sourceGraphics._topLeftStrokeWidth;
			this._bottomRightStrokeWidth = sourceGraphics._bottomRightStrokeWidth;
			this.__invalidate();
		}
		
		/**
		 * Specifies a bitmap to use for the line stroke when drawing lines. 
		 * @param bitmap
		 * @param matrix
		 * @param repeat
		 * @param smooth
		 * 
		 */		
		public lineBitmapStyle(bitmap:BitmapData, matrix:Matrix = null, repeat:boolean = true, smooth:boolean = false):void
		{
			/**/ bitmap = strict(bitmap, BitmapData); matrix = strict(matrix, Matrix); repeat = Boolean(repeat); smooth = Boolean(smooth);
			if (!bitmap) {
				
				throw new TypeError ("Parameter bitmap must be non-null.", 2007);
				
			}
			
			this.__cmd(Graphics.LINE_BITMAP_STYLE, [ bitmap, matrix, repeat, smooth ]);
		}
		
		// Specifies a shader to use for the line stroke when drawing lines.
		// public function lineShaderStyle(param1:Shader, param2:Matrix = null) : void;
		
		/**
		 * Submits a series of commands for drawing. 
		 * @param commands
		 * @param data
		 * @param winding
		 * 
		 */		
		public drawPath(commands:number[], data:number[], winding:string="evenOdd"):void
		{
			/**/ winding = as(winding, 'String');
			var p = 0;
			for (var i = 0, len = commands.length; i < len; ++i) {
				
				switch (commands[i]) {
					
					case GraphicsPathCommand.MOVE_TO:
						this.moveTo (data[p++], data[p++]);
						break;
						
					case GraphicsPathCommand.LINE_TO:
						this.lineTo (data[p++], data[p++]);
						break;
						
					case GraphicsPathCommand.WIDE_MOVE_TO:
						p += 2;
						this.moveTo (data[p++], data[p++]);
						break;
					
					case GraphicsPathCommand.WIDE_LINE_TO:
						p += 2;
						this.lineTo (data[p++], data[p++]);
						break;
					
					case GraphicsPathCommand.CURVE_TO:
						this.curveTo (data[p++], data[p++], data[p++], data[p++]);
						break;
						
					case GraphicsPathCommand.CUBIC_CURVE_TO:
						this.cubicCurveTo (data[p++], data[p++], data[p++], data[p++], data[p++], data[p++]);
						break;
						
				}
				
			}
		}
		
		/**
		 * Renders a set of triangles, typically to distort bitmaps and give them a three-dimensional appearance. 
		 * @param vertices
		 * @param indices
		 * @param uvtData
		 * @param culling
		 * 
		 */		
		public drawTriangles(vertices:number[], indices:number[] = null, uvtData:number[] = null, culling:string = "none"):void
		{
			/**/ culling = as(culling, 'String');
			if (vertices == null || vertices.length == 0) return;
			
			if (indices == null) {
				
				var vertLength = ((vertices.length / 2) >> 0);
				if (vertLength % 3 != 0) {
					
					throw new ArgumentError ("Not enough vertices to close a triangle.");
					
				}
				
				indices = [];
				
				for (var i = 0; i < vertLength; +i) {
					
					indices.push (i);
					
				}
				
			}
			
			for (var i = 0, len = indices.length; i < len;) {
				
				var i0:number =  ((indices[i++]) >> 0);
				var i1:number =  ((indices[i++]) >> 0);
				var i2:number =  ((indices[i++]) >> 0);
				var x0:number =  (+(vertices[2 * i0]));
				var y0:number =  (+(vertices[2 * i0 + 1]));
				var x1:number =  (+(vertices[2 * i1]));
				var y1:number =  (+(vertices[2 * i1 + 1]));
				var x2:number =  (+(vertices[2 * i2]));
				var y2:number =  (+(vertices[2 * i2 + 1]));
				
				this.moveTo(x0, y0);
				this.lineTo(x1, y1);
				this.lineTo(x2, y2);
				this.lineTo(x0, y0);
				
			}
			
			this.__invalidate();
			// TODO: inflateBounds
		}
		
		/**
		 * Submits a series of IGraphicsData instances for drawing. 
		 * @param graphicsData
		 * 
		 */		
		public drawGraphicsData(graphicsData:IGraphicsData[]):void
		{
			for (var i = 0, len = graphicsData.length; i < len; i++) {
				
				var item = graphicsData[i];
				if (is(item , 'implements_flash_display_IGraphicsPath')) {
					
					if (is(item , GraphicsPath)) {
						
						this.drawPath(item.commands, item.data, item.winding);
						
					} else if (is(item , GraphicsTrianglePath)) {
						
						this.drawTriangles(item.vertices, item.indices, item.uvtData, item.culling);
						
					}
					
				} else if (is(item , 'implements_flash_display_IGraphicsFill')) {
					
					if (is(item , GraphicsEndFill)) {
						
						this.endFill();
						
					} else if (is(item , GraphicsSolidFill)) {
						
						this.beginFill(item.color, item.alpha);
						
					} else if (is(item , GraphicsGradientFill)) {
						
						this.beginGradientFill(item.type, item.colors, item.alphas, item.ratios, item.matrix, item.spreadMethod, item.interpolationMethod, item.focalPointRatio);
						
					} else if (is(item , GraphicsBitmapFill)) {
						
						this.beginBitmapFill(item.bitmapData, item.matrix, item.repeat, item.smooth);
						
					}
					/* else if(item is GraphicsShaderFill) {
					
						beginShaderFill(item.shader, item.matrix);
					
					}*/
					
				} else if (is(item , 'implements_flash_display_IGraphicsStroke')) {
					
					var fill;
					var stroke;
					
					if (item != null && is(item , GraphicsStroke)) {
						
						stroke = as(item , GraphicsStroke);
						
					}
					
					if (stroke && stroke.fill && is(stroke.fill , 'implements_flash_display_IGraphicsFill')) {
						
						fill = stroke.fill;
						
					}
					
					if (stroke == null || fill == null) {
						
						this.lineStyle();
						
					} else if (is(fill , GraphicsSolidFill)) {
						
						this.lineStyle(stroke.thickness, fill.color, fill.alpha, stroke.pixelHinting, stroke.scaleMode, stroke.caps, stroke.joints, stroke.miterLimit);
						
					} else if (is(fill , GraphicsGradientFill)) {
						
						this.lineStyle(stroke.thickness, 0, 1, stroke.pixelHinting, stroke.scaleMode, stroke.caps, stroke.joints, stroke.miterLimit);
						this.lineGradientStyle(fill.type, fill.colors, fill.alphas, fill.ratios, fill.matrix, fill.spreadMethod, fill.interpolationMethod, fill.focalPointRatio);
						
					} else if (is(fill , GraphicsBitmapFill)) {
						
						this.lineStyle(stroke.thickness, 0, 1, stroke.pixelHinting, stroke.scaleMode, stroke.caps, stroke.joints, stroke.miterLimit);
						this.lineBitmapStyle(fill.bitmapData, fill.matrix, fill.repeat, fill.smooth);
						
					}
					/*else if (fill is GraphicsShaderFill) {
					
						lineStyle(stroke.thickness, 0, 1, stroke.pixelHinting, stroke.scaleMode, stroke.caps, stroke.joints, stroke.miterLimit);
						lineShaderStyle(fill.shader, fill.matrix);
					
					}*/
					
				}
				
			}
		}
		
		/**
		 * Queries a Sprite or Shape object (and optionally, its children) for its vector graphics content. 
		 * @param recurse
		 * @return 
		 * 
		 */		
		public readGraphicsData(recurse:boolean = true):IGraphicsData[]
		{
			/**/ recurse = Boolean(recurse);
			var result:IGraphicsData[] = new Array;
			var path:GraphicsPath;
			var fill:IGraphicsFill;
			var stroke:GraphicsStroke;
			
			for (var i = 0, len = this._commandsSize; i < len; ++i) {
				
				var info = this._commands[i];
				var cmd = info[0];
				var data = info[1];
				
				switch (cmd) {
					
					case Graphics.BEGIN_FILL:
					case Graphics.BEGIN_GRADIENT_FILL:
					case Graphics.BEGIN_BITMAP_FILL:
						
						if (path) {
							
							result.push(path);
							path = null;
							
						}
						
						if (cmd == Graphics.BEGIN_GRADIENT_FILL) {
							
							result.push(new GraphicsGradientFill(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]));
							
						} else if (cmd == Graphics.BEGIN_BITMAP_FILL) {
							
							result.push(new GraphicsBitmapFill(data[0], data[1], data[2], data[3]));
							
						} else {
							
							result.push(new GraphicsSolidFill(data[0], data[1]));
							
						}
						break;
					
					case Graphics.END_FILL:
						
						if (path) {

							result.push(path);
							result.push(new GraphicsEndFill);
							path = null;
							
						}
						break;
					
					case Graphics.LINE_STYLE:
						
						stroke = new GraphicsStroke(data[0], data[3], data[4], data[5], data[6], data[7], new GraphicsSolidFill(data[1], data[2]));
						result.push(stroke);
						break;
					
					case Graphics.LINE_GRADIENT_STYLE:
						
						if (stroke) {
							
							stroke.fill = new GraphicsGradientFill(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
							
						}
						break;
						
					case Graphics.LINE_BITMAP_STYLE:
						
						if (stroke) {
							
							stroke.fill = new GraphicsBitmapFill(data[0], data[1], data[2], data[3]);
							
						}
						break;
					
					case Graphics.MOVE_TO:
						
						path =path || new GraphicsPath;
						path.moveTo(data[0], data[1]);
						break;
					
					case Graphics.LINE_TO:
						
						path =path || new GraphicsPath;
						path.lineTo(data[0], data[1]);
						break;
					
					case Graphics.CURVE_TO:
						
						path =path || new GraphicsPath;
						path.curveTo(data[0], data[1], data[2], data[3]);
						break;
					
					case Graphics.CUBIC_CURVE_TO:
						
						path =path || new GraphicsPath;
						path.cubicCurveTo(data[0], data[1], data[2], data[3], data[4], data[5]);
						break;
					
				}
				
			}
			
			if (path) {
				
				result.push(path);
				result.push(new GraphicsEndFill);
				
			}
			
			return result;
		}
		
		/**
		 * Real bounds. 
		 * @return 
		 * 
		 */		
		/*[internal]*/ protected __getBounds (rect:Rectangle, matrix:Matrix = null):void
		{
			// rect = strict(rect, Rectangle); matrix = strict(matrix, Matrix);
			if (this._dirtyRect) {
				
				if (this._combinedBounds.isEmpty()) {
					
					this._combinedRect.setEmpty();
					
				} else {
					
					this._combinedRect.__setTo(this._combinedBounds.xMin, this._combinedBounds.yMin, Math.abs(this._combinedBounds.width), Math.abs(this._combinedBounds.height));
					
				}
				
				this._dirtyRect = false;
				
			}
			
			var bounds = Rectangle.__pool.get ();
			
			if (matrix) {
				
				this._combinedRect.__transform (bounds, matrix);
				
			} else {
				
				bounds.__copyFrom(this._combinedRect);
				
			}
			
			rect.__expand (bounds.x, bounds.y, bounds.width, bounds.height);
			Rectangle.__pool.release (bounds);
		}
		
		/*[internal]*/ protected __invalidate():void
		{
			this.dirty = true;
			this.__invalidateCache();
		}
		
		/*[internal]*/ protected __invalidateCache():void
		{
			if (this._cache) {
				
				this._cache.dispose();
				this._cache = null;
				
			}
		}
		
		/*[internal]*/ protected __inflateBounds(x:number, y:number):void
		{
			// x = (+(x)); y = (+(y));
			this.__inflateBoundsX(x);
			this.__inflateBoundsY(y);
		}
		
		/*[internal]*/ protected __inflateBoundsX(x:number):void
		{
			// x = (+(x));
			if (this._combinedBounds.xMin == 0x8000000) {
				
				this._combinedBounds.xMin = x - this._topLeftStrokeWidth;
				this._combinedBounds.xMax = x + this._bottomRightStrokeWidth;
				
			} else {
				
				this._combinedBounds.xMin = Math.min(x - this._topLeftStrokeWidth, this._combinedBounds.xMin);
				this._combinedBounds.xMax = Math.max(x + this._bottomRightStrokeWidth, this._combinedBounds.xMax);
				
			}
			
			this._dirtyRect = true;
		}
		
		/*[internal]*/ protected __inflateBoundsY(y:number):void
		{
			// y = (+(y));
			if (this._combinedBounds.yMin == 0x8000000) {
				
				this._combinedBounds.yMin = y - this._topLeftStrokeWidth;
				this._combinedBounds.yMax = y + this._bottomRightStrokeWidth;
				
			} else {
				
				this._combinedBounds.yMin = Math.min(y - this._topLeftStrokeWidth, this._combinedBounds.yMin);
				this._combinedBounds.yMax = Math.max(y + this._bottomRightStrokeWidth, this._combinedBounds.yMax);
				
			}
			
			this._dirtyRect = true;
		}
		
		/*[internal]*/ protected __applyLastCoordinates(x:number, y:number): void
		{
			// x = (+(x)); y = (+(y));
			if (!this._boundsIncludeLastCoordinates) {
				
				this.__inflateBounds(this._lastX, this._lastY);
				
			}
			
			this._boundsIncludeLastCoordinates = true;
			this._lastX = x;
			this._lastY = y;
			this.__inflateBounds(x, y);
		}
		
		/**
		 * Flash special-cases lines that are 1px and 3px wide.
		 * They're offset by 0.5px to the bottom-right.
		 */
		/*[internal]*/ protected __setStrokeWidth(width: number):void
		{
			// width = (+(width));
			switch (width) {
				
				case 1:
					this._topLeftStrokeWidth = 1;
					this._bottomRightStrokeWidth = 1;
					break;
				
				case 3:
					this._topLeftStrokeWidth = 2;
					this._bottomRightStrokeWidth = 2;
					break;
				
				default:
					var half:number = width / 2;
					this._topLeftStrokeWidth = half;
					this._bottomRightStrokeWidth = half;
					
			}
		}
		
		/*[internal]*/ protected __quadraticBezier(from: number, cp: number, to: number, t: number): number
		{
			// from = (+(from)); cp = (+(cp)); to = (+(to)); t = (+(t));
			var inverseT = 1 - t;
			return from * inverseT * inverseT + 2 * cp * inverseT * t + to * t * t;
		}
		
		/*[internal]*/ protected __quadraticBezierExtreme(from: number, cp: number, to: number): number
		{
			// from = (+(from)); cp = (+(cp)); to = (+(to));
			var t = (from - cp) / (from - 2 * cp + to);
			if (t < 0) {
				
				return from;
				
			}
			
			if (t > 1) {
				
				return to;
				
			}
			
			return this.__quadraticBezier(from, cp, to, t);
		}
		
		/*[internal]*/ protected __cubicBezier(from: number, cp: number, cp2: number, to: number, t): number
		{
			// from = (+(from)); cp = (+(cp)); cp2 = (+(cp2)); to = (+(to));
			var tSq = t * t;
			var inverseT = 1 - t;
			var inverseTSq = inverseT * inverseT;
			return from * inverseT * inverseTSq + 3 * cp * t * inverseTSq +
				3 * cp2 * inverseT * tSq + to * t * tSq;
		}
		
		/*[internal]*/ protected __cubicBezierExtremes(from: number, cp: number, cp2: number, to): any[]
		{
			// from = (+(from)); cp = (+(cp)); cp2 = (+(cp2));
			var d1 = cp - from;
			var d2 = cp2 - cp;
			
			// We only ever need d2 * 2
			d2 *= 2;
			var d3 = to - cp2;
			
			// Prevent division by zero by very slightly changing d3 if that would happen
			if (d1 + d3 === d2) {
				
				d3 *= 1.0001;
				
			}
			
			var fHead = 2 * d1 - d2;
			var part1 = d2 - 2 * d1;
			var fCenter = Math.sqrt(part1 * part1 - 4 * d1 * (d1 - d2 + d3));
			var fTail = 2 * (d1 - d2 + d3);
			var t1 = (fHead + fCenter) / fTail;
			var t2 = (fHead - fCenter ) / fTail;
			var result = [];
			
			if (t1 >= 0 && t1 <= 1) {
				
				result.push(Math.round(this.__cubicBezier(from, cp, cp2, to, t1)));
				
			}
			
			if (t2 >= 0 && t2 <= 1) {
				
				result.push(Math.round(this.__cubicBezier(from, cp, cp2, to, t2)));
				
			}
			
			return result;
		}
		
		/*[internal]*/ protected __cmd (command : number, params : any[]):void
		{
			// command = ((command) >>> 0); params = strict(params, Array);
			this._commands[this._commandsSize++] = [ command, params ];
		}
		
		/*[internal]*/ protected __getCache (worldTransform:Matrix):GLCacheDisplayObject
		{
			// worldTransform = strict(worldTransform, Matrix);
			var b = Graphics.sHelperRectangle;
			var m = Graphics.sHelperMatrix;
			
			b.__setTo(0, 0, 0, 0);
			m.__copyFrom(worldTransform, false);
			
			this.__getBounds(b, m);
			if (b.isEmpty()) {
				
				this.__invalidateCache();
				return null;
				
			}
			
			if (this._cache && this._cache.isCacheValid(worldTransform)) {
			
				return this._cache;
				
			}
			
			this.__invalidateCache();
			
			b.__inflateCeil(1, 1); // math fix
			m.__translate(-b.x, -b.y);
			
			var data = new SystemBitmapData(SystemBitmapData.VECTOR, Math.ceil(b.width), Math.ceil(b.height), true, 0x0)
				.__fromGraphics(this, m);
			
			this._cache = new GLCacheDisplayObject(data, worldTransform);
			this._cache.cacheTransform.__translate(b.x, b.y);
			
			return this._cache;
		}
	}
}