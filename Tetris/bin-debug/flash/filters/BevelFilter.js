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
        var BevelFilter = (function (_super) {
            __extends(BevelFilter, _super);
            function BevelFilter(distance, angle, highlightColor, highlightAlpha, shadowColor, shadowAlpha, blurX, blurY, strength, quality, type, knockout, hideObject) {
                if (distance === void 0) { distance = 4.0; }
                if (angle === void 0) { angle = 45; }
                if (highlightColor === void 0) { highlightColor = 0xFFFFFF; }
                if (highlightAlpha === void 0) { highlightAlpha = 1.0; }
                if (shadowColor === void 0) { shadowColor = 0x000000; }
                if (shadowAlpha === void 0) { shadowAlpha = 1.0; }
                if (blurX === void 0) { blurX = 4.0; }
                if (blurY === void 0) { blurY = 4.0; }
                if (strength === void 0) { strength = 1; }
                if (quality === void 0) { quality = 1; }
                if (type === void 0) { type = "inner"; }
                if (knockout === void 0) { knockout = false; }
                if (hideObject === void 0) { hideObject = false; }
                var _this = this;
                distance = (+(distance));
                angle = (+(angle));
                highlightColor = ((highlightColor) >>> 0);
                highlightAlpha = (+(highlightAlpha));
                shadowColor = ((shadowColor) >>> 0);
                shadowAlpha = (+(shadowAlpha));
                blurX = (+(blurX));
                blurY = (+(blurY));
                strength = (+(strength));
                quality = ((quality) >> 0);
                type = as(type, 'String');
                knockout = Boolean(knockout);
                hideObject = Boolean(hideObject);
                _this.highlightAlpha === void 0 && (_this.highlightAlpha = NaN);
                _this.highlightColor === void 0 && (_this.highlightColor = 0);
                _this.shadowAlpha === void 0 && (_this.shadowAlpha = NaN);
                _this.shadowColor === void 0 && (_this.shadowColor = 0);
                _this.type === void 0 && (_this.type = null);
                highlightAlpha = shadowAlpha = 0;
                _this.highlightAlpha = highlightAlpha;
                _this.highlightColor = highlightColor;
                _this.shadowAlpha = shadowAlpha;
                _this.shadowColor = shadowColor;
                _this.type = type;
                _this = _super.call(this, distance, angle, highlightColor, highlightAlpha, blurX, blurY, strength, quality, type == filters.BitmapFilterType.INNER, knockout, hideObject) || this;
                return _this;
            }
            BevelFilter.prototype.clone = function () {
                return new BevelFilter(this.distance, this.angle, this.highlightColor, this.highlightAlpha, this.shadowColor, this.shadowAlpha, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout, this.hideObject);
            };
            BevelFilter.prototype.__getHash = function () {
                return this.__fixedHash || [this.distance, this.angle, this.highlightColor, this.highlightAlpha, this.shadowColor, this.shadowAlpha, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout, this.hideObject].toString();
            };
            return BevelFilter;
        }(filters.DropShadowFilter));
        filters.BevelFilter = BevelFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BevelFilter.js.map