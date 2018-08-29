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
        display.SystemBitmapData = flash.__native.display.SystemBitmapData;
        display.IFilter = flash.__native.format.swf.data.filters.IFilter;
        display.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        display.Event = flash.events.Event;
        display.EventDispatcher = flash.events.EventDispatcher;
        display.BitmapFilter = flash.filters.BitmapFilter;
        display.ColorMatrixFilter = flash.filters.ColorMatrixFilter;
        display.Matrix = flash.geom.Matrix;
        display.Point = flash.geom.Point;
        display.Rectangle = flash.geom.Rectangle;
        display.Transform = flash.geom.Transform;
        display.Vector3D = flash.geom.Vector3D;
        var DisplayObject = (function (_super) {
            __extends(DisplayObject, _super);
            function DisplayObject() {
                var _this = this;
                _this.implements_flash_display_IBitmapDrawable = null;
                _this._stageInternal === void 0 && (_this._stageInternal = false);
                _this._visible === void 0 && (_this._visible = true);
                _this._offStageEvents === void 0 && (_this._offStageEvents = true);
                _this._blendMode === void 0 && (_this._blendMode = 'normal');
                _this._cacheAsBitmap === void 0 && (_this._cacheAsBitmap = false);
                _this._rsin === void 0 && (_this._rsin = 0);
                _this._rcos === void 0 && (_this._rcos = 1);
                _this._worldTransform === void 0 && (_this._worldTransform = new display.Matrix);
                _this._renderTransform === void 0 && (_this._renderTransform = new display.Matrix);
                _this = _super.call(this) || this;
                if (!_this._name) {
                    _this._name = 'instance' + (DisplayObject.sID++);
                }
                if (!_this.transform) {
                    _this.transform = new display.Transform(_this);
                }
                return _this;
            }
            Object.defineProperty(DisplayObject.prototype, "stage", {
                get: function () { return this._stageInternal ? null : this._stage; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "root", {
                get: function () {
                    return this.__getRoot();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "name", {
                get: function () { return this._name; },
                set: function (v) { v = as(v, 'String'); this._name = v; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "parent", {
                get: function () { return this._parent; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "mask", {
                get: function () { return this._mask; },
                set: function (value) { value = strict(value, DisplayObject); this.__setMask(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "visible", {
                get: function () { return this._visible; },
                set: function (v) {
                    v = Boolean(v);
                    if (this._visible == v) {
                        return;
                    }
                    this._visible = v;
                    this.__setDirty(1, true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "x", {
                get: function () { return this.transform ? this.transform._matrix.tx : 0; },
                set: function (v) {
                    v = (+(v));
                    if (!this.transform) {
                        this.transform = new display.Transform(this);
                    }
                    var m = this.transform._matrix;
                    if (m.tx == v) {
                        return;
                    }
                    m.tx = v;
                    this.__setDirty(1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "y", {
                get: function () { return this.transform ? this.transform._matrix.ty : 0; },
                set: function (v) {
                    v = (+(v));
                    if (!this.transform) {
                        this.transform = new display.Transform(this);
                    }
                    var m = this.transform._matrix;
                    if (m.ty == v) {
                        return;
                    }
                    m.ty = v;
                    this.__setDirty(1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "z", {
                get: function () { return 0; },
                set: function (v) { v = (+(v)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "scaleX", {
                get: function () {
                    if (!this.transform) {
                        return 1;
                    }
                    var m = this.transform._matrix, ma = m.a, mb = m.b;
                    if (mb == 0) {
                        return ma;
                    }
                    return Math.sqrt(ma * ma + mb * mb);
                },
                set: function (v) {
                    v = (+(v));
                    if (!this.transform) {
                        this.transform = new display.Transform(this);
                    }
                    var m = this.transform._matrix;
                    if (m.c == 0) {
                        if (m.a == v) {
                            return;
                        }
                        m.a = v;
                    }
                    else {
                        var a = this._rcos * v;
                        var b = this._rsin * v;
                        if (m.a == a && m.b == b) {
                            return;
                        }
                        m.a = a;
                        m.b = b;
                    }
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "scaleY", {
                get: function () {
                    if (!this.transform) {
                        return 1;
                    }
                    var m = this.transform._matrix, mc = m.c, md = m.d;
                    if (mc == 0) {
                        return md;
                    }
                    return Math.sqrt(mc * mc + md * md);
                },
                set: function (v) {
                    v = (+(v));
                    if (!this.transform) {
                        this.transform = new display.Transform(this);
                    }
                    var m = this.transform._matrix;
                    if (m.c == 0) {
                        if (m.d == v) {
                            return;
                        }
                        m.d = v;
                    }
                    else {
                        var c = -this._rsin * v;
                        var d = this._rcos * v;
                        if (m.c == c && m.d == d) {
                            return;
                        }
                        m.c = c;
                        m.d = d;
                    }
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "scaleZ", {
                get: function () { return 1; },
                set: function (v) { v = (+(v)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "mouseX", {
                get: function () {
                    var s = display.Stage.sCurrent;
                    var p1 = display.Point.__pool.get();
                    var p2 = display.Point.__pool.get();
                    p1.__setTo(s.mouseX, s.mouseY);
                    this.__globalToLocal(p1, p2);
                    var v = p2.x;
                    display.Point.__pool.release(p1);
                    display.Point.__pool.release(p2);
                    return v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "mouseY", {
                get: function () {
                    var s = display.Stage.sCurrent;
                    var p1 = display.Point.__pool.get();
                    var p2 = display.Point.__pool.get();
                    p1.__setTo(s.mouseX, s.mouseY);
                    this.__globalToLocal(p1, p2);
                    var v = p2.y;
                    display.Point.__pool.release(p1);
                    display.Point.__pool.release(p2);
                    return v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "rotation", {
                get: function () {
                    if (!this.transform) {
                        return 0;
                    }
                    var m = this.transform._matrix;
                    return (180 / Math.PI) * Math.atan2(m.d, m.c) - 90;
                },
                set: function (v) {
                    v = (+(v));
                    if (!this.transform) {
                        this.transform = new display.Transform(this);
                    }
                    var m = this.transform._matrix, ma = m.a, mb = m.b, mc = m.c, md = m.d;
                    var r = v * Math.PI / 180;
                    this._rsin = Math.sin(r);
                    this._rcos = Math.cos(r);
                    var sx = mb == 0 ? ma : Math.sqrt(ma * ma + mb * mb);
                    var sy = mc == 0 ? md : Math.sqrt(mc * mc + md * md);
                    var a = this._rcos * sx;
                    var b = this._rsin * sx;
                    var c = -this._rsin * sy;
                    var d = this._rcos * sy;
                    if (m.a == a && m.b == b && m.c == c && m.d == d) {
                        return;
                    }
                    m.a = a;
                    m.b = b;
                    m.c = c;
                    m.d = d;
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "rotationX", {
                get: function () { return 0; },
                set: function (v) { v = (+(v)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "rotationY", {
                get: function () { return 0; },
                set: function (v) { v = (+(v)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "rotationZ", {
                get: function () { return 0; },
                set: function (v) { v = (+(v)); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "alpha", {
                get: function () {
                    if (!this.transform) {
                        return 1;
                    }
                    return this.transform._colorTransform.alphaMultiplier;
                },
                set: function (v) {
                    v = (+(v));
                    if (!this.transform) {
                        this.transform = new display.Transform(this);
                    }
                    var color = this.transform._colorTransform;
                    if (color.alphaMultiplier == v) {
                        return;
                    }
                    color.alphaMultiplier = v;
                    this.__setDirty(1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "width", {
                get: function () {
                    var rect = display.Rectangle.__pool.get();
                    var matrix = this.transform ? this.transform._matrix : null;
                    this.__getBounds(rect, matrix);
                    var width = rect.width;
                    display.Rectangle.__pool.release(rect);
                    return width;
                },
                set: function (v) {
                    v = (+(v));
                    var rect = display.Rectangle.__pool.get();
                    this.getRect(this, rect);
                    var sx = v / rect.width;
                    if (this.scaleX != sx) {
                        this.scaleX = (+(sx));
                    }
                    display.Rectangle.__pool.release(rect);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "height", {
                get: function () {
                    var rect = display.Rectangle.__pool.get();
                    var matrix = this.transform ? this.transform._matrix : null;
                    this.__getBounds(rect, matrix);
                    var height = rect.height;
                    display.Rectangle.__pool.release(rect);
                    return height;
                },
                set: function (v) {
                    v = (+(v));
                    var rect = display.Rectangle.__pool.get();
                    this.getRect(this, rect);
                    var sy = v / rect.height;
                    if (this.scaleY != sy) {
                        this.scaleY = (+(sy));
                    }
                    display.Rectangle.__pool.release(rect);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "cacheAsBitmap", {
                get: function () { return this._cacheAsBitmap; },
                set: function (v) {
                    v = Boolean(v);
                    if (this._cacheAsBitmap == v) {
                        return;
                    }
                    this._cacheAsBitmap = v;
                    this.__setNeedCache();
                    this.__setDirty(1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "opaqueBackground", {
                get: function () { return null; },
                set: function (v) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "scrollRect", {
                get: function () { return this._scrollRect ? this._scrollRect.clone() : null; },
                set: function (value) {
                    value = strict(value, display.Rectangle);
                    if (this._scrollRect == value && (!value || this._scrollRect.__equals(value))) {
                        return;
                    }
                    if (value) {
                        this._scrollRect = this._scrollRect || new display.Rectangle;
                        this._scrollRect.__copyFrom(value);
                    }
                    else {
                        this._scrollRect = null;
                    }
                    this.__setDirty(2);
                    this.__setNeedCache();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "filters", {
                get: function () { return this._filters ? this._filters.concat() : null; },
                set: function (value) { value = strict(value, Array); this.__setFlashFilters(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "blendMode", {
                get: function () { return this._blendMode; },
                set: function (v) {
                    v = as(v, 'String');
                    if (this._blendMode == v) {
                        return;
                    }
                    if (!v || !(v.toUpperCase() in display.BlendMode)) {
                        throw new ArgumentError('Parameter blendMode must be one of the accepted values.', 2008);
                    }
                    this._blendMode = v;
                    this.__setDirty(2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayObject.prototype, "scale9Grid", {
                get: function () { return null; },
                set: function (v) { v = strict(v, display.Rectangle); },
                enumerable: true,
                configurable: true
            });
            DisplayObject.prototype.localToGlobal = function (localPoint) {
                localPoint = strict(localPoint, display.Point);
                return this.__localToGlobal(localPoint, new display.Point);
            };
            DisplayObject.prototype.globalToLocal = function (globalPoint) {
                globalPoint = strict(globalPoint, display.Point);
                return this.__globalToLocal(globalPoint, new display.Point);
            };
            DisplayObject.prototype.getBounds = function (targetSpace, resultRect) {
                if (resultRect === void 0) { resultRect = null; }
                targetSpace = strict(targetSpace, DisplayObject);
                resultRect = strict(resultRect, display.Rectangle);
                var matrix = display.Matrix.__pool.get();
                if (targetSpace != null && targetSpace != this) {
                    matrix.__copyFrom(this.__getWorldTransform());
                    var targetMatrix = display.Matrix.__pool.get();
                    targetMatrix.__copyFrom(targetSpace.__getWorldTransform());
                    targetMatrix.invert();
                    matrix.__concat(targetMatrix);
                    display.Matrix.__pool.release(targetMatrix);
                }
                else {
                    matrix.identity();
                }
                if (resultRect) {
                    resultRect.setEmpty();
                }
                else {
                    resultRect = new display.Rectangle;
                }
                this.__getBounds(resultRect, matrix);
                display.Matrix.__pool.release(matrix);
                return resultRect;
            };
            DisplayObject.prototype.getRect = function (targetSpace, resultRect) {
                if (resultRect === void 0) { resultRect = null; }
                targetSpace = strict(targetSpace, DisplayObject);
                resultRect = strict(resultRect, display.Rectangle);
                return this.getBounds(targetSpace, resultRect);
            };
            Object.defineProperty(DisplayObject.prototype, "loaderInfo", {
                get: function () {
                    return this.__getLoaderInfo();
                },
                enumerable: true,
                configurable: true
            });
            DisplayObject.prototype.hitTestObject = function (obj) {
                obj = strict(obj, DisplayObject);
                if (!obj) {
                    return false;
                }
                return this.getBounds(this).__intersects(obj.getBounds(this));
            };
            DisplayObject.prototype.hitTestPoint = function (x, y, shapeFlag) {
                if (shapeFlag === void 0) { shapeFlag = false; }
                x = (+(x));
                y = (+(y));
                shapeFlag = Boolean(shapeFlag);
                return this.__doMouse(x, y) != null;
            };
            DisplayObject.prototype.globalToLocal3D = function (value) { value = strict(value, display.Point); return null; };
            DisplayObject.prototype.local3DToGlobal = function (value) { value = strict(value, display.Vector3D); return null; };
            Object.defineProperty(DisplayObject.prototype, "metaData", {
                get: function () { return null; },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            DisplayObject.prototype.addEventListener = function (type, listener, useCapture, priority, useWeakReference) {
                if (useCapture === void 0) { useCapture = false; }
                if (priority === void 0) { priority = 0; }
                if (useWeakReference === void 0) { useWeakReference = false; }
                type = as(type, 'String');
                useCapture = Boolean(useCapture);
                priority = ((priority) >> 0);
                useWeakReference = Boolean(useWeakReference);
                if (DisplayObject.sBroadcastEventsList.indexOf(type) > -1) {
                    var dispatchers = DisplayObject.sBroadcastEvents[type];
                    if (dispatchers.indexOf(this) == -1) {
                        dispatchers[dispatchers.length] = this;
                    }
                }
                _super.prototype.addEventListener.call(this, type, listener, useCapture, priority, useWeakReference);
            };
            DisplayObject.prototype.removeEventListener = function (type, listener, useCapture) {
                if (useCapture === void 0) { useCapture = false; }
                type = as(type, 'String');
                useCapture = Boolean(useCapture);
                _super.prototype.removeEventListener.call(this, type, listener, useCapture);
                if (DisplayObject.sBroadcastEventsList.indexOf(type) > -1) {
                    if (!this.hasEventListener(type)) {
                        var dispatchers = DisplayObject.sBroadcastEvents[type];
                        var index = dispatchers.indexOf(this);
                        if (index > -1) {
                            dispatchers.splice(index, 1);
                        }
                    }
                }
            };
            DisplayObject.prototype.dispatchEvent = function (event) {
                event = strict(event, display.Event);
                var stops = this.__dispatchEvent(event);
                if (event.bubbles && this._parent && !stops) {
                    event.eventPhase = 3;
                    this._parent.dispatchEvent(event);
                }
                return stops;
            };
            DisplayObject.prototype.__setMask = function (value) {
                if (this._mask == value) {
                    return;
                }
                if (this._mask) {
                    this._mask.__setMaskParent(null);
                }
                if (this._mask = value) {
                    if (this._mask._maskParent) {
                        this._mask._maskParent.mask = null;
                    }
                    this._mask.__setMaskParent(this);
                }
                this.__setDirty(2);
                this.__setNeedCache();
            };
            DisplayObject.prototype.__insideVisibleArea = function (stageX, stageY, shapeFlag) {
                var globalPoint = display.Point.__pool.get();
                var localPoint = display.Point.__pool.get();
                var bounds = display.Rectangle.__pool.get();
                globalPoint.__setTo(stageX, stageY);
                this.__globalToLocal(globalPoint, localPoint);
                this.__getBounds(bounds);
                var contains = bounds.__containsPoint(localPoint);
                if (contains) {
                    var pt = this, sr, msk;
                    while (pt) {
                        if ((sr = pt._scrollRect) && !sr.__containsPoint(pt.__globalToLocal(globalPoint, localPoint))) {
                            contains = false;
                            break;
                        }
                        if ((msk = pt._mask) && !msk.getBounds(this.__getBase(), bounds).__containsPoint(pt.__globalToLocal(globalPoint, localPoint))) {
                            contains = false;
                            break;
                        }
                        pt = pt._renderParent || pt._parent;
                    }
                }
                display.Rectangle.__pool.release(bounds);
                display.Point.__pool.release(globalPoint);
                display.Point.__pool.release(localPoint);
                return contains;
            };
            DisplayObject.prototype.__enterInternal = function () {
            };
            DisplayObject.prototype.__exitInternal = function (nextFrame) {
            };
            DisplayObject.prototype.__drawEnter = function () {
            };
            DisplayObject.prototype.__drawExit = function () {
            };
            DisplayObject.prototype.__isFocused = function () {
                return false;
            };
            DisplayObject.prototype.__setFocus = function () {
            };
            DisplayObject.prototype.__setFlashFilters = function (value) {
                var f;
                var vlen = value ? value.length : 0;
                for (var i = 0; i < vlen; ++i) {
                    f = strict(value[i], display.BitmapFilter);
                    if (!f) {
                        throw new ArgumentError('Parameter ' + i + ' is of the incorrect type. Should be type Filter.', 2005);
                    }
                }
                this.__setFilters(value, vlen);
            };
            DisplayObject.prototype.__setSWFFilters = function (value) {
                var vlen = value.length;
                for (var i = 0; i < vlen; ++i) {
                    DisplayObject.sProxyFilterList[i] = value[i].filter;
                }
                this.__setFilters(DisplayObject.sProxyFilterList, vlen);
            };
            DisplayObject.prototype.__setFilters = function (value, vlen) {
                var flen = this._filters ? this._filters.length : 0;
                if (!flen && !vlen) {
                    this.__setNeedCache();
                    return;
                }
                if (flen == vlen) {
                    var elen = 0;
                    for (var i = 0; i < vlen; ++i) {
                        var v = value[i];
                        if (this._filterHashes[i] == v.__getHash()) {
                            elen++;
                        }
                    }
                    if (elen == vlen) {
                        return;
                    }
                }
                this._filters = this._filters || [];
                this._filtersPure = this._filtersPure || [];
                this._filterHashes = this._filterHashes || [];
                this._filters.length = this._filtersPure.length = this._filterHashes.length = 0;
                for (i = 0; i < vlen; ++i) {
                    var f = value[i].clone();
                    this._filters[this._filters.length] = f;
                    this._filterHashes[this._filterHashes.length] = f.__getHash();
                    if (f.__notImplemented) {
                        continue;
                    }
                    if (is(f, display.ColorMatrixFilter) && f.__isIdentical()) {
                        continue;
                    }
                    this._filtersPure[this._filtersPure.length] = f;
                }
                this.__setNeedCache();
                this.__setDirty(2);
            };
            DisplayObject.prototype.__setMaskParent = function (value) {
                this._maskParent = value;
                this.__setDirty(2);
            };
            DisplayObject.prototype.__setRenderParent = function (value) {
                this._renderParent = value;
                this.__setDirty(1);
            };
            DisplayObject.prototype.__getBase = function () {
                var currentObject = this, currentParent;
                while (currentParent = currentObject._renderParent || currentObject._parent) {
                    currentObject = currentParent;
                }
                return currentObject;
            };
            DisplayObject.prototype.__getRoot = function () {
                var pt = this;
                while (pt) {
                    if (pt._root) {
                        return pt;
                    }
                    pt = pt._renderParent || pt._parent;
                }
                return null;
            };
            DisplayObject.prototype.__getLoaderInfo = function () {
                var r = this.__getRoot();
                if (r) {
                    return r._loaderInfo;
                }
                return null;
            };
            DisplayObject.prototype.__getBounds = function (rect, matrix) {
                if (matrix === void 0) { matrix = null; }
                if (!this._graphics) {
                    return;
                }
                this._graphics.__getBounds(rect, matrix);
            };
            DisplayObject.prototype.__setDirty = function (value, recursive) {
                if (recursive === void 0) { recursive = false; }
                if (value == -1) {
                    return;
                }
                if (value == 0) {
                    this._dirty = this._dirtyContent = false;
                    if (this._graphics) {
                        this._graphics.dirty = false;
                    }
                    return;
                }
                if (value >= 1) {
                    this._dirty = true;
                    this.__setWorldTransformInvalid();
                    if (this._maskParent) {
                        this._maskParent.__setDirty(2);
                    }
                }
                if (value >= 2) {
                    this._dirtyContent = true;
                }
                if (!recursive) {
                    return;
                }
                var p = this._parent || this._renderParent;
                if (p && !p._dirty) {
                    p.__setDirty(value, recursive);
                }
            };
            DisplayObject.prototype.__setWorldTransformInvalid = function () {
                this._worldTransformInvalid = true;
            };
            DisplayObject.prototype.__setNeedCache = function () {
                this._cacheNeed = (this._filtersPure != null && this._filtersPure.length > 0)
                    || this._cacheAsBitmap == true
                    || this._scrollRect != null
                    || this._mask != null
                    || this._cropBounds == true
                    || this._blendMode != 'normal';
            };
            DisplayObject.prototype.__predraw = function (ctx, skipCache) {
                return this.__predrawDisplayObject(ctx, skipCache);
            };
            DisplayObject.prototype.__predrawDisplayObject = function (ctx, skipCache) {
                if (this._graphics) {
                    if (this._graphics._commandsSize && skipCache != true) {
                        this._graphics.__getCache(this.__getWorldTransform());
                        DisplayObject.__addCachedObject(this);
                    }
                    if (this._graphics.dirty) {
                        this.__setDirty(2);
                    }
                }
                if (!this._cacheNeed) {
                    if (this._cache) {
                        this._cache.dispose();
                        this._cache = null;
                        this._dirtyCache = false;
                        this._cacheTransform.identity();
                    }
                    return this._dirty;
                }
                if (this._dirtyContent) {
                    this._dirtyCache = true;
                }
                if (this._cacheWorldTransform && !this._cacheWorldTransform.__equals(this.__getWorldTransform(), this._mask != null)) {
                    this._dirtyCache = true;
                }
                if (!this._cache || this._dirtyCache) {
                    if (skipCache != true) {
                        this.__updateCache();
                    }
                }
                return this._dirty;
            };
            DisplayObject.prototype.__draw = function (ctx, dirtyFlag) {
                if (dirtyFlag === void 0) { dirtyFlag = 0; }
                return true;
            };
            DisplayObject.prototype.__drawCache = function (ctx) {
                if (!this._cache || this._cacheCreating) {
                    return false;
                }
                var m = this.__getWorldTransform();
                ctx.setTransformFromMatrix(this._cacheTransform);
                ctx.translate(m.tx, m.ty);
                ctx.drawImage(this._cache, true);
                return true;
            };
            DisplayObject.prototype.__updateCache = function () {
                if (this._cacheCreating) {
                    return;
                }
                this._cacheCreating = true;
                var clipRect = display.Rectangle.__pool.get();
                var worldMatrix = this.__getWorldTransform();
                var flen = this._filtersPure ? this._filtersPure.length : 0;
                var needFilters = flen > 0;
                var scrollRect = this._scrollRect;
                var mask = this._mask;
                var needCrop = scrollRect != null || this._cropBounds == true;
                var drawMatrix = display.Matrix.__pool.get();
                drawMatrix.__copyFrom(worldMatrix, false);
                this._cacheWorldTransform = this._cacheWorldTransform || new display.Matrix;
                this._cacheWorldTransform.__copyFrom(worldMatrix);
                this._cacheTransform = this._cacheTransform || new display.Matrix;
                this._cacheTransform.identity();
                var localRect = display.Rectangle.__pool.get();
                this.__getBounds(localRect);
                var globalRect = display.Rectangle.__pool.get();
                globalRect.__copyFrom(localRect);
                if (scrollRect) {
                    globalRect.width = Math.min(scrollRect.width - globalRect.x, globalRect.width);
                    globalRect.height = Math.min(scrollRect.height - globalRect.y, globalRect.height);
                }
                drawMatrix.__transformRectangleInPlace(globalRect);
                var scaleMatrix = display.Matrix.__pool.get();
                scaleMatrix.__scale(drawMatrix.__getScaleX(), drawMatrix.__getScaleY());
                if (needFilters) {
                    this.__unionFilterBounds(globalRect, globalRect);
                    globalRect.__inflateCeil(1, 1);
                }
                var w = Math.max(Math.ceil(globalRect.width), 1);
                var h = Math.max(Math.ceil(globalRect.height), 1);
                var tempBuff;
                if (needCrop) {
                    var buffMatrix = display.Matrix.__pool.get();
                    var tempPoint = display.Point.__pool.get();
                    var transformedLocalRect = display.Rectangle.__pool.get();
                    transformedLocalRect.__copyFrom(localRect);
                    if (scrollRect) {
                        transformedLocalRect.width = Math.min(scrollRect.width - transformedLocalRect.x, transformedLocalRect.width);
                        transformedLocalRect.height = Math.min(scrollRect.height - transformedLocalRect.y, transformedLocalRect.height);
                    }
                    buffMatrix.__copyFrom(scaleMatrix);
                    buffMatrix.__transformRectangleInPlace(transformedLocalRect);
                    buffMatrix.__translate(-transformedLocalRect.x, -transformedLocalRect.y);
                    if (scrollRect) {
                        buffMatrix.__translateTransformed(-scrollRect.x, -scrollRect.y);
                    }
                    tempPoint.__setTo(transformedLocalRect.x, transformedLocalRect.y);
                    drawMatrix.__transformPointInPlace(tempPoint);
                    drawMatrix.__scale(1 / scaleMatrix.a, 1 / scaleMatrix.d);
                    drawMatrix.__translate(-globalRect.x + tempPoint.x / scaleMatrix.a, -globalRect.y + tempPoint.y / scaleMatrix.d);
                    clipRect.__setTo(0, 0, transformedLocalRect.width, transformedLocalRect.height);
                    if (scrollRect) {
                        clipRect.x += -transformedLocalRect.x;
                        clipRect.y += -transformedLocalRect.y;
                    }
                    tempBuff = display.SystemBitmapData.__popBuffer(transformedLocalRect.width, transformedLocalRect.height, true);
                    tempBuff.__drawWithQuality(this, buffMatrix, null, null, clipRect);
                    display.Rectangle.__pool.release(transformedLocalRect);
                    display.Point.__pool.release(tempPoint);
                    display.Matrix.__pool.release(buffMatrix);
                }
                else {
                    drawMatrix.__translate(-globalRect.x, -globalRect.y);
                }
                this._cacheTransform.__translate(globalRect.x, globalRect.y);
                if (this._cache) {
                    if (this._cache.width == w && this._cache.height == h) {
                        this._cache.fillRect(this._cache.rect, 0x0);
                    }
                    else {
                        this._cache.dispose();
                        this._cache = null;
                    }
                }
                if (mask) {
                }
                this._cache = this._cache || new display.SystemBitmapData(display.SystemBitmapData.DISPLAY, w, h, true, 0x0);
                this._cache.__drawWithQuality(tempBuff || this, drawMatrix);
                if (tempBuff) {
                    tempBuff.dispose();
                }
                if (needFilters) {
                    var ctx = this._cache._ctx;
                    for (var i = 0; i < flen; i++) {
                        var filteredSource = this._filtersPure[i].__apply(ctx, this._cache, i < flen - 1);
                        this._cache.dispose();
                        this._cache = strict(filteredSource, display.BitmapData);
                    }
                }
                DisplayObject.__addCachedObject(this);
                if (DisplayObject.sDebugCache) {
                    this._cache.fillRect(new display.Rectangle(0, 0, 5, 5), 0xffff0000);
                    this._cache.fillRect(new display.Rectangle(this._cache._width - 5, this._cache._height - 5, 5, 5), 0xffff0000);
                }
                this._dirty = true;
                this._cacheCreating = this._dirtyCache = false;
                display.Matrix.__pool.release(scaleMatrix);
                display.Matrix.__pool.release(drawMatrix);
                display.Rectangle.__pool.release(localRect);
                display.Rectangle.__pool.release(globalRect);
                display.Rectangle.__pool.release(clipRect);
            };
            DisplayObject.prototype.__unionFilterBounds = function (source, destination) {
                if (destination === void 0) { destination = null; }
                destination = destination || new display.Rectangle;
                destination.__copyFrom(source);
                var len;
                if (!this._filtersPure || !(len = this._filtersPure.length)) {
                    return destination;
                }
                for (var i = 0; i < len; i++) {
                    this._filtersPure[i].__bounds(destination);
                }
                return destination;
            };
            DisplayObject.prototype.__doMouse = function (stageX, stageY, isHitArea) {
                if (isHitArea === void 0) { isHitArea = false; }
                if (!isHitArea && (!this._visible || this._maskParent)) {
                    return null;
                }
                var target;
                if (this._graphics && this._graphics._commandsSize) {
                    var globalPoint = display.Point.__pool.get();
                    var localPoint = display.Point.__pool.get();
                    var bounds = display.Rectangle.__pool.get();
                    globalPoint.__setTo(stageX, stageY);
                    this.__globalToLocal(globalPoint, localPoint);
                    this._graphics.__getBounds(bounds);
                    if (bounds.__containsPoint(localPoint)) {
                        target = this;
                    }
                }
                display.Rectangle.__pool.release(bounds);
                display.Point.__pool.release(globalPoint);
                display.Point.__pool.release(localPoint);
                return target;
            };
            DisplayObject.prototype.__updateContext = function (ctx) {
                this.__updateContextTransformation(ctx);
                ctx.colorTransform(this.transform._colorTransform);
                ctx.blendMode(this._blendMode);
            };
            DisplayObject.prototype.__updateContextTransformation = function (ctx) {
                ctx.setTransformFromMatrix(this.__getWorldTransform());
            };
            DisplayObject.prototype.__getWorldTransform = function () {
                if (this._worldTransformInvalid) {
                    var local = this.transform._matrix;
                    var renderParent = this._renderParent != null ? this._renderParent : this._parent;
                    if (renderParent != null) {
                        DisplayObject.__calculateAbsoluteTransform(local, renderParent.__getWorldTransform(), this._worldTransform);
                        DisplayObject.__calculateAbsoluteTransform(local, renderParent.__getRenderTransform(), this._renderTransform);
                    }
                    else {
                        this._worldTransform.__copyFrom(local);
                        this._renderTransform.__copyFrom(local);
                    }
                    if (this._scrollRect != null) {
                        this._renderTransform.__translateTransformed(-this._scrollRect.x, -this._scrollRect.y);
                    }
                    this._worldTransformInvalid = false;
                }
                return this._worldTransform;
            };
            DisplayObject.prototype.__getRenderTransform = function () {
                this.__getWorldTransform();
                return this._renderTransform;
            };
            DisplayObject.prototype.__setStage = function (s, si, force) {
                if (this._stage === s && this._stageInternal == si && force != true) {
                    return false;
                }
                this._stage = s;
                this._stageInternal = si;
                return true;
            };
            DisplayObject.prototype.__broadcastSetStage = function (s, si, force) {
                if (this.__setStage(s, si, force) && !si) {
                    if (s) {
                        DisplayObject.sEventStage.target = null;
                        this.dispatchEvent(DisplayObject.sEventStage);
                    }
                    else {
                        DisplayObject.sEventNoStage.target = null;
                        this.dispatchEvent(DisplayObject.sEventNoStage);
                    }
                }
            };
            DisplayObject.prototype.__getTransformationMatrix = function (targetSpace, resultMatrix, renderMode) {
                if (renderMode === void 0) { renderMode = false; }
                if (targetSpace && targetSpace != this) {
                    var targetMatrix = display.Matrix.__pool.get();
                    if (renderMode) {
                        resultMatrix.__copyFrom(this.__getRenderTransform());
                        targetMatrix.__copyFrom(targetSpace.__getRenderTransform());
                    }
                    else {
                        resultMatrix.__copyFrom(this.__getWorldTransform());
                        targetMatrix.__copyFrom(targetSpace.__getWorldTransform());
                    }
                    targetMatrix.invert();
                    resultMatrix.__concat(targetMatrix);
                    display.Matrix.__pool.release(targetMatrix);
                }
                else {
                    resultMatrix.identity();
                }
                return resultMatrix;
            };
            DisplayObject.prototype.__localToGlobal = function (localPoint, resultPoint) {
                var m = display.Matrix.__pool.get();
                this.__getTransformationMatrix(this.__getBase(), m, true);
                resultPoint.__copyFrom(localPoint);
                m.__transformPointInPlace(resultPoint);
                display.Matrix.__pool.release(m);
                return resultPoint;
            };
            DisplayObject.prototype.__globalToLocal = function (globalPoint, resultPoint) {
                var m = display.Matrix.__pool.get();
                this.__getTransformationMatrix(this.__getBase(), m, true);
                m.invert();
                resultPoint.__copyFrom(globalPoint);
                m.__transformPointInPlace(resultPoint);
                display.Matrix.__pool.release(m);
                return resultPoint;
            };
            DisplayObject.__calculateAbsoluteTransform = function (local, parentTransform, target) {
                if (parentTransform) {
                    target.a = local.a * parentTransform.a + local.b * parentTransform.c;
                    target.b = local.a * parentTransform.b + local.b * parentTransform.d;
                    target.c = local.c * parentTransform.a + local.d * parentTransform.c;
                    target.d = local.c * parentTransform.b + local.d * parentTransform.d;
                    target.tx = local.tx * parentTransform.a + local.ty * parentTransform.c + parentTransform.tx;
                    target.ty = local.tx * parentTransform.b + local.ty * parentTransform.d + parentTransform.ty;
                }
                else {
                    target.__copyFrom(local);
                }
            };
            DisplayObject.__addCachedObject = function (target) {
                var i = DisplayObject.sCachedObjects.indexOf(target);
                if (i >= 0) {
                    return;
                }
                DisplayObject.sCachedObjects[DisplayObject.sCachedObjects.length] = target;
            };
            DisplayObject.__removeCachedObject = function (target) {
                var i = DisplayObject.sCachedObjects.indexOf(target);
                if (i == -1) {
                    return;
                }
                DisplayObject.sCachedObjects.splice(i, 1);
            };
            DisplayObject.__freeCachedObject = function (target) {
                var i = DisplayObject.sCachedObjects.indexOf(target);
                if (i == -1) {
                    return true;
                }
                var cache = target._cache;
                if (cache) {
                    cache.dispose();
                    target._cache = null;
                }
                if (target._graphics && (cache = target._graphics._cache)) {
                    if (--cache.notStagedFrames > 0) {
                        return false;
                    }
                    cache.dispose();
                    target._graphics._cache = null;
                }
                DisplayObject.sCachedObjects.splice(i, 1);
                return true;
            };
            DisplayObject.__addTimelineObject = function (target) {
                var i = DisplayObject.sTimelineObjects.indexOf(target);
                if (i == -1) {
                    DisplayObject.sTimelineObjects.push(target);
                }
            };
            DisplayObject.__removeTimelineObject = function (target) {
                var i = DisplayObject.sTimelineObjects.indexOf(target);
                if (i >= 0) {
                    DisplayObject.sTimelineObjects.splice(i, 1);
                }
            };
            DisplayObject.__addDOMElement = function (target) {
                var i = DisplayObject.sDOMElements.indexOf(target);
                if (i == -1) {
                    DisplayObject.sDOMElements.push(target);
                }
            };
            DisplayObject.__removeDOMElement = function (target) {
                var i = DisplayObject.sDOMElements.indexOf(target);
                if (i >= 0) {
                    DisplayObject.sDOMElements.splice(i, 1);
                }
            };
            DisplayObject.prototype.toString = function () {
                return '[object DisplayObject]';
            };
            DisplayObject.sID = 0;
            DisplayObject.sCachedObjects = [];
            DisplayObject.sDOMElements = [];
            DisplayObject.sTimelineObjects = [];
            DisplayObject.sProxyFilterList = [];
            DisplayObject.sDebugCache = false;
            DisplayObject.__block0 = function () {
                function $() {
                    DisplayObject.sEventStage = new display.Event(display.Event.ADDED_TO_STAGE);
                    DisplayObject.sEventNoStage = new display.Event(display.Event.REMOVED_FROM_STAGE);
                    DisplayObject.sBroadcastEventsList = [
                        'activate', 'deactivate', 'keyDown', 'keyUp',
                        'enterFrame', 'exitFrame', 'frameConstructed', 'render'
                    ];
                    DisplayObject.sBroadcastEvents = {};
                    for (var i = 0, len = DisplayObject.sBroadcastEventsList.length; i < len; ++i) {
                        DisplayObject.sBroadcastEvents[DisplayObject.sBroadcastEventsList[i]] = [];
                    }
                }
                asc.stb(DisplayObject, $);
            }();
            return DisplayObject;
        }(display.EventDispatcher));
        display.DisplayObject = DisplayObject;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=DisplayObject.js.map