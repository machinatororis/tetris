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
        events.InteractiveObject = flash.display.InteractiveObject;
        var FocusEvent = (function (_super) {
            __extends(FocusEvent, _super);
            function FocusEvent(type, bubbles, cancelable, relatedObject, shiftKey, keyCode, direction) {
                if (bubbles === void 0) { bubbles = true; }
                if (cancelable === void 0) { cancelable = false; }
                if (relatedObject === void 0) { relatedObject = null; }
                if (shiftKey === void 0) { shiftKey = false; }
                if (keyCode === void 0) { keyCode = 0; }
                if (direction === void 0) { direction = "none"; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                relatedObject = strict(relatedObject, events.InteractiveObject);
                shiftKey = Boolean(shiftKey);
                keyCode = ((keyCode) >>> 0);
                direction = as(direction, 'String');
                _this.direction === void 0 && (_this.direction = null);
                _this.isRelatedObjectInaccessible === void 0 && (_this.isRelatedObjectInaccessible = false);
                _this.keyCode === void 0 && (_this.keyCode = 0);
                _this.relatedObject === void 0 && (_this.relatedObject = null);
                _this.shiftKey === void 0 && (_this.shiftKey = false);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this.relatedObject = relatedObject;
                _this.shiftKey = shiftKey;
                _this.keyCode = keyCode;
                _this.direction = direction;
                return _this;
            }
            FocusEvent.prototype.clone = function () {
                return new FocusEvent(this.type, this.bubbles, this.cancelable, this.relatedObject, this.shiftKey, this.keyCode, this.direction);
            };
            FocusEvent.prototype.toString = function () {
                return this.formatToString("FocusEvent", "type", "bubbles", "cancelable", "eventPhase", "relatedObject", "shiftKey", "keyCode", "direction");
            };
            FocusEvent.FOCUS_IN = "focusIn";
            FocusEvent.FOCUS_OUT = "focusOut";
            FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
            FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
            return FocusEvent;
        }(events.Event));
        events.FocusEvent = FocusEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=FocusEvent.js.map