/// <reference path="../../../../../base.d.ts" />
/// <reference path="../data/consts/SoundType.ts" />
/// <reference path="../data/consts/SoundSize.ts" />
/// <reference path="../data/consts/SoundRate.ts" />
/// <reference path="../data/consts/SoundCompression.ts" />
/// <reference path="../SWFData.ts" />
﻿
namespace flash.__native.format.swf.tags
{
	export import SWFData = flash.__native.format.swf.SWFData;
	export import SoundCompression = flash.__native.format.swf.data.consts.SoundCompression;
	export import SoundRate = flash.__native.format.swf.data.consts.SoundRate;
	export import SoundSize = flash.__native.format.swf.data.consts.SoundSize;
	export import SoundType = flash.__native.format.swf.data.consts.SoundType;
	
	
	export  class TagSoundStreamHead implements ITag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		public static TYPE:number = 18;
		
		public playbackSoundRate:number = 0;
		public playbackSoundSize:number = 0;
		public playbackSoundType:number = 0;
		public streamSoundCompression:number = 0;
		public streamSoundRate:number = 0;
		public streamSoundSize:number = 0;
		public streamSoundType:number = 0;
		public streamSoundSampleCount:number = 0;
		public latencySeek:number = 0;
		
		constructor() {}
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			data.readUB(4);
			this.playbackSoundRate = data.readUB(2);
			this.playbackSoundSize = data.readUB(1);
			this.playbackSoundType = data.readUB(1);
			this.streamSoundCompression = data.readUB(4);
			this.streamSoundRate = data.readUB(2);
			this.streamSoundSize = data.readUB(1);
			this.streamSoundType = data.readUB(1);
			this.streamSoundSampleCount = data.readUI16();
			if (this.streamSoundCompression == SoundCompression.MP3) {
				this.latencySeek =(( data.readSI16()) >>> 0);
			}
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUB(4, 0);
			body.writeUB(2, this.playbackSoundRate);
			body.writeUB(1, this.playbackSoundSize);
			body.writeUB(1, this.playbackSoundType);
			body.writeUB(4, this.streamSoundCompression);
			body.writeUB(2, this.streamSoundRate);
			body.writeUB(1, this.streamSoundSize);
			body.writeUB(1, this.streamSoundType);
			body.writeUI16(this.streamSoundSampleCount);
			if (this.streamSoundCompression == SoundCompression.MP3) {
				body.writeSI16(this.latencySeek);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public get type():number { return TagSoundStreamHead.TYPE; }
		public get name():string { return "SoundStreamHead"; }
		public get version():number { return 1; }
		public get level():number { return 1; }

		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent);
			if(this.streamSoundSampleCount > 0) {
				str += "Format: " + SoundCompression.toString(this.streamSoundCompression) + ", " +
					"Rate: " + SoundRate.toString(this.streamSoundRate) + ", " +
					"Size: " + SoundSize.toString(this.streamSoundSize) + ", " +
					"Type: " + SoundType.toString(this.streamSoundType) + ", ";
			}
			str += "Samples: " + this.streamSoundSampleCount + ", ";
			str += "LatencySeek: " + this.latencySeek;
			return str;
		}
	}

}