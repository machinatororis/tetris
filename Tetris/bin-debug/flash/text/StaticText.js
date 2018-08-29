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
    var text;
    (function (text) {
        text.DisplayObject = flash.display.DisplayObject;
        var StaticText = (function (_super) {
            __extends(StaticText, _super);
            function StaticText() {
                return _super.call(this) || this;
            }
            Object.defineProperty(StaticText.prototype, "text", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            return StaticText;
        }(text.DisplayObject));
        text.StaticText = StaticText;
    })(text = flash.text || (flash.text = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StaticText.js.map