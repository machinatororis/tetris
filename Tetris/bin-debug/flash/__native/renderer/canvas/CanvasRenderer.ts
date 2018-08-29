/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../utils/Dictionary.ts" />
/// <reference path="../../../geom/Rectangle.ts" />
/// <reference path="../../../geom/Point.ts" />
/// <reference path="../../../geom/Matrix.ts" />
/// <reference path="../../../display/JointStyle.ts" />
/// <reference path="../../../display/Graphics.ts" />
/// <reference path="../../../display/GradientType.ts" />
/// <reference path="../../../display/CapsStyle.ts" />
/// <reference path="../../../display/BitmapData.ts" />
/// <reference path="../../utils/CSSColor.ts" />

namespace flash.__native.renderer.canvas
{
	
	export import CSSColor = flash.__native.utils.CSSColor;
	export import BitmapData = flash.display.BitmapData;
	export import CapsStyle = flash.display.CapsStyle;
	export import GradientType = flash.display.GradientType;
	export import Graphics = flash.display.Graphics;
	export import JointStyle = flash.display.JointStyle;
	export import Matrix = flash.geom.Matrix;
	export import Point = flash.geom.Point;
	export import Rectangle = flash.geom.Rectangle;
	export import Dictionary = flash.utils.Dictionary;
	

	/**
	 * 
	 * @author pkulikov
	 * 
	 */	
	export  class CanvasRenderer
	{
		/**
		 * Helpers 
		 */		
		private static _hasFill : any[] = null;
		private static _hasStroke : any[] = null;
		private static _hasStrokeFill : any[] = null;
		private static _hasPathToFill : boolean = false;
		private static _lastX : number = NaN;
		private static _lastY : number = NaN;
		private static _strokeThickness : number = NaN;
		private static _strokeCommands : any[] = [];
		private static _strokeCommandsSize : number = 0;
		private static _strokeCommandsEmptyInfo : any[] = [ -1 ];
		private static _ctx : CanvasRenderingContext2D = null;
		private static _buff : CanvasRenderingContext2D = null;
		private static _canvasWidth : number = 0;
		private static _canvasHeight : number = 0;
		private static _matrix : Matrix = null;
		private static _bounds : Rectangle = asc.sti(CanvasRenderer,()=>{ CanvasRenderer._bounds = new Rectangle; });
		private static _cache : Dictionary = asc.sti(CanvasRenderer,()=>{ CanvasRenderer._cache = new Dictionary; });
		private static _helperMatrix : Matrix = asc.sti(CanvasRenderer,()=>{ CanvasRenderer._helperMatrix = new Matrix; });
		
		/**
		 * Canvas image rendering.
		 */		
		/*[internal]*/ public static renderImage (ctx : CanvasRenderingContext2D, element : HTMLElement, smoothing : boolean = false) : void
		{
			// ctx = strict(ctx, CanvasRenderingContext2D); element = strict(element, HTMLElement); smoothing = Boolean(smoothing);
			ctx.save();
			ctx.imageSmoothingEnabled = ctx.msImageSmoothingEnabled = smoothing;
			ctx.drawImage(element, 0, 0);
			ctx.restore();
		}
		
		/**
		 * Canvas text rendering.
		 */		
		/*[internal]*/ public static renderText (ctx : CanvasRenderingContext2D, text : string, font : string = 'Arial', color : string = 'black', align : string = 'left', baseline : string = 'top', x : number = 0, y : number = 0) : void
		{
			// ctx = strict(ctx, CanvasRenderingContext2D); text = as(text, 'String'); font = as(font, 'String'); color = as(color, 'String'); align = as(align, 'String'); baseline = as(baseline, 'String'); x = (+(x)); y = (+(y));
			ctx.save();
			ctx.font = font;
			ctx.fillStyle = color;
			ctx.textAlign = align;
			ctx.textBaseline = baseline;
			ctx.fillText(text, x, y);
			ctx.restore();
		}
		
		/**
		 * Canvas graphics rendering.
		 */		
		/*[internal]*/ public static renderGraphics (ctx : CanvasRenderingContext2D, graphics : Graphics, matrix : Matrix = null) : void
		{
			// ctx = strict(ctx, CanvasRenderingContext2D); graphics = strict(graphics, Graphics); matrix = strict(matrix, Matrix);
			CanvasRenderer.__setupCtx(ctx, graphics, matrix);
			CanvasRenderer.__playCommands(graphics._commands, graphics._commandsSize);
			CanvasRenderer.__releaseCtx();
		}
		
		/*[internal]*/ private static __playCommands (commands : any, len : number) : void
		{
			// len = ((len) >> 0);
			// commands
			for (var i = 0; i < len; ++i) {
				
				var info = commands[i];
				var cmd = info[0];
				var data = info[1];
				
				// command
				switch (cmd) {
					
					case Graphics.BEGIN_FILL:
					case Graphics.BEGIN_GRADIENT_FILL:
					case Graphics.BEGIN_BITMAP_FILL:
						
						CanvasRenderer.__endFill();
						
						CanvasRenderer._buff.beginPath();
						CanvasRenderer._hasFill =strict( info, Array);
						CanvasRenderer._hasPathToFill = false;
						
						if (cmd == Graphics.BEGIN_GRADIENT_FILL) {
							
							CanvasRenderer.__beginGradientFill(info);
							
						} else if (cmd == Graphics.BEGIN_BITMAP_FILL) {
							
							CanvasRenderer.__beginBitmapFill(info);
							
						} else {
							
							CanvasRenderer.__beginFill(info);
							
						}
						break;
					
					case Graphics.END_FILL:
						
						CanvasRenderer.__endFill();
						CanvasRenderer._hasFill = null;
						break;
					
					case Graphics.LINE_STYLE:
						
						var thickness = data[0];
						CanvasRenderer._hasStroke =strict( !isNaN(thickness) ? info : null, Array);
						
						CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = CanvasRenderer._strokeCommandsEmptyInfo;
						CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
						break;
					
					case Graphics.LINE_GRADIENT_STYLE:
					case Graphics.LINE_BITMAP_STYLE:
						
						CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
						break;
					
					case Graphics.MOVE_TO:
						
						CanvasRenderer.__endFill(false);
						CanvasRenderer._buff.moveTo(CanvasRenderer._lastX =(+( data[0])), CanvasRenderer._lastY =(+( data[1])));
						break;
					
					case Graphics.LINE_TO:
						
						if (CanvasRenderer._hasStroke) {
							
							CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = [ Graphics.MOVE_TO, [ CanvasRenderer._lastX, CanvasRenderer._lastY ] ];
							CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
							
						}
						
						CanvasRenderer._buff.lineTo(CanvasRenderer._lastX =(+( data[0])), CanvasRenderer._lastY =(+( data[1])));
						CanvasRenderer._hasPathToFill = true;
						break;
					
					case Graphics.CURVE_TO:
						
						if (CanvasRenderer._hasStroke) {
							
							CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = [ Graphics.MOVE_TO, [ CanvasRenderer._lastX, CanvasRenderer._lastY ] ];
							CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
							
						}
						
						CanvasRenderer._buff.quadraticCurveTo(data[0], data[1], CanvasRenderer._lastX =(+( data[2])), CanvasRenderer._lastY =(+( data[3])));
						CanvasRenderer._hasPathToFill = true;
						break;
					
					case Graphics.CUBIC_CURVE_TO:
						
						if (CanvasRenderer._hasStroke) {
							
							CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = [ Graphics.MOVE_TO, [ CanvasRenderer._lastX, CanvasRenderer._lastY ] ];
							CanvasRenderer._strokeCommands[CanvasRenderer._strokeCommandsSize++] = info;
							
						}
						
						CanvasRenderer._buff.bezierCurveTo(data[0], data[1], data[2], data[3], CanvasRenderer._lastX =(+( data[4])), CanvasRenderer._lastY =(+( data[5])));
						CanvasRenderer._hasPathToFill = true;
						break;
					
				}
				
			}
			
			CanvasRenderer.__endFill();
			
		}
		
		/*[internal]*/ private static __playStrokeCommands():void
		{
			var toStroke;
			
			// commands
			for (var i = 0, len = CanvasRenderer._strokeCommandsSize; i < len; ++i) {
				
				var info = CanvasRenderer._strokeCommands[i];
				var cmd = info[0];
				var data = info[1];
				
				// command
				switch (cmd) {
					
					case -1:
						
						if (toStroke) {
							
							CanvasRenderer.__endStroke();
							toStroke = false;
							
						}
						
						CanvasRenderer._ctx.beginPath();
						
						break;
					
					case Graphics.LINE_STYLE:
						
						CanvasRenderer.__lineStyle(info);
						CanvasRenderer._hasStrokeFill = null;
						break;
					
					case Graphics.LINE_GRADIENT_STYLE:
						
						CanvasRenderer.__lineGradientStyle(CanvasRenderer._hasStrokeFill =strict( info, Array));
						break;
					
					case Graphics.LINE_BITMAP_STYLE:
						
						CanvasRenderer.__lineBitmapStyle(CanvasRenderer._hasStrokeFill =strict( info, Array));
						break;
					
					case Graphics.MOVE_TO:
						
						if (CanvasRenderer._strokeThickness % 2 != 0) {
							
							CanvasRenderer._ctx.moveTo(CanvasRenderer.__strokePos(data[0]), CanvasRenderer.__strokePos(data[1]));
							
						} else {
							
							CanvasRenderer._ctx.moveTo(data[0], data[1]);
							
						}
						
						break;
					
					case Graphics.LINE_TO:
						
						if (CanvasRenderer._strokeThickness % 2 != 0) {
							
							CanvasRenderer._ctx.lineTo(CanvasRenderer.__strokePos(data[0]), CanvasRenderer.__strokePos(data[1]));
							
						} else {
							
							CanvasRenderer._ctx.lineTo(data[0], data[1]);
							
						}
						
						toStroke = true;
						break;
					
					case Graphics.CURVE_TO:
						
						if (CanvasRenderer._strokeThickness % 2 != 0) {
							
							CanvasRenderer._ctx.quadraticCurveTo(CanvasRenderer.__strokePos(data[0]), CanvasRenderer.__strokePos(data[1]), CanvasRenderer.__strokePos(data[2]), CanvasRenderer.__strokePos(data[3]));
							
						} else {
							
							CanvasRenderer._ctx.quadraticCurveTo(data[0], data[1], data[2], data[3]);
							
						}
						
						toStroke = true;
						break;
					
					case Graphics.CUBIC_CURVE_TO:
						
						if (CanvasRenderer._strokeThickness % 2 != 0) {
							
							CanvasRenderer._ctx.bezierCurveTo(CanvasRenderer.__strokePos(data[0]), CanvasRenderer.__strokePos(data[1]), CanvasRenderer.__strokePos(data[2]), CanvasRenderer.__strokePos(data[3]), CanvasRenderer.__strokePos(data[4]), CanvasRenderer.__strokePos(data[5]));
							
						} else {
							
							CanvasRenderer._ctx.bezierCurveTo(data[0], data[1], data[2], data[3], data[4], data[5]);
							
						}
						
						toStroke = true;
						break;
					
				}
				
			}
			
			if (toStroke) {
				
				CanvasRenderer.__endStroke();
				
			}
			
			CanvasRenderer._ctx.moveTo(CanvasRenderer._lastX, CanvasRenderer._lastY);
			CanvasRenderer._strokeCommandsSize = 0;
		}
		
		/*[internal]*/ private static __strokePos(v:number):number
		{
			// v = (+(v));
			if (v % 2 == 0) {
				
				v -= 0.5;
				
			}
			
			return v;
		}
		
		/*[internal]*/ private static __lineStyle(info:any[]):void
		{
			// info = strict(info, Array);
			var cmd = info[0], data = info[1];
			var thickness = data[0];
			var color = data[1];
			var alpha = data[2];
			var pixelHinting = data[3];
			var scaleMode = data[4];
			var caps = data[5];
			var joints = data[6];
			var miterLimit = data[7];
			
			if (isNaN(CanvasRenderer._strokeThickness =(+( thickness)))) {
				
				return;
				
			}
			
			if (!joints) {
				
				joints = 'round';
				
			} else {
				
				joints = joints.toLowerCase();
				
			}
			
			if (!caps) {
				
				caps = 'round';
				
			} else if (caps == CapsStyle.NONE) {
				
				caps = 'butt';
				
			} else {
				
				caps = caps.toLowerCase();
				
			}
			
			CanvasRenderer._ctx.lineWidth =(+( thickness));
			CanvasRenderer._ctx.lineCap =as( caps, 'String');
			CanvasRenderer._ctx.lineJoin =as( joints, 'String');
			
			if (joints == JointStyle.MITER) {
				
				CanvasRenderer._ctx.miterLimit =(+( miterLimit));
				
			}
			
			CanvasRenderer._ctx.strokeStyle = CSSColor.hexToString(color, alpha);
		}
		
		/*[internal]*/ private static __lineGradientStyle(info:any[]):void
		{
			// info = strict(info, Array);
			CanvasRenderer._ctx.strokeStyle = CanvasRenderer.__createGradientPattern(info[1]);
		}
		
		/*[internal]*/ private static __lineBitmapStyle(info:any[]):void
		{
			// info = strict(info, Array);
			CanvasRenderer._ctx.strokeStyle = CanvasRenderer.__createBitmapPattern(info[1]);
		}
		
		/*[internal]*/ private static __beginFill(info:any[]):void
		{
			// info = strict(info, Array);
			var cmd = info[0], data = info[1];
			var color = data[0];
			var alpha = data[1];
			
			if (alpha < 0.005) {
				
				CanvasRenderer._hasFill = null;
				return;
				
			}
			
			CanvasRenderer._buff.fillStyle = CSSColor.hexToString(color, alpha);
		}
		
		/*[internal]*/ private static __beginGradientFill(info:any[]):void
		{
			// info = strict(info, Array);
			CanvasRenderer._buff.fillStyle = CanvasRenderer.__createGradientPattern(info[1]);
		}
		
		/*[internal]*/ private static __beginBitmapFill(info:any[]):void
		{
			// info = strict(info, Array);
			CanvasRenderer._buff.fillStyle = CanvasRenderer.__createBitmapPattern(info[1]);
		}
		
		/*[internal]*/ private static __createGradientPattern(data:any[]):any
		{
			// data = strict(data, Array);
			var type = data[0];
			var colors = data[1];
			var alphas = data[2];
			var ratios = data[3];
			var matrix = data[4];
			var spreadMethod = data[5];
			var interpolationMethod = data[6];
			var focalPointRatio = data[7];
			
			if (!matrix) {
				
				matrix = data[4] = new Matrix;
				matrix.createGradientBox(CanvasRenderer._bounds.width, CanvasRenderer._bounds.height, 0);
				
			}
			
			var hash = data.toString();
			var gradient = CanvasRenderer._cache.get(hash);
			
			if (!gradient) {
				
				if (type == GradientType.LINEAR) {
					
					var p1 = Point.__pool.get();
					var p2 = Point.__pool.get();
					
					p1.__setTo(-819.2, 0);
					p2.__setTo(819.2, 0);
					
					matrix.__transformPointInPlace(p1);
					matrix.__transformPointInPlace(p2);
					
					CanvasRenderer._cache.set(hash,  gradient = CanvasRenderer._ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y));
					
					Point.__pool.release(p1);
					Point.__pool.release(p2);
					
				} else {
					
					var x = Math.min(matrix.tx, matrix.ty);
					var y = x;
					var r1 = Math.max(x, 1);
					CanvasRenderer._cache.set(hash,  gradient = CanvasRenderer._ctx.createRadialGradient(x, y, 0, x, y, r1));
					
				}
				
				for (var i = 0, len = colors.length; i < len; ++i) {
					
					gradient.addColorStop(ratios[i] / 255, CSSColor.hexToString(colors[i], alphas[i]));
					
				}
			}
			
			return gradient;
		}
		
		/*[internal]*/ private static __createBitmapPattern(data:any[]):any
		{
			// data = strict(data, Array);
			var bitmap = data[0];
			var matrix = data[1];
			var repeat = data[2];
			var smooth = data[3];
			
			var pattern;
			var lib = CanvasRenderer._cache.get(bitmap);
			
			if (!lib) {
				
				CanvasRenderer._cache.set(bitmap,  lib = []);
				
			}
			
			for (var i = 0, len = lib.length; i < len; ++i) {
				
				var e = lib[i];
				if (e.repeat == repeat && e.smooth == smooth) {
					
					pattern = e.pattern;
					break;
					
				}
				
			}
			
			if (!pattern) {
				
				lib.push({
					repeat: repeat,
					smooth: smooth,
					pattern: pattern = bitmap.__createPattern(CanvasRenderer._ctx, repeat)
				});
				
			}
			
			return pattern;
		}
		
		/*[internal]*/ private static __endFill (finish : boolean = true) : void
		{
			
			// finish = Boolean(finish);
			
			if (!CanvasRenderer._hasFill || !CanvasRenderer._hasPathToFill) {
				
				CanvasRenderer._hasPathToFill = false;
				
				if (finish) {
					
					CanvasRenderer.__playStrokeCommands();
					
				}
				return;
				
			}
			
			var cmd = CanvasRenderer._hasFill[0];
			var data = CanvasRenderer._hasFill[1];
			
			var m;
			var smooth;
			if (cmd == Graphics.BEGIN_BITMAP_FILL) {
				
				m = data[1];
				smooth = data[3];
				
			}
			
			if (cmd == Graphics.BEGIN_GRADIENT_FILL) {
				
				m = data[4];
				
				var sx = 1, sy = 1;
				if (data[0] == GradientType.RADIAL) {
					
					if (m.tx > m.ty) {
						
						sx = Math.max(m.tx, m.ty) / Math.min(m.tx, m.ty);
						
					} else {
						
						sy = Math.max(m.tx, m.ty) / Math.min(m.tx, m.ty);
						
					}
					
				}
				
				CanvasRenderer._helperMatrix.identity();
				CanvasRenderer._helperMatrix.__scale(sx, sy);
				m = CanvasRenderer._helperMatrix;
				
			}
			
			var savedCtx;
			if (m || smooth != undefined) {
				
				(savedCtx = CanvasRenderer._buff).save();
				
				if (smooth != undefined) {
					
					CanvasRenderer._buff.imageSmoothingEnabled = CanvasRenderer._buff.msImageSmoothingEnabled =Boolean( smooth);
					
				}
				
				if (m) {
					
					CanvasRenderer._buff.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
					
				}
				
			}
			
			CanvasRenderer._buff.fill();
			
			if (finish) {
				
				if (CanvasRenderer._matrix) {

					CanvasRenderer._ctx.save();
					CanvasRenderer._ctx.setTransform(1, 0, 0, 1, 0, 0);
					
					CanvasRenderer._buff.save();
					CanvasRenderer._buff.setTransform(1, 0, 0, 1, 0, 0);
					
				}
				
				// NOTICE: can be optimized by clip (min / max)
				CanvasRenderer._ctx.drawImage(CanvasRenderer._buff.canvas, 0, 0);
				
				// clear buff
				CanvasRenderer._buff.clearRect(0, 0, CanvasRenderer._canvasWidth, CanvasRenderer._canvasHeight);
				
				if (CanvasRenderer._matrix) {
					
					CanvasRenderer._ctx.restore();
					CanvasRenderer._buff.restore();
					
				}
				
			} else {
				
				CanvasRenderer._buff.beginPath();
				
			}
			
			if (savedCtx) {
				
				savedCtx.restore();
				
			}
			
			CanvasRenderer._hasPathToFill = false;
			
			if (finish) {
				
				CanvasRenderer.__playStrokeCommands();
				
			}
		}
		
		/*[internal]*/ private static __endStroke():void
		{
			if (!CanvasRenderer._hasStrokeFill) {
				
				CanvasRenderer._ctx.stroke();
				return;
				
			}
			
			var cmd = CanvasRenderer._hasStrokeFill[0];
			var data = CanvasRenderer._hasStrokeFill[1];
			
			var m;
			var smooth;
			if (cmd == Graphics.LINE_BITMAP_STYLE) {
				
				//m = data[1];
				smooth = data[3];
				
			}
			
			if (cmd == Graphics.LINE_GRADIENT_STYLE) {
				
				/*m = data[4];
				
				var sx = 1, sy = 1;
				if (data[0] == GradientType.RADIAL) {
					
					if (m.tx > m.ty) {
						
						sx = Math.max(m.tx, m.ty) / Math.min(m.tx, m.ty);
						
					} else {
						
						sy = Math.max(m.tx, m.ty) / Math.min(m.tx, m.ty);
						
					}
					
				}
				
				_helperMatrix.identity();
				_helperMatrix.__scale(sx, sy);
				m = _helperMatrix;*/
				
			}
			
			var savedCtx;
			if (m || smooth != undefined) {
				
				(savedCtx = CanvasRenderer._ctx).save();
				
				if (smooth != undefined) {
					
					CanvasRenderer._ctx.imageSmoothingEnabled = CanvasRenderer._ctx.msImageSmoothingEnabled =Boolean( smooth);
					
				}
				
				if (m) {
					
					CanvasRenderer._ctx.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
					
				}
				
			}
			
			CanvasRenderer._ctx.stroke();
			
			if (savedCtx) {
				
				savedCtx.restore();
				
			}
		}
		
		/*[internal]*/ private static __setupCtx (ctx:CanvasRenderingContext2D, graphics:Graphics, matrix:Matrix = null):void
		{
			// ctx = strict(ctx, CanvasRenderingContext2D); graphics = strict(graphics, Graphics); matrix = strict(matrix, Matrix);
			CanvasRenderer._hasPathToFill = false;
			CanvasRenderer._lastX = CanvasRenderer._lastY = 0;
			CanvasRenderer._strokeThickness = NaN;
			CanvasRenderer._strokeCommandsSize = 0;
			
			CanvasRenderer._bounds.setEmpty();
			graphics.__getBounds(CanvasRenderer._bounds, CanvasRenderer._matrix = matrix);
			
			CanvasRenderer._ctx = ctx;
			CanvasRenderer._ctx.save();
			
			CanvasRenderer._canvasWidth =(( CanvasRenderer._ctx.canvas.width) >> 0);
			CanvasRenderer._canvasHeight =(( CanvasRenderer._ctx.canvas.height) >> 0);
			
			CanvasRenderer._buff = BitmapData.__popSystemCtx(CanvasRenderer._canvasWidth, CanvasRenderer._canvasHeight, true);
			CanvasRenderer._buff.save();
			
			if (CanvasRenderer._matrix) {
				
				CanvasRenderer._buff.setTransform(CanvasRenderer._matrix.a, CanvasRenderer._matrix.b, CanvasRenderer._matrix.c, CanvasRenderer._matrix.d, CanvasRenderer._matrix.tx, CanvasRenderer._matrix.ty);
				
			} else {
				
				CanvasRenderer._buff.setTransform(1, 0, 0, 1, 0, 0);
				
			}
			
			CanvasRenderer._buff.globalCompositeOperation = 'xor';
		}
		
		/*[internal]*/ private static __releaseCtx ():void
		{
			if (CanvasRenderer._ctx) {
				
				CanvasRenderer._ctx.restore();
				CanvasRenderer._ctx = null;
				
			}
			
			if (CanvasRenderer._buff) {
				
				CanvasRenderer._buff.restore();
				CanvasRenderer._buff =strict( BitmapData.__pushSystemCtx(CanvasRenderer._buff), CanvasRenderingContext2D);
				CanvasRenderer._buff = null;
				
			}
			
			CanvasRenderer._matrix = null;
			CanvasRenderer._hasFill = null;
			CanvasRenderer._hasStroke = null;
			CanvasRenderer._hasStrokeFill = null;
		}
	}
}