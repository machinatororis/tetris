/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/DropShadowFilter.ts" />
/// <reference path="../../utils/ColorUtils.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import DropShadowFilter = flash.filters.DropShadowFilter;
	
	
	export  class FilterDropShadow extends Filter implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ public dropShadowColor : number;
		/*[internal]*/ public blurX : number;
		/*[internal]*/ public blurY : number;
		/*[internal]*/ public angle : number;
		/*[internal]*/ public distance : number;
		/*[internal]*/ public strength : number;
		/*[internal]*/ public innerShadow : boolean;
		/*[internal]*/ public knockout : boolean;
		/*[internal]*/ public hideObject : boolean;
		/*[internal]*/ public compositeSource : boolean;
		/*[internal]*/ public passes : number;
		
		/*[internal]*/ /*override*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			this.dropShadowColor = data.readRGBA();
			this.blurX = data.readFIXED();
			this.blurY = data.readFIXED();
			this.angle = data.readFIXED();
			this.distance = data.readFIXED();
			this.strength = data.readFIXED8();
			var flags:number = data.readUI8();
			this.hideObject = ((flags & 0x160) == 0);
			this.innerShadow = ((flags & 0x80) != 0);
			this.knockout = ((flags & 0x40) != 0);
			this.compositeSource = ((flags & 0x20) != 0);
			this.passes =(( flags & 0x1f) >>> 0);
			
			this.filter = new DropShadowFilter(
				this.distance,
				this.angle * 180 / Math.PI,
				ColorUtils.rgb(this.dropShadowColor),
				ColorUtils.alpha(this.dropShadowColor),
				this.blurX,
				this.blurY,
				this.strength,
				this.passes,
				this.innerShadow,
				this.knockout,
				this.hideObject
			).__setFixedHash();
		}
		
		/*override*/ public publish (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			data.writeRGBA(this.dropShadowColor);
			data.writeFIXED(this.blurX);
			data.writeFIXED(this.blurY);
			data.writeFIXED(this.angle);
			data.writeFIXED(this.distance);
			data.writeFIXED8(this.strength);
			var flags:number =  (((this.passes & 0x1f)) >>> 0);
			if (this.innerShadow) { flags |= 0x80; }
			if (this.knockout) { flags |= 0x40; }
			if (this.compositeSource) { flags |= 0x20; }
			data.writeUI8(flags);
		}
		
		/*override*/ public clone () : IFilter
		{
			var copy : FilterDropShadow = new FilterDropShadow(this.id);
			copy.dropShadowColor = this.dropShadowColor;
			copy.blurX = this.blurX;
			copy.blurY = this.blurY;
			copy.angle = this.angle;
			copy.distance = this.distance;
			copy.strength = this.strength;
			copy.passes = this.passes;
			copy.innerShadow = this.innerShadow;
			copy.knockout = this.knockout;
			copy.compositeSource = this.compositeSource;
			copy.filter = this.filter.clone().__setFixedHash();
			return copy;
		}
		
		/*override*/ public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			var str:string = "[DropShadowFilter] " +
				"DropShadowColor: " + ColorUtils.rgbToString(this.dropShadowColor) + ", " +
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
			if(flags.length > 0) {
				str += ", Flags: " + flags.join(", ");
			}
			return str;
		}
	}

}