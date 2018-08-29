var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                webgl.Int64 = flash.__native.types.haxe.Int64;
                webgl.IllegalOperationError = flash.errors.IllegalOperationError;
                webgl.ByteArray = flash.utils.ByteArray;
                webgl.Endian = flash.utils.Endian;
                var AGALConverter = (function () {
                    function AGALConverter() {
                    }
                    AGALConverter.prefixFromType = function (regType, programType) {
                        regType = ((regType) >> 0);
                        programType = ((programType) >> 0);
                        switch (regType) {
                            case RegisterType.ATTRIBUTE: return "va";
                            case RegisterType.CONSTANT: return (programType == ProgramType.VERTEX) ? "vc" : "fc";
                            case RegisterType.TEMPORARY: return (programType == ProgramType.VERTEX) ? "vt" : "ft";
                            case RegisterType.OUTPUT: return "output_";
                            case RegisterType.VARYING: return "v";
                            case RegisterType.SAMPLER: return "sampler";
                            default:
                                throw new webgl.IllegalOperationError("Invalid data!");
                        }
                    };
                    AGALConverter.readUInt64 = function (byteArray) {
                        byteArray = strict(byteArray, webgl.ByteArray);
                        var low = byteArray.readInt();
                        var high = byteArray.readInt();
                        return webgl.Int64.make(high, low);
                    };
                    AGALConverter.convertToGLSL = function (gl, agal, samplerState) {
                        if (samplerState === void 0) { samplerState = null; }
                        gl = strict(gl, WebGLRenderingContext);
                        agal = strict(agal, webgl.ByteArray);
                        agal.position = 0;
                        agal.endian = webgl.Endian.LITTLE_ENDIAN;
                        var magic = agal.readByte() & 0xFF;
                        if (magic != 0xA0) {
                            agal.position = 0;
                            return agal.readUTFBytes(agal.length);
                        }
                        var version = agal.readInt();
                        if (version != 1) {
                            throw new webgl.IllegalOperationError("Version must be 1");
                        }
                        var shaderTypeID = agal.readByte() & 0xFF;
                        if (shaderTypeID != 0xA1) {
                            throw new webgl.IllegalOperationError("Shader type ID must be 0xA1");
                        }
                        var programType = (agal.readByte() & 0xFF) == 0 ? ProgramType.VERTEX : ProgramType.FRAGMENT;
                        var map = new RegisterMap();
                        var sb = '';
                        while (agal.position < agal.length) {
                            var opcode = agal.readInt();
                            var dest = ((agal.readUnsignedInt()) >> 0);
                            var source1 = AGALConverter.readUInt64(agal);
                            var source2 = AGALConverter.readUInt64(agal);
                            var dr = DestRegister.parse(dest, programType);
                            var sr1 = SourceRegister.parse(source1, programType, dr.mask);
                            var sr2 = SourceRegister.parse(source2, programType, dr.mask);
                            sb += ("\t");
                            switch (opcode) {
                                case 0x00:
                                    sb += (dr.toGLSL() + " = " + sr1.toGLSL() + "; // mov");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x01:
                                    sb += (dr.toGLSL() + " = " + sr1.toGLSL() + " + " + sr2.toGLSL() + "; // add");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x02:
                                    sb += (dr.toGLSL() + " = " + sr1.toGLSL() + " - " + sr2.toGLSL() + "; // sub");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x03:
                                    sb += (dr.toGLSL() + " = " + sr1.toGLSL() + " * " + sr2.toGLSL() + "; // mul");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x04:
                                    sb += (dr.toGLSL() + " = " + sr1.toGLSL() + " / " + sr2.toGLSL() + "; // div");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x05:
                                    var sr = sr1.toGLSL();
                                    if (sr.indexOf(".") > -1) {
                                        sb += (dr.toGLSL() + " = 1.0 / " + sr1.toGLSL() + "; // rcp");
                                    }
                                    else {
                                        sb += (dr.toGLSL() + " = vec4(1) / " + sr1.toGLSL() + "; // rcp");
                                    }
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x06:
                                    sb += (dr.toGLSL() + " = min(" + sr1.toGLSL() + ", " + sr2.toGLSL() + "); // min");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x07:
                                    sb += (dr.toGLSL() + " = max(" + sr1.toGLSL() + ", " + sr2.toGLSL() + "); // max");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x08:
                                    sb += (dr.toGLSL() + " = fract(" + sr1.toGLSL() + "); // frc");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x09:
                                    sb += (dr.toGLSL() + " = sqrt(" + sr1.toGLSL() + "); // sqrt");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x0A:
                                    sb += (dr.toGLSL() + " = inversesqrt(" + sr1.toGLSL() + "); // rsq");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x0B:
                                    sb += (dr.toGLSL() + " = pow(" + sr1.toGLSL() + ", " + sr2.toGLSL() + "); // pow");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x0C:
                                    sb += (dr.toGLSL() + " = log2(" + sr1.toGLSL() + "); // log");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x0D:
                                    sb += (dr.toGLSL() + " = exp2(" + sr1.toGLSL() + "); // exp");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x0E:
                                    sb += (dr.toGLSL() + " = normalize(" + sr1.toGLSL() + "); // normalize");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x0F:
                                    sb += (dr.toGLSL() + " = sin(" + sr1.toGLSL() + "); // sin");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x10:
                                    sb += (dr.toGLSL() + " = cos(" + sr1.toGLSL() + "); // cos");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x11:
                                    sr1.sourceMask = sr2.sourceMask = 7;
                                    sb += (dr.toGLSL() + " = cross(vec3(" + sr1.toGLSL() + "), vec3(" + sr2.toGLSL() + ")); // crs");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x12:
                                    sr1.sourceMask = sr2.sourceMask = 7;
                                    sb += (dr.toGLSL() + " = vec4(dot(vec3(" + sr1.toGLSL() + "), vec3(" + sr2.toGLSL() + ")))" + dr.getWriteMask() + "; // dp3");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x13:
                                    sr1.sourceMask = sr2.sourceMask = 0xF;
                                    sb += (dr.toGLSL() + " = vec4(dot(vec4(" + sr1.toGLSL() + "), vec4(" + sr2.toGLSL() + ")))" + dr.getWriteMask() + "; // dp4");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x14:
                                    sb += (dr.toGLSL() + " = abs(" + sr1.toGLSL() + "); // abs");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x15:
                                    sb += (dr.toGLSL() + " = -" + sr1.toGLSL() + "; // neg");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x16:
                                    sb += (dr.toGLSL() + " = clamp(" + sr1.toGLSL() + ", 0.0, 1.0); // saturate");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x17:
                                    var existingUsage = map.getRegisterUsage(sr2);
                                    if (existingUsage != RegisterUsage.VECTOR_4 && existingUsage != RegisterUsage.VECTOR_4_ARRAY) {
                                        sb += (dr.toGLSL() + " = " + sr1.toGLSL() + " * mat3(" + sr2.toGLSL(false) + "); // m33");
                                        map.addDR(dr, RegisterUsage.VECTOR_4);
                                        map.addSR(sr1, RegisterUsage.VECTOR_4);
                                        map.addSR(sr2, RegisterUsage.MATRIX_4_4);
                                    }
                                    else {
                                        sr1.sourceMask = sr2.sourceMask = 7;
                                        sb += (dr.toGLSL() + " = vec3(" +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 0) + "), " +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 1) + ")," +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 2) + ")); // m33");
                                        map.addDR(dr, RegisterUsage.VECTOR_4);
                                        map.addSR(sr1, RegisterUsage.VECTOR_4);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 0);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 1);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 2);
                                    }
                                    break;
                                case 0x18:
                                    existingUsage = map.getRegisterUsage(sr2);
                                    if (existingUsage != RegisterUsage.VECTOR_4 && existingUsage != RegisterUsage.VECTOR_4_ARRAY) {
                                        sb += (dr.toGLSL() + " = " + sr1.toGLSL() + " * " + sr2.toGLSL(false) + "; // m44");
                                        map.addDR(dr, RegisterUsage.VECTOR_4);
                                        map.addSR(sr1, RegisterUsage.VECTOR_4);
                                        map.addSR(sr2, RegisterUsage.MATRIX_4_4);
                                    }
                                    else {
                                        sr1.sourceMask = sr2.sourceMask = 0xF;
                                        sb += (dr.toGLSL() + " = vec4(" +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 0) + "), " +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 1) + "), " +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 2) + "), " +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 3) + ")); // m44");
                                        map.addDR(dr, RegisterUsage.VECTOR_4);
                                        map.addSR(sr1, RegisterUsage.VECTOR_4);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 0);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 1);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 2);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 3);
                                    }
                                    break;
                                case 0x19:
                                    dr.mask &= 7;
                                    existingUsage = map.getRegisterUsage(sr2);
                                    if (existingUsage != RegisterUsage.VECTOR_4 && existingUsage != RegisterUsage.VECTOR_4_ARRAY) {
                                        sb += (dr.toGLSL() + " = " + sr1.toGLSL() + " * " + sr2.toGLSL(false) + "; // m34");
                                        map.addDR(dr, RegisterUsage.VECTOR_4);
                                        map.addSR(sr1, RegisterUsage.VECTOR_4);
                                        map.addSR(sr2, RegisterUsage.MATRIX_4_4);
                                    }
                                    else {
                                        sr1.sourceMask = sr2.sourceMask = 0xF;
                                        sb += (dr.toGLSL() + " = vec3(" +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 0) + "), " +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 1) + ")," +
                                            "dot(" + sr1.toGLSL(true) + "," + sr2.toGLSL(true, 2) + ")); // m34");
                                        map.addDR(dr, RegisterUsage.VECTOR_4);
                                        map.addSR(sr1, RegisterUsage.VECTOR_4);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 0);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 1);
                                        map.addSR(sr2, RegisterUsage.VECTOR_4, 2);
                                    }
                                    break;
                                case 0x27:
                                    if (true) {
                                        sr1.sourceMask = 0xF;
                                        sb += ("if (any(lessThan(" + sr1.toGLSL() + ", vec4(0)))) discard;");
                                        map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    }
                                    break;
                                case 0x28:
                                    var sampler = SamplerRegister.parse(source2, programType);
                                    switch (sampler.d) {
                                        case 0:
                                            sr1.sourceMask = 0x3;
                                            map.addSaR(sampler, RegisterUsage.SAMPLER_2D);
                                            sb += (dr.toGLSL() + " = texture2D(" + sampler.toGLSL() + ", " + sr1.toGLSL() + "); // tex");
                                            break;
                                        case 1:
                                            sr1.sourceMask = 0x7;
                                            sb += (dr.toGLSL() + " = textureCube(" + sampler.toGLSL() + ", " + sr1.toGLSL() + "); // tex");
                                            map.addSaR(sampler, RegisterUsage.SAMPLER_CUBE);
                                            break;
                                    }
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    if (samplerState != null) {
                                        samplerState[sampler.n] = sampler.toSamplerState();
                                    }
                                    break;
                                case 0x29:
                                    sr1.sourceMask = sr2.sourceMask = 0xF;
                                    sb += (dr.toGLSL() + " = vec4(greaterThanEqual(" + sr1.toGLSL() + ", " + sr2.toGLSL() + "))" + dr.getWriteMask() + "; // ste");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x2A:
                                    sr1.sourceMask = sr2.sourceMask = 0xF;
                                    sb += (dr.toGLSL() + " = vec4(lessThan(" + sr1.toGLSL() + ", " + sr2.toGLSL() + "))" + dr.getWriteMask() + "; // slt");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x2C:
                                    sr1.sourceMask = sr2.sourceMask = 0xF;
                                    sb += (dr.toGLSL() + " = vec4(equal(" + sr1.toGLSL() + ", " + sr2.toGLSL() + "))" + dr.getWriteMask() + "; // seq");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                case 0x2D:
                                    sr1.sourceMask = sr2.sourceMask = 0xF;
                                    sb += (dr.toGLSL() + " = vec4(notEqual(" + sr1.toGLSL() + ", " + sr2.toGLSL() + "))" + dr.getWriteMask() + "; // sne");
                                    map.addDR(dr, RegisterUsage.VECTOR_4);
                                    map.addSR(sr1, RegisterUsage.VECTOR_4);
                                    map.addSR(sr2, RegisterUsage.VECTOR_4);
                                    break;
                                default:
                                    throw new webgl.IllegalOperationError("Opcode " + opcode);
                            }
                            sb += ("\n");
                        }
                        if (AGALConverter.limitedProfile == null) {
                            var ver = as(gl.getParameter(gl.VERSION), 'String');
                            AGALConverter.limitedProfile = (ver.indexOf("OpenGL ES") > -1 || ver.indexOf("WebGL") > -1);
                        }
                        var glsl = '';
                        glsl += ("// AGAL " + ((programType == ProgramType.VERTEX) ? "vertex" : "fragment") + " shader\n");
                        if (AGALConverter.limitedProfile) {
                            glsl += ("#version 100\n");
                            glsl += ("precision highp float;\n");
                        }
                        else {
                            glsl += ("#version 120\n");
                        }
                        glsl += (map.toGLSL(false));
                        if (programType == ProgramType.VERTEX) {
                            glsl += ("uniform vec4 vcPositionScale;\n");
                        }
                        glsl += ("void main() {\n");
                        glsl += (map.toGLSL(true));
                        glsl += (sb);
                        if (programType == ProgramType.VERTEX) {
                            glsl += ("\tgl_Position *= vcPositionScale;\n");
                        }
                        glsl += ("}\n");
                        return glsl;
                    };
                    AGALConverter.limitedProfile = null;
                    return AGALConverter;
                }());
                webgl.AGALConverter = AGALConverter;
                webgl.Int64 = flash.__native.types.haxe.Int64;
                webgl.IllegalOperationError = flash.errors.IllegalOperationError;
                webgl.Dictionary = flash.utils.Dictionary;
                var DestRegister = (function () {
                    function DestRegister() {
                        this.mask = 0;
                        this.n = 0;
                        this.programType = 0;
                        this.type = 0;
                    }
                    DestRegister.prototype.getWriteMask = function () {
                        var str = ".";
                        if ((this.mask & 1) != 0)
                            str += "x";
                        if ((this.mask & 2) != 0)
                            str += "y";
                        if ((this.mask & 4) != 0)
                            str += "z";
                        if ((this.mask & 8) != 0)
                            str += "w";
                        return str;
                    };
                    DestRegister.parse = function (v, programType) {
                        v = ((v) >>> 0);
                        programType = ((programType) >> 0);
                        var dr = new DestRegister();
                        dr.programType = programType;
                        dr.type = ((v >> 24) & 0xF);
                        dr.mask = ((v >> 16) & 0xF);
                        dr.n = (v & 0xFFFF);
                        return dr;
                    };
                    DestRegister.prototype.toGLSL = function (useMask) {
                        if (useMask === void 0) { useMask = true; }
                        useMask = Boolean(useMask);
                        var str;
                        if (this.type == RegisterType.OUTPUT) {
                            str = this.programType == ProgramType.VERTEX ? "gl_Position" : "gl_FragColor";
                        }
                        else {
                            str = AGALConverter.prefixFromType(this.type, this.programType) + this.n;
                        }
                        if (useMask && this.mask != 0xF) {
                            str += this.getWriteMask();
                        }
                        return str;
                    };
                    return DestRegister;
                }());
                var ProgramType = (function () {
                    function ProgramType() {
                    }
                    ProgramType.VERTEX = 0;
                    ProgramType.FRAGMENT = 1;
                    return ProgramType;
                }());
                var RegisterMap = (function () {
                    function RegisterMap() {
                        this.mEntries = new Array();
                    }
                    RegisterMap.prototype.add = function (type, name, number, usage) {
                        type = ((type) >> 0);
                        name = as(name, 'String');
                        number = ((number) >> 0);
                        usage = ((usage) >> 0);
                        var __for0 = window.asc.of(this.mEntries);
                        for (var _i = 0, __for0_1 = __for0; _i < __for0_1.length; _i++) {
                            var entry = __for0_1[_i];
                            if (entry.type == type && entry.name == name && entry.number == number) {
                                if (entry.usage != usage) {
                                    throw new webgl.IllegalOperationError("Cannot use register in multiple ways yet (mat4/vec4)");
                                }
                                return;
                            }
                        }
                        entry = new RegisterMapEntry();
                        entry.type = type;
                        entry.name = name;
                        entry.number = number;
                        entry.usage = usage;
                        this.mEntries.push(entry);
                    };
                    RegisterMap.prototype.addDR = function (dr, usage) {
                        dr = strict(dr, DestRegister);
                        usage = ((usage) >> 0);
                        this.add(dr.type, dr.toGLSL(false), dr.n, usage);
                    };
                    RegisterMap.prototype.addSaR = function (sr, usage) {
                        sr = strict(sr, SamplerRegister);
                        usage = ((usage) >> 0);
                        this.add(sr.type, sr.toGLSL(), sr.n, usage);
                    };
                    RegisterMap.prototype.addSR = function (sr, usage, offset) {
                        if (offset === void 0) { offset = 0; }
                        sr = strict(sr, SourceRegister);
                        usage = ((usage) >> 0);
                        offset = ((offset) >> 0);
                        if (sr.d != 0) {
                            this.add(sr.itype, AGALConverter.prefixFromType(sr.itype, sr.programType) + sr.n, sr.n, RegisterUsage.VECTOR_4);
                            this.add(sr.type, AGALConverter.prefixFromType(sr.type, sr.programType) + sr.o, sr.o, RegisterUsage.VECTOR_4_ARRAY);
                            return;
                        }
                        this.add(sr.type, sr.toGLSL(false, offset), sr.n + offset, usage);
                    };
                    RegisterMap.prototype.getRegisterUsage = function (sr) {
                        sr = strict(sr, SourceRegister);
                        if (sr.d != 0) {
                            return RegisterUsage.VECTOR_4_ARRAY;
                        }
                        return this.getUsage(sr.type, sr.toGLSL(false), sr.n);
                    };
                    RegisterMap.prototype.getUsage = function (type, name, number) {
                        type = ((type) >> 0);
                        name = as(name, 'String');
                        number = ((number) >> 0);
                        var __for1 = window.asc.of(this.mEntries);
                        for (var _i = 0, __for1_1 = __for1; _i < __for1_1.length; _i++) {
                            var entry = __for1_1[_i];
                            if (entry.type == type && entry.name == name && entry.number == number) {
                                return entry.usage;
                            }
                        }
                        return RegisterUsage.UNUSED;
                    };
                    RegisterMap.prototype.toGLSL = function (tempRegistersOnly) {
                        tempRegistersOnly = Boolean(tempRegistersOnly);
                        this.mEntries.sort(function (a, b) {
                            return a.number - b.number;
                        }.__bind(this));
                        var arrayCount = new webgl.Dictionary();
                        var entry;
                        for (var i = 0, len = ((this.mEntries.length) >> 0); i < len; ++i) {
                            entry = strict(this.mEntries[i], RegisterMapEntry);
                            if (entry.usage == RegisterUsage.VECTOR_4_ARRAY) {
                                if (i < this.mEntries.length - 1) {
                                    arrayCount.set(entry, this.mEntries[i + 1].number - entry.number);
                                }
                                else {
                                    arrayCount.set(entry, 128);
                                }
                            }
                        }
                        this.mEntries.sort(function (a, b) {
                            return ((a.type) >> 0) - ((b.type) >> 0);
                        }.__bind(this));
                        var sb = '';
                        for (i = 0, len = this.mEntries.length; i < len; ++i) {
                            entry = strict(this.mEntries[i], RegisterMapEntry);
                            if ((tempRegistersOnly && entry.type != RegisterType.TEMPORARY) || (!tempRegistersOnly && entry.type == RegisterType.TEMPORARY)) {
                                continue;
                            }
                            if (entry.type == RegisterType.OUTPUT) {
                                continue;
                            }
                            switch (entry.type) {
                                case RegisterType.ATTRIBUTE:
                                    sb += ("attribute ");
                                    break;
                                case RegisterType.CONSTANT:
                                    sb += ("uniform ");
                                    break;
                                case RegisterType.TEMPORARY:
                                    sb += ("\t");
                                    break;
                                case RegisterType.OUTPUT:
                                case RegisterType.VARYING:
                                    sb += ("varying ");
                                    break;
                                case RegisterType.SAMPLER:
                                    sb += ("uniform ");
                                    break;
                                default:
                                    throw new webgl.IllegalOperationError();
                            }
                            switch (entry.usage) {
                                case RegisterUsage.VECTOR_4:
                                    sb += ("vec4 ");
                                    break;
                                case RegisterUsage.VECTOR_4_ARRAY:
                                    sb += ("vec4 ");
                                    break;
                                case RegisterUsage.MATRIX_4_4:
                                    sb += ("mat4 ");
                                    break;
                                case RegisterUsage.SAMPLER_2D:
                                    sb += ("sampler2D ");
                                    break;
                                case RegisterUsage.SAMPLER_CUBE:
                                    sb += ("samplerCube ");
                                    break;
                                case RegisterUsage.UNUSED:
                                    trace("Missing switch patten: RegisterUsage.UNUSED");
                                    break;
                                case RegisterUsage.SAMPLER_2D_ALPHA:
                                    trace("Missing switch patten: RegisterUsage.SAMPLER_2D_ALPHA");
                                    break;
                            }
                            if (entry.usage == RegisterUsage.SAMPLER_2D_ALPHA) {
                                sb += ("sampler2D ");
                                sb += (entry.name);
                                sb += (";\n");
                                sb += ("uniform ");
                                sb += ("sampler2D ");
                                sb += (entry.name + "_alpha");
                                sb += (";\n");
                            }
                            else if (entry.usage == RegisterUsage.VECTOR_4_ARRAY) {
                                sb += (entry.name + "[" + arrayCount.get(entry) + "]");
                                sb += (";\n");
                            }
                            else {
                                sb += (entry.name);
                                sb += (";\n");
                            }
                        }
                        return sb;
                    };
                    return RegisterMap;
                }());
                var RegisterMapEntry = (function () {
                    function RegisterMapEntry() {
                        this.name = null;
                        this.number = 0;
                        this.type = 0;
                        this.usage = 0;
                    }
                    return RegisterMapEntry;
                }());
                var RegisterType = (function () {
                    function RegisterType() {
                    }
                    RegisterType.ATTRIBUTE = 0;
                    RegisterType.CONSTANT = 1;
                    RegisterType.TEMPORARY = 2;
                    RegisterType.OUTPUT = 3;
                    RegisterType.VARYING = 4;
                    RegisterType.SAMPLER = 5;
                    return RegisterType;
                }());
                var RegisterUsage = (function () {
                    function RegisterUsage() {
                    }
                    RegisterUsage.UNUSED = 0;
                    RegisterUsage.VECTOR_4 = 1;
                    RegisterUsage.MATRIX_4_4 = 2;
                    RegisterUsage.SAMPLER_2D = 3;
                    RegisterUsage.SAMPLER_2D_ALPHA = 4;
                    RegisterUsage.SAMPLER_CUBE = 5;
                    RegisterUsage.VECTOR_4_ARRAY = 6;
                    return RegisterUsage;
                }());
                var SamplerRegister = (function () {
                    function SamplerRegister() {
                        this.b = 0;
                        this.d = 0;
                        this.f = 0;
                        this.m = 0;
                        this.n = 0;
                        this.programType = 0;
                        this.s = 0;
                        this.t = 0;
                        this.type = 0;
                        this.w = 0;
                    }
                    SamplerRegister.parse = function (v, programType) {
                        v = strict(v, webgl.Int64);
                        programType = ((programType) >> 0);
                        var low = v.low.toInt();
                        var high = v.high.toInt();
                        var sr = new SamplerRegister();
                        sr.programType = programType;
                        sr.f = ((high >> 28) & 0xF);
                        sr.m = ((high >> 24) & 0xF);
                        sr.w = ((high >> 20) & 0xF);
                        sr.s = ((high >> 16) & 0xF);
                        sr.d = ((high >> 12) & 0xF);
                        sr.t = ((high >> 8) & 0xF);
                        sr.type = ((high >> 0) & 0xF);
                        sr.b = ((low >> 16) & 0xFF);
                        sr.n = (low & 0xFFFF);
                        return sr;
                    };
                    SamplerRegister.prototype.toGLSL = function () {
                        return AGALConverter.prefixFromType(this.type, this.programType) + this.n;
                    };
                    SamplerRegister.prototype.toSamplerState = function () {
                        var magFilter = 0;
                        var minFilter = 0;
                        var wrapModeS = 0;
                        var wrapModeT = 0;
                        switch (this.f) {
                            case 0:
                                magFilter = ((SamplerRegister.NEAREST) >> 0);
                                break;
                            case 1:
                                magFilter = ((SamplerRegister.LINEAR) >> 0);
                                break;
                            default: throw new webgl.IllegalOperationError();
                        }
                        switch (this.m) {
                            case 0:
                                minFilter = (((this.f != 0) ? SamplerRegister.LINEAR : SamplerRegister.NEAREST) >> 0);
                                break;
                            case 1:
                                minFilter = (((this.f != 0) ? SamplerRegister.LINEAR_MIPMAP_NEAREST : SamplerRegister.NEAREST_MIPMAP_NEAREST) >> 0);
                                break;
                            case 2:
                                minFilter = (((this.f != 0) ? SamplerRegister.LINEAR_MIPMAP_LINEAR : SamplerRegister.NEAREST_MIPMAP_LINEAR) >> 0);
                                break;
                            default:
                                throw new webgl.IllegalOperationError();
                        }
                        switch (this.w) {
                            case 0:
                                wrapModeS = ((SamplerRegister.CLAMP_TO_EDGE) >> 0);
                                wrapModeT = ((SamplerRegister.CLAMP_TO_EDGE) >> 0);
                                break;
                            case 1:
                                wrapModeS = ((SamplerRegister.REPEAT) >> 0);
                                wrapModeT = ((SamplerRegister.REPEAT) >> 0);
                                break;
                            default:
                                throw new webgl.IllegalOperationError();
                        }
                        var ignoreSampler = (this.s & 4) == 4;
                        var centroid = (this.s & 1) == 1;
                        var lodBias = ((this.b << 24) >> 24) / 8.0;
                        var maxAniso = 0.0;
                        return new webgl.SamplerState(minFilter, magFilter, wrapModeS, wrapModeT, lodBias, maxAniso, ignoreSampler, centroid);
                    };
                    SamplerRegister.NEAREST = 0x2600;
                    SamplerRegister.LINEAR = 0x2601;
                    SamplerRegister.NEAREST_MIPMAP_NEAREST = 0x2700;
                    SamplerRegister.LINEAR_MIPMAP_NEAREST = 0x2701;
                    SamplerRegister.NEAREST_MIPMAP_LINEAR = 0x2702;
                    SamplerRegister.LINEAR_MIPMAP_LINEAR = 0x2703;
                    SamplerRegister.REPEAT = 0x2901;
                    SamplerRegister.CLAMP_TO_EDGE = 0x812F;
                    return SamplerRegister;
                }());
                var SourceRegister = (function () {
                    function SourceRegister() {
                        this.d = 0;
                        this.itype = 0;
                        this.n = 0;
                        this.o = 0;
                        this.programType = 0;
                        this.q = 0;
                        this.s = 0;
                        this.sourceMask = 0;
                        this.type = 0;
                    }
                    SourceRegister.parse = function (v, programType, sourceMask) {
                        v = strict(v, webgl.Int64);
                        programType = ((programType) >> 0);
                        sourceMask = ((sourceMask) >> 0);
                        var low = v.low.toInt();
                        var high = v.high.toInt();
                        var sr = new SourceRegister();
                        sr.programType = programType;
                        sr.d = ((high >> 31) & 1);
                        sr.q = ((high >> 16) & 0x3);
                        sr.itype = ((high >> 8) & 0xF);
                        sr.type = ((high >> 0) & 0xF);
                        sr.s = ((low >> 24) & 0xFF);
                        sr.o = ((low >> 16) & 0xFF);
                        sr.n = (low & 0xFFFF);
                        sr.sourceMask = sourceMask;
                        return sr;
                    };
                    SourceRegister.prototype.toGLSL = function (emitSwizzle, offset) {
                        if (emitSwizzle === void 0) { emitSwizzle = true; }
                        if (offset === void 0) { offset = 0; }
                        emitSwizzle = Boolean(emitSwizzle);
                        offset = ((offset) >> 0);
                        if (this.type == RegisterType.OUTPUT) {
                            return this.programType == ProgramType.VERTEX ? "gl_Position" : "gl_FragColor";
                        }
                        var fullxyzw = (this.s == 228) && (this.sourceMask == 0xF);
                        var swizzle = "";
                        if (this.type != RegisterType.SAMPLER && !fullxyzw) {
                            for (var i = 0; i < 4; ++i) {
                                if ((this.sourceMask & (1 << i)) != 0) {
                                    switch ((this.s >> (i * 2)) & 3) {
                                        case 0:
                                            swizzle += "x";
                                            break;
                                        case 1:
                                            swizzle += "y";
                                            break;
                                        case 2:
                                            swizzle += "z";
                                            break;
                                        case 3:
                                            swizzle += "w";
                                            break;
                                    }
                                }
                            }
                        }
                        var str = AGALConverter.prefixFromType(this.type, this.programType);
                        if (this.d == 0) {
                            str += (this.n + offset);
                        }
                        else {
                            str += this.o;
                            var indexComponent = String.fromCharCode('x'.charCodeAt(0) + this.q);
                            var indexRegister = AGALConverter.prefixFromType(this.itype, this.programType) + this.n + "." + indexComponent;
                            str += "[ int(" + indexRegister + ") +" + offset + "]";
                        }
                        if (emitSwizzle && swizzle != "") {
                            str += "." + swizzle;
                        }
                        return str;
                    };
                    return SourceRegister;
                }());
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AGALConverter.js.map