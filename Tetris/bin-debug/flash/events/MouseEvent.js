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
        events.DisplayObject = flash.display.DisplayObject;
        events.InteractiveObject = flash.display.InteractiveObject;
        events.Point = flash.geom.Point;
        var MouseEvent = (function (_super) {
            __extends(MouseEvent, _super);
            function MouseEvent(type, bubbles, cancelable, localX, localY, relatedObject, ctrlKey, altKey, shiftKey, buttonDown, delta, commandKey, controlKey, clickCount) {
                if (bubbles === void 0) { bubbles = true; }
                if (cancelable === void 0) { cancelable = false; }
                if (localX === void 0) { localX = NaN; }
                if (localY === void 0) { localY = NaN; }
                if (relatedObject === void 0) { relatedObject = null; }
                if (ctrlKey === void 0) { ctrlKey = false; }
                if (altKey === void 0) { altKey = false; }
                if (shiftKey === void 0) { shiftKey = false; }
                if (buttonDown === void 0) { buttonDown = false; }
                if (delta === void 0) { delta = 0; }
                if (commandKey === void 0) { commandKey = false; }
                if (controlKey === void 0) { controlKey = false; }
                if (clickCount === void 0) { clickCount = 0; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                localX = (+(localX));
                localY = (+(localY));
                relatedObject = strict(relatedObject, events.InteractiveObject);
                ctrlKey = Boolean(ctrlKey);
                altKey = Boolean(altKey);
                shiftKey = Boolean(shiftKey);
                buttonDown = Boolean(buttonDown);
                delta = ((delta) >> 0);
                commandKey = Boolean(commandKey);
                controlKey = Boolean(controlKey);
                clickCount = ((clickCount) >> 0);
                _this._relatedObject === void 0 && (_this._relatedObject = null);
                _this._ctrlKey === void 0 && (_this._ctrlKey = false);
                _this._altKey === void 0 && (_this._altKey = false);
                _this._shiftKey === void 0 && (_this._shiftKey = false);
                _this._buttonDown === void 0 && (_this._buttonDown = false);
                _this._delta === void 0 && (_this._delta = 0);
                _this._isRelatedObjectInaccessible === void 0 && (_this._isRelatedObjectInaccessible = false);
                _this._localX === void 0 && (_this._localX = NaN);
                _this._localY === void 0 && (_this._localY = NaN);
                _this._commandKey === void 0 && (_this._commandKey = false);
                _this._controlKey === void 0 && (_this._controlKey = false);
                _this._clickCount === void 0 && (_this._clickCount = 0);
                _this._movementX === void 0 && (_this._movementX = NaN);
                _this._movementY === void 0 && (_this._movementY = NaN);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this._localX = localX;
                _this._localY = localY;
                _this._relatedObject = relatedObject;
                _this._ctrlKey = ctrlKey;
                _this._altKey = altKey;
                _this._shiftKey = shiftKey;
                _this._buttonDown = buttonDown;
                _this._delta = delta;
                _this._commandKey = commandKey;
                _this._controlKey = controlKey;
                _this._clickCount = clickCount;
                return _this;
            }
            MouseEvent.prototype.clone = function () {
                return new MouseEvent(this.type, this.bubbles, this.cancelable, this.localX, this.localY, this._relatedObject, this._ctrlKey, this._altKey, this._shiftKey, this._buttonDown, this._delta, this._commandKey, this._controlKey, this._clickCount);
            };
            MouseEvent.prototype.toString = function () {
                return this.formatToString("MouseEvent", "type", "bubbles", "cancelable", "eventPhase", "localX", "localY", "stageX", "stageY", "relatedObject", "ctrlKey", "altKey", "shiftKey", "buttonDown", "delta", "commandKey", "controlKey", "clickCount");
            };
            Object.defineProperty(MouseEvent.prototype, "localX", {
                get: function () { return this._localX; },
                set: function (value) { value = (+(value)); this._localX = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "localY", {
                get: function () { return this._localY; },
                set: function (value) { value = (+(value)); this._localY = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "relatedObject", {
                get: function () { return this._relatedObject; },
                set: function (value) { value = strict(value, events.InteractiveObject); this._relatedObject = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "controlKey", {
                get: function () { return this._controlKey; },
                set: function (value) { value = Boolean(value); this._controlKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "ctrlKey", {
                get: function () { return this._ctrlKey; },
                set: function (value) { value = Boolean(value); this._ctrlKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "altKey", {
                get: function () { return this._altKey; },
                set: function (value) { value = Boolean(value); this._altKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "shiftKey", {
                get: function () { return this._shiftKey; },
                set: function (value) { value = Boolean(value); this._shiftKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "buttonDown", {
                get: function () { return this._buttonDown; },
                set: function (value) { value = Boolean(value); this._buttonDown = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "clickCount", {
                get: function () { return this._clickCount; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "commandKey", {
                get: function () { return this._commandKey; },
                set: function (value) { value = Boolean(value); this._commandKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "delta", {
                get: function () { return this._delta; },
                set: function (value) { value = ((value) >> 0); this._delta = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "stageX", {
                get: function () {
                    if (isNaN(this.localX) || isNaN(this.localY)) {
                        return Number.NaN;
                    }
                    return this.getStageX();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "stageY", {
                get: function () {
                    if (isNaN(this.localX) || isNaN(this.localY)) {
                        return Number.NaN;
                    }
                    return this.getStageY();
                },
                enumerable: true,
                configurable: true
            });
            MouseEvent.prototype.getStageX = function () {
                if (!(is(this.target, events.DisplayObject))) {
                    return 0;
                }
                var p = events.Point.__pool.get();
                p.__setTo(this.localX, this.localY);
                var v = this.target.__localToGlobal(p, p).x;
                events.Point.__pool.release(p);
                return v;
            };
            MouseEvent.prototype.getStageY = function () {
                if (!(is(this.target, events.DisplayObject))) {
                    return 0;
                }
                var p = events.Point.__pool.get();
                p.__setTo(this.localX, this.localY);
                var v = this.target.__localToGlobal(p, p).y;
                events.Point.__pool.release(p);
                return v;
            };
            Object.defineProperty(MouseEvent.prototype, "isRelatedObjectInaccessible", {
                get: function () { return this._isRelatedObjectInaccessible; },
                set: function (value) { value = Boolean(value); this._isRelatedObjectInaccessible = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "movementX", {
                get: function () { return this._movementX; },
                set: function (value) { value = (+(value)); this._movementX = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MouseEvent.prototype, "movementY", {
                get: function () { return this._movementY; },
                set: function (value) { value = (+(value)); this._movementY = value; },
                enumerable: true,
                configurable: true
            });
            MouseEvent.prototype.updateAfterEvent = function () {
            };
            MouseEvent.CLICK = "click";
            MouseEvent.DOUBLE_CLICK = "doubleClick";
            MouseEvent.MOUSE_DOWN = "mouseDown";
            MouseEvent.MOUSE_MOVE = "mouseMove";
            MouseEvent.MOUSE_OUT = "mouseOut";
            MouseEvent.MOUSE_OVER = "mouseOver";
            MouseEvent.MOUSE_UP = "mouseUp";
            MouseEvent.RELEASE_OUTSIDE = "releaseOutside";
            MouseEvent.MOUSE_WHEEL = "mouseWheel";
            MouseEvent.ROLL_OUT = "rollOut";
            MouseEvent.ROLL_OVER = "rollOver";
            MouseEvent.MIDDLE_CLICK = "middleClick";
            MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
            MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
            MouseEvent.RIGHT_CLICK = "rightClick";
            MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
            MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
            MouseEvent.CONTEXT_MENU = "contextMenu";
            return MouseEvent;
        }(events.Event));
        events.MouseEvent = MouseEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MouseEvent.js.map