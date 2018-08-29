var flash;
(function (flash) {
    var display3D;
    (function (display3D) {
        display3D.AGALConverter = flash.__native.renderer.webgl.AGALConverter;
        display3D.SamplerState = flash.__native.renderer.webgl.SamplerState;
        display3D.IllegalOperationError = flash.errors.IllegalOperationError;
        display3D.ByteArray = flash.utils.ByteArray;
        var Program3D = (function () {
            function Program3D(context3D) {
                this.__samplerUsageMask = 0;
                context3D = strict(context3D, display3D.Context3D);
                this.__gl = strict((this.__context = context3D).__gl, WebGLRenderingContext);
                this.__uniforms = new Array();
                this.__samplerUniforms = new Array();
                this.__alphaSamplerUniforms = new Array();
                this.__samplerStates = new Array(display3D.Context3D.MAX_SAMPLERS);
            }
            Program3D.prototype.dispose = function () {
                this.__deleteShaders();
            };
            Program3D.prototype.upload = function (vertexProgram, fragmentProgram) {
                vertexProgram = strict(vertexProgram, display3D.ByteArray);
                fragmentProgram = strict(fragmentProgram, display3D.ByteArray);
                var samplerStates = new Array();
                var glslVertex = display3D.AGALConverter.convertToGLSL(this.__gl, vertexProgram);
                var glslFragment = display3D.AGALConverter.convertToGLSL(this.__gl, fragmentProgram, samplerStates);
                this.__uploadFromGLSL(glslVertex, glslFragment);
                for (var i = 0, len = samplerStates.length; i < len; ++i) {
                    this.__setSamplerState(i, samplerStates[i]);
                }
            };
            Program3D.prototype.__buildUniformList = function () {
                this.__uniforms.length = 0;
                this.__samplerUniforms.length = 0;
                this.__alphaSamplerUniforms.length = 0;
                this.__samplerUsageMask = 0;
                var numActive = 0;
                numActive = this.__gl.getProgramParameter(this.__programID, this.__gl.ACTIVE_UNIFORMS);
                var vertexUniforms = new Array();
                var fragmentUniforms = new Array();
                for (var i = 0; i < numActive; ++i) {
                    var info = this.__gl.getActiveUniform(this.__programID, i);
                    var name = info.name;
                    var size = info.size;
                    var uniformType = info.type;
                    var uniform = new Uniform(this.__gl);
                    uniform.name = name;
                    uniform.size = size;
                    uniform.type = uniformType;
                    uniform.location = this.__gl.getUniformLocation(this.__programID, uniform.name);
                    var indexBracket = uniform.name.indexOf('[');
                    if (indexBracket >= 0) {
                        uniform.name = uniform.name.substring(0, indexBracket);
                    }
                    switch (uniform.type) {
                        case this.__gl.FLOAT_MAT2:
                            uniform.regCount = 2;
                            break;
                        case this.__gl.FLOAT_MAT3:
                            uniform.regCount = 3;
                            break;
                        case this.__gl.FLOAT_MAT4:
                            uniform.regCount = 4;
                            break;
                        default: uniform.regCount = 1;
                    }
                    uniform.regCount *= uniform.size;
                    this.__uniforms.push(uniform);
                    var startsWith_2, endsWith_6;
                    if (uniform.name == "vcPositionScale") {
                        this.__positionScale = strict(uniform, Uniform);
                    }
                    else if ((startsWith_2 = uniform.name.substr(0, 2)) == "vc") {
                        uniform.regIndex = parseInt(uniform.name.substring(2));
                        uniform.regData = this.__context.__vertexConstants;
                        uniform.optimized = this.__context.__optimizeUniforms;
                        vertexUniforms.push(uniform);
                    }
                    else if (startsWith_2 == "fc") {
                        uniform.regIndex = parseInt(uniform.name.substring(2));
                        uniform.regData = this.__context.__fragmentConstants;
                        uniform.optimized = this.__context.__optimizeUniforms;
                        fragmentUniforms.push(uniform);
                    }
                    else if (uniformType == 35678 && (endsWith_6 = uniform.name.substr(uniform.name.length - 6)) != "_alpha") {
                        uniform.regIndex = parseInt(uniform.name.substr(2, 1));
                        this.__samplerUniforms.push(uniform);
                        for (var reg = 0; reg < uniform.regCount; ++reg) {
                            this.__samplerUsageMask |= (1 << (uniform.regIndex + reg));
                        }
                    }
                    else if (uniformType == 35678 && endsWith_6 == "_alpha") {
                        uniform.regIndex = parseInt(uniform.name.substr(2, 1));
                        this.__alphaSamplerUniforms.push(uniform);
                    }
                }
                this.__vertexUniformMap = new UniformMap(vertexUniforms.concat());
                this.__fragmentUniformMap = new UniformMap(fragmentUniforms.concat());
            };
            Program3D.prototype.__deleteShaders = function () {
                if (this.__programID != null) {
                    this.__programID = null;
                }
                if (this.__vertexShaderID != null) {
                    this.__gl.deleteShader(this.__vertexShaderID);
                    this.__vertexShaderID = null;
                }
                if (this.__fragmentShaderID != null) {
                    this.__gl.deleteShader(this.__fragmentShaderID);
                    this.__fragmentShaderID = null;
                }
            };
            Program3D.prototype.__flush = function () {
                this.__vertexUniformMap.flush();
                this.__fragmentUniformMap.flush();
            };
            Program3D.prototype.__getSamplerState = function (sampler) {
                return this.__samplerStates[sampler];
            };
            Program3D.prototype.__markDirty = function (isVertex, index, count) {
                if (isVertex) {
                    this.__vertexUniformMap.markDirty(index, count);
                }
                else {
                    this.__fragmentUniformMap.markDirty(index, count);
                }
            };
            Program3D.prototype.__setPositionScale = function (positionScale) {
                if (this.__positionScale != null) {
                    this.__gl.uniform4fv(this.__positionScale.location, positionScale);
                }
            };
            Program3D.prototype.__setSamplerState = function (sampler, state) {
                this.__samplerStates[sampler] = state;
            };
            Program3D.prototype.__uploadFromGLSL = function (vertexShaderSource, fragmentShaderSource) {
                this.__deleteShaders();
                this.__vertexSource = vertexShaderSource;
                this.__fragmentSource = fragmentShaderSource;
                this.__vertexShaderID = this.__gl.createShader(this.__gl.VERTEX_SHADER);
                this.__gl.shaderSource(this.__vertexShaderID, vertexShaderSource);
                this.__gl.compileShader(this.__vertexShaderID);
                var shaderCompiled = this.__gl.getShaderParameter(this.__vertexShaderID, this.__gl.COMPILE_STATUS);
                if (shaderCompiled == 0) {
                    var vertexInfoLog = this.__gl.getShaderInfoLog(this.__vertexShaderID);
                    if (vertexInfoLog != null && vertexInfoLog.length != 0) {
                        trace('vertex: ${vertexInfoLog}');
                    }
                    throw new Error("Error compiling vertex shader: " + vertexInfoLog);
                }
                this.__fragmentShaderID = this.__gl.createShader(this.__gl.FRAGMENT_SHADER);
                this.__gl.shaderSource(this.__fragmentShaderID, fragmentShaderSource);
                this.__gl.compileShader(this.__fragmentShaderID);
                var fragmentCompiled = this.__gl.getShaderParameter(this.__fragmentShaderID, this.__gl.COMPILE_STATUS);
                if (fragmentCompiled == 0) {
                    var fragmentInfoLog = this.__gl.getShaderInfoLog(this.__fragmentShaderID);
                    if (fragmentInfoLog != null && fragmentInfoLog.length != 0) {
                        trace('fragment: ${fragmentInfoLog}');
                    }
                    throw new Error("Error compiling fragment shader: " + fragmentInfoLog);
                }
                this.__programID = this.__gl.createProgram();
                this.__gl.attachShader(this.__programID, this.__vertexShaderID);
                this.__gl.attachShader(this.__programID, this.__fragmentShaderID);
                for (var i = 0, len = display3D.Context3D.MAX_ATTRIBUTES; i < len; ++i) {
                    var name = "va" + i;
                    if (vertexShaderSource.indexOf(" " + name) != -1) {
                        this.__gl.bindAttribLocation(this.__programID, i, name);
                    }
                }
                this.__gl.linkProgram(this.__programID);
                this.__buildUniformList();
            };
            Program3D.prototype.__use = function () {
                this.__gl.useProgram(this.__programID);
                this.__vertexUniformMap.markAllDirty();
                this.__fragmentUniformMap.markAllDirty();
                var __for0 = window.asc.of(this.__samplerUniforms);
                for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                    var sampler = __for0_1[_i];
                    if (sampler.regCount == 1) {
                        this.__gl.uniform1i(sampler.location, sampler.regIndex);
                    }
                    else {
                        throw new display3D.IllegalOperationError("!!! TODO: uniform location on webgl");
                    }
                }
                var __for1 = window.asc.of(this.__alphaSamplerUniforms);
                for (var _a = 0, __for1_1 = __for1; _a < __for1_1.length; _a++) {
                    sampler = __for1_1[_a];
                    if (sampler.regCount == 1) {
                        this.__gl.uniform1i(sampler.location, sampler.regIndex);
                    }
                    else {
                        throw new display3D.IllegalOperationError("!!! TODO: uniform location on webgl");
                    }
                }
            };
            return Program3D;
        }());
        display3D.Program3D = Program3D;
        var Uniform = (function () {
            function Uniform(gl) {
                this.type = 0;
                this.size = 0;
                this.regIndex = 0;
                this.regCount = 0;
                this.__gl = gl;
                this.isDirty = true;
            }
            Uniform.prototype.flush = function () {
                var index = this.regIndex * 4;
                switch (this.type) {
                    case this.__gl.FLOAT_MAT2:
                        this.__gl.uniformMatrix2fv(this.location, false, this.__getRegisters(index, this.size * 2 * 2));
                        break;
                    case this.__gl.FLOAT_MAT3:
                        this.__gl.uniformMatrix3fv(this.location, false, this.__getRegisters(index, this.size * 3 * 3));
                        break;
                    case this.__gl.FLOAT_MAT4:
                        this.__gl.uniformMatrix4fv(this.location, false, this.__getRegisters(index, this.size * 4 * 4));
                        break;
                    case this.__gl.FLOAT:
                        this.__gl.uniform1fv(this.location, this.__getRegisters(index, this.regCount * 1));
                        break;
                    case this.__gl.FLOAT_VEC2:
                        this.__gl.uniform2fv(this.location, this.__getRegisters(index, this.regCount * 2));
                        break;
                    case this.__gl.FLOAT_VEC3:
                        this.__gl.uniform3fv(this.location, this.__getRegisters(index, this.regCount * 3));
                        break;
                    case this.__gl.FLOAT_VEC4:
                        this.__gl.uniform4fv(this.location, this.__getRegisters(index, this.regCount * 4));
                        break;
                    default: this.__gl.uniform4fv(this.location, this.__getRegisters(index, this.regCount * 4));
                }
            };
            Uniform.prototype.__getRegisters = function (index, size) {
                if (this.optimized) {
                    return this.regData[index];
                }
                else {
                    return this.regData.subarray(index, index + size);
                }
            };
            return Uniform;
        }());
        var UniformMap = (function () {
            function UniformMap(list) {
                this.__uniforms = list;
                this.__uniforms.sort(Array.NUMERIC);
                var total = 0;
                var __for2 = window.asc.of(this.__uniforms);
                for (var _i = 0, __for2_1 = __for2; _i < __for2_1.length; _i++) {
                    var uniform = __for2_1[_i];
                    if (uniform.regIndex + uniform.regCount > total) {
                        total = uniform.regIndex + uniform.regCount;
                    }
                }
                this.__registerLookup = new Array(total);
                var __for3 = window.asc.of(this.__uniforms);
                for (var _a = 0, __for3_1 = __for3; _a < __for3_1.length; _a++) {
                    uniform = __for3_1[_a];
                    for (var i = 0, len = uniform.regCount; i < len; ++i) {
                        this.__registerLookup[uniform.regIndex + i] = uniform;
                    }
                }
                this.__anyDirty = this.__allDirty = true;
            }
            UniformMap.prototype.flush = function () {
                if (this.__anyDirty) {
                    for (var i = 0, len = this.__uniforms.length; i < len; ++i) {
                        var uniform = this.__uniforms[i];
                        if (this.__allDirty || uniform.isDirty) {
                            uniform.flush();
                            uniform.isDirty = false;
                        }
                    }
                    this.__anyDirty = this.__allDirty = false;
                }
            };
            UniformMap.prototype.markAllDirty = function () {
                this.__allDirty = true;
                this.__anyDirty = true;
            };
            UniformMap.prototype.markDirty = function (start, count) {
                if (this.__allDirty) {
                    return;
                }
                var end = start + count;
                if (end > this.__registerLookup.length) {
                    end = this.__registerLookup.length;
                }
                var index = start;
                while (index < end) {
                    var uniform = this.__registerLookup[index];
                    if (uniform != null) {
                        uniform.isDirty = true;
                        this.__anyDirty = true;
                        index = uniform.regIndex + uniform.regCount;
                    }
                    else {
                        index++;
                    }
                }
            };
            return UniformMap;
        }());
    })(display3D = flash.display3D || (flash.display3D = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Program3D.js.map