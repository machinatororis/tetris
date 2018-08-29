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
                    data_1.ColorUtils = flash.__native.format.swf.utils.ColorUtils;
                    var SWFMorphGradientRecord = (function () {
                        function SWFMorphGradientRecord(data) {
                            if (data === void 0) { data = null; }
                            this.startRatio = 0;
                            this.startColor = 0;
                            this.endRatio = 0;
                            this.endColor = 0;
                            data = strict(data, data_1.SWFData);
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        SWFMorphGradientRecord.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            this.startRatio = data.readUI8();
                            this.startColor = data.readRGBA();
                            this.endRatio = data.readUI8();
                            this.endColor = data.readRGBA();
                        };
                        SWFMorphGradientRecord.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            data.writeUI8(this.startRatio);
                            data.writeRGBA(this.startColor);
                            data.writeUI8(this.endRatio);
                            data.writeRGBA(this.endColor);
                        };
                        SWFMorphGradientRecord.prototype.getMorphedGradientRecord = function (ratio) {
                            if (ratio === void 0) { ratio = 0; }
                            ratio = (+(ratio));
                            var gradientRecord = new data_1.SWFGradientRecord();
                            gradientRecord.color = data_1.ColorUtils.interpolate(this.startColor, this.endColor, ratio);
                            gradientRecord.ratio = ((this.startRatio + (this.endRatio - this.startRatio) * ratio) >>> 0);
                            return gradientRecord;
                        };
                        SWFMorphGradientRecord.prototype.toString = function () {
                            return "[" + this.startRatio + "," + data_1.ColorUtils.rgbaToString(this.startColor) + "," + this.endRatio + "," + data_1.ColorUtils.rgbaToString(this.endColor) + "]";
                        };
                        return SWFMorphGradientRecord;
                    }());
                    data_1.SWFMorphGradientRecord = SWFMorphGradientRecord;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFMorphGradientRecord.js.map