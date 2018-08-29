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
        display.Matrix = flash.geom.Matrix;
        display.Point = flash.geom.Point;
        display.Rectangle = flash.geom.Rectangle;
        var Bitmap = (function (_super) {
            __extends(Bitmap, _super);
            function Bitmap(bitmapData, pixelSnapping, smoothing) {
                if (bitmapData === void 0) { bitmapData = null; }
                if (pixelSnapping === void 0) { pixelSnapping = "auto"; }
                if (smoothing === void 0) { smoothing = false; }
                var _this = this;
                bitmapData = strict(bitmapData, display.BitmapData);
                pixelSnapping = as(pixelSnapping, 'String');
                smoothing = Boolean(smoothing);
                _this = _super.call(this) || this;
                _this.bitmapData = bitmapData;
                _this._smoothing = smoothing;
                return _this;
            }
            Object.defineProperty(Bitmap.prototype, "pixelSnapping", {
                get: function () { return null; },
                set: function (param1) { param1 = as(param1, 'String'); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Bitmap.prototype, "smoothing", {
                get: function () { return this._smoothing; },
                set: function (value) {
                    value = Boolean(value);
                    this._smoothing = value;
                    this.__setDirty(1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Bitmap.prototype, "bitmapData", {
                get: function () { return this._bitmapData; },
                set: function (value) {
                    value = strict(value, display.BitmapData);
                    if (this._bitmapData == value) {
                        return;
                    }
                    this._bitmapData = value;
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Bitmap.prototype.__getBounds = function (rect, matrix) {
                if (matrix === void 0) { matrix = null; }
                if (!this._bitmapData) {
                    return;
                }
                var bounds = display.Rectangle.__pool.get();
                bounds.__setTo(0, 0, this._bitmapData.width, this._bitmapData.height);
                if (matrix) {
                    bounds.__transform(bounds, matrix);
                }
                rect.__expand(bounds.x, bounds.y, bounds.width, bounds.height);
                display.Rectangle.__pool.release(bounds);
            };
            Bitmap.prototype.__setDirty = function (value, recursive) {
                if (recursive === void 0) { recursive = false; }
                _super.prototype.__setDirty.call(this, value, recursive);
                if (value == 0) {
                    if (this._bitmapData) {
                        this._bitmapData._dirtyDisplayObject = false;
                    }
                }
            };
            Bitmap.prototype.__predraw = function (ctx, skipCache) {
                if (this._bitmapData && !this._bitmapData._invalid) {
                    this._bitmapData.__getTexture();
                    if (this._bitmapData._dirtyDisplayObject) {
                        this.__setDirty(2);
                    }
                }
                return this.__predrawDisplayObject(ctx, skipCache);
            };
            Bitmap.prototype.__draw = function (ctx, dirtyFlag) {
                if (dirtyFlag === void 0) { dirtyFlag = 0; }
                if (this.__drawCache(ctx))
                    return false;
                if (!this._bitmapData || this._bitmapData._invalid)
                    return false;
                ctx.drawImage(this._bitmapData, this._smoothing);
                return true;
            };
            Bitmap.prototype.__doMouse = function (stageX, stageY, isHitArea) {
                if (isHitArea === void 0) { isHitArea = false; }
                if (!isHitArea && (!this._visible || this._maskParent)) {
                    return null;
                }
                var target;
                if (this._bitmapData && !this._bitmapData._invalid) {
                    var globalPoint = display.Point.__pool.get();
                    var localPoint = display.Point.__pool.get();
                    globalPoint.__setTo(stageX, stageY);
                    this.__globalToLocal(globalPoint, localPoint);
                    if (this._bitmapData._rect.__containsPoint(localPoint)) {
                        target = this;
                    }
                }
                display.Point.__pool.release(globalPoint);
                display.Point.__pool.release(localPoint);
                return target;
            };
            Bitmap.prototype.toString = function () {
                return '[object Bitmap]';
            };
            return Bitmap;
        }(display.DisplayObject));
        display.Bitmap = Bitmap;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Bitmap.js.map