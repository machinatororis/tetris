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
        var HTTPStatusEvent = (function (_super) {
            __extends(HTTPStatusEvent, _super);
            function HTTPStatusEvent(type, bubbles, cancelable, status, redirected) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (status === void 0) { status = 0; }
                if (redirected === void 0) { redirected = false; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                status = ((status) >> 0);
                redirected = Boolean(redirected);
                _this._status === void 0 && (_this._status = 0);
                _this._responseHeaders === void 0 && (_this._responseHeaders = null);
                _this._responseUrl === void 0 && (_this._responseUrl = null);
                _this._redirected === void 0 && (_this._redirected = false);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this._status = status;
                _this._redirected = redirected;
                _this._responseHeaders = [];
                return _this;
            }
            HTTPStatusEvent.prototype.clone = function () {
                var result = new HTTPStatusEvent(this.type, this.bubbles, this.cancelable, this._status, this._redirected);
                result.responseURL = this.responseURL;
                result.responseHeaders = this.responseHeaders;
                return result;
            };
            HTTPStatusEvent.prototype.toString = function () {
                return this.formatToString("HTTPStatusEvent", "type", "bubbles", "cancelable", "eventPhase", "status", "redirected", "responseURL");
            };
            Object.defineProperty(HTTPStatusEvent.prototype, "status", {
                get: function () {
                    return this._status;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTTPStatusEvent.prototype, "responseURL", {
                get: function () { return this._responseUrl; },
                set: function (value) { value = as(value, 'String'); this._responseUrl = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTTPStatusEvent.prototype, "responseHeaders", {
                get: function () { return this._responseHeaders; },
                set: function (value) { value = strict(value, Array); this._responseHeaders = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HTTPStatusEvent.prototype, "redirected", {
                get: function () { return this._redirected; },
                set: function (value) { value = Boolean(value); this._redirected = value; },
                enumerable: true,
                configurable: true
            });
            HTTPStatusEvent.HTTP_STATUS = "httpStatus";
            HTTPStatusEvent.HTTP_RESPONSE_STATUS = "httpResponseStatus";
            return HTTPStatusEvent;
        }(events.Event));
        events.HTTPStatusEvent = HTTPStatusEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=HTTPStatusEvent.js.map