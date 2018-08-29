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
                        filters.StringUtils = flash.__native.utils.StringUtils;
                        filters.ColorMatrixFilter = flash.filters.ColorMatrixFilter;
                        var FilterColorMatrix = (function (_super) {
                            __extends(FilterColorMatrix, _super);
                            function FilterColorMatrix(id) {
                                var _this = _super.call(this, id) || this;
                                _this.implements_flash___native_format_swf_data_filters_IFilter = null;
                                _this.colorMatrix = new Array();
                                return _this;
                            }
                            FilterColorMatrix.prototype.parse = function (data) {
                                for (var i = 0; i < 20; i++) {
                                    this.colorMatrix[i] = data.readFLOAT();
                                }
                                this.filter = new filters.ColorMatrixFilter(this.colorMatrix).__setFixedHash();
                            };
                            FilterColorMatrix.prototype.publish = function (data) {
                                data = strict(data, filters.SWFData);
                                for (var i = 0; i < 20; i++) {
                                    data.writeFLOAT(this.colorMatrix[i]);
                                }
                            };
                            FilterColorMatrix.prototype.clone = function () {
                                var copy = new FilterColorMatrix(this.id);
                                for (var i = 0; i < 20; i++) {
                                    copy.colorMatrix[i] = this.colorMatrix[i];
                                }
                                copy.filter = this.filter.clone().__setFixedHash();
                                return copy;
                            };
                            FilterColorMatrix.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                var si = filters.StringUtils.repeat(indent + 2);
                                return "[ColorMatrixFilter]" +
                                    "\n" + si + "[R] " + this.colorMatrix[0] + ", " + this.colorMatrix[1] + ", " + this.colorMatrix[2] + ", " + this.colorMatrix[3] + ", " + this.colorMatrix[4] +
                                    "\n" + si + "[G] " + this.colorMatrix[5] + ", " + this.colorMatrix[6] + ", " + this.colorMatrix[7] + ", " + this.colorMatrix[8] + ", " + this.colorMatrix[9] +
                                    "\n" + si + "[B] " + this.colorMatrix[10] + ", " + this.colorMatrix[11] + ", " + this.colorMatrix[12] + ", " + this.colorMatrix[13] + ", " + this.colorMatrix[14] +
                                    "\n" + si + "[A] " + this.colorMatrix[15] + ", " + this.colorMatrix[16] + ", " + this.colorMatrix[17] + ", " + this.colorMatrix[18] + ", " + this.colorMatrix[19];
                            };
                            return FilterColorMatrix;
                        }(filters.Filter));
                        filters.FilterColorMatrix = FilterColorMatrix;
                    })(filters = data_1.filters || (data_1.filters = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FilterColorMatrix.js.map