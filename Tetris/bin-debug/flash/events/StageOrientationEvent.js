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
        var StageOrientationEvent = (function (_super) {
            __extends(StageOrientationEvent, _super);
            function StageOrientationEvent(type, bubbles, cancelable, beforeOrientation, afterOrientation) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                if (beforeOrientation === void 0) { beforeOrientation = null; }
                if (afterOrientation === void 0) { afterOrientation = null; }
                var _this = this;
                type = as(type, 'String');
                bubbles = Boolean(bubbles);
                cancelable = Boolean(cancelable);
                beforeOrientation = as(beforeOrientation, 'String');
                afterOrientation = as(afterOrientation, 'String');
                _this.mBeforeOrientation === void 0 && (_this.mBeforeOrientation = null);
                _this.mAfterOrientation === void 0 && (_this.mAfterOrientation = null);
                _this = _super.call(this, type, bubbles, cancelable) || this;
                _this.mBeforeOrientation = beforeOrientation;
                _this.mAfterOrientation = afterOrientation;
                return _this;
            }
            Object.defineProperty(StageOrientationEvent.prototype, "afterOrientation", {
                get: function () {
                    return this.mAfterOrientation;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StageOrientationEvent.prototype, "beforeOrientation", {
                get: function () {
                    return this.mBeforeOrientation;
                },
                enumerable: true,
                configurable: true
            });
            StageOrientationEvent.prototype.clone = function () {
                return new StageOrientationEvent(this.type, this.bubbles, this.cancelable, this.mBeforeOrientation, this.mAfterOrientation);
            };
            StageOrientationEvent.prototype.toString = function () {
                return this.formatToString("StageOrientationEvent", "type", "bubbles", "cancelable", "eventPhase", "beforeOrientation", "afterOrientation");
            };
            StageOrientationEvent.ORIENTATION_CHANGE = "orientationChange";
            StageOrientationEvent.ORIENTATION_CHANGING = "orientationChanging";
            return StageOrientationEvent;
        }(events.Event));
        events.StageOrientationEvent = StageOrientationEvent;
    })(events = flash.events || (flash.events = {}));
})(flash || (flash = {}));
//# sourceMappingURL=StageOrientationEvent.js.map