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
                    data_1.MatrixUtils = flash.__native.format.swf.utils.MatrixUtils;
                    var SWFMorphFillStyle = (function () {
                        function SWFMorphFillStyle(data, level) {
                            if (data === void 0) { data = null; }
                            if (level === void 0) { level = 1; }
                            this.type = 0;
                            this.startColor = 0;
                            this.endColor = 0;
                            this.startGradientMatrix = null;
                            this.endGradientMatrix = null;
                            this.gradient = null;
                            this.bitmapId = 0;
                            this.startBitmapMatrix = null;
                            this.endBitmapMatrix = null;
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            if (data != null) {
                                this.parse(data, level);
                            }
                        }
                        SWFMorphFillStyle.prototype.parse = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            this.type = data.readUI8();
                            switch (this.type) {
                                case 0x00:
                                    this.startColor = data.readRGBA();
                                    this.endColor = data.readRGBA();
                                    break;
                                case 0x10:
                                case 0x12:
                                case 0x13:
                                    this.startGradientMatrix = data.readMATRIX();
                                    this.endGradientMatrix = data.readMATRIX();
                                    this.gradient = (this.type == 0x13) ? data.readMORPHFOCALGRADIENT(level) : data.readMORPHGRADIENT(level);
                                    break;
                                case 0x40:
                                case 0x41:
                                case 0x42:
                                case 0x43:
                                    this.bitmapId = data.readUI16();
                                    this.startBitmapMatrix = data.readMATRIX();
                                    this.endBitmapMatrix = data.readMATRIX();
                                    break;
                                default:
                                    throw (new Error("Unknown fill style type: 0x" + this.type.toString(16)));
                            }
                        };
                        SWFMorphFillStyle.prototype.publish = function (data, level) {
                            if (level === void 0) { level = 1; }
                            data = strict(data, data_1.SWFData);
                            level = ((level) >>> 0);
                            data.writeUI8(this.type);
                            switch (this.type) {
                                case 0x00:
                                    data.writeRGBA(this.startColor);
                                    data.writeRGBA(this.endColor);
                                    break;
                                case 0x10:
                                case 0x12:
                                case 0x13:
                                    data.writeMATRIX(this.startGradientMatrix);
                                    data.writeMATRIX(this.endGradientMatrix);
                                    if (this.type == 0x13) {
                                        data.writeMORPHFOCALGRADIENT(strict(this.gradient, data_1.SWFMorphFocalGradient), level);
                                    }
                                    else {
                                        data.writeMORPHGRADIENT(this.gradient, level);
                                    }
                                    break;
                                case 0x40:
                                case 0x41:
                                case 0x42:
                                case 0x43:
                                    data.writeUI16(this.bitmapId);
                                    data.writeMATRIX(this.startBitmapMatrix);
                                    data.writeMATRIX(this.endBitmapMatrix);
                                    break;
                                default:
                                    throw (new Error("Unknown fill style type: 0x" + this.type.toString(16)));
                            }
                        };
                        SWFMorphFillStyle.prototype.getMorphedFillStyle = function (ratio) {
                            if (ratio === void 0) { ratio = 0; }
                            ratio = (+(ratio));
                            var fillStyle = new data_1.SWFFillStyle();
                            fillStyle.type = this.type;
                            switch (this.type) {
                                case 0x00:
                                    fillStyle.rgb = data_1.ColorUtils.interpolate(this.startColor, this.endColor, ratio);
                                    break;
                                case 0x10:
                                case 0x12:
                                    fillStyle.gradientMatrix = data_1.MatrixUtils.interpolate(this.startGradientMatrix, this.endGradientMatrix, ratio);
                                    fillStyle.gradient = this.gradient.getMorphedGradient(ratio);
                                    break;
                                case 0x40:
                                case 0x41:
                                case 0x42:
                                case 0x43:
                                    fillStyle.bitmapId = this.bitmapId;
                                    fillStyle.bitmapMatrix = data_1.MatrixUtils.interpolate(this.startBitmapMatrix, this.endBitmapMatrix, ratio);
                                    break;
                            }
                            return fillStyle;
                        };
                        SWFMorphFillStyle.prototype.toString = function () {
                            var str = "[SWFMorphFillStyle] Type: " + this.type.toString(16);
                            switch (this.type) {
                                case 0x00:
                                    str += " (solid), StartColor: " + data_1.ColorUtils.rgbaToString(this.startColor) + ", EndColor: " + data_1.ColorUtils.rgbaToString(this.endColor);
                                    break;
                                case 0x10:
                                    str += " (linear gradient), Gradient: " + this.gradient;
                                    break;
                                case 0x12:
                                    str += " (radial gradient), Gradient: " + this.gradient;
                                    break;
                                case 0x13:
                                    str += " (focal radial gradient), Gradient: " + this.gradient;
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
                        return SWFMorphFillStyle;
                    }());
                    data_1.SWFMorphFillStyle = SWFMorphFillStyle;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFMorphFillStyle.js.map