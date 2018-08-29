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
                        filters.BitmapFilterType = flash.filters.BitmapFilterType;
                        filters.GradientGlowFilter = flash.filters.GradientGlowFilter;
                        var FilterGradientGlow = (function (_super) {
                            __extends(FilterGradientGlow, _super);
                            function FilterGradientGlow(id) {
                                var _this = _super.call(this, id) || this;
                                _this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                _this.gradientColors = new Array;
                                _this.gradientRatios = new Array;
                                return _this;
                            }
                            FilterGradientGlow.prototype.parse = function (data) {
                                this.numColors = data.readUI8();
                                for (var i = 0; i < this.numColors; i++) {
                                    this.gradientColors[i] = data.readRGBA();
                                }
                                for (var i = 0; i < this.numColors; i++) {
                                    this.gradientRatios[i] = data.readUI8();
                                }
                                this.blurX = data.readFIXED();
                                this.blurY = data.readFIXED();
                                this.angle = data.readFIXED();
                                this.distance = data.readFIXED();
                                this.strength = data.readFIXED8();
                                var flags = data.readUI8();
                                this.innerShadow = ((flags & 0x80) != 0);
                                this.knockout = ((flags & 0x40) != 0);
                                this.compositeSource = ((flags & 0x20) != 0);
                                this.onTop = ((flags & 0x10) != 0);
                                this.passes = ((flags & 0x0f) >>> 0);
                                var gradientGlowColors = [];
                                var gradientGlowAlphas = [];
                                var gradientGlowRatios = [];
                                for (var i = 0; i < this.numColors; i++) {
                                    gradientGlowColors[i] = filters.ColorUtils.rgb(this.gradientColors[i]);
                                    gradientGlowAlphas[i] = filters.ColorUtils.alpha(this.gradientColors[i]);
                                    gradientGlowRatios[i] = this.gradientRatios[i];
                                }
                                var filterType;
                                if (this.onTop) {
                                    filterType = filters.BitmapFilterType.FULL;
                                }
                                else {
                                    filterType = this.innerShadow ? filters.BitmapFilterType.INNER : filters.BitmapFilterType.OUTER;
                                }
                                this.filter = new filters.GradientGlowFilter(this.distance, this.angle * 180 / Math.PI, gradientGlowColors, gradientGlowAlphas, gradientGlowRatios, this.blurX, this.blurY, this.strength, this.passes, filterType, this.knockout).__setFixedHash();
                            };
                            FilterGradientGlow.prototype.publish = function (data) {
                                data = strict(data, filters.SWFData);
                                data.writeUI8(this.numColors);
                                var i = 0;
                                for (i = 0; i < this.numColors; i++) {
                                    data.writeRGBA(this.gradientColors[i]);
                                }
                                for (i = 0; i < this.numColors; i++) {
                                    data.writeUI8(this.gradientRatios[i]);
                                }
                                data.writeFIXED(this.blurX);
                                data.writeFIXED(this.blurY);
                                data.writeFIXED(this.angle);
                                data.writeFIXED(this.distance);
                                data.writeFIXED8(this.strength);
                                var flags = (((this.passes & 0x0f)) >>> 0);
                                if (this.innerShadow) {
                                    flags |= 0x80;
                                }
                                if (this.knockout) {
                                    flags |= 0x40;
                                }
                                if (this.compositeSource) {
                                    flags |= 0x20;
                                }
                                if (this.onTop) {
                                    flags |= 0x10;
                                }
                                data.writeUI8(flags);
                            };
                            FilterGradientGlow.prototype.clone = function () {
                                var copy = new FilterGradientGlow(this.id);
                                copy.numColors = this.numColors;
                                for (var i = 0; i < this.numColors; i++) {
                                    copy.gradientColors[i] = this.gradientColors[i];
                                }
                                for (var i = 0; i < this.numColors; i++) {
                                    copy.gradientRatios[i] = this.gradientRatios[i];
                                }
                                copy.blurX = this.blurX;
                                copy.blurY = this.blurY;
                                copy.angle = this.angle;
                                copy.distance = this.distance;
                                copy.strength = this.strength;
                                copy.passes = this.passes;
                                copy.innerShadow = this.innerShadow;
                                copy.knockout = this.knockout;
                                copy.compositeSource = this.compositeSource;
                                copy.onTop = this.onTop;
                                copy.filter = this.filter.clone().__setFixedHash();
                                return copy;
                            };
                            FilterGradientGlow.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                var i = 0;
                                var len = 0;
                                var str = "[" + this.filterName + "] " +
                                    "BlurX: " + this.blurX + ", " +
                                    "BlurY: " + this.blurY + ", " +
                                    "Angle: " + this.angle + ", " +
                                    "Distance: " + this.distance + ", " +
                                    "Strength: " + this.strength + ", " +
                                    "Passes: " + this.passes;
                                var flags = [];
                                if (this.innerShadow) {
                                    flags.push("InnerShadow");
                                }
                                if (this.knockout) {
                                    flags.push("Knockout");
                                }
                                if (this.compositeSource) {
                                    flags.push("CompositeSource");
                                }
                                if (this.onTop) {
                                    flags.push("OnTop");
                                }
                                if (flags.length > 0) {
                                    str += ", Flags: " + flags.join(", ");
                                }
                                if (this.gradientColors.length > 0) {
                                    str += "\n" + filters.StringUtils.repeat(indent + 2) + "GradientColors:";
                                    for (i = 0, len = this.gradientColors.length; i < len; i++) {
                                        str += ((i > 0) ? ", " : " ") + filters.ColorUtils.rgbToString(this.gradientColors[i]);
                                    }
                                }
                                if (this.gradientRatios.length > 0) {
                                    str += "\n" + filters.StringUtils.repeat(indent + 2) + "GradientRatios:";
                                    for (i = 0, len = this.gradientRatios.length; i < len; i++) {
                                        str += ((i > 0) ? ", " : " ") + this.gradientRatios[i];
                                    }
                                }
                                return str;
                            };
                            Object.defineProperty(FilterGradientGlow.prototype, "filterName", {
                                get: function () { return "GradientGlowFilter"; },
                                enumerable: true,
                                configurable: true
                            });
                            return FilterGradientGlow;
                        }(filters.Filter));
                        filters.FilterGradientGlow = FilterGradientGlow;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FilterGradientGlow.js.map