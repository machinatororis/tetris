var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                webgl.Program3D = flash.display3D.Program3D;
                var Context3DStateCache = (function () {
                    function Context3DStateCache() {
                        this._activeTexture = 0;
                        this._activeVertexArray = 0;
                        this._cullingMode = null;
                        this._depthTestCompareMode = null;
                        this._depthTestEnabled = false;
                        this._depthTestMask = false;
                        this._destBlendFactor = null;
                        this._destBlendFactorAlpha = null;
                        this._program = null;
                        this._registers = new Array(Context3DStateCache.MAX_NUM_REGISTERS * Context3DStateCache.FLOATS_PER_REGISTER);
                        this._srcBlendFactor = null;
                        this._srcBlendFactorAlpha = null;
                        this._equation = null;
                        this._equationAlpha = null;
                        this._viewportHeight = 0;
                        this._viewportOriginX = 0;
                        this._viewportOriginY = 0;
                        this._viewportWidth = 0;
                        this.clearSettings();
                    }
                    Context3DStateCache.prototype.clearRegisters = function () {
                        var numFloats = Context3DStateCache.MAX_NUM_REGISTERS * Context3DStateCache.FLOATS_PER_REGISTER;
                        for (var c = 0; c < numFloats; ++c) {
                            this._registers[c] = -999999999.0;
                        }
                    };
                    Context3DStateCache.prototype.clearSettings = function () {
                        this._srcBlendFactor = null;
                        this._srcBlendFactorAlpha = null;
                        this._destBlendFactor = null;
                        this._destBlendFactorAlpha = null;
                        this._equation = null;
                        this._equationAlpha = null;
                        this._depthTestEnabled = false;
                        this._depthTestMask = false;
                        this._depthTestCompareMode = null;
                        this._program = null;
                        this._cullingMode = null;
                        this._activeTexture = -1;
                        this._activeVertexArray = -1;
                        this._viewportOriginX = -1;
                        this._viewportOriginY = -1;
                        this._viewportWidth = -1;
                        this._viewportHeight = -1;
                        this.clearRegisters();
                    };
                    Context3DStateCache.prototype.updateActiveTextureSample = function (texture) {
                        if (!Context3DStateCache.disableCache && texture == this._activeTexture) {
                            return false;
                        }
                        this._activeTexture = texture;
                        return true;
                    };
                    Context3DStateCache.prototype.updateActiveVertexArray = function (vertexArray) {
                        if (!Context3DStateCache.disableCache && vertexArray == this._activeVertexArray) {
                            return false;
                        }
                        this._activeVertexArray = vertexArray;
                        return true;
                    };
                    Context3DStateCache.prototype.updateBlendDestFactor = function (factor) {
                        if (!Context3DStateCache.disableCache && factor == this._destBlendFactor) {
                            return false;
                        }
                        this._destBlendFactor = factor;
                        return true;
                    };
                    Context3DStateCache.prototype.updateBlendSrcFactor = function (factor) {
                        if (!Context3DStateCache.disableCache && factor == this._srcBlendFactor) {
                            return false;
                        }
                        this._srcBlendFactor = factor;
                        return true;
                    };
                    Context3DStateCache.prototype.updateBlendEquation = function (equation) {
                        if (!Context3DStateCache.disableCache && equation == this._equation) {
                            return false;
                        }
                        this._equation = equation;
                        return true;
                    };
                    Context3DStateCache.prototype.updateBlendDestFactorAlpha = function (factor) {
                        if (!Context3DStateCache.disableCache && factor == this._destBlendFactorAlpha) {
                            return false;
                        }
                        this._destBlendFactorAlpha = factor;
                        return true;
                    };
                    Context3DStateCache.prototype.updateBlendSrcFactorAlpha = function (factor) {
                        if (!Context3DStateCache.disableCache && factor == this._srcBlendFactorAlpha) {
                            return false;
                        }
                        this._srcBlendFactorAlpha = factor;
                        return true;
                    };
                    Context3DStateCache.prototype.updateBlendEquationAlpha = function (equation) {
                        if (!Context3DStateCache.disableCache && equation == this._equationAlpha) {
                            return false;
                        }
                        this._equationAlpha = equation;
                        return true;
                    };
                    Context3DStateCache.prototype.updateCullingMode = function (cullMode) {
                        if (!Context3DStateCache.disableCache && cullMode == this._cullingMode) {
                            return false;
                        }
                        this._cullingMode = cullMode;
                        return true;
                    };
                    Context3DStateCache.prototype.updateDepthCompareMode = function (mode) {
                        if (!Context3DStateCache.disableCache && mode == this._depthTestCompareMode) {
                            return false;
                        }
                        this._depthTestCompareMode = mode;
                        return true;
                    };
                    Context3DStateCache.prototype.updateDepthTestEnabled = function (test) {
                        if (!Context3DStateCache.disableCache && test == this._depthTestEnabled) {
                            return false;
                        }
                        this._depthTestEnabled = test;
                        return true;
                    };
                    Context3DStateCache.prototype.updateDepthTestMask = function (mask) {
                        if (!Context3DStateCache.disableCache && mask == this._depthTestMask) {
                            return false;
                        }
                        this._depthTestMask = mask;
                        return true;
                    };
                    Context3DStateCache.prototype.updateProgram3D = function (program3d) {
                        if (!Context3DStateCache.disableCache && program3d == this._program) {
                            return false;
                        }
                        this._program = program3d;
                        return true;
                    };
                    Context3DStateCache.prototype.updateRegisters = function (mTemp, startRegister, numRegisters) {
                        return true;
                    };
                    Context3DStateCache.prototype.updateViewport = function (originX, originY, width, height) {
                        if (!Context3DStateCache.disableCache && this._viewportOriginX == originX && this._viewportOriginY == originY && this._viewportWidth == width && this._viewportHeight == height) {
                            return false;
                        }
                        this._viewportOriginX = originX;
                        this._viewportOriginY = originY;
                        this._viewportWidth = width;
                        this._viewportHeight = height;
                        return true;
                    };
                    Context3DStateCache.FLOATS_PER_REGISTER = 4;
                    Context3DStateCache.MAX_NUM_REGISTERS = 1024;
                    Context3DStateCache.disableCache = true;
                    return Context3DStateCache;
                }());
                webgl.Context3DStateCache = Context3DStateCache;
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Context3DStateCache.js.map