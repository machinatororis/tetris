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
    var filters;
    (function (filters) {
        var ConvolutionFilter = (function (_super) {
            __extends(ConvolutionFilter, _super);
            function ConvolutionFilter(matrixX, matrixY, matrix, divisor, bias, preserveAlpha, clamp, color, alpha) {
                if (matrixX === void 0) { matrixX = 0; }
                if (matrixY === void 0) { matrixY = 0; }
                if (matrix === void 0) { matrix = null; }
                if (divisor === void 0) { divisor = 1.0; }
                if (bias === void 0) { bias = 0.0; }
                if (preserveAlpha === void 0) { preserveAlpha = true; }
                if (clamp === void 0) { clamp = true; }
                if (color === void 0) { color = 0; }
                if (alpha === void 0) { alpha = 0.0; }
                var _this = this;
                matrixX = (+(matrixX));
                matrixY = (+(matrixY));
                matrix = strict(matrix, Array);
                divisor = (+(divisor));
                bias = (+(bias));
                preserveAlpha = Boolean(preserveAlpha);
                clamp = Boolean(clamp);
                color = ((color) >>> 0);
                alpha = (+(alpha));
                _this.alpha === void 0 && (_this.alpha = NaN);
                _this.bias === void 0 && (_this.bias = NaN);
                _this.clamp === void 0 && (_this.clamp = false);
                _this.color === void 0 && (_this.color = 0);
                _this.divisor === void 0 && (_this.divisor = NaN);
                _this.matrix === void 0 && (_this.matrix = null);
                _this.matrixX === void 0 && (_this.matrixX = NaN);
                _this.matrixY === void 0 && (_this.matrixY = NaN);
                _this.preserveAlpha === void 0 && (_this.preserveAlpha = false);
                _this = _super.call(this) || this;
                _this.alpha = alpha;
                _this.bias = bias;
                _this.clamp = clamp;
                _this.color = color;
                _this.divisor = divisor;
                _this.matrix = matrix;
                _this.matrixX = matrixX;
                _this.matrixY = matrixY;
                _this.preserveAlpha = preserveAlpha;
                _this.__notImplemented = true;
                return _this;
            }
            ConvolutionFilter.prototype.clone = function () {
                return new ConvolutionFilter(this.matrixX, this.matrixY, this.matrix, this.divisor, this.bias, this.preserveAlpha, this.clamp, this.color, this.alpha);
            };
            return ConvolutionFilter;
        }(filters.BitmapFilter));
        filters.ConvolutionFilter = ConvolutionFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ConvolutionFilter.js.map