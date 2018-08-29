/// <reference path="../../base.d.ts" />
/// <reference path="../events/EventDispatcher.ts" />
/// <reference path="../events/Event.ts" />

namespace flash.media
{
	export import Event = flash.events.Event;
	export import EventDispatcher = flash.events.EventDispatcher;
	
	
	/*[Event(name = "soundComplete", type = "flash.events.Event")]*/
	
	/**
	 * The SoundChannel class controls a sound in an application. Every sound is assigned to a sound channel, 
	 * and the application can have multiple sound channels that are mixed together. 
	 * The SoundChannel class contains a stop() method, properties for monitoring the amplitude (volume) of the channel, 
	 * and a property for assigning a SoundTransform object to the channel. 
	 * @author pkulikov
	 * 
	 */	
	export  class SoundChannel extends EventDispatcher
	{
		private _transform:SoundTransform;
		private _offset:number;
		private _startedAt:number;
		private _source:AudioBufferSourceNode;
		private _gainNode:GainNode;
		
		/**
		 * Constructor 
		 * 
		 */		
		constructor()
		{
			/**/ this._transform === void 0 && (this._transform = null);
			/**/ this._offset === void 0 && (this._offset = 0);
			/**/ this._startedAt === void 0 && (this._startedAt = 0);
			/**/ this._source === void 0 && (this._source = null);
			/**/ this._gainNode === void 0 && (this._gainNode = null);
			super(); 
			this._transform = new SoundTransform;
			SoundMixer.__registerSoundChannel (this);
		}
		
		/**
		 * When the sound is playing, the position property indicates in milliseconds the current point that is being played in the sound file. 
		 * @return 
		 * 
		 */		
		public get position():number
		{
			var ctx = Sound.__getCtx();
			if (!ctx) {
				
				return 0;
				
			}
			
			if (this._startedAt)
			{
				return ((((ctx.currentTime - this._startedAt) + this._offset) * 1000) >> 0);
			}
			
			return 0;
		}
		
		/**
		 * The SoundTransform object assigned to the sound channel. 
		 * @return 
		 * 
		 */		
		public get soundTransform():SoundTransform { return this._transform; }
		public set soundTransform(v:SoundTransform)
		{
			/**/ v = strict(v, SoundTransform);
			var ctx = Sound.__getCtx();
			if (!ctx) {
				
				return;
				
			}
			
			if (!v) {
				
				throw new Error('Parameter soundChannel must be non-null.', 2007);
				
			}
			
			this._transform.pan = v.pan;
			this._transform.volume = v.volume;
			
			if (this._gainNode) {
				
				var mixerVolume = SoundMixer.__muted ? 0.0 : SoundMixer.__soundTransform.volume;
				var mixedVolume = this._transform.volume * mixerVolume;
				var jsVolume = mixedVolume * 2 - 1;
				if ('setValueAtTime' in this._gainNode.gain) {
					
					this._gainNode.gain.setValueAtTime(jsVolume, ctx.currentTime);
					
				} else {
					
					this._gainNode.gain.value = jsVolume;
					
				}
				
			}
			
			//if (_panNode) {
			//
			//	var mixedPanning = SoundMixer.__soundTransform.pan + _transform.pan;
			//	https://developer.mozilla.org/ru/docs/Web/API/StereoPannerNode
			//
			//}
		}
		
		/**
		 * Stops the sound playing in the channel. 
		 * 
		 */		
		public stop():void
		{
			SoundMixer.__unregisterSoundChannel (this);
			
			if (this._source) {
				
				this._source.onended = null;
				this._source.disconnect();
				this._source.stop(0);
				this._source = null;
				this._startedAt = 0;
				
			}
		}
		
		/**
		 * The current amplitude (volume) of the left channel, from 0 (silent) to 1 (full amplitude). 
		 * @return 
		 * 
		 */		
		public get leftPeak():number { return 0; }
		
		/**
		 * The current amplitude (volume) of the right channel, from 0 (silent) to 1 (full amplitude). 
		 * @return 
		 * 
		 */		
		public get rightPeak():number { return 0; }
		
		/**
		 * Initialize
		 */		
		/*[internal]*/ protected __init (source:AudioBufferSourceNode, transform:SoundTransform, offset:number):void
		{
			// source = strict(source, AudioBufferSourceNode); transform = strict(transform, SoundTransform); offset = (+(offset));
			var ctx = Sound.__getCtx();
			if (!ctx) {
				
				return;
				
			}
			
			this._offset = offset;
			this._source = source;
			this._source.onended = this.__onEnded.__bind(this);
			
			this._gainNode =strict( ctx.createGain(), GainNode);
			this._source.connect(this._gainNode);
			this._gainNode.connect(ctx.destination);
			
			this._startedAt =(+( ctx.currentTime));
			
			this.soundTransform = transform || this.soundTransform;
		}
		
		/*[internal]*/ protected __onEnded ():void
		{
			this.dispatchEvent(new Event(Event.SOUND_COMPLETE));
		}
	}

}