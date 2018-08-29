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
        var ProgressEvent = (function (_super) {
            __extends(ProgressEvent, _super);
            function ProgressEvent(type, bubbles, cancelable, bytesLoaded, bytesTotal) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (bytesLoaded === void 0) { bytesLoaded = 0; }
                if (bytesTotal === void 0) { bytesTotal = 0; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                bytesLoaded = (+(bytesLoaded));
                bytesTotal = (+(bytesTotal));
                _this._bytesLoaded === void 0 && (_this._bytesLoaded = NaN);
                _this._bytesTotal === void 0 && (_this._bytesTotal = NaN);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this._bytesLoaded = bytesLoaded;
                _this._bytesTotal = bytesTotal;
                return _this;
            }
            ProgressEvent.prototype.clone = function () {
                return new ProgressEvent(this.type, this.bubbles, this.cancelable, this._bytesLoaded, this._bytesTotal);
            };
            ProgressEvent.prototype.toString = function () {
                return this.formatToString("ProgressEvent", "type", "bubbles", "cancelable", "eventPhase", "bytesLoaded", "bytesTotal");
            };
            Object.defineProperty(ProgressEvent.prototype, "bytesLoaded", {
                get: function () { return this._bytesLoaded; },
                set: function (value) { value = (+(value)); this._bytesLoaded = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressEvent.prototype, "bytesTotal", {
                get: function () { return this._bytesTotal; },
                set: function (value) { value = (+(value)); this._bytesTotal = value; },
                enumerable: true,
                configurable: true
            });
            ProgressEvent.PROGRESS = "progress";
            ProgressEvent.SOCKET_DATA = "socketData";
            return ProgressEvent;
        }(events.Event));
        events.ProgressEvent = ProgressEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ProgressEvent.js.map