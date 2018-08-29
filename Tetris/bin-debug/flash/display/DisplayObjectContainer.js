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
        var DisplayObjectContainer = (function (_super) {
            __extends(DisplayObjectContainer, _super);
            function DisplayObjectContainer() {
                var _this = this;
                _this._children === void 0 && (_this._children = new Array);
                _this._childrenLength === void 0 && (_this._childrenLength = 0);
                _this._mouseChildren === void 0 && (_this._mouseChildren = true);
                _this = _super.call(this) || this;
                return _this;
            }
            DisplayObjectContainer.prototype.addChild = function (child) {
                child = strict(child, display.DisplayObject);
                return this.__addChildAt(child, this._childrenLength);
            };
            DisplayObjectContainer.prototype.addChildAt = function (child, index) {
                child = strict(child, display.DisplayObject);
                index = ((index) >> 0);
                return this.__addChildAt(child, index);
            };
            DisplayObjectContainer.prototype.removeChild = function (child) {
                child = strict(child, display.DisplayObject);
                if (!this._children) {
                    return child;
                }
                var i = this._children.indexOf(child);
                if (i == -1) {
                    return child;
                }
                return this.__removeChildAt(i);
            };
            DisplayObjectContainer.prototype.removeChildAt = function (i) {
                i = ((i) >> 0);
                return this.__removeChildAt(i);
            };
            DisplayObjectContainer.prototype.getChildIndex = function (child) {
                child = strict(child, display.DisplayObject);
                return this._children ? this._children.indexOf(child) : -1;
            };
            DisplayObjectContainer.prototype.setChildIndex = function (child, index) {
                child = strict(child, display.DisplayObject);
                index = ((index) >> 0);
                if (!this._children) {
                    return;
                }
                var i = this._children.indexOf(child);
                if (i == -1) {
                    return;
                }
                this.__addChildAt(child, index);
            };
            DisplayObjectContainer.prototype.getChildAt = function (index) {
                index = ((index) >> 0);
                return this._children ? this._children[index] : null;
            };
            DisplayObjectContainer.prototype.getChildByName = function (name) {
                name = as(name, 'String');
                for (var i = 0; i < this._childrenLength; i++) {
                    var child = this._children[i];
                    if (child.name == name) {
                        return child;
                    }
                }
                return null;
            };
            Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
                get: function () { return this._childrenLength; },
                enumerable: true,
                configurable: true
            });
            DisplayObjectContainer.prototype.getObjectsUnderPoint = function (p) { p = strict(p, display.Point); return null; };
            DisplayObjectContainer.prototype.areInaccessibleObjectsUnderPoint = function (p) { p = strict(p, display.Point); return false; };
            Object.defineProperty(DisplayObjectContainer.prototype, "tabChildren", {
                get: function () { return false; },
                set: function (v) { v = Boolean(v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObjectContainer.prototype, "mouseChildren", {
                get: function () { return this._mouseChildren; },
                set: function (v) { v = Boolean(v); this._mouseChildren = v; },
                enumerable: true,
                configurable: true
            });
            DisplayObjectContainer.prototype.contains = function (child) {
                child = strict(child, display.DisplayObject);
                return this._children && this._children.indexOf(child) != -1;
            };
            DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
                index1 = ((index1) >> 0);
                index2 = ((index2) >> 0);
                if (!this._children) {
                    return;
                }
                if (!this._children[index1] || !this._children[index2]) {
                    return;
                }
                var temp = this._children[index1];
                this._children[index1] = this._children[index2];
                this._children[index2] = temp;
                if (!this._dirtyContent) {
                    this.__setDirty(2);
                }
            };
            DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
                child1 = strict(child1, display.DisplayObject);
                child2 = strict(child2, display.DisplayObject);
                this.swapChildrenAt(this.getChildIndex(child1), this.getChildIndex(child2));
            };
            DisplayObjectContainer.prototype.removeChildren = function (start, len) {
                if (start === void 0) { start = 0; }
                if (len === void 0) { len = 2147483647; }
                start = ((start) >> 0);
                len = ((len) >> 0);
                for (var i = Math.min(this._childrenLength - 1, start + len - 1); i >= start; i--) {
                    this.__removeChildAt(i);
                }
            };
            DisplayObjectContainer.prototype.stopAllMovieClips = function (unload) {
                if (unload === void 0) { unload = false; }
                unload = Boolean(unload);
                for (var i = 0; i < this._childrenLength; i++) {
                    var child = this._children[i];
                    if (is(child, DisplayObjectContainer)) {
                        child.stopAllMovieClips(unload);
                    }
                }
                if (unload) {
                    this.removeEventListeners();
                }
            };
            DisplayObjectContainer.prototype.__addChildAt = function (child, index) {
                if (!this._children) {
                    this._children = new Array;
                    this._childrenLength = 0;
                }
                if (index < 0) {
                    index = 0;
                }
                if (index > this._childrenLength) {
                    index = this._childrenLength;
                }
                var childStage;
                var childParent = child._parent;
                if (childParent) {
                    if (childParent == this) {
                        if (this._childrenLength == 1) {
                            return child;
                        }
                        var childIndex = this._children.indexOf(child);
                        if (childIndex < index) {
                            if (childIndex + 1 == this._childrenLength) {
                                return child;
                            }
                            if (index == this._childrenLength) {
                                index = ((this._childrenLength - 1) >> 0);
                            }
                            for (var i = childIndex + 1; i <= index; ++i) {
                                this._children[i - 1] = this._children[i];
                            }
                        }
                        else if (childIndex > index) {
                            for (var i = childIndex - 1; i >= index; --i) {
                                this._children[i + 1] = this._children[i];
                            }
                        }
                        else {
                            return child;
                        }
                        this._children[index] = child;
                        if (!this._dirtyContent) {
                            this.__setDirty(2);
                        }
                        return child;
                    }
                    else {
                        var childIndex = childParent._children.indexOf(child);
                        childStage = child._stage;
                        childParent.__removeChildAt(childIndex, false);
                    }
                }
                for (var i = this._childrenLength - 1; i >= index; --i) {
                    this._children[i + 1] = this._children[i];
                }
                this._children[index] = child;
                this._childrenLength++;
                if (!child._dirty) {
                    child.__setDirty(1);
                }
                child._parent = child._renderParent = this;
                if (childStage == null) {
                    child.__broadcastSetStage(this._stage, this._stageInternal);
                }
                if (!this._dirtyContent) {
                    this.__setDirty(2);
                }
                return child;
            };
            DisplayObjectContainer.prototype.__removeChildAt = function (index) {
                if (!this._children || index < 0 || index >= this._childrenLength) {
                    return null;
                }
                var child = this._children[index];
                if (!child) {
                    return null;
                }
                for (var i = index + 1; i < this._childrenLength; ++i) {
                    this._children[i - 1] = this._children[i];
                }
                this._children[--this._childrenLength] = null;
                if (arguments[1] != false) {
                    child._parent = child._renderParent = null;
                    if (!child._dirty) {
                        child.__setDirty(1);
                    }
                    child.__broadcastSetStage(null, this._stageInternal);
                }
                if (!this._dirtyContent) {
                    this.__setDirty(2);
                }
                return child;
            };
            DisplayObjectContainer.prototype.__getBounds = function (rect, matrix) {
                if (matrix === void 0) { matrix = null; }
                _super.prototype.__getBounds.call(this, rect, matrix);
                if (this._childrenLength == 0)
                    return;
                var childWorldTransform = display.Matrix.__pool.get();
                for (var i = 0; i < this._childrenLength; i++) {
                    var child = this._children[i];
                    if (child.scaleX == 0 || child.scaleY == 0)
                        continue;
                    display.DisplayObject.__calculateAbsoluteTransform(child.transform._matrix, matrix, childWorldTransform);
                    child.__getBounds(rect, childWorldTransform);
                }
                display.Matrix.__pool.release(childWorldTransform);
            };
            DisplayObjectContainer.prototype.__predraw = function (ctx, skipCache) {
                var skipChildCache = skipCache == undefined ? this._cacheNeed : skipCache;
                for (var i = this._childrenLength - 1; i >= 0; i--) {
                    var child = this._children[i];
                    if (!child._visible || child._maskParent) {
                        continue;
                    }
                    if (child.__predraw(ctx, skipChildCache) && !this._dirtyContent) {
                        this.__setDirty(2);
                    }
                }
                return this.__predrawDisplayObject(ctx, skipCache);
            };
            DisplayObjectContainer.prototype.__draw = function (ctx, dirtyFlag) {
                if (dirtyFlag === void 0) { dirtyFlag = 0; }
                if (this.__drawCache(ctx))
                    return false;
                for (var i = 0; i < this._childrenLength; i++) {
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
            DisplayObjectContainer.prototype.__doMouse = function (stageX, stageY, isHitArea) {
                if (isHitArea === void 0) { isHitArea = false; }
                if (!isHitArea && (!this._visible || (!this._mouseEnabled && !this._mouseChildren) || this._maskParent)) {
                    return null;
                }
                var target = null;
                var len = this._childrenLength - 1;
                for (var i = len; i >= 0; i--) {
                    var child = this._children[i];
                    if (!child._visible || child._maskParent) {
                        continue;
                    }
                    var obj = child.__doMouse(stageX, stageY, isHitArea);
                    if (!obj) {
                        continue;
                    }
                    if (!obj.__insideVisibleArea(stageX, stageY, isHitArea)) {
                        continue;
                    }
                    if (!this._mouseChildren) {
                        return this;
                    }
                    if (is(obj, display.InteractiveObject)) {
                        return obj;
                    }
                    target = obj;
                }
                if (!this.mouseEnabled) {
                    return null;
                }
                if (target) {
                    return this;
                }
                return _super.prototype.__doMouse.call(this, stageX, stageY, isHitArea);
            };
            DisplayObjectContainer.prototype.__setStage = function (s, si, force) {
                if (this._stage === s && this._stageInternal == si && force != true) {
                    return false;
                }
                this._stage = s;
                this._stageInternal = si;
                for (var i = 0; i < this._childrenLength; i++) {
                    this._children[i].__broadcastSetStage(s, si, force);
                }
                return true;
            };
            DisplayObjectContainer.prototype.__setWorldTransformInvalid = function () {
                if (this._worldTransformInvalid) {
                    return;
                }
                for (var i = 0; i < this._childrenLength; i++) {
                    this._children[i].__setWorldTransformInvalid();
                }
                this._worldTransformInvalid = true;
            };
            DisplayObjectContainer.prototype.__unionFilterBounds = function (source, destination) {
                if (destination === void 0) { destination = null; }
                destination = _super.prototype.__unionFilterBounds.call(this, source, destination);
                var len = this._childrenLength;
                for (var i = 0; i < len; i++) {
                    var child = this._children[i];
                    if (!child || !child._visible || child._maskParent || !child._filtersPure || !child._filtersPure.length) {
                        continue;
                    }
                    destination.__unionInPlace(child.__unionFilterBounds(destination, destination));
                }
                return destination;
            };
            DisplayObjectContainer.prototype.toString = function () {
                return '[object DisplayObjectContainer]';
            };
            return DisplayObjectContainer;
        }(display.InteractiveObject));
        display.DisplayObjectContainer = DisplayObjectContainer;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=DisplayObjectContainer.js.map