/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/GlowFilter.ts" />
/// <reference path="../../utils/ColorUtils.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import GlowFilter = flash.filters.GlowFilter;
	
	
	export  class FilterGlow extends Filter implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ public glowColor : number;
		/*[internal]*/ public blurX : number;
		/*[internal]*/ public blurY : number;
		/*[internal]*/ public strength : number;
		/*[internal]*/ public innerGlow : boolean;
		/*[internal]*/ public knockout : boolean;
		/*[internal]*/ public compositeSource : boolean;
		/*[internal]*/ public passes : number;
		
		/*[internal]*/ /*override*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			this.glowColor = data.readRGBA();
			this.blurX = data.readFIXED();
			this.blurY = data.readFIXED();
			this.strength = data.readFIXED8();
			var flags : number = data.readUI8();
			this.innerGlow = ((flags & 0x80) != 0);
			this.knockout = ((flags & 0x40) != 0);
			this.compositeSource = ((flags & 0x20) != 0);
			this.passes =(( flags & 0x1f) >>> 0);
			
			this.filter = new GlowFilter(
				ColorUtils.rgb(this.glowColor),
				ColorUtils.alpha(this.glowColor),
				this.blurX,
				this.blurY,
				this.strength,
				this.passes,
				this.innerGlow,
				this.knockout
			).__setFixedHash();
		}
		
		/*override*/ public publish (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			data.writeRGBA(this.glowColor);
			data.writeFIXED(this.blurX);
			data.writeFIXED(this.blurY);
			data.writeFIXED8(this.strength);
			var flags:number =  (((this.passes & 0x1f)) >>> 0);
			if (this.innerGlow) { flags |= 0x80; }
			if (this.knockout) { flags |= 0x40; }
			if (this.compositeSource) { flags |= 0x20; }
			data.writeUI8(flags);
		}
		
		/*override*/ public clone () : IFilter
		{
			var copy : FilterGlow = new FilterGlow (this.id);
			copy.glowColor = this.glowColor;
			copy.blurX = this.blurX;
			copy.blurY = this.blurY;
			copy.strength = this.strength;
			copy.passes = this.passes;
			copy.innerGlow = this.innerGlow;
			copy.knockout = this.knockout;
			copy.compositeSource = this.compositeSource;
			copy.filter = this.filter.clone().__setFixedHash();
			return copy;
		}
		
		/*override*/ public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			var str:string = "[GlowFilter] " +
				"GlowColor: " + ColorUtils.rgbToString(this.glowColor) + ", " +
				"BlurX: " + this.blurX + ", " +
				"BlurY: " + this.blurY + ", " +
				"Strength: " + this.strength + ", " +
				"Passes: " + this.passes;
			var flags:any[] = [];
			if(this.innerGlow) { flags.push("InnerGlow"); }
			if(this.knockout) { flags.push("Knockout"); }
			if(this.compositeSource) { flags.push("CompositeSource"); }
			if(flags.length > 0) {
				str += ", Flags: " + flags.join(", ");
			}
			return str;
		}
	}

}