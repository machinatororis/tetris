/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/ByteArray.ts" />
/// <reference path="../../events/EventDispatcher.ts" />
/// <reference path="../../errors/IllegalOperationError.ts" />
/// <reference path="../Context3D.ts" />
/// <reference path="../../__native/renderer/webgl/SamplerState.ts" />

namespace flash.display3D.textures
{
	export import SamplerState = flash.__native.renderer.webgl.SamplerState;
	export import Context3D = flash.display3D.Context3D;
	export import IllegalOperationError = flash.errors.IllegalOperationError;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The TextureBase class is the base class for Context3D texture objects.
	 * Note: You cannot create your own texture classes using TextureBase. 
	 * To add functionality to a texture class, extend either Texture or CubeTexture instead. 
	 * @author pkulikov
	 * 
	 */	
	export  class TextureBase extends EventDispatcher
	{
		protected static __textureFormat:number = 0;
		protected static __textureInternalFormat:number = 0;
		
		protected static __supportsCompressed:any = null;
		protected static __textureFormatCompressed:number = 0;
		protected static __textureFormatCompressedAlpha:number = 0;
		
		protected __alphaTexture:Texture;
		protected __compressedMemoryUsage:number;
		protected __context:Context3D;
		protected __gl:WebGLRenderingContext;
		protected __format:number;
		protected __height:number;
		protected __internalFormat:number;
		protected __memoryUsage:number;
		protected __optimizeForRenderToTexture:boolean;
		protected __outputTextureMemoryUsage:boolean;
		protected __samplerState:SamplerState;
		protected __streamingLevels:number;
		protected __textureID:WebGLTexture;
		protected __textureTarget:number;
		protected __width:number;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor(context:Context3D)
		{
			/**/ context = strict(context, Context3D);
			/**/ this.__alphaTexture === void 0 && (this.__alphaTexture = null);
			/**/ this.__compressedMemoryUsage === void 0 && (this.__compressedMemoryUsage = 0);
			/**/ this.__context === void 0 && (this.__context = null);
			/**/ this.__gl === void 0 && (this.__gl = null);
			/**/ this.__format === void 0 && (this.__format = 0);
			/**/ this.__height === void 0 && (this.__height = 0);
			/**/ this.__internalFormat === void 0 && (this.__internalFormat = 0);
			/**/ this.__memoryUsage === void 0 && (this.__memoryUsage = 0);
			/**/ this.__optimizeForRenderToTexture === void 0 && (this.__optimizeForRenderToTexture = false);
			/**/ this.__outputTextureMemoryUsage === void 0 && (this.__outputTextureMemoryUsage = false);
			/**/ this.__samplerState === void 0 && (this.__samplerState = null);
			/**/ this.__streamingLevels === void 0 && (this.__streamingLevels = 0);
			/**/ this.__textureID === void 0 && (this.__textureID = null);
			/**/ this.__textureTarget === void 0 && (this.__textureTarget = 0);
			/**/ this.__width === void 0 && (this.__width = 0);
			super ();
			
			this.__gl =strict( (this.__context = context).__gl, WebGLRenderingContext);
			
			this.__textureID = this.__gl.createTexture ();
			
			TextureBase.__textureInternalFormat =(( this.__gl.RGBA) >> 0);
			TextureBase.__textureFormat =(( this.__gl.RGBA) >> 0);
			
			if (TextureBase.__supportsCompressed == null) {
				
				var compressedExtension = this.__gl.getExtension ("WEBGL_compressed_texture_s3tc");
				
				if (compressedExtension != null) {
					
					TextureBase.__supportsCompressed = true;
					TextureBase.__textureFormatCompressed =(( compressedExtension.COMPRESSED_RGBA_S3TC_DXT1_EXT) >> 0);
					TextureBase.__textureFormatCompressedAlpha =(( compressedExtension.COMPRESSED_RGBA_S3TC_DXT5_EXT) >> 0);
					
				} else {
					
					TextureBase.__supportsCompressed = false;
					
				}
				
			}
			
			this.__internalFormat = TextureBase.__textureInternalFormat;
			this.__format = TextureBase.__textureFormat;
		}
		
		/**
		 * Frees all GPU resources associated with this texture. 
		 * 
		 */		
		public dispose() : void
		{
			if (this.__alphaTexture != null) {
				
				this.__alphaTexture.dispose ();
				
			}
			
			this.__gl.deleteTexture (this.__textureID);
		}
		
		protected __getATFVersion (data:ByteArray):number {
			
			/**/ data = strict(data, ByteArray);
			
			var signature = data.readUTFBytes (3);
			
			if (signature != "ATF") {
				
				throw new IllegalOperationError ("ATF signature not found");
				
			}
			
			var position = data.position;
			var version = 0;
			
			if (data.bytesAvailable >= 5) {
				
				var sig = this.__readUInt32 (data);
				
				if (sig == 0xff) {
					
					version = data.readUnsignedByte ();
					
				} else {
					
					data.position =(( position) >>> 0);
					
				}
				
			}
			
			return version;
			
		}
		
		
		protected __getTexture ():WebGLTexture {
			
			return this.__textureID;
			
		}
		
		
		protected __readUInt24 (data:ByteArray):number {
			
			/**/ data = strict(data, ByteArray);
			
			var value:number = 0;
			value =(( (data.readUnsignedByte () << 16)) >>> 0);
			value |= (data.readUnsignedByte () << 8);
			value |= data.readUnsignedByte ();
			return value;
			
		}
		
		
		protected __readUInt32 (data:ByteArray):number {
			
			/**/ data = strict(data, ByteArray);
			
			var value:number = 0;
			value =(( (data.readUnsignedByte () << 24)) >>> 0);
			value |= (data.readUnsignedByte () << 16);
			value |= (data.readUnsignedByte () << 8);
			value |= data.readUnsignedByte ();
			return value;
			
		}
		
		
		/*[internal]*/ protected __setSamplerState (state:SamplerState):void {
			
			// state = strict(state, SamplerState);
			
			if (!state.equals (this.__samplerState)) {
				
				this.__gl.bindTexture (this.__textureTarget, this.__textureID);
				this.__gl.texParameteri (this.__textureTarget, this.__gl.TEXTURE_MIN_FILTER, state.__minFilter);
				this.__gl.texParameteri (this.__textureTarget, this.__gl.TEXTURE_MAG_FILTER, state.__magFilter);
				this.__gl.texParameteri (this.__textureTarget, this.__gl.TEXTURE_WRAP_S, state.__wrapModeS);
				this.__gl.texParameteri (this.__textureTarget, this.__gl.TEXTURE_WRAP_T, state.__wrapModeT);
				
				if (state.__lodBias != 0.0) {
					
					// TODO
					//throw new IllegalOperationError("Lod bias setting not supported yet");
					
				}
				
				if (!this.__samplerState) {
					
					if (state && !state.ignoreSampler) {
						
						this.__samplerState = new SamplerState(state.__minFilter, state.__magFilter, state.__wrapModeS, state.__wrapModeT, state.__lodBias, state.__maxAniso, state.ignoreSampler, state.centroid, state.mipmapGenerated);
						
					} else {
						
						this.__samplerState = new SamplerState;
						
					}
					
				} else if (state && !state.ignoreSampler) {
					
					this.__samplerState.copyFrom(state);
					
				}
				
				this.__samplerState.__samplerDirty = false;
				
			}
			
		}
		
	}

}