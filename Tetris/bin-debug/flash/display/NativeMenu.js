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
        display.XML = global.XML;
        display.EventDispatcher = flash.events.EventDispatcher;
        var NativeMenu = (function (_super) {
            __extends(NativeMenu, _super);
            function NativeMenu() {
                return _super.call(this) || this;
            }
            return NativeMenu;
        }(display.EventDispatcher));
        display.NativeMenu = NativeMenu;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=NativeMenu.js.map