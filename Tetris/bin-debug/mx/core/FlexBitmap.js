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
        core.Bitmap = flash.display.Bitmap;
        core.BitmapData = flash.display.BitmapData;
        core.NameUtil = mx.utils.NameUtil;
        var FlexBitmap = (function (_super) {
            __extends(FlexBitmap, _super);
            function FlexBitmap(param1, param2, param3) {
                if (param1 === void 0) { param1 = null; }
                if (param2 === void 0) { param2 = "auto"; }
                if (param3 === void 0) { param3 = false; }
                var _this = this;
                param1 = strict(param1, core.BitmapData);
                param2 = as(param2, 'String');
                param3 = Boolean(param3);
                var bitmapData = param1;
                var pixelSnapping = param2;
                var smoothing = param3;
                _this = _super.call(this, bitmapData, pixelSnapping, smoothing) || this;
                try {
                    _this.name = core.NameUtil.createUniqueName(_this);
                    return;
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    return;
                }
                return _this;
            }
            FlexBitmap.prototype.toString = function () {
                return core.NameUtil.displayObjectToString(this);
            };
            FlexBitmap.VERSION = "3.0.0.0";
            return FlexBitmap;
        }(core.Bitmap));
        core.FlexBitmap = FlexBitmap;
    })(core = mx.core || (mx.core = {}));
})(mx || (mx = {}));
//# sourceMappingURL=FlexBitmap.js.map