/// <reference path="../../base.d.ts" />
/// <reference path="../display3D/textures/TextureBase.ts" />
/// <reference path="../display3D/Program3D.ts" />
/// <reference path="../display3D/Context3DProgramType.ts" />
/// <reference path="../display3D/Context3D.ts" />
/// <reference path="../__native/renderer/webgl/WebGLContext2D.ts" />
﻿
namespace flash.filters
{
	export import WebGLContext2D = flash.__native.renderer.webgl.WebGLContext2D;
	export import Context3D = flash.display3D.Context3D;
	export import Context3DProgramType = flash.display3D.Context3DProgramType;
	export import Program3D = flash.display3D.Program3D;
	export import TextureBase = flash.display3D.textures.TextureBase;
	

	/**
	 * Noise simple filter.
	 * @author pkulikov
	 */
	export  class NoiseFilter extends BitmapFilter
	{
		/**
		 * This is a template to generate the shader.
		 */
		protected static VERTEX_SHADER_TEMPLATE:string = 
			"precision lowp float;\n" +
			
			"attribute vec2 va0;\n" +// pos
			
			"uniform mat4 vc0;\n" + // pos matrix
			"uniform vec4 vcPositionScale;\n" +
			
			"void main(void) {\n" +
			" gl_Position = vc0 * vec4(va0, 0.0, 1.0) * vcPositionScale;\n" +
			"}";
		
		/**
		 * This is a template to generate the shader.
		 */
		protected static FRAG_SHADER_TEMPLATE:string =
			"precision highp float;\n" + // IMPORTANT: highp
			
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

		public randomSeed : number;
		public low : number;
		public high : number;
		public channelOptions : number;
		public grayScale : boolean;
		public transparent : boolean;
		
		/**
		 * Helpers
		 */	
		protected __data:number[];
		protected __dataChannels:number[];
		
		/**
		 * Initializes a new NoiseFilter instance with the specified parameters. 
		 * @param matrix
		 * 
		 */
		constructor(randomSeed:number = 0, low:number = 0, high:number = 255, channelOptions:number = 7, grayScale:boolean = false, transparent:boolean = true)
		{
			/**/ randomSeed = ((randomSeed) >> 0); low = ((low) >>> 0); high = ((high) >>> 0); channelOptions = ((channelOptions) >>> 0); grayScale = Boolean(grayScale); transparent = Boolean(transparent);
			/**/ this.randomSeed === void 0 && (this.randomSeed = 0);
			/**/ this.low === void 0 && (this.low = 0);
			/**/ this.high === void 0 && (this.high = 0);
			/**/ this.channelOptions === void 0 && (this.channelOptions = 0);
			/**/ this.grayScale === void 0 && (this.grayScale = false);
			/**/ this.transparent === void 0 && (this.transparent = false);
			/**/ this.__data === void 0 && (this.__data = undefined);
			/**/ this.__dataChannels === void 0 && (this.__dataChannels = undefined);
			super(); 
			this.randomSeed = randomSeed;
			this.low = low;
			this.high = high;
			this.channelOptions = channelOptions;
			this.grayScale = grayScale;
			this.transparent = transparent;
			
			this.__replaceContent = true;
			this.__data = (<number[]>[0.0, 0.0, 0.0, 0.0]);
			this.__dataChannels = (<number[]>[0.0, 0.0, 0.0, 0.0]);
		}
		
		/*override*/ public clone():ColorMatrixFilter
		{
			return new NoiseFilter(this.randomSeed, this.low, this.high, this.channelOptions, this.grayScale);
		}
		
		/*[internal]*/ /*override*/ protected __getHash():string
		{
			return this.__fixedHash || [this.randomSeed, this.low, this.high, this.channelOptions, this.grayScale].toString();
		}
		
		/**
		 * Internal shader setup. 
		 */		
		/*[internal]*/ /*override*/ protected __setup (ctx:WebGLContext2D, texture:TextureBase, pass:number = 0):boolean
		{
			// ctx = strict(ctx, WebGLContext2D); texture = strict(texture, TextureBase); pass = ((pass) >> 0);
			var context:Context3D = ctx.context;
			
			// update
			if (!this.__program) {
				this.__program = this.__updateShader(context);
			}
			
			// use (it is important to call ctx)
			ctx.__setProgram(this.__program);
			
			// data
			this.__data[0] = this.randomSeed;
			this.__data[1] = this.low / 255.0;
			this.__data[2] = this.high / 255.0;
			this.__data[3] = this.grayScale ? 1.0 : 0.0;
			context.__setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 32, this.__data, 1);
			
			// data channels
			this.__dataChannels[0] = ((this.channelOptions & ( 1 << 0 )) >> 0) == 1 ? 1.0 : 0.0;
			this.__dataChannels[1] = ((this.channelOptions & ( 1 << 1 )) >> 1) == 1 ? 1.0 : 0.0;
			this.__dataChannels[2] = ((this.channelOptions & ( 1 << 2 )) >> 2) == 1 ? 1.0 : 0.0;
			this.__dataChannels[3] = this.transparent && ((this.channelOptions & ( 1 << 3 )) >> 3) == 1 ? 1.0 : 0.0;
			context.__setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 33, this.__dataChannels, 1);
			return true;
		}
		
		/**
		 * Internal update function to create shader properties.
		 * @param context
		 * @param blur
		 * 
		 */		
		/*[internal]*/ protected __updateShader (context:Context3D):Program3D
		{
			// context = strict(context, Context3D);
			// vertex
			var vertexShader:string = NoiseFilter.VERTEX_SHADER_TEMPLATE;
			
			// fragment
			var fragShader:string = NoiseFilter.FRAG_SHADER_TEMPLATE;
			
			// program
			return BitmapFilter.__compileProgram(context, vertexShader, fragShader);
		}
	}	
}