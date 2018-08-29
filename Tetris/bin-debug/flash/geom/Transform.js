var flash;
(function (flash) {
    var geom;
    (function (geom) {
        geom.DisplayObject = flash.display.DisplayObject;
        var Transform = (function () {
            function Transform(displayObject) {
                displayObject = strict(displayObject, geom.DisplayObject);
                this._matrix = new geom.Matrix;
                this._colorTransform = new geom.ColorTransform;
                this._displayObject = displayObject;
                this._hasMatrix = true;
            }
            Object.defineProperty(Transform.prototype, "matrix", {
                get: function () {
                    if (this._hasMatrix) {
                        return this._matrix.clone();
                    }
                    return null;
                },
                set: function (value) {
                    value = strict(value, geom.Matrix);
                    if (value == null) {
                        this._hasMatrix = false;
                        return null;
                    }
                    var e = this._matrix.__equals(value, false);
                    this._matrix.__copyFrom(value);
                    this._hasMatrix = true;
                    if (this._displayObject) {
                        this._displayObject.__setDirty(e ? 1 : 2);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "colorTransform", {
                get: function () { return this._colorTransform; },
                set: function (v) { v = strict(v, geom.ColorTransform); this._colorTransform = v; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "concatenatedMatrix", {
                get: function () {
                    if (this._hasMatrix) {
                        return this._displayObject.__getWorldTransform().clone();
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "concatenatedColorTransform", {
                get: function () {
                    if (!this._concatenatedColorTransform) {
                        this._concatenatedColorTransform = new geom.ColorTransform;
                    }
                    this._concatenatedColorTransform.alphaOffset = this._colorTransform.alphaOffset;
                    this._concatenatedColorTransform.alphaMultiplier = this._colorTransform.alphaMultiplier;
                    this._concatenatedColorTransform.redOffset = this._colorTransform.redOffset;
                    this._concatenatedColorTransform.redMultiplier = this._colorTransform.redMultiplier;
                    this._concatenatedColorTransform.greenOffset = this._colorTransform.greenOffset;
                    this._concatenatedColorTransform.greenMultiplier = this._colorTransform.greenMultiplier;
                    this._concatenatedColorTransform.blueOffset = this._colorTransform.blueOffset;
                    this._concatenatedColorTransform.blueMultiplier = this._colorTransform.blueMultiplier;
                    var parent = this._displayObject._renderParent || this._displayObject._parent;
                    if (parent) {
                        this._concatenatedColorTransform.concat(parent.transform.concatenatedColorTransform);
                    }
                    return this._concatenatedColorTransform;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "pixelBounds", {
                get: function () {
                    if (!this._displayObject) {
                        return null;
                    }
                    return this._displayObject.getBounds(this._displayObject._stage);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "matrix3D", {
                get: function () { return null; },
                set: function (value) { value = strict(value, geom.Matrix3D); },
                enumerable: true,
                configurable: true
            });
            Transform.prototype.getRelativeMatrix3D = function (value) { value = strict(value, geom.DisplayObject); return null; };
            Object.defineProperty(Transform.prototype, "perspectiveProjection", {
                get: function () { return null; },
                set: function (value) { value = strict(value, geom.PerspectiveProjection); },
                enumerable: true,
                configurable: true
            });
            return Transform;
        }());
        geom.Transform = Transform;
    })(geom = flash.geom || (flash.geom = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Transform.js.map