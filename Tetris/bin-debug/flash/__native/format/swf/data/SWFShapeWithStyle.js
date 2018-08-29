var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
                    data_1.StringUtils = flash.__native.utils.StringUtils;
                    var SWFShapeWithStyle = (function (_super) {
                        __extends(SWFShapeWithStyle, _super);
                        function SWFShapeWithStyle() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        SWFShapeWithStyle.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data.resetBitsPending();
                            var i;
                            var fillStylesLen = this.readStyleArrayLength(data, level);
                            for (i = 0; i < fillStylesLen; i++) {
                                this._fillStyles[this._fillStyles.length] = data.readFILLSTYLE(level);
                            }
                            var lineStylesLen = this.readStyleArrayLength(data, level);
                            for (i = 0; i < lineStylesLen; i++) {
                                this._lineStyles[this._lineStyles.length] = level <= 3 ? data.readLINESTYLE(level) : data.readLINESTYLE2(level);
                            }
                            data.resetBitsPending();
                            var numFillBits = data.readUB(4);
                            var numLineBits = data.readUB(4);
                            this.readShapeRecords(data, numFillBits, numLineBits, level);
                        };
                        SWFShapeWithStyle.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.resetBitsPending();
                            var i = 0;
                            var fillStylesLen = ((this._fillStyles.length) >>> 0);
                            this.writeStyleArrayLength(data, fillStylesLen, level);
                            for (i = 0; i < fillStylesLen; i++) {
                                this._fillStyles[i].publish(data, level);
                            }
                            var lineStylesLen = ((this._lineStyles.length) >>> 0);
                            this.writeStyleArrayLength(data, lineStylesLen, level);
                            for (i = 0; i < lineStylesLen; i++) {
                                this._lineStyles[i].publish(data, level);
                            }
                            var fillBits = data.calculateMaxBits(false, [this.getMaxFillStyleIndex()]);
                            var lineBits = data.calculateMaxBits(false, [this.getMaxLineStyleIndex()]);
                            data.resetBitsPending();
                            data.writeUB(4, fillBits);
                            data.writeUB(4, lineBits);
                            this.writeShapeRecords(data, fillBits, lineBits, level);
                        };
                        SWFShapeWithStyle.prototype.readStyleArrayLength = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            var len = data.readUI8();
                            if (level >= 2 && len == 0xff) {
                                len = data.readUI16();
                            }
                            return len;
                        };
                        SWFShapeWithStyle.prototype.writeStyleArrayLength = function (data, length, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            length = ((length) >>> 0);
                            level = ((level) >>> 0);
                            if (level >= 2 && length > 0xfe) {
                                data.writeUI8(0xff);
                                data.writeUI16(length);
                            }
                            else {
                                data.writeUI8(length);
                            }
                        };
                        SWFShapeWithStyle.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var i = 0;
                            var str = "";
                            if (this._fillStyles.length > 0) {
                                str += "\n" + data_1.StringUtils.repeat(indent) + "FillStyles:";
                                for (i = 0; i < this._fillStyles.length; i++) {
                                    str += "\n" + data_1.StringUtils.repeat(indent + 2) + "[" + (i + 1) + "] " + this._fillStyles[i].toString();
                                }
                            }
                            if (this._lineStyles.length > 0) {
                                str += "\n" + data_1.StringUtils.repeat(indent) + "LineStyles:";
                                for (i = 0; i < this._lineStyles.length; i++) {
                                    str += "\n" + data_1.StringUtils.repeat(indent + 2) + "[" + (i + 1) + "] " + this._lineStyles[i].toString();
                                }
                            }
                            return str + _super.prototype.toString.call(this, indent);
                        };
                        return SWFShapeWithStyle;
                    }(data_1.SWFShape));
                    data_1.SWFShapeWithStyle = SWFShapeWithStyle;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFShapeWithStyle.js.map