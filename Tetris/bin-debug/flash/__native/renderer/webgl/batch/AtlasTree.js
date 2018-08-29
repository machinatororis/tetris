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
                    var AtlasTree = (function () {
                        function AtlasTree() {
                            this.root = null;
                            this.list = new Array;
                            this.hash = {};
                            this.parent = null;
                        }
                        AtlasTree.prototype.apply = function () {
                            if (!this.parent) {
                                return;
                            }
                            this.parent.__applyAtlasTree(this);
                        };
                        return AtlasTree;
                    }());
                    batch.AtlasTree = AtlasTree;
                })(batch = webgl.batch || (webgl.batch = {}));
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AtlasTree.js.map