/// <reference path="../../../../../base.d.ts" />
/// <reference path="../tags/TagDefineShape.ts" />
/// <reference path="../exporters/AS3GraphicsDataShapeExporter.ts" />
﻿
namespace flash.__native.format.swf.instance
{
	
	export import AS3GraphicsDataShapeExporter = flash.__native.format.swf.exporters.AS3GraphicsDataShapeExporter;
	export import TagDefineShape = flash.__native.format.swf.tags.TagDefineShape;
	

	/**
	 * @author pkulikov
	 */
	export  class Shape extends flash.display.Shape
	{
		protected static _exporter : AS3GraphicsDataShapeExporter = 
			asc.sti(Shape,()=>{ Shape._exporter = new AS3GraphicsDataShapeExporter; });
		
		/**
		 * Constructor 
		 * @param data
		 * @param tag
		 * 
		 */		
		constructor (tag : TagDefineShape)
		{
			/**/ tag = strict(tag, TagDefineShape);
			super(); 
			if (!tag) {
				
				return;
				
			}
			
			Shape._exporter.swf = tag.root;
			Shape._exporter.graphics = this.graphics;
			tag.exportShape (Shape._exporter);
		}
	}	
}