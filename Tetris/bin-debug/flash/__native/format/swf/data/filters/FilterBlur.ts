/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/BlurFilter.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BlurFilter = flash.filters.BlurFilter;
	
	
	export  class FilterBlur extends Filter implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ public blurX : number;
		/*[internal]*/ public blurY : number;
		/*[internal]*/ public passes : number;
		
		/*[internal]*/ /*override*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			this.blurX = data.readFIXED();
			this.blurY = data.readFIXED();
			this.passes =(( data.readUI8() >> 3) >>> 0);
			
			this.filter = new BlurFilter(this.blurX, this.blurY, this.passes).__setFixedHash();
		}
		
		/*override*/ public publish (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			data.writeFIXED(this.blurX);
			data.writeFIXED(this.blurY);
			data.writeUI8(this.passes << 3);
		}
		
		/*override*/ public clone():IFilter
		{
			var copy : FilterBlur = new FilterBlur (this.id);
			copy.blurX = this.blurX;
			copy.blurY = this.blurY;
			copy.passes = this.passes;
			copy.filter = this.filter.clone().__setFixedHash();
			return copy;
		}
		
		/*override*/ public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			return "[BlurFilter] " +
				"BlurX: " + this.blurX + ", " +
				"BlurY: " + this.blurY + ", " +
				"Passes: " + this.passes;
		}
	}

}