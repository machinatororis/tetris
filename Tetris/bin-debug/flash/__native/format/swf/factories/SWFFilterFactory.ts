/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/filters/IFilter.ts" />
/// <reference path="../data/filters/FilterGradientGlow.ts" />
/// <reference path="../data/filters/FilterGradientBevel.ts" />
/// <reference path="../data/filters/FilterGlow.ts" />
/// <reference path="../data/filters/FilterDropShadow.ts" />
/// <reference path="../data/filters/FilterConvolution.ts" />
/// <reference path="../data/filters/FilterColorMatrix.ts" />
/// <reference path="../data/filters/FilterBlur.ts" />
/// <reference path="../data/filters/FilterBevel.ts" />
﻿
namespace flash.__native.format.swf.factories
{
	
	export import FilterBevel = flash.__native.format.swf.data.filters.FilterBevel;
	export import FilterBlur = flash.__native.format.swf.data.filters.FilterBlur;
	export import FilterColorMatrix = flash.__native.format.swf.data.filters.FilterColorMatrix;
	export import FilterConvolution = flash.__native.format.swf.data.filters.FilterConvolution;
	export import FilterDropShadow = flash.__native.format.swf.data.filters.FilterDropShadow;
	export import FilterGlow = flash.__native.format.swf.data.filters.FilterGlow;
	export import FilterGradientBevel = flash.__native.format.swf.data.filters.FilterGradientBevel;
	export import FilterGradientGlow = flash.__native.format.swf.data.filters.FilterGradientGlow;
	export import IFilter = flash.__native.format.swf.data.filters.IFilter;
	
	
	export  class SWFFilterFactory
	{
		protected static sTypeToClass : any[] = [];
		static __block0 = function () { function $() {
			SWFFilterFactory.sTypeToClass[0] = FilterDropShadow;
			SWFFilterFactory.sTypeToClass[1] = FilterBlur;
			SWFFilterFactory.sTypeToClass[2] = FilterGlow;
			SWFFilterFactory.sTypeToClass[3] = FilterBevel;
			SWFFilterFactory.sTypeToClass[4] = FilterGradientGlow;
			SWFFilterFactory.sTypeToClass[5] = FilterConvolution;
			SWFFilterFactory.sTypeToClass[6] = FilterColorMatrix;
			SWFFilterFactory.sTypeToClass[7] = FilterGradientBevel;
		}asc.stb(SWFFilterFactory,$); }();
		
		/*[internal]*/ public static create (id : number) : IFilter
		{
			// id = ((id) >>> 0);
			var cl = SWFFilterFactory.sTypeToClass[id];
			if (!cl) {
				
				throw new Error("Unknown filter ID: " + id);
				
			}
			
			return new cl (id);
		}
	}

}