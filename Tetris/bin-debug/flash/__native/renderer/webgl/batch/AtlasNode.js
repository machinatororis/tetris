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
                    batch.Rectangle = flash.geom.Rectangle;
                    var AtlasNode = (function () {
                        function AtlasNode() {
                            this.childs = null;
                            this.rect = null;
                            this.data = null;
                            this.rect = new batch.Rectangle(0, 0, 1 << 20, 1 << 20);
                            this.childs = [];
                        }
                        AtlasNode.prototype.insert = function (atlasWidth, atlasHeight, width, height, data) {
                            if (this.childs.length > 0) {
                                var newNode = this.childs[0].insert(atlasWidth, atlasHeight, width, height, data);
                                if (newNode != null) {
                                    return newNode;
                                }
                                return this.childs[1].insert(atlasWidth, atlasHeight, width, height, data);
                            }
                            else {
                                if (this.data != null) {
                                    return null;
                                }
                                var rect = this.rect;
                                var w = Math.min(rect.width, atlasWidth - rect.x);
                                if (width > rect.width ||
                                    width > atlasWidth - rect.x ||
                                    height > rect.height ||
                                    height > atlasHeight - rect.y) {
                                    return null;
                                }
                                if (width == rect.width && height == rect.height) {
                                    this.data = data;
                                    return this;
                                }
                                this.childs[this.childs.length] = new AtlasNode;
                                this.childs[this.childs.length] = new AtlasNode;
                                var dw = rect.width - width;
                                var dh = rect.height - height;
                                if (dw > dh) {
                                    this.childs[0].rect.__setTo(rect.x, rect.y, width, rect.height);
                                    this.childs[1].rect.__setTo(rect.x + width, rect.y, rect.width - width, rect.height);
                                }
                                else {
                                    this.childs[0].rect.__setTo(rect.x, rect.y, rect.width, height);
                                    this.childs[1].rect.__setTo(rect.x, rect.y + height, rect.width, rect.height - height);
                                }
                                return this.childs[0].insert(atlasWidth, atlasHeight, width, height, data);
                            }
                        };
                        return AtlasNode;
                    }());
                    batch.AtlasNode = AtlasNode;
                })(batch = webgl.batch || (webgl.batch = {}));
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AtlasNode.js.map