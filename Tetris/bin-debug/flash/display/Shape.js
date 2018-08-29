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
        display.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape() {
                return _super.call(this) || this;
            }
            Object.defineProperty(Shape.prototype, "graphics", {
                get: function () { return this._graphics || (this._graphics = new display.Graphics); },
                enumerable: true,
                configurable: true
            });
            Shape.prototype.__draw = function (ctx, dirtyFlag) {
                if (dirtyFlag === void 0) { dirtyFlag = 0; }
                if (this.__drawCache(ctx))
                    return false;
                if (this._graphics && this._graphics._commandsSize) {
                    ctx.drawGraphics(this, this._graphics);
                }
                return true;
            };
            Shape.prototype.__updateContextTransformation = function (ctx) {
            };
            Shape.prototype.toString = function () {
                return '[object Shape]';
            };
            return Shape;
        }(display.DisplayObject));
        display.Shape = Shape;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Shape.js.map