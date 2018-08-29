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
        var ErrorEvent = (function (_super) {
            __extends(ErrorEvent, _super);
            function ErrorEvent(type, bubbles, cancelable, text, id) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (text === void 0) { text = ''; }
                if (id === void 0) { id = 0; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                text = as(text, 'String');
                id = ((id) >> 0);
                _this._errorID === void 0 && (_this._errorID = 0);
                _this = _super.call(this, type, bubbles, cancelable, text) || this;
                _this._errorID = id;
                return _this;
            }
            Object.defineProperty(ErrorEvent.prototype, "errorID", {
                get: function () {
                    return this._errorID;
                },
                enumerable: true,
                configurable: true
            });
            ErrorEvent.prototype.clone = function () {
                return new ErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this._errorID);
            };
            ErrorEvent.prototype.toString = function () {
                return this.formatToString("ErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text", "errorID");
            };
            ErrorEvent.ERROR = "error";
            return ErrorEvent;
        }(events.TextEvent));
        events.ErrorEvent = ErrorEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ErrorEvent.js.map