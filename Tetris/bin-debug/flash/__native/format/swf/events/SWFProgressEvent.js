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
                    var SWFProgressEvent = (function (_super) {
                        __extends(SWFProgressEvent, _super);
                        function SWFProgressEvent(type, processed, total, bubbles, cancelable) {
                            if (bubbles === void 0) { bubbles = false; }
                            if (cancelable === void 0) { cancelable = false; }
                            var _this = this;
                            type = as(type, 'String');
                            processed = ((processed) >>> 0);
                            total = ((total) >>> 0);
                            bubbles = Boolean(bubbles);
                            cancelable = Boolean(cancelable);
                            _this.processed === void 0 && (_this.processed = 0);
                            _this.total === void 0 && (_this.total = 0);
                            _this = _super.call(this, type, bubbles, cancelable) || this;
                            _this.processed = processed;
                            _this.total = total;
                            return _this;
                        }
                        Object.defineProperty(SWFProgressEvent.prototype, "progress", {
                            get: function () {
                                return this.processed / this.total;
                            },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(SWFProgressEvent.prototype, "progressPercent", {
                            get: function () {
                                return Math.round(this.progress * 100);
                            },
                            enumerable: true,
                            configurable: true
                        });
                        SWFProgressEvent.prototype.clone = function () {
                            return new SWFProgressEvent(this.type, this.processed, this.total, this.bubbles, this.cancelable);
                        };
                        SWFProgressEvent.prototype.toString = function () {
                            return "[SWFProgressEvent] processed: " + this.processed + ", total: " + this.total + " (" + this.progressPercent + "%)";
                        };
                        SWFProgressEvent.PROGRESS = "progress";
                        SWFProgressEvent.COMPLETE = "complete";
                        return SWFProgressEvent;
                    }(events.Event));
                    events.SWFProgressEvent = SWFProgressEvent;
                })(events = swf.events || (swf.events = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFProgressEvent.js.map