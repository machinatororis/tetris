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
        var StatusEvent = (function (_super) {
            __extends(StatusEvent, _super);
            function StatusEvent(type, bubbles, cancelable, code, level) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (code === void 0) { code = ""; }
                if (level === void 0) { level = ""; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                code = as(code, 'String');
                level = as(level, 'String');
                _this.code === void 0 && (_this.code = null);
                _this.level === void 0 && (_this.level = null);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this.code = code;
                _this.level = level;
                return _this;
            }
            StatusEvent.prototype.clone = function () {
                return new StatusEvent(this.type, this.bubbles, this.cancelable, this.code, this.level);
            };
            StatusEvent.prototype.toString = function () {
                return this.formatToString("StatusEvent", "type", "bubbles", "cancelable", "eventPhase", "code", "level");
            };
            StatusEvent.STATUS = "status";
            return StatusEvent;
        }(events.Event));
        events.StatusEvent = StatusEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StatusEvent.js.map