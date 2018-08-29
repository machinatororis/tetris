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
        var SecurityErrorEvent = (function (_super) {
            __extends(SecurityErrorEvent, _super);
            function SecurityErrorEvent(type, bubbles, cancelable, text, id) {
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
            SecurityErrorEvent.prototype.clone = function () {
                return new SecurityErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.errorID);
            };
            SecurityErrorEvent.prototype.toString = function () {
                return this.formatToString("SecurityErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
            };
            SecurityErrorEvent.SECURITY_ERROR = "securityError";
            return SecurityErrorEvent;
        }(events.ErrorEvent));
        events.SecurityErrorEvent = SecurityErrorEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SecurityErrorEvent.js.map