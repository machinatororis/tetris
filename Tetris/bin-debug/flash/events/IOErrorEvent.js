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
        var IOErrorEvent = (function (_super) {
            __extends(IOErrorEvent, _super);
            function IOErrorEvent(type, bubbles, cancelable, text, id) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (text === void 0) { text = ""; }
                if (id === void 0) { id = 0; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                text = as(text, 'String');
                id = ((id) >> 0);
                _this = _super.call(this, type, bubbles, cancelable, text, id) || this;
                return _this;
            }
            IOErrorEvent.prototype.clone = function () {
                return new IOErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.errorID);
            };
            IOErrorEvent.prototype.toString = function () {
                return this.formatToString("IOErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
            };
            IOErrorEvent.IO_ERROR = "ioError";
            IOErrorEvent.NETWORK_ERROR = "networkError";
            IOErrorEvent.DISK_ERROR = "diskError";
            IOErrorEvent.VERIFY_ERROR = "verifyError";
            return IOErrorEvent;
        }(events.ErrorEvent));
        events.IOErrorEvent = IOErrorEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=IOErrorEvent.js.map