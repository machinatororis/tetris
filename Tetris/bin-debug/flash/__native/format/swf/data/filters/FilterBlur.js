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
                        filters.BlurFilter = flash.filters.BlurFilter;
                        var FilterBlur = (function (_super) {
                            __extends(FilterBlur, _super);
                            function FilterBlur() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                return _this;
                            }
                            FilterBlur.prototype.parse = function (data) {
                                this.blurX = data.readFIXED();
                                this.blurY = data.readFIXED();
                                this.passes = ((data.readUI8() >> 3) >>> 0);
                                this.filter = new filters.BlurFilter(this.blurX, this.blurY, this.passes).__setFixedHash();
                            };
                            FilterBlur.prototype.publish = function (data) {
                                data = strict(data, filters.SWFData);
                                data.writeFIXED(this.blurX);
                                data.writeFIXED(this.blurY);
                                data.writeUI8(this.passes << 3);
                            };
                            FilterBlur.prototype.clone = function () {
                                var copy = new FilterBlur(this.id);
                                copy.blurX = this.blurX;
                                copy.blurY = this.blurY;
                                copy.passes = this.passes;
                                copy.filter = this.filter.clone().__setFixedHash();
                                return copy;
                            };
                            FilterBlur.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                return "[BlurFilter] " +
                                    "BlurX: " + this.blurX + ", " +
                                    "BlurY: " + this.blurY + ", " +
                                    "Passes: " + this.passes;
                            };
                            return FilterBlur;
                        }(filters.Filter));
                        filters.FilterBlur = FilterBlur;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FilterBlur.js.map