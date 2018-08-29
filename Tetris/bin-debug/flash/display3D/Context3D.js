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
    var display3D;
    (function (display3D) {
        display3D.Context3DStateCache = flash.__native.renderer.webgl.Context3DStateCache;
        display3D.SamplerState = flash.__native.renderer.webgl.SamplerState;
        display3D.getNextPowerOfTwo = flash.__native.utils.getNextPowerOfTwo;
        display3D.BitmapData = flash.display.BitmapData;
        display3D.Stage3D = flash.display.Stage3D;
        display3D.CubeTexture = flash.display3D.textures.CubeTexture;
        display3D.RectangleTexture = flash.display3D.textures.RectangleTexture;
        display3D.Texture = flash.display3D.textures.Texture;
        display3D.TextureBase = flash.display3D.textures.TextureBase;
        display3D.VideoTexture = flash.display3D.textures.VideoTexture;
        display3D.IllegalOperationError = flash.errors.IllegalOperationError;
        display3D.EventDispatcher = flash.events.EventDispatcher;
        display3D.Matrix3D = flash.geom.Matrix3D;
        display3D.Rectangle = flash.geom.Rectangle;
        display3D.Capabilities = flash.system.Capabilities;
        display3D.ByteArray = flash.utils.ByteArray;
        var Context3D = (function (_super) {
            __extends(Context3D, _super);
            function Context3D(canvas, params, stage3D) {
                if (params === void 0) { params = null; }
                if (stage3D === void 0) { stage3D = null; }
                var _this = this;
                canvas = strict(canvas, HTMLCanvasElement);
                stage3D = strict(stage3D, display3D.Stage3D);
                _this.enableErrorChecking === void 0 && (_this.enableErrorChecking = false);
                _this.maxBackBufferWidth === void 0 && (_this.maxBackBufferWidth = 0);
                _this.maxBackBufferHeight === void 0 && (_this.maxBackBufferHeight = 0);
                _this.maxTextureWidth === void 0 && (_this.maxTextureWidth = 0);
                _this.maxTextureHeight === void 0 && (_this.maxTextureHeight = 0);
                _this.totalGPUMemory === void 0 && (_this.totalGPUMemory = 0);
                _this.__backBufferWidth === void 0 && (_this.__backBufferWidth = 0);
                _this.__backBufferHeight === void 0 && (_this.__backBufferHeight = 0);
                _this.__driverInfo === void 0 && (_this.__driverInfo = 'OpenGL (Direct blitting)');
                _this.__profile === void 0 && (_this.__profile = display3D.Context3DProfile.BASELINE);
                _this.__backBufferAntiAlias === void 0 && (_this.__backBufferAntiAlias = 0);
                _this.__backBufferEnableDepthAndStencil === void 0 && (_this.__backBufferEnableDepthAndStencil = false);
                _this.__backBufferWantsBestResolution === void 0 && (_this.__backBufferWantsBestResolution = false);
                _this.__depthRenderBuffer === void 0 && (_this.__depthRenderBuffer = null);
                _this.__depthStencilRenderBuffer === void 0 && (_this.__depthStencilRenderBuffer = null);
                _this.__fragmentConstants === void 0 && (_this.__fragmentConstants = null);
                _this.__vertexConstants === void 0 && (_this.__vertexConstants = null);
                _this.__framebuffer === void 0 && (_this.__framebuffer = null);
                _this.__maxAnisotropyCubeTexture === void 0 && (_this.__maxAnisotropyCubeTexture = 0);
                _this.__maxAnisotropyTexture2D === void 0 && (_this.__maxAnisotropyTexture2D = 0);
                _this.__positionScale === void 0 && (_this.__positionScale = null);
                _this.__program === void 0 && (_this.__program = null);
                _this.__renderToTexture === void 0 && (_this.__renderToTexture = null);
                _this.__enableDepthAndStencil === void 0 && (_this.__enableDepthAndStencil = false);
                _this.__rttDepthAndStencil === void 0 && (_this.__rttDepthAndStencil = false);
                _this.__samplerDirty === void 0 && (_this.__samplerDirty = 0);
                _this.__samplerTextures === void 0 && (_this.__samplerTextures = undefined);
                _this.__samplerStates === void 0 && (_this.__samplerStates = undefined);
                _this.__scissorRectangle === void 0 && (_this.__scissorRectangle = null);
                _this.__stage3D === void 0 && (_this.__stage3D = null);
                _this.__canvas === void 0 && (_this.__canvas = null);
                _this.__gl === void 0 && (_this.__gl = null);
                _this.__stencilCompareMode === void 0 && (_this.__stencilCompareMode = null);
                _this.__stencilRef === void 0 && (_this.__stencilRef = 0);
                _this.__stencilReadMask === void 0 && (_this.__stencilReadMask = 0);
                _this.__stencilRenderBuffer === void 0 && (_this.__stencilRenderBuffer = null);
                _this.__supportsAnisotropicFiltering === void 0 && (_this.__supportsAnisotropicFiltering = false);
                _this.__supportsPackedDepthStencil === void 0 && (_this.__supportsPackedDepthStencil = false);
                _this.__pixels === void 0 && (_this.__pixels = null);
                _this.__optimizeUniforms === void 0 && (_this.__optimizeUniforms = false);
                _this.__poolFloat32Array === void 0 && (_this.__poolFloat32Array = null);
                _this.glMax === void 0 && (_this.glMax = 0);
                _this.glMin === void 0 && (_this.glMin = 0);
                _this = _super.call(this) || this;
                _this.__optimizeUniforms = Boolean(params.optimizeUniforms);
                _this.__stage3D = stage3D;
                _this.__createWebGLContext(canvas, params);
                if (_this.__optimizeUniforms) {
                    _this.__poolFloat32Array = [];
                    _this.__vertexConstants = [];
                    _this.__fragmentConstants = [];
                }
                else {
                    _this.__vertexConstants = new Float32Array(4 * Context3D.MAX_PROGRAM_REGISTERS);
                    _this.__fragmentConstants = new Float32Array(4 * Context3D.MAX_PROGRAM_REGISTERS);
                }
                _this.__positionScale = new Float32Array([1.0, 1.0, 1.0, 1.0]);
                _this.__samplerDirty = 0;
                _this.__samplerTextures = new Array(Context3D.MAX_SAMPLERS);
                _this.__samplerStates = new Array;
                for (var i = 0; i < Context3D.MAX_SAMPLERS; ++i) {
                    _this.__samplerStates[i] = new display3D.SamplerState(_this.__gl.LINEAR, _this.__gl.LINEAR, _this.__gl.CLAMP_TO_EDGE, _this.__gl.CLAMP_TO_EDGE);
                }
                var dims = _this.__gl.getParameter(_this.__gl.MAX_VIEWPORT_DIMS);
                if (dims) {
                    _this.maxBackBufferWidth = ((dims[0]) >> 0);
                    _this.maxBackBufferHeight = ((dims[1]) >> 0);
                }
                else {
                    _this.maxBackBufferWidth = ((display3D.Capabilities.screenResolutionX) >> 0);
                    _this.maxBackBufferHeight = ((display3D.Capabilities.screenResolutionY) >> 0);
                }
                _this.maxTextureWidth = _this.maxTextureHeight = ((_this.__gl.getParameter(_this.__gl.MAX_TEXTURE_SIZE) || 2048) >> 0);
                _this.__backBufferAntiAlias = 0;
                _this.__backBufferEnableDepthAndStencil = true;
                _this.__backBufferWantsBestResolution = false;
                _this.__rttDepthAndStencil = false;
                _this.__samplerDirty = 0;
                _this.__stencilCompareMode = display3D.Context3DCompareMode.ALWAYS;
                _this.__stencilRef = 0;
                _this.__stencilReadMask = 0xFF;
                var anisoExtension = _this.__gl.getExtension("EXT_texture_filter_anisotropic");
                if (anisoExtension == null || !("MAX_TEXTURE_MAX_ANISOTROPY_EXT" in anisoExtension)) {
                    anisoExtension = _this.__gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
                }
                if (anisoExtension == null || !("MAX_TEXTURE_MAX_ANISOTROPY_EXT" in anisoExtension)) {
                    anisoExtension = _this.__gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                }
                _this.__supportsPackedDepthStencil = true;
                Context3D.DEPTH_STENCIL = ((_this.__gl.DEPTH_STENCIL) >> 0);
                _this.__supportsAnisotropicFiltering = (anisoExtension != null);
                if (_this.__supportsAnisotropicFiltering) {
                    Context3D.TEXTURE_MAX_ANISOTROPY_EXT = ((anisoExtension.TEXTURE_MAX_ANISOTROPY_EXT) >> 0);
                    var maxAnisotropy = ((_this.__gl.getParameter(anisoExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)) >> 0);
                    _this.__maxAnisotropyTexture2D = maxAnisotropy;
                    _this.__maxAnisotropyTexture2D = maxAnisotropy;
                }
                var vendor = _this.__gl.getParameter(_this.__gl.VENDOR);
                var version = _this.__gl.getParameter(_this.__gl.VERSION);
                var renderer = _this.__gl.getParameter(_this.__gl.RENDERER);
                var glslVersion = _this.__gl.getParameter(_this.__gl.SHADING_LANGUAGE_VERSION);
                _this.__driverInfo = "OpenGL" +
                    " Vendor=" + vendor +
                    " Version=" + version +
                    " Renderer=" + renderer +
                    " GLSL=" + glslVersion;
                Context3D.__stateCache.clearSettings();
                return _this;
            }
            Object.defineProperty(Context3D.prototype, "backBufferWidth", {
                get: function () {
                    return this.__backBufferWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context3D.prototype, "backBufferHeight", {
                get: function () {
                    return this.__backBufferHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context3D.prototype, "renderBufferWidth", {
                get: function () {
                    var renderToTexture = this.__getRenderToTexture();
                    return renderToTexture ? renderToTexture.__width : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context3D.prototype, "renderBufferHeight", {
                get: function () {
                    var renderToTexture = this.__getRenderToTexture();
                    return renderToTexture ? renderToTexture.__height : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context3D.prototype, "driverInfo", {
                get: function () {
                    return this.__driverInfo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context3D.prototype, "profile", {
                get: function () {
                    return this.__profile;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Context3D, "supportsVideoTexture", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Context3D.prototype.dispose = function (recreate) {
                if (recreate === void 0) { recreate = true; }
                recreate = Boolean(recreate);
            };
            Context3D.prototype.configureBackBuffer = function (width, height, antiAlias, enableDepthAndStencil, wantsBestResolution) {
                if (enableDepthAndStencil === void 0) { enableDepthAndStencil = true; }
                if (wantsBestResolution === void 0) { wantsBestResolution = false; }
                width = ((width) >> 0);
                height = ((height) >> 0);
                antiAlias = ((antiAlias) >> 0);
                enableDepthAndStencil = Boolean(enableDepthAndStencil);
                wantsBestResolution = Boolean(wantsBestResolution);
                this.__configureBackBuffer(width, height, antiAlias, enableDepthAndStencil, wantsBestResolution);
            };
            Context3D.prototype.clear = function (red, green, blue, alpha, depth, stencil, mask) {
                if (red === void 0) { red = 0; }
                if (green === void 0) { green = 0; }
                if (blue === void 0) { blue = 0; }
                if (alpha === void 0) { alpha = 1; }
                if (depth === void 0) { depth = 1; }
                if (stencil === void 0) { stencil = 0; }
                if (mask === void 0) { mask = 4294967295; }
                red = (+(red));
                green = (+(green));
                blue = (+(blue));
                alpha = (+(alpha));
                depth = (+(depth));
                stencil = ((stencil) >>> 0);
                mask = ((mask) >>> 0);
                this.__clear(red, green, blue, alpha, depth, stencil, mask);
            };
            Context3D.prototype.drawTriangles = function (indexBuffer, firstIndex, numTriangles) {
                if (firstIndex === void 0) { firstIndex = 0; }
                if (numTriangles === void 0) { numTriangles = -1; }
                indexBuffer = strict(indexBuffer, display3D.IndexBuffer3D);
                firstIndex = ((firstIndex) >> 0);
                numTriangles = ((numTriangles) >> 0);
                this.__drawTriangles(indexBuffer, firstIndex, numTriangles);
            };
            Context3D.prototype.present = function () {
            };
            Context3D.prototype.setProgram = function (program) {
                program = strict(program, display3D.Program3D);
                this.__setProgram(program);
            };
            Context3D.prototype.setProgramConstantsFromVector = function (programType, firstRegister, data, numRegisters) {
                if (numRegisters === void 0) { numRegisters = -1; }
                programType = as(programType, 'String');
                firstRegister = ((firstRegister) >> 0);
                numRegisters = ((numRegisters) >> 0);
                this.__setProgramConstantsFromVector(programType, firstRegister, data, numRegisters);
            };
            Context3D.prototype.setProgramConstantsFromMatrix = function (programType, firstRegister, matrix, transposedMatrix) {
                if (transposedMatrix === void 0) { transposedMatrix = false; }
                programType = as(programType, 'String');
                firstRegister = ((firstRegister) >> 0);
                matrix = strict(matrix, display3D.Matrix3D);
                transposedMatrix = Boolean(transposedMatrix);
                this.__setProgramConstantsFromMatrix(programType, firstRegister, matrix, transposedMatrix);
            };
            Context3D.prototype.setProgramConstantsFromByteArray = function (programType, firstRegister, numRegisters, data, byteArrayOffset) {
                programType = as(programType, 'String');
                firstRegister = ((firstRegister) >> 0);
                numRegisters = ((numRegisters) >> 0);
                data = strict(data, display3D.ByteArray);
                byteArrayOffset = ((byteArrayOffset) >>> 0);
                if (numRegisters == 0)
                    return;
                if (numRegisters == -1) {
                    numRegisters = ((((data.length >> 2) - byteArrayOffset)) >> 0);
                }
                var isVertex = (programType == display3D.Context3DProgramType.VERTEX);
                var dest = isVertex ? this.__vertexConstants : this.__fragmentConstants;
                var floatData = new Float32Array(data.buffer);
                var outOffset = firstRegister * 4;
                var inOffset = ((byteArrayOffset / 4) >> 0);
                for (var i = 0, len = numRegisters * 4; i < len; ++i) {
                    dest[outOffset + i] = floatData[inOffset + i];
                }
                if (this.__program != null) {
                    this.__program.__markDirty(isVertex, firstRegister, numRegisters);
                }
            };
            Context3D.prototype.setVertexBufferAt = function (index, buffer, bufferOffset, format) {
                if (bufferOffset === void 0) { bufferOffset = 0; }
                if (format === void 0) { format = "float4"; }
                index = ((index) >> 0);
                buffer = strict(buffer, display3D.VertexBuffer3D);
                bufferOffset = ((bufferOffset) >> 0);
                format = as(format, 'String');
                this.__setVertexBufferAt(index, buffer, bufferOffset, format);
            };
            Context3D.prototype.setBlendFactors = function (sourceFactor, destinationFactor, equation) {
                if (equation === void 0) { equation = 'add'; }
                sourceFactor = as(sourceFactor, 'String');
                destinationFactor = as(destinationFactor, 'String');
                equation = as(equation, 'String');
                this.__setBlendFactorsSeparate(sourceFactor, destinationFactor, equation, null, null, null);
            };
            Context3D.prototype.setBlendFactorsSeparate = function (sourceFactorRGB, destinationFactorRGB, equationRGB, sourceFactorAlpha, destinationFactorAlpha, equationAlpha) {
                sourceFactorRGB = as(sourceFactorRGB, 'String');
                destinationFactorRGB = as(destinationFactorRGB, 'String');
                equationRGB = as(equationRGB, 'String');
                sourceFactorAlpha = as(sourceFactorAlpha, 'String');
                destinationFactorAlpha = as(destinationFactorAlpha, 'String');
                equationAlpha = as(equationAlpha, 'String');
                this.__setBlendFactorsSeparate(sourceFactorRGB, destinationFactorRGB, equationRGB, sourceFactorAlpha, destinationFactorAlpha, equationAlpha);
            };
            Context3D.prototype.setColorMask = function (red, green, blue, alpha) {
                red = Boolean(red);
                green = Boolean(green);
                blue = Boolean(blue);
                alpha = Boolean(alpha);
                this.__gl.colorMask(red, green, blue, alpha);
            };
            Context3D.prototype.setDepthTest = function (depthMask, passCompareMode) {
                depthMask = Boolean(depthMask);
                passCompareMode = as(passCompareMode, 'String');
                var depthTestEnabled = this.__backBufferEnableDepthAndStencil;
                if (Context3D.__stateCache.updateDepthTestEnabled(depthTestEnabled)) {
                    if (depthTestEnabled) {
                        this.__gl.enable(this.__gl.DEPTH_TEST);
                    }
                    else {
                        this.__gl.disable(this.__gl.DEPTH_TEST);
                    }
                }
                if (Context3D.__stateCache.updateDepthTestMask(depthMask)) {
                    this.__gl.depthMask(depthMask);
                }
                if (Context3D.__stateCache.updateDepthCompareMode(passCompareMode)) {
                    switch (passCompareMode) {
                        case display3D.Context3DCompareMode.ALWAYS:
                            this.__gl.depthFunc(this.__gl.ALWAYS);
                            break;
                        case display3D.Context3DCompareMode.EQUAL:
                            this.__gl.depthFunc(this.__gl.EQUAL);
                            break;
                        case display3D.Context3DCompareMode.GREATER:
                            this.__gl.depthFunc(this.__gl.GREATER);
                            break;
                        case display3D.Context3DCompareMode.GREATER_EQUAL:
                            this.__gl.depthFunc(this.__gl.GEQUAL);
                            break;
                        case display3D.Context3DCompareMode.LESS:
                            this.__gl.depthFunc(this.__gl.LESS);
                            break;
                        case display3D.Context3DCompareMode.LESS_EQUAL:
                            this.__gl.depthFunc(this.__gl.LEQUAL);
                            break;
                        case display3D.Context3DCompareMode.NEVER:
                            this.__gl.depthFunc(this.__gl.NEVER);
                            break;
                        case display3D.Context3DCompareMode.NOT_EQUAL:
                            this.__gl.depthFunc(this.__gl.NOTEQUAL);
                            break;
                        default:
                            throw new display3D.IllegalOperationError();
                    }
                }
            };
            Context3D.prototype.setTextureAt = function (sampler, texture) {
                sampler = ((sampler) >> 0);
                texture = strict(texture, display3D.TextureBase);
                this.__setTextureAt(sampler, texture);
            };
            Context3D.prototype.setRenderToTexture = function (texture, enableDepthAndStencil, antiAlias, surfaceSelector, colorOutputIndex) {
                if (enableDepthAndStencil === void 0) { enableDepthAndStencil = false; }
                if (antiAlias === void 0) { antiAlias = 0; }
                if (surfaceSelector === void 0) { surfaceSelector = 0; }
                if (colorOutputIndex === void 0) { colorOutputIndex = 0; }
                texture = strict(texture, display3D.TextureBase);
                enableDepthAndStencil = Boolean(enableDepthAndStencil);
                antiAlias = ((antiAlias) >> 0);
                surfaceSelector = ((surfaceSelector) >> 0);
                colorOutputIndex = ((colorOutputIndex) >> 0);
                this.__setRenderToTexture(texture, enableDepthAndStencil, antiAlias, surfaceSelector, colorOutputIndex);
            };
            Context3D.prototype.setRenderToBackBuffer = function () {
                if (this.__getRenderToTexture() == null) {
                    return;
                }
                this.__gl.bindFramebuffer(this.__gl.FRAMEBUFFER, null);
                this.__gl.frontFace(this.__gl.CCW);
                if (this.__renderToTexture) {
                    delete this.__renderToTexture._parent;
                }
                this.__renderToTexture = null;
                this.__enableDepthAndStencil = false;
                this.__scissorRectangle = null;
                this.__updateBackbufferViewport();
                this.__updateScissorRectangle();
                this.__updateDepthAndStencilState();
                this.__positionScale[1] = 1.0;
                if (this.__program != null) {
                    this.__program.__setPositionScale(this.__positionScale);
                }
            };
            Context3D.prototype.setCulling = function (triangleFaceToCull) {
                triangleFaceToCull = as(triangleFaceToCull, 'String');
                if (Context3D.__stateCache.updateCullingMode(triangleFaceToCull)) {
                    switch (triangleFaceToCull) {
                        case display3D.Context3DTriangleFace.NONE:
                            this.__gl.disable(this.__gl.CULL_FACE);
                            break;
                        case display3D.Context3DTriangleFace.BACK:
                            this.__gl.enable(this.__gl.CULL_FACE);
                            this.__gl.cullFace(this.__gl.FRONT);
                            break;
                        case display3D.Context3DTriangleFace.FRONT:
                            this.__gl.enable(this.__gl.CULL_FACE);
                            this.__gl.cullFace(this.__gl.BACK);
                            break;
                        case display3D.Context3DTriangleFace.FRONT_AND_BACK:
                            this.__gl.enable(this.__gl.CULL_FACE);
                            this.__gl.cullFace(this.__gl.FRONT_AND_BACK);
                            break;
                        default:
                            throw new display3D.IllegalOperationError();
                    }
                }
            };
            Context3D.prototype.setStencilActions = function (triangleFace, compareMode, actionOnBothPass, actionOnDepthFail, actionOnDepthPassStencilFail) {
                if (triangleFace === void 0) { triangleFace = "frontAndBack"; }
                if (compareMode === void 0) { compareMode = "always"; }
                if (actionOnBothPass === void 0) { actionOnBothPass = "keep"; }
                if (actionOnDepthFail === void 0) { actionOnDepthFail = "keep"; }
                if (actionOnDepthPassStencilFail === void 0) { actionOnDepthPassStencilFail = "keep"; }
                triangleFace = as(triangleFace, 'String');
                compareMode = as(compareMode, 'String');
                actionOnBothPass = as(actionOnBothPass, 'String');
                actionOnDepthFail = as(actionOnDepthFail, 'String');
                actionOnDepthPassStencilFail = as(actionOnDepthPassStencilFail, 'String');
                this.__stencilCompareMode = compareMode;
                this.__gl.stencilOp(this.__getGLStencilAction(actionOnDepthFail), this.__getGLStencilAction(actionOnDepthPassStencilFail), this.__getGLStencilAction(actionOnBothPass));
                this.__gl.stencilFunc(this.__getGLCompareMode(this.__stencilCompareMode), this.__stencilRef, this.__stencilReadMask);
            };
            Context3D.prototype.setStencilReferenceValue = function (referenceValue, readMask, writeMask) {
                if (readMask === void 0) { readMask = 255; }
                if (writeMask === void 0) { writeMask = 255; }
                referenceValue = ((referenceValue) >>> 0);
                readMask = ((readMask) >>> 0);
                writeMask = ((writeMask) >>> 0);
                this.__stencilReadMask = ((readMask) >> 0);
                this.__stencilRef = ((referenceValue) >> 0);
                this.__gl.stencilFunc(this.__getGLCompareMode(this.__stencilCompareMode), this.__stencilRef, this.__stencilReadMask);
                this.__gl.stencilMask(writeMask);
            };
            Context3D.prototype.setScissorRectangle = function (rectangle) {
                rectangle = strict(rectangle, display3D.Rectangle);
                this.__setScissorRectangle(rectangle);
            };
            Context3D.prototype.createVertexBuffer = function (numVertices, data32PerVertex, bufferUsage) {
                if (bufferUsage === void 0) { bufferUsage = "staticDraw"; }
                numVertices = ((numVertices) >> 0);
                data32PerVertex = ((data32PerVertex) >> 0);
                bufferUsage = as(bufferUsage, 'String');
                return new display3D.VertexBuffer3D(this, numVertices, data32PerVertex, bufferUsage);
            };
            Context3D.prototype.createIndexBuffer = function (numIndices, bufferUsage) {
                if (bufferUsage === void 0) { bufferUsage = "staticDraw"; }
                numIndices = ((numIndices) >> 0);
                bufferUsage = as(bufferUsage, 'String');
                return new display3D.IndexBuffer3D(this, numIndices, bufferUsage);
            };
            Context3D.prototype.createTexture = function (width, height, format, optimizeForRenderToTexture, streamingLevels) {
                if (streamingLevels === void 0) { streamingLevels = 0; }
                width = ((width) >> 0);
                height = ((height) >> 0);
                format = as(format, 'String');
                optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture);
                streamingLevels = ((streamingLevels) >> 0);
                return new display3D.Texture(this, width, height, format, optimizeForRenderToTexture, streamingLevels);
            };
            Context3D.prototype.createCubeTexture = function (size, format, optimizeForRenderToTexture, streamingLevels) {
                if (streamingLevels === void 0) { streamingLevels = 0; }
                size = ((size) >> 0);
                format = as(format, 'String');
                optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture);
                streamingLevels = ((streamingLevels) >> 0);
                return new display3D.CubeTexture(this, size, format, optimizeForRenderToTexture, streamingLevels);
            };
            Context3D.prototype.createRectangleTexture = function (width, height, format, optimizeForRenderToTexture) {
                width = ((width) >> 0);
                height = ((height) >> 0);
                format = as(format, 'String');
                optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture);
                return new display3D.RectangleTexture(this, width, height, format, optimizeForRenderToTexture);
            };
            Context3D.prototype.createProgram = function () {
                return new display3D.Program3D(this);
            };
            Context3D.prototype.drawToBitmapData = function (destination) {
                destination = strict(destination, display3D.BitmapData);
                if (destination == null)
                    return;
                var x = 0;
                var y = this.__positionScale[1] == 1.0 ? this.__backBufferHeight - destination.height : 0;
                var width = destination.width;
                var height = destination.height;
                this.__gl.readPixels(x, y, width, height, this.__gl.RGBA, this.__gl.UNSIGNED_BYTE, this.__pixels);
                destination.__fromPixels(this.__pixels, width, height, !this.__renderToTexture);
            };
            Context3D.prototype.setSamplerStateAt = function (sampler, wrap, filter, mipfilter) {
                sampler = ((sampler) >> 0);
                wrap = as(wrap, 'String');
                filter = as(filter, 'String');
                mipfilter = as(mipfilter, 'String');
                this.__setSamplerStateAt(sampler, wrap, filter, mipfilter);
            };
            Context3D.prototype.createVideoTexture = function () {
                return new display3D.VideoTexture(this);
            };
            Context3D.prototype.__getRenderToTexture = function () {
                return this.__renderToTexture;
            };
            Context3D.prototype.__setBlendFactorsSeparate = function (sourceFactorRGB, destinationFactorRGB, equationRGB, sourceFactorAlpha, destinationFactorAlpha, equationAlpha) {
                var updateSrc = Context3D.__stateCache.updateBlendSrcFactor(sourceFactorRGB);
                var updateSrcAlpha = Context3D.__stateCache.updateBlendSrcFactorAlpha(sourceFactorAlpha);
                var updateDest = Context3D.__stateCache.updateBlendDestFactor(destinationFactorRGB);
                var updateDestAlpha = Context3D.__stateCache.updateBlendDestFactorAlpha(destinationFactorAlpha);
                var updateEquation = Context3D.__stateCache.updateBlendEquation(equationRGB);
                var updateEquationAlpha = Context3D.__stateCache.updateBlendEquationAlpha(equationAlpha);
                if (updateSrc || updateSrcAlpha || updateDest || updateDestAlpha || updateEquation || updateEquationAlpha) {
                    this.__updateBlendFactors();
                }
            };
            Context3D.prototype.__flushSamplerState = function () {
                var sampler = 0;
                while (this.__samplerDirty != 0) {
                    if ((this.__samplerDirty & (1 << sampler)) != 0) {
                        if (Context3D.__stateCache.updateActiveTextureSample(sampler)) {
                            this.__gl.activeTexture(this.__gl.TEXTURE0 + sampler);
                        }
                        var texture = this.__samplerTextures[sampler];
                        if (texture != null) {
                            var target = texture.__textureTarget;
                            this.__gl.bindTexture(target, texture.__getTexture());
                            texture.__setSamplerState(this.__samplerStates[sampler]);
                        }
                        else {
                            this.__gl.bindTexture(this.__gl.TEXTURE_2D, null);
                        }
                        this.__samplerDirty &= ~(1 << sampler);
                    }
                    sampler++;
                }
            };
            Context3D.prototype.__getGLCompareMode = function (compareMode) {
                switch (compareMode) {
                    case display3D.Context3DCompareMode.ALWAYS: return this.__gl.ALWAYS;
                    case display3D.Context3DCompareMode.EQUAL: return this.__gl.EQUAL;
                    case display3D.Context3DCompareMode.GREATER: return this.__gl.GREATER;
                    case display3D.Context3DCompareMode.GREATER_EQUAL: return this.__gl.GEQUAL;
                    case display3D.Context3DCompareMode.LESS: return this.__gl.LESS;
                    case display3D.Context3DCompareMode.LESS_EQUAL: return this.__gl.LEQUAL;
                    case display3D.Context3DCompareMode.NEVER: return this.__gl.NEVER;
                    case display3D.Context3DCompareMode.NOT_EQUAL: return this.__gl.NOTEQUAL;
                    default: return this.__gl.EQUAL;
                }
            };
            Context3D.prototype.__getGLStencilAction = function (stencilAction) {
                switch (stencilAction) {
                    case display3D.Context3DStencilAction.DECREMENT_SATURATE: return this.__gl.DECR;
                    case display3D.Context3DStencilAction.DECREMENT_WRAP: return this.__gl.DECR_WRAP;
                    case display3D.Context3DStencilAction.INCREMENT_SATURATE: return this.__gl.INCR;
                    case display3D.Context3DStencilAction.INCREMENT_WRAP: return this.__gl.INCR_WRAP;
                    case display3D.Context3DStencilAction.INVERT: return this.__gl.INVERT;
                    case display3D.Context3DStencilAction.KEEP: return this.__gl.KEEP;
                    case display3D.Context3DStencilAction.SET: return this.__gl.REPLACE;
                    case display3D.Context3DStencilAction.ZERO: return this.__gl.ZERO;
                    default: return this.__gl.KEEP;
                }
            };
            Context3D.prototype.__getGLBlendFactor = function (factor) {
                switch (factor) {
                    case display3D.Context3DBlendFactor.ONE: return this.__gl.ONE;
                    case display3D.Context3DBlendFactor.ZERO: return this.__gl.ZERO;
                    case display3D.Context3DBlendFactor.SOURCE_COLOR: return this.__gl.SRC_COLOR;
                    case display3D.Context3DBlendFactor.SOURCE_ALPHA: return this.__gl.SRC_ALPHA;
                    case display3D.Context3DBlendFactor.DESTINATION_ALPHA: return this.__gl.DST_ALPHA;
                    case display3D.Context3DBlendFactor.DESTINATION_COLOR: return this.__gl.DST_COLOR;
                    case display3D.Context3DBlendFactor.ONE_MINUS_SOURCE_COLOR: return this.__gl.ONE_MINUS_SRC_COLOR;
                    case display3D.Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA: return this.__gl.ONE_MINUS_SRC_ALPHA;
                    case display3D.Context3DBlendFactor.ONE_MINUS_DESTINATION_ALPHA: return this.__gl.ONE_MINUS_DST_ALPHA;
                    case display3D.Context3DBlendFactor.ONE_MINUS_DESTINATION_COLOR: return this.__gl.ONE_MINUS_DST_COLOR;
                    default:
                        throw new display3D.IllegalOperationError();
                }
            };
            Context3D.prototype.__getGLBlendEquation = function (equation) {
                switch (equation) {
                    case display3D.Context3DBlendEquation.ADD: return this.__gl.FUNC_ADD;
                    case display3D.Context3DBlendEquation.SUBTRACT: return this.__gl.FUNC_SUBTRACT;
                    case display3D.Context3DBlendEquation.REVERSE_SUBTRACT: return this.__gl.FUNC_REVERSE_SUBTRACT;
                    case display3D.Context3DBlendEquation.MIN: return this.glMin;
                    case display3D.Context3DBlendEquation.MAX: return this.glMax;
                    default:
                        throw new display3D.IllegalOperationError();
                }
            };
            Context3D.prototype.__hasGLExtension = function (name) {
                return (this.__gl.getSupportedExtensions().indexOf(name) != -1);
            };
            Context3D.prototype.__setViewport = function (originX, originY, width, height) {
                if (this.__renderToTexture != null)
                    originY *= -1;
                if (Context3D.__stateCache.updateViewport(originX, originY, width, height)) {
                    this.__gl.viewport(originX, originY, width, height);
                }
            };
            Context3D.prototype.__updateDepthAndStencilState = function () {
                var depthAndStencil = this.__renderToTexture != null ? this.__rttDepthAndStencil : this.__backBufferEnableDepthAndStencil;
                if (depthAndStencil) {
                    this.__gl.enable(this.__gl.DEPTH_TEST);
                    this.__gl.enable(this.__gl.STENCIL_TEST);
                }
                else {
                    this.__gl.disable(this.__gl.DEPTH_TEST);
                    this.__gl.disable(this.__gl.STENCIL_TEST);
                }
            };
            Context3D.prototype.__updateBlendFactors = function () {
                if (Context3D.__stateCache._srcBlendFactor == null || Context3D.__stateCache._destBlendFactor == null) {
                    this.__gl.disable(this.__gl.BLEND);
                    return;
                }
                var eqa = this.__getGLBlendEquation(Context3D.__stateCache._equation);
                var eqaA;
                if (Context3D.__stateCache._equationAlpha) {
                    eqaA = this.__getGLBlendEquation(Context3D.__stateCache._equationAlpha);
                }
                if (eqaA) {
                    this.__gl.blendEquationSeparate(eqa, eqaA);
                }
                else {
                    this.__gl.blendEquation(eqa);
                }
                var src = this.__getGLBlendFactor(Context3D.__stateCache._srcBlendFactor);
                var dest = this.__getGLBlendFactor(Context3D.__stateCache._destBlendFactor);
                var srcA, destA;
                if (Context3D.__stateCache._srcBlendFactorAlpha && Context3D.__stateCache._destBlendFactorAlpha) {
                    srcA = this.__getGLBlendFactor(Context3D.__stateCache._srcBlendFactorAlpha);
                    destA = this.__getGLBlendFactor(Context3D.__stateCache._destBlendFactorAlpha);
                }
                this.__gl.enable(this.__gl.BLEND);
                if (srcA && destA) {
                    this.__gl.blendFuncSeparate(src, dest, srcA, destA);
                }
                else {
                    this.__gl.blendFunc(src, dest);
                }
            };
            Context3D.prototype.__updateScissorRectangle = function () {
                if (this.__scissorRectangle == null) {
                    this.__gl.disable(this.__gl.SCISSOR_TEST);
                    return;
                }
                this.__gl.enable(this.__gl.SCISSOR_TEST);
                var height = 0;
                var offsetX = this.__stage3D ? this.__stage3D.x : 0;
                var offsetY = this.__stage3D ? this.__stage3D.y : 0;
                if (this.__renderToTexture != null) {
                    if (is(this.__renderToTexture, display3D.Texture)) {
                        var texture2D = as(this.__renderToTexture, display3D.Texture);
                        height = texture2D.__height;
                    }
                    else if (is(this.__renderToTexture, display3D.RectangleTexture)) {
                        var rectTexture = as(this.__renderToTexture, display3D.RectangleTexture);
                        height = rectTexture.__height;
                    }
                }
                else {
                    height = this.backBufferHeight;
                }
                var sX = this.__scissorRectangle.x;
                var sY = this.__scissorRectangle.y;
                var sWidth = this.__scissorRectangle.width;
                var sHeight = this.__scissorRectangle.height;
                this.__gl.scissor(sX + offsetX, height - sY - sHeight + offsetY, sWidth, sHeight);
            };
            Context3D.prototype.__updateBackbufferViewport = function () {
                if (this.__canvas) {
                    if (this.__canvas.width != this.__backBufferWidth || this.__canvas.height != this.__backBufferHeight) {
                        this.__canvas.width = this.__backBufferWidth;
                        this.__canvas.height = this.__backBufferHeight;
                    }
                }
                if (!this.__getRenderToTexture() && this.__backBufferWidth > 0 && this.__backBufferHeight > 0) {
                    this.__setViewport(this.__stage3D ? this.__stage3D.x : 0, this.__stage3D ? this.__stage3D.y : 0, this.__backBufferWidth, this.__backBufferHeight);
                }
            };
            Context3D.prototype.__setTextureAt = function (sampler, texture) {
                if (this.__samplerTextures[sampler] != texture) {
                    this.__samplerTextures[sampler] = texture;
                    this.__samplerDirty |= (1 << sampler);
                    return true;
                }
                if (!texture) {
                    return false;
                }
                var state = this.__samplerStates[sampler];
                if (!state) {
                    return false;
                }
                if (!state.equals(texture.__samplerState)) {
                    this.__samplerDirty |= (1 << sampler);
                }
            };
            Context3D.prototype.__setVertexBufferAt = function (index, buffer, bufferOffset, format) {
                if (bufferOffset === void 0) { bufferOffset = 0; }
                if (format === void 0) { format = "float4"; }
                if (buffer == null) {
                    this.__gl.disableVertexAttribArray(index);
                    this.__gl.bindBuffer(this.__gl.ARRAY_BUFFER, null);
                    return;
                }
                this.__gl.enableVertexAttribArray(index);
                this.__gl.bindBuffer(this.__gl.ARRAY_BUFFER, buffer.__id);
                var byteOffset = bufferOffset * 4;
                switch (format) {
                    case display3D.Context3DVertexBufferFormat.BYTES_4:
                        this.__gl.vertexAttribPointer(index, 4, this.__gl.UNSIGNED_BYTE, true, buffer.__stride, byteOffset);
                        break;
                    case display3D.Context3DVertexBufferFormat.FLOAT_4:
                        this.__gl.vertexAttribPointer(index, 4, this.__gl.FLOAT, false, buffer.__stride, byteOffset);
                        break;
                    case display3D.Context3DVertexBufferFormat.FLOAT_3:
                        this.__gl.vertexAttribPointer(index, 3, this.__gl.FLOAT, false, buffer.__stride, byteOffset);
                        break;
                    case display3D.Context3DVertexBufferFormat.FLOAT_2:
                        this.__gl.vertexAttribPointer(index, 2, this.__gl.FLOAT, false, buffer.__stride, byteOffset);
                        break;
                    case display3D.Context3DVertexBufferFormat.FLOAT_1:
                        this.__gl.vertexAttribPointer(index, 1, this.__gl.FLOAT, false, buffer.__stride, byteOffset);
                        break;
                    default:
                        throw new display3D.IllegalOperationError();
                }
            };
            Context3D.prototype.__setProgramConstantsFromMatrix = function (programType, firstRegister, matrix, transposedMatrix) {
                if (transposedMatrix === void 0) { transposedMatrix = false; }
                var isVertex = programType == display3D.Context3DProgramType.VERTEX;
                var dest = isVertex ? this.__vertexConstants : this.__fragmentConstants;
                var source = matrix.rawData;
                var i = firstRegister * 4;
                if (transposedMatrix) {
                    dest[i++] = source[0];
                    dest[i++] = source[4];
                    dest[i++] = source[8];
                    dest[i++] = source[12];
                    dest[i++] = source[1];
                    dest[i++] = source[5];
                    dest[i++] = source[9];
                    dest[i++] = source[13];
                    dest[i++] = source[2];
                    dest[i++] = source[6];
                    dest[i++] = source[10];
                    dest[i++] = source[14];
                    dest[i++] = source[3];
                    dest[i++] = source[7];
                    dest[i++] = source[11];
                    dest[i++] = source[15];
                }
                else {
                    if (this.__optimizeUniforms) {
                        this.__releaseFloat32ArrayToPool(dest[i]);
                        dest[i] = this.__getFloat32ArrayFromPool(source);
                    }
                    else {
                        dest[i++] = source[0];
                        dest[i++] = source[1];
                        dest[i++] = source[2];
                        dest[i++] = source[3];
                        dest[i++] = source[4];
                        dest[i++] = source[5];
                        dest[i++] = source[6];
                        dest[i++] = source[7];
                        dest[i++] = source[8];
                        dest[i++] = source[9];
                        dest[i++] = source[10];
                        dest[i++] = source[11];
                        dest[i++] = source[12];
                        dest[i++] = source[13];
                        dest[i++] = source[14];
                        dest[i++] = source[15];
                    }
                }
                if (this.__program != null) {
                    this.__program.__markDirty(isVertex, firstRegister, 4);
                }
            };
            Context3D.prototype.__setProgram = function (program) {
                if (program == null) {
                    throw new display3D.IllegalOperationError();
                }
                if (Context3D.__stateCache.updateProgram3D(program)) {
                    program.__use();
                    program.__setPositionScale(this.__positionScale);
                    this.__program = program;
                    this.__samplerDirty |= this.__program.__samplerUsageMask;
                    for (var i = 0; i < Context3D.MAX_SAMPLERS; ++i) {
                        this.__samplerStates[i].copyFrom(this.__program.__getSamplerState(i));
                    }
                }
            };
            Context3D.prototype.__setProgramConstantsFromVector = function (programType, firstRegister, data, numRegisters) {
                if (numRegisters === void 0) { numRegisters = -1; }
                if (numRegisters == 0)
                    return;
                if (numRegisters == -1) {
                    numRegisters = (data.length >> 2);
                }
                var isVertex = (programType == display3D.Context3DProgramType.VERTEX);
                var dest = isVertex ? this.__vertexConstants : this.__fragmentConstants;
                var source = data;
                var sourceIndex = 0;
                var destIndex = firstRegister * 4;
                if (this.__optimizeUniforms) {
                    this.__releaseFloat32ArrayToPool(dest[destIndex]);
                    dest[destIndex] = this.__getFloat32ArrayFromPool(source);
                }
                else {
                    for (var i = 0; i < numRegisters; ++i) {
                        dest[destIndex++] = source[sourceIndex++];
                        dest[destIndex++] = source[sourceIndex++];
                        dest[destIndex++] = source[sourceIndex++];
                        dest[destIndex++] = source[sourceIndex++];
                    }
                }
                if (this.__program != null) {
                    this.__program.__markDirty(isVertex, firstRegister, numRegisters);
                }
            };
            Context3D.prototype.__clear = function (red, green, blue, alpha, depth, stencil, mask) {
                if (red === void 0) { red = 0; }
                if (green === void 0) { green = 0; }
                if (blue === void 0) { blue = 0; }
                if (alpha === void 0) { alpha = 1; }
                if (depth === void 0) { depth = 1; }
                if (stencil === void 0) { stencil = 0; }
                if (mask === void 0) { mask = 4294967295; }
                var clearMask = 0;
                if (mask & display3D.Context3DClearMask.COLOR != 0) {
                    clearMask |= this.__gl.COLOR_BUFFER_BIT;
                    this.__gl.clearColor(red, green, blue, alpha);
                }
                if (mask & display3D.Context3DClearMask.DEPTH != 0) {
                    clearMask |= this.__gl.DEPTH_BUFFER_BIT;
                    this.__gl.depthMask(true);
                    this.__gl.clearDepth(depth);
                }
                if (mask & display3D.Context3DClearMask.STENCIL != 0) {
                    clearMask |= this.__gl.STENCIL_BUFFER_BIT;
                    this.__gl.clearStencil(stencil);
                }
                this.__gl.clear(clearMask);
            };
            Context3D.prototype.__drawTriangles = function (indexBuffer, firstIndex, numTriangles) {
                if (firstIndex === void 0) { firstIndex = 0; }
                if (numTriangles === void 0) { numTriangles = -1; }
                if (this.__program == null) {
                    return;
                }
                this.__flushSamplerState();
                this.__program.__flush();
                var count = (numTriangles == -1) ? indexBuffer.__numIndices : (numTriangles * 3);
                this.__gl.bindBuffer(this.__gl.ELEMENT_ARRAY_BUFFER, indexBuffer.__id);
                this.__gl.drawElements(this.__gl.TRIANGLES, count, indexBuffer.__elementType, firstIndex);
            };
            Context3D.prototype.__setScissorRectangle = function (rectangle) {
                if (rectangle) {
                    Context3D.sHelperRect.__copyFrom(rectangle);
                    this.__scissorRectangle = Context3D.sHelperRect;
                }
                else {
                    this.__scissorRectangle = null;
                }
                this.__updateScissorRectangle();
            };
            Context3D.prototype.__setSamplerStateAt = function (sampler, wrap, filter, mipfilter) {
                if (sampler < 0 || sampler > Context3D.MAX_SAMPLERS) {
                    throw new Error("sampler out of range");
                }
                var state = this.__samplerStates[sampler];
                switch (wrap) {
                    case display3D.Context3DWrapMode.CLAMP:
                        state.wrapModeS = this.__gl.CLAMP_TO_EDGE;
                        state.wrapModeT = this.__gl.CLAMP_TO_EDGE;
                        break;
                    case display3D.Context3DWrapMode.CLAMP_U_REPEAT_V:
                        state.wrapModeS = this.__gl.CLAMP_TO_EDGE;
                        state.wrapModeT = this.__gl.REPEAT;
                        break;
                    case display3D.Context3DWrapMode.REPEAT:
                        state.wrapModeS = this.__gl.REPEAT;
                        state.wrapModeT = this.__gl.REPEAT;
                        break;
                    case display3D.Context3DWrapMode.REPEAT_U_CLAMP_V:
                        state.wrapModeS = this.__gl.REPEAT;
                        state.wrapModeT = this.__gl.CLAMP_TO_EDGE;
                        break;
                    default:
                        throw new Error("wrap bad enum");
                }
                switch (filter) {
                    case display3D.Context3DTextureFilter.LINEAR:
                        state.magFilter = this.__gl.LINEAR;
                        if (this.__supportsAnisotropicFiltering) {
                            state.maxAniso = 1;
                        }
                        break;
                    case display3D.Context3DTextureFilter.NEAREST:
                        state.magFilter = this.__gl.NEAREST;
                        if (this.__supportsAnisotropicFiltering) {
                            state.maxAniso = 1;
                        }
                        break;
                    case display3D.Context3DTextureFilter.ANISOTROPIC2X:
                        if (this.__supportsAnisotropicFiltering) {
                            state.maxAniso = (this.__maxAnisotropyTexture2D < 2 ? this.__maxAnisotropyTexture2D : 2);
                        }
                        break;
                    case display3D.Context3DTextureFilter.ANISOTROPIC4X:
                        if (this.__supportsAnisotropicFiltering) {
                            state.maxAniso = (this.__maxAnisotropyTexture2D < 4 ? this.__maxAnisotropyTexture2D : 4);
                        }
                        break;
                    case display3D.Context3DTextureFilter.ANISOTROPIC8X:
                        if (this.__supportsAnisotropicFiltering) {
                            state.maxAniso = (this.__maxAnisotropyTexture2D < 8 ? this.__maxAnisotropyTexture2D : 8);
                        }
                        break;
                    case display3D.Context3DTextureFilter.ANISOTROPIC16X:
                        if (this.__supportsAnisotropicFiltering) {
                            state.maxAniso = (this.__maxAnisotropyTexture2D < 16 ? this.__maxAnisotropyTexture2D : 16);
                        }
                        break;
                    default:
                        throw new Error("filter bad enum");
                }
                switch (mipfilter) {
                    case display3D.Context3DMipFilter.MIPLINEAR:
                        state.minFilter = filter == display3D.Context3DTextureFilter.NEAREST ? this.__gl.NEAREST_MIPMAP_LINEAR : this.__gl.LINEAR_MIPMAP_LINEAR;
                        break;
                    case display3D.Context3DMipFilter.MIPNEAREST:
                        state.minFilter = filter == display3D.Context3DTextureFilter.NEAREST ? this.__gl.NEAREST_MIPMAP_NEAREST : this.__gl.LINEAR_MIPMAP_NEAREST;
                        break;
                    case display3D.Context3DMipFilter.MIPNONE:
                        state.minFilter = filter == display3D.Context3DTextureFilter.NEAREST ? this.__gl.NEAREST : this.__gl.LINEAR;
                        break;
                    default:
                        throw new Error("mipfiter bad enum");
                }
            };
            Context3D.prototype.__createWebGLContext = function (canvas, params) {
                if (params === void 0) { params = null; }
                params = params || {};
                if (params.alpha == undefined)
                    params.alpha = false;
                if (params.depth == undefined)
                    params.depth = false;
                if (params.stencil == undefined)
                    params.stencil = false;
                if (params.antialias == undefined)
                    params.antialias = false;
                if (params.premultipliedAlpha == undefined)
                    params.premultipliedAlpha = false;
                if (params.preserveDrawingBuffer == undefined)
                    params.preserveDrawingBuffer = false;
                if (params.failIfMajorPerformanceCaveat == undefined)
                    params.failIfMajorPerformanceCaveat = false;
                if (params.alpha == false && display3D.Capabilities.browser == 'Safari') {
                    (params.alpha = true) && (canvas.style.background = 'black');
                }
                this.__canvas = canvas;
                try {
                    this.__gl = strict(this.__canvas.getContext("webgl", params), WebGLRenderingContext);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
                try {
                    this.__gl = this.__gl || this.__canvas.getContext("experimental-webgl", params);
                }
                catch (e) {
                    e = window.asc.e2e(e);
                }
                if (!this.__gl) {
                    this.__throwWebGLNotAvailable();
                }
                else {
                    var ext = this.__gl.getExtension('EXT_blend_minmax');
                    if (ext) {
                        this.glMax = ((ext.MAX_EXT) >> 0);
                        this.glMin = ((ext.MIN_EXT) >> 0);
                    }
                }
                this.__canvas.addEventListener('webglcontextlost', this.__throwWebGLNotAvailable.__bind(this), false);
            };
            Context3D.prototype.__throwWebGLNotAvailable = function () {
                throw new Error('WebGL is not available. Please restart your browser.', 3710);
            };
            Context3D.prototype.__setRenderToTexture = function (texture, enableDepthAndStencil, antiAlias, surfaceSelector, colorOutputIndex) {
                if (enableDepthAndStencil === void 0) { enableDepthAndStencil = false; }
                if (antiAlias === void 0) { antiAlias = 0; }
                if (surfaceSelector === void 0) { surfaceSelector = 0; }
                if (colorOutputIndex === void 0) { colorOutputIndex = 0; }
                if (this.__getRenderToTexture() == texture && this.__enableDepthAndStencil == enableDepthAndStencil) {
                    return;
                }
                var width = 0;
                var height = 0;
                if (this.__framebuffer == null) {
                    this.__framebuffer = strict(this.__gl.createFramebuffer(), WebGLFramebuffer);
                }
                this.__gl.bindFramebuffer(this.__gl.FRAMEBUFFER, this.__framebuffer);
                if (is(texture, display3D.Texture)) {
                    var texture2D = as(texture, display3D.Texture);
                    width = texture2D.__width;
                    height = texture2D.__height;
                    this.__gl.framebufferTexture2D(this.__gl.FRAMEBUFFER, this.__gl.COLOR_ATTACHMENT0, this.__gl.TEXTURE_2D, texture.__textureID, 0);
                }
                else if (is(texture, display3D.RectangleTexture)) {
                    var rectTexture = as(texture, display3D.RectangleTexture);
                    width = rectTexture.__width;
                    height = rectTexture.__height;
                    this.__gl.framebufferTexture2D(this.__gl.FRAMEBUFFER, this.__gl.COLOR_ATTACHMENT0, this.__gl.TEXTURE_2D, texture.__textureID, 0);
                }
                else if (is(texture, display3D.CubeTexture)) {
                    var cubeTexture = as(texture, display3D.CubeTexture);
                    width = cubeTexture.__size;
                    height = cubeTexture.__size;
                    for (var i = 0; i < 6; ++i) {
                        this.__gl.framebufferTexture2D(this.__gl.FRAMEBUFFER, this.__gl.COLOR_ATTACHMENT0, this.__gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, texture.__textureID, 0);
                    }
                }
                else {
                    throw new Error("Invalid texture");
                }
                if (enableDepthAndStencil) {
                    if (this.__supportsPackedDepthStencil) {
                        if (this.__depthStencilRenderBuffer == null) {
                            this.__depthStencilRenderBuffer = strict(this.__gl.createRenderbuffer(), WebGLRenderbuffer);
                        }
                        this.__gl.bindRenderbuffer(this.__gl.RENDERBUFFER, this.__depthStencilRenderBuffer);
                        this.__gl.renderbufferStorage(this.__gl.RENDERBUFFER, Context3D.DEPTH_STENCIL, width, height);
                        this.__gl.framebufferRenderbuffer(this.__gl.FRAMEBUFFER, this.__gl.DEPTH_STENCIL_ATTACHMENT, this.__gl.RENDERBUFFER, this.__depthStencilRenderBuffer);
                    }
                    else {
                        if (this.__depthRenderBuffer == null) {
                            this.__depthRenderBuffer = strict(this.__gl.createRenderbuffer(), WebGLRenderbuffer);
                        }
                        if (this.__stencilRenderBuffer == null) {
                            this.__stencilRenderBuffer = strict(this.__gl.createRenderbuffer(), WebGLRenderbuffer);
                        }
                        this.__gl.bindRenderbuffer(this.__gl.RENDERBUFFER, this.__depthRenderBuffer);
                        this.__gl.renderbufferStorage(this.__gl.RENDERBUFFER, this.__gl.DEPTH_COMPONENT16, width, height);
                        this.__gl.bindRenderbuffer(this.__gl.RENDERBUFFER, this.__stencilRenderBuffer);
                        this.__gl.renderbufferStorage(this.__gl.RENDERBUFFER, this.__gl.STENCIL_INDEX8, width, height);
                        this.__gl.framebufferRenderbuffer(this.__gl.FRAMEBUFFER, this.__gl.DEPTH_ATTACHMENT, this.__gl.RENDERBUFFER, this.__depthRenderBuffer);
                        this.__gl.framebufferRenderbuffer(this.__gl.FRAMEBUFFER, this.__gl.STENCIL_ATTACHMENT, this.__gl.RENDERBUFFER, this.__stencilRenderBuffer);
                    }
                    this.__gl.bindRenderbuffer(this.__gl.RENDERBUFFER, null);
                }
                this.__setViewport(0, 0, width, height);
                if (this.enableErrorChecking) {
                    var code = this.__gl.checkFramebufferStatus(this.__gl.FRAMEBUFFER);
                    if (code != this.__gl.FRAMEBUFFER_COMPLETE) {
                        trace("Error: Context3D.setRenderToTexture status:${code} width:${texture2D.__width} height:${texture2D.__height}");
                    }
                }
                this.__positionScale[1] = -1.0;
                if (this.__program != null) {
                    this.__program.__setPositionScale(this.__positionScale);
                }
                this.__gl.frontFace(this.__gl.CW);
                if (this.__renderToTexture) {
                    delete this.__renderToTexture._parent;
                }
                this.__renderToTexture = texture;
                this.__enableDepthAndStencil = enableDepthAndStencil;
                this.__scissorRectangle = null;
                this.__rttDepthAndStencil = enableDepthAndStencil;
                this.__updateScissorRectangle();
                this.__updateDepthAndStencilState();
            };
            Context3D.prototype.__configureBackBuffer = function (width, height, antiAlias, enableDepthAndStencil, wantsBestResolution) {
                if (enableDepthAndStencil === void 0) { enableDepthAndStencil = true; }
                if (wantsBestResolution === void 0) { wantsBestResolution = false; }
                var length = ((display3D.getNextPowerOfTwo(width) * display3D.getNextPowerOfTwo(height) * 4) >> 0);
                if (!this.__pixels || this.__pixels.length < length) {
                    this.__pixels = new Uint8Array(length);
                }
                this.__backBufferWidth = width;
                this.__backBufferHeight = height;
                this.__backBufferAntiAlias = antiAlias;
                this.__backBufferEnableDepthAndStencil = enableDepthAndStencil;
                this.__backBufferWantsBestResolution = wantsBestResolution;
                this.__updateBackbufferViewport();
                Context3D.__stateCache.clearSettings();
            };
            Context3D.prototype.__getFloat32ArrayFromPool = function (value) {
                if (!value) {
                    return;
                }
                var object;
                var len = value.length;
                var pool = this.__poolFloat32Array[len] || (this.__poolFloat32Array[len] = []);
                if (pool.length) {
                    object = pool.pop();
                }
                else {
                    object = new Float32Array(len);
                }
                switch (len) {
                    case 1:
                        object[0] = value[0];
                        break;
                    case 2:
                        object[0] = value[0];
                        object[1] = value[1];
                        break;
                    case 4:
                        object[0] = value[0];
                        object[1] = value[1];
                        object[2] = value[2];
                        object[3] = value[3];
                        break;
                    case 16:
                        object[0] = value[0];
                        object[1] = value[1];
                        object[2] = value[2];
                        object[3] = value[3];
                        object[4] = value[4];
                        object[5] = value[5];
                        object[6] = value[6];
                        object[7] = value[7];
                        object[8] = value[8];
                        object[9] = value[9];
                        object[10] = value[10];
                        object[11] = value[11];
                        object[12] = value[12];
                        object[13] = value[13];
                        object[14] = value[14];
                        object[15] = value[15];
                        break;
                    default:
                        throw new Error('internal optimize uniform error: unsupported len ' + len);
                }
                return object;
            };
            Context3D.prototype.__releaseFloat32ArrayToPool = function (object) {
                if (!object) {
                    return;
                }
                var len = object.length;
                var pool = this.__poolFloat32Array[len] || (this.__poolFloat32Array[len] = []);
                pool[pool.length] = object;
            };
            Context3D.sHelperRect = asc.sti(Context3D, function () { Context3D.sHelperRect = new display3D.Rectangle; });
            Context3D.MAX_SAMPLERS = 8;
            Context3D.MAX_ATTRIBUTES = 16;
            Context3D.MAX_PROGRAM_REGISTERS = 128;
            Context3D.TEXTURE_MAX_ANISOTROPY_EXT = 0;
            Context3D.DEPTH_STENCIL = 0;
            Context3D.__stateCache = asc.sti(Context3D, function () { Context3D.__stateCache = new display3D.Context3DStateCache(); });
            return Context3D;
        }(display3D.EventDispatcher));
        display3D.Context3D = Context3D;
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3D.js.map