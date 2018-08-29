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
                        filters.GlowFilter = flash.filters.GlowFilter;
                        var FilterGlow = (function (_super) {
                            __extends(FilterGlow, _super);
                            function FilterGlow() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                return _this;
                            }
                            FilterGlow.prototype.parse = function (data) {
                                this.glowColor = data.readRGBA();
                                this.blurX = data.readFIXED();
                                this.blurY = data.readFIXED();
                                this.strength = data.readFIXED8();
                                var flags = data.readUI8();
                                this.innerGlow = ((flags & 0x80) != 0);
                                this.knockout = ((flags & 0x40) != 0);
                                this.compositeSource = ((flags & 0x20) != 0);
                                this.passes = ((flags & 0x1f) >>> 0);
                                this.filter = new filters.GlowFilter(filters.ColorUtils.rgb(this.glowColor), filters.ColorUtils.alpha(this.glowColor), this.blurX, this.blurY, this.strength, this.passes, this.innerGlow, this.knockout).__setFixedHash();
                            };
                            FilterGlow.prototype.publish = function (data) {
                                data = strict(data, filters.SWFData);
                                data.writeRGBA(this.glowColor);
                                data.writeFIXED(this.blurX);
                                data.writeFIXED(this.blurY);
                                data.writeFIXED8(this.strength);
                                var flags = (((this.passes & 0x1f)) >>> 0);
                                if (this.innerGlow) {
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
                            FilterGlow.prototype.clone = function () {
                                var copy = new FilterGlow(this.id);
                                copy.glowColor = this.glowColor;
                                copy.blurX = this.blurX;
                                copy.blurY = this.blurY;
                                copy.strength = this.strength;
                                copy.passes = this.passes;
                                copy.innerGlow = this.innerGlow;
                                copy.knockout = this.knockout;
                                copy.compositeSource = this.compositeSource;
                                copy.filter = this.filter.clone().__setFixedHash();
                                return copy;
                            };
                            FilterGlow.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                var str = "[GlowFilter] " +
                                    "GlowColor: " + filters.ColorUtils.rgbToString(this.glowColor) + ", " +
                                    "BlurX: " + this.blurX + ", " +
                                    "BlurY: " + this.blurY + ", " +
                                    "Strength: " + this.strength + ", " +
                                    "Passes: " + this.passes;
                                var flags = [];
                                if (this.innerGlow) {
                                    flags.push("InnerGlow");
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
                            return FilterGlow;
                        }(filters.Filter));
                        filters.FilterGlow = FilterGlow;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FilterGlow.js.map