/// <reference path="../../../base.d.ts" />
﻿
namespace flash.__native.utils
{
	
	
	
	export  class StringUtils
	{
		public static trim(input:string):string {
			/**/ input = as(input, 'String');
			return StringUtils.ltrim(StringUtils.rtrim(input));
		}

		public static ltrim(input:string):string {
			/**/ input = as(input, 'String');
			if (input != null) {
				var size:number = input.length;
				for(var i:number = 0; i < size; i++) {
					if(input.charCodeAt(i) > 32) {
						return input.substring(i);
					}
				}
			}
			return "";
		}

		public static rtrim(input:string):string {
			/**/ input = as(input, 'String');
			if (input != null) {
				var size:number = input.length;
				for(var i:number = size; i > 0; i--) {
					if(input.charCodeAt(i - 1) > 32) {
						return input.substring(0, i);
					}
				}
			}
			return "";
		}

		public static simpleEscape(input:string):string {
			/**/ input = as(input, 'String');
			input = input.split("\n").join("\\n");
			input = input.split("\r").join("\\r");
			input = input.split("\t").join("\\t");
			input = input.split("\f").join("\\f");
			input = input.split("\b").join("\\b");
			return input;
		}
		
		public static strictEscape(input:string, trim:boolean = true):string {
			/**/ input = as(input, 'String'); trim = Boolean(trim);
			if (input != null && input.length > 0) {
				if (trim) {
					input = StringUtils.trim(input);
				}
				input = encodeURIComponent(input);
				var a:any[] = input.split("");
				for (var i:number = 0; i < a.length; i++) {
					switch(a[i]) {
						case "!": a[i] = "%21"; break;
						case "'": a[i] = "%27"; break;
						case "(": a[i] = "%28"; break;
						case ")": a[i] = "%29"; break;
						case "*": a[i] = "%2A"; break;
						case "-": a[i] = "%2D"; break;
						case ".": a[i] = "%2E"; break;
						case "_": a[i] = "%5F"; break;
						case "~": a[i] = "%7E"; break;
					}
				}
				return a.join("");
			}
			return "";
		}
		
		public static repeat(n:number, str:string = " "):string {
			/**/ n = ((n) >>> 0); str = as(str, 'String');
			return new Array(n + 1).join(str);
		}
		
		
		private static i:number = 0;
		
		private static SIGN_UNDEF:number = 0;
		private static SIGN_POS:number = -1;
		private static SIGN_NEG:number = 1;
		
		public static printf(format:string, ...args):string {
			/**/ format = as(format, 'String');
			var result:string = "";
			var indexValue:number = 0;
			var isIndexed:number = -1;
			var typeLookup:string = "diufFeEgGxXoscpn";
			for(i = 0; StringUtils.i < format.length; StringUtils.i++) {
				var c:string = format.charAt(StringUtils.i);
				if(c == "%") {
					if(++StringUtils.i < format.length) {
						c = format.charAt(StringUtils.i);
						if(c == "%") {
							result += c;
						} else {
							var flagSign:boolean = false;
							var flagLeftAlign:boolean = false;
							var flagAlternate:boolean = false;
							var flagLeftPad:boolean = false;
							var flagZeroPad:boolean = false;
							var width:number = -1;
							var precision:number = -1;
							var type:string = "";
							var value:any;
							var j:number = 0;

							///////////////////////////
							// parse parameter
							///////////////////////////
							var idx:number = StringUtils.getIndex(format);
							if(idx < -1 || idx == 0) {
								trace("ERR parsing index");
								break;
							} else if(idx == -1) {
								if(isIndexed == 1) { trace("ERR: indexed placeholder expected"); break; }
								if(isIndexed == -1) { isIndexed = 0; }
								indexValue++;
							} else {
								if(isIndexed == 0) { trace("ERR: non-indexed placeholder expected"); break; }
								if(isIndexed == -1) { isIndexed = 1; }
								indexValue = idx;
							}
							
							///////////////////////////
							// parse flags
							///////////////////////////
							while((c = format.charAt(StringUtils.i)) == "+" || c == "-" || c == "#" || c == " " || c == "0") {
								switch(c) {
									case "+": flagSign = true; break;
									case "-": flagLeftAlign = true; break;
									case "#": flagAlternate = true; break;
									case " ": flagLeftPad = true; break;
									case "0": flagZeroPad = true; break;
								}
								if(++StringUtils.i == format.length) { break; }
								c = format.charAt(StringUtils.i);
							}
							if(StringUtils.i == format.length) { break; }

							///////////////////////////
							// parse width
							///////////////////////////
							if(c == "*") {
								var widthIndex:number = 0;
								if(++StringUtils.i == format.length) { break; }
								idx = StringUtils.getIndex(format);
								if(idx < -1 || idx == 0) {
									trace("ERR parsing index for width");
									break;
								} else if(idx == -1) {
									if(isIndexed == 1) { trace("ERR: indexed placeholder expected for width"); break; }
									if(isIndexed == -1) { isIndexed = 0; }
									widthIndex =(( indexValue++) >> 0);
								} else {
									if(isIndexed == 0) { trace("ERR: non-indexed placeholder expected for width"); break; }
									if(isIndexed == -1) { isIndexed = 1; }
									widthIndex = idx;
								}
								widthIndex--;
								if(args.length > widthIndex && widthIndex >= 0) {
									width = parseInt(args[widthIndex]);
									if(isNaN(width)) {
										width = -1;
										trace("ERR NaN while parsing width");
										break;
									}
								} else {
									trace("ERR index out of bounds while parsing width");
									break;
								}
								c = format.charAt(StringUtils.i);
							} else {
								var hasWidth:boolean = false;
								while(c >= "0" && c <= "9") {
									if(width == -1) { width = 0; }
									width =(( (width * 10) + ((c) >>> 0)) >> 0);
									if(++StringUtils.i == format.length) { break; }
									c = format.charAt(StringUtils.i);
								}
								if(width != -1 && StringUtils.i == format.length) {
									trace("ERR eof while parsing width");
									break;
								}
							}
							
							///////////////////////////
							// parse precision
							///////////////////////////
							if(c == ".") {
								if(++StringUtils.i == format.length) { break; }
								c = format.charAt(StringUtils.i);
								if(c == "*") {
									var precisionIndex:number = 0;
									if(++StringUtils.i == format.length) { break; }
									idx = StringUtils.getIndex(format);
									if(idx < -1 || idx == 0) {
										trace("ERR parsing index for precision");
										break;
									} else if(idx == -1) {
										if(isIndexed == 1) { trace("ERR: indexed placeholder expected for precision"); break; }
										if(isIndexed == -1) { isIndexed = 0; }
										precisionIndex =(( indexValue++) >> 0);
									} else {
										if(isIndexed == 0) { trace("ERR: non-indexed placeholder expected for precision"); break; }
										if(isIndexed == -1) { isIndexed = 1; }
										precisionIndex = idx;
									}
									precisionIndex--;
									if(args.length > precisionIndex && precisionIndex >= 0) {
										precision = parseInt(args[precisionIndex]);
										if(isNaN(precision)) {
											precision = -1;
											trace("ERR NaN while parsing precision");
											break;
										}
									} else {
										trace("ERR index out of bounds while parsing precision");
										break;
									}
									c = format.charAt(StringUtils.i);
								} else {
									while(c >= "0" && c <= "9") {
										if(precision == -1) { precision = 0; }
										precision =(( (precision * 10) + ((c) >>> 0)) >> 0);
										if(++StringUtils.i == format.length) { break; }
										c = format.charAt(StringUtils.i);
									}
									if(precision != -1 && StringUtils.i == format.length) {
										trace("ERR eof while parsing precision");
										break;
									}
								}
							}
							
							///////////////////////////
							// parse length (ignored)
							///////////////////////////
							switch(c) {
								case "h":
								case "l":
									if(++StringUtils.i == format.length) { trace("ERR eof after length"); break; }
									var c1:string = format.charAt(StringUtils.i);
									if((c == "h" && c1 == "h") || (c == "l" && c1 == "l")) {
										if(++StringUtils.i == format.length) { trace("ERR eof after length"); break; }
										c = format.charAt(StringUtils.i);
									} else {
										c = c1;
									}
									break;
								case "L":
								case "z":
								case "j":
								case "t":
									if(++StringUtils.i == format.length) { trace("ERR eof after length"); break; }
									c = format.charAt(StringUtils.i);
									break;
							}
							
							///////////////////////////
							// parse type
							///////////////////////////
							if(typeLookup.indexOf(c) >= 0) {
								type = c;
							} else {
								trace("ERR unknown type: " + c);
								break;
							}
							
							if(args.length >= indexValue && indexValue > 0) {
								value = args[indexValue - 1];
							} else {
								trace("ERR value index out of bounds (" + indexValue + ")");
								break;
							}

							var valueStr:string;
							var valueFloat:number = NaN;
							var valueInt:number = 0;
							var sign:number = StringUtils.SIGN_UNDEF;
							switch(type) {
								case "s":
									valueStr =as( value.toString(), 'String');
									if(precision != -1) { valueStr = valueStr.substr(0, precision); }
									break;
								case "c":
									valueStr =as( value.toString().getAt(0), 'String');
									break;
								case "d":
								case "i":
									valueInt = ((typeof value == "number") ? ((value) >> 0) : parseInt(value));
									valueStr = Math.abs(valueInt).toString();
									sign = (valueInt < 0) ? StringUtils.SIGN_NEG : StringUtils.SIGN_POS;
									break;
								case "u":
									valueStr = ((typeof value == "number") ? ((value) >>> 0) : ((parseInt(value)) >>> 0)).toString();
									break;
								case "f":
								case "F":
								case "e":
								case "E":
								case "g":
								case "G":
									if(precision == -1) { precision = 6; }
									var exp10:number = Math.pow(10, precision);
									valueFloat = (typeof value == "number") ? (+(value)) : parseFloat(value);
									valueStr =as( (Math.round(Math.abs(valueFloat) * exp10) / exp10).toString(), 'String');
									if(precision > 0) {
										var numZerosToAppend:number = 0;
										var dotPos:number = valueStr.indexOf(".");
										if(dotPos == -1) {
											valueStr += ".";
											numZerosToAppend = precision;
										} else {
											numZerosToAppend =(( precision - (valueStr.length - dotPos - 1)) >> 0);
										}
										for(j = 0; j < numZerosToAppend; j++) {
											valueStr += "0";
										}
									}
									sign = (valueFloat < 0) ? StringUtils.SIGN_NEG : StringUtils.SIGN_POS;
									break;
								case "x":
								case "X":
								case "p":
									valueStr = ((typeof value == "number") ? ((value) >>> 0) : parseInt(value)).toString(16);
									if(type == "X") { valueStr = valueStr.toUpperCase(); }
									break;
								case "o":
									valueStr = ((typeof value == "number") ? ((value) >>> 0) : parseInt(value)).toString(8);
									break;
							}
							
							var hasSign:boolean = ((sign == StringUtils.SIGN_NEG) || flagSign || flagLeftPad);
							if(width > -1) {
								var numFill:number =  ((width - valueStr.length) >> 0);
								if(hasSign) { numFill--; }
								if(numFill > 0) {
									var fillChar:string = (flagZeroPad && !flagLeftAlign) ? "0" : " ";
									if(flagLeftAlign) {
										for(j = 0; j < numFill; j++) {
											valueStr += fillChar;
										}
									} else {
										for(j = 0; j < numFill; j++) {
											valueStr = fillChar + valueStr;
										}
									}
								}
							}
							if(hasSign) {
								if(sign == StringUtils.SIGN_POS) {
									valueStr = (flagLeftPad ? " " : "0") + valueStr;
								} else {
									valueStr = "-" + valueStr;
								}
							}
							
							result += valueStr;

							///////////////////////////
							// debug
							///////////////////////////
							/*
							var d:String = "";
							d += "type:" + type + " ";
							d += "width:" + width + " ";
							d += "precision:" + precision + " ";
							d += "flags:";
							var da:Array = [];
							if(flagSign) { da.push("sign"); }
							if(flagLeftAlign) { da.push("leftalign"); }
							if(flagAlternate) { da.push("alternate"); }
							if(flagLeftPad) { da.push("leftpad"); }
							if(flagZeroPad) { da.push("zeropad"); }
							d += ((da.length == 0) ? "-" : da.toString()) + " ";
							d += "index:" + indexValue + " ";
							d += "value:" + value + " ";
							d += "result:" + valueStr;
							trace(d);
							*/
							
						}
					} else {
						result += c;
					}
				} else {
					result += c;
				}
			}
			return result;
		}
		
		private static getIndex(format:string):number {
			/**/ format = as(format, 'String');
			var result:number = 0;
			var isIndexed:boolean = false;
			var c:string = "";
			var iTmp:number = StringUtils.i;
			while((c = format.charAt(StringUtils.i)) >= "0" && c <= "9") {
				isIndexed = true;
				result =(( (result * 10) + ((c) >>> 0)) >> 0);
				if(++StringUtils.i == format.length) { return -2; }
			}
			if(isIndexed) {
				if(c != "$") {
					StringUtils.i = iTmp;
					return -1;
				}
				if(++StringUtils.i == format.length) { return -2; }
				return result;
			} else {
				return -1;
			}
		}
	}

}