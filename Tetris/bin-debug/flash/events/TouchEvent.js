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
        events.ByteArray = flash.utils.ByteArray;
        var TouchEvent = (function (_super) {
            __extends(TouchEvent, _super);
            function TouchEvent(type, bubbles, cancelable, touchPointID, isPrimaryTouchPoint, localX, localY, sizeX, sizeY, pressure, relatedObject, ctrlKey, altKey, shiftKey, commandKey, controlKey, timestamp, touchIntent, samples, isTouchPointCanceled) {
                if (bubbles === void 0) { bubbles = true; }
                if (cancelable === void 0) { cancelable = false; }
                if (touchPointID === void 0) { touchPointID = 0; }
                if (isPrimaryTouchPoint === void 0) { isPrimaryTouchPoint = false; }
                if (localX === void 0) { localX = NaN; }
                if (localY === void 0) { localY = NaN; }
                if (sizeX === void 0) { sizeX = NaN; }
                if (sizeY === void 0) { sizeY = NaN; }
                if (pressure === void 0) { pressure = NaN; }
                if (relatedObject === void 0) { relatedObject = null; }
                if (ctrlKey === void 0) { ctrlKey = false; }
                if (altKey === void 0) { altKey = false; }
                if (shiftKey === void 0) { shiftKey = false; }
                if (commandKey === void 0) { commandKey = false; }
                if (controlKey === void 0) { controlKey = false; }
                if (timestamp === void 0) { timestamp = NaN; }
                if (samples === void 0) { samples = null; }
                if (isTouchPointCanceled === void 0) { isTouchPointCanceled = false; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                touchPointID = ((touchPointID) >> 0);
                isPrimaryTouchPoint = Boolean(isPrimaryTouchPoint);
                localX = (+(localX));
                localY = (+(localY));
                sizeX = (+(sizeX));
                sizeY = (+(sizeY));
                pressure = (+(pressure));
                relatedObject = strict(relatedObject, events.InteractiveObject);
                ctrlKey = Boolean(ctrlKey);
                altKey = Boolean(altKey);
                shiftKey = Boolean(shiftKey);
                commandKey = Boolean(commandKey);
                controlKey = Boolean(controlKey);
                timestamp = (+(timestamp));
                touchIntent = as(touchIntent, 'String');
                samples = strict(samples, events.ByteArray);
                isTouchPointCanceled = Boolean(isTouchPointCanceled);
                _this._touchPointID === void 0 && (_this._touchPointID = 0);
                _this._isPrimaryTouchPoint === void 0 && (_this._isPrimaryTouchPoint = false);
                _this._sizeY === void 0 && (_this._sizeY = NaN);
                _this._sizeX === void 0 && (_this._sizeX = NaN);
                _this._pressure === void 0 && (_this._pressure = NaN);
                _this._relatedObject === void 0 && (_this._relatedObject = null);
                _this._isRelatedObjectInaccessible === void 0 && (_this._isRelatedObjectInaccessible = false);
                _this._ctrlKey === void 0 && (_this._ctrlKey = false);
                _this._altKey === void 0 && (_this._altKey = false);
                _this._shiftKey === void 0 && (_this._shiftKey = false);
                _this._localX === void 0 && (_this._localX = 0);
                _this._localY === void 0 && (_this._localY = 0);
                _this._commandKey === void 0 && (_this._commandKey = false);
                _this._controlKey === void 0 && (_this._controlKey = false);
                _this._timestamp === void 0 && (_this._timestamp = NaN);
                _this._touchIntent === void 0 && (_this._touchIntent = null);
                _this._samples === void 0 && (_this._samples = null);
                _this._isTouchPointCanceled === void 0 && (_this._isTouchPointCanceled = false);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this._touchPointID = touchPointID;
                _this._isPrimaryTouchPoint = isPrimaryTouchPoint;
                _this._localX = localX;
                _this._localY = localY;
                _this._sizeX = sizeX;
                _this._sizeY = sizeY;
                _this._pressure = pressure;
                _this._relatedObject = _this.relatedObject;
                _this._ctrlKey = ctrlKey;
                _this._altKey = altKey;
                _this._shiftKey = shiftKey;
                _this._commandKey = commandKey;
                _this._controlKey = controlKey;
                _this._timestamp = timestamp;
                _this._touchIntent = touchIntent;
                _this._samples = samples;
                _this._isTouchPointCanceled = isTouchPointCanceled;
                return _this;
            }
            TouchEvent.prototype.clone = function () {
                return new TouchEvent(this.type, this.bubbles, this.cancelable, this._touchPointID, this._isPrimaryTouchPoint, this._localX, this._localY, this._sizeX, this._sizeY, this._pressure, this._relatedObject, this._ctrlKey, this._altKey, this._shiftKey, this._commandKey, this._controlKey, this._timestamp, this._touchIntent, this._samples, this._isTouchPointCanceled);
            };
            TouchEvent.prototype.toString = function () {
                return this.formatToString("TouchEvent", "type", "bubbles", "cancelable", "eventPhase", "touchPointID", "isPrimaryTouchPoint", "localX", "localY", "stageX", "stageY", "sizeX", "sizeY", "pressure", "relatedObject", "ctrlKey", "altKey", "shiftKey", "commandKey", "controlKey", "timestamp", "touchIntent", "isTouchPointCanceled");
            };
            TouchEvent.prototype.getSamples = function (buffer, append) {
                if (append === void 0) { append = false; }
                buffer = strict(buffer, events.ByteArray);
                append = Boolean(append);
                return 0;
            };
            TouchEvent.prototype.isToolButtonDown = function (index) {
                index = ((index) >> 0);
                return false;
            };
            Object.defineProperty(TouchEvent.prototype, "localX", {
                get: function () { return this._localX; },
                set: function (value) { value = (+(value)); this._localX = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "localY", {
                get: function () { return this._localY; },
                set: function (value) { value = (+(value)); this._localY = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "touchPointID", {
                get: function () { return this._touchPointID; },
                set: function (value) { value = ((value) >> 0); this._touchPointID = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "isPrimaryTouchPoint", {
                get: function () { return this._isPrimaryTouchPoint; },
                set: function (value) { value = Boolean(value); this._isPrimaryTouchPoint = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "sizeX", {
                get: function () { return this._sizeX; },
                set: function (value) { value = (+(value)); this._sizeX = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "sizeY", {
                get: function () { return this._sizeY; },
                set: function (value) { value = (+(value)); this._sizeY = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "pressure", {
                get: function () { return this._pressure; },
                set: function (value) { value = (+(value)); this._pressure = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "relatedObject", {
                get: function () { return this._relatedObject; },
                set: function (value) { this._relatedObject = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "ctrlKey", {
                get: function () { return this._ctrlKey; },
                set: function (value) { value = Boolean(value); this._ctrlKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "altKey", {
                get: function () { return this._altKey; },
                set: function (value) { value = Boolean(value); this._altKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "shiftKey", {
                get: function () { return this._shiftKey; },
                set: function (value) { value = Boolean(value); this._shiftKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "commandKey", {
                get: function () { return this._commandKey; },
                set: function (value) { value = Boolean(value); this._commandKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "controlKey", {
                get: function () { return this._controlKey; },
                set: function (value) { value = Boolean(value); this._controlKey = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "timestamp", {
                get: function () { return this._timestamp; },
                set: function (value) { value = (+(value)); this._timestamp = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "touchIntent", {
                get: function () { return this._touchIntent; },
                set: function (value) { value = as(value, 'String'); this._touchIntent = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "stageX", {
                get: function () {
                    if (isNaN(this.localX) || isNaN(this.localY)) {
                        return Number.NaN;
                    }
                    return this.getStageX();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "stageY", {
                get: function () {
                    if (isNaN(this.localX) || isNaN(this.localY)) {
                        return Number.NaN;
                    }
                    return this.getStageY();
                },
                enumerable: true,
                configurable: true
            });
            TouchEvent.prototype.getStageX = function () {
                if (!(is(this.target, events.DisplayObject))) {
                    return 0;
                }
                var p = events.Point.__pool.get();
                p.__setTo(this.localX, this.localY);
                var v = this.target.__localToGlobal(p, p).x;
                events.Point.__pool.release(p);
                return v;
            };
            TouchEvent.prototype.getStageY = function () {
                if (!(is(this.target, events.DisplayObject))) {
                    return 0;
                }
                var p = events.Point.__pool.get();
                p.__setTo(this.localX, this.localY);
                var v = this.target.__localToGlobal(p, p).y;
                events.Point.__pool.release(p);
                return v;
            };
            Object.defineProperty(TouchEvent.prototype, "isRelatedObjectInaccessible", {
                get: function () { return this._isRelatedObjectInaccessible; },
                set: function (value) { value = Boolean(value); this._isRelatedObjectInaccessible = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TouchEvent.prototype, "isTouchPointCanceled", {
                get: function () { return this._isTouchPointCanceled; },
                set: function (value) { value = Boolean(value); this._isTouchPointCanceled = value; },
                enumerable: true,
                configurable: true
            });
            TouchEvent.prototype.updateAfterEvent = function () {
            };
            TouchEvent.TOUCH_BEGIN = "touchBegin";
            TouchEvent.TOUCH_END = "touchEnd";
            TouchEvent.TOUCH_MOVE = "touchMove";
            TouchEvent.TOUCH_OVER = "touchOver";
            TouchEvent.TOUCH_OUT = "touchOut";
            TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
            TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
            TouchEvent.TOUCH_TAP = "touchTap";
            TouchEvent.PROXIMITY_BEGIN = "proximityBegin";
            TouchEvent.PROXIMITY_END = "proximityEnd";
            TouchEvent.PROXIMITY_MOVE = "proximityMove";
            TouchEvent.PROXIMITY_OUT = "proximityOut";
            TouchEvent.PROXIMITY_OVER = "proximityOver";
            TouchEvent.PROXIMITY_ROLL_OUT = "proximityRollOut";
            TouchEvent.PROXIMITY_ROLL_OVER = "proximityRollOver";
            return TouchEvent;
        }(events.Event));
        events.TouchEvent = TouchEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TouchEvent.js.map