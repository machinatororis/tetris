/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/GradientBevelFilter.ts" />
/// <reference path="../../../../../filters/BitmapFilterType.ts" />
/// <reference path="../../utils/ColorUtils.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import BitmapFilterType = flash.filters.BitmapFilterType;
	export import GradientBevelFilter = flash.filters.GradientBevelFilter;
	
	
	export  class FilterGradientBevel extends FilterGradientGlow implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ /*override*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			this.numColors = data.readUI8();
			
			for (var i = 0; i < this.numColors; i++) {
				
				this.gradientColors[i] = data.readRGBA();
				
			}
			
			for (var i = 0; i < this.numColors; i++) {
				
				this.gradientRatios[i] = data.readUI8();
				
			}
			
			this.blurX = data.readFIXED();
			this.blurY = data.readFIXED();
			this.angle = data.readFIXED();
			this.distance = data.readFIXED();
			this.strength = data.readFIXED8();
			var flags : number = data.readUI8();
			this.innerShadow = ((flags & 0x80) != 0);
			this.knockout = ((flags & 0x40) != 0);
			this.compositeSource = ((flags & 0x20) != 0);
			this.onTop = ((flags & 0x10) != 0);
			this.passes =(( flags & 0x0f) >>> 0);
			
			var gradientGlowColors = [];
			var gradientGlowAlphas = [];
			var gradientGlowRatios = [];
			
			for (var i = 0; i < this.numColors; i++) {
				
				gradientGlowColors[i] = ColorUtils.rgb(this.gradientColors[i]);
				gradientGlowAlphas[i] = ColorUtils.alpha(this.gradientColors[i]);
				gradientGlowRatios[i] = this.gradientRatios[i];
				
			}
			
			var filterType : string;
			if (this.onTop) {
				
				filterType = BitmapFilterType.FULL;
				
			} else {
				
				filterType = this.innerShadow ? BitmapFilterType.INNER : BitmapFilterType.OUTER;
				
			}
			
			this.filter = new GradientBevelFilter(
				this.distance,
				this.angle,
				gradientGlowColors,
				gradientGlowAlphas,
				gradientGlowRatios,
				this.blurX,
				this.blurY,
				this.strength,
				this.passes,
				filterType,
				this.knockout
			).__setFixedHash();
		}
		
		/*override*/ public clone() : IFilter
		{
			var copy : FilterGradientBevel = new FilterGradientBevel(this.id);
			copy.numColors = this.numColors;
			
			for (var i = 0; i < this.numColors; i++) {
				
				copy.gradientColors[i] = this.gradientColors[i];
				
			}
			
			for (var i = 0; i < this.numColors; i++) {
				
				copy.gradientRatios[i] = this.gradientRatios[i];
				
			}
			
			copy.blurX = this.blurX;
			copy.blurY = this.blurY;
			copy.angle = this.angle;
			copy.distance = this.distance;
			copy.strength = this.strength;
			copy.passes = this.passes;
			copy.innerShadow = this.innerShadow;
			copy.knockout = this.knockout;
			copy.compositeSource = this.compositeSource;
			copy.onTop = this.onTop;
			copy.filter = this.filter.clone().__setFixedHash();
			return this.filter;
		}
		
		/*override*/ protected get filterName():string { return "GradientBevelFilter"; }
	}

}