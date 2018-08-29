/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/BitmapFilter.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import BitmapFilter = flash.filters.BitmapFilter;
	
	
	export  class Filter implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ public id : number;
		/*[internal]*/ public filter : BitmapFilter;
		
		/*[internal]*/ constructor (id : number)
		{
			// id = ((id) >>> 0);
			this.id = id;
		}

		public parse (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			throw new Error('Need to override');
		}
		
		public publish (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			throw new Error('Need to override');
		}
		
		public clone () : IFilter
		{
			throw new Error('Need to override');
		}
		
		public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			return "[Filter]";
		}
	}

}