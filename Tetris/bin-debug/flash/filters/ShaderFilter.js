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
        var ShaderFilter = (function (_super) {
            __extends(ShaderFilter, _super);
            function ShaderFilter(shader) {
                if (shader === void 0) { shader = null; }
                var _this = this;
                _this.bottomExtension === void 0 && (_this.bottomExtension = 0);
                _this.leftExtension === void 0 && (_this.leftExtension = 0);
                _this.rightExtension === void 0 && (_this.rightExtension = 0);
                _this.shader === void 0 && (_this.shader = undefined);
                _this.topExtension === void 0 && (_this.topExtension = 0);
                _this = _super.call(this) || this;
                _this.shader = _this.shader;
                _this.__notImplemented = true;
                return _this;
            }
            ShaderFilter.prototype.clone = function () {
                return new ShaderFilter(this.shader);
            };
            return ShaderFilter;
        }(filters.BitmapFilter));
        filters.ShaderFilter = ShaderFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ShaderFilter.js.map