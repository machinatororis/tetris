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
var mx;
(function (mx) {
    var core;
    (function (core) {
        var SpriteAsset = (function (_super) {
            __extends(SpriteAsset, _super);
            function SpriteAsset() {
                var _this = this;
                _this.implements_flash_display_IBitmapDrawable = null;
                _this.implements_mx_core_IBorder = null;
                _this.implements_mx_core_IFlexDisplayObject = null;
                _this.implements_mx_core_IFlexAsset = null;
                _this._measuredHeight === void 0 && (_this._measuredHeight = NaN);
                _this._measuredWidth === void 0 && (_this._measuredWidth = NaN);
                _this = _super.call(this) || this;
                _this._measuredWidth = _this.width;
                _this._measuredHeight = _this.height;
                return _this;
            }
            Object.defineProperty(SpriteAsset.prototype, "measuredWidth", {
                get: function () {
                    return this._measuredWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpriteAsset.prototype, "measuredHeight", {
                get: function () {
                    return this._measuredHeight;
                },
                enumerable: true,
                configurable: true
            });
            SpriteAsset.prototype.setActualSize = function (param1, param2) {
                param1 = (+(param1));
                param2 = (+(param2));
                this.width = param1;
                this.height = param2;
            };
            SpriteAsset.prototype.move = function (param1, param2) {
                param1 = (+(param1));
                param2 = (+(param2));
                this.x = param1;
                this.y = param2;
            };
            Object.defineProperty(SpriteAsset.prototype, "borderMetrics", {
                get: function () {
                    if (this.scale9Grid == null) {
                        return core.EdgeMetrics.EMPTY;
                    }
                    return new core.EdgeMetrics(this.scale9Grid.left, this.scale9Grid.top, Math.ceil(this.measuredWidth - this.scale9Grid.right), Math.ceil(this.measuredHeight - this.scale9Grid.bottom));
                },
                enumerable: true,
                configurable: true
            });
            SpriteAsset.VERSION = "3.0.0.0";
            return SpriteAsset;
        }(core.FlexSprite));
        core.SpriteAsset = SpriteAsset;
    })(core = mx.core || (mx.core = {}));
})(mx || (mx = {}));
//# sourceMappingURL=SpriteAsset.js.map