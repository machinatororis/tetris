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
                    batch.BitmapData = flash.display.BitmapData;
                    batch.Matrix = flash.geom.Matrix;
                    var GLBatchAtlas = (function () {
                        function GLBatchAtlas(width, height) {
                            this._width = 0;
                            this._height = 0;
                            this._all = null;
                            this._tree = null;
                            this._atlas = null;
                            this._padding = 0;
                            this._used = false;
                            width = ((width) >> 0);
                            height = ((height) >> 0);
                            this._width = width;
                            this._height = height;
                            this._atlas = new batch.BitmapData(this._width, this._height, true, 0x0);
                            this._all = {};
                            this._tree = new batch.AtlasTree;
                            this._tree.root = this.__createAtlasRoot();
                            this._padding = 2;
                        }
                        GLBatchAtlas.prototype.add = function (image) {
                            var entry = this._all[image._uid];
                            if (!entry) {
                                entry = new batch.AtlasEntry(this, image);
                                entry.width += this._padding;
                                entry.height += this._padding;
                                return this.__insert(entry);
                            }
                            return false;
                        };
                        GLBatchAtlas.prototype.getEntry = function (image) {
                            var entry = this._all[image._uid];
                            if (entry) {
                                this.update(image);
                                this._used = entry.used = true;
                                return entry;
                            }
                            return null;
                        };
                        GLBatchAtlas.prototype.unusedAll = function () {
                            this._used = false;
                            var __for0 = window.asc.in(this._all);
                            for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                                var uid = __for0_1[_i];
                                var entry = this._all[uid];
                                entry.used = false;
                            }
                        };
                        GLBatchAtlas.prototype.update = function (image, clear) {
                            if (clear === void 0) { clear = true; }
                            var entry = this._all[image._uid];
                            if (!entry) {
                                return false;
                            }
                            if (entry.version == image._version) {
                                return false;
                            }
                            entry.version = image._version;
                            if (clear) {
                                this._atlas.fillRect(entry.node.rect, 0x0);
                            }
                            GLBatchAtlas.sHelperMatrix.identity();
                            GLBatchAtlas.sHelperMatrix.__translate(entry.node.rect.x, entry.node.rect.y);
                            this._atlas.__drawWithQuality(image, GLBatchAtlas.sHelperMatrix);
                            return true;
                        };
                        GLBatchAtlas.prototype.remove = function (image) {
                            var uid = image._uid;
                            var entry = this._all[uid];
                            if (!entry) {
                                return false;
                            }
                            this._atlas.fillRect(entry.node.rect, 0x0);
                            image.__stopListeningDispose();
                            delete this._all[uid];
                            delete this._tree.hash[uid];
                            var i = this._tree.list.indexOf(entry);
                            if (i >= 0) {
                                this._tree.list.splice(i, 1);
                            }
                            entry.node = null;
                            entry.atlas = null;
                            entry.regions = null;
                            entry.image = null;
                            return true;
                        };
                        GLBatchAtlas.prototype.repack = function () {
                            var pack = new batch.AtlasTree;
                            var all = this._tree.list.slice(0);
                            all.sort(function (a, b) {
                                if (b.width == a.width) {
                                    return b.height - a.height;
                                }
                                return b.width - a.width;
                            }.__bind(this));
                            var root = this.__createAtlasRoot();
                            pack.root = root;
                            var __for1 = window.asc.in(this._all);
                            for (var _i = 0, __for1_1 = __for1; _i < __for1_1.length; _i++) {
                                var uid = __for1_1[_i];
                                var entry = this._all[uid];
                                var node = root.insert(this._width, this._height, entry.width, entry.height, entry);
                                if (!node) {
                                    return null;
                                }
                                else {
                                    pack.hash[entry.image._uid] = node;
                                }
                            }
                            pack.parent = this;
                            return pack;
                        };
                        GLBatchAtlas.prototype.gc = function () {
                            if (!this._used) {
                                this.clear();
                                return;
                            }
                            var __for2 = window.asc.in(this._all);
                            for (var _i = 0, __for2_1 = __for2; _i < __for2_1.length; _i++) {
                                var uid = __for2_1[_i];
                                var entry = this._all[uid];
                                if (entry.used) {
                                    continue;
                                }
                                this.remove(entry.image);
                            }
                        };
                        GLBatchAtlas.prototype.clear = function () {
                            this._atlas.fillRect(this._atlas._rect, 0x0);
                            this._all = {};
                            this._tree = new batch.AtlasTree;
                            this._tree.root = this.__createAtlasRoot();
                        };
                        GLBatchAtlas.prototype.getAtlas = function () {
                            return this._atlas;
                        };
                        GLBatchAtlas.prototype.__applyAtlasTree = function (pack) {
                            this._tree.root = pack.root;
                            this._tree.hash = pack.hash;
                            this._atlas.fillRect(this._atlas._rect, 0x0);
                            var __for3 = window.asc.in(this._all);
                            for (var _i = 0, __for3_1 = __for3; _i < __for3_1.length; _i++) {
                                var uid = __for3_1[_i];
                                var entry = this._all[uid];
                                entry.node = pack.hash[entry.image._uid] || null;
                                entry.atlas = entry.node ? this : null;
                                GLBatchAtlas.sHelperMatrix.identity();
                                GLBatchAtlas.sHelperMatrix.__translate(entry.node.rect.x, entry.node.rect.y);
                                this._atlas.__drawWithQuality(entry.image, GLBatchAtlas.sHelperMatrix);
                            }
                        };
                        ;
                        GLBatchAtlas.prototype.__createAtlasRoot = function () {
                            var res = new batch.AtlasNode;
                            res.rect.width = this._width;
                            res.rect.height = this._height;
                            return res;
                        };
                        GLBatchAtlas.prototype.__insert = function (entry) {
                            if (this.__tryInsert(entry)) {
                                entry.image.__startListeningDispose(this.remove.__bind(this));
                                return true;
                            }
                            return false;
                        };
                        GLBatchAtlas.prototype.__tryInsert = function (entry) {
                            var node = this._tree.root.insert(this._width, this._height, entry.width, entry.height, entry);
                            if (!node) {
                                return false;
                            }
                            var uid = entry.image._uid;
                            this._all[uid] = entry;
                            this._tree.hash[uid] = node;
                            this._tree.list[this._tree.list.length] = entry;
                            entry.node = strict(node, batch.AtlasNode);
                            entry.atlas = this;
                            this.update(entry.image, false);
                            return true;
                        };
                        GLBatchAtlas.sHelperMatrix = asc.sti(GLBatchAtlas, function () { GLBatchAtlas.sHelperMatrix = new batch.Matrix; });
                        return GLBatchAtlas;
                    }());
                    batch.GLBatchAtlas = GLBatchAtlas;
                })(batch = webgl.batch || (webgl.batch = {}));
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GLBatchAtlas.js.map