/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../renderer/webgl/WebGLContext2D.ts" />
/// <reference path="../tags/TagDefineMorphShape.ts" />
/// <reference path="../exporters/AS3GraphicsDataShapeExporter.ts" />
/// <reference path="../SWFTimelineContainer.ts" />
﻿
namespace flash.__native.format.swf.instance
{
	export import SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
	export import AS3GraphicsDataShapeExporter = flash.__native.format.swf.exporters.AS3GraphicsDataShapeExporter;
	export import TagDefineMorphShape = flash.__native.format.swf.tags.TagDefineMorphShape;
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	

	/**
	 * @author pkulikov
	 */
	export  class MorphShape extends flash.display.Shape
	{
		protected static _exporter : AS3GraphicsDataShapeExporter = 
			asc.sti(MorphShape,()=>{ MorphShape._exporter = new AS3GraphicsDataShapeExporter; });
		
		protected _tag : TagDefineMorphShape;
		protected _data : SWFTimelineContainer;
		protected _currentRatio : number;
		protected _newRatio : number;
		
		/**
		 * Constructor 
		 * @param data
		 * @param tag
		 * 
		 */		
		constructor (tag : TagDefineMorphShape)
		{
			/**/ tag = strict(tag, TagDefineMorphShape);
			/**/ this._tag === void 0 && (this._tag = null);
			/**/ this._data === void 0 && (this._data = null);
			/**/ this._currentRatio === void 0 && (this._currentRatio = NaN);
			/**/ this._newRatio === void 0 && (this._newRatio = NaN);
			super(); 
			if (!tag) {
				
				return;
				
			}
			
			this._tag = tag;
			this._data =strict( tag.root, SWFTimelineContainer);
		}
		
		/*[internal]*/ /*override*/ protected __predraw (ctx : WebGLContext2D, skipCache : any) : boolean
		{
			// ctx = strict(ctx, WebGLContext2D);
			if (this._stage && this._currentRatio != this._newRatio) {
				
				MorphShape._exporter.swf = this._data;
				MorphShape._exporter.graphics = this.graphics;
				this._tag.exportMorphShape (MorphShape._exporter, this._currentRatio = this._newRatio);
				
			}
			
			return super.__predraw(ctx, skipCache);
		}
	}	
}