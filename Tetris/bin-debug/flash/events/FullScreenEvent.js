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
    var events;
    (function (events) {
        var FullScreenEvent = (function (_super) {
            __extends(FullScreenEvent, _super);
            function FullScreenEvent(type, bubbles, cancelable, fullScreen, interactive) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (fullScreen === void 0) { fullScreen = false; }
                if (interactive === void 0) { interactive = false; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                fullScreen = Boolean(fullScreen);
                interactive = Boolean(interactive);
                _this._fullscreen === void 0 && (_this._fullscreen = false);
                _this._interactive === void 0 && (_this._interactive = false);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this._fullscreen = fullScreen;
                _this._interactive = interactive;
                return _this;
            }
            Object.defineProperty(FullScreenEvent.prototype, "fullScreen", {
                get: function () {
                    return this._fullscreen;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FullScreenEvent.prototype, "interactive", {
                get: function () {
                    return this._interactive;
                },
                enumerable: true,
                configurable: true
            });
            FullScreenEvent.prototype.clone = function () {
                return new FullScreenEvent(this.type, this.bubbles, this.cancelable, this._fullscreen, this._interactive);
            };
            FullScreenEvent.prototype.toString = function () {
                return this.formatToString("FullScreenEvent", "type", "bubbles", "cancelable", "eventPhase", "fullScreen", "interactive");
            };
            FullScreenEvent.FULL_SCREEN = "fullScreen";
            FullScreenEvent.FULL_SCREEN_INTERACTIVE_ACCEPTED = "fullScreenInteractiveAccepted";
            return FullScreenEvent;
        }(events.Event));
        events.FullScreenEvent = FullScreenEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FullScreenEvent.js.map