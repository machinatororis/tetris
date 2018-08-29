var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var data;
                (function (data_1) {
                    data_1.SWFData = flash.__native.format.swf.SWFData;
                    data_1.ActionValueType = flash.__native.format.swf.data.consts.ActionValueType;
                    data_1.StringUtils = flash.__native.utils.StringUtils;
                    data_1.ByteArray = flash.utils.ByteArray;
                    data_1.Endian = flash.utils.Endian;
                    var SWFActionValue = (function () {
                        function SWFActionValue(data) {
                            if (data === void 0) { data = null; }
                            this.type = 0;
                            this.string = null;
                            this.number = NaN;
                            this.register = 0;
                            this.boolean = false;
                            this.integer = 0;
                            this.constant = 0;
                            data = strict(data, data_1.SWFData);
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFActionValue.initTmpBuffer = function () {
                            var baTmp = new data_1.ByteArray();
                            baTmp.endian = data_1.Endian.LITTLE_ENDIAN;
                            baTmp.length = 8;
                            return baTmp;
                        };
                        SWFActionValue.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            this.type = data.readUI8();
                            switch (this.type) {
                                case data_1.ActionValueType.STRING:
                                    this.string = data.readString();
                                    break;
                                case data_1.ActionValueType.FLOAT:
                                    this.number = data.readFLOAT();
                                    break;
                                case data_1.ActionValueType.NULL: break;
                                case data_1.ActionValueType.UNDEFINED: break;
                                case data_1.ActionValueType.REGISTER:
                                    this.register = data.readUI8();
                                    break;
                                case data_1.ActionValueType.BOOLEAN:
                                    this.boolean = (data.readUI8() != 0);
                                    break;
                                case data_1.ActionValueType.DOUBLE:
                                    SWFActionValue.ba.position = 0;
                                    SWFActionValue.ba.set(4, data.readUI8());
                                    SWFActionValue.ba.set(5, data.readUI8());
                                    SWFActionValue.ba.set(6, data.readUI8());
                                    SWFActionValue.ba.set(7, data.readUI8());
                                    SWFActionValue.ba.set(0, data.readUI8());
                                    SWFActionValue.ba.set(1, data.readUI8());
                                    SWFActionValue.ba.set(2, data.readUI8());
                                    SWFActionValue.ba.set(3, data.readUI8());
                                    this.number = SWFActionValue.ba.readDouble();
                                    break;
                                case data_1.ActionValueType.INTEGER:
                                    this.integer = data.readUI32();
                                    break;
                                case data_1.ActionValueType.CONSTANT_8:
                                    this.constant = data.readUI8();
                                    break;
                                case data_1.ActionValueType.CONSTANT_16:
                                    this.constant = data.readUI16();
                                    break;
                                default:
                                    throw (new Error("Unknown ActionValueType: " + this.type));
                            }
                        };
                        SWFActionValue.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.writeUI8(this.type);
                            switch (this.type) {
                                case data_1.ActionValueType.STRING:
                                    data.writeString(this.string);
                                    break;
                                case data_1.ActionValueType.FLOAT:
                                    data.writeFLOAT(this.number);
                                    break;
                                case data_1.ActionValueType.NULL: break;
                                case data_1.ActionValueType.UNDEFINED: break;
                                case data_1.ActionValueType.REGISTER:
                                    data.writeUI8(this.register);
                                    break;
                                case data_1.ActionValueType.BOOLEAN:
                                    data.writeUI8(this.boolean ? 1 : 0);
                                    break;
                                case data_1.ActionValueType.DOUBLE:
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
                                case data_1.ActionValueType.INTEGER:
                                    data.writeUI32(this.integer);
                                    break;
                                case data_1.ActionValueType.CONSTANT_8:
                                    data.writeUI8(this.constant);
                                    break;
                                case data_1.ActionValueType.CONSTANT_16:
                                    data.writeUI16(this.constant);
                                    break;
                                default:
                                    throw (new Error("Unknown ActionValueType: " + this.type));
                            }
                        };
                        SWFActionValue.prototype.clone = function () {
                            var value = new SWFActionValue();
                            switch (this.type) {
                                case data_1.ActionValueType.FLOAT:
                                case data_1.ActionValueType.DOUBLE:
                                    value.number = this.number;
                                    break;
                                case data_1.ActionValueType.CONSTANT_8:
                                case data_1.ActionValueType.CONSTANT_16:
                                    value.constant = this.constant;
                                    break;
                                case data_1.ActionValueType.NULL: break;
                                case data_1.ActionValueType.UNDEFINED: break;
                                case data_1.ActionValueType.STRING:
                                    value.string = this.string;
                                    break;
                                case data_1.ActionValueType.REGISTER:
                                    value.register = this.register;
                                    break;
                                case data_1.ActionValueType.BOOLEAN:
                                    value.boolean = this.boolean;
                                    break;
                                case data_1.ActionValueType.INTEGER:
                                    value.integer = this.integer;
                                    break;
                                default:
                                    throw (new Error("Unknown ActionValueType: " + this.type));
                            }
                            return value;
                        };
                        SWFActionValue.prototype.toString = function () {
                            var str = "";
                            switch (this.type) {
                                case data_1.ActionValueType.STRING:
                                    str = data_1.StringUtils.simpleEscape(this.string) + " (string)";
                                    break;
                                case data_1.ActionValueType.FLOAT:
                                    str = this.number + " (float)";
                                    break;
                                case data_1.ActionValueType.NULL:
                                    str = "null";
                                    break;
                                case data_1.ActionValueType.UNDEFINED:
                                    str = "undefined";
                                    break;
                                case data_1.ActionValueType.REGISTER:
                                    str = this.register + " (register)";
                                    break;
                                case data_1.ActionValueType.BOOLEAN:
                                    str = this.boolean + " (boolean)";
                                    break;
                                case data_1.ActionValueType.DOUBLE:
                                    str = this.number + " (double)";
                                    break;
                                case data_1.ActionValueType.INTEGER:
                                    str = this.integer + " (integer)";
                                    break;
                                case data_1.ActionValueType.CONSTANT_8:
                                    str = this.constant + " (constant8)";
                                    break;
                                case data_1.ActionValueType.CONSTANT_16:
                                    str = this.constant + " (constant16)";
                                    break;
                                default:
                                    str = "unknown";
                                    break;
                            }
                            return str;
                        };
                        SWFActionValue.prototype.toBytecodeString = function (cpool) {
                            cpool = strict(cpool, Array);
                            var str = "";
                            switch (this.type) {
                                case data_1.ActionValueType.STRING:
                                    str = "\"" + data_1.StringUtils.simpleEscape(this.string) + "\"";
                                    break;
                                case data_1.ActionValueType.FLOAT:
                                case data_1.ActionValueType.DOUBLE:
                                    str = this.number.toString();
                                    if (str.indexOf(".") == -1) {
                                        str += ".0";
                                    }
                                    break;
                                case data_1.ActionValueType.NULL:
                                    str = "null";
                                    break;
                                case data_1.ActionValueType.UNDEFINED:
                                    str = "undefined";
                                    break;
                                case data_1.ActionValueType.REGISTER:
                                    str = "$" + this.register;
                                    break;
                                case data_1.ActionValueType.BOOLEAN:
                                    str = this.boolean.toString();
                                    break;
                                case data_1.ActionValueType.INTEGER:
                                    str = this.integer.toString();
                                    break;
                                case data_1.ActionValueType.CONSTANT_8:
                                case data_1.ActionValueType.CONSTANT_16:
                                    str = "\"" + data_1.StringUtils.simpleEscape(cpool[this.constant]) + "\"";
                                    break;
                                default:
                                    str = "UNKNOWN";
                                    break;
                            }
                            return str;
                        };
                        SWFActionValue.ba = asc.sti(SWFActionValue, function () { SWFActionValue.ba = SWFActionValue.initTmpBuffer(); });
                        return SWFActionValue;
                    }());
                    data_1.SWFActionValue = SWFActionValue;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFActionValue.js.map