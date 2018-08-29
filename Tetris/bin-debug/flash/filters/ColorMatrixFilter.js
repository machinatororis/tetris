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
        filters.WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
        filters.Context3D = flash.display3D.Context3D;
        filters.Context3DProgramType = flash.display3D.Context3DProgramType;
        filters.Program3D = flash.display3D.Program3D;
        filters.TextureBase = flash.display3D.textures.TextureBase;
        filters.Matrix3D = flash.geom.Matrix3D;
        var ColorMatrixFilter = (function (_super) {
            __extends(ColorMatrixFilter, _super);
            function ColorMatrixFilter(matrix) {
                if (matrix === void 0) { matrix = null; }
                var _this = this;
                matrix = strict(matrix, Array);
                _this.matrix === void 0 && (_this.matrix = null);
                _this.__dataMatrix === void 0 && (_this.__dataMatrix = null);
                _this.__dataOffset === void 0 && (_this.__dataOffset = undefined);
                _this = _super.call(this) || this;
                _this.matrix = matrix || [
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ];
                _this.__dataMatrix = new filters.Matrix3D;
                _this.__dataOffset = [0.0, 0.0, 0.0, 0.0];
                return _this;
            }
            ColorMatrixFilter.prototype.clone = function () {
                return new ColorMatrixFilter(this.matrix.concat());
            };
            ColorMatrixFilter.prototype.__getHash = function () {
                return this.__fixedHash || this.matrix.toString();
            };
            ColorMatrixFilter.prototype.__isIdentical = function () {
                if (!this.matrix || this.matrix.length != 20) {
                    return true;
                }
                return this.matrix[0] == 1 && this.matrix[1] == 0 && this.matrix[2] == 0 && this.matrix[3] == 0 && this.matrix[4] == 0 &&
                    this.matrix[5] == 0 && this.matrix[6] == 1 && this.matrix[7] == 0 && this.matrix[8] == 0 && this.matrix[9] == 0 &&
                    this.matrix[10] == 0 && this.matrix[11] == 0 && this.matrix[12] == 1 && this.matrix[13] == 0 && this.matrix[14] == 0 &&
                    this.matrix[15] == 0 && this.matrix[16] == 0 && this.matrix[17] == 0 && this.matrix[18] == 1 && this.matrix[19] == 0;
            };
            ColorMatrixFilter.prototype.__setup = function (ctx, texture, pass) {
                if (pass === void 0) { pass = 0; }
                var context = ctx.context;
                if (!this.__program) {
                    this.__program = this.__updateShader(context);
                }
                ctx.__setProgram(this.__program);
                var i = 0;
                var rawData = this.__dataMatrix.rawData;
                rawData[i++] = this.matrix[0];
                rawData[i++] = this.matrix[1];
                rawData[i++] = this.matrix[2];
                rawData[i++] = this.matrix[3];
                rawData[i++] = this.matrix[5];
                rawData[i++] = this.matrix[6];
                rawData[i++] = this.matrix[7];
                rawData[i++] = this.matrix[8];
                rawData[i++] = this.matrix[10];
                rawData[i++] = this.matrix[11];
                rawData[i++] = this.matrix[12];
                rawData[i++] = this.matrix[13];
                rawData[i++] = this.matrix[15];
                rawData[i++] = this.matrix[16];
                rawData[i++] = this.matrix[17];
                rawData[i++] = this.matrix[18];
                context.__setProgramConstantsFromMatrix(filters.Context3DProgramType.FRAGMENT, 0, this.__dataMatrix);
                i = 0;
                this.__dataOffset[i++] = this.matrix[4] / 255;
                this.__dataOffset[i++] = this.matrix[9] / 255;
                this.__dataOffset[i++] = this.matrix[14] / 255;
                this.__dataOffset[i++] = this.matrix[19] / 255;
                context.__setProgramConstantsFromVector(filters.Context3DProgramType.FRAGMENT, 4, this.__dataOffset, 1);
                return true;
            };
            ColorMatrixFilter.prototype.__updateShader = function (context) {
                var vertexShader = ColorMatrixFilter.VERTEX_SHADER_TEMPLATE;
                var fragShader = ColorMatrixFilter.FRAG_SHADER_TEMPLATE;
                return filters.BitmapFilter.__compileProgram(context, vertexShader, fragShader);
            };
            ColorMatrixFilter.VERTEX_SHADER_TEMPLATE = "precision lowp float;\n" +
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
            ColorMatrixFilter.FRAG_SHADER_TEMPLATE = "precision lowp float;\n" +
                "uniform mat4 fc0;\n" +
                "uniform vec4 fc4;\n" +
                "uniform sampler2D fs0;\n" +
                "varying vec2 vUV;\n" +
                "void main(void) {\n" +
                "	vec4 c = texture2D(fs0, vUV);\n" +
                "	if (c.a > 0.0) c.rgb /= c.a;\n" +
                "	vec4 nc = vec4(0,0,0,0);" +
                "	nc.r = c.r*fc0[0][0] + c.g*fc0[0][1] + c.b*fc0[0][2] + c.a*(fc0[0][3] + fc4[0]);" +
                "	nc.g = c.r*fc0[1][0] + c.g*fc0[1][1] + c.b*fc0[1][2] + c.a*(fc0[1][3] + fc4[1]);" +
                "	nc.b = c.r*fc0[2][0] + c.g*fc0[2][1] + c.b*fc0[2][2] + c.a*(fc0[2][3] + fc4[2]);" +
                "	nc.a = c.r*fc0[3][0] + c.g*fc0[3][1] + c.b*fc0[3][2] + c.a*(fc0[3][3] + fc4[3]);" +
                "	nc = min(nc, 1.);\n	nc = max(nc, 0.);\n" +
                "	gl_FragColor = nc;\n" +
                "	gl_FragColor.rgb *= gl_FragColor.a;\n" +
                "}";
            return ColorMatrixFilter;
        }(filters.BitmapFilter));
        filters.ColorMatrixFilter = ColorMatrixFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ColorMatrixFilter.js.map