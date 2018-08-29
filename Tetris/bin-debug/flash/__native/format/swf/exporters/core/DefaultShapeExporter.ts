/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../geom/Matrix.ts" />
/// <reference path="../../../../../display/SpreadMethod.ts" />
/// <reference path="../../../../../display/LineScaleMode.ts" />
/// <reference path="../../../../../display/InterpolationMethod.ts" />
/// <reference path="../../SWFTimelineContainer.ts" />
﻿
namespace flash.__native.format.swf.exporters.core
{
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	export import InterpolationMethod = flash.display.InterpolationMethod;
	export import LineScaleMode = flash.display.LineScaleMode;
	export import SpreadMethod = flash.display.SpreadMethod;
	export import Matrix = flash.geom.Matrix;
	
	
	export  class DefaultShapeExporter implements IShapeExporter
	{
		implements_flash___native_format_swf_exporters_core_IShapeExporter = null;
		public swf : SWFTimelineContainer = null;
		
		constructor(swf : SWFTimelineContainer)
		{
			/**/ swf = strict(swf, SWFTimelineContainer);
			this.swf = swf;
		}
		
		public beginShape () : void {}
		public endShape () : void {}

		public beginFills () : void {}
		public endFills () : void {}

		public beginLines () : void {}
		public endLines (close:boolean) : void {/**/ close = Boolean(close);}
		
		public beginFill (color:number, alpha:number = 1.0) : void {/**/ color = ((color) >>> 0); alpha = (+(alpha));}
		public beginGradientFill (type:string, colors:any[], alphas:any[], ratios:any[], matrix:Matrix = null, spreadMethod:string = SpreadMethod.PAD, interpolationMethod:string = InterpolationMethod.RGB, focalPointRatio:number = 0) : void {/**/ type = as(type, 'String'); colors = strict(colors, Array); alphas = strict(alphas, Array); ratios = strict(ratios, Array); matrix = strict(matrix, Matrix); spreadMethod = as(spreadMethod, 'String'); interpolationMethod = as(interpolationMethod, 'String'); focalPointRatio = (+(focalPointRatio));}
		public beginBitmapFill (bitmapId:number, matrix:Matrix = null, repeat:boolean = true, smooth:boolean = false) : void {/**/ bitmapId = ((bitmapId) >>> 0); matrix = strict(matrix, Matrix); repeat = Boolean(repeat); smooth = Boolean(smooth);}
		public endFill () : void {}
		
		public lineStyle (thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false, scaleMode:string = LineScaleMode.NORMAL, startCaps:string = null, endCaps:string = null, joints:string = null, miterLimit:number = 3) : void {/**/ thickness = (+(thickness)); color = ((color) >>> 0); alpha = (+(alpha)); pixelHinting = Boolean(pixelHinting); scaleMode = as(scaleMode, 'String'); startCaps = as(startCaps, 'String'); endCaps = as(endCaps, 'String'); joints = as(joints, 'String'); miterLimit = (+(miterLimit));}
		public lineGradientStyle (type:string, colors:any[], alphas:any[], ratios:any[], matrix:Matrix = null, spreadMethod:string = SpreadMethod.PAD, interpolationMethod:string = InterpolationMethod.RGB, focalPointRatio:number = 0) : void {/**/ type = as(type, 'String'); colors = strict(colors, Array); alphas = strict(alphas, Array); ratios = strict(ratios, Array); matrix = strict(matrix, Matrix); spreadMethod = as(spreadMethod, 'String'); interpolationMethod = as(interpolationMethod, 'String'); focalPointRatio = (+(focalPointRatio));}

		public moveTo (x:number, y:number) : void {/**/ x = (+(x)); y = (+(y));}
		public lineTo (x:number, y:number) : void {/**/ x = (+(x)); y = (+(y));}
		public curveTo (controlX:number, controlY:number, anchorX:number, anchorY:number) : void {/**/ controlX = (+(controlX)); controlY = (+(controlY)); anchorX = (+(anchorX)); anchorY = (+(anchorY));}
	}

}