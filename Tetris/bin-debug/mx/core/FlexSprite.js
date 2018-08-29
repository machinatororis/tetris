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
        core.Sprite = flash.display.Sprite;
        core.NameUtil = mx.utils.NameUtil;
        var FlexSprite = (function (_super) {
            __extends(FlexSprite, _super);
            function FlexSprite() {
                var _this = _super.call(this) || this;
                try {
                    _this.name = core.NameUtil.createUniqueName(_this);
                    return _this;
                }
                catch (e) {
                    e = window.asc.e2e(e);
                    return _this;
                }
                return _this;
            }
            FlexSprite.prototype.toString = function () {
                return core.NameUtil.displayObjectToString(this);
            };
            FlexSprite.VERSION = "3.0.0.0";
            return FlexSprite;
        }(core.Sprite));
        core.FlexSprite = FlexSprite;
    })(core = mx.core || (mx.core = {}));
})(mx || (mx = {}));
//# sourceMappingURL=FlexSprite.js.map