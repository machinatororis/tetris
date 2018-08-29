/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/setTimeout.ts" />
/// <reference path="../../utils/ByteArray.ts" />
/// <reference path="../../events/Event.ts" />
/// <reference path="../../errors/IllegalOperationError.ts" />
/// <reference path="../Context3D.ts" />
/// <reference path="../../display/BitmapData.ts" />
/// <reference path="../../__native/renderer/webgl/SamplerState.ts" />

namespace flash.display3D.textures
{
	export import SamplerState = flash.__native.renderer.webgl.SamplerState;
	export import BitmapData = flash.display.BitmapData;
	export import Context3D = flash.display3D.Context3D;
	export import IllegalOperationError = flash.errors.IllegalOperationError;
	export import Event = flash.events.Event;
	export import ByteArray = flash.utils.ByteArray;
	export import setTimeout = flash.utils.setTimeout;
	
	
	/**
	 * The Texture class represents a 2-dimensional texture uploaded to a rendering context.
	 * Defines a 2D texture for use during rendering.
	 * 
	 * Texture cannot be instantiated directly. Create instances by using Context3D createTexture() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class Texture extends TextureBase
	{
		private static NORMAL:number = 0;
		private static CUBE_MAP:number = 1;
		
		private static RGB888:number = 0;
		private static RGBA8888:number = 1;
		private static COMPRESSED:number = 2; // JPEG-XR+LZMA & Block compression
		private static RAW_COMPRESSED:number = 3; // Block compression
		private static COMPRESSED_ALPHA:number = 4; // JPEG-XR+LZMA & Block compression with Alpha
		private static RAW_COMPRESSED_ALPHA:number = 5; // Block compression with Alpha
			
		/**
		 * Constructor 
		 * 
		 */		
		constructor (context:Context3D, width:number, height:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number)
		{
			/**/ context = strict(context, Context3D); width = ((width) >> 0); height = ((height) >> 0); format = as(format, 'String'); optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture); streamingLevels = ((streamingLevels) >> 0);
			super (context);
			
			this.__textureTarget =(( this.__gl.TEXTURE_2D) >> 0);
			
			this.__width = width;
			this.__height = height;
			//__format = format;
			this.__optimizeForRenderToTexture = optimizeForRenderToTexture;
			this.__streamingLevels = streamingLevels;
			
			var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
			
			this.__gl.bindTexture (this.__textureTarget, this.__textureID);
			
			this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
			
			this.__gl.texImage2D (this.__textureTarget, 0, this.__internalFormat, width, height, 0, this.__format, this.__gl.UNSIGNED_BYTE, null);
			
			this.__gl.bindTexture (this.__textureTarget, current);
		}
		
		/**
		 * Uploads a texture from a BitmapData object.
		 * @param bitmapData
		 * @param miplevel
		 * 
		 */		
		public uploadFromBitmapData (source:BitmapData, miplevel:number = 0):void
		{
			/**/ source = strict(source, BitmapData); miplevel = ((miplevel) >>> 0);
			if (source == null) return;
			
			var width = this.__width >> miplevel;
			var height = this.__height >> miplevel;
			
			if (width == 0 && height == 0) return;
			
			if (width == 0) width = 1;
			if (height == 0) height = 1;
			
			if (source._width != width || source._height != height) {
				
				var copy = new BitmapData (width, height, true, 0x0);
				copy.draw (source);
				source =strict( copy, BitmapData);
				
			}
			
			this.uploadFromTypedArray (source.__getP2Pixels(), miplevel);
			
			if (copy) {
				
				copy.dispose();
				
			}
		}
		
		/**
		 * Uploads a texture from a ByteArray. 
		 * @param data
		 * @param byteArrayOffset
		 * @param miplevel
		 * 
		 */		
		public uploadFromByteArray (data:ByteArray, byteArrayOffset:number, miplevel:number = 0):void
		{
			/**/ data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >>> 0); miplevel = ((miplevel) >>> 0);
			if (byteArrayOffset == 0) {
				
				this.uploadFromTypedArray (data.buffer, miplevel);
				return;
				
			}
			
			this.uploadFromTypedArray (new Uint8Array (data.buffer, byteArrayOffset), miplevel);
		}
		
		/**
		 * Uploads a compressed texture in Adobe Texture Format (ATF) from a ByteArray object. 
		 * @param data
		 * @param byteArrayOffset
		 * @param async
		 * 
		 */		
		public uploadCompressedTextureFromByteArray (data:ByteArray, byteArrayOffset:number, async:boolean = false):void
		{
			/**/ data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >>> 0); async = Boolean(async);
			data.position = byteArrayOffset;
			var signature:string = data.readUTFBytes (3);
			data.position = byteArrayOffset;
			
			if (signature == "ATF") {
				
				var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
				
				this.__gl.bindTexture (this.__textureTarget, this.__textureID);
				
				this.__uploadATFTextureFromByteArray (data, byteArrayOffset);
				
				this.__gl.bindTexture (this.__textureTarget, current);
				
			} else {
				
				// trackCompressedMemoryUsage(dataLength); // TODO: Figure out where dataLength comes from
				
				// __gl.bindTexture (__textureTarget, null);
				
			}
			
			if (async) {
				
				setTimeout (function () {
					
					this.dispatchEvent (new Event (Event.TEXTURE_READY));
					
				}.__bind(this), 1);
				
			}
		}
		
		/**
		 * Uploads a texture from a image object.
		 * @param data HTMLCanvasElement, HTMLImageElement
		 * @param miplevel
		 * 
		 */		
		public uploadFromElement (data:any, miplevel:number = 0):void
		{
			/**/ miplevel = ((miplevel) >>> 0);
			var width = this.__width >> miplevel;
			var height = this.__height >> miplevel;
			
			if (width == 0 && height == 0) return;
			
			if (width == 0) width = 1;
			if (height == 0) height = 1;
			
			if (data.width != width || data.height != height) {
				
				data.width = width;
				data.height = height;
				
			}
			
			var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
			
			this.__gl.bindTexture(this.__textureTarget, this.__textureID);
			
			this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
			
			this.__gl.texImage2D(this.__textureTarget, 0, this.__internalFormat, this.__format, this.__gl.UNSIGNED_BYTE, data);
			
			this.__gl.bindTexture(this.__textureTarget, current);
		}
		
		/**
		 * Native ArrayBufferView
		 * @param data
		 * @param miplevel
		 * 
		 */		
		public uploadFromTypedArray (data:any, miplevel:number = 0):void {
			
			/**/ miplevel = ((miplevel) >>> 0);
			
			if (data == null) return;
			
			var width = this.__width >> miplevel;
			var height = this.__height >> miplevel;
			
			if (width == 0 && height == 0) return;
			
			if (width == 0) width = 1;
			if (height == 0) height = 1;
			
			var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
			
			this.__gl.bindTexture (this.__textureTarget, this.__textureID);
			
			this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
			
			this.__gl.texImage2D (this.__textureTarget, miplevel, this.__internalFormat, width, height, 0, this.__format, this.__gl.UNSIGNED_BYTE, data);
			
			this.__gl.bindTexture (this.__textureTarget, current);
			
		}
		
		/*[internal]*/ /*override*/ protected __setSamplerState (state:SamplerState) {
			
			// state = strict(state, SamplerState);
			
			if (!state.equals (this.__samplerState)) {
				
				if (state.__minFilter != this.__gl.NEAREST && state.__minFilter != this.__gl.LINEAR && !state.mipmapGenerated) {
					
					this.__gl.generateMipmap (this.__textureTarget);
					
					state.mipmapGenerated = true;
					
				}
				
				if (state.__maxAniso != 0.0) {
					
					this.__gl.texParameterf (this.__textureTarget, Context3D.TEXTURE_MAX_ANISOTROPY_EXT, state.__maxAniso);
					
				}
				
			}
			
			super.__setSamplerState (state);
			
		}
		
		
		/*[internal]*/ protected __uploadATFTextureFromByteArray (data:ByteArray, byteArrayOffset:number):void {
			
			// data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >>> 0);
			
			data.position = byteArrayOffset;
			var version = 0;
			var length = 0;
			
			// When the 6th byte is 0xff, we have one of the new formats
			if (data.get(byteArrayOffset+6) == 0xff) {
				
				version = data.get(byteArrayOffset+7);
				data.position =(( byteArrayOffset+8) >>> 0);
				length = this.__readUInt32 (data);
				
			}
			else {
				
				version = 0;
				data.position =(( byteArrayOffset+3) >>> 0);
				length = this.__readUInt24 (data);
				
			}
			
			
			if (((byteArrayOffset + length) >> 0) > data.length) {
				
				throw new IllegalOperationError ("ATF length exceeds byte array length");
				
			}
			
			var tdata = data.readUnsignedByte();
			var type:number = ((tdata >> 7) >> 0);
			
			if (type != Texture.NORMAL) {
				
				throw new IllegalOperationError ("ATF Cube maps are not supported");
				
			}
			
			// Handle the different texture formats
			var format:number = ((tdata & 0x7f) >> 0);	
			switch (format) {
				
				case Texture.RAW_COMPRESSED: this.__format = TextureBase.__textureFormatCompressed; break;
				case Texture.RAW_COMPRESSED_ALPHA: this.__format = TextureBase.__textureFormatCompressedAlpha; break;
				default: throw new IllegalOperationError("Only ATF block compressed textures without JPEG-XR+LZMA are supported");
					
			}
			
			var width:number = (1 << data.readUnsignedByte ());
			var height:number = (1 << data.readUnsignedByte ());
			
			if (width != this.__width || height != this.__height) {
				
				throw new IllegalOperationError ("ATF width and height dont match");
				
			}
			
			var mipCount:number =  ((data.readUnsignedByte ()) >> 0);
			
			// DXT1/5, ETC1, PVRTC4, ETC2
			// ETC2 is available with ATF version 3 
			var gpuFormats = (version < 3) ? 3 : 4;
			
			for (var level = 0; level < mipCount; ++level) {
				
				for (var gpuFormat = 0; gpuFormat < gpuFormats; ++gpuFormat) {
					
					var blockLength = (version == 0) ? this.__readUInt24 (data) : this.__readUInt32 (data);
					
					if ((data.position + blockLength) > data.length) {
						
						throw new IllegalOperationError("Block length exceeds ATF file length");
						
					}
					
					if (blockLength > 0) {
						
						
						if (gpuFormat == 0) {
							
							// DXT1/5
							
							var bytes:ByteArray = new ByteArray;
							data.readBytes(bytes, 0, blockLength);
							
							this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
							
							this.__gl.compressedTexImage2D (this.__textureTarget, level, this.__format, width>>level, height>>level, 0, blockLength, bytes);
							
						} else {
							
							// TODO: Other formats are currently not supported
							
							data.position += blockLength;
							
						}
						
					}
					
				}
				
			}
			
		}
		
	}

}