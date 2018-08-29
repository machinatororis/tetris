/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/BitmapFilterType.ts" />
/// <reference path="../../../../../filters/BevelFilter.ts" />
/// <reference path="../../utils/ColorUtils.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import BevelFilter = flash.filters.BevelFilter;
	export import BitmapFilterType = flash.filters.BitmapFilterType;
	
	
	export  class FilterBevel extends Filter implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ public shadowColor : number;
		/*[internal]*/ public highlightColor : number;
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
		
		/*[internal]*/ /*override*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			this.shadowColor = data.readRGBA();
			this.highlightColor = data.readRGBA();
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
			
			var filterType : string;
			if (this.onTop) {
				
				filterType = BitmapFilterType.FULL;
				
			} else {
				
				filterType = (this.innerShadow) ? BitmapFilterType.INNER : BitmapFilterType.OUTER;
				
			}
			
			this.filter = new BevelFilter(
				this.distance,
				this.angle * 180 / Math.PI,
				ColorUtils.rgb(this.highlightColor),
				ColorUtils.alpha(this.highlightColor),
				ColorUtils.rgb(this.shadowColor),
				ColorUtils.alpha(this.shadowColor),
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
			data.writeRGBA(this.shadowColor);
			data.writeRGBA(this.highlightColor);
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
		
		/*override*/ public clone () : IFilter
		{
			var copy : FilterBevel = new FilterBevel(this.id);
			copy.shadowColor = this.shadowColor;
			copy.highlightColor = this.highlightColor;
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
			var str:string = "[BevelFilter] " +
				"ShadowColor: " + ColorUtils.rgbToString(this.shadowColor) + ", " +
				"HighlightColor: " + ColorUtils.rgbToString(this.highlightColor) + ", " +
				"BlurX: " + this.blurX + ", " +
				"BlurY: " + this.blurY + ", " +
				"Angle: " + this.angle + ", " +
				"Distance: " + this.distance + ", " +
				"Strength: " + this.strength + ", " +
				"Passes: " + this.passes;
			var flags:any[] = [];
			if(this.innerShadow) { flags.push("InnerShadow"); }
			if(this.knockout) { flags.push("Knockout"); }
			if(this.compositeSource) { flags.push("CompositeSource"); }
			if(this.onTop) { flags.push("OnTop"); }
			if(flags.length > 0) {
				str += ", Flags: " + flags.join(", ");
			}
			return str;
		}
	}

}