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
        var AsyncErrorEvent = (function (_super) {
            __extends(AsyncErrorEvent, _super);
            function AsyncErrorEvent(type, bubbles, cancelable, text, error) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (text === void 0) { text = ""; }
                if (error === void 0) { error = null; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                text = as(text, 'String');
                error = strict(error, Error);
                _this.error === void 0 && (_this.error = null);
                if (_this.error = error) {
                    _this = _super.call(this, type, bubbles, cancelable, text, error.errorID) || this;
                }
                else {
                    _this = _super.call(this, type, bubbles, cancelable) || this;
                }
                return _this;
            }
            AsyncErrorEvent.prototype.clone = function () {
                return new AsyncErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.error);
            };
            AsyncErrorEvent.prototype.toString = function () {
                return this.formatToString("AsyncErrorEvent", "type", "bubbles", "cancelable", "text", "error");
            };
            AsyncErrorEvent.ASYNC_ERROR = "asyncError";
            return AsyncErrorEvent;
        }(events.ErrorEvent));
        events.AsyncErrorEvent = AsyncErrorEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AsyncErrorEvent.js.map