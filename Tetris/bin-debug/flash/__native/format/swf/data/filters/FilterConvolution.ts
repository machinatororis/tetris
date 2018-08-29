/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../filters/ConvolutionFilter.ts" />
/// <reference path="../../../../utils/StringUtils.ts" />
/// <reference path="../../utils/ColorUtils.ts" />
/// <reference path="../../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data.filters
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ColorUtils = flash.__native.format.swf.utils.ColorUtils;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import ConvolutionFilter = flash.filters.ConvolutionFilter;
	
	
	export  class FilterConvolution extends Filter implements IFilter
	{
		implements_flash___native_format_swf_data_filters_IFilter = null;
		/*[internal]*/ public matrixX : number;
		/*[internal]*/ public matrixY : number;
		/*[internal]*/ public divisor : number;
		/*[internal]*/ public bias : number;
		/*[internal]*/ public defaultColor : number;
		/*[internal]*/ public clamp : boolean;
		/*[internal]*/ public preserveAlpha : boolean;
		/*[internal]*/ public matrix : number[];
		
		/*[internal]*/ constructor (id : number)
		{
			// id = ((id) >>> 0);
			super (id);
			this.matrix = new Array;
		}
		
		/*[internal]*/ /*override*/ public parse (data : SWFData) : void
		{
			// data = strict(data, SWFData);
			this.matrixX = data.readUI8();
			this.matrixY = data.readUI8();
			this.divisor = data.readFLOAT();
			this.bias = data.readFLOAT();
			
			var len = this.matrixX * this.matrixY;
			for (var i = 0; i < len; i++) {
				
				this.matrix[i] = data.readFLOAT();
				
			}
			
			this.defaultColor = data.readRGBA();
			var flags : number = data.readUI8();
			this.clamp = ((flags & 0x02) != 0);
			this.preserveAlpha = ((flags & 0x01) != 0);
			
			this.filter = new ConvolutionFilter(
				this.matrixX,
				this.matrixY,
				this.matrix,
				this.divisor,
				this.bias,
				this.preserveAlpha,
				this.clamp,
				ColorUtils.rgb(this.defaultColor),
				ColorUtils.alpha(this.defaultColor)
			).__setFixedHash();
		}
		
		/*override*/ public publish (data : SWFData) : void
		{
			/**/ data = strict(data, SWFData);
			data.writeUI8(this.matrixX);
			data.writeUI8(this.matrixY);
			data.writeFLOAT(this.divisor);
			data.writeFLOAT(this.bias);
			var len:number =  ((this.matrixX * this.matrixY) >>> 0);
			for (var i:number = 0; i < len; i++) {
				data.writeFLOAT(this.matrix[i]);
			}
			data.writeRGBA(this.defaultColor);
			var flags:number = 0;
			if(this.clamp) { flags |= 0x02; }
			if(this.preserveAlpha) { flags |= 0x01; }
			data.writeUI8(flags);
		}
		
		/*override*/ public clone () : IFilter
		{
			var copy : FilterConvolution = new FilterConvolution(this.id);
			copy.matrixX = this.matrixX;
			copy.matrixY = this.matrixY;
			copy.divisor = this.divisor;
			copy.bias = this.bias;
			var len = this.matrixX * this.matrixY;
			for (var i = 0; i < len; i++) {
				
				copy.matrix[i] = this.matrix[i];
				
			}
			
			copy.defaultColor = this.defaultColor;
			copy.clamp = this.clamp;
			copy.preserveAlpha = this.preserveAlpha;
			copy.filter = this.filter.clone().__setFixedHash();
			return copy;
		}
		
		/*override*/ public toString (indent : number = 0) : string
		{
			/**/ indent = ((indent) >>> 0);
			var str:string = "[ConvolutionFilter] " +
				"DefaultColor: " + ColorUtils.rgbToString(this.defaultColor) + ", " +
				"Divisor: " + this.divisor + ", " +
				"Bias: " + this.bias;
			var flags:any[] = [];
			if(this.clamp) { flags.push("Clamp"); }
			if(this.preserveAlpha) { flags.push("PreserveAlpha"); }
			if(flags.length > 0) {
				str += ", Flags: " + flags.join(", ");
			}
			if(this.matrix.length > 0) {
				str += "\n" + StringUtils.repeat(indent + 2) + "Matrix:";
				for(var y:number = 0; y < this.matrixY; y++) {
					str += "\n" + StringUtils.repeat(indent + 4) + "[" + y + "]";
					for(var x:number = 0; x < this.matrixX; x++) {
						str += ((x > 0) ? ", " : " ") + this.matrix[this.matrixX * y + x];
					}
				}
			}
			return str;
		}
	}

}