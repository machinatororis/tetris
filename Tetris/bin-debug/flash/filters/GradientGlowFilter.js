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
        var GradientGlowFilter = (function (_super) {
            __extends(GradientGlowFilter, _super);
            function GradientGlowFilter(distance, angle, colors, alphas, ratios, blurX, blurY, strength, quality, type, knockout) {
                if (distance === void 0) { distance = 4.0; }
                if (angle === void 0) { angle = 45; }
                if (colors === void 0) { colors = null; }
                if (alphas === void 0) { alphas = null; }
                if (ratios === void 0) { ratios = null; }
                if (blurX === void 0) { blurX = 4.0; }
                if (blurY === void 0) { blurY = 4.0; }
                if (strength === void 0) { strength = 1; }
                if (quality === void 0) { quality = 1; }
                if (type === void 0) { type = "inner"; }
                if (knockout === void 0) { knockout = false; }
                var _this = this;
                distance = (+(distance));
                angle = (+(angle));
                colors = strict(colors, Array);
                alphas = strict(alphas, Array);
                ratios = strict(ratios, Array);
                blurX = (+(blurX));
                blurY = (+(blurY));
                strength = (+(strength));
                quality = ((quality) >> 0);
                type = as(type, 'String');
                knockout = Boolean(knockout);
                _this.alphas === void 0 && (_this.alphas = null);
                _this.angle === void 0 && (_this.angle = NaN);
                _this.blurX === void 0 && (_this.blurX = NaN);
                _this.blurY === void 0 && (_this.blurY = NaN);
                _this.colors === void 0 && (_this.colors = null);
                _this.distance === void 0 && (_this.distance = NaN);
                _this.knockout === void 0 && (_this.knockout = false);
                _this.quality === void 0 && (_this.quality = 0);
                _this.ratios === void 0 && (_this.ratios = null);
                _this.strength === void 0 && (_this.strength = NaN);
                _this.type === void 0 && (_this.type = null);
                _this = _super.call(this) || this;
                _this.alphas = alphas;
                _this.angle = angle;
                _this.blurX = blurX;
                _this.blurY = blurY;
                _this.colors = colors;
                _this.distance = distance;
                _this.knockout = knockout;
                _this.quality = quality;
                _this.ratios = ratios;
                _this.strength = strength;
                _this.type = type;
                _this.__notImplemented = true;
                return _this;
            }
            GradientGlowFilter.prototype.clone = function () {
                return new GradientGlowFilter(this.distance, this.angle, this.colors, this.alphas, this.ratios, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout);
            };
            return GradientGlowFilter;
        }(filters.BitmapFilter));
        filters.GradientGlowFilter = GradientGlowFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GradientGlowFilter.js.map