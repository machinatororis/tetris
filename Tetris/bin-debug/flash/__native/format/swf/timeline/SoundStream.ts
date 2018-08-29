/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />

namespace flash.__native.format.swf.timeline
{
	export import ByteArray = flash.utils.ByteArray;
	

	export  class SoundStream
	{
		public startFrame:number = 0;
		public numFrames:number = 0;
		public numSamples:number = 0;

		public compression:number = 0;
		public rate:number = 0;
		public size:number = 0;
		public type:number = 0;
		
		protected _data:ByteArray = null;
		
		constructor()
		{
			this._data = new ByteArray();
		}
		
		public get data():ByteArray { return this._data; }
		
		public toString():string {
			return "[SoundStream] " +
				"StartFrame: " + this.startFrame + ", " +
				"Frames: " + this.numFrames + ", " +
				"Samples: " + this.numSamples + ", " +
				"Bytes: " + this.data.length;
		}
	}
}