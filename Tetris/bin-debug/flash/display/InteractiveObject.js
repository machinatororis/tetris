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
    var display;
    (function (display) {
        display.Rectangle = flash.geom.Rectangle;
        display.ContextMenu = flash.ui.ContextMenu;
        var InteractiveObject = (function (_super) {
            __extends(InteractiveObject, _super);
            function InteractiveObject() {
                var _this = _super.call(this) || this;
                _this._mouseEnabled = true;
                return _this;
            }
            Object.defineProperty(InteractiveObject.prototype, "tabEnabled", {
                get: function () { return true; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InteractiveObject.prototype, "tabIndex", {
                get: function () { return 0; },
                set: function (value) { value = ((value) >> 0); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InteractiveObject.prototype, "focusRect", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InteractiveObject.prototype, "mouseEnabled", {
                get: function () { return this._mouseEnabled; },
                set: function (v) { v = Boolean(v); this._mouseEnabled = v; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InteractiveObject.prototype, "doubleClickEnabled", {
                get: function () { return this._doubleClickEnabled; },
                set: function (v) { v = Boolean(v); this._doubleClickEnabled = v; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InteractiveObject.prototype, "softKeyboardInputAreaOfInterest", {
                get: function () { return null; },
                set: function (value) { value = strict(value, display.Rectangle); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InteractiveObject.prototype, "needsSoftKeyboard", {
                get: function () { return false; },
                set: function (value) { value = Boolean(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InteractiveObject.prototype, "contextMenu", {
                get: function () { return this._contextMenu; },
                set: function (value) { value = strict(value, display.ContextMenu); this._contextMenu = value; },
                enumerable: true,
                configurable: true
            });
            InteractiveObject.prototype.requestSoftKeyboard = function () {
                return false;
            };
            InteractiveObject.prototype.__doMouse = function (stageX, stageY, isHitArea) {
                if (isHitArea === void 0) { isHitArea = false; }
                if (!isHitArea && (!this._visible || !this._mouseEnabled || this._maskParent)) {
                    return null;
                }
                return _super.prototype.__doMouse.call(this, stageX, stageY, isHitArea);
            };
            InteractiveObject.prototype.toString = function () {
                return '[object InteractiveObject]';
            };
            return InteractiveObject;
        }(display.DisplayObject));
        display.InteractiveObject = InteractiveObject;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=InteractiveObject.js.map