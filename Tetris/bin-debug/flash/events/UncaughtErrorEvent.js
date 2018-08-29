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
        var UncaughtErrorEvent = (function (_super) {
            __extends(UncaughtErrorEvent, _super);
            function UncaughtErrorEvent(type, bubbles, cancelable, error_in) {
                if (bubbles === void 0) { bubbles = true; }
                if (cancelable === void 0) { cancelable = true; }
                if (error_in === void 0) { error_in = null; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                _this._error === void 0 && (_this._error = undefined);
                _this = _super.call(this, type, bubbles, cancelable, error_in.message || error_in.text) || this;
                _this._error = error_in;
                return _this;
            }
            Object.defineProperty(UncaughtErrorEvent.prototype, "error", {
                get: function () {
                    return this._error;
                },
                enumerable: true,
                configurable: true
            });
            UncaughtErrorEvent.UNCAUGHT_ERROR = "uncaughtError";
            return UncaughtErrorEvent;
        }(events.ErrorEvent));
        events.UncaughtErrorEvent = UncaughtErrorEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=UncaughtErrorEvent.js.map