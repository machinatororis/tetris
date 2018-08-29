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
                    var filters;
                    (function (filters) {
                        filters.SWFData = flash.__native.format.swf.SWFData;
                        filters.ColorUtils = flash.__native.format.swf.utils.ColorUtils;
                        filters.StringUtils = flash.__native.utils.StringUtils;
                        filters.ConvolutionFilter = flash.filters.ConvolutionFilter;
                        var FilterConvolution = (function (_super) {
                            __extends(FilterConvolution, _super);
                            function FilterConvolution(id) {
                                var _this = _super.call(this, id) || this;
                                _this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                _this.matrix = new Array;
                                return _this;
                            }
                            FilterConvolution.prototype.parse = function (data) {
                                this.matrixX = data.readUI8();
                                this.matrixY = data.readUI8();
                                this.divisor = data.readFLOAT();
                                this.bias = data.readFLOAT();
                                var len = this.matrixX * this.matrixY;
                                for (var i = 0; i < len; i++) {
                                    this.matrix[i] = data.readFLOAT();
                                }
                                this.defaultColor = data.readRGBA();
                                var flags = data.readUI8();
                                this.clamp = ((flags & 0x02) != 0);
                                this.preserveAlpha = ((flags & 0x01) != 0);
                                this.filter = new filters.ConvolutionFilter(this.matrixX, this.matrixY, this.matrix, this.divisor, this.bias, this.preserveAlpha, this.clamp, filters.ColorUtils.rgb(this.defaultColor), filters.ColorUtils.alpha(this.defaultColor)).__setFixedHash();
                            };
                            FilterConvolution.prototype.publish = function (data) {
                                data = strict(data, filters.SWFData);
                                data.writeUI8(this.matrixX);
                                data.writeUI8(this.matrixY);
                                data.writeFLOAT(this.divisor);
                                data.writeFLOAT(this.bias);
                                var len = ((this.matrixX * this.matrixY) >>> 0);
                                for (var i = 0; i < len; i++) {
                                    data.writeFLOAT(this.matrix[i]);
                                }
                                data.writeRGBA(this.defaultColor);
                                var flags = 0;
                                if (this.clamp) {
                                    flags |= 0x02;
                                }
                                if (this.preserveAlpha) {
                                    flags |= 0x01;
                                }
                                data.writeUI8(flags);
                            };
                            FilterConvolution.prototype.clone = function () {
                                var copy = new FilterConvolution(this.id);
                                copy.matrixX = this.matrixX;
                                copy.matrixY = this.matrixY;
                                copy.divisor = this.divisor;
                                copy.bias = this.bias;
                                var len = this.matrixX * this.matrixY;
                                for (var i = 0; i < len; i++) {
                                    copy.matrix[i] = this.matrix[i];
                                }
                                copy.defaultColor = this.defaultColor;
                                copy.clamp = this.clamp;
                                copy.preserveAlpha = this.preserveAlpha;
                                copy.filter = this.filter.clone().__setFixedHash();
                                return copy;
                            };
                            FilterConvolution.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                var str = "[ConvolutionFilter] " +
                                    "DefaultColor: " + filters.ColorUtils.rgbToString(this.defaultColor) + ", " +
                                    "Divisor: " + this.divisor + ", " +
                                    "Bias: " + this.bias;
                                var flags = [];
                                if (this.clamp) {
                                    flags.push("Clamp");
                                }
                                if (this.preserveAlpha) {
                                    flags.push("PreserveAlpha");
                                }
                                if (flags.length > 0) {
                                    str += ", Flags: " + flags.join(", ");
                                }
                                if (this.matrix.length > 0) {
                                    str += "\n" + filters.StringUtils.repeat(indent + 2) + "Matrix:";
                                    for (var y = 0; y < this.matrixY; y++) {
                                        str += "\n" + filters.StringUtils.repeat(indent + 4) + "[" + y + "]";
                                        for (var x = 0; x < this.matrixX; x++) {
                                            str += ((x > 0) ? ", " : " ") + this.matrix[this.matrixX * y + x];
                                        }
                                    }
                                }
                                return str;
                            };
                            return FilterConvolution;
                        }(filters.Filter));
                        filters.FilterConvolution = FilterConvolution;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FilterConvolution.js.map