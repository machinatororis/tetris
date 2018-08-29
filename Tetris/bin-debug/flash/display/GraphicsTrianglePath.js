var flash;
(function (flash) {
    var display;
    (function (display) {
        var GraphicsTrianglePath = (function () {
            function GraphicsTrianglePath(vertices, indices, uvtData, culling) {
                if (vertices === void 0) { vertices = null; }
                if (indices === void 0) { indices = null; }
                if (uvtData === void 0) { uvtData = null; }
                if (culling === void 0) { culling = "none"; }
                this.implements_flash_display_IGraphicsData = null;
                this.implements_flash_display_IGraphicsPath = null;
                this.indices = undefined;
                this.vertices = undefined;
                this.uvtData = undefined;
                this.culling = null;
                culling = as(culling, 'String');
                this.vertices = this.vertices;
                this.indices = this.indices;
                this.uvtData = this.uvtData;
                this.culling = culling;
            }
            return GraphicsTrianglePath;
        }());
        display.GraphicsTrianglePath = GraphicsTrianglePath;
    })(display = flash.display || (flash.display = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GraphicsTrianglePath.js.map