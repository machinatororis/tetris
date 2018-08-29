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
                    var AtlasEntry = (function () {
                        function AtlasEntry(atlas, image) {
                            this.node = null;
                            this.atlas = null;
                            this.regions = null;
                            this.image = null;
                            this.width = 0;
                            this.height = 0;
                            this.used = false;
                            this.version = 0;
                            atlas = strict(atlas, batch.GLBatchAtlas);
                            this.atlas = atlas;
                            this.image = image;
                            this.width = ((image.width) >> 0);
                            this.height = ((image.height) >> 0);
                            this.regions = [];
                            this.used = true;
                            this.version = -1;
                        }
                        return AtlasEntry;
                    }());
                    batch.AtlasEntry = AtlasEntry;
                })(batch = webgl.batch || (webgl.batch = {}));
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AtlasEntry.js.map