/// <reference path="../../../../../../base.d.ts" />
/// <reference path="../../../../../utils/ByteArray.ts" />
﻿
namespace flash.__native.format.swf.data.etc
{
	
	export import ByteArray = flash.utils.ByteArray;
	
	
	export  class MPEGFrame 
	{
		public static MPEG_VERSION_1_0:number = 0;
		public static MPEG_VERSION_2_0:number = 1;
		public static MPEG_VERSION_2_5:number = 2;
		
		public static MPEG_LAYER_I:number = 0;
		public static MPEG_LAYER_II:number = 1;
		public static MPEG_LAYER_III:number = 2;
		
		public static CHANNEL_MODE_STEREO:number = 0;
		public static CHANNEL_MODE_JOINT_STEREO:number = 1;
		public static CHANNEL_MODE_DUAL:number = 2;
		public static CHANNEL_MODE_MONO:number = 3;
		
		protected static mpegBitrates:any[] = [
			[ [0, 32, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1],
			  [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1],
			  [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1] ],
			[ [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, -1],
			  [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1],
			  [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1] ]
		];
		protected static mpegSamplingRates:any[] = [
			[44100, 48000, 32000],
			[22050, 24000, 16000],
			[11025, 12000, 8000]
		];
		
		protected _version:number = 0;
		protected _layer:number = 0;
		protected _bitrate:number = 0;
		protected _samplingRate:number = 0;
		protected _padding:boolean = false;
		protected _channelMode:number = 0;
		protected _channelModeExt:number = 0;
		protected _copyright:boolean = false;
		protected _original:boolean = false;
		protected _emphasis:number = 0;
		
		protected _header:ByteArray = null;
		protected _data:ByteArray = null;
		protected _crc:ByteArray = null;
		
		protected _hasCRC:boolean = false;

		protected _samples:number = 1152;
		
		constructor() {
			this.init();
		}
		
		public get version():number { return this._version; }
		public get layer():number { return this._layer; }
		public get bitrate():number { return this._bitrate; }
		public get samplingrate():number { return this._samplingRate; }
		public get padding():boolean { return this._padding; }
		public get channelMode():number { return this._channelMode; }
		public get channelModeExt():number { return this._channelModeExt; }
		public get copyright():boolean { return this._copyright; }
		public get original():boolean { return this._original; }
		public get emphasis():number { return this._emphasis; }

		public get hasCRC():boolean { return this._hasCRC; }
		public get crc():number { this._crc.position = 0; return this._crc.readUnsignedShort(); }

		public get samples():number { return this._samples; }

		public get data():ByteArray { return this._data; }
		public set data(value:ByteArray) { /**/ value = strict(value, ByteArray); this._data = value; }

		public get size():number {
			var ret:number = 0;
			if (this.layer == MPEGFrame.MPEG_LAYER_I) {
				ret =(( Math.floor((12000.0 * this.bitrate) / this.samplingrate)) >>> 0);
				if (this.padding) {
					ret++;
				}
				// one slot is 4 bytes long
				ret <<= 2;
			} else {
				ret =(( Math.floor(((this.version == MPEGFrame.MPEG_VERSION_1_0) ? 144000.0 : 72000.0) * this.bitrate / this.samplingrate)) >>> 0);
				if (this.padding) {
					ret++;
				}
			}
			// subtract header size and (if present) crc size
			return ret - 4 - (this.hasCRC ? 2 : 0);
		}

		public setHeaderByteAt(index:number, value:number):void {
			/**/ index = ((index) >>> 0); value = ((value) >>> 0);
			switch(index) {
				case 0:
					if (value != 0xff) {
						throw(new Error("Not a MPEG header."));
					}
					break;
				case 1:
					if ((value & 0xe0) != 0xe0) {
						throw(new Error("Not a MPEG header."));
					}
					// get the mpeg version (we only support mpeg 1.0 and 2.0)
					var mpegVersionBits:number =  (((value & 0x18) >> 3) >>> 0);
					switch(mpegVersionBits) {
						case 3: this._version = MPEGFrame.MPEG_VERSION_1_0; break;
						case 2: this._version = MPEGFrame.MPEG_VERSION_2_0; break;
						default: throw(new Error("Unsupported MPEG version."));
					}
					// get the mpeg layer version (we only support layer III)
					var mpegLayerBits:number =  (((value & 0x06) >> 1) >>> 0);
					switch(mpegLayerBits) {
						case 1: this._layer = MPEGFrame.MPEG_LAYER_III; break;
						default: throw(new Error("Unsupported MPEG layer."));
					}
					// is the frame secured by crc?
					this._hasCRC = !((value & 0x01) != 0);
					break;
				case 2:
					var bitrateIndex:number =  ((((value & 0xf0) >> 4)) >>> 0);
					// get the frame's bitrate
					if (bitrateIndex == 0 || bitrateIndex == 0x0f) {
						throw(new Error("Unsupported bitrate index."));
					}
					this._bitrate =(( MPEGFrame.mpegBitrates[this._version][this._layer][bitrateIndex]) >>> 0);
					// get the frame's samplingrate
					var samplingrateIndex:number =  ((((value & 0x0c) >> 2)) >>> 0);
					if (samplingrateIndex == 3) {
						throw(new Error("Unsupported samplingrate index."));
					}
					this._samplingRate =(( MPEGFrame.mpegSamplingRates[this._version][samplingrateIndex]) >>> 0);
					// is the frame padded?
					this._padding = ((value & 0x02) == 0x02);
					break;
				case 3:
					// get the frame's channel mode:
					// 0: stereo
					// 1: joint stereo
					// 2: dual channel
					// 3: mono
					this._channelMode =(( ((value & 0xc0) >> 6)) >>> 0);
					// get the frame's extended channel mode (only for joint stereo):
					this._channelModeExt =(( ((value & 0x30) >> 4)) >>> 0);
					// get the copyright flag
					this._copyright = ((value & 0x08) == 0x08);
					// get the original flag
					this._original = ((value & 0x04) == 0x04);
					// get the emphasis:
					// 0: none
					// 1: 50/15 ms
					// 2: reserved
					// 3: ccit j.17
					this._emphasis =(( (value & 0x02)) >>> 0);
					break;
				default:
					throw(new Error("Index out of bounds."));
			}
			// store the raw header byte for easy access
			this._header.set(index,  value);
		}
		
		public setCRCByteAt(index:number, value:number):void {
			/**/ index = ((index) >>> 0); value = ((value) >>> 0);
			if (index > 1) {
				throw(new Error("Index out of bounds."));
			}
			this._crc.set(index,  value);
		}
		
		protected init():void {
			this._header = new ByteArray();
			this._header.writeByte(0);
			this._header.writeByte(0);
			this._header.writeByte(0);
			this._header.writeByte(0);
			this._crc = new ByteArray();
			this._crc.writeByte(0);
			this._crc.writeByte(0);
		}
		
		public getFrame():ByteArray {
			var ba:ByteArray = new ByteArray();
			ba.writeBytes(this._header, 0, 4);
			if(this.hasCRC) {
				ba.writeBytes(this._crc, 0, 2);
			}
			ba.writeBytes(this._data);
			return ba;
		}
		
		public toString():string {
			var encoding:string = "MPEG ";
			switch(this.version) {
				case MPEGFrame.MPEG_VERSION_1_0: encoding += "1.0 "; break;
				case MPEGFrame.MPEG_VERSION_2_0: encoding += "2.0 "; break;
				case MPEGFrame.MPEG_VERSION_2_5: encoding += "2.5 "; break;
				default: encoding += "?.? "; break;
			}
			switch(this.layer) {
				case MPEGFrame.MPEG_LAYER_I: encoding += "Layer I"; break;
				case MPEGFrame.MPEG_LAYER_II: encoding += "Layer II"; break;
				case MPEGFrame.MPEG_LAYER_III: encoding += "Layer III"; break;
				default: encoding += "Layer ?"; break;
			}
			var channel:string = "unknown";
			switch(this.channelMode) {
				case 0: channel = "Stereo"; break;
				case 1: channel = "Joint stereo"; break;
				case 2: channel = "Dual channel"; break;
				case 3: channel = "Mono"; break;
			}
			return encoding + ", " + this.bitrate + " kbit/s, " + this.samplingrate + " Hz, " + channel + ", " + this.size + " bytes";
		}
	}

}