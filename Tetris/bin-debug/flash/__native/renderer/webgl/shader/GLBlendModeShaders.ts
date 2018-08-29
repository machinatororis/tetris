/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../display3D/Program3D.ts" />
/// <reference path="../../../../display3D/Context3D.ts" />
/// <reference path="../../../../display/BlendMode.ts" />

namespace flash.__native.renderer.webgl.shader
{
	
	export import BlendMode = flash.display.BlendMode;
	export import Context3D = flash.display3D.Context3D;
	export import Program3D = flash.display3D.Program3D;
	

	export  class GLBlendModeShaders
	{
		/**
		 * Helpers 
		 */		
		/*[internal]*/ protected static sHelperShaderMap:any = {};
		
		public static VERTEX_TEXTURE:string = '' +
			'attribute vec2 va0;\n' + // pos
			'attribute vec2 va1;\n' + // uv
			
			'uniform mat4 vc0;\n' + // pos matrix
			'uniform mat4 vc4;\n' + // uv matrix
			'uniform vec4 vcPositionScale;\n' +
			
			'varying vec2 vUV;\n' +
			
			'void main(void) {\n' +
			'	vUV = (vc4 * vec4(va1, 0.0, 1.0)).xy;\n' +
			'	gl_Position = vc0 * vec4(va0, 0.0, 1.0) * vcPositionScale;\n' +
			'}';
		
		public static FRAGMENT_TEXTURE:string = '' +
			'precision lowp float;\n' +
			
			'{{FC0}}' + // 'uniform vec4 fc0;\n' OR ''
			'{{FC1}}' + // 'uniform vec4 fc1;\n' OR ''
			
			'uniform sampler2D fs0;\n' +
			
			'varying vec2 vUV;\n' +
			
			'void main(void) {\n' +
			'	vec4 s = texture2D(fs0, vUV);\n' +
			'	if (s.a > 0.0) s.rgb /= s.a;\n' +
			
			'	{{COLOR_TRANSFORM_FC0}}' + // 's *= fc0;\n' OR ''
			'	{{COLOR_TRANSFORM_FC1}}' + // 's += fc1;\n' OR ''
			'	{{BALANCE_COLOR}}' + // 's = min(s, 1.); s = max(s, 0.);\n' OR ''
			
			'	s.rgb *=s.a;\n' + 
			'	gl_FragColor = s;\n' +
			'}';
		
		public static VERTEX_TEXTURE_BLEND:string = '' +
			'attribute vec2 va0;\n' + // pos
			'attribute vec2 va1;\n' + // uv
			
			'uniform mat4 vc0;\n' + // pos matrix
			'uniform mat4 vc4;\n' + // uv matrix
			'uniform vec4 vcPositionScale;\n' +
			
			'varying vec2 vUV;\n' +
			'varying vec2 vPos;\n' + // destination
			
			'void main(void) {\n' +
			'	vUV = (vc4 * vec4(va1, 0.0, 1.0)).xy;\n' +
			'	gl_Position = vc0 * vec4(va0, 0.0, 1.0) * vcPositionScale;\n' +
			'	vPos = (gl_Position.xy + 1.0) / 2.0;\n' +
			'}';
		
		public static FRAGMENT_TEXTURE_BLEND:string = '' +
			'precision lowp float;\n' +
			
			'{{FC0}}' + // 'uniform vec4 fc0;\n' OR ''
			'{{FC1}}' + // 'uniform vec4 fc1;\n' OR ''
			
			'uniform sampler2D fs0;\n' +
			'uniform sampler2D fs1;\n' +
			
			'varying vec2 vUV;\n' +
			'varying vec2 vPos;\n' +
			
			'void main(void) {\n' +
			'	vec4 d = texture2D(fs0, vPos);\n' + // destimation
			'	vec4 s = texture2D(fs1, vUV);\n' + // source
			'	vec4 r = vec4(.0, .0, .0, .0);\n' + // result
			
			'{{FORMULA}}' + 
			
			'	gl_FragColor = r;\n' +
			'}';
		
		
		
		
		/**
		 * Есть ли программа для указанного блендинга.
		 */		
		/*[internal]*/ public static hasProgram (blendMode:string):number
		{
			// blendMode = as(blendMode, 'String');
			switch (blendMode) {
				
				case BlendMode.MULTIPLY: return 1;
				case BlendMode.LIGHTEN: return 2;
				case BlendMode.DARKEN: return 3;
				case BlendMode.DIFFERENCE: return 4;
				case BlendMode.INVERT: return 5;
				case BlendMode.OVERLAY: return 6;
				case BlendMode.HARDLIGHT: return 7;
					
			}
			
			return 0;
		}
		
		/**
		 * Скомпилировать и вернуть программу для указанного блендинга.
		 */		
		/*[internal]*/ public static getProgram (context:Context3D, blendMode:string, colorMultiply:boolean, colorOffset:boolean):Program3D
		{
			// context = strict(context, Context3D); blendMode = as(blendMode, 'String'); colorMultiply = Boolean(colorMultiply); colorOffset = Boolean(colorOffset);
			var shaderBlend = GLBlendModeShaders.hasProgram(blendMode);
			var hash = (shaderBlend << 16) | ((colorMultiply ? 1 : 0) << 8) | (colorOffset ? 1 : 0);
			var program = GLBlendModeShaders.sHelperShaderMap[hash];
			if (program) {
				
				return program;
				
			}
			
			var vertexShader;
			var fragShader;

			if(shaderBlend) {
				
				var formula = '';
				var template = '';
				
				if (blendMode == BlendMode.INVERT) {
					
					formula = ''+
						'	{{COLOR_TRANSFORM_FC0}}' + // 's *= fc0;\n' OR ''
						'	{{COLOR_TRANSFORM_FC1}}' + // 's += fc1;\n' OR ''
						'	{{BALANCE_COLOR}}' + // 's = min(s, 1.); s = max(s, 0.);\n' OR ''
						
						'	r.a = s.a + d.a * (1. - s.a);\n' +
						'	for (int i = 0; i < 3; i++) {\n' +
						'		r[i] = s.a + d[i] - 2. * s.a * d[i];\n' +
						'	}\n';
					
				} else {
					
					formula = '' +
						'	if (d.a > 0.0) d.rgb /= d.a;\n' +
						'	if (s.a > 0.0) s.rgb /= s.a;\n' +
						
						'	{{COLOR_TRANSFORM_FC0}}' +  // 's *= fc0;\n' OR ''
						'	{{COLOR_TRANSFORM_FC1}}' +  // 's += fc1;\n' OR ''
						'	{{BALANCE_COLOR}}' +  // 's = min(s, 1.); s = max(s, 0.);\n' OR ''
						
						'	r.a = s.a + d.a * (1. - s.a);\n' +
						'	for (int i = 0; i < 3; i++) {\n' +
						'		{{TEMPLATE}};\n' + // r[i] = F(d[i], s[i])
						'		if (r.a > 0.) {\n' +
						'			r[i] = (s.a * s[i] + d.a * (d[i] - s.a * (d[i] + s[i] - r[i]))) / r.a;\n' +
						'		}\n' +
						'	}\n' + 
						'	r.rgb *= r.a;\n';
					
					switch (blendMode) {
						
						case BlendMode.MULTIPLY:
							template = 'r[i] = d[i] * s[i]';
							break;
						
						case BlendMode.LIGHTEN:
							template = 'r[i] = max(d[i], s[i])';
							break;
						
						case BlendMode.DARKEN:
							template = 'r[i] = min(d[i], s[i])';
							break;
						
						case BlendMode.DIFFERENCE:
							template = 'r[i] = abs(d[i] - s[i])';
							break;
						
						case BlendMode.OVERLAY:
							template = 'r[i] = (d[i] <= .5) ? (2. * d[i] * s[i]) : (2. * (d[i] + s[i] - d[i] * s[i]) - 1.)\n';
							break;
						
						case BlendMode.HARDLIGHT:
							template = 'r[i] = (s[i] <= .5) ? (2. * d[i] * s[i]) : (2. * (d[i] + s[i] - d[i] * s[i]) - 1.)\n';
							break;
						
					}
					
					formula = formula.replace('{{TEMPLATE}}', template);
					
				}
				
				vertexShader = GLBlendModeShaders.VERTEX_TEXTURE_BLEND;
				fragShader = GLBlendModeShaders.FRAGMENT_TEXTURE_BLEND.replace('{{FORMULA}}', formula);
				
			} else {
				
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
		}
	}
}