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
                    var SWFLineStyle = (function () {
                        function SWFLineStyle(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            this.width = 0;
                            this.color = 0;
                            this._level = 0;
                            this.startCapsStyle = data_1.LineCapsStyle.ROUND;
                            this.endCapsStyle = data_1.LineCapsStyle.ROUND;
                            this.jointStyle = data_1.LineJointStyle.ROUND;
                            this.hasFillFlag = false;
                            this.noHScaleFlag = false;
                            this.noVScaleFlag = false;
                            this.pixelHintingFlag = false;
                            this.noClose = false;
                            this.miterLimitFactor = 3;
                            this.fillType = null;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        SWFLineStyle.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this._level = level;
                            this.width = data.readUI16();
                            this.color = (level <= 2) ? data.readRGB() : data.readRGBA();
                        };
                        SWFLineStyle.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.writeUI16(this.width);
                            if (level <= 2) {
                                data.writeRGB(this.color);
                            }
                            else {
                                data.writeRGBA(this.color);
                            }
                        };
                        SWFLineStyle.prototype.clone = function () {
                            var lineStyle = new SWFLineStyle();
                            lineStyle.width = this.width;
                            lineStyle.color = this.color;
                            lineStyle.startCapsStyle = this.startCapsStyle;
                            lineStyle.endCapsStyle = this.endCapsStyle;
                            lineStyle.jointStyle = this.jointStyle;
                            lineStyle.hasFillFlag = this.hasFillFlag;
                            lineStyle.noHScaleFlag = this.noHScaleFlag;
                            lineStyle.noVScaleFlag = this.noVScaleFlag;
                            lineStyle.pixelHintingFlag = this.pixelHintingFlag;
                            lineStyle.noClose = this.noClose;
                            lineStyle.miterLimitFactor = this.miterLimitFactor;
                            if (this.fillType)
                                lineStyle.fillType = this.fillType.clone();
                            return lineStyle;
                        };
                        SWFLineStyle.prototype.toString = function () {
                            return "[SWFLineStyle] Width: " + this.width + " Color: " + ((this._level <= 2) ? data_1.ColorUtils.rgbToString(this.color) : data_1.ColorUtils.rgbaToString(this.color));
                        };
                        return SWFLineStyle;
                    }());
                    data_1.SWFLineStyle = SWFLineStyle;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFLineStyle.js.map