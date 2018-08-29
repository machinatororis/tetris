/// <reference path="../../base.d.ts" />

namespace flash.media
{
	
	/**
	 * The SoundTransform class contains properties for volume and panning. 
	 * @author pkulikov
	 * 
	 */	
	export  class SoundTransform
	{
		private _volume:number = NaN;
		private _pan:number = NaN;
		
		/**
		 * Creates a SoundTransform object. 
		 * @param vol
		 * @param panning
		 * 
		 */		
		constructor(vol:number = 1, panning:number = 0)
		{
			/**/ vol = (+(vol)); panning = (+(panning));
			this._volume = vol;
			this._pan = panning;
		}
		
		/**
		 * The volume, ranging from 0 (silent) to 1 (full volume). 
		 * @return 
		 * 
		 */		
		public get volume():number { return this._volume; }
		public set volume(vol:number) { /**/ vol = (+(vol)); this._volume = vol; }
		
		/**
		 * The left-to-right panning of the sound, ranging from -1 (full pan left) to 1 (full pan right). 
		 * @return 
		 * 
		 */		
		public get pan():number { return this._pan; }
		public set pan(panning:number) { /**/ panning = (+(panning)); this._pan = panning; }
		
		/**
		 * A value, from 0 (none) to 1 (all), specifying how much of the left input is played in the left speaker. 
		 * @return 
		 * 
		 */		
		public get leftToLeft():number { return 0; }
		public set leftToLeft(value:number) { /**/ value = (+(value)); /**/ }
		
		/**
		 * A value, from 0 (none) to 1 (all), specifying how much of the left input is played in the right speaker. 
		 * @return 
		 * 
		 */		
		public get leftToRight():number { return 0; }
		public set leftToRight(value:number) { /**/ value = (+(value)); /**/ }
		
		/**
		 * A value, from 0 (none) to 1 (all), specifying how much of the right input is played in the right speaker. 
		 * @return 
		 * 
		 */		
		public get rightToRight():number { return 0; }
		public set rightToRight(value:number) { /**/ value = (+(value)); /**/ }
		
		/**
		 * A value, from 0 (none) to 1 (all), specifying how much of the right input is played in the left speaker. 
		 * @return 
		 * 
		 */		
		public get rightToLeft():number { return 0; }
		public set rightToLeft(value:number) { /**/ value = (+(value)); /**/ }
		
		public clone ():SoundTransform
		{
			return new SoundTransform (this._volume, this._pan);
		}
	}
}