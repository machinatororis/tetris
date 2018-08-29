var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                webgl.Context3D = flash.display3D.Context3D;
                webgl.VertexBuffer3D = flash.display3D.VertexBuffer3D;
                var GLVertexBufferSet = (function () {
                    function GLVertexBufferSet(data, data32PerVertex) {
                        this.data = null;
                        this.data32PerVertex = 0;
                        this.dirty = false;
                        this._buff = null;
                        data32PerVertex = ((data32PerVertex) >> 0);
                        this.data32PerVertex = data32PerVertex;
                        this.data = data;
                        this.dirty = true;
                    }
                    GLVertexBufferSet.prototype.getBuff = function (ctx) {
                        if (this._buff == null) {
                            this._buff = ctx.createVertexBuffer(this.data.length / this.data32PerVertex, this.data32PerVertex);
                        }
                        if (this.dirty) {
                            this._buff.uploadFromTypedArray(this.data);
                            this.dirty = false;
                        }
                        return this._buff;
                    };
                    return GLVertexBufferSet;
                }());
                webgl.GLVertexBufferSet = GLVertexBufferSet;
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GLVertexBufferSet.js.map