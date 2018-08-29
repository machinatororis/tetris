/// <reference path="../../../../../base.d.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.data
{
	export import SWFData = flash.__native.format.swf.SWFData;
	
	
	export  class SWFSoundInfo
	{
		public syncStop:boolean = false;
		public syncNoMultiple:boolean = false;
		public hasEnvelope:boolean = false;
		public hasLoops:boolean = false;
		public hasOutPoint:boolean = false;
		public hasInPoint:boolean = false;
		
		public outPoint:number = 0;
		public inPoint:number = 0;
		public loopCount:number = 0;
		
		protected _envelopeRecords:SWFSoundEnvelope[] = undefined;
		
		constructor(data:SWFData = null) {
			/**/ data = strict(data, SWFData);
			this._envelopeRecords = new Array<SWFSoundEnvelope>();
			if (data != null) {
				this.parse(data);
			}
		}
		
		public get envelopeRecords():SWFSoundEnvelope[] { return this._envelopeRecords; }
		
		public parse(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var flags:number = data.readUI8();
			this.syncStop = ((flags & 0x20) != 0);
			this.syncNoMultiple = ((flags & 0x10) != 0);
			this.hasEnvelope = ((flags & 0x08) != 0);
			this.hasLoops = ((flags & 0x04) != 0);
			this.hasOutPoint = ((flags & 0x02) != 0);
			this.hasInPoint = ((flags & 0x01) != 0);
			if (this.hasInPoint) {
				this.inPoint = data.readUI32();
			}
			if (this.hasOutPoint) {
				this.outPoint = data.readUI32();
			}
			if (this.hasLoops) {
				this.loopCount = data.readUI16();
			}
			if (this.hasEnvelope) {
				var envPoints:number = data.readUI8();
				for (var i:number = 0; i < envPoints; i++) {
					this._envelopeRecords.push(data.readSOUNDENVELOPE());
				}
			}
		}
		
		public publish(data:SWFData):void {
			/**/ data = strict(data, SWFData);
			var flags:number = 0;
			if(this.syncStop) { flags |= 0x20; }
			if(this.syncNoMultiple) { flags |= 0x10; }
			if(this.hasEnvelope) { flags |= 0x08; }
			if(this.hasLoops) { flags |= 0x04; }
			if(this.hasOutPoint) { flags |= 0x02; }
			if(this.hasInPoint) { flags |= 0x01; }
			data.writeUI8(flags)
			if (this.hasInPoint) {
				data.writeUI32(this.inPoint);
			}
			if (this.hasOutPoint) {
				data.writeUI32(this.outPoint);
			}
			if (this.hasLoops) {
				data.writeUI16(this.loopCount);
			}
			if (this.hasEnvelope) {
				var envPoints:number =  ((this._envelopeRecords.length) >>> 0);
				data.writeUI8(envPoints);
				for (var i:number = 0; i < envPoints; i++) {
					data.writeSOUNDENVELOPE(this._envelopeRecords[i]);
				}
			}
		}
		
		public clone():SWFSoundInfo {
			var soundInfo:SWFSoundInfo = new SWFSoundInfo();
			soundInfo.syncStop = this.syncStop;
			soundInfo.syncNoMultiple = this.syncNoMultiple;
			soundInfo.hasEnvelope = this.hasEnvelope;
			soundInfo.hasLoops = this.hasLoops;
			soundInfo.hasOutPoint = this.hasOutPoint;
			soundInfo.hasInPoint = this.hasInPoint;
			soundInfo.outPoint = this.outPoint;
			soundInfo.inPoint = this.inPoint;
			soundInfo.loopCount = this.loopCount;
			for (var i:number = 0; i < this._envelopeRecords.length; i++) {
				soundInfo.envelopeRecords.push(this._envelopeRecords[i].clone());
			}
			return soundInfo;
		}
		
		public toString():string {
			return "[SWFSoundInfo]";
		}
	}

}