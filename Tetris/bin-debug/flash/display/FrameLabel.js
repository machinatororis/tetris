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
        var FrameLabel = (function (_super) {
            __extends(FrameLabel, _super);
            function FrameLabel(name, frame) {
                var _this = this;
                name = as(name, 'String');
                frame = ((frame) >> 0);
                _this._name === void 0 && (_this._name = null);
                _this._frame === void 0 && (_this._frame = 0);
                _this = _super.call(this) || this;
                _this._name = name;
                _this._frame = frame;
                return _this;
            }
            Object.defineProperty(FrameLabel.prototype, "frame", {
                get: function () {
                    return this._frame;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FrameLabel.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            return FrameLabel;
        }(display.EventDispatcher));
        display.FrameLabel = FrameLabel;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FrameLabel.js.map