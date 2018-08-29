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
    var display;
    (function (display) {
        display.EventDispatcher = flash.events.EventDispatcher;
        var NativeMenuItem = (function (_super) {
            __extends(NativeMenuItem, _super);
            function NativeMenuItem(label, isSeparator) {
                if (label === void 0) { label = ""; }
                if (isSeparator === void 0) { isSeparator = false; }
                var _this = this;
                label = as(label, 'String');
                isSeparator = Boolean(isSeparator);
                _this = _super.call(this) || this;
                return _this;
            }
            return NativeMenuItem;
        }(display.EventDispatcher));
        display.NativeMenuItem = NativeMenuItem;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=NativeMenuItem.js.map