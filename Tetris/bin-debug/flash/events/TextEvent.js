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
        var TextEvent = (function (_super) {
            __extends(TextEvent, _super);
            function TextEvent(type, bubbles, cancelable, text) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (text === void 0) { text = ""; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                text = as(text, 'String');
                _this._text === void 0 && (_this._text = null);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this._text = text;
                return _this;
            }
            Object.defineProperty(TextEvent.prototype, "text", {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    value = as(value, 'String');
                    this._text = value;
                },
                enumerable: true,
                configurable: true
            });
            TextEvent.prototype.clone = function () {
                return new TextEvent(this.type, this.bubbles, this.cancelable, this._text);
            };
            TextEvent.prototype.toString = function () {
                return this.formatToString("TextEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
            };
            TextEvent.LINK = "link";
            TextEvent.TEXT_INPUT = "textInput";
            return TextEvent;
        }(events.Event));
        events.TextEvent = TextEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TextEvent.js.map