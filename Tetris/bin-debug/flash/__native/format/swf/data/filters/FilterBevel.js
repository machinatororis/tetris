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
                        filters.BevelFilter = flash.filters.BevelFilter;
                        filters.BitmapFilterType = flash.filters.BitmapFilterType;
                        var FilterBevel = (function (_super) {
                            __extends(FilterBevel, _super);
                            function FilterBevel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                return _this;
                            }
                            FilterBevel.prototype.parse = function (data) {
                                this.shadowColor = data.readRGBA();
                                this.highlightColor = data.readRGBA();
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
                                var filterType;
                                if (this.onTop) {
                                    filterType = filters.BitmapFilterType.FULL;
                                }
                                else {
                                    filterType = (this.innerShadow) ? filters.BitmapFilterType.INNER : filters.BitmapFilterType.OUTER;
                                }
                                this.filter = new filters.BevelFilter(this.distance, this.angle * 180 / Math.PI, filters.ColorUtils.rgb(this.highlightColor), filters.ColorUtils.alpha(this.highlightColor), filters.ColorUtils.rgb(this.shadowColor), filters.ColorUtils.alpha(this.shadowColor), this.blurX, this.blurY, this.strength, this.passes, filterType, this.knockout).__setFixedHash();
                            };
                            FilterBevel.prototype.publish = function (data) {
                                data = strict(data, filters.SWFData);
                                data.writeRGBA(this.shadowColor);
                                data.writeRGBA(this.highlightColor);
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
                            FilterBevel.prototype.clone = function () {
                                var copy = new FilterBevel(this.id);
                                copy.shadowColor = this.shadowColor;
                                copy.highlightColor = this.highlightColor;
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
                            FilterBevel.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                var str = "[BevelFilter] " +
                                    "ShadowColor: " + filters.ColorUtils.rgbToString(this.shadowColor) + ", " +
                                    "HighlightColor: " + filters.ColorUtils.rgbToString(this.highlightColor) + ", " +
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
                                return str;
                            };
                            return FilterBevel;
                        }(filters.Filter));
                        filters.FilterBevel = FilterBevel;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FilterBevel.js.map