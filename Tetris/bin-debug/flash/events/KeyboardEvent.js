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
        var KeyboardEvent = (function (_super) {
            __extends(KeyboardEvent, _super);
            function KeyboardEvent(type, bubbles, cancelable, charCodeValue, keyCodeValue, keyLocationValue, ctrlKeyValue, altKeyValue, shiftKeyValue) {
                if (bubbles === void 0) { bubbles = true; }
                if (cancelable === void 0) { cancelable = false; }
                if (charCodeValue === void 0) { charCodeValue = 0; }
                if (keyCodeValue === void 0) { keyCodeValue = 0; }
                if (keyLocationValue === void 0) { keyLocationValue = 0; }
                if (ctrlKeyValue === void 0) { ctrlKeyValue = false; }
                if (altKeyValue === void 0) { altKeyValue = false; }
                if (shiftKeyValue === void 0) { shiftKeyValue = false; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                charCodeValue = ((charCodeValue) >>> 0);
                keyCodeValue = ((keyCodeValue) >>> 0);
                keyLocationValue = ((keyLocationValue) >>> 0);
                ctrlKeyValue = Boolean(ctrlKeyValue);
                altKeyValue = Boolean(altKeyValue);
                shiftKeyValue = Boolean(shiftKeyValue);
                _this._keyLocation === void 0 && (_this._keyLocation = 0);
                _this._charCode === void 0 && (_this._charCode = 0);
                _this._keyCode === void 0 && (_this._keyCode = 0);
                _this._ctrlKey === void 0 && (_this._ctrlKey = false);
                _this._altKey === void 0 && (_this._altKey = false);
                _this._shiftKey === void 0 && (_this._shiftKey = false);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this.charCode = charCodeValue;
                _this.keyCode = keyCodeValue;
                _this.keyLocation = keyLocationValue;
                _this.ctrlKey = ctrlKeyValue;
                _this.altKey = altKeyValue;
                _this.shiftKey = shiftKeyValue;
                return _this;
            }
            KeyboardEvent.prototype.clone = function () {
                return new KeyboardEvent(this.type, this.bubbles, this.cancelable, this.charCode, this.keyCode, this.keyLocation, this.ctrlKey, this.altKey, this.shiftKey);
            };
            KeyboardEvent.prototype.toString = function () {
                return this.formatToString("KeyboardEvent", "type", "bubbles", "cancelable", "eventPhase", "charCode", "keyCode", "keyLocation", "ctrlKey", "altKey", "shiftKey");
            };
            Object.defineProperty(KeyboardEvent.prototype, "charCode", {
                get: function () { return this._charCode; },
                set: function (value) { value = ((value) >>> 0); this._charCode = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyboardEvent.prototype, "keyCode", {
                get: function () { return this._keyCode; },
                set: function (value) { value = ((value) >>> 0); this._keyCode = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyboardEvent.prototype, "keyLocation", {
                get: function () { return this._keyLocation; },
                set: function (value) { value = ((value) >>> 0); this._keyLocation = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyboardEvent.prototype, "ctrlKey", {
                get: function () { return this._ctrlKey; },
                set: function (value) { value = Boolean(value); this._ctrlKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyboardEvent.prototype, "altKey", {
                get: function () { return this._altKey; },
                set: function (value) { value = Boolean(value); this._altKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KeyboardEvent.prototype, "shiftKey", {
                get: function () { return this._shiftKey; },
                set: function (value) { value = Boolean(value); this._shiftKey = value; },
                enumerable: true,
                configurable: true
            });
            KeyboardEvent.prototype.updateAfterEvent = function () {
            };
            KeyboardEvent.KEY_DOWN = "keyDown";
            KeyboardEvent.KEY_UP = "keyUp";
            return KeyboardEvent;
        }(events.Event));
        events.KeyboardEvent = KeyboardEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=KeyboardEvent.js.map