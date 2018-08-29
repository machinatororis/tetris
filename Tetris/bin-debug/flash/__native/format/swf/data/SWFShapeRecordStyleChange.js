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
                    var SWFShapeRecordStyleChange = (function (_super) {
                        __extends(SWFShapeRecordStyleChange, _super);
                        function SWFShapeRecordStyleChange(data, states, fillBits, lineBits, level) {
                            if (states === void 0) { states = 0; }
                            if (fillBits === void 0) { fillBits = 0; }
                            if (lineBits === void 0) { lineBits = 0; }
                            if (level === void 0) { level = 1; }
                            var _this = this;
                            _this.moveDeltaX === void 0 && (_this.moveDeltaX = 0);
                            _this.moveDeltaY === void 0 && (_this.moveDeltaY = 0);
                            _this.numFillBits === void 0 && (_this.numFillBits = 0);
                            _this.numLineBits === void 0 && (_this.numLineBits = 0);
                            _this._fillStyles = new Array();
                            _this._lineStyles = new Array();
                            _this.stateNewStyles = ((states & 0x10) != 0);
                            _this.stateLineStyle = ((states & 0x08) != 0);
                            _this.stateFillStyle1 = ((states & 0x04) != 0);
                            _this.stateFillStyle0 = ((states & 0x02) != 0);
                            _this.stateMoveTo = ((states & 0x01) != 0);
                            _this.numFillBits = fillBits;
                            _this.numLineBits = lineBits;
                            _this = _super.call(this, data, level) || this;
                            return _this;
                        }
                        Object.defineProperty(SWFShapeRecordStyleChange.prototype, "fillStyles", {
                            get: function () { return this._fillStyles; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFShapeRecordStyleChange.prototype, "lineStyles", {
                            get: function () { return this._lineStyles; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFShapeRecordStyleChange.prototype, "type", {
                            get: function () { return data_1.SWFShapeRecord.TYPE_STYLECHANGE; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFShapeRecordStyleChange.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            if (this.stateMoveTo) {
                                var moveBits = data.readUB(5);
                                this.moveDeltaX = data.readSB(moveBits);
                                this.moveDeltaY = data.readSB(moveBits);
                            }
                            this.fillStyle0 = this.stateFillStyle0 ? data.readUB(this.numFillBits) : 0;
                            this.fillStyle1 = this.stateFillStyle1 ? data.readUB(this.numFillBits) : 0;
                            this.lineStyle = this.stateLineStyle ? data.readUB(this.numLineBits) : 0;
                            if (this.stateNewStyles) {
                                data.resetBitsPending();
                                var i = 0;
                                var fillStylesLen = this.readStyleArrayLength(data, level);
                                for (i = 0; i < fillStylesLen; i++) {
                                    this.fillStyles.push(data.readFILLSTYLE(level));
                                }
                                var lineStylesLen = this.readStyleArrayLength(data, level);
                                for (i = 0; i < lineStylesLen; i++) {
                                    this.lineStyles.push(level <= 3 ? data.readLINESTYLE(level) : data.readLINESTYLE2(level));
                                }
                                data.resetBitsPending();
                                this.numFillBits = data.readUB(4);
                                this.numLineBits = data.readUB(4);
                            }
                        };
                        SWFShapeRecordStyleChange.prototype.publish = function (data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            if (this.stateMoveTo) {
                                var moveBits = data.calculateMaxBits(true, [this.moveDeltaX, this.moveDeltaY]);
                                data.writeUB(5, moveBits);
                                data.writeSB(moveBits, this.moveDeltaX);
                                data.writeSB(moveBits, this.moveDeltaY);
                            }
                            if (this.stateFillStyle0) {
                                data.writeUB(this.numFillBits, this.fillStyle0);
                            }
                            if (this.stateFillStyle1) {
                                data.writeUB(this.numFillBits, this.fillStyle1);
                            }
                            if (this.stateLineStyle) {
                                data.writeUB(this.numLineBits, this.lineStyle);
                            }
                            if (this.stateNewStyles) {
                                data.resetBitsPending();
                                var i = 0;
                                var fillStylesLen = ((this.fillStyles.length) >>> 0);
                                this.writeStyleArrayLength(data, fillStylesLen, level);
                                for (i = 0; i < fillStylesLen; i++) {
                                    this.fillStyles[i].publish(data, level);
                                }
                                var lineStylesLen = ((this.lineStyles.length) >>> 0);
                                this.writeStyleArrayLength(data, lineStylesLen, level);
                                for (i = 0; i < lineStylesLen; i++) {
                                    this.lineStyles[i].publish(data, level);
                                }
                                this.numFillBits = data.calculateMaxBits(false, [fillStylesLen]);
                                this.numLineBits = data.calculateMaxBits(false, [lineStylesLen]);
                                data.resetBitsPending();
                                data.writeUB(4, this.numFillBits);
                                data.writeUB(4, this.numLineBits);
                            }
                        };
                        SWFShapeRecordStyleChange.prototype.readStyleArrayLength = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            var len = data.readUI8();
                            if (level >= 2 && len == 0xff) {
                                len = data.readUI16();
                            }
                            return len;
                        };
                        SWFShapeRecordStyleChange.prototype.writeStyleArrayLength = function (data, length, level) {
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
                        SWFShapeRecordStyleChange.prototype.clone = function () {
                            var record = new SWFShapeRecordStyleChange();
                            record.stateNewStyles = this.stateNewStyles;
                            record.stateLineStyle = this.stateLineStyle;
                            record.stateFillStyle1 = this.stateFillStyle1;
                            record.stateFillStyle0 = this.stateFillStyle0;
                            record.stateMoveTo = this.stateMoveTo;
                            record.moveDeltaX = this.moveDeltaX;
                            record.moveDeltaY = this.moveDeltaY;
                            record.fillStyle0 = this.fillStyle0;
                            record.fillStyle1 = this.fillStyle1;
                            record.lineStyle = this.lineStyle;
                            record.numFillBits = this.numFillBits;
                            record.numLineBits = this.numLineBits;
                            var i = 0;
                            for (i = 0; i < this.fillStyles.length; i++) {
                                record.fillStyles.push(this.fillStyles[i].clone());
                            }
                            for (i = 0; i < this.lineStyles.length; i++) {
                                record.lineStyles.push(this.lineStyles[i].clone());
                            }
                            return record;
                        };
                        SWFShapeRecordStyleChange.prototype.toString = function (indent) {
                            if (indent === void 0) { indent = 0; }
                            indent = ((indent) >>> 0);
                            var str = "[SWFShapeRecordStyleChange] ";
                            var cmds = [];
                            if (this.stateMoveTo) {
                                cmds.push("MoveTo: " + this.moveDeltaX + "," + this.moveDeltaY);
                            }
                            if (this.stateFillStyle0) {
                                cmds.push("FillStyle0: " + this.fillStyle0);
                            }
                            if (this.stateFillStyle1) {
                                cmds.push("FillStyle1: " + this.fillStyle1);
                            }
                            if (this.stateLineStyle) {
                                cmds.push("LineStyle: " + this.lineStyle);
                            }
                            if (cmds.length > 0) {
                                str += cmds.join(", ");
                            }
                            if (this.stateNewStyles) {
                                var i = 0;
                                if (this._fillStyles.length > 0) {
                                    str += "\n" + data_1.StringUtils.repeat(indent + 2) + "New FillStyles:";
                                    for (i = 0; i < this._fillStyles.length; i++) {
                                        str += "\n" + data_1.StringUtils.repeat(indent + 4) + "[" + (i + 1) + "] " + this._fillStyles[i].toString();
                                    }
                                }
                                if (this._lineStyles.length > 0) {
                                    str += "\n" + data_1.StringUtils.repeat(indent + 2) + "New LineStyles:";
                                    for (i = 0; i < this._lineStyles.length; i++) {
                                        str += "\n" + data_1.StringUtils.repeat(indent + 4) + "[" + (i + 1) + "] " + this._lineStyles[i].toString();
                                    }
                                }
                            }
                            return str;
                        };
                        return SWFShapeRecordStyleChange;
                    }(data_1.SWFShapeRecord));
                    data_1.SWFShapeRecordStyleChange = SWFShapeRecordStyleChange;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFShapeRecordStyleChange.js.map