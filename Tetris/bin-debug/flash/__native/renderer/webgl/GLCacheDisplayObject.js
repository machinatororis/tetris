var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                webgl.BitmapData = flash.display.BitmapData;
                webgl.Matrix = flash.geom.Matrix;
                var GLCacheDisplayObject = (function () {
                    function GLCacheDisplayObject(cache, cacheWorldTransform) {
                        this.cacheTransform = null;
                        this.notStagedFrames = 1;
                        this._cache = null;
                        this._cacheWorldTransform = null;
                        this._cacheWorldTransformScaleX = NaN;
                        this._cacheWorldTransformScaleY = NaN;
                        cache = strict(cache, webgl.BitmapData);
                        cacheWorldTransform = strict(cacheWorldTransform, webgl.Matrix);
                        this.cacheTransform = strict(webgl.Matrix.__pool.get(), webgl.Matrix);
                        this._cache = cache;
                        this._cacheWorldTransform = strict(webgl.Matrix.__pool.get(), webgl.Matrix);
                        this._cacheWorldTransform.__copyFrom(cacheWorldTransform, false);
                        this._cacheWorldTransformScaleX = cacheWorldTransform.__getScaleX();
                        this._cacheWorldTransformScaleY = cacheWorldTransform.__getScaleY();
                    }
                    GLCacheDisplayObject.prototype.draw = function (ctx, worldTransform) {
                        ctx.saveTransform();
                        var matrixDiffers = !this._cacheWorldTransform.__equals(worldTransform, false);
                        if (matrixDiffers) {
                            var m1 = webgl.Matrix.__pool.get();
                            var m2 = webgl.Matrix.__pool.get();
                            m1.__copyFrom(this._cacheWorldTransform);
                            m1.invert();
                            m2.__copyFrom(worldTransform, false);
                            m1.__concat(m2);
                            m1.__translateTransformed(this.cacheTransform.tx, this.cacheTransform.ty);
                            ctx.setTransformFromMatrix(m1);
                            webgl.Matrix.__pool.release(m1);
                            webgl.Matrix.__pool.release(m2);
                        }
                        else {
                            ctx.setTransformFromMatrix(this.cacheTransform);
                        }
                        ctx.translate(worldTransform.tx, worldTransform.ty);
                        ctx.drawImage(this._cache, matrixDiffers);
                        ctx.restoreTransform();
                    };
                    GLCacheDisplayObject.prototype.getCacheRatio = function (matrix) {
                        var sx = matrix.__getScaleX();
                        var sy = matrix.__getScaleY();
                        var dx = sx > this._cacheWorldTransformScaleX ? sx / this._cacheWorldTransformScaleX : this._cacheWorldTransformScaleX / sx;
                        var dy = sy > this._cacheWorldTransformScaleY ? sy / this._cacheWorldTransformScaleY : this._cacheWorldTransformScaleY / sy;
                        return dx > dy ? dx : dy;
                    };
                    GLCacheDisplayObject.prototype.isCacheValid = function (matrix) {
                        if (!this._cache) {
                            return false;
                        }
                        if (GLCacheDisplayObject.INTERMEDIATE_QUALITY_RATIO <= 1.0) {
                            return this._cacheWorldTransform.__equals(matrix, false);
                        }
                        return this.getCacheRatio(matrix) <= GLCacheDisplayObject.INTERMEDIATE_QUALITY_RATIO;
                    };
                    GLCacheDisplayObject.prototype.dispose = function () {
                        if (this.cacheTransform) {
                            webgl.Matrix.__pool.release(this.cacheTransform);
                            this.cacheTransform = null;
                        }
                        if (this._cacheWorldTransform) {
                            webgl.Matrix.__pool.release(this._cacheWorldTransform);
                            this._cacheWorldTransform = null;
                        }
                        if (this._cache) {
                            this._cache.dispose();
                            this._cache = null;
                        }
                    };
                    GLCacheDisplayObject.INTERMEDIATE_QUALITY_RATIO = 1.25;
                    return GLCacheDisplayObject;
                }());
                webgl.GLCacheDisplayObject = GLCacheDisplayObject;
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GLCacheDisplayObject.js.map