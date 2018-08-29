/// <reference path="../../../../../base.d.ts" />
/// <reference path="../../../../utils/ByteArray.ts" />
/// <reference path="../data/etc/MPEGFrame.ts" />
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
	export import MPEGFrame = flash.__native.format.swf.data.etc.MPEGFrame;
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class TagDefineSound implements IDefinitionTag
	{
		implements_flash___native_format_swf_tags_ITag = null;
		implements_flash___native_format_swf_tags_IDefinitionTag = null;
		public static TYPE:number = 14;
		
		public soundFormat:number = 0;
		public soundRate:number = 0;
		public soundSize:number = 0;
		public soundType:number = 0;
		public soundSampleCount:number = 0;

		protected _characterId:number = 0;
		
		protected _soundData:ByteArray = null;
		
		constructor() {
			this._soundData = new ByteArray();
		}
		
		public static create(id:number, format:number = SoundCompression.MP3, rate:number = SoundRate.KHZ_44, size:number = SoundSize.BIT_16, type:number = SoundType.STEREO, sampleCount:number = 0, aSoundData:ByteArray = null):TagDefineSound {
			/**/ id = ((id) >>> 0); format = ((format) >>> 0); rate = ((rate) >>> 0); size = ((size) >>> 0); type = ((type) >>> 0); sampleCount = ((sampleCount) >>> 0); aSoundData = strict(aSoundData, ByteArray);
			var defineSound:TagDefineSound = new TagDefineSound();
			defineSound._characterId = id;
			defineSound.soundFormat = format;
			defineSound.soundRate = rate;
			defineSound.soundSize = size;
			defineSound.soundType = type;
			defineSound.soundSampleCount = sampleCount;
			if (aSoundData != null && aSoundData.length > 0) {
				defineSound.soundData.writeBytes(aSoundData);
			}
			return defineSound;
		}
		
		public static createWithMP3(id:number, mp3:ByteArray):TagDefineSound {
			/**/ id = ((id) >>> 0); mp3 = strict(mp3, ByteArray);
			if (mp3 != null && mp3.length > 0) {
				var defineSound:TagDefineSound = new TagDefineSound();
				defineSound._characterId = id;
				defineSound.processMP3(mp3);
				return defineSound;
			} else {
				throw(new Error("No MP3 data."));
			}
		}
		
		public get characterId():number { return this._characterId; }
		public set characterId(value:number) { /**/ value = ((value) >>> 0); this._characterId = value; }
		
		public get soundData():ByteArray { return this._soundData; }
		
		public parse(data:SWFData, length:number, version:number, async:boolean = false):void {
			/**/ data = strict(data, SWFData); length = ((length) >>> 0); version = ((version) >>> 0); async = Boolean(async);
			this._characterId = data.readUI16();
			this.soundFormat = data.readUB(4);
			this.soundRate = data.readUB(2);
			this.soundSize = data.readUB(1);
			this.soundType = data.readUB(1);
			this.soundSampleCount = data.readUI32();
			data.readBytes(this._soundData, 0, length - 7);
		}
		
		public publish(data:SWFData, version:number):void {
			/**/ data = strict(data, SWFData); version = ((version) >>> 0);
			var body:SWFData = new SWFData();
			body.writeUI16(this.characterId);
			body.writeUB(4, this.soundFormat);
			body.writeUB(2, this.soundRate);
			body.writeUB(1, this.soundSize);
			body.writeUB(1, this.soundType);
			body.writeUI32(this.soundSampleCount);
			if (this._soundData.length > 0) {
				body.writeBytes(this._soundData);
			}
			data.writeTagHeader(this.type, body.length);
			data.writeBytes(body);
		}
		
		public clone():IDefinitionTag {
			var tag:TagDefineSound = new TagDefineSound();
			tag.characterId = this.characterId;
			tag.soundFormat = this.soundFormat;
			tag.soundRate = this.soundRate;
			tag.soundSize = this.soundSize;
			tag.soundType = this.soundType;
			tag.soundSampleCount = this.soundSampleCount;
			if (this._soundData.length > 0) {
				tag.soundData.writeBytes(this._soundData);
			}
			return tag;
		}
		
		public get type():number { return TagDefineSound.TYPE; }
		public get name():string { return "DefineSound"; }
		public get version():number { return 1; }
		public get level():number { return 1; }
	
		public toString(indent:number = 0, flags:number = 0):string {
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var str:string = Tag.toStringCommon(this.type, this.name, indent) +
				"SoundID: " + this.characterId + ", " +
				"Format: " + SoundCompression.toString(this.soundFormat) + ", " +
				"Rate: " + SoundRate.toString(this.soundRate) + ", " +
				"Size: " + SoundSize.toString(this.soundSize) + ", " +
				"Type: " + SoundType.toString(this.soundType) + ", " +
				"Samples: " + this.soundSampleCount;
			return str;
		}
		
		/*internal*/ processMP3(mp3:ByteArray):void {
			/**/ mp3 = strict(mp3, ByteArray);
			var i:number = 0;
			var beginIdx:number = 0;
			var endIdx:number = mp3.length;
			var samples:number = 0;
			var firstFrame:boolean = true;
			var samplingrate:number = 0;
			var channelmode:number = 0;
			var frame:MPEGFrame = new MPEGFrame();
			var state:string = "id3v2";
			while (i < mp3.length) {
				switch(state) {
					case "id3v2":
						if (mp3.get(i) == 0x49 && mp3.get(i + 1) == 0x44 && mp3.get(i + 2) == 0x33) {
							i += 10 + ((mp3.get(i + 6) << 21)
								| (mp3.get(i + 7) << 14)
								| (mp3.get(i + 8) << 7)
								| mp3.get(i + 9));
						}
						beginIdx = i;
						state = "sync";
						break;
					case "sync":
						if (mp3.get(i) == 0xff && (mp3.get(i + 1) & 0xe0) == 0xe0) {
							state = "frame";
						} else if (mp3.get(i) == 0x54 && mp3.get(i + 1) == 0x41 && mp3.get(i + 2) == 0x47) {
							endIdx = i;
							i = mp3.length;
						} else {
							i++;
						}
						break;
					case "frame":
						frame.setHeaderByteAt(0, mp3.get(i++));
						frame.setHeaderByteAt(1, mp3.get(i++));
						frame.setHeaderByteAt(2, mp3.get(i++));
						frame.setHeaderByteAt(3, mp3.get(i++));
						if (frame.hasCRC) {
							frame.setCRCByteAt(0, mp3.get(i++));
							frame.setCRCByteAt(1, mp3.get(i++));
						}
						if (firstFrame) {
							firstFrame = false;
							samplingrate = frame.samplingrate;
							channelmode = frame.channelMode;
						}
						samples += frame.samples;
						i += frame.size;
						state = "sync";
						break;
				}
			}
			this.soundSampleCount = samples;
			this.soundFormat = SoundCompression.MP3;
			this.soundSize = SoundSize.BIT_16;
			this.soundType = (channelmode == MPEGFrame.CHANNEL_MODE_MONO) ? SoundType.MONO : SoundType.STEREO;
			switch(samplingrate) {
				case 44100: this.soundRate = SoundRate.KHZ_44; break;
				case 22050: this.soundRate = SoundRate.KHZ_22; break;
				case 11025: this.soundRate = SoundRate.KHZ_11; break;
				default: throw(new Error("Unsupported sampling rate: " + samplingrate + " Hz"));
			}
			// Clear ByteArray
			this.soundData.length = 0;
			// Write SeekSamples (here always 0)
			this.soundData.writeShort(0);
			// Write raw MP3 (without ID3 metadata)
			this.soundData.writeBytes(mp3, beginIdx, endIdx - beginIdx);
		}
	}

}