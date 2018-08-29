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
                    var SWFMorphLineStyle = (function () {
                        function SWFMorphLineStyle(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            this.startWidth = 0;
                            this.endWidth = 0;
                            this.startColor = 0;
                            this.endColor = 0;
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
                        SWFMorphLineStyle.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this.startWidth = data.readUI16();
                            this.endWidth = data.readUI16();
                            this.startColor = data.readRGBA();
                            this.endColor = data.readRGBA();
                        };
                        SWFMorphLineStyle.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.writeUI16(this.startWidth);
                            data.writeUI16(this.endWidth);
                            data.writeRGBA(this.startColor);
                            data.writeRGBA(this.endColor);
                        };
                        SWFMorphLineStyle.prototype.getMorphedLineStyle = function (ratio) {
                            if (ratio === void 0) { ratio = 0; }
                            ratio = (+(ratio));
                            var lineStyle = new data_1.SWFLineStyle();
                            if (this.hasFillFlag) {
                                lineStyle.fillType = this.fillType.getMorphedFillStyle(ratio);
                            }
                            else {
                                lineStyle.color = data_1.ColorUtils.interpolate(this.startColor, this.endColor, ratio);
                                lineStyle.width = ((this.startWidth + (this.endWidth - this.startWidth) * ratio) >>> 0);
                            }
                            lineStyle.startCapsStyle = this.startCapsStyle;
                            lineStyle.endCapsStyle = this.endCapsStyle;
                            lineStyle.jointStyle = this.jointStyle;
                            lineStyle.hasFillFlag = this.hasFillFlag;
                            lineStyle.noHScaleFlag = this.noHScaleFlag;
                            lineStyle.noVScaleFlag = this.noVScaleFlag;
                            lineStyle.pixelHintingFlag = this.pixelHintingFlag;
                            lineStyle.noClose = this.noClose;
                            lineStyle.miterLimitFactor = this.miterLimitFactor;
                            return lineStyle;
                        };
                        SWFMorphLineStyle.prototype.toString = function () {
                            return "[SWFMorphLineStyle] " +
                                "StartWidth: " + this.startWidth + ", " +
                                "EndWidth: " + this.endWidth + ", " +
                                "StartColor: " + data_1.ColorUtils.rgbaToString(this.startColor) + ", " +
                                "EndColor: " + data_1.ColorUtils.rgbaToString(this.endColor);
                        };
                        return SWFMorphLineStyle;
                    }());
                    data_1.SWFMorphLineStyle = SWFMorphLineStyle;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFMorphLineStyle.js.map