/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/ByteArray.ts" />
/// <reference path="../Context3D.ts" />
/// <reference path="../../display/BitmapData.ts" />
/// <reference path="../../__native/renderer/webgl/SamplerState.ts" />

namespace flash.display3D.textures
{
	export import SamplerState = flash.__native.renderer.webgl.SamplerState;
	export import BitmapData = flash.display.BitmapData;
	export import Context3D = flash.display3D.Context3D;
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The Rectangle Texture class represents a 2-dimensional texture uploaded to a rendering context.
	 * Defines a 2D texture for use during rendering.
	 * 
	 * Texture cannot be instantiated directly. Create instances by using Context3D createRectangleTexture() method. 
	 * @author pkulikov
	 * 
	 */	
	export  class RectangleTexture extends TextureBase
	{
		/**
		 * Constructor 
		 * 
		 */		
		constructor(context:Context3D, width:number, height:number, format:string, optimizeForRenderToTexture:boolean)
		{
			/**/ context = strict(context, Context3D); width = ((width) >> 0); height = ((height) >> 0); format = as(format, 'String'); optimizeForRenderToTexture = Boolean(optimizeForRenderToTexture);
			super(context);
			
			this.__textureTarget =(( this.__gl.TEXTURE_2D) >> 0);
			
			this.__width = width;
			this.__height = height;
			//__format = format;
			this.__optimizeForRenderToTexture = optimizeForRenderToTexture;
			
			this.uploadFromTypedArray (null);
		}
		
		/**
		 * Uploads a texture from a BitmapData object. 
		 * @param source
		 * 
		 */		
		public uploadFromBitmapData(source:BitmapData) : void {
			
			/**/ source = strict(source, BitmapData);
			
			if (source == null) return;
			
			this.uploadFromTypedArray (source.__getP2Pixels());
			
		}
		
		/**
		 * Uploads a texture from a ByteArray. 
		 * @param data
		 * @param byteArrayOffset
		 * 
		 */		
		public uploadFromByteArray(data:ByteArray, byteArrayOffset:number) : void {
			
			/**/ data = strict(data, ByteArray); byteArrayOffset = ((byteArrayOffset) >>> 0);
			
			if (byteArrayOffset == 0) {
				
				this.uploadFromTypedArray (data.buffer);
				return;
				
			}
			
			this.uploadFromTypedArray (new Uint8Array (data.buffer, byteArrayOffset));
			
		}
		
		
		public uploadFromTypedArray (data/*:ArrayBufferView*/):void {
			
			//if (__format != Context3DTextureFormat.BGRA) {
			//
			//throw new IllegalOperationError ();
			//
			//}
			
			var current = this.__gl.getParameter(this.__gl.TEXTURE_BINDING_2D);
			
			this.__gl.bindTexture (this.__textureTarget, this.__textureID);
			
			this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
			
			this.__gl.texImage2D (this.__textureTarget, 0, this.__internalFormat, this.__width, this.__height, 0, this.__format, this.__gl.UNSIGNED_BYTE, data);
			
			this.__gl.bindTexture (this.__textureTarget, current);
			
		}
		
		
		private /*override*/ __setSamplerState (state:SamplerState) {
			
			/**/ state = strict(state, SamplerState);
			
			if (!state.equals (this.__samplerState)) {
				
				if (state.maxAniso != 0.0) {
					
					this.__gl.texParameterf (this.__gl.TEXTURE_2D, Context3D.TEXTURE_MAX_ANISOTROPY_EXT, state.maxAniso);
					
				}
				
			}
			
			super.__setSamplerState (state);
			
		}
	}

}