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
                    var SWFWarningEvent = (function (_super) {
                        __extends(SWFWarningEvent, _super);
                        function SWFWarningEvent(type, index, data, bubbles, cancelable) {
                            if (data === void 0) { data = null; }
                            if (bubbles === void 0) { bubbles = false; }
                            if (cancelable === void 0) { cancelable = false; }
                            var _this = this;
                            type = as(type, 'String');
                            index = ((index) >>> 0);
                            bubbles = Boolean(bubbles);
                            cancelable = Boolean(cancelable);
                            _this.index === void 0 && (_this.index = 0);
                            _this.data === void 0 && (_this.data = null);
                            _this = _super.call(this, type, bubbles, cancelable) || this;
                            _this.index = index;
                            _this.data = data;
                            return _this;
                        }
                        SWFWarningEvent.prototype.clone = function () {
                            return new SWFWarningEvent(this.type, this.index, this.data, this.bubbles, this.cancelable);
                        };
                        SWFWarningEvent.prototype.toString = function () {
                            return "[SWFWarningEvent] index: " + this.index;
                        };
                        SWFWarningEvent.OVERFLOW = "overflow";
                        SWFWarningEvent.UNDERFLOW = "underflow";
                        return SWFWarningEvent;
                    }(events.Event));
                    events.SWFWarningEvent = SWFWarningEvent;
                })(events = swf.events || (swf.events = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFWarningEvent.js.map