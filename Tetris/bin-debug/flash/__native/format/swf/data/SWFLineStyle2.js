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
                    data_1.LineCapsStyle = flash.__native.format.swf.data.consts.LineCapsStyle;
                    data_1.LineJointStyle = flash.__native.format.swf.data.consts.LineJointStyle;
                    data_1.ColorUtils = flash.__native.format.swf.utils.ColorUtils;
                    var SWFLineStyle2 = (function (_super) {
                        __extends(SWFLineStyle2, _super);
                        function SWFLineStyle2(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            var _this = this;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            _this = _super.call(this, data, level) || this;
                            return _this;
                        }
                        SWFLineStyle2.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this.width = data.readUI16();
                            this.startCapsStyle = data.readUB(2);
                            this.jointStyle = data.readUB(2);
                            this.hasFillFlag = (data.readUB(1) == 1);
                            this.noHScaleFlag = (data.readUB(1) == 1);
                            this.noVScaleFlag = (data.readUB(1) == 1);
                            this.pixelHintingFlag = (data.readUB(1) == 1);
                            data.readUB(5);
                            this.noClose = (data.readUB(1) == 1);
                            this.endCapsStyle = data.readUB(2);
                            if (this.jointStyle == data_1.LineJointStyle.MITER) {
                                this.miterLimitFactor = data.readFIXED8();
                            }
                            if (this.hasFillFlag) {
                                this.fillType = data.readFILLSTYLE(level);
                            }
                            else {
                                this.color = data.readRGBA();
                            }
                        };
                        SWFLineStyle2.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.writeUI16(this.width);
                            data.writeUB(2, this.startCapsStyle);
                            data.writeUB(2, this.jointStyle);
                            data.writeUB(1, this.hasFillFlag ? 1 : 0);
                            data.writeUB(1, this.noHScaleFlag ? 1 : 0);
                            data.writeUB(1, this.noVScaleFlag ? 1 : 0);
                            data.writeUB(1, this.pixelHintingFlag ? 1 : 0);
                            data.writeUB(5, 0);
                            data.writeUB(1, this.noClose ? 1 : 0);
                            data.writeUB(2, this.endCapsStyle);
                            if (this.jointStyle == data_1.LineJointStyle.MITER) {
                                data.writeFIXED8(this.miterLimitFactor);
                            }
                            if (this.hasFillFlag) {
                                data.writeFILLSTYLE(this.fillType, level);
                            }
                            else {
                                data.writeRGBA(this.color);
                            }
                        };
                        SWFLineStyle2.prototype.toString = function () {
                            var str = "[SWFLineStyle2] Width: " + this.width + ", " +
                                "StartCaps: " + data_1.LineCapsStyle.toString(this.startCapsStyle) + ", " +
                                "EndCaps: " + data_1.LineCapsStyle.toString(this.endCapsStyle) + ", " +
                                "Joint: " + data_1.LineJointStyle.toString(this.jointStyle) + ", ";
                            if (this.noClose) {
                                str += "NoClose, ";
                            }
                            if (this.noHScaleFlag) {
                                str += "NoHScale, ";
                            }
                            if (this.noVScaleFlag) {
                                str += "NoVScale, ";
                            }
                            if (this.pixelHintingFlag) {
                                str += "PixelHinting, ";
                            }
                            if (this.hasFillFlag) {
                                str += "Fill: " + this.fillType.toString();
                            }
                            else {
                                str += "Color: " + data_1.ColorUtils.rgbaToString(this.color);
                            }
                            return str;
                        };
                        return SWFLineStyle2;
                    }(data_1.SWFLineStyle));
                    data_1.SWFLineStyle2 = SWFLineStyle2;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFLineStyle2.js.map