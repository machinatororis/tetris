var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                webgl.TextureBase = flash.display3D.textures.TextureBase;
                webgl.ColorTransform = flash.geom.ColorTransform;
                webgl.Matrix = flash.geom.Matrix;
                webgl.Rectangle = flash.geom.Rectangle;
                var GLCanvasState = (function () {
                    function GLCanvasState() {
                        this.matrix = new webgl.Matrix;
                        this.rect = new webgl.Rectangle;
                        this.color = new webgl.ColorTransform;
                        this.blendMode = 'normal';
                        this.renderToTexture = null;
                    }
                    return GLCanvasState;
                }());
                webgl.GLCanvasState = GLCanvasState;
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GLCanvasState.js.map