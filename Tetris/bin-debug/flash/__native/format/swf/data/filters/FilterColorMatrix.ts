/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/ColorMatrixFilter.ts" />
/// <reference path="../../../../utils/StringUtils.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import ColorMatrixFilter = flash.filters.ColorMatrixFilter;
	
	
	export  class FilterColorMatrix extends Filter implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ public colorMatrix : number[];
		
		/*[internal]*/ constructor (id : number)
		{
			// id = ((id) >>> 0);
			super (id);
			this.colorMatrix = new Array<number>();
		}
		
		/*[internal]*/ /*override*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			for (var i = 0; i < 20; i++) {
				
				this.colorMatrix[i] = data.readFLOAT();
				
			}
			
			this.filter = new ColorMatrixFilter(this.colorMatrix).__setFixedHash();
		}
		
		/*override*/ public publish (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			for (var i = 0; i < 20; i++) {
				
				data.writeFLOAT(this.colorMatrix[i]);
				
			}
		}
		
		/*override*/ public clone () : IFilter
		{
			var copy : FilterColorMatrix = new FilterColorMatrix(this.id);
			
			for (var i = 0; i < 20; i++) {
				
				copy.colorMatrix[i] = this.colorMatrix[i];
				
			}
			
			copy.filter = this.filter.clone().__setFixedHash();
			return copy;
		}
		
		/*override*/ public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			var si:string = StringUtils.repeat(indent + 2);
			return "[ColorMatrixFilter]" + 
				"\n" + si + "[R] " + this.colorMatrix[0] + ", " + this.colorMatrix[1] + ", " + this.colorMatrix[2] + ", " + this.colorMatrix[3] + ", " + this.colorMatrix[4] +   
				"\n" + si + "[G] " + this.colorMatrix[5] + ", " + this.colorMatrix[6] + ", " + this.colorMatrix[7] + ", " + this.colorMatrix[8] + ", " + this.colorMatrix[9] + 
				"\n" + si + "[B] " + this.colorMatrix[10] + ", " + this.colorMatrix[11] + ", " + this.colorMatrix[12] + ", " + this.colorMatrix[13] + ", " + this.colorMatrix[14] + 
				"\n" + si + "[A] " + this.colorMatrix[15] + ", " + this.colorMatrix[16] + ", " + this.colorMatrix[17] + ", " + this.colorMatrix[18] + ", " + this.colorMatrix[19]; 
		}
	}

}