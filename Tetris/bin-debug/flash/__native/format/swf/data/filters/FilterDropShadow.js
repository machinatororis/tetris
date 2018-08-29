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
                        filters.DropShadowFilter = flash.filters.DropShadowFilter;
                        var FilterDropShadow = (function (_super) {
                            __extends(FilterDropShadow, _super);
                            function FilterDropShadow() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                return _this;
                            }
                            FilterDropShadow.prototype.parse = function (data) {
                                this.dropShadowColor = data.readRGBA();
                                this.blurX = data.readFIXED();
                                this.blurY = data.readFIXED();
                                this.angle = data.readFIXED();
                                this.distance = data.readFIXED();
                                this.strength = data.readFIXED8();
                                var flags = data.readUI8();
                                this.hideObject = ((flags & 0x160) == 0);
                                this.innerShadow = ((flags & 0x80) != 0);
                                this.knockout = ((flags & 0x40) != 0);
                                this.compositeSource = ((flags & 0x20) != 0);
                                this.passes = ((flags & 0x1f) >>> 0);
                                this.filter = new filters.DropShadowFilter(this.distance, this.angle * 180 / Math.PI, filters.ColorUtils.rgb(this.dropShadowColor), filters.ColorUtils.alpha(this.dropShadowColor), this.blurX, this.blurY, this.strength, this.passes, this.innerShadow, this.knockout, this.hideObject).__setFixedHash();
                            };
                            FilterDropShadow.prototype.publish = function (data) {
                                data = strict(data, filters.SWFData);
                                data.writeRGBA(this.dropShadowColor);
                                data.writeFIXED(this.blurX);
                                data.writeFIXED(this.blurY);
                                data.writeFIXED(this.angle);
                                data.writeFIXED(this.distance);
                                data.writeFIXED8(this.strength);
                                var flags = (((this.passes & 0x1f)) >>> 0);
                                if (this.innerShadow) {
                                    flags |= 0x80;
                                }
                                if (this.knockout) {
                                    flags |= 0x40;
                                }
                                if (this.compositeSource) {
                                    flags |= 0x20;
                                }
                                data.writeUI8(flags);
                            };
                            FilterDropShadow.prototype.clone = function () {
                                var copy = new FilterDropShadow(this.id);
                                copy.dropShadowColor = this.dropShadowColor;
                                copy.blurX = this.blurX;
                                copy.blurY = this.blurY;
                                copy.angle = this.angle;
                                copy.distance = this.distance;
                                copy.strength = this.strength;
                                copy.passes = this.passes;
                                copy.innerShadow = this.innerShadow;
                                copy.knockout = this.knockout;
                                copy.compositeSource = this.compositeSource;
                                copy.filter = this.filter.clone().__setFixedHash();
                                return copy;
                            };
                            FilterDropShadow.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                var str = "[DropShadowFilter] " +
                                    "DropShadowColor: " + filters.ColorUtils.rgbToString(this.dropShadowColor) + ", " +
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
                                if (flags.length > 0) {
                                    str += ", Flags: " + flags.join(", ");
                                }
                                return str;
                            };
                            return FilterDropShadow;
                        }(filters.Filter));
                        filters.FilterDropShadow = FilterDropShadow;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FilterDropShadow.js.map