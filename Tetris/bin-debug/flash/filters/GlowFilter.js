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
        var GlowFilter = (function (_super) {
            __extends(GlowFilter, _super);
            function GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
                if (color === void 0) { color = 0xFF0000; }
                if (alpha === void 0) { alpha = 1.0; }
                if (blurX === void 0) { blurX = 6.0; }
                if (blurY === void 0) { blurY = 6.0; }
                if (strength === void 0) { strength = 2; }
                if (quality === void 0) { quality = 1; }
                if (inner === void 0) { inner = false; }
                if (knockout === void 0) { knockout = false; }
                if (hideObject === void 0) { hideObject = false; }
                var _this = this;
                color = ((color) >>> 0);
                alpha = (+(alpha));
                blurX = (+(blurX));
                blurY = (+(blurY));
                strength = (+(strength));
                quality = ((quality) >> 0);
                inner = Boolean(inner);
                knockout = Boolean(knockout);
                hideObject = Boolean(hideObject);
                _this = _super.call(this, 0.0, 0.0, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) || this;
                return _this;
            }
            Object.defineProperty(GlowFilter.prototype, "angle", {
                get: function () { return this.super('flash.filters.DropShadowFilter', 'angle'); },
                set: function (value) { value = (+(value)); this.super('flash.filters.DropShadowFilter', 'angle', 0.0); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GlowFilter.prototype, "distance", {
                get: function () { return this.super('flash.filters.DropShadowFilter', 'distance'); },
                set: function (value) { value = (+(value)); this.super('flash.filters.DropShadowFilter', 'distance', 0.0); },
                enumerable: true,
                configurable: true
            });
            GlowFilter.prototype.clone = function () {
                return new GlowFilter(this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject);
            };
            GlowFilter.prototype.__getHash = function () {
                return this.__fixedHash || [this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject].toString();
            };
            return GlowFilter;
        }(filters.DropShadowFilter));
        filters.GlowFilter = GlowFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GlowFilter.js.map