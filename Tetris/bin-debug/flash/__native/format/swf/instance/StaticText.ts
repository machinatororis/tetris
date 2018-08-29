/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../display/LineScaleMode.ts" />
/// <reference path="../../../../display/JointStyle.ts" />
/// <reference path="../../../../display/Graphics.ts" />
/// <reference path="../../../../display/CapsStyle.ts" />
/// <reference path="../exporters/core/DefaultShapeExporter.ts" />
/// <reference path="../SWFTimelineContainer.ts" />
/// <reference path="../../../../../base.d.ts" />
/// <reference path="../tags/TagDefineText2.ts" />
/// <reference path="../tags/TagDefineText.ts" />
/// <reference path="../tags/TagDefineFont.ts" />
/// <reference path="../exporters/core/DefaultShapeExporter.ts" />
/// <reference path="../data/SWFTextRecord.ts" />
/// <reference path="../SWFTimelineContainer.ts" />
﻿
namespace flash.__native.format.swf.instance
{
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	export import SWFTextRecord = flash.__native.format.swf.data.SWFTextRecord;
	export import DefaultShapeExporter = flash.__native.format.swf.exporters.core.DefaultShapeExporter;
	export import TagDefineFont = flash.__native.format.swf.tags.TagDefineFont;
	export import TagDefineText = flash.__native.format.swf.tags.TagDefineText;
	export import TagDefineText2 = flash.__native.format.swf.tags.TagDefineText2;
	

	/**
	 * @author pkulikov
	 */
	export  class StaticText extends flash.display.Shape
	{
		/*[internal]*/ protected tag : TagDefineText;
		/*[internal]*/ protected data : SWFTimelineContainer;
		
		/**
		 * Constructor 
		 * @param data
		 * @param tag
		 * 
		 */		
		constructor (tag : TagDefineText)
		{
			/**/ tag = strict(tag, TagDefineText);
			super(); 
			if (!tag) {
				
				return;
				
			}
			
			this.tag = tag;
			this.data =strict( tag.root, SWFTimelineContainer);
			
			var matrix;
			var cacheMatrix;
			var tx = tag.textMatrix.matrix.tx;
			var ty = tag.textMatrix.matrix.ty;
			var color : number = 0x000000;
			var alpha = 1.0;
			
			var __for0 = window.asc.of(tag.records);
			for  (var record of __for0) {
				
				var scale = record.textHeight / 1024;
				
				cacheMatrix = matrix;
				matrix = tag.textMatrix.matrix.clone ();
				matrix.scale (scale, scale);
				
				if (record.hasColor) {
					
					color =(( record.textColor & 0x00FFFFFF) >>> 0);
					
					if (is(tag , TagDefineText2)) {
						
						alpha = (record.textColor & 0xFF) / 0xFF;
						
					}
					
				}
				
				if (cacheMatrix != null && (record.hasColor || record.hasFont) && (!record.hasXOffset && !record.hasYOffset)) {
					
					matrix.tx = cacheMatrix.tx;
					matrix.ty = cacheMatrix.ty;
					
				} else {
					
					matrix.tx = record.hasXOffset ? tx + record.xOffset : tx;
					matrix.ty = record.hasYOffset ? ty + record.yOffset : ty;
					
				}
				
				var font : TagDefineFont =  strict(this.data.getTag (record.fontId), TagDefineFont);
				var len = record.glyphEntries.length;
				for (var i = 0; i < len; ++i) {
					
					this.graphics.lineStyle ();
					this.graphics.beginFill (color, alpha);
					
					this.renderGlyph (font, record.glyphEntries[i].index, matrix.a, matrix.tx, matrix.ty);
					
					this.graphics.endFill ();
					matrix.tx += record.glyphEntries[i].advance;
					
				}
				
			}
		}
		
		private renderGlyph (font:TagDefineFont, character:number, scale:number, offsetX:number, offsetY:number):void
		{
			/**/ font = strict(font, TagDefineFont); character = ((character) >> 0); scale = (+(scale)); offsetX = (+(offsetX)); offsetY = (+(offsetY));
			var handler:DefaultShapeExporter = new InternalExporter (this.data, this.graphics, scale, offsetX, offsetY);
			font.exportFont (handler, character);
		}
	}	

export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	export import DefaultShapeExporter = flash.__native.format.swf.exporters.core.DefaultShapeExporter;
	export import CapsStyle = flash.display.CapsStyle;
	export import Graphics = flash.display.Graphics;
	export import JointStyle = flash.display.JointStyle;
	export import LineScaleMode = flash.display.LineScaleMode;
	

 class InternalExporter extends DefaultShapeExporter
{
	private graphics:Graphics;
	private scale:number;
	private offsetX:number;
	private offsetY:number;
	
	constructor(swf:SWFTimelineContainer, graphics:Graphics, scale:number, offsetX:number, offsetY:number) {
		/**/ swf = strict(swf, SWFTimelineContainer); graphics = strict(graphics, Graphics); scale = (+(scale)); offsetX = (+(offsetX)); offsetY = (+(offsetY));
		/**/ this.graphics === void 0 && (this.graphics = null);
		/**/ this.scale === void 0 && (this.scale = NaN);
		/**/ this.offsetX === void 0 && (this.offsetX = NaN);
		/**/ this.offsetY === void 0 && (this.offsetY = NaN);
		super(swf);
		this.graphics = graphics;
		this.scale = scale;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}
	
	/*override*/ public lineStyle(thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false, scaleMode:string = LineScaleMode.NORMAL, startCaps:string = CapsStyle.ROUND, endCaps:string = CapsStyle.ROUND, joints:string = JointStyle.ROUND, miterLimit:number = 3):void {
		/**/ thickness = (+(thickness)); color = ((color) >>> 0); alpha = (+(alpha)); pixelHinting = Boolean(pixelHinting); scaleMode = as(scaleMode, 'String'); startCaps = as(startCaps, 'String'); endCaps = as(endCaps, 'String'); joints = as(joints, 'String'); miterLimit = (+(miterLimit));
		if (thickness > 0) {
			this.graphics.lineStyle (thickness, color, alpha, pixelHinting, scaleMode, startCaps, joints, miterLimit);
		} else {
			this.graphics.lineStyle ();
		}
	}
	
	/*override*/ public moveTo(x:number, y:number):void {
		/**/ x = (+(x)); y = (+(y));
		this.graphics.moveTo(x * this.scale + this.offsetX, y * this.scale + this.offsetY);
	}
	
	/*override*/ public lineTo(x:number, y:number):void {
		/**/ x = (+(x)); y = (+(y));
		this.graphics.lineTo(x * this.scale + this.offsetX, y * this.scale + this.offsetY);
	}
	
	/*override*/ public curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):void {
		/**/ controlX = (+(controlX)); controlY = (+(controlY)); anchorX = (+(anchorX)); anchorY = (+(anchorY));
		this.graphics.curveTo(controlX * this.scale + this.offsetX, controlY * this.scale + this.offsetY, anchorX * this.scale + this.offsetX, anchorY * this.scale + this.offsetY);
	}
}}