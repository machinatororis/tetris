var flash;
(function (flash) {
    var filters;
    (function (filters) {
        filters.SystemBitmapData = flash.__native.display.SystemBitmapData;
        filters.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        filters.BitmapData = flash.display.BitmapData;
        filters.Context3D = flash.display3D.Context3D;
        filters.Program3D = flash.display3D.Program3D;
        filters.TextureBase = flash.display3D.textures.TextureBase;
        filters.Rectangle = flash.geom.Rectangle;
        var BitmapFilter = (function () {
            function BitmapFilter() {
            }
            BitmapFilter.prototype.clone = function () {
                return null;
            };
            BitmapFilter.prototype.__bounds = function (rect) {
                return rect;
            };
            BitmapFilter.prototype.__getHash = function () {
                return null;
            };
            BitmapFilter.prototype.__setFixedHash = function () {
                this.__fixedHash = this.__getHash();
                return this;
            };
            BitmapFilter.prototype.__apply = function (ctx, target, useSystemBuffers) {
                if (useSystemBuffers === void 0) { useSystemBuffers = false; }
                var width = target._systemWidth || target._width, height = target._systemHeight || target._height, transparent = target._transparent;
                var resultBuff;
                if (useSystemBuffers) {
                    resultBuff = filters.SystemBitmapData.__popBuffer(width, height, transparent, !this.__replaceContent);
                    resultBuff._tempWidth = width;
                    resultBuff._tempHeight = height;
                }
                else {
                    resultBuff = new filters.SystemBitmapData(filters.SystemBitmapData.FILTER, width, height, transparent, 0x0);
                }
                ctx.saveAndReset().clipRect(0, 0, width, height);
                var externalProgram = this.__setup(ctx, target.__getTexture());
                ctx.setRenderToBitmapData(resultBuff);
                ctx.drawImage(target, false, externalProgram);
                ctx.restore();
                return resultBuff;
            };
            BitmapFilter.prototype.__setup = function (ctx, texture, pass) {
                if (pass === void 0) { pass = 0; }
                return false;
            };
            BitmapFilter.__shaderNumRegisters = function (dataLength) {
                return BitmapFilter.__round(dataLength, 4) >> 2;
            };
            BitmapFilter.__round = function (value, to) {
                if (value % to == 0) {
                    return value;
                }
                else {
                    return ((value / to | 0) + 1) * to;
                }
            };
            BitmapFilter.__compileProgram = function (context, vertexShader, fragShader) {
                var hash = vertexShader + '\n' + fragShader;
                var program = strict(BitmapFilter.sHelperShaderMap[hash], filters.Program3D);
                if (!program) {
                    program = BitmapFilter.sHelperShaderMap[hash] = context.createProgram();
                    program.__uploadFromGLSL(vertexShader, fragShader);
                }
                return program;
            };
            BitmapFilter.sHelperShaderMap = {};
            return BitmapFilter;
        }());
        filters.BitmapFilter = BitmapFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapFilter.js.map