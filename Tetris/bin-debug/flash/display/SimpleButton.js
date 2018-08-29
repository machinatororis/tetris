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
        display.MouseEvent = flash.events.MouseEvent;
        display.Matrix = flash.geom.Matrix;
        display.Rectangle = flash.geom.Rectangle;
        display.SoundTransform = flash.media.SoundTransform;
        var SimpleButton = (function (_super) {
            __extends(SimpleButton, _super);
            function SimpleButton(upState, overState, downState, hitTestState) {
                if (upState === void 0) { upState = null; }
                if (overState === void 0) { overState = null; }
                if (downState === void 0) { downState = null; }
                if (hitTestState === void 0) { hitTestState = null; }
                var _this = this;
                upState = strict(upState, display.DisplayObject);
                overState = strict(overState, display.DisplayObject);
                downState = strict(downState, display.DisplayObject);
                hitTestState = strict(hitTestState, display.DisplayObject);
                _this.downState === void 0 && (_this.downState = null);
                _this.enabled === void 0 && (_this.enabled = false);
                _this.hitTestState === void 0 && (_this.hitTestState = null);
                _this.overState === void 0 && (_this.overState = null);
                _this.soundTransform === void 0 && (_this.soundTransform = null);
                _this.trackAsMenu === void 0 && (_this.trackAsMenu = false);
                _this.upState === void 0 && (_this.upState = null);
                _this.useHandCursor === void 0 && (_this.useHandCursor = false);
                _this = _super.call(this) || this;
                _this.upState = upState;
                _this.overState = overState;
                _this.downState = downState;
                _this.hitTestState = hitTestState;
                _this.addEventListener(display.MouseEvent.MOUSE_DOWN, _this.__onMouseDown.__bind(_this));
                _this.addEventListener(display.MouseEvent.MOUSE_OUT, _this.__onMouseOut.__bind(_this));
                _this.addEventListener(display.MouseEvent.MOUSE_OVER, _this.__onMouseOver.__bind(_this));
                _this.addEventListener(display.MouseEvent.MOUSE_UP, _this.__onMouseUp.__bind(_this));
                _this.enabled = true;
                _this.trackAsMenu = false;
                _this.useHandCursor = true;
                _this.__setCurrentState(upState);
                return _this;
            }
            SimpleButton.prototype.__getBounds = function (rect, matrix) {
                if (matrix === void 0) { matrix = null; }
                _super.prototype.__getBounds.call(this, rect, matrix);
                if (!this.__currentState) {
                    return;
                }
                var childWorldTransform = display.Matrix.__pool.get();
                display.DisplayObject.__calculateAbsoluteTransform(this.__currentState.transform._matrix, matrix, childWorldTransform);
                this.__currentState.__getBounds(rect, childWorldTransform);
                display.Matrix.__pool.release(childWorldTransform);
            };
            SimpleButton.prototype.__setDirty = function (value, recursive) {
                if (recursive === void 0) { recursive = false; }
                _super.prototype.__setDirty.call(this, value, recursive);
                if (value == 0) {
                    if (this.__currentState) {
                        this.__currentState.__setDirty(0);
                    }
                }
            };
            SimpleButton.prototype.__predraw = function (ctx, skipCache) {
                var skipChildCache = skipCache == undefined ? this._cacheNeed : skipCache;
                if (this.__currentState && this.__currentState._visible && !this.__currentState._maskParent) {
                    if (this.__currentState.__predraw(ctx, skipChildCache)) {
                        this.__setDirty(2);
                    }
                }
                return this.__predrawDisplayObject(ctx, skipCache);
            };
            SimpleButton.prototype.__draw = function (ctx, dirtyFlag) {
                if (dirtyFlag === void 0) { dirtyFlag = 0; }
                if (this.__drawCache(ctx))
                    return false;
                if (!this.__currentState || !this.__currentState.visible || this.__currentState._maskParent)
                    return false;
                ctx.save();
                this.__currentState.__updateContext(ctx);
                this.__currentState.__draw(ctx, dirtyFlag);
                this.__currentState.__setDirty(dirtyFlag);
                ctx.restore();
                return true;
            };
            SimpleButton.prototype.__doMouse = function (stageX, stageY, isHitArea) {
                if (isHitArea === void 0) { isHitArea = false; }
                if (!isHitArea && (!this._visible || !this._mouseEnabled || this._maskParent)) {
                    return null;
                }
                if (this.hitTestState) {
                    this.hitTestState.__setRenderParent(this);
                    var obj = this.hitTestState.__doMouse(stageX, stageY, true);
                    this.hitTestState.__setRenderParent(this.hitTestState._parent);
                    if (obj) {
                        return this;
                    }
                }
                if (this.__currentState && this.__currentState._visible && !this.__currentState._maskParent) {
                    if (this.__currentState.__doMouse(stageX, stageY, isHitArea)) {
                        if (this.__currentState.__insideVisibleArea(stageX, stageY, isHitArea)) {
                            return this;
                        }
                    }
                }
                return null;
            };
            SimpleButton.prototype.__setStage = function (s, si) {
                if (this._stage === s && this._stageInternal == si) {
                    return false;
                }
                this._stage = s;
                this._stageInternal = si;
                if (this.__currentState) {
                    this.__currentState.__setStage(s, true);
                }
                return true;
            };
            SimpleButton.prototype.__setWorldTransformInvalid = function () {
                if (this._worldTransformInvalid) {
                    return;
                }
                if (this.__currentState) {
                    this.__currentState.__setWorldTransformInvalid();
                }
                this._worldTransformInvalid = true;
            };
            SimpleButton.prototype.__setCurrentState = function (value) {
                if (this.__currentState == value) {
                    return;
                }
                if (this.__currentState) {
                    this.__currentState.__setRenderParent(null);
                    this.__currentState.__setStage(null, false);
                }
                if (value) {
                    var vp = value._parent, vpc;
                    if (vp && (vpc = vp._children)) {
                        vp.__removeChildAt(vpc.indexOf(value));
                    }
                    value.__setRenderParent(this);
                    value.__setStage(this._stage, true);
                }
                this.__currentState = value;
                this.__setDirty(2);
            };
            SimpleButton.prototype.__onMouseDown = function (event) {
                this.__setCurrentState(this.downState);
            };
            SimpleButton.prototype.__onMouseOut = function (event) {
                this.__ignoreEvent = false;
                if (this.__currentState != this.upState) {
                    this.__setCurrentState(this.upState);
                }
            };
            SimpleButton.prototype.__onMouseOver = function (event) {
                if (event.buttonDown) {
                    this.__ignoreEvent = true;
                }
                if (this.__currentState != this.overState && this.overState && !this.__ignoreEvent) {
                    this.__setCurrentState(this.overState);
                }
            };
            SimpleButton.prototype.__onMouseUp = function (event) {
                this.__ignoreEvent = false;
                this.__setCurrentState(this.overState || this.upState);
            };
            SimpleButton.prototype.__unionFilterBounds = function (source, destination) {
                if (destination === void 0) { destination = null; }
                destination = _super.prototype.__unionFilterBounds.call(this, source, destination);
                if (!this.__currentState || !this.__currentState._visible || this.__currentState._maskParent || !this.__currentState._filtersPure || !this.__currentState._filtersPure.length) {
                    return destination;
                }
                destination.__unionInPlace(this.__currentState.__unionFilterBounds(destination, destination));
                return destination;
            };
            SimpleButton.prototype.toString = function () {
                return '[object SimpleButton]';
            };
            return SimpleButton;
        }(display.InteractiveObject));
        display.SimpleButton = SimpleButton;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SimpleButton.js.map