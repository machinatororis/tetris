/// <reference path="../../base.d.ts" />
/// <reference path="../utils/ByteArray.ts" />

namespace flash.media
{
	export import ByteArray = flash.utils.ByteArray;
	
	
	/**
	 * The SoundMixer class contains static properties and methods for global sound control in the application. 
	 * The SoundMixer class controls embedded and streaming sounds in the application, 
	 * as well as dynamically created sounds (that is, sounds generated in response to a Sound object dispatching a sampleData event). 
	 * @author pkulikov
	 * 
	 */	
	export  class SoundMixer
	{
		private static __muted:boolean = false;
		private static __soundChannels:any[] = [];
		private static __soundTransform:SoundTransform = asc.sti(SoundMixer,()=>{ SoundMixer.__soundTransform = new SoundTransform; });
		
		/**
		 * The number of seconds to preload an embedded streaming sound into a buffer before it starts to stream. 
		 * @return 
		 * 
		 */		
		public static get bufferTime():number { return 0; }
		public static set bufferTime(param1:number) { /**/ param1 = ((param1) >> 0); /**/ }
		
		/**
		 * The SoundTransform object that controls global sound properties. 
		 * @return 
		 * 
		 */		
		public static get soundTransform():SoundTransform { return SoundMixer.__soundTransform; }
		public static set soundTransform(value:SoundTransform)
		{
			/**/ value = strict(value, SoundTransform);
			SoundMixer.__soundTransform = value.clone();
			
			var __for0 = window.asc.of(SoundMixer.__soundChannels);
			for  (var channel of __for0) {
				
				channel.soundTransform = channel.soundTransform;
				
			}
		}
		
		/**
		 * Specifies the audio playback mode of all Sound objects. 
		 * @return 
		 * 
		 */		
		public static get audioPlaybackMode():string { return null; }
		public static set audioPlaybackMode(mode:string) { /**/ mode = as(mode, 'String'); /**/ }
		
		/**
		 * Toggles the speakerphone when the device is in voice mode. 
		 * @return 
		 * 
		 */		
		public static get useSpeakerphoneForVoice():boolean { return false; }
		public static set useSpeakerphoneForVoice(b:boolean) { /**/ b = Boolean(b); /**/ }
		
		/**
		 * Stops all sounds currently playing. 
		 * 
		 */		
		public static stopAll():void
		{
			while (SoundMixer.__soundChannels.length)
			{
				try {
					
					SoundMixer.__soundChannels[0].stop();
					
				} catch(e) {
					
				e = window.asc.e2e(e);
					
				}
			}
		}
		
		/**
		 * Takes a snapshot of the current sound wave and places it into the specified ByteArray object. 
		 * @param outputArray
		 * @param FFTMode
		 * @param stretchFactor
		 * 
		 */		
		public static computeSpectrum(outputArray:ByteArray, FFTMode:boolean=false, stretchFactor:number=0):void
		{
			
		/**/ outputArray = strict(outputArray, ByteArray); FFTMode = Boolean(FFTMode); stretchFactor = ((stretchFactor) >> 0);
			
		}
		
		/**
		 * Determines whether any sounds are not accessible due to security restrictions. 
		 * @return 
		 * 
		 */		
		public static areSoundsInaccessible():boolean
		{
			return false;
		}
		
		/*[internal]*/ private static __registerSoundChannel (soundChannel:SoundChannel):void
		{
			// soundChannel = strict(soundChannel, SoundChannel);
			var index = SoundMixer.__soundChannels.indexOf(soundChannel);
			
			if (index >= 0) {
				
				return;
				
			}
			
			SoundMixer.__soundChannels[SoundMixer.__soundChannels.length] = soundChannel;
			
		}
		
		
		/*[internal]*/ private static __unregisterSoundChannel (soundChannel:SoundChannel):void
		{
			// soundChannel = strict(soundChannel, SoundChannel);
			var index = SoundMixer.__soundChannels.indexOf(soundChannel);
			
			if (index == -1) {
				
				return;
				
			}
			
			SoundMixer.__soundChannels.splice(index, 1);
			
		}
		
		/*[internal]*/ private static __setMute (value:boolean):void
		{
			// value = Boolean(value);
			SoundMixer.__muted = value;
			SoundMixer.soundTransform = SoundMixer.soundTransform;
		}
	}
}