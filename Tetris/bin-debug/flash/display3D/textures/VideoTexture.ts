/// <reference path="../../../base.d.ts" />
/// <reference path="../../utils/setTimeout.ts" />
/// <reference path="../../media/Camera.ts" />
/// <reference path="../../events/Event.ts" />
/// <reference path="../Context3D.ts" />

namespace flash.display3D.textures
{
	export import Context3D = flash.display3D.Context3D;
	export import Event = flash.events.Event;
	export import Camera = flash.media.Camera;
	export import setTimeout = flash.utils.setTimeout;
	

	/**
	 * Video texture 
	 * @author pkulikov
	 * 
	 */	
	export  class VideoTexture extends TextureBase
	{
		
		private __videoWidth :number;
		private __videoHeight :number;
		private __netStream:NetStream;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor(context:Context3D)
		{
			/**/ context = strict(context, Context3D);
			/**/ this.__videoWidth === void 0 && (this.__videoWidth = 0);
			/**/ this.__videoHeight === void 0 && (this.__videoHeight = 0);
			/**/ this.__netStream === void 0 && (this.__netStream = null);
			super (context);
			
			this.__textureTarget =(( this.__gl.TEXTURE_2D) >> 0);
		}
		
		/**
		 * Specifies a video stream to be rendered within the texture of the VideoTexture object. 
		 * @param netStream
		 * 
		 */		
		public attachNetStream(netStream:NetStream) : void {
			
			/**/ netStream = strict(netStream, NetStream);
			
			this.__netStream = netStream;
			
				
			if (this.__netStream.__video.readyState == 4) {
				
				setTimeout (function () {
					
					this.__textureReady ();
					
				}.__bind(this), 0);
				
			} else {
				
				this.__netStream.__video.addEventListener ("canplay", function (_) {
					
					this.__textureReady ();
					
				}.__bind(this), false);
				
			}
			
		}
		
		/**
		 * Specifies a video stream from a camera to be rendered within the texture of the VideoTexture object. 
		 * @param theCamera
		 * 
		 */		
		public attachCamera(theCamera:Camera) : void {
			
		/**/ theCamera = strict(theCamera, Camera);
			
		}
		
		/**
		 * An integer specifying the width of the video stream, in pixels. 
		 * @return 
		 * 
		 */		
		public get videoWidth() : number { return this.__videoWidth; }
		
		/**
		 * An integer specifying the height of the video stream, in pixels.
		 * @return 
		 * 
		 */		
		public get videoHeight() : number { return this.__videoHeight; }
		
		
		private /*override*/ __getTexture ():GLTexture {
			
			if (!this.__netStream.__video.paused) {
				
				this.__gl.bindTexture (this.__textureTarget, this.__textureID);
				
				this.__gl.pixelStorei(this.__gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
				
				this.__gl.texImage2D (this.__gl.TEXTURE_2D, 0, this.__gl.RGBA, this.__gl.RGBA, this.__gl.UNSIGNED_BYTE, this.__netStream.__video);
				
			}
			
			return this.__textureID;
			
		}
		
		
		private __textureReady ():void {
			
			this.__videoWidth =(( this.__netStream.__video.videoWidth) >> 0);
			this.__videoHeight =(( this.__netStream.__video.videoHeight) >> 0);
			
			this.dispatchEvent (new Event (Event.TEXTURE_READY));
			
		}
	}

}