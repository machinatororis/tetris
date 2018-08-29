/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/GradientGlowFilter.ts" />
/// <reference path="../../../../../filters/BitmapFilterType.ts" />
/// <reference path="../../../../utils/StringUtils.ts" />
/// <reference path="../../utils/ColorUtils.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import BitmapFilterType = flash.filters.BitmapFilterType;
	export import GradientGlowFilter = flash.filters.GradientGlowFilter;
	
	
	export  class FilterGradientGlow extends Filter implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ public numColors : number;
		/*[internal]*/ public blurX : number;
		/*[internal]*/ public blurY : number;
		/*[internal]*/ public angle : number;
		/*[internal]*/ public distance : number;
		/*[internal]*/ public strength : number;
		/*[internal]*/ public innerShadow : boolean;
		/*[internal]*/ public knockout : boolean;
		/*[internal]*/ public compositeSource : boolean;
		/*[internal]*/ public onTop : boolean;
		/*[internal]*/ public passes : number;
		/*[internal]*/ public gradientColors : number[];
		/*[internal]*/ public gradientRatios : number[];
		
		/*[internal]*/ constructor (id : number)
		{
			// id = ((id) >>> 0);
			super (id);
			this.gradientColors = new Array;
			this.gradientRatios = new Array;
		}
		
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
			
			this.filter = new GradientGlowFilter(
				this.distance,
				this.angle * 180 / Math.PI,
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
		
		/*override*/ public publish (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			data.writeUI8(this.numColors);
			var i:number = 0;
			for (i = 0; i < this.numColors; i++) {
				data.writeRGBA(this.gradientColors[i]);
			}
			for (i = 0; i < this.numColors; i++) {
				data.writeUI8(this.gradientRatios[i]);
			}
			data.writeFIXED(this.blurX);
			data.writeFIXED(this.blurY);
			data.writeFIXED(this.angle);
			data.writeFIXED(this.distance);
			data.writeFIXED8(this.strength);
			var flags:number =  (((this.passes & 0x0f)) >>> 0);
			if (this.innerShadow) { flags |= 0x80; }
			if (this.knockout) { flags |= 0x40; }
			if (this.compositeSource) { flags |= 0x20; }
			if (this.onTop) { flags |= 0x10; }
			data.writeUI8(flags);
		}
		
		/*override*/ public clone() : IFilter
		{
			var copy : FilterGradientGlow = new FilterGradientGlow(this.id);
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
			return copy;
		}
		
		/*override*/ public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			var i:number = 0;
			var len:number = 0;
			var str:string = "[" + this.filterName + "] " +
				"BlurX: " + this.blurX + ", " +
				"BlurY: " + this.blurY + ", " +
				"Angle: " + this.angle + ", " +
				"Distance: " + this.distance + ", " +
				"Strength: " + this.strength + ", " +
				"Passes: " + this.passes;
			var flags:any[] = [];
			if (this.innerShadow) { flags.push("InnerShadow"); }
			if (this.knockout) { flags.push("Knockout"); }
			if (this.compositeSource) { flags.push("CompositeSource"); }
			if (this.onTop) { flags.push("OnTop"); }
			if (flags.length > 0) {
				str += ", Flags: " + flags.join(", ");
			}
			if (this.gradientColors.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "GradientColors:";
				for (i = 0, len = this.gradientColors.length; i < len; i++) {
					str += ((i > 0) ? ", " : " ") + ColorUtils.rgbToString(this.gradientColors[i]);
				}
			}
			if (this.gradientRatios.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "GradientRatios:";
				for (i = 0, len = this.gradientRatios.length; i < len; i++) {
					str += ((i > 0) ? ", " : " ") + this.gradientRatios[i];
				}
			}
			return str;
		}
		
		protected get filterName():string { return "GradientGlowFilter"; }
	}

}