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
                    data_1.StringUtils = flash.__native.utils.StringUtils;
                    var SWFFillStyle = (function () {
                        function SWFFillStyle(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            this.type = 0;
                            this.rgb = 0;
                            this.gradient = null;
                            this.gradientMatrix = null;
                            this.bitmapId = 0;
                            this.bitmapMatrix = null;
                            this._level = 0;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        SWFFillStyle.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this._level = level;
                            this.type = data.readUI8();
                            switch (this.type) {
                                case 0x00:
                                    this.rgb = (level <= 2) ? data.readRGB() : data.readRGBA();
                                    break;
                                case 0x10:
                                case 0x12:
                                case 0x13:
                                    this.gradientMatrix = data.readMATRIX();
                                    this.gradient = (this.type == 0x13) ? data.readFOCALGRADIENT(level) : data.readGRADIENT(level);
                                    break;
                                case 0x40:
                                case 0x41:
                                case 0x42:
                                case 0x43:
                                    this.bitmapId = data.readUI16();
                                    this.bitmapMatrix = data.readMATRIX();
                                    break;
                                default:
                                    throw (new Error("Unknown fill style type: 0x" + this.type.toString(16)));
                            }
                        };
                        SWFFillStyle.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.writeUI8(this.type);
                            switch (this.type) {
                                case 0x00:
                                    if (level <= 2) {
                                        data.writeRGB(this.rgb);
                                    }
                                    else {
                                        data.writeRGBA(this.rgb);
                                    }
                                    break;
                                case 0x10:
                                case 0x12:
                                    data.writeMATRIX(this.gradientMatrix);
                                    data.writeGRADIENT(this.gradient, level);
                                    break;
                                case 0x13:
                                    data.writeMATRIX(this.gradientMatrix);
                                    data.writeFOCALGRADIENT(strict(this.gradient, data_1.SWFFocalGradient), level);
                                    break;
                                case 0x40:
                                case 0x41:
                                case 0x42:
                                case 0x43:
                                    data.writeUI16(this.bitmapId);
                                    data.writeMATRIX(this.bitmapMatrix);
                                    break;
                                default:
                                    throw (new Error("Unknown fill style type: 0x" + this.type.toString(16)));
                            }
                        };
                        SWFFillStyle.prototype.clone = function () {
                            var fillStyle = new SWFFillStyle();
                            fillStyle.type = this.type;
                            fillStyle.rgb = this.rgb;
                            fillStyle.bitmapId = this.bitmapId;
                            if (this.gradient)
                                fillStyle.gradient = this.gradient.clone();
                            if (this.gradientMatrix)
                                fillStyle.gradientMatrix = this.gradientMatrix.clone();
                            if (this.bitmapMatrix)
                                fillStyle.bitmapMatrix = this.bitmapMatrix.clone();
                            return fillStyle;
                        };
                        SWFFillStyle.prototype.toString = function () {
                            var str = "[SWFFillStyle] Type: " + data_1.StringUtils.printf("%02x", this.type);
                            switch (this.type) {
                                case 0x00:
                                    str += " (solid), Color: " + ((this._level <= 2) ? data_1.ColorUtils.rgbToString(this.rgb) : data_1.ColorUtils.rgbaToString(this.rgb));
                                    break;
                                case 0x10:
                                    str += " (linear gradient), Gradient: " + this.gradient + ", Matrix: " + this.gradientMatrix;
                                    break;
                                case 0x12:
                                    str += " (radial gradient), Gradient: " + this.gradient + ", Matrix: " + this.gradientMatrix;
                                    break;
                                case 0x13:
                                    str += " (focal radial gradient), Gradient: " + this.gradient + ", Matrix: " + this.gradientMatrix + ", FocalPoint: " + this.gradient.focalPoint;
                                    break;
                                case 0x40:
                                    str += " (repeating bitmap), BitmapID: " + this.bitmapId;
                                    break;
                                case 0x41:
                                    str += " (clipped bitmap), BitmapID: " + this.bitmapId;
                                    break;
                                case 0x42:
                                    str += " (non-smoothed repeating bitmap), BitmapID: " + this.bitmapId;
                                    break;
                                case 0x43:
                                    str += " (non-smoothed clipped bitmap), BitmapID: " + this.bitmapId;
                                    break;
                            }
                            return str;
                        };
                        return SWFFillStyle;
                    }());
                    data_1.SWFFillStyle = SWFFillStyle;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFFillStyle.js.map