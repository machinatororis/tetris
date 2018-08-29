/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />
/// <reference path="../system/Capabilities.ts" />
/// <reference path="../net/URLRequest.ts" />
/// <reference path="../events/SecurityErrorEvent.ts" />
/// <reference path="../events/ProgressEvent.ts" />
/// <reference path="../events/IOErrorEvent.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../events/Event.ts" />
/// <reference path="../../XML.ts" />

namespace flash.media
{
	export import XML = global.XML;
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	export import IOErrorEvent = flash.events.IOErrorEvent;
	export import ProgressEvent = flash.events.ProgressEvent;
	export import SecurityErrorEvent = flash.events.SecurityErrorEvent;
	export import URLRequest = flash.net.URLRequest;
	export import Capabilities = flash.system.Capabilities;
	export import ByteArray = flash.utils.ByteArray;
	
	
	/*[Event(name = "progress", type = "flash.events.ProgressEvent")]*/
	/*[Event(name = "open", type = "flash.events.Event")]*/
	/*[Event(name = "ioError", type = "flash.events.IOErrorEvent")]*/
	/*[Event(name = "id3", type = "flash.events.Event")]*/
	/*[Event(name = "complete", type = "flash.events.Event")]*/
	/*[Event(name = "sampleData", type = "flash.events.SampleDataEvent")]*/
	
	/**
	 * The Sound class lets you work with sound in an application. The Sound class lets you create a Sound object, 
	 * load and play an external MP3 file into that object, close the sound stream, and access data about the sound, 
	 * such as information about the number of bytes in the stream and ID3 metadata. 
	 * More detailed control of the sound is performed through the sound source — 
	 * the SoundChannel or Microphone object for the sound — and through the properties in the SoundTransform class 
	 * that control the output of the sound to the computer's speakers.
	 * In Flash Player 10 and later and AIR 1.5 and later, you can also use this class to work with sound that is generated dynamically. 
	 * In this case, the Sound object uses the function you assign to a sampleData event handler to poll for sound data. 
	 * The sound is played as it is retrieved from a ByteArray object that you populate with sound data. 
	 * You can use Sound.extract() to extract sound data from a Sound object, 
	 * after which you can manipulate it before writing it back to the stream for playback.
	 * 
	 * To control sounds that are embedded in a SWF file, use the properties in the SoundMixer class.
	 * 
	 * Note: The ActionScript 3.0 Sound API differs from ActionScript 2.0. In ActionScript 3.0, 
	 * you cannot take sound objects and arrange them in a hierarchy to control their properties.
	 * 
	 * When you use this class, consider the following security model:
	 * 
	 * Loading and playing a sound is not allowed if the calling file is in a network sandbox and the sound file to be loaded is local.
	 * By default, loading and playing a sound is not allowed if the calling file is local and tries to load and play a remote sound. 
	 * A user must grant explicit permission to allow this type of access.
	 * Certain operations dealing with sound are restricted. 
	 * The data in a loaded sound cannot be accessed by a file in a different domain unless you implement a cross-domain policy file. 
	 * Sound-related APIs that fall under this restriction are Sound.id3, SoundMixer.computeSpectrum(), SoundMixer.bufferTime, 
	 * and the SoundTransform class.
	 * However, in Adobe AIR, content in the application security sandbox (content installed with the AIR application) 
	 * are not restricted by these security limitations.
	 * 
	 * For more information related to security, see the Flash Player Developer Center Topic: Security. 
	 * @author pkulikov
	 * 
	 */	
	export  class Sound extends EventDispatcher
	{
		/**
		 * Base path 
		 */		
		private static __base:string = '';
		
		/**
		 * Audio context 
		 */		
		private static __ctx:any = undefined; // AudioContext
		private static __ctxDisabled:boolean = false;
		
		private _source:AudioBufferSourceNode;
		private _buffer:AudioBuffer;
		private _xhr:XMLHttpRequest;
		private _loops:number;
		private _sndTransform:SoundTransform;
		private _stream:URLRequest;
		private _context:SoundLoaderContext;
		private _queue:Function[];
		private _request:URLRequest;
		private _bytesLoaded:number;
		private _bytesTotal:number;
		
		/**
		 * Creates a new Sound object. 
		 * @param stream
		 * @param context
		 * 
		 */		
		constructor(stream:URLRequest = null, context:SoundLoaderContext = null)
		{
			/**/ stream = strict(stream, URLRequest); context = strict(context, SoundLoaderContext);
			/**/ this._source === void 0 && (this._source = null);
			/**/ this._buffer === void 0 && (this._buffer = null);
			/**/ this._xhr === void 0 && (this._xhr = null);
			/**/ this._loops === void 0 && (this._loops = 0);
			/**/ this._sndTransform === void 0 && (this._sndTransform = null);
			/**/ this._stream === void 0 && (this._stream = null);
			/**/ this._context === void 0 && (this._context = null);
			/**/ this._queue === void 0 && (this._queue = undefined);
			/**/ this._request === void 0 && (this._request = null);
			/**/ this._bytesLoaded === void 0 && (this._bytesLoaded = 0);
			/**/ this._bytesTotal === void 0 && (this._bytesTotal = 0);
			super(); 
			this._context = context;
			this._stream = stream;
			this._queue = new Array;
			
			var ctx = Sound.__getCtx();
			
			if (!ctx) {
				
				return;
				
			}
			
			if (stream) {
				
				this.load(stream, context);
				
			}
		}
		
		/**
		 * The URL from which this sound was loaded. 
		 * @return 
		 * 
		 */		
		public get url():string
		{
			return this._request ? this._request.url : null;
		}
		
		/**
		 * Indicates if the Sound.url property has been truncated. 
		 * @return 
		 * 
		 */		
		public get isURLInaccessible():boolean { return false; }
		
		/**
		 * Initiates loading of an external MP3 file from the specified URL. 
		 * @param stream
		 * @param context
		 * 
		 */		
		public load(stream:URLRequest, context:SoundLoaderContext = null):void
		{
			/**/ stream = strict(stream, URLRequest); context = strict(context, SoundLoaderContext);
			var ctx = Sound.__getCtx();
			if (!ctx) {
				
				return;
				
			}
			
			this._request = stream;
			var address = this._request.url;
			if (Sound.__base && address.substr(0, 3).toLowerCase() != 'www' && address.substr(0, 4).toLowerCase() != 'http') {
				
				address = Sound.__base + address;
				
			}
			
			this._xhr = new XMLHttpRequest;
			this._xhr.open('GET', address);
			this._xhr.responseType = 'arraybuffer';
			this._xhr.onprogress = this.__onProgress.__bind(this);
			this._xhr.onreadystatechange = this.__onReadyStateChange.__bind(this);
			this._xhr.send();
			
			this.dispatchEvent(new Event(Event.OPEN));
		}
		
		/**
		 * load MP3 sound data from a ByteArray object into a Sound object. 
		 * @param bytes
		 * @param bytesLength
		 * 
		 */		
		public loadCompressedDataFromByteArray(bytes:ByteArray, bytesLength:number):void
		{
			/**/ bytes = strict(bytes, ByteArray); bytesLength = ((bytesLength) >>> 0);
			var ctx = Sound.__getCtx();
			if (!ctx) {
				
				this.__decodeAudioDataSuccess(null);
				return;
				
			}
			
			if (bytes.length > bytesLength) {
				
				var copy = new ByteArray;
				copy.writeBytes (bytes, 0, bytesLength);
				bytes =strict( copy, ByteArray);
				
			}
			
			ctx.decodeAudioData(bytes.buffer, this.__decodeAudioDataSuccess.__bind(this), this.__decodeAudioDataError.__bind(this));
		}
		
		/**
		 * Load PCM 32-bit floating point sound data from a ByteArray object into a Sound object. 
		 * @param bytes
		 * @param samples
		 * @param format
		 * @param stereo
		 * @param sampleRate
		 * 
		 */		
		public loadPCMFromByteArray(bytes:ByteArray, samples:number, format:string = "float", stereo:boolean = true, sampleRate:number = 44100):void
		{
			/**/ bytes = strict(bytes, ByteArray); samples = ((samples) >>> 0); format = as(format, 'String'); stereo = Boolean(stereo); sampleRate = (+(sampleRate));
			this.dispatchEvent (new IOErrorEvent (IOErrorEvent.IO_ERROR));
		}
		
		/**
		 * Generates a new SoundChannel object to play back the sound. 
		 * @param offset
		 * @param loops
		 * @param sndTransform
		 * @return 
		 * 
		 */		
		public play(startTime:number = 0, loops:number = 0, sndTransform:SoundTransform = null):SoundChannel
		{
			/**/ startTime = (+(startTime)); loops = ((loops) >> 0); sndTransform = strict(sndTransform, SoundTransform);
			var ctx = Sound.__getCtx();
			if (!ctx) {
				
				return null;
				
			}
			
			var channel = new SoundChannel;
			
			if (sndTransform == null) {
				
				sndTransform = new SoundTransform ();
				
			} else {
				
				sndTransform = sndTransform.clone ();
				
			}
			
			this._sndTransform = sndTransform;
			this._loops = loops;
			
			if (!this._buffer && !this._xhr && this._stream && this._stream.url) {
				
				this.load(this._stream, this._context);
				
			}
			
			if (this._buffer) {
				
				bufferReady.__bind(this)();
				
			} else {
				
				this._queue.push(bufferReady.__bind(this));
				
			}
			
			return channel;
			
			function bufferReady ():void
			{
				var source:AudioBufferSourceNode =  strict(ctx.createBufferSource(), AudioBufferSourceNode);
				source.loop = loops > 0;
				source.buffer = this._buffer;
				source.connect(ctx.destination);
				source.start(0, startTime / 1000);
				
				this._source = source;
				channel.__init(this._source, sndTransform, startTime / 1000);
			}
		}
		
		/**
		 * The length of the current sound in milliseconds. 
		 * @return 
		 * 
		 */		
		public get length():number
		{
			if (this._buffer) {
				
				return ((this._buffer.duration) >> 0) * 1000;
				
			}
			
			return 0;
		}
		
		/**
		 * Returns the buffering state of external MP3 files. 
		 * @return 
		 * 
		 */		
		public get isBuffering():boolean { return false; }
		
		/**
		 * Returns the currently available number of bytes in this sound object. 
		 * @return 
		 * 
		 */		
		public get bytesLoaded():number { return this._bytesLoaded; }
		
		/**
		 * Returns the total number of bytes in this sound object. 
		 * @return 
		 * 
		 */		
		public get bytesTotal():number { return this._bytesTotal; }
		
		/**
		 * Provides access to the metadata that is part of an MP3 file. 
		 * @return 
		 * 
		 */		
		public get id3():ID3Info { return null; }
		
		/**
		 * Closes the stream, causing any download of data to cease. 
		 * 
		 */		
		public close():void
		{
			this._request = null;
			this._bytesLoaded = this._bytesTotal = 0;
			
			if (this._xhr) {
			
				try {
					
					this._xhr.onreadystatechange = null;
					this._xhr.onprogress = null;
					this._xhr.abort();
					this._xhr = null;
					
				} catch (e) {e = window.asc.e2e(e);}
				
			}
		}
		
		/**
		 * Extracts raw sound data from a Sound object. 
		 * @param target
		 * @param length
		 * @param startPosition
		 * @return 
		 * 
		 */		
		public extract(target:ByteArray, length:number, startPosition:number=-1):number
		{
			/**/ target = strict(target, ByteArray); length = (+(length)); startPosition = (+(startPosition));
			return 0;
		}
		
		/*[internal]*/ protected __fromAudioBuffer(buffer:AudioBuffer):void
		{
			// buffer = strict(buffer, AudioBuffer);
			this._buffer = buffer;
		}
		
		/*[internal]*/ protected __onProgress(e:any):void
		{
			this._bytesLoaded =(( e.loaded) >> 0);
			this._bytesTotal =(( e.total) >> 0);
			
			this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false, this._bytesLoaded, this._bytesTotal));
		}
		
		/*[internal]*/ protected __onReadyStateChange(e:any):void
		{
			var ctx = Sound.__getCtx();
			var readyState = this._xhr.readyState;
			var status = this._xhr.status;
			
			if (readyState == 4 && status == 200) {
				
				ctx.decodeAudioData(this._xhr.response, this.__decodeAudioDataSuccess.__bind(this), this.__decodeAudioDataError.__bind(this));
				
			} else if (readyState == 4 && (status == 403 || status == 404)) {
				
				this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR));
				
			} else if (readyState == 4 && status == 0) {
				
				this.dispatchEvent(new SecurityErrorEvent(SecurityErrorEvent.SECURITY_ERROR));
				
			}
		}
		
		/*[internal]*/ protected __decodeAudioDataSuccess(buffer:AudioBuffer):void 
		{
			// buffer = strict(buffer, AudioBuffer);
			this.__fromAudioBuffer(buffer);
			
			while (this._queue.length) {
				
				this._queue.shift()();
				
			}
			
			this.dispatchEvent(new Event(Event.COMPLETE));
		}
		
		/*[internal]*/ protected __decodeAudioDataError():void 
		{
			this.dispatchEvent (new IOErrorEvent (IOErrorEvent.IO_ERROR));
		}
		
		/*[internal]*/ protected static __getCtx():AudioContext
		{
			if (Sound.__ctxDisabled) {
				
				return null;
				
			}
			
			if (!Sound.__ctx) {
				
				if (typeof window.AudioContext != "undefined") {
					
					Sound.__ctx = new window.AudioContext;
					
				} else if (typeof window.webkitAudioContext != "undefined") {
					
					Sound.__ctx = new window.webkitAudioContext;
					
				} else {
					
					Sound.__ctxDisabled = true;
					
				}
				
				if (Sound.__ctx) {
					
					Sound.__fixCtx();
					Sound.__ctx.onstatechange = Sound.__fixCtx.__bind(this);
					
				}
				
			}
			
			return Sound.__ctx;
		}
		
		/*[internal]*/ protected static __isSuspended ():boolean
		{
			return Sound.__ctx && typeof Sound.__ctx.state == 'string' && Sound.__ctx.state != 'running';
		}
		
		/*[internal]*/ protected static __fixCtx ():void
		{
			if (!Sound.__ctx) {
				
				return;
				
			}
			
			if (Sound.__isSuspended()) {
				
				window.removeEventListener("click", Sound.__resumeCtx.__bind(this));
				window.addEventListener("click", Sound.__resumeCtx.__bind(this));
				
				if (Capabilities.isMobile) {
					
					window.removeEventListener("touchstart", Sound.__resumeCtx.__bind(this));
					window.addEventListener("touchstart", Sound.__resumeCtx.__bind(this));
					
				}
				
			}
		}
		
		/*[internal]*/ protected static __resumeCtx ():void
		{
			if (!Sound.__ctx) {
				
				return;
				
			}
			
			if (typeof Sound.__ctx.resume == 'function') {
				
				Sound.__ctx.resume();
				
			}
			
			if (Sound.__isSuspended()) {
				
				return;
				
			}
			
			window.removeEventListener("click", Sound.__resumeCtx.__bind(this));
			
			if (Capabilities.isMobile) {
				
				window.removeEventListener("touchstart", Sound.__resumeCtx.__bind(this));
				
			}
		}
	}
}