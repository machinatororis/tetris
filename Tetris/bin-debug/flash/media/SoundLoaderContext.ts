/// <reference path="../../base.d.ts" />

namespace flash.media
{
	
	/**
	 * The SoundLoaderContext class provides security checks for files that load sound. 
	 * SoundLoaderContext objects are passed as an argument to the constructor and the load() method of the Sound class.
	 * When you use this class, consider the following security model:
	 * 
	 * Loading and playing a sound is not allowed if the calling file is in a network sandbox and the sound file to be loaded is local.
	 * By default, loading and playing a sound is not allowed if the calling is local and tries to load and play a remote sound. 
	 * A user must grant explicit permission to allow this.
	 * Certain operations dealing with sound are restricted. 
	 * The data in a loaded sound cannot be accessed by a file in a different domain unless you implement a URL policy file. 
	 * Sound-related APIs that fall under this restriction are the Sound.id3 property and the SoundMixer.computeSpectrum(), 
	 * SoundMixer.bufferTime, and SoundTransform() methods.
	 * However, in Adobe AIR, content in the application security sandbox (content installed with the AIR application) 
	 * are not restricted by these security limitations.
	 * 
	 * For more information related to security, see the Flash Player Developer Center Topic: Security. 
	 * @author pkulikov
	 * 
	 */	
	export  class SoundLoaderContext
	{
		/**
		 * The number of milliseconds to preload a streaming sound into a buffer before the sound starts to stream. 
		 */		
		public bufferTime:number = NaN;
		
		/**
		 * Specifies whether the application should try to download a URL policy file from the loaded sound's server before 
		 * beginning to load the sound. 
		 */		
		public checkPolicyFile:boolean = false;
		
		/**
		 * Creates a new sound loader context object. 
		 * @param bufferTime
		 * @param checkPolicyFile
		 * 
		 */		
		constructor(bufferTime:number = 1000, checkPolicyFile:boolean = false)
		{
			/**/ bufferTime = (+(bufferTime)); checkPolicyFile = Boolean(checkPolicyFile);
			this.checkPolicyFile = checkPolicyFile;
			this.bufferTime = bufferTime;
		}
	}

}