/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/Endian.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../../../utils/StringUtils.ts" />
/// <reference path="consts/ActionValueType.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	export import ActionValueType = flash.__native.format.swf.data.consts.ActionValueType;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import ByteArray = flash.utils.ByteArray;
	export import Endian = flash.utils.Endian;
	
	
	export  class SWFActionValue
	{
		public type:number = 0;
		public string:string = null;
		public number:number = NaN;
		public register:number = 0;
		public boolean:boolean = false;
		public integer:number = 0;
		public constant:number = 0;

		private static ba:ByteArray = asc.sti(SWFActionValue,()=>{ SWFActionValue.ba = SWFActionValue.initTmpBuffer(); });

		private static initTmpBuffer():ByteArray {
			var baTmp:ByteArray = new ByteArray();
			baTmp.endian = Endian.LITTLE_ENDIAN;
			baTmp.length = 8;
			return baTmp;
		}

		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			if (data != null) {
				this.parse(data);
			}
		}
		
		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.type = data.readUI8();
			switch (this.type) {
				case ActionValueType.STRING: this.string = data.readString(); break;
				case ActionValueType.FLOAT: this.number = data.readFLOAT(); break;
				case ActionValueType.NULL: break;
				case ActionValueType.UNDEFINED: break;
				case ActionValueType.REGISTER: this.register = data.readUI8(); break;
				case ActionValueType.BOOLEAN: this.boolean = (data.readUI8() != 0); break;
				case ActionValueType.DOUBLE:
					SWFActionValue.ba.position = 0;
					SWFActionValue.ba.set(4,  data.readUI8());
					SWFActionValue.ba.set(5,  data.readUI8());
					SWFActionValue.ba.set(6,  data.readUI8());
					SWFActionValue.ba.set(7,  data.readUI8());
					SWFActionValue.ba.set(0,  data.readUI8());
					SWFActionValue.ba.set(1,  data.readUI8());
					SWFActionValue.ba.set(2,  data.readUI8());
					SWFActionValue.ba.set(3,  data.readUI8());
					this.number = SWFActionValue.ba.readDouble();
					break;
				case ActionValueType.INTEGER: this.integer = data.readUI32(); break;
				case ActionValueType.CONSTANT_8: this.constant = data.readUI8(); break;
				case ActionValueType.CONSTANT_16: this.constant = data.readUI16(); break;
				default:
					throw(new Error("Unknown ActionValueType: " + this.type));
			}
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.writeUI8(this.type);
			switch (this.type) {
				case ActionValueType.STRING: data.writeString(this.string); break;
				case ActionValueType.FLOAT: data.writeFLOAT(this.number); break;
				case ActionValueType.NULL: break;
				case ActionValueType.UNDEFINED: break;
				case ActionValueType.REGISTER: data.writeUI8(this.register); break;
				case ActionValueType.BOOLEAN: data.writeUI8(this.boolean ? 1 : 0); break;
				case ActionValueType.DOUBLE:
					SWFActionValue.ba.position = 0;
					SWFActionValue.ba.writeDouble(this.number);
					data.writeUI8(SWFActionValue.ba.get(4));
					data.writeUI8(SWFActionValue.ba.get(5));
					data.writeUI8(SWFActionValue.ba.get(6));
					data.writeUI8(SWFActionValue.ba.get(7));
					data.writeUI8(SWFActionValue.ba.get(0));
					data.writeUI8(SWFActionValue.ba.get(1));
					data.writeUI8(SWFActionValue.ba.get(2));
					data.writeUI8(SWFActionValue.ba.get(3));
					break;
				case ActionValueType.INTEGER: data.writeUI32(this.integer); break;
				case ActionValueType.CONSTANT_8: data.writeUI8(this.constant); break;
				case ActionValueType.CONSTANT_16: data.writeUI16(this.constant); break;
				default:
					throw(new Error("Unknown ActionValueType: " + this.type));
			}
		}
		
		public clone():SWFActionValue {
			var value:SWFActionValue = new SWFActionValue();
			switch (this.type) {
				case ActionValueType.FLOAT:
				case ActionValueType.DOUBLE:
					value.number = this.number;
					break;
				case ActionValueType.CONSTANT_8:
				case ActionValueType.CONSTANT_16:
					value.constant = this.constant;
					break;
				case ActionValueType.NULL: break;
				case ActionValueType.UNDEFINED: break;
				case ActionValueType.STRING: value.string = this.string; break;
				case ActionValueType.REGISTER: value.register = this.register; break;
				case ActionValueType.BOOLEAN: value.boolean = this.boolean; break;
				case ActionValueType.INTEGER: value.integer = this.integer; break;
				default:
					throw(new Error("Unknown ActionValueType: " + this.type));
			}
			return value;
		}
		
		public toString():string {
			var str:string = "";
			switch (this.type) {
				case ActionValueType.STRING: str = StringUtils.simpleEscape(this.string) + " (string)"; break;
				case ActionValueType.FLOAT: str = this.number + " (float)"; break;
				case ActionValueType.NULL: str = "null";  break;
				case ActionValueType.UNDEFINED: str = "undefined";  break;
				case ActionValueType.REGISTER: str = this.register + " (register)"; break;
				case ActionValueType.BOOLEAN: str = this.boolean + " (boolean)"; break;
				case ActionValueType.DOUBLE: str = this.number + " (double)"; break;
				case ActionValueType.INTEGER: str = this.integer + " (integer)"; break;
				case ActionValueType.CONSTANT_8: str = this.constant + " (constant8)"; break;
				case ActionValueType.CONSTANT_16: str = this.constant + " (constant16)"; break;
				default:
					str = "unknown";
					break;
			}
			return str;
		}
		
		public toBytecodeString(cpool:any[]):string {
			/**/ cpool = strict(cpool, Array);
			var str:string = "";
			switch (this.type) {
				case ActionValueType.STRING: str = "\"" + StringUtils.simpleEscape(this.string) + "\""; break;
				case ActionValueType.FLOAT:
				case ActionValueType.DOUBLE:
					str = this.number.toString();
					if (str.indexOf(".") == -1) {
						str += ".0";
					}
					break;
				case ActionValueType.NULL: str = "null";  break;
				case ActionValueType.UNDEFINED: str = "undefined";  break;
				case ActionValueType.REGISTER: str = "$" + this.register; break;
				case ActionValueType.BOOLEAN: str = this.boolean.toString(); break;
				case ActionValueType.INTEGER: str = this.integer.toString(); break;
				case ActionValueType.CONSTANT_8:
				case ActionValueType.CONSTANT_16:
					str = "\"" + StringUtils.simpleEscape(cpool[this.constant]) + "\"";
					break;
				default:
					str = "UNKNOWN";
					break;
			}
			return str;
		}
	}

}