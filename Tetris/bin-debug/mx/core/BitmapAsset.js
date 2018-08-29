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
        core.BitmapData = flash.display.BitmapData;
        var BitmapAsset = (function (_super) {
            __extends(BitmapAsset, _super);
            function BitmapAsset(param1, param2, param3) {
                if (param1 === void 0) { param1 = null; }
                if (param2 === void 0) { param2 = "auto"; }
                if (param3 === void 0) { param3 = false; }
                var _this = this;
                _this.implements_flash_display_IBitmapDrawable = null;
                _this.implements_mx_core_IFlexDisplayObject = null;
                _this.implements_mx_core_IFlexAsset = null;
                param1 = strict(param1, core.BitmapData);
                param2 = as(param2, 'String');
                param3 = Boolean(param3);
                _this = _super.call(this, param1, param2, param3) || this;
                return _this;
            }
            Object.defineProperty(BitmapAsset.prototype, "measuredWidth", {
                get: function () {
                    if (this.bitmapData) {
                        return this.bitmapData.width;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BitmapAsset.prototype, "measuredHeight", {
                get: function () {
                    if (this.bitmapData) {
                        return this.bitmapData.height;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            BitmapAsset.prototype.setActualSize = function (param1, param2) {
                param1 = (+(param1));
                param2 = (+(param2));
                this.width = param1;
                this.height = param2;
            };
            BitmapAsset.prototype.move = function (param1, param2) {
                param1 = (+(param1));
                param2 = (+(param2));
                this.x = param1;
                this.y = param2;
            };
            BitmapAsset.VERSION = "3.0.0.0";
            return BitmapAsset;
        }(core.FlexBitmap));
        core.BitmapAsset = BitmapAsset;
    })(core = mx.core || (mx.core = {}));
})(mx || (mx = {}));
//# sourceMappingURL=BitmapAsset.js.map