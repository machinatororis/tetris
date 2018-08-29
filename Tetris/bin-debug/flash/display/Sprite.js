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
        display.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        display.Point = flash.geom.Point;
        display.Rectangle = flash.geom.Rectangle;
        display.SoundTransform = flash.media.SoundTransform;
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite() {
                var _this = this;
                _this._useHandCursor === void 0 && (_this._useHandCursor = true);
                _this = _super.call(this) || this;
                return _this;
            }
            Object.defineProperty(Sprite.prototype, "graphics", {
                get: function () { return this._graphics || (this._graphics = new display.Graphics); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "buttonMode", {
                get: function () { return this._buttonMode; },
                set: function (value) { value = Boolean(value); this._buttonMode = value; },
                enumerable: true,
                configurable: true
            });
            Sprite.prototype.startDrag = function (lockCenter, bounds) {
                if (lockCenter === void 0) { lockCenter = false; }
                if (bounds === void 0) { bounds = null; }
                lockCenter = Boolean(lockCenter);
                bounds = strict(bounds, display.Rectangle);
                if (Sprite.sDragObject) {
                    Sprite.sDragObject.stopDrag();
                }
                if (!this._parent) {
                    return;
                }
                Sprite.sDragObject = this;
                if (bounds) {
                    Sprite.sDragBounds.__copyFrom(bounds);
                }
                else {
                    Sprite.sDragBounds.setEmpty();
                }
                if (Sprite.sDragLockCenter = lockCenter) {
                    Sprite.sDragStagePoint.__setTo(0x8000000, 0x8000000);
                }
                else {
                    var p1 = display.Point.__pool.get();
                    var p2 = display.Point.__pool.get();
                    var s = display.Stage.sCurrent;
                    p1.__setTo(s.mouseX, s.mouseY);
                    Sprite.sDragObject._parent.__globalToLocal(p1, p2);
                    Sprite.sDragStagePoint.__setTo(p2.x, p2.y);
                    display.Point.__pool.release(p1);
                    display.Point.__pool.release(p2);
                }
                Sprite.__updateDragObject();
            };
            Sprite.prototype.stopDrag = function () {
                Sprite.sDragObject = null;
            };
            Sprite.prototype.startTouchDrag = function (touchPointID, lockCenter, bounds) {
                if (lockCenter === void 0) { lockCenter = false; }
                if (bounds === void 0) { bounds = null; }
                touchPointID = ((touchPointID) >> 0);
                lockCenter = Boolean(lockCenter);
                bounds = strict(bounds, display.Rectangle);
            };
            Sprite.prototype.stopTouchDrag = function (touchPointID) { touchPointID = ((touchPointID) >> 0); };
            Object.defineProperty(Sprite.prototype, "dropTarget", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "hitArea", {
                get: function () { return this._hitArea; },
                set: function (value) { value = strict(value, Sprite); this._hitArea = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "useHandCursor", {
                get: function () { return this._useHandCursor; },
                set: function (value) { value = Boolean(value); this._useHandCursor = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "soundTransform", {
                get: function () { return null; },
                set: function (value) { value = strict(value, display.SoundTransform); },
                enumerable: true,
                configurable: true
            });
            Sprite.prototype.__draw = function (ctx, dirtyFlag) {
                if (dirtyFlag === void 0) { dirtyFlag = 0; }
                if (this.__drawCache(ctx))
                    return false;
                if (this._graphics && this._graphics._commandsSize) {
                    ctx.drawGraphics(this, this._graphics);
                }
                var len = this._childrenLength;
                for (var i = 0; i < len; i++) {
                    var child = this._children[i];
                    if (!child._visible || child._maskParent)
                        continue;
                    ctx.save();
                    child.__updateContext(ctx);
                    child.__draw(ctx, dirtyFlag);
                    child.__setDirty(dirtyFlag);
                    ctx.restore();
                }
                this.__setDirty(dirtyFlag);
                return true;
            };
            Sprite.prototype.__doMouse = function (stageX, stageY, isHitArea) {
                if (isHitArea === void 0) { isHitArea = false; }
                if (!isHitArea && (!this._visible || (!this._mouseEnabled && !this._mouseChildren) || this._maskParent)) {
                    return null;
                }
                if (this._hitArea && this._hitArea != this) {
                    if (this._hitArea.__doMouse(stageX, stageY, true)) {
                        return this;
                    }
                    return null;
                }
                return _super.prototype.__doMouse.call(this, stageX, stageY, isHitArea);
            };
            Sprite.__updateDragObject = function () {
                if (!Sprite.sDragObject) {
                    return;
                }
                if (!Sprite.sDragObject._parent) {
                    Sprite.sDragObject.stopDrag();
                    return;
                }
                var p1 = display.Point.__pool.get();
                var p2 = display.Point.__pool.get();
                var s = display.Stage.sCurrent;
                var mouseX = s.mouseX;
                var mouseY = s.mouseY;
                p1.__setTo(mouseX, mouseY);
                Sprite.sDragObject._parent.__globalToLocal(p1, p2);
                mouseX = p2.x;
                mouseY = p2.y;
                var dx = mouseX - Sprite.sDragStagePoint.x;
                var dy = mouseY - Sprite.sDragStagePoint.y;
                if (dx == 0 && dy == 0) {
                    return;
                }
                var m = Sprite.sDragObject.transform._matrix;
                if (Sprite.sDragLockCenter) {
                    m.tx = mouseX;
                    m.ty = mouseY;
                }
                else {
                    m.tx += dx;
                    m.ty += dy;
                }
                if (!Sprite.sDragBounds.isEmpty()) {
                    var left = Sprite.sDragBounds.x;
                    var top = Sprite.sDragBounds.y;
                    var right = Sprite.sDragBounds.x + Sprite.sDragBounds.width;
                    var bottom = Sprite.sDragBounds.y + Sprite.sDragBounds.height;
                    if (m.tx < left)
                        m.tx = left;
                    if (m.tx > right)
                        m.tx = right;
                    if (m.ty < top)
                        m.ty = top;
                    if (m.ty > bottom)
                        m.ty = bottom;
                }
                Sprite.sDragObject.__setDirty(1);
                Sprite.sDragStagePoint.__setTo(mouseX, mouseY);
                display.Point.__pool.release(p1);
                display.Point.__pool.release(p2);
            };
            Sprite.prototype.toString = function () {
                return '[object Sprite]';
            };
            Sprite.sDragBounds = asc.sti(Sprite, function () { Sprite.sDragBounds = new display.Rectangle; });
            Sprite.sDragStagePoint = asc.sti(Sprite, function () { Sprite.sDragStagePoint = new display.Point; });
            return Sprite;
        }(display.DisplayObjectContainer));
        display.Sprite = Sprite;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Sprite.js.map