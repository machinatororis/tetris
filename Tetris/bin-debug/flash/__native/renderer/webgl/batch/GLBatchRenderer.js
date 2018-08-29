var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                var batch;
                (function (batch) {
                    var GLBatchRenderer = (function () {
                        function GLBatchRenderer(width, height, count) {
                            this._width = 0;
                            this._height = 0;
                            this._atlases = null;
                            this._atlasesLen = 0;
                            this._cleared = 0;
                            width = ((width) >> 0);
                            height = ((height) >> 0);
                            count = ((count) >> 0);
                            if (count < 1)
                                count = 1;
                            if (count > GLBatchRenderer.MAX_ATLASES)
                                count = GLBatchRenderer.MAX_ATLASES;
                            this._width = width;
                            this._height = height;
                            this._atlases = [];
                            while (this._atlasesLen < count) {
                                this.expand();
                            }
                        }
                        GLBatchRenderer.prototype.expand = function () {
                            if (this._atlasesLen >= GLBatchRenderer.MAX_ATLASES) {
                                return;
                            }
                            this._atlases[this._atlasesLen++] = new batch.GLBatchAtlas(this._width, this._height);
                        };
                        GLBatchRenderer.prototype.add = function (image, freeSpace) {
                            if (freeSpace === void 0) { freeSpace = false; }
                            if (this.__add(image)) {
                                return true;
                            }
                            if (!freeSpace) {
                                return false;
                            }
                            this.clearAll();
                            return this.__add(image);
                        };
                        GLBatchRenderer.prototype.getEntry = function (image) {
                            var i = 0;
                            while (i < this._atlasesLen) {
                                var entry = this._atlases[i].getEntry(image);
                                if (entry) {
                                    return entry;
                                }
                                i++;
                            }
                            return null;
                        };
                        GLBatchRenderer.prototype.unusedAll = function () {
                            var i = 0;
                            while (i < this._atlasesLen) {
                                this._atlases[i].unusedAll();
                                i++;
                            }
                        };
                        GLBatchRenderer.prototype.remove = function (image) {
                            var i = 0;
                            while (i < this._atlasesLen) {
                                if (this._atlases[i].remove(image)) {
                                    return;
                                }
                                i++;
                            }
                        };
                        GLBatchRenderer.prototype.gc = function () {
                            var i = 0;
                            while (i < this._atlasesLen) {
                                this._atlases[i].gc();
                                i++;
                            }
                        };
                        GLBatchRenderer.prototype.repack = function () {
                            var i = 0;
                            while (i < this._atlasesLen) {
                                var atlas = this._atlases[i];
                                var tree = atlas.repack();
                                if (tree) {
                                    tree.apply();
                                }
                                i++;
                            }
                        };
                        GLBatchRenderer.prototype.clearAll = function () {
                            var i = 0;
                            while (i < this._atlasesLen) {
                                this._atlases[i].clear();
                                i++;
                            }
                            this._cleared++;
                        };
                        GLBatchRenderer.prototype.getAtlases = function () {
                            return this._atlases;
                        };
                        GLBatchRenderer.prototype.present = function () {
                            this._cleared = 0;
                        };
                        GLBatchRenderer.prototype.__add = function (image) {
                            var i = 0;
                            while (i < this._atlasesLen) {
                                if (this._atlases[i].add(image)) {
                                    return true;
                                }
                                i++;
                            }
                            return false;
                        };
                        GLBatchRenderer.MAX_ATLASES = 16;
                        return GLBatchRenderer;
                    }());
                    batch.GLBatchRenderer = GLBatchRenderer;
                })(batch = webgl.batch || (webgl.batch = {}));
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GLBatchRenderer.js.map