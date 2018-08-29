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
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var events;
                (function (events) {
                    events.Event = flash.events.Event;
                    var SWFErrorEvent = (function (_super) {
                        __extends(SWFErrorEvent, _super);
                        function SWFErrorEvent(type, reason, bubbles, cancelable) {
                            if (bubbles === void 0) { bubbles = false; }
                            if (cancelable === void 0) { cancelable = false; }
                            var _this = this;
                            type = as(type, 'String');
                            reason = as(reason, 'String');
                            bubbles = Boolean(bubbles);
                            cancelable = Boolean(cancelable);
                            _this.reason === void 0 && (_this.reason = null);
                            _this = _super.call(this, type, bubbles, cancelable) || this;
                            _this.reason = reason;
                            return _this;
                        }
                        SWFErrorEvent.prototype.clone = function () {
                            return new SWFErrorEvent(this.type, this.reason, this.bubbles, this.cancelable);
                        };
                        SWFErrorEvent.prototype.toString = function () {
                            return "[SWFErrorEvent] reason: " + this.reason;
                        };
                        SWFErrorEvent.ERROR = "error";
                        SWFErrorEvent.REASON_EOF = "eof";
                        return SWFErrorEvent;
                    }(events.Event));
                    events.SWFErrorEvent = SWFErrorEvent;
                })(events = swf.events || (swf.events = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFErrorEvent.js.map