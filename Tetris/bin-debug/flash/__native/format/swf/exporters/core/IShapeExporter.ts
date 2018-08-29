/// <reference path="../../../../../geom/Matrix.ts" />
﻿
namespace flash.__native.format.swf.exporters.core
{
	
	export import Matrix = flash.geom.Matrix;
	
	
	export  interface IShapeExporter
	{
		beginShape():void;
		endShape():void;
		
		beginFills():void;
		endFills():void;
		
		beginLines():void;
		endLines(close:boolean):void;
		
		beginFill(color:number, alpha:number):void;
		beginGradientFill(type:string, colors:any[], alphas:any[], ratios:any[], matrix:Matrix, spreadMethod:string, interpolationMethod:string, focalPointRatio:number):void;
		beginBitmapFill(bitmapId:number, matrix:Matrix, repeat:boolean, smooth:boolean):void;
		endFill():void;

		lineStyle(thickness:number, color:number, alpha:number, pixelHinting:boolean, scaleMode:string, startCaps:string, endCaps:string, joints:string, miterLimit:number):void;
		lineGradientStyle(type:string, colors:any[], alphas:any[], ratios:any[], matrix:Matrix, spreadMethod:string, interpolationMethod:string, focalPointRatio:number):void;

		moveTo(x:number, y:number):void;
		lineTo(x:number, y:number):void;
		curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):void;
	}

}