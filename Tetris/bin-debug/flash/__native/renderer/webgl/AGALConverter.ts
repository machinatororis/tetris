/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../utils/Dictionary.ts" />
/// <reference path="../../../errors/IllegalOperationError.ts" />
/// <reference path="../../types/haxe/Int64.ts" />
/// <reference path="SamplerState.ts" />
/// <reference path="AGALConverter.ts" />
/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../utils/Endian.ts" />
/// <reference path="../../../utils/ByteArray.ts" />
/// <reference path="../../../errors/IllegalOperationError.ts" />
/// <reference path="../../types/haxe/Int64.ts" />

namespace flash.__native.renderer.webgl
{
	
	export import Int64 = flash.__native.types.haxe.Int64;
	export import IllegalOperationError = flash.errors.IllegalOperationError;
	export import ByteArray = flash.utils.ByteArray;
	export import Endian = flash.utils.Endian;
	
	
	export  class AGALConverter
	{
		
		
		public static prefixFromType (regType:number, programType:number):string {
			
			/**/ regType = ((regType) >> 0); programType = ((programType) >> 0);
			
			switch (regType) {
				
				case RegisterType.ATTRIBUTE: return "va";
				case RegisterType.CONSTANT: return (programType == ProgramType.VERTEX) ? "vc" : "fc";
				case RegisterType.TEMPORARY: return (programType == ProgramType.VERTEX) ? "vt" : "ft";
				case RegisterType.OUTPUT: return "output_";
				case RegisterType.VARYING: return "v";
				case RegisterType.SAMPLER: return "sampler";
				default: 
					throw new IllegalOperationError ("Invalid data!");
					
			}
			
		}
		
		private static limitedProfile:any = null;
		
		
		private static readUInt64 (byteArray:ByteArray):Int64 {
			
			/**/ byteArray = strict(byteArray, ByteArray);
			
			var low:number = byteArray.readInt();
			var high:number = byteArray.readInt();
			
			return Int64.make (high, low);
			
		}
		
		
		public static convertToGLSL (gl:WebGLRenderingContext, agal:ByteArray, samplerState:SamplerState[] = null):string {
			
			/**/ gl = strict(gl, WebGLRenderingContext); agal = strict(agal, ByteArray);
			
			agal.position = 0;
			agal.endian = Endian.LITTLE_ENDIAN;
			
			var magic:number = agal.readByte () & 0xFF;
			
			if (magic != 0xA0) {
				
				// use embedded GLSL shader instead
				agal.position = 0;
				return agal.readUTFBytes(agal.length);
				
			}
			
			var version:number = agal.readInt ();
			
			if (version != 1) {
				
				throw new IllegalOperationError ("Version must be 1");
				
			}
			
			var shaderTypeID:number = agal.readByte() & 0xFF;
			
			if (shaderTypeID != 0xA1) {
				
				throw new IllegalOperationError ("Shader type ID must be 0xA1");
				
			}
			
			var programType:number = (agal.readByte() & 0xFF) == 0 ? ProgramType.VERTEX : ProgramType.FRAGMENT;
			
			var map:RegisterMap = new RegisterMap ();
			var sb:string = '';
			
			while (agal.position < agal.length) {
				
				// fetch instruction info
				var opcode:number = agal.readInt ();
				var dest:number =  ((agal.readUnsignedInt ()) >> 0);
				var source1:Int64 = AGALConverter.readUInt64 (agal);
				var source2:Int64 = AGALConverter.readUInt64 (agal);
				
				// parse registers
				var dr:DestRegister = DestRegister.parse (dest, programType);
				var sr1:SourceRegister = SourceRegister.parse (source1, programType, dr.mask);
				var sr2:SourceRegister = SourceRegister.parse (source2, programType, dr.mask);
				
				// switch on opcode and emit GLSL
				sb += ("\t");
				
				switch (opcode) {
					
					case 0x00: // mov
						
						sb += (dr.toGLSL () + " = " + sr1.toGLSL () + "; // mov");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x01: // add
						
						sb += (dr.toGLSL () + " = " + sr1.toGLSL () + " + " + sr2.toGLSL () + "; // add");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x02: // sub
						
						sb += (dr.toGLSL () + " = " + sr1.toGLSL () + " - " + sr2.toGLSL () + "; // sub");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x03: // mul
						
						sb += (dr.toGLSL () + " = " + sr1.toGLSL () + " * " + sr2.toGLSL () + "; // mul");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x04: // div
						
						sb += (dr.toGLSL () + " = " + sr1.toGLSL () + " / " + sr2.toGLSL () + "; // div");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x05: // rcp
						
						var sr:string = sr1.toGLSL ();
						
						if (sr.indexOf (".") > -1) { // swizzle
							
							sb += (dr.toGLSL () + " = 1.0 / " + sr1.toGLSL () + "; // rcp");
							
						} else {
							
							sb += (dr.toGLSL () + " = vec4(1) / " + sr1.toGLSL () + "; // rcp");
							
						}
						
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x06: // min
						
						sb += (dr.toGLSL () + " = min(" + sr1.toGLSL () + ", " + sr2.toGLSL () + "); // min");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x07: // max
						
						sb += (dr.toGLSL () + " = max(" + sr1.toGLSL () + ", " + sr2.toGLSL () + "); // max");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x08: // frc
						
						sb += (dr.toGLSL () + " = fract(" + sr1.toGLSL () + "); // frc");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x09: // sqrt
						
						sb += (dr.toGLSL () + " = sqrt(" + sr1.toGLSL () + "); // sqrt");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x0A: // rsq
						
						sb += (dr.toGLSL () + " = inversesqrt(" + sr1.toGLSL () + "); // rsq");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x0B: // pow
						
						sb += (dr.toGLSL () + " = pow(" + sr1.toGLSL () + ", " + sr2.toGLSL () + "); // pow");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x0C: // log
						
						sb += (dr.toGLSL () + " = log2(" + sr1.toGLSL () + "); // log");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x0D: // exp
						
						sb += (dr.toGLSL () + " = exp2(" + sr1.toGLSL () + "); // exp");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x0E: // normalize
						
						sb += (dr.toGLSL () + " = normalize(" + sr1.toGLSL () + "); // normalize");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x0F: // sin
						
						sb += (dr.toGLSL () + " = sin(" + sr1.toGLSL () + "); // sin");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x10: // cos
						
						sb += (dr.toGLSL () + " = cos(" + sr1.toGLSL () + "); // cos");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x11: // crs
						
						sr1.sourceMask = sr2.sourceMask = 7; // adjust source mask for xyz input to dot product
						sb += (dr.toGLSL () + " = cross(vec3(" + sr1.toGLSL () + "), vec3(" + sr2.toGLSL () + ")); // crs");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x12: // dp3
						
						sr1.sourceMask = sr2.sourceMask = 7; // adjust source mask for xyz input to dot product
						sb += (dr.toGLSL () + " = vec4(dot(vec3(" + sr1.toGLSL () + "), vec3(" + sr2.toGLSL () + ")))" + dr.getWriteMask () + "; // dp3");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x13: // dp4
						
						sr1.sourceMask = sr2.sourceMask = 0xF; // adjust source mask for xyzw input to dot product
						sb += (dr.toGLSL () + " = vec4(dot(vec4(" + sr1.toGLSL () + "), vec4(" + sr2.toGLSL () + ")))" + dr.getWriteMask () + "; // dp4");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x14: // abs
						
						sb += (dr.toGLSL () + " = abs(" + sr1.toGLSL () + "); // abs");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x15: // neg
						
						sb += (dr.toGLSL () + " = -" + sr1.toGLSL () + "; // neg");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x16: // saturate
						
						sb += (dr.toGLSL () + " = clamp(" + sr1.toGLSL () + ", 0.0, 1.0); // saturate");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						break;
					
					case 0x17: // m33
						
						//destination.x = (source1.x * source2[0].x) + (source1.y * source2[0].y) + (source1.z * source2[0].z)
						//destination.y = (source1.x * source2[1].x) + (source1.y * source2[1].y) + (source1.z * source2[1].z)
						//destination.z = (source1.x * source2[2].x) + (source1.y * source2[2].y) + (source1.z * source2[2].z)
						
						var existingUsage:number = map.getRegisterUsage (sr2);
						
						if (existingUsage != RegisterUsage.VECTOR_4 && existingUsage != RegisterUsage.VECTOR_4_ARRAY) {
							
							sb += (dr.toGLSL () + " = " + sr1.toGLSL () + " * mat3(" + sr2.toGLSL (false) + "); // m33");
							map.addDR (dr, RegisterUsage.VECTOR_4);
							map.addSR (sr1, RegisterUsage.VECTOR_4);
							map.addSR (sr2, RegisterUsage.MATRIX_4_4); // 33?
							
						} else {
							
							// compose the matrix multiply from dot products
							sr1.sourceMask = sr2.sourceMask = 7;
							sb += (dr.toGLSL () + " = vec3(" +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 0) + "), " +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 1) + ")," +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 2) + ")); // m33");
							
							map.addDR (dr, RegisterUsage.VECTOR_4);
							map.addSR (sr1, RegisterUsage.VECTOR_4);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 0);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 1);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 2);
							
						}
						break;
					
					case 0x18: // m44
						
						//multiply matrix 4x4
						//destination.x = (source1.x * source2[0].x) + (source1.y * source2[0].y) + (source1.z * source2[0].z)+ (source1.w * source2[0].w)
						//destination.y = (source1.x * source2[1].x) + (source1.y * source2[1].y) + (source1.z * source2[1].z)+ (source1.w * source2[1].w)
						//destination.z = (source1.x * source2[2].x) + (source1.y * source2[2].y) + (source1.z * source2[2].z)+ (source1.w * source2[2].w)
						//destination.w = (source1.x * source2[3].x) + (source1.y * source2[3].y) + (source1.z * source2[3].z)+ (source1.w * source2[3].w)
						
						existingUsage = map.getRegisterUsage (sr2);
						
						if (existingUsage != RegisterUsage.VECTOR_4 && existingUsage != RegisterUsage.VECTOR_4_ARRAY) {
							
							sb += (dr.toGLSL () + " = " + sr1.toGLSL () + " * " + sr2.toGLSL (false) + "; // m44");
							map.addDR (dr, RegisterUsage.VECTOR_4);
							map.addSR (sr1, RegisterUsage.VECTOR_4);
							map.addSR (sr2, RegisterUsage.MATRIX_4_4);
							
						} else {
							
							// compose the matrix multiply from dot products
							sr1.sourceMask = sr2.sourceMask = 0xF;
							sb += (dr.toGLSL () + " = vec4(" +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 0) + "), " +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 1) + "), " +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 2) + "), " +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 3) + ")); // m44");
							
							map.addDR (dr, RegisterUsage.VECTOR_4);
							map.addSR (sr1, RegisterUsage.VECTOR_4);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 0);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 1);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 2);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 3);
							
						}
						break;
					
					case 0x19: // m34
						
						//m34 0x19 multiply matrix 3x4
						//destination.x = (source1.x * source2[0].x) + (source1.y * source2[0].y) + (source1.z * source2[0].z)+ (source1.w * source2[0].w)
						//destination.y = (source1.x * source2[1].x) + (source1.y * source2[1].y) + (source1.z * source2[1].z)+ (source1.w * source2[1].w)
						//destination.z = (source1.x * source2[2].x) + (source1.y * source2[2].y) + (source1.z * source2[2].z)+ (source1.w * source2[2].w)
						
						// prevent w from being written for a m34
						dr.mask &= 7;
						
						existingUsage = map.getRegisterUsage (sr2);
						
						if (existingUsage != RegisterUsage.VECTOR_4 && existingUsage != RegisterUsage.VECTOR_4_ARRAY) {
							
							sb += (dr.toGLSL () + " = " + sr1.toGLSL () + " * " + sr2.toGLSL (false) + "; // m34");
							map.addDR (dr, RegisterUsage.VECTOR_4);
							map.addSR (sr1, RegisterUsage.VECTOR_4);
							map.addSR (sr2, RegisterUsage.MATRIX_4_4);
							
						} else {
							
							// compose the matrix multiply from dot products
							sr1.sourceMask = sr2.sourceMask = 0xF;
							sb += (dr.toGLSL () + " = vec3(" +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 0) + "), " +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 1) + ")," +
								"dot(" + sr1.toGLSL (true) + "," + sr2.toGLSL (true, 2) + ")); // m34");
							
							map.addDR (dr, RegisterUsage.VECTOR_4);
							map.addSR (sr1, RegisterUsage.VECTOR_4);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 0);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 1);
							map.addSR (sr2, RegisterUsage.VECTOR_4, 2);
							
						}
						break;
					
					case 0x27: // kill /  discard
						
						if (true) { //(openfl.display.Stage3D.allowDiscard) {
							
							// ensure we have a full source mask since there is no destination register
							sr1.sourceMask = 0xF;
							sb += ("if (any(lessThan(" + sr1.toGLSL () + ", vec4(0)))) discard;");
							map.addSR (sr1, RegisterUsage.VECTOR_4);
							
						}
						break;
					
					case 0x28: // tex
						
						var sampler:SamplerRegister = SamplerRegister.parse (source2, programType);
						
						switch (sampler.d) {
							
							case 0: // 2d texture
								
								sr1.sourceMask = 0x3;
								map.addSaR (sampler, RegisterUsage.SAMPLER_2D);
								sb += (dr.toGLSL () + " = texture2D(" + sampler.toGLSL () + ", " + sr1.toGLSL () + "); // tex");
								break;
							
							case 1: // cube texture
								
								sr1.sourceMask = 0x7;
								sb += (dr.toGLSL () + " = textureCube(" + sampler.toGLSL () + ", " + sr1.toGLSL () + "); // tex");
								map.addSaR (sampler, RegisterUsage.SAMPLER_CUBE);
								break;
							
						}
						
						//sb.AppendFormat("{0} = vec4(0,1,0,1);", dr.toGLSL () );
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						
						if (samplerState != null) {
							
							// add sampler state to output list for caller
							samplerState[sampler.n] = sampler.toSamplerState ();
							
						}
						break;
					
					case 0x29: // sge
						
						sr1.sourceMask = sr2.sourceMask = 0xF; // sge only supports vec4
						sb += (dr.toGLSL () + " = vec4(greaterThanEqual(" + sr1.toGLSL () + ", " + sr2.toGLSL () + "))" + dr.getWriteMask () + "; // ste");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x2A: // slt
						
						sr1.sourceMask = sr2.sourceMask = 0xF; // slt only supports vec4
						sb += (dr.toGLSL () + " = vec4(lessThan(" + sr1.toGLSL () + ", " + sr2.toGLSL () + "))" + dr.getWriteMask () + "; // slt");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x2C: // seq
						
						sr1.sourceMask = sr2.sourceMask = 0xF; // seq only supports vec4
						sb += (dr.toGLSL () + " = vec4(equal(" + sr1.toGLSL () + ", " + sr2.toGLSL () + "))" + dr.getWriteMask () + "; // seq");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					case 0x2D: // sne
						
						sr1.sourceMask = sr2.sourceMask = 0xF; // sne only supports vec4
						sb += (dr.toGLSL () + " = vec4(notEqual(" + sr1.toGLSL () + ", " + sr2.toGLSL () + "))" + dr.getWriteMask () + "; // sne");
						map.addDR (dr, RegisterUsage.VECTOR_4);
						map.addSR (sr1, RegisterUsage.VECTOR_4);
						map.addSR (sr2, RegisterUsage.VECTOR_4);
						break;
					
					default:
						
						//sb.AppendFormat ("unsupported opcode" + opcode);
						throw new IllegalOperationError ("Opcode " + opcode);
						
				}
				
				sb += ("\n");
				
			}
			
			if (AGALConverter.limitedProfile == null) {
				
				var ver:string =  as(gl.getParameter (gl.VERSION), 'String');
				AGALConverter.limitedProfile = (ver.indexOf ("OpenGL ES") > -1 || ver.indexOf ("WebGL") > -1);
				
			}
			
			// combine parts into final progam
			var glsl:string = '';
			glsl += ("// AGAL " + ((programType == ProgramType.VERTEX) ? "vertex" : "fragment") + " shader\n");
			
			if (AGALConverter.limitedProfile) {
				
				glsl += ("#version 100\n");
				
				// Required to set the default precision of vectors
				glsl += ("precision highp float;\n");
				
			} else {
				
				glsl += ("#version 120\n");
				
			}
			
			glsl += (map.toGLSL (false));
			
			if (programType == ProgramType.VERTEX) {
				
				// this is needed for flipping render textures upside down
				glsl += ("uniform vec4 vcPositionScale;\n");
				
			}
			
			glsl += ("void main() {\n");
			glsl += (map.toGLSL (true));
			glsl += (sb);
			
			if (programType == ProgramType.VERTEX) {
				
				// this is needed for flipping render textures upside down
				glsl += ("\tgl_Position *= vcPositionScale;\n");
				
			}
			
			glsl += ("}\n");
			
			// System.Console.WriteLine(glsl);
			return glsl;
			
		}
	}

export import Int64 = flash.__native.types.haxe.Int64;
	export import IllegalOperationError = flash.errors.IllegalOperationError;
	export import Dictionary = flash.utils.Dictionary;
	

 class DestRegister {
	
	
	public mask:number = 0;
	public n:number = 0;
	public programType:number = 0;
	public type:number = 0;
	
	
	constructor () {
		
	}
	
	
	public getWriteMask ():string {
		
		var str:string = ".";
		if ((this.mask & 1) != 0) str += "x";
		if ((this.mask & 2) != 0) str += "y";
		if ((this.mask & 4) != 0) str += "z";
		if ((this.mask & 8) != 0) str += "w";
		return str;
		
	}
	
	
	public static parse (v:number, programType:number):DestRegister {
		
		/**/ v = ((v) >>> 0); programType = ((programType) >> 0);
		
		var dr:DestRegister = new DestRegister ();
		dr.programType = programType;
		dr.type = ((v >> 24) & 0xF);
		dr.mask = ((v >> 16) & 0xF);
		dr.n = (v & 0xFFFF);
		return dr;
		
	}
	
	
	public toGLSL (useMask:boolean = true):string {
		
		/**/ useMask = Boolean(useMask);
		
		var str:string;
		
		if (this.type == RegisterType.OUTPUT) {
			
			str = this.programType == ProgramType.VERTEX ? "gl_Position" : "gl_FragColor";
			
		} else {
			
			str = AGALConverter.prefixFromType (this.type, this.programType) + this.n;
			
		}
		
		if (useMask && this.mask != 0xF) {
			
			str += this.getWriteMask ();
			
		}
		
		return str;
		
	}
	
	
}


 class ProgramType {
	
	public static VERTEX:number = 0;
	public static FRAGMENT:number = 1;
	
}


 class RegisterMap {
	
	
	private mEntries:RegisterMapEntry[] = new Array<RegisterMapEntry> ();
	
	
	constructor () {
		
		//Stub.
		
	}
	
	
	public add (type:number, name:string, number:number, usage:number):void {
		
		/**/ type = ((type) >> 0); name = as(name, 'String'); number = ((number) >> 0); usage = ((usage) >> 0);
		
		var __for0 = window.asc.of(this.mEntries);
		for  (var entry of __for0) {
			
			if (entry.type == type && entry.name == name && entry.number == number) {
				
				if (entry.usage != usage) {
					
					throw new IllegalOperationError ("Cannot use register in multiple ways yet (mat4/vec4)");
					
				}
				
				return;
				
			}
			
		}
		
		entry = new RegisterMapEntry ();
		entry.type = type;
		entry.name = name;
		entry.number = number;
		entry.usage = usage;
		this.mEntries.push (entry);
		
	}
	
	
	public addDR (dr:DestRegister, usage:number):void {
		
		/**/ dr = strict(dr, DestRegister); usage = ((usage) >> 0);
		
		this.add (dr.type, dr.toGLSL (false), dr.n, usage);
		
	}
	
	
	public addSaR (sr:SamplerRegister, usage:number):void {
		
		/**/ sr = strict(sr, SamplerRegister); usage = ((usage) >> 0);
		
		this.add (sr.type, sr.toGLSL (), sr.n, usage);
		
	}
	
	
	public addSR (sr:SourceRegister, usage:number, offset:number = 0):void {
		
		/**/ sr = strict(sr, SourceRegister); usage = ((usage) >> 0); offset = ((offset) >> 0);
		
		if (sr.d != 0) {
			
			this.add (sr.itype, AGALConverter.prefixFromType (sr.itype, sr.programType) + sr.n, sr.n, RegisterUsage.VECTOR_4);
			this.add (sr.type, AGALConverter.prefixFromType (sr.type, sr.programType) + sr.o, sr.o, RegisterUsage.VECTOR_4_ARRAY);
			return;
			
		}
		
		this.add (sr.type, sr.toGLSL (false, offset), sr.n + offset, usage);
		
	}
	
	
	public getRegisterUsage (sr:SourceRegister):number {
		
		/**/ sr = strict(sr, SourceRegister);
		
		if (sr.d != 0) {
			
			return RegisterUsage.VECTOR_4_ARRAY;
			
		}
		
		return this.getUsage (sr.type, sr.toGLSL (false), sr.n);
		
	}
	
	
	public getUsage (type:number, name:string, number:number):number {
		
		/**/ type = ((type) >> 0); name = as(name, 'String'); number = ((number) >> 0);
		
		var __for1 = window.asc.of(this.mEntries);
		for  (var entry of __for1) {
			
			if (entry.type == type && entry.name == name && entry.number == number) {
				
				return entry.usage;
				
			}
			
		}
		
		return RegisterUsage.UNUSED;
		
	}
	
	
	public toGLSL (tempRegistersOnly:boolean):string {
		
		/**/ tempRegistersOnly = Boolean(tempRegistersOnly);
		
		this.mEntries.sort (function (a:RegisterMapEntry, b:RegisterMapEntry):number {
			
			return a.number - b.number;
			
		}.__bind(this));
		
		var arrayCount:Dictionary = new Dictionary ();
		var entry:RegisterMapEntry;
		
		for (var i:number = 0, len:number =  ((this.mEntries.length) >> 0); i < len; ++i) {
			
			entry =strict( this.mEntries[i], RegisterMapEntry);
			
			if (entry.usage == RegisterUsage.VECTOR_4_ARRAY) {
				
				// find how many registers based on the next entry.
				if (i < this.mEntries.length - 1) {
					
					arrayCount.set(entry,  this.mEntries[i + 1].number - entry.number);
					
				} else {
					
					arrayCount.set(entry,  128);
					
				}
				
			}
			
		}
		
		this.mEntries.sort (function (a:RegisterMapEntry, b:RegisterMapEntry):number {
			
			return ((a.type) >> 0) - ((b.type) >> 0);
			
		}.__bind(this));
		
		var sb:string = '';
		
		for (i = 0, len = this.mEntries.length; i < len; ++i) {
			
			entry =strict( this.mEntries [i], RegisterMapEntry);
			
			// only emit temporary registers based on Boolean passed in
			// this is so temp registers can be grouped in the main() block
			if ((tempRegistersOnly && entry.type != RegisterType.TEMPORARY) || (!tempRegistersOnly && entry.type == RegisterType.TEMPORARY)) {
				
				continue;
				
			}
			
			// dont emit output registers
			if (entry.type == RegisterType.OUTPUT) {
				
				continue;
				
			}
			
			switch (entry.type) {
				
				case RegisterType.ATTRIBUTE:
					
					// sb.AppendFormat("layout(location = {0}) ", entry.number);
					sb += ("attribute ");
					break;
				
				case RegisterType.CONSTANT:
					
					//sb.AppendFormat("layout(location = {0}) ", entry.number);
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
					
					throw new IllegalOperationError ();
					
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
					
					trace ("Missing switch patten: RegisterUsage.UNUSED");
					break;
				
				case RegisterUsage.SAMPLER_2D_ALPHA:
					
					trace ("Missing switch patten: RegisterUsage.SAMPLER_2D_ALPHA");
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
				
			} else if (entry.usage == RegisterUsage.VECTOR_4_ARRAY) {
				
				sb += (entry.name + "[" + arrayCount.get(entry) + "]"); // this is an array of "count" elements.
				sb += (";\n");
				
			} else {
				
				sb += (entry.name);
				sb += (";\n");
				
			}
			
		}
		
		return sb;
		
	}
	
	
}



 class RegisterMapEntry {
	
	
	public name:string = null;
	public number:number = 0;
	public type:number = 0;
	public usage:number = 0;
	
	
	constructor () {
		
		
		
	}
	
	
}


 class RegisterType {
	
	public static ATTRIBUTE:number = 0;
	public static CONSTANT:number = 1;
	public static TEMPORARY:number = 2;
	public static OUTPUT:number = 3;
	public static VARYING:number = 4;
	public static SAMPLER:number = 5;
	
}


 class RegisterUsage {
	
	public static UNUSED:number = 0;
	public static VECTOR_4:number = 1;
	public static MATRIX_4_4:number = 2;
	public static SAMPLER_2D:number = 3;
	public static SAMPLER_2D_ALPHA:number = 4;
	public static SAMPLER_CUBE:number = 5;
	public static VECTOR_4_ARRAY:number = 6;
	
}


 class SamplerRegister {
	
	private static NEAREST:number = 0x2600;
	private static LINEAR:number = 0x2601;
	private static NEAREST_MIPMAP_NEAREST:number = 0x2700;
	private static LINEAR_MIPMAP_NEAREST:number = 0x2701;
	private static NEAREST_MIPMAP_LINEAR:number = 0x2702;
	private static LINEAR_MIPMAP_LINEAR:number = 0x2703;
	private static REPEAT:number = 0x2901;
	private static CLAMP_TO_EDGE:number = 0x812F;
	
	public b:number = 0; // lod bias
	public d:number = 0; // dimension 0=2d 1=cube
	public f:number = 0; // Filter (0=nearest,1=linear) (4 bits)
	public m:number = 0; // Mipmap (0=disable,1=nearest, 2=linear)
	public n:number = 0; // number
	public programType:number = 0;
	public s:number = 0; // special flags bit
	public t:number = 0; // texture format (0=none, dxt1=1, dxt5=2)
	public type:number = 0;
	public w:number = 0; // wrap (0=clamp 1=repeat)
	
	
	constructor () {
		
	}
	
	
	public static parse (v:Int64, programType:number):SamplerRegister {
		
		/**/ v = strict(v, Int64); programType = ((programType) >> 0);
		
		var low:number = v.low.toInt();
		var high:number = v.high.toInt();
		
		var sr:SamplerRegister = new SamplerRegister ();
		sr.programType = programType;
		sr.f = ((high >> 28) & 0xF); // filter
		sr.m = ((high >> 24) & 0xF); // mipmap
		sr.w = ((high >> 20) & 0xF); // wrap
		sr.s = ((high >> 16) & 0xF); // special
		sr.d = ((high >> 12) & 0xF); // dimension
		sr.t = ((high >> 8) & 0xF); // texture
		sr.type = ((high >> 0) & 0xF); // type
		sr.b = ((low >> 16) & 0xFF); // TODO: should this be .low?
		sr.n = (low & 0xFFFF); // number
		return sr;
		
	}
	
	
	public toGLSL ():string {
		
		return AGALConverter.prefixFromType (this.type, this.programType) + this.n;
		
	}
	
	
	public toSamplerState ():SamplerState {
		
		var magFilter:number /*TextureMagFilter*/ = 0;
		var minFilter:number /*TextureMinFilter*/ = 0;
		var wrapModeS:number /*TextureWrapMode*/ = 0;
		var wrapModeT:number /*TextureWrapMode*/ = 0;
		
		// translate mag filter
		switch (this.f) {
			
			case 0: magFilter =(( SamplerRegister.NEAREST) >> 0); break; //TextureMagFilter.Nearest;
			case 1: magFilter =(( SamplerRegister.LINEAR) >> 0); break; //TextureMagFilter.Linear;
			default: throw new IllegalOperationError(); //NotImplementedException();
				
		}
		
		// translate min filter
		switch (this.m) {
			
			// disable
			case 0:
				
				minFilter =(( (this.f != 0) ? SamplerRegister.LINEAR : SamplerRegister.NEAREST) >> 0);
				break;
			
			// nearest
			case 1:
				
				minFilter =(( (this.f != 0) ? SamplerRegister.LINEAR_MIPMAP_NEAREST : SamplerRegister.NEAREST_MIPMAP_NEAREST) >> 0);
				break;
			
			// linear
			case 2:
				
				minFilter =(( (this.f != 0) ? SamplerRegister.LINEAR_MIPMAP_LINEAR : SamplerRegister.NEAREST_MIPMAP_LINEAR) >> 0);
				break;
			
			default:
				
				throw new IllegalOperationError ();
				
		}
		
		// translate wrapping mode
		switch (this.w) {
			
			case 0:
				
				wrapModeS =(( SamplerRegister.CLAMP_TO_EDGE) >> 0);
				wrapModeT =(( SamplerRegister.CLAMP_TO_EDGE) >> 0);
				break;
			
			case 1:
				
				wrapModeS =(( SamplerRegister.REPEAT) >> 0);
				wrapModeT =(( SamplerRegister.REPEAT) >> 0);
				break;
			
			default:
				
				throw new IllegalOperationError ();
				
		}
		
		var ignoreSampler:boolean = (this.s & 4) == 4;
		var centroid:boolean = (this.s & 1) == 1;
		
		// translate lod bias, sign extend and /8
		var lodBias:number = ((this.b << 24) >> 24) / 8.0;
		var maxAniso:number = 0.0;
		
		return new SamplerState (minFilter, magFilter, wrapModeS, wrapModeT, lodBias, maxAniso, ignoreSampler, centroid);
		
	}
	
	
}

 class SourceRegister {
	
	
	public d:number = 0;
	public itype:number = 0;
	public n:number = 0;
	public o:number = 0;
	public programType:number = 0;
	public q:number = 0;
	public s:number = 0;
	public sourceMask:number = 0;
	public type:number = 0;
	
	
	constructor () {
		
	}
	
	
	public static parse (v:Int64, programType:number, sourceMask:number):SourceRegister {
		
		/**/ v = strict(v, Int64); programType = ((programType) >> 0); sourceMask = ((sourceMask) >> 0);
		
		var low:number = v.low.toInt();
		var high:number = v.high.toInt();
		
		var sr:SourceRegister = new SourceRegister ();
		sr.programType = programType;
		sr.d = ((high >> 31) & 1); // Direct=0/Indirect=1 for direct Q and I are ignored, 1bit
		sr.q = ((high >> 16) & 0x3); // index register component select
		sr.itype = ((high >> 8) & 0xF); // index register type
		sr.type = ((high >> 0) & 0xF); // type
		sr.s = ((low >> 24) & 0xFF); // swizzle
		sr.o = ((low >> 16) & 0xFF); // indirect offset
		sr.n = (low & 0xFFFF); // number
		sr.sourceMask = sourceMask;
		return sr;
		
	}
	
	
	public toGLSL (emitSwizzle:boolean = true, offset:number = 0):string {
		
		/**/ emitSwizzle = Boolean(emitSwizzle); offset = ((offset) >> 0);
		
		if (this.type == RegisterType.OUTPUT) {
			
			return this.programType == ProgramType.VERTEX ? "gl_Position" : "gl_FragColor";
			
		}
		
		var fullxyzw:boolean = (this.s == 228) && (this.sourceMask == 0xF);
		var swizzle:string = "";
		
		if (this.type != RegisterType.SAMPLER && !fullxyzw) {
			
			for (var i:number = 0; i < 4; ++i) {
				
				// only output swizzles for each source mask
				if ((this.sourceMask & (1 << i)) != 0) {
					
					switch ((this.s >> (i * 2)) & 3) {
						
						case 0: swizzle += "x"; break;
						case 1: swizzle += "y"; break;
						case 2: swizzle += "z"; break;
						case 3: swizzle += "w"; break;
						
					}
					
				}
				
			}
			
		}
		
		var str:string = AGALConverter.prefixFromType (this.type, this.programType);
		
		if (this.d == 0) {
			
			// direct register
			str += (this.n + offset);
			
		} else {
			
			// indirect register
			str += this.o;
			var indexComponent:string = String.fromCharCode ('x'.charCodeAt (0) + this.q);
			var indexRegister:string = AGALConverter.prefixFromType (this.itype, this.programType) + this.n + "." + indexComponent;
			str += "[ int(" + indexRegister + ") +" + offset + "]";
			
		}
		
		if (emitSwizzle && swizzle != "") {
			
			str += "." + swizzle;
			
		}
		
		return str;
		
	}
	
	
}}