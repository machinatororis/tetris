/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../geom/Matrix.ts" />
/// <reference path="../../../../display/SpreadMethod.ts" />
/// <reference path="../../../../display/LineScaleMode.ts" />
/// <reference path="../../../../display/JointStyle.ts" />
/// <reference path="../../../../display/InterpolationMethod.ts" />
/// <reference path="../../../../display/Graphics.ts" />
/// <reference path="../../../../display/CapsStyle.ts" />
/// <reference path="../../../../display/BitmapData.ts" />
/// <reference path="core/DefaultShapeExporter.ts" />
/// <reference path="../SWFTimelineContainer.ts" />

namespace flash.__native.format.swf.exporters
{
	
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	export import DefaultShapeExporter = flash.__native.format.swf.exporters.core.DefaultShapeExporter;
	export import BitmapData = flash.display.BitmapData;
	export import CapsStyle = flash.display.CapsStyle;
	export import Graphics = flash.display.Graphics;
	export import InterpolationMethod = flash.display.InterpolationMethod;
	export import JointStyle = flash.display.JointStyle;
	export import LineScaleMode = flash.display.LineScaleMode;
	export import SpreadMethod = flash.display.SpreadMethod;
	export import Matrix = flash.geom.Matrix;
	
	
	export  class AS3GraphicsDataShapeExporter extends DefaultShapeExporter
	{
		public graphics : Graphics;
		
		constructor (swf : SWFTimelineContainer = null, graphics : Graphics = null)
		{
			/**/ swf = strict(swf, SWFTimelineContainer); graphics = strict(graphics, Graphics);
			/**/ this.graphics === void 0 && (this.graphics = null);
			super (swf);
			this.graphics = graphics;
		}
		
		/*override*/ public beginShape () : void
		{
			this.graphics.clear();
		}
		
		/*override*/ public endShape () : void
		{
			// nothing to do
		}
		
		/*override*/ public beginFills () : void
		{
			// nothing to do
		}
		
		/*override*/ public endFills () : void
		{
			// nothing to do
		}
		
		/*override*/ public beginLines () : void
		{
			// nothing to do
		}
		
		/*override*/ public endLines (close : boolean) : void
		{
			/**/ close = Boolean(close);
			this.graphics.lineStyle(NaN);
		}

		/*override*/ public beginFill (color : number, alpha : number = 1.0) : void
		{
			/**/ color = ((color) >>> 0); alpha = (+(alpha));
			this.graphics.beginFill (color, alpha);
		}
		
		/*override*/ public beginGradientFill (type : string, colors : any[], alphas : any[], ratios : any[], matrix : Matrix = null, spreadMethod : string = SpreadMethod.PAD, interpolationMethod : string = InterpolationMethod.RGB, focalPointRatio : number = 0) : void
		{
			/**/ type = as(type, 'String'); colors = strict(colors, Array); alphas = strict(alphas, Array); ratios = strict(ratios, Array); matrix = strict(matrix, Matrix); spreadMethod = as(spreadMethod, 'String'); interpolationMethod = as(interpolationMethod, 'String'); focalPointRatio = (+(focalPointRatio));
			this.graphics.beginGradientFill (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio);
		}

		/*override*/ public beginBitmapFill (bitmapId : number, matrix : Matrix = null, repeat : boolean = true, smooth : boolean = false) : void
		{
			/**/ bitmapId = ((bitmapId) >>> 0); matrix = strict(matrix, Matrix); repeat = Boolean(repeat); smooth = Boolean(smooth);
			var bitmap : BitmapData =  strict(this.swf.getTag(bitmapId).instance, BitmapData);
			this.graphics.beginBitmapFill (bitmap, matrix, repeat, smooth);
		}
		
		/*override*/ public endFill() : void
		{
			this.graphics.endFill ();
		}

		/*override*/ public lineStyle (thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false, scaleMode:string = LineScaleMode.NORMAL, startCaps:string = CapsStyle.ROUND, endCaps:string = CapsStyle.ROUND, joints:string = JointStyle.ROUND, miterLimit:number = 3) : void
		{
			/**/ thickness = (+(thickness)); color = ((color) >>> 0); alpha = (+(alpha)); pixelHinting = Boolean(pixelHinting); scaleMode = as(scaleMode, 'String'); startCaps = as(startCaps, 'String'); endCaps = as(endCaps, 'String'); joints = as(joints, 'String'); miterLimit = (+(miterLimit));
			this.graphics.lineStyle (thickness, color, alpha, pixelHinting, scaleMode, startCaps, joints, miterLimit);
		}
		
		/*override*/ public lineGradientStyle (type:string, colors:any[], alphas:any[], ratios:any[], matrix:Matrix=null, spreadMethod:string=SpreadMethod.PAD, interpolationMethod:string=InterpolationMethod.RGB, focalPointRatio:number=0) : void
		{
			/**/ type = as(type, 'String'); colors = strict(colors, Array); alphas = strict(alphas, Array); ratios = strict(ratios, Array); matrix = strict(matrix, Matrix); spreadMethod = as(spreadMethod, 'String'); interpolationMethod = as(interpolationMethod, 'String'); focalPointRatio = (+(focalPointRatio));
			this.graphics.lineGradientStyle (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio);
		}
		
		/*override*/ public moveTo (x:number, y:number) : void
		{
			/**/ x = (+(x)); y = (+(y));
			this.graphics.moveTo (x, y);
		}
		
		/*override*/ public lineTo (x:number, y:number) : void
		{
			/**/ x = (+(x)); y = (+(y));
			this.graphics.lineTo (x, y);
		}
		
		/*override*/ public curveTo (controlX:number, controlY:number, anchorX:number, anchorY:number) : void
		{
			/**/ controlX = (+(controlX)); controlY = (+(controlY)); anchorX = (+(anchorX)); anchorY = (+(anchorY));
			this.graphics.curveTo (controlX, controlY, anchorX, anchorY);
		}
	}

}