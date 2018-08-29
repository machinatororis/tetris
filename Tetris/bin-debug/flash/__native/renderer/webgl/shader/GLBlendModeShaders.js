var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var renderer;
        (function (renderer) {
            var webgl;
            (function (webgl) {
                var shader;
                (function (shader) {
                    shader.BlendMode = flash.display.BlendMode;
                    shader.Context3D = flash.display3D.Context3D;
                    shader.Program3D = flash.display3D.Program3D;
                    var GLBlendModeShaders = (function () {
                        function GLBlendModeShaders() {
                        }
                        GLBlendModeShaders.hasProgram = function (blendMode) {
                            switch (blendMode) {
                                case shader.BlendMode.MULTIPLY: return 1;
                                case shader.BlendMode.LIGHTEN: return 2;
                                case shader.BlendMode.DARKEN: return 3;
                                case shader.BlendMode.DIFFERENCE: return 4;
                                case shader.BlendMode.INVERT: return 5;
                                case shader.BlendMode.OVERLAY: return 6;
                                case shader.BlendMode.HARDLIGHT: return 7;
                            }
                            return 0;
                        };
                        GLBlendModeShaders.getProgram = function (context, blendMode, colorMultiply, colorOffset) {
                            var shaderBlend = GLBlendModeShaders.hasProgram(blendMode);
                            var hash = (shaderBlend << 16) | ((colorMultiply ? 1 : 0) << 8) | (colorOffset ? 1 : 0);
                            var program = GLBlendModeShaders.sHelperShaderMap[hash];
                            if (program) {
                                return program;
                            }
                            var vertexShader;
                            var fragShader;
                            if (shaderBlend) {
                                var formula = '';
                                var template = '';
                                if (blendMode == shader.BlendMode.INVERT) {
                                    formula = '' +
                                        '	{{COLOR_TRANSFORM_FC0}}' +
                                        '	{{COLOR_TRANSFORM_FC1}}' +
                                        '	{{BALANCE_COLOR}}' +
                                        '	r.a = s.a + d.a * (1. - s.a);\n' +
                                        '	for (int i = 0; i < 3; i++) {\n' +
                                        '		r[i] = s.a + d[i] - 2. * s.a * d[i];\n' +
                                        '	}\n';
                                }
                                else {
                                    formula = '' +
                                        '	if (d.a > 0.0) d.rgb /= d.a;\n' +
                                        '	if (s.a > 0.0) s.rgb /= s.a;\n' +
                                        '	{{COLOR_TRANSFORM_FC0}}' +
                                        '	{{COLOR_TRANSFORM_FC1}}' +
                                        '	{{BALANCE_COLOR}}' +
                                        '	r.a = s.a + d.a * (1. - s.a);\n' +
                                        '	for (int i = 0; i < 3; i++) {\n' +
                                        '		{{TEMPLATE}};\n' +
                                        '		if (r.a > 0.) {\n' +
                                        '			r[i] = (s.a * s[i] + d.a * (d[i] - s.a * (d[i] + s[i] - r[i]))) / r.a;\n' +
                                        '		}\n' +
                                        '	}\n' +
                                        '	r.rgb *= r.a;\n';
                                    switch (blendMode) {
                                        case shader.BlendMode.MULTIPLY:
                                            template = 'r[i] = d[i] * s[i]';
                                            break;
                                        case shader.BlendMode.LIGHTEN:
                                            template = 'r[i] = max(d[i], s[i])';
                                            break;
                                        case shader.BlendMode.DARKEN:
                                            template = 'r[i] = min(d[i], s[i])';
                                            break;
                                        case shader.BlendMode.DIFFERENCE:
                                            template = 'r[i] = abs(d[i] - s[i])';
                                            break;
                                        case shader.BlendMode.OVERLAY:
                                            template = 'r[i] = (d[i] <= .5) ? (2. * d[i] * s[i]) : (2. * (d[i] + s[i] - d[i] * s[i]) - 1.)\n';
                                            break;
                                        case shader.BlendMode.HARDLIGHT:
                                            template = 'r[i] = (s[i] <= .5) ? (2. * d[i] * s[i]) : (2. * (d[i] + s[i] - d[i] * s[i]) - 1.)\n';
                                            break;
                                    }
                                    formula = formula.replace('{{TEMPLATE}}', template);
                                }
                                vertexShader = GLBlendModeShaders.VERTEX_TEXTURE_BLEND;
                                fragShader = GLBlendModeShaders.FRAGMENT_TEXTURE_BLEND.replace('{{FORMULA}}', formula);
                            }
                            else {
                                vertexShader = GLBlendModeShaders.VERTEX_TEXTURE;
                                fragShader = GLBlendModeShaders.FRAGMENT_TEXTURE;
                            }
                            fragShader = fragShader
                                .replace('{{FC0}}', colorMultiply ? 'uniform vec4 fc0;\n' : '')
                                .replace('{{FC1}}', colorOffset ? 'uniform vec4 fc1;\n' : '')
                                .replace('{{COLOR_TRANSFORM_FC0}}', colorMultiply ? 's *= fc0;\n' : '')
                                .replace('{{COLOR_TRANSFORM_FC1}}', colorOffset ? 's += fc1;\n' : '')
                                .replace('{{BALANCE_COLOR}}', (colorMultiply || colorOffset) ? 's = min(s, 1.);\n	s = max(s, 0.);\n' : '');
                            program = GLBlendModeShaders.sHelperShaderMap[hash] = context.createProgram();
                            program.__uploadFromGLSL(vertexShader, fragShader);
                            return program;
                        };
                        GLBlendModeShaders.sHelperShaderMap = {};
                        GLBlendModeShaders.VERTEX_TEXTURE = '' +
                            'attribute vec2 va0;\n' +
                            'attribute vec2 va1;\n' +
                            'uniform mat4 vc0;\n' +
                            'uniform mat4 vc4;\n' +
                            'uniform vec4 vcPositionScale;\n' +
                            'varying vec2 vUV;\n' +
                            'void main(void) {\n' +
                            '	vUV = (vc4 * vec4(va1, 0.0, 1.0)).xy;\n' +
                            '	gl_Position = vc0 * vec4(va0, 0.0, 1.0) * vcPositionScale;\n' +
                            '}';
                        GLBlendModeShaders.FRAGMENT_TEXTURE = '' +
                            'precision lowp float;\n' +
                            '{{FC0}}' +
                            '{{FC1}}' +
                            'uniform sampler2D fs0;\n' +
                            'varying vec2 vUV;\n' +
                            'void main(void) {\n' +
                            '	vec4 s = texture2D(fs0, vUV);\n' +
                            '	if (s.a > 0.0) s.rgb /= s.a;\n' +
                            '	{{COLOR_TRANSFORM_FC0}}' +
                            '	{{COLOR_TRANSFORM_FC1}}' +
                            '	{{BALANCE_COLOR}}' +
                            '	s.rgb *=s.a;\n' +
                            '	gl_FragColor = s;\n' +
                            '}';
                        GLBlendModeShaders.VERTEX_TEXTURE_BLEND = '' +
                            'attribute vec2 va0;\n' +
                            'attribute vec2 va1;\n' +
                            'uniform mat4 vc0;\n' +
                            'uniform mat4 vc4;\n' +
                            'uniform vec4 vcPositionScale;\n' +
                            'varying vec2 vUV;\n' +
                            'varying vec2 vPos;\n' +
                            'void main(void) {\n' +
                            '	vUV = (vc4 * vec4(va1, 0.0, 1.0)).xy;\n' +
                            '	gl_Position = vc0 * vec4(va0, 0.0, 1.0) * vcPositionScale;\n' +
                            '	vPos = (gl_Position.xy + 1.0) / 2.0;\n' +
                            '}';
                        GLBlendModeShaders.FRAGMENT_TEXTURE_BLEND = '' +
                            'precision lowp float;\n' +
                            '{{FC0}}' +
                            '{{FC1}}' +
                            'uniform sampler2D fs0;\n' +
                            'uniform sampler2D fs1;\n' +
                            'varying vec2 vUV;\n' +
                            'varying vec2 vPos;\n' +
                            'void main(void) {\n' +
                            '	vec4 d = texture2D(fs0, vPos);\n' +
                            '	vec4 s = texture2D(fs1, vUV);\n' +
                            '	vec4 r = vec4(.0, .0, .0, .0);\n' +
                            '{{FORMULA}}' +
                            '	gl_FragColor = r;\n' +
                            '}';
                        return GLBlendModeShaders;
                    }());
                    shader.GLBlendModeShaders = GLBlendModeShaders;
                })(shader = webgl.shader || (webgl.shader = {}));
            })(webgl = renderer.webgl || (renderer.webgl = {}));
        })(renderer = __native.renderer || (__native.renderer = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GLBlendModeShaders.js.map