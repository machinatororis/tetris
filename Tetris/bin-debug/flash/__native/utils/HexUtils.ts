/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/ByteArray.ts" />

namespace flash.__native.utils
{
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class HexUtils
	{
		public static useUpperCase:boolean = false; 
		
		private static chars:any[] = null;
	
		public static dumpByteArray(byteArray:ByteArray, startIndex:number = 0, endIndex:number = -1, tab:string = ""):string {
			
			/**/ byteArray = strict(byteArray, ByteArray); startIndex = ((startIndex) >>> 0); endIndex = ((endIndex) >> 0); tab = as(tab, 'String');
			
			var i:number = 0, j:number = 0, len:number =  ((byteArray.length) >> 0);
			var line:string, result:string;
			var byte:number = 0;
			
			if (endIndex == -1) {
				endIndex = len;
			}
			
			if ((startIndex < 0) || (startIndex > len)) {
				throw new RangeError("Start Index Is Out of Bounds");
			}
			
			if ((endIndex < 0) || (endIndex > len) || (endIndex < startIndex)) {
				throw new RangeError("End Index Is Out of Bounds");
			}
			
			j = 1;
			result = line = "";
			
			for (i = startIndex; i < endIndex; i++) {
				
				if (j == 1) {
					line += tab + HexUtils.padLeft(i.toString(16), 8, "0") + "  ";
					HexUtils.chars = [];
				}
				
				byte =(( byteArray.get(i)) >>> 0);
				HexUtils.chars.push(byte);
				line += HexUtils.padLeft(byte.toString(16), 2, "0") + " ";
				
				if ((j % 4) == 0) {
					line += " ";
				}
				
				j++;
				
				if (j == 17) {					
					line += HexUtils.dumpChars();
					result += (line + "\n");
					j = 1;
					line = "";
				}
			}
			
			if (j != 1) {
				line = HexUtils.padRight(line, 61, " ") + " " + HexUtils.dumpChars();
				result += line + "\n";
			}
			
			return HexUtils.useUpperCase ? result.toLocaleUpperCase() : result;
		}
		
		private static dumpChars():string {
			var byte:number = 0;
			var result:string = "";
			while(HexUtils.chars.length) {
				byte =(( HexUtils.chars.shift()) >>> 0);
				if (byte >= 32 && byte <= 126) {	// Only show printable characters
					result += String.fromCharCode(byte);
				}
				else {
					result += ".";
				}
			}
			return result;
		}
		
		private static padLeft(value:string, digits:number, pad:string):string {
			/**/ value = as(value, 'String'); digits = ((digits) >>> 0); pad = as(pad, 'String');
			return new Array(digits - value.length + 1).join(pad) + value;
		}
		
		private static padRight(value:string, digits:number, pad:string):string {
			/**/ value = as(value, 'String'); digits = ((digits) >>> 0); pad = as(pad, 'String');
			return value + (new Array(digits - value.length + 1).join(pad));
		}
		
	}
}