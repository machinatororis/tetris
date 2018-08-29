var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var filters;
    (function (filters) {
        filters.SystemBitmapData = flash.__native.display.SystemBitmapData;
        filters.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        filters.BitmapData = flash.display.BitmapData;
        filters.Context3D = flash.display3D.Context3D;
        filters.Context3DProgramType = flash.display3D.Context3DProgramType;
        filters.Program3D = flash.display3D.Program3D;
        filters.TextureBase = flash.display3D.textures.TextureBase;
        filters.Rectangle = flash.geom.Rectangle;
        var BlurFilter = (function (_super) {
            __extends(BlurFilter, _super);
            function BlurFilter(blurX, blurY, quality) {
                if (blurX === void 0) { blurX = 4.0; }
                if (blurY === void 0) { blurY = 4.0; }
                if (quality === void 0) { quality = 1; }
                var _this = this;
                blurX = (+(blurX));
                blurY = (+(blurY));
                quality = ((quality) >> 0);
                _this.blurX === void 0 && (_this.blurX = NaN);
                _this.blurY === void 0 && (_this.blurY = NaN);
                _this.quality === void 0 && (_this.quality = 0);
                _this.__lastBlurX === void 0 && (_this.__lastBlurX = NaN);
                _this.__lastBlurY === void 0 && (_this.__lastBlurY = NaN);
                _this.__lastQuality === void 0 && (_this.__lastQuality = 0);
                _this.__offsetX === void 0 && (_this.__offsetX = NaN);
                _this.__offsetY === void 0 && (_this.__offsetY = NaN);
                _this.__programBlurX === void 0 && (_this.__programBlurX = null);
                _this.__programBlurY === void 0 && (_this.__programBlurY = null);
                _this.__data === void 0 && (_this.__data = undefined);
                _this.__frag_register_delta === void 0 && (_this.__frag_register_delta = 0);
                _this = _super.call(this) || this;
                if (quality < 1)
                    quality = 1;
                if (quality > 3)
                    quality = 3;
                _this.blurX = blurX;
                _this.blurY = blurY;
                _this.quality = 3;
                _this.__offsetX = _this.__offsetY = 0.0;
                _this.__frag_register_delta = 64;
                _this.__data = [0.0, 0.0];
                return _this;
            }
            BlurFilter.prototype.clone = function () {
                return new BlurFilter(this.blurX, this.blurY, this.quality);
            };
            BlurFilter.prototype.__bounds = function (rect) {
                rect = rect || new filters.Rectangle;
                var x = this.blurX, y = this.blurY;
                if (x <= 0 && y <= 0) {
                    return rect;
                }
                rect.pad(y, x, y, x);
                return rect;
            };
            BlurFilter.prototype.__getHash = function () {
                return this.__fixedHash || [this.blurX, this.blurY, this.quality].toString();
            };
            BlurFilter.prototype.__apply = function (ctx, target, useSystemBuffers) {
                if (useSystemBuffers === void 0) { useSystemBuffers = false; }
                var width = target._systemWidth || target._width, height = target._systemHeight || target._height, transparent = target._transparent;
                var tempBuff, resultBuff;
                if (useSystemBuffers) {
                    resultBuff = filters.SystemBitmapData.__popBuffer(width, height, transparent);
                }
                else {
                    resultBuff = new filters.SystemBitmapData(filters.SystemBitmapData.FILTER, width, height, transparent, 0x0);
                }
                ctx.saveAndReset().clipRect(0, 0, width, height);
                ctx.translate(this.__offsetX, this.__offsetY);
                if (this.blurX > 0 && this.blurY > 0) {
                    this.__setup(ctx, target.__getTexture(), 0);
                    ctx.setRenderToBitmapData(tempBuff = filters.SystemBitmapData.__popBuffer(width, height, transparent));
                    ctx.drawImage(target, true, true);
                    this.__setup(ctx, tempBuff.__getTexture(), 1);
                    ctx.translate(-this.__offsetX, -this.__offsetY);
                    ctx.setRenderToBitmapData(resultBuff);
                    ctx.drawImage(tempBuff, true, true);
                    tempBuff.dispose();
                }
                else {
                    this.__setup(ctx, target.__getTexture(), this.blurX > 0 ? 0 : 1);
                    ctx.setRenderToBitmapData(resultBuff);
                    ctx.drawImage(target, true, true);
                }
                ctx.restore();
                return resultBuff;
            };
            BlurFilter.prototype.__setup = function (ctx, texture, pass) {
                if (pass === void 0) { pass = 0; }
                var context = ctx.context;
                var xChange = this.__lastBlurX != this.blurX;
                var yChange = this.__lastBlurY != this.blurY;
                var qChange = this.__lastQuality != this.quality;
                if (xChange || qChange) {
                    this.__programBlurX = this.__updateShader(context, this.blurX);
                }
                if (yChange || qChange) {
                    this.__programBlurY = this.__updateShader(context, this.blurY);
                }
                this.__lastBlurX = this.blurX;
                this.__lastBlurY = this.blurY;
                this.__lastQuality = this.quality;
                if (pass == 0) {
                    this.__data[0] = this.blurX / texture.__width;
                    this.__data[1] = 0.0;
                    ctx.__setProgram(this.__programBlurX);
                }
                else {
                    this.__data[0] = 0.0;
                    this.__data[1] = this.blurY / texture.__height;
                    ctx.__setProgram(this.__programBlurY);
                }
                context.__setProgramConstantsFromVector(filters.Context3DProgramType.FRAGMENT, this.__frag_register_delta, this.__data, 1);
                return true;
            };
            BlurFilter.prototype.__updateShader = function (context, blur) {
                var vertexShader = this.__privateShaderTemplate(filters.Context3DProgramType.VERTEX);
                var iterations = Math.ceil(Math.max(blur * (this.quality / 3), 3));
                var fragShader = this.__privateShaderTemplate(filters.Context3DProgramType.FRAGMENT);
                fragShader = fragShader.replace(/\{\{delta\}\}/g, 'fc' + this.__frag_register_delta);
                fragShader = fragShader.replace(/\{\{iterations\}\}/g, iterations + '.0');
                return filters.BitmapFilter.__compileProgram(context, vertexShader, fragShader);
            };
            BlurFilter.prototype.__privateShaderTemplate = function (type) {
                if (type == filters.Context3DProgramType.VERTEX)
                    return BlurFilter.VERTEX_SHADER_TEMPLATE;
                else
                    return BlurFilter.FRAG_SHADER_TEMPLATE;
            };
            BlurFilter.VERTEX_SHADER_TEMPLATE = "precision lowp float;\n" +
                "attribute vec2 va0;\n" +
                "attribute vec2 va1;\n" +
                "uniform mat4 vc0;\n" +
                "uniform mat4 vc4;\n" +
                "uniform vec4 vcPositionScale;\n" +
                "varying vec2 vUV;\n" +
                "void main(void) {\n" +
                " vUV = (vc4 * vec4(va1, 0.0, 1.0)).xy;\n" +
                " gl_Position = vc0 * vec4(va0, 0.0, 1.0) * vcPositionScale;\n" +
                "}";
            BlurFilter.FRAG_SHADER_TEMPLATE = "precision lowp float;\n" +
                "uniform vec2 {{delta}};\n" +
                "uniform sampler2D fs0;\n" +
                "varying vec2 vUV;\n" +
                "void main(void) {\n" +
                " vec4 color = vec4(0.0);\n" +
                " float total = 0.0;\n" +
                " for (float t = -{{iterations}}; t <= {{iterations}}; t++) {\n" +
                "  float percent = t / {{iterations}};\n" +
                "  float weight = 1.0 - abs(percent);\n" +
                "  vec4 sample = texture2D(fs0, vUV + {{delta}} * percent);\n" +
                "  color += sample * weight;\n" +
                "  total += weight;\n" +
                " }\n" +
                " gl_FragColor = color/total;\n" +
                "}";
            return BlurFilter;
        }(filters.BitmapFilter));
        filters.BlurFilter = BlurFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BlurFilter.js.map