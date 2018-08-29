var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                var GLDrawable = (function () {
                    function GLDrawable(posData, uvData, iData, usage) {
                        this.pos = null;
                        this.uv = null;
                        this.index = null;
                        this.numTriangles = -1;
                        this._usage = NaN;
                        posData = strict(posData, Float32Array);
                        uvData = strict(uvData, Float32Array);
                        iData = strict(iData, Uint16Array);
                        usage = (+(usage));
                        this.pos = new webgl.GLVertexBufferSet(posData, 2);
                        this.uv = new webgl.GLVertexBufferSet(uvData, 2);
                        this.index = new webgl.GLIndexBufferSet(iData);
                        this._usage = usage;
                    }
                    return GLDrawable;
                }());
                webgl.GLDrawable = GLDrawable;
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GLDrawable.js.map