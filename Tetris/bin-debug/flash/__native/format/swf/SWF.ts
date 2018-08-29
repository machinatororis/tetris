/// <reference path="../../../../base.d.ts" />
/// <reference path="../../../utils/setTimeout.ts" />
/// <reference path="../../../utils/ByteArray.ts" />
/// <reference path="../../../events/ErrorEvent.ts" />
/// <reference path="../../../display/BitmapData.ts" />
/// <reference path="../../utils/StringUtils.ts" />
/// <reference path="tags/ITag.ts" />
/// <reference path="exporters/AS3BitmapDataExporter.ts" />
/// <reference path="events/SWFProgressEvent.ts" />
/// <reference path="events/SWFErrorEvent.ts" />
/// <reference path="data/SWFRectangle.ts" />
﻿
namespace flash.__native.format.swf
{
	export import SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
	export import SWFErrorEvent = flash.__native.format.swf.events.SWFErrorEvent;
	export import SWFProgressEvent = flash.__native.format.swf.events.SWFProgressEvent;
	export import AS3BitmapDataExporter = flash.__native.format.swf.exporters.AS3BitmapDataExporter;
	export import ITag = flash.__native.format.swf.tags.ITag;
	export import StringUtils = flash.__native.utils.StringUtils;
	export import BitmapData = flash.display.BitmapData;
	export import ErrorEvent = flash.events.ErrorEvent;
	export import ByteArray = flash.utils.ByteArray;
	export import setTimeout = flash.utils.setTimeout;
	

	export  class SWF extends SWFTimelineContainer
	{
		public static COMPRESSION_METHOD_ZLIB : string = "zlib";
		public static COMPRESSION_METHOD_LZMA : string = "lzma";
		
		public static TOSTRING_FLAG_TIMELINE_STRUCTURE : number = 0x01;  
		public static TOSTRING_FLAG_AVM1_BYTECODE : number = 0x02;
		
		public static FILE_LENGTH_POS : number = 4;
		public static COMPRESSION_START_POS : number = 8;
		
		public sourceLength : number;
		public signature : string;
		public version : number;
		public fileLength : number;
		public fileLengthCompressed : number;
		public frameSize : SWFRectangle;
		public frameRate : number;
		public frameCount : number;
		
		public compressed : boolean;
		public compressionMethod : string;
		
		/**
		 * Constructor 
		 * @param ba
		 * 
		 */		
		constructor (ba : ByteArray = null)
		{
			/**/ ba = strict(ba, ByteArray);
			/**/ this.sourceLength === void 0 && (this.sourceLength = 0);
			/**/ this.signature === void 0 && (this.signature = null);
			/**/ this.version === void 0 && (this.version = 0);
			/**/ this.fileLength === void 0 && (this.fileLength = 0);
			/**/ this.fileLengthCompressed === void 0 && (this.fileLengthCompressed = 0);
			/**/ this.frameSize === void 0 && (this.frameSize = null);
			/**/ this.frameRate === void 0 && (this.frameRate = NaN);
			/**/ this.frameCount === void 0 && (this.frameCount = 0);
			/**/ this.compressed === void 0 && (this.compressed = false);
			/**/ this.compressionMethod === void 0 && (this.compressionMethod = null);
			super(); 
			this.bytes = new SWFData;
			
			if (!ba) {
				
				this.version = 40;
				this.fileLength = 0;
				this.fileLengthCompressed = 0;
				this.frameSize = new SWFRectangle;
				this.frameRate = 60;
				this.frameCount = 1;
				this.compressed = true;
				this.compressionMethod = SWF.COMPRESSION_METHOD_ZLIB;
				return;
				
			}
			
			this.loadBytes(ba);
		}
		
		public loadBytes (ba : ByteArray) : void
		{
			/**/ ba = strict(ba, ByteArray);
			this.bytes.root = this;
			this.bytes.hash = this.__getByteArrayHash(ba);
			this.sourceLength = ba.length;
			
			this.bytes.length = 0;
			ba.position = 0;
			ba.readBytes(this.bytes);
			this.parse(this.bytes);
		}
		
		public loadBytesAsync (ba : ByteArray) : void
		{
			/**/ ba = strict(ba, ByteArray);
			this.bytes.root = this;
			this.bytes.hash = this.__getByteArrayHash(ba);
			this.sourceLength = ba.length;
			
			this.bytes.length = 0;
			ba.position = 0;
			ba.readBytes(this.bytes);
			this.parseAsync(this.bytes);
		}
		
		public parse(data:SWFData):void
		{
			/**/ data = strict(data, SWFData);
			this.bytes = data;
			this.__parseHeader();
			this.parseTags(data, this.version);
		}
		
		public parseAsync(data:SWFData):void
		{
			/**/ data = strict(data, SWFData);
			this.bytes = data;
			this.__parseHeader();
			this.parseTagsAsync(data, this.version);
		}
		
		public publish(ba:ByteArray):void
		{
			/**/ ba = strict(ba, ByteArray);
			var data:SWFData = new SWFData;
			this.__publishHeader(data);
			this.publishTags(data, this.version);
			this.__publishFinalize(data);
			ba.writeBytes(data);
		}
		
		public publishAsync(ba:ByteArray):void
		{
			/**/ ba = strict(ba, ByteArray);
			var data:SWFData = new SWFData;
			this.__publishHeader(data);
			this.publishTagsAsync(data, this.version);
			this.addEventListener(SWFProgressEvent.COMPLETE, function(event:SWFProgressEvent):void {
				
				this.removeEventListener(SWFProgressEvent.COMPLETE, arguments.callee);
				this.__publishFinalize(data);
				ba.length = 0;
				ba.writeBytes(data);
				
			}.__bind(this), false, int.MAX_VALUE);
		}
		
		public decodeImageDataAsync ():void
		{
			var position : number = 0;
			var length : number =  ((this._tagsImageData.length) >> 0);
			
			setTimeout(decode.__bind(this), 0);
			
			function decode ():void {
				if (report.__bind(this)()) {
					
					return;
					
				}
				
				for (var i = 0; i < length; ++i ) {
					
					(function (tag:ITag):void {
						AS3BitmapDataExporter.exportBitmapData(tag, function (data : BitmapData):void {
							
							this.dispatchEvent(new SWFProgressEvent(SWFProgressEvent.PROGRESS, ++position, length));
							report.__bind(this)();
							
						}.__bind(this), function (event : ErrorEvent):void {
							
							this.dispatchEvent(new SWFErrorEvent(SWFErrorEvent.ERROR, "Can't decompress image (tagId = " + tag.characterId + ")."));
							
						}.__bind(this));
					}).__bind(this)(this._tagsImageData[i]);
					
				}
			}
			
			function report ():boolean {
				if (position == length) {
					
					this.dispatchEvent(new SWFProgressEvent(SWFProgressEvent.COMPLETE, position, length));
					return true;
					
				}
				
				return false;
			}
		}
		
		/*[internal]*/ protected __getByteArrayHash (ba:ByteArray):string
		{
			// ba = strict(ba, ByteArray);
			var raw = '' + ba.length;
			
			for (var i = 0, len = Math.min(256, ba.length); i < len; ++i) {
				
				raw += ba.get(i);
				
			}
			
			for (var min = Math.max(0, ba.length - 256), i = ba.length-1; i > min; --i) {
				
				raw += ba.get(i);
				
			}
			
			return '__' + raw.md5();
		}
		
		/*[internal]*/ protected __parseHeader():void
		{
			this.signature = '';
			this.compressed = false;
			this.compressionMethod = SWF.COMPRESSION_METHOD_ZLIB;
			this.bytes.position = 0;
			
			var signatureByte:number = this.bytes.readUI8();
			if (signatureByte == 0x43) {
				
				this.compressed = true;
				
			} else if (signatureByte == 0x5A) {
				
				this.compressed = true;
				this.compressionMethod = SWF.COMPRESSION_METHOD_LZMA;
				
			} else if (signatureByte != 0x46) {
				
				throw(new Error("Not a SWF. First signature byte is 0x" + signatureByte.toString(16) + " (expected: 0x43 or 0x5A or 0x46)"));
				
			}
			
			this.signature += String.fromCharCode(signatureByte);
			signatureByte = this.bytes.readUI8();
			if (signatureByte != 0x57) {
				
				throw(new Error("Not a SWF. Second signature byte is 0x" + signatureByte.toString(16) + " (expected: 0x57)"));
				
			}
			
			this.signature += String.fromCharCode(signatureByte);
			signatureByte = this.bytes.readUI8();
			if (signatureByte != 0x53) {
				
				throw(new Error("Not a SWF. Third signature byte is 0x" + signatureByte.toString(16) + " (expected: 0x53)"));
				
			}
			
			this.signature += String.fromCharCode(signatureByte);
			this.version =(( this.bytes.readUI8()) >> 0);
			this.fileLength = this.bytes.readUI32();
			this.fileLengthCompressed = this.bytes.length;
			if (this.compressed) {
				
				// The following data (up to end of file) is compressed, if header has CWS or ZWS signature
				this.bytes.swfUncompress(this.compressionMethod, this.fileLength);
				
			}
			
			this.frameSize = this.bytes.readRECT();
			this.frameRate = this.bytes.readFIXED8();
			this.frameCount = this.bytes.readUI16();
		}
		
		/*[internal]*/ protected __publishHeader(data:SWFData):void 
		{
			// data = strict(data, SWFData);
			var firstHeaderByte:number = 0x46;
			if (this.compressed) {
				
				if (this.compressionMethod == SWF.COMPRESSION_METHOD_ZLIB) {
					
					firstHeaderByte = 0x43;
					
				} else if (this.compressionMethod == SWF.COMPRESSION_METHOD_LZMA) {
					
					firstHeaderByte = 0x5A;
					
				}
				
			}
			
			data.writeUI8(firstHeaderByte);
			data.writeUI8(0x57);
			data.writeUI8(0x53);
			data.writeUI8(this.version);
			data.writeUI32(0);
			data.writeRECT(this.frameSize);
			data.writeFIXED8(this.frameRate);
			data.writeUI16(this.frameCount);
		}

		/*[internal]*/ protected __publishFinalize(data:SWFData):void
		{
			// data = strict(data, SWFData);
			this.fileLength = this.fileLengthCompressed = data.length;
			if (this.compressed) {
				
				this.compressionMethod = SWF.COMPRESSION_METHOD_ZLIB; // Force ZLIB compression. LZMA doesn't seem to work when publishing.
				data.position = SWF.COMPRESSION_START_POS;
				data.swfCompress(this.compressionMethod);
				this.fileLengthCompressed = data.length;
				
			}
			
			var endPos:number = data.position;
			data.position = SWF.FILE_LENGTH_POS;
			data.writeUI32(this.fileLength);
			data.position = 0;
		}

		/*override*/ public toString(indent:number = 0, flags:number = 0):string
		{
			/**/ indent = ((indent) >>> 0); flags = ((flags) >>> 0);
			var indent0:string = StringUtils.repeat(indent);
			var indent2:string = StringUtils.repeat(indent + 2);
			var indent4:string = StringUtils.repeat(indent + 4);
			var s:string = indent0 + "[SWF]\n" +
				indent2 + "Header:\n" +
				indent4 + "Version: " + this.version + "\n" +
				indent4 + "Compression: ";
			
			if (this.compressed) {
				
				if (this.compressionMethod == SWF.COMPRESSION_METHOD_ZLIB) {
					
					s += "ZLIB";
					
				} else if (this.compressionMethod == SWF.COMPRESSION_METHOD_LZMA) {
					
					s += "LZMA";
					
				} else {
					
					s += "Unknown";
					
				}
				
			} else {
				
				s += "None";
				
			}
			
			return s + "\n" + indent4 + "FileLength: " + this.fileLength + "\n" +
				indent4 + "FileLengthCompressed: " + this.fileLengthCompressed + "\n" +
				indent4 + "FrameSize: " + this.frameSize.toStringSize() + "\n" +
				indent4 + "FrameRate: " + this.frameRate + "\n" +
				indent4 + "FrameCount: " + this.frameCount +
				super.toString(indent);
		}
	}

}