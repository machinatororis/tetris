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
                    var SWFGradientRecord = (function () {
                        function SWFGradientRecord(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            this.ratio = 0;
                            this.color = 0;
                            this._level = 0;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        SWFGradientRecord.prototype.parse = function (data, level) {
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this._level = level;
                            this.ratio = data.readUI8();
                            this.color = (level <= 2) ? data.readRGB() : data.readRGBA();
                        };
                        SWFGradientRecord.prototype.publish = function (data, level) {
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.writeUI8(this.ratio);
                            if (level <= 2) {
                                data.writeRGB(this.color);
                            }
                            else {
                                data.writeRGBA(this.color);
                            }
                        };
                        SWFGradientRecord.prototype.clone = function () {
                            var gradientRecord = new SWFGradientRecord();
                            gradientRecord.ratio = this.ratio;
                            gradientRecord.color = this.color;
                            return gradientRecord;
                        };
                        SWFGradientRecord.prototype.toString = function () {
                            return "[" + this.ratio + "," + ((this._level <= 2) ? data_1.ColorUtils.rgbToString(this.color) : data_1.ColorUtils.rgbaToString(this.color)) + "]";
                        };
                        return SWFGradientRecord;
                    }());
                    data_1.SWFGradientRecord = SWFGradientRecord;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFGradientRecord.js.map