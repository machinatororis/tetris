/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFSoundEnvelope
	{
		public pos44:number = 0;
		public leftLevel:number = 0;
		public rightLevel:number = 0;
		
		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			if (data != null) {
				this.parse(data);
			}
		}
		
		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			this.pos44 = data.readUI32();
			this.leftLevel = data.readUI16();
			this.rightLevel = data.readUI16();
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			data.writeUI32(this.pos44);
			data.writeUI16(this.leftLevel);
			data.writeUI16(this.rightLevel);
		}
		
		public clone():SWFSoundEnvelope {
			var soundEnvelope:SWFSoundEnvelope = new SWFSoundEnvelope();
			soundEnvelope.pos44 = this.pos44;
			soundEnvelope.leftLevel = this.leftLevel;
			soundEnvelope.rightLevel = this.rightLevel;
			return soundEnvelope;
		}
		
		public toString():string {
			return "[SWFSoundEnvelope]";
		}
	}

}