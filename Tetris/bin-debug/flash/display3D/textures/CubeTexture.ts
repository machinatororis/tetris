/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/setTimeout.ts" />
/// <reference path="../../utils/ByteArray.ts" />
/// <reference path="../../events/Event.ts" />
/// <reference path="../../errors/IllegalOperationError.ts" />
/// <reference path="../Context3DTextureFormat.ts" />
/// <reference path="../Context3D.ts" />
/// <reference path="../../display/BitmapData.ts" />
/// <reference path="../../__native/renderer/webgl/SamplerState.ts" />

namespace flash.display3D.textures
{
	export import SamplerState = flash.__native.renderer.webgl.SamplerState;
	export import BitmapData = flash.display.BitmapData;
	export import Context3D = flash.display3D.Context3D;
	export import Context3DTextureFormat = flash.display3D.Context3DTextureFormat;
	export import IllegalOperationError = flash.errors.IllegalOperationError;
	export import Event = flash.events.Event;
	export import ByteArray = flash.utils.ByteArray;
	export import setTimeout = flash.utils.setTimeout;
	
	
	/**
	 * The CubeTexture class represents a cube texture uploaded to a rendering context.
	 * Defines a cube map texture for use during rendering. Cube mapping is used for many rendering techniques, 
	 * such as environment maps, skyboxes, and skylight illumination.
	 * 
	 * You cannot create a CubeTexture object directly; use the Context3D createCubeTexture() instead. 
	 * @author pkulikov
	 * 
	 */	
	export  class CubeTexture extends TextureBase
	{
		
		private __size:number;
		private __uploadedSides:number;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor(context:Context3D, size:number, format:Context3DTextureFormat, optimizeForRenderToTexture:boolean, streamingLevels:number)
		{
			/**/ context = strict(context, Context3D); size = ((size) >> 0); format = strict(format, Context3DTextureFormat); optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture); streamingLevels = ((streamingLevels) >> 0);
			/**/ this.__size === void 0 && (this.__size = 0);
			/**/ this.__uploadedSides === void 0 && (this.__uploadedSides = 0);
			super (context);
			
			this.__textureTarget =(( this.__gl.TEXTURE_CUBE_MAP) >> 0);
			
			this.__size = size;
			//__format = format;
			this.__optimizeForRenderToTexture = optimizeForRenderToTexture;
			this.__streamingLevels = streamingLevels;
			
			this.__uploadedSides = 0;
		}
		
		/**
		 * Uploads a component of a cube map texture from a BitmapData object. 
		 * @param source
		 * @param side
		 * @param miplevel
		 * 
		 */		
		public uploadFromBitmapData(source:BitmapData, side:number, miplevel:number = 0) : void {
			
			/**/ source = strict(source, BitmapData); side = ((side) >>> 0); miplevel = ((miplevel) >>> 0);
			
			if (source == null) return;
			
			var size = this.__size >> miplevel;
			if (size == 0) return;
			
			//if (source.width != size || source.height != size) {
			//
			//	var copy = new BitmapData (size, size, true, 0x0);
			//	copy.draw (source);
			//	source = copy;
			//
			//}
			
			this.uploadFromTypedArray (source.__getP2Pixels(), side, miplevel);
			
			//if (copy) {
				
			//	copy.dispose();
				
			//}
			
		}
		
		/**
		 * Uploads a component of a cube map texture from a ByteArray object. 
		 * @param data
		 * @param byteArrayOffset
		 * @param side
		 * @param miplevel
		 * 
		 */		
		public uploadFromByteArray(data:ByteArray, byteArrayOffset:number, side:number, miplevel:number = 0) : void {
			
			/**/ data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >>> 0); side = ((side) >>> 0); miplevel = ((miplevel) >>> 0);
			
			if (byteArrayOffset == 0) {
				
				this.uploadFromTypedArray (data.buffer, side);
				return;
				
			}
			
			this.uploadFromTypedArray (new Uint8Array (data.buffer, byteArrayOffset), side, miplevel);
			
		}
		
		/**
		 * Uploads a cube texture in Adobe Texture Format (ATF) from a byte array. 
		 * @param data
		 * @param byteArrayOffset
		 * @param async
		 * 
		 */		
		public uploadCompressedTextureFromByteArray(data:ByteArray, byteArrayOffset:number, async:boolean = false) : void {
			
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
		
		public uploadFromTypedArray (data/*:ArrayBufferView*/, side:number, miplevel:number = 0):void {
			
			/**/ side = ((side) >>> 0); miplevel = ((miplevel) >>> 0);
			
			if (data == null) return;
			
			var size = this.__size >> miplevel;
			if (size == 0) return;
			
			var target;
			
			switch (side) {
				
				case 0: target = this.__gl.TEXTURE_CUBE_MAP_POSITIVE_X; break;
				case 1: target = this.__gl.TEXTURE_CUBE_MAP_NEGATIVE_X; break;
				case 2: target = this.__gl.TEXTURE_CUBE_MAP_POSITIVE_Y; break;
				case 3: target = this.__gl.TEXTURE_CUBE_MAP_NEGATIVE_Y; break;
				case 4: target = this.__gl.TEXTURE_CUBE_MAP_POSITIVE_Z; break;
				case 5: target = this.__gl.TEXTURE_CUBE_MAP_NEGATIVE_Z; break;
				default: throw new IllegalOperationError ();
				
			}
			
			var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
			
			this.__gl.bindTexture (this.__gl.TEXTURE_CUBE_MAP, this.__textureID);
			
			this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
			
			this.__gl.texImage2D (target, miplevel, this.__internalFormat, size, size, 0, this.__format, this.__gl.UNSIGNED_BYTE, data);
			
			this.__gl.bindTexture (this.__textureTarget, current);
			
			this.__uploadedSides |= 1 << side;
			
		}
		
		
		private /*override*/ __setSamplerState (state:SamplerState) {
			
			/**/ state = strict(state, SamplerState);
			
			if (!state.equals (this.__samplerState)) {
				
				if (state.minFilter != this.__gl.NEAREST && state.minFilter != this.__gl.LINEAR && !state.mipmapGenerated) {
					
					this.__gl.generateMipmap (this.__gl.TEXTURE_CUBE_MAP);
					
					state.mipmapGenerated = true;
					
				}
				
				if (state.maxAniso != 0.0) {
					
					this.__gl.texParameterf (this.__gl.TEXTURE_CUBE_MAP, Context3D.TEXTURE_MAX_ANISOTROPY_EXT, state.maxAniso);
					
				}
				
			}
			
			super.__setSamplerState (state);
			
		}
		
		
		private __uploadATFTextureFromByteArray (data:ByteArray, byteArrayOffset:number):void {
			
			/**/ data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >>> 0);
			
			//data.position = byteArrayOffset;
			//
			//var version = __getATFVersion (data);
			//var length = (version == 0) ? __readUInt24 (data) : __readUInt32 (data);
			//
			//if (cast ((byteArrayOffset + length), Int) > data.length) {
			//
			//throw new IllegalOperationError ("ATF length exceeds byte array length");
			//
			//}
			//
			//var tdata = data.readUnsignedByte();
			//var type:AtfType = cast (tdata >> 7);
			//
			//if (type != AtfType.NORMAL) {
			//
			//throw new IllegalOperationError ("ATF Cube maps are not supported");
			//
			//}
			//
			////Removing ATF format limitation to allow for multiple format support.
			////AtfFormat format = (AtfFormat)(tdata & 0x7f);	
			////if (format != AtfFormat.Block) {
			////	throw new NotImplementedException("Only ATF block compressed textures are supported");
			////}
			//
			//var width:Int = (1 << cast data.readUnsignedByte ());
			//var height:Int = (1 << cast data.readUnsignedByte ());
			//
			//if (width != __width || height != __height) {
			//
			//throw new IllegalOperationError ("ATF width and height dont match");
			//
			//}
			//
			//var mipCount:Int = cast data.readUnsignedByte ();
			//
			//for (level in 0...mipCount) {
			//
			//for (gpuFormat in 0...3) {
			//
			//var blockLength = (version == 0) ? __readUInt24 (data) : __readUInt32 (data);
			//
			///*
			////TODO: Figure out exceptions
			//if ((data.position + blockLength) > data.length) {
			//throw new System.IO.InvalidDataException("Block length exceeds ATF file length");
			//}*/
			//
			//if (blockLength > 0) {
			//
			//if (gpuFormat == 1) {
			//
			////TODO: Removed Monoplatform code
			//
			//} else if (gpuFormat == 2) {
			//
			////TODO: Removed Monoplatform code
			//
			//}
			//
			//// TODO handle other formats/platforms
			//
			//}
			//
			//data.position += blockLength;
			//
			//}
			//
			//}
			
		}
		
	}

}