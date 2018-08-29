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
        var MorphShape = (function (_super) {
            __extends(MorphShape, _super);
            function MorphShape() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MorphShape.prototype.toString = function () {
                return '[object MorphShape]';
            };
            return MorphShape;
        }(display.DisplayObject));
        display.MorphShape = MorphShape;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MorphShape.js.map