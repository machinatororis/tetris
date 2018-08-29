var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                webgl.Context3D = flash.display3D.Context3D;
                webgl.IndexBuffer3D = flash.display3D.IndexBuffer3D;
                var GLIndexBufferSet = (function () {
                    function GLIndexBufferSet(data) {
                        this.data = null;
                        this.dirty = false;
                        this._buff = null;
                        data = strict(data, Uint16Array);
                        this.data = data;
                        this.dirty = true;
                    }
                    GLIndexBufferSet.prototype.getBuff = function (ctx) {
                        if (this._buff == null) {
                            this._buff = ctx.createIndexBuffer(this.data.length);
                        }
                        if (this.dirty) {
                            this._buff.uploadFromTypedArray(this.data);
                            this.dirty = false;
                        }
                        return this._buff;
                    };
                    return GLIndexBufferSet;
                }());
                webgl.GLIndexBufferSet = GLIndexBufferSet;
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GLIndexBufferSet.js.map