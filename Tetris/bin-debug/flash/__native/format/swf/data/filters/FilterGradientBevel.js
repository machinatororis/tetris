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
                        filters.BitmapFilterType = flash.filters.BitmapFilterType;
                        filters.GradientBevelFilter = flash.filters.GradientBevelFilter;
                        var FilterGradientBevel = (function (_super) {
                            __extends(FilterGradientBevel, _super);
                            function FilterGradientBevel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                return _this;
                            }
                            FilterGradientBevel.prototype.parse = function (data) {
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
                                this.filter = new filters.GradientBevelFilter(this.distance, this.angle, gradientGlowColors, gradientGlowAlphas, gradientGlowRatios, this.blurX, this.blurY, this.strength, this.passes, filterType, this.knockout).__setFixedHash();
                            };
                            FilterGradientBevel.prototype.clone = function () {
                                var copy = new FilterGradientBevel(this.id);
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
                                return this.filter;
                            };
                            Object.defineProperty(FilterGradientBevel.prototype, "filterName", {
                                get: function () { return "GradientBevelFilter"; },
                                enumerable: true,
                                configurable: true
                            });
                            return FilterGradientBevel;
                        }(filters.FilterGradientGlow));
                        filters.FilterGradientBevel = FilterGradientBevel;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FilterGradientBevel.js.map