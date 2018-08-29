/// <reference path="../../base.d.ts" />
/// <reference path="../../base.d.ts" />
/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../errors/IllegalOperationError.ts" />
/// <reference path="../__native/renderer/webgl/SamplerState.ts" />
/// <reference path="../__native/renderer/webgl/AGALConverter.ts" />

namespace flash.display3D
{
	export import AGALConverter = flash.__native.renderer.webgl.AGALConverter;
	export import SamplerState = flash.__native.renderer.webgl.SamplerState;
	export import IllegalOperationError = flash.errors.IllegalOperationError;
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The Program3D class represents a pair of rendering programs (also called "shaders") uploaded to the rendering context.
	 * Programs managed by a Program3D object control the entire rendering of triangles during a Context3D drawTriangles() call. 
	 * Upload the binary bytecode to the rendering context using the upload method. 
	 * (Once uploaded, the program in the original byte array is no longer referenced; 
	 * changing or discarding the source byte array does not change the program.)
	 * 
	 * Programs always consist of two linked parts: A vertex and a fragment program.
	 * 
	 * The vertex program operates on data defined in VertexBuffer3D objects and is responsible for projecting vertices into clip space and 
	 * passing any required vertex data, such as color, to the fragment shader.
	 * The fragment shader operates on the attributes passed to it by the vertex program and 
	 * produces a color for every rasterized fragment of a triangle, resulting in pixel colors. 
	 * Note that fragment programs have several names in 3D programming literature, including fragment shader and pixel shader.
	 * Designate which program pair to use for subsequent rendering operations by passing the corresponding Program3D instance to 
	 * the Context3D setProgram() method.
	 * 
	 * You cannot create a Program3D object directly; use the Context3D createProgram() method instead. 
	 * @author pkulikov
	 * 
	 */	
	export  class Program3D
	{
		/*[internal]*/ private __alphaSamplerUniforms : Uniform[];
		/*[internal]*/ private __context : Context3D;
		/*[internal]*/ private __gl : WebGLRenderingContext;
		/*[internal]*/ private __fragmentShaderID : WebGLShader;
		/*[internal]*/ private __fragmentSource : string;
		/*[internal]*/ private __fragmentUniformMap : UniformMap;
		/*[internal]*/ private __positionScale : Uniform;
		/*[internal]*/ private __programID : WebGLProgram;
		/*[internal]*/ private __samplerStates : SamplerState[];
		/*[internal]*/ private __samplerUniforms : Uniform[];
		/*[internal]*/ private __samplerUsageMask : number = 0;
		/*[internal]*/ private __uniforms : Uniform[];
		/*[internal]*/ private __vertexShaderID : WebGLShader;
		/*[internal]*/ private __vertexSource : string;
		/*[internal]*/ private __vertexUniformMap : UniformMap;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor (context3D : Context3D)
		{
			/**/ context3D = strict(context3D, Context3D);
			this.__gl =strict( (this.__context = context3D).__gl, WebGLRenderingContext);
			
			this.__uniforms = new Array<Uniform> ();
			this.__samplerUniforms = new Array<Uniform> ();
			this.__alphaSamplerUniforms = new Array<Uniform> ();
			this.__samplerStates = new Array<SamplerState> (Context3D.MAX_SAMPLERS);
		}
		
		/**
		 * Frees all resources associated with this object. 
		 * 
		 */		
		public dispose():void
		{
			this.__deleteShaders ();
		}
		
		/**
		 * Uploads a pair of rendering programs expressed in AGAL (Adobe Graphics Assembly Language) bytecode. 
		 * @param vertexProgram
		 * @param fragmentProgram
		 * 
		 */		
		public upload (vertexProgram : ByteArray, fragmentProgram : ByteArray) : void
		{
			/**/ vertexProgram = strict(vertexProgram, ByteArray); fragmentProgram = strict(fragmentProgram, ByteArray);
			var samplerStates:SamplerState[] = new Array<SamplerState> ();
			
			var glslVertex = AGALConverter.convertToGLSL (this.__gl, vertexProgram);
			var glslFragment = AGALConverter.convertToGLSL (this.__gl, fragmentProgram, samplerStates);
			
			this.__uploadFromGLSL (glslVertex, glslFragment);
			
			for (var i:number = 0, len = samplerStates.length; i < len; ++i) {
				
				this.__setSamplerState (i, samplerStates[i]);
				
			}
		}
		
		/*[internal]*/ private __buildUniformList () : void {
			
			this.__uniforms.length = 0;
			this.__samplerUniforms.length = 0;
			this.__alphaSamplerUniforms.length = 0;
			
			this.__samplerUsageMask = 0;
			
			var numActive = 0;
			numActive = this.__gl.getProgramParameter (this.__programID, this.__gl.ACTIVE_UNIFORMS);
						
			var vertexUniforms:Uniform[] = new Array<Uniform> ();
			var fragmentUniforms:Uniform[] = new Array<Uniform> ();
			
			for (var i = 0; i < numActive; ++i) {
				
				var info = this.__gl.getActiveUniform (this.__programID, i);
				var name = info.name;
				var size = info.size;
				var uniformType = info.type;
				
				var uniform = new Uniform (this.__gl);
				uniform.name = name;
				uniform.size = size;
				uniform.type = uniformType;
				
				uniform.location = this.__gl.getUniformLocation (this.__programID, uniform.name);
				
				var indexBracket = uniform.name.indexOf ('[');
				
				if (indexBracket >= 0) {
					
					uniform.name = uniform.name.substring (0, indexBracket);
					
				}
				
				switch (uniform.type) {
					
					case this.__gl.FLOAT_MAT2: uniform.regCount = 2; break;
					case this.__gl.FLOAT_MAT3: uniform.regCount = 3; break;
					case this.__gl.FLOAT_MAT4: uniform.regCount = 4; break;
					default: uniform.regCount = 1;
						
				}
				
				uniform.regCount *= uniform.size;
				
				this.__uniforms.push (uniform);
				
				var startsWith_2, endsWith_6;
				
				if (uniform.name == "vcPositionScale") {
					
					this.__positionScale =strict( uniform, Uniform);
					
				} else if ((startsWith_2 = uniform.name.substr(0, 2)) == "vc") {
					
					uniform.regIndex = parseInt (uniform.name.substring (2));
					uniform.regData = this.__context.__vertexConstants;
					uniform.optimized = this.__context.__optimizeUniforms;
					vertexUniforms.push (uniform);
					
				} else if (startsWith_2 == "fc") {
					
					uniform.regIndex = parseInt (uniform.name.substring (2));
					uniform.regData = this.__context.__fragmentConstants;
					uniform.optimized = this.__context.__optimizeUniforms;
					fragmentUniforms.push (uniform);
					
				} else if (uniformType == 35678 && (endsWith_6 = uniform.name.substr(uniform.name.length - 6)) != "_alpha") {
					
					uniform.regIndex = parseInt (uniform.name.substr (2, 1)); // 0-9
					this.__samplerUniforms.push (uniform);
					
					for (var reg = 0; reg < uniform.regCount; ++reg) {
						
						this.__samplerUsageMask |= (1 << (uniform.regIndex + reg));
						
					}
					
				} else if (uniformType == 35678 && endsWith_6 == "_alpha") {
					
					uniform.regIndex = parseInt (uniform.name.substr (2, 1)); // 0-9
					this.__alphaSamplerUniforms.push (uniform);
					
				}
				
			}
			
			this.__vertexUniformMap = new UniformMap (vertexUniforms.concat());
			this.__fragmentUniformMap = new UniformMap (fragmentUniforms.concat());
			
		}
		
		/*[internal]*/ private __deleteShaders ():void {
			
			if (this.__programID != null) {
				
				// this causes an exception EntryPoIntNotFound ..
				// __gl.DeleteProgram (1, ref __programID  );
				this.__programID = null;
				
			}
			
			if (this.__vertexShaderID != null) {
				
				this.__gl.deleteShader (this.__vertexShaderID);
				this.__vertexShaderID = null;
				
			}
			
			if (this.__fragmentShaderID != null) {
				
				this.__gl.deleteShader (this.__fragmentShaderID);
				this.__fragmentShaderID = null;
				
			}
			
		}
		
		
		/*[internal]*/ private __flush ():void {
			
			this.__vertexUniformMap.flush ();
			this.__fragmentUniformMap.flush ();
			
		}
		
		
		/*[internal]*/ private __getSamplerState (sampler : number) : SamplerState {
			
			// sampler = ((sampler) >> 0);
			
			return this.__samplerStates[sampler];
			
		}
		
		
		/*[internal]*/ private __markDirty (isVertex : boolean, index : number, count : number) : void {
			
			// isVertex = Boolean(isVertex); index = ((index) >> 0); count = ((count) >> 0);
			
			if (isVertex) {
				
				this.__vertexUniformMap.markDirty (index, count);
				
			} else {
				
				this.__fragmentUniformMap.markDirty (index, count);
				
			}
			
		}
		
		
		/*[internal]*/ private __setPositionScale (positionScale : Float32Array) : void {
			
			// positionScale = strict(positionScale, Float32Array);
			
			if (this.__positionScale != null) {
				
				this.__gl.uniform4fv (this.__positionScale.location, positionScale);
				
			}
			
		}
		
		
		/*[internal]*/ public __setSamplerState (sampler : number, state : SamplerState) : void {
			
			// sampler = ((sampler) >> 0); state = strict(state, SamplerState);
			
			this.__samplerStates[sampler] = state;
			
		}
		
		
		/*[internal]*/ private __uploadFromGLSL (vertexShaderSource : string, fragmentShaderSource : string) : void {
			
			// vertexShaderSource = as(vertexShaderSource, 'String'); fragmentShaderSource = as(fragmentShaderSource, 'String');
			
			this.__deleteShaders ();
			
			//if (verbose) {
			//	
			//	Log.info (vertexShaderSource);
			//	Log.info (fragmentShaderSource);
			//	
			//}
			
			this.__vertexSource = vertexShaderSource;
			this.__fragmentSource = fragmentShaderSource;
			
			this.__vertexShaderID = this.__gl.createShader (this.__gl.VERTEX_SHADER);
			this.__gl.shaderSource (this.__vertexShaderID, vertexShaderSource);
			this.__gl.compileShader (this.__vertexShaderID);
			
			var shaderCompiled = this.__gl.getShaderParameter (this.__vertexShaderID, this.__gl.COMPILE_STATUS);
			
			
			if (shaderCompiled == 0) {
				
				var vertexInfoLog = this.__gl.getShaderInfoLog (this.__vertexShaderID);
				
				if (vertexInfoLog != null && vertexInfoLog.length != 0) {
					
					trace ('vertex: ${vertexInfoLog}');
					
				}
				
				throw new Error ("Error compiling vertex shader: " + vertexInfoLog);
				
			}
			
			this.__fragmentShaderID = this.__gl.createShader (this.__gl.FRAGMENT_SHADER);
			this.__gl.shaderSource (this.__fragmentShaderID, fragmentShaderSource);
			
			this.__gl.compileShader (this.__fragmentShaderID);
			
			var fragmentCompiled = this.__gl.getShaderParameter (this.__fragmentShaderID, this.__gl.COMPILE_STATUS);
			
			if (fragmentCompiled == 0) {
				
				var fragmentInfoLog = this.__gl.getShaderInfoLog (this.__fragmentShaderID);
				
				if (fragmentInfoLog != null && fragmentInfoLog.length != 0) {
					
					trace ('fragment: ${fragmentInfoLog}');
					
				}
				
				throw new Error ("Error compiling fragment shader: " + fragmentInfoLog);
				
			}
			
			this.__programID = this.__gl.createProgram ();
			this.__gl.attachShader (this.__programID, this.__vertexShaderID);
			
			this.__gl.attachShader (this.__programID, this.__fragmentShaderID);
			
			for (var i:number = 0, len = Context3D.MAX_ATTRIBUTES; i < len; ++i) {
				
				var name = "va" + i;
				
				if (vertexShaderSource.indexOf (" " + name) != -1) {
					
					this.__gl.bindAttribLocation (this.__programID, i, name);
					
				}
				
			}
			
			this.__gl.linkProgram (this.__programID);
			
			//var infoLog = __gl.getProgramInfoLog (__programID);
			
			//if (infoLog != null && infoLog.length != 0) {
				
			//	trace ('program: ${infoLog}');
				
			//}
			
			this.__buildUniformList ();
			
		}
		
		
		/*[internal]*/ private __use () : void {
			
			this.__gl.useProgram (this.__programID);
			
			this.__vertexUniformMap.markAllDirty ();
			this.__fragmentUniformMap.markAllDirty ();
			
			var __for0 = window.asc.of(this.__samplerUniforms);
			for  (var sampler of __for0) {
				
				if (sampler.regCount == 1) {
					
					this.__gl.uniform1i (sampler.location, sampler.regIndex);
					
				} else {
					
					throw new IllegalOperationError ("!!! TODO: uniform location on webgl");
					
					/*
					TODO: Figure out +i on Web__gl.
					// sampler array?
					for(i in 0...sampler.regCount) {
					__gl.uniform1i(sampler.location + i, sampler.regIndex + i);
					}
					*/
				}
				
			}
			
			var __for1 = window.asc.of(this.__alphaSamplerUniforms);
			for  (sampler of __for1) {
				
				if (sampler.regCount == 1) {
					
					this.__gl.uniform1i (sampler.location, sampler.regIndex);
					
				} else {
					
					throw new IllegalOperationError ("!!! TODO: uniform location on webgl");
					
					/*
					TODO: Figure out +i on Web__gl.
					// sampler array?
					for(i in 0...sampler.regCount) {
					__gl.uniform1i(sampler.location + i, sampler.regIndex + i);
					}
					*/
					
				}
				
			}
			
		}
	}


 class Uniform {
	
	/*[internal]*/ public name : string;
	/*[internal]*/ public location : WebGLUniformLocation;
	/*[internal]*/ public type : number = 0;
	/*[internal]*/ public size : number = 0;
	/*[internal]*/ public regData : any; // Float32Array || Array
	/*[internal]*/ public regIndex : number = 0;
	/*[internal]*/ public regCount : number = 0;
	/*[internal]*/ public isDirty : boolean;
	/*[internal]*/ public optimized : boolean;
	
	/*[internal]*/ private __gl : WebGLRenderingContext;
	
	/*[internal]*/ constructor (gl : WebGLRenderingContext) {
		
		// gl = strict(gl, WebGLRenderingContext);
		
		this.__gl = gl;
		
		this.isDirty = true;
		
	}
	
	
	/*[internal]*/ public flush ():void {
		
		var index = this.regIndex * 4;
		
		switch (this.type) {
			
			case this.__gl.FLOAT_MAT2: this.__gl.uniformMatrix2fv (this.location, false, this.__getRegisters (index, this.size * 2 * 2)); break;
			case this.__gl.FLOAT_MAT3: this.__gl.uniformMatrix3fv (this.location, false, this.__getRegisters (index, this.size * 3 * 3)); break;
			case this.__gl.FLOAT_MAT4: this.__gl.uniformMatrix4fv (this.location, false, this.__getRegisters (index, this.size * 4 * 4)); break;
			case this.__gl.FLOAT:      this.__gl.uniform1fv (this.location, this.__getRegisters (index, this.regCount * 1)); break;
			case this.__gl.FLOAT_VEC2: this.__gl.uniform2fv (this.location, this.__getRegisters (index, this.regCount * 2)); break;
			case this.__gl.FLOAT_VEC3: this.__gl.uniform3fv (this.location, this.__getRegisters (index, this.regCount * 3)); break;
			case this.__gl.FLOAT_VEC4: this.__gl.uniform4fv (this.location, this.__getRegisters (index, this.regCount * 4)); break;
			default: this.__gl.uniform4fv (this.location, this.__getRegisters (index, this.regCount * 4));
				
		}
		
	}
	
	
	/*[internal]*/ private __getRegisters (index:number, size:number):Float32Array {
		
		
		// index = ((index) >> 0); size = ((size) >> 0);
		
		
		if (this.optimized) {
			
			return this.regData[index];
			
		} else {
			
			return this.regData.subarray (index, index + size);
			
		}
		
	}
	
	
}


 class UniformMap {
	
	// TODO: it would be better to use a bitmask with a dirty bit per uniform, but not super important now
	
	/*[internal]*/ private __allDirty : boolean;
	/*[internal]*/ private __anyDirty : boolean;
	/*[internal]*/ private __registerLookup : Uniform[];
	/*[internal]*/ private __uniforms : Uniform[];
	
	
	/*[internal]*/ constructor (list : Uniform[]) {
		
		this.__uniforms = list;
		this.__uniforms.sort (Array.NUMERIC);
		
		var total = 0;
		
		var __for2 = window.asc.of(this.__uniforms);
		for  (var uniform of __for2) {
			
			if (uniform.regIndex + uniform.regCount > total) {
				
				total = uniform.regIndex + uniform.regCount;
				
			}
			
		}
		
		this.__registerLookup = new Array<Uniform> (total);
		
		var __for3 = window.asc.of(this.__uniforms);
		for  (uniform of __for3) {
			
			for (var i = 0, len = uniform.regCount; i < len; ++i) {
				
				this.__registerLookup[uniform.regIndex + i] = uniform;
				
			}
			
		}
		
		this.__anyDirty = this.__allDirty = true;
		
	}
	
	
	/*[internal]*/ public flush ():void {
		
		if (this.__anyDirty) {
			
			for (var i = 0, len = this.__uniforms.length; i < len; ++i) {
				
				var uniform = this.__uniforms[i];
				if (this.__allDirty || uniform.isDirty) {
					
					uniform.flush ();
					uniform.isDirty = false;
					
				}
				
			}
			
			this.__anyDirty = this.__allDirty = false;
			
		}
		
	}
	
	
	/*[internal]*/ public markAllDirty ():void {
		
		this.__allDirty = true;
		this.__anyDirty = true;
		
	}
	
	
	/*[internal]*/ public markDirty (start:number, count:number):void {
		
		// start = ((start) >> 0); count = ((count) >> 0);
		
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
				
			} else {
				
				index ++;
				
			}
			
		}
		
	}
	
	
}}