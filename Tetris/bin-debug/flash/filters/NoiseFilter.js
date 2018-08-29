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
        var NoiseFilter = (function (_super) {
            __extends(NoiseFilter, _super);
            function NoiseFilter(randomSeed, low, high, channelOptions, grayScale, transparent) {
                if (randomSeed === void 0) { randomSeed = 0; }
                if (low === void 0) { low = 0; }
                if (high === void 0) { high = 255; }
                if (channelOptions === void 0) { channelOptions = 7; }
                if (grayScale === void 0) { grayScale = false; }
                if (transparent === void 0) { transparent = true; }
                var _this = this;
                randomSeed = ((randomSeed) >> 0);
                low = ((low) >>> 0);
                high = ((high) >>> 0);
                channelOptions = ((channelOptions) >>> 0);
                grayScale = Boolean(grayScale);
                transparent = Boolean(transparent);
                _this.randomSeed === void 0 && (_this.randomSeed = 0);
                _this.low === void 0 && (_this.low = 0);
                _this.high === void 0 && (_this.high = 0);
                _this.channelOptions === void 0 && (_this.channelOptions = 0);
                _this.grayScale === void 0 && (_this.grayScale = false);
                _this.transparent === void 0 && (_this.transparent = false);
                _this.__data === void 0 && (_this.__data = undefined);
                _this.__dataChannels === void 0 && (_this.__dataChannels = undefined);
                _this = _super.call(this) || this;
                _this.randomSeed = randomSeed;
                _this.low = low;
                _this.high = high;
                _this.channelOptions = channelOptions;
                _this.grayScale = grayScale;
                _this.transparent = transparent;
                _this.__replaceContent = true;
                _this.__data = [0.0, 0.0, 0.0, 0.0];
                _this.__dataChannels = [0.0, 0.0, 0.0, 0.0];
                return _this;
            }
            NoiseFilter.prototype.clone = function () {
                return new NoiseFilter(this.randomSeed, this.low, this.high, this.channelOptions, this.grayScale);
            };
            NoiseFilter.prototype.__getHash = function () {
                return this.__fixedHash || [this.randomSeed, this.low, this.high, this.channelOptions, this.grayScale].toString();
            };
            NoiseFilter.prototype.__setup = function (ctx, texture, pass) {
                if (pass === void 0) { pass = 0; }
                var context = ctx.context;
                if (!this.__program) {
                    this.__program = this.__updateShader(context);
                }
                ctx.__setProgram(this.__program);
                this.__data[0] = this.randomSeed;
                this.__data[1] = this.low / 255.0;
                this.__data[2] = this.high / 255.0;
                this.__data[3] = this.grayScale ? 1.0 : 0.0;
                context.__setProgramConstantsFromVector(filters.Context3DProgramType.FRAGMENT, 32, this.__data, 1);
                this.__dataChannels[0] = ((this.channelOptions & (1 << 0)) >> 0) == 1 ? 1.0 : 0.0;
                this.__dataChannels[1] = ((this.channelOptions & (1 << 1)) >> 1) == 1 ? 1.0 : 0.0;
                this.__dataChannels[2] = ((this.channelOptions & (1 << 2)) >> 2) == 1 ? 1.0 : 0.0;
                this.__dataChannels[3] = this.transparent && ((this.channelOptions & (1 << 3)) >> 3) == 1 ? 1.0 : 0.0;
                context.__setProgramConstantsFromVector(filters.Context3DProgramType.FRAGMENT, 33, this.__dataChannels, 1);
                return true;
            };
            NoiseFilter.prototype.__updateShader = function (context) {
                var vertexShader = NoiseFilter.VERTEX_SHADER_TEMPLATE;
                var fragShader = NoiseFilter.FRAG_SHADER_TEMPLATE;
                return filters.BitmapFilter.__compileProgram(context, vertexShader, fragShader);
            };
            NoiseFilter.VERTEX_SHADER_TEMPLATE = "precision lowp float;\n" +
                "attribute vec2 va0;\n" +
                "uniform mat4 vc0;\n" +
                "uniform vec4 vcPositionScale;\n" +
                "void main(void) {\n" +
                " gl_Position = vc0 * vec4(va0, 0.0, 1.0) * vcPositionScale;\n" +
                "}";
            NoiseFilter.FRAG_SHADER_TEMPLATE = "precision highp float;\n" +
                "uniform vec4 fc32;\n" +
                "uniform vec4 fc33;\n" +
                "float random (vec2 st) {\n" +
                "    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);\n" +
                "}\n" +
                "void main(void) {\n" +
                "	float seed = fc32[0];\n" +
                "	float low = fc32[1];\n" +
                "	float high = fc32[2];\n" +
                "	bool grayScale = fc32[3] != 0.0;\n" +
                "	bool redChannel = fc33[0] != 0.0;\n" +
                "	bool greenChannel = fc33[1] != 0.0;\n" +
                "	bool blueChannel = fc33[2] != 0.0;\n" +
                "	bool alphaChannel = fc33[3] != 0.0;\n" +
                "	vec2 pos = gl_FragCoord.xy;\n" +
                "	float range = high - low;\n" +
                "	if (seed == 0.0) seed = -1.0;\n" +
                "	float rnd1 = random(pos * sin(seed) / 0.785);\n" +
                "	float rnd2 = random(pos * sin(seed) / 1.57);\n" +
                "	float rnd3 = random(pos * sin(seed) / 2.355);\n" +
                "	float rnd4 = random(pos * sin(seed) / 3.14);\n" +
                "	float red = 0.0;\n" +
                "	float blue = 0.0;\n" +
                "	float green = 0.0;\n" +
                "	float alpha = 1.0;\n" +
                "	if (grayScale) {\n" +
                "		red = green = blue = low + rnd1 * range;\n" +
                "	} else {\n" +
                "		if (redChannel) red = low + rnd1 * range;\n" +
                "		if (greenChannel) green = low + rnd2 * range;\n" +
                "		if (blueChannel) blue = low + rnd3 * range;\n" +
                "		if (alphaChannel) alpha = low + rnd4 * range;\n" +
                "	}\n" +
                "	gl_FragColor = vec4(red, green, blue, alpha);\n" +
                "	gl_FragColor.rgb *= gl_FragColor.a;\n" +
                "}";
            return NoiseFilter;
        }(filters.BitmapFilter));
        filters.NoiseFilter = NoiseFilter;
    })(filters = flash.filters || (flash.filters = {}));
})(flash || (flash = {}));
//# sourceMappingURL=NoiseFilter.js.map