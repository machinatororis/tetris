var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                swf.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                swf.SWFErrorEvent = flash.__native.format.swf.events.SWFErrorEvent;
                swf.SWFProgressEvent = flash.__native.format.swf.events.SWFProgressEvent;
                swf.AS3BitmapDataExporter = flash.__native.format.swf.exporters.AS3BitmapDataExporter;
                swf.ITag = flash.__native.format.swf.tags.ITag;
                swf.StringUtils = flash.__native.utils.StringUtils;
                swf.BitmapData = flash.display.BitmapData;
                swf.ErrorEvent = flash.events.ErrorEvent;
                swf.ByteArray = flash.utils.ByteArray;
                swf.setTimeout = flash.utils.setTimeout;
                var SWF = (function (_super) {
                    __extends(SWF, _super);
                    function SWF(ba) {
                        if (ba === void 0) { ba = null; }
                        var _this = this;
                        ba = strict(ba, swf.ByteArray);
                        _this.sourceLength === void 0 && (_this.sourceLength = 0);
                        _this.signature === void 0 && (_this.signature = null);
                        _this.version === void 0 && (_this.version = 0);
                        _this.fileLength === void 0 && (_this.fileLength = 0);
                        _this.fileLengthCompressed === void 0 && (_this.fileLengthCompressed = 0);
                        _this.frameSize === void 0 && (_this.frameSize = null);
                        _this.frameRate === void 0 && (_this.frameRate = NaN);
                        _this.frameCount === void 0 && (_this.frameCount = 0);
                        _this.compressed === void 0 && (_this.compressed = false);
                        _this.compressionMethod === void 0 && (_this.compressionMethod = null);
                        _this = _super.call(this) || this;
                        _this.bytes = new swf.SWFData;
                        if (!ba) {
                            _this.version = 40;
                            _this.fileLength = 0;
                            _this.fileLengthCompressed = 0;
                            _this.frameSize = new swf.SWFRectangle;
                            _this.frameRate = 60;
                            _this.frameCount = 1;
                            _this.compressed = true;
                            _this.compressionMethod = SWF.COMPRESSION_METHOD_ZLIB;
                            return;
                        }
                        _this.loadBytes(ba);
                        return _this;
                    }
                    SWF.prototype.loadBytes = function (ba) {
                        ba = strict(ba, swf.ByteArray);
                        this.bytes.root = this;
                        this.bytes.hash = this.__getByteArrayHash(ba);
                        this.sourceLength = ba.length;
                        this.bytes.length = 0;
                        ba.position = 0;
                        ba.readBytes(this.bytes);
                        this.parse(this.bytes);
                    };
                    SWF.prototype.loadBytesAsync = function (ba) {
                        ba = strict(ba, swf.ByteArray);
                        this.bytes.root = this;
                        this.bytes.hash = this.__getByteArrayHash(ba);
                        this.sourceLength = ba.length;
                        this.bytes.length = 0;
                        ba.position = 0;
                        ba.readBytes(this.bytes);
                        this.parseAsync(this.bytes);
                    };
                    SWF.prototype.parse = function (data) {
                        data = strict(data, swf.SWFData);
                        this.bytes = data;
                        this.__parseHeader();
                        this.parseTags(data, this.version);
                    };
                    SWF.prototype.parseAsync = function (data) {
                        data = strict(data, swf.SWFData);
                        this.bytes = data;
                        this.__parseHeader();
                        this.parseTagsAsync(data, this.version);
                    };
                    SWF.prototype.publish = function (ba) {
                        ba = strict(ba, swf.ByteArray);
                        var data = new swf.SWFData;
                        this.__publishHeader(data);
                        this.publishTags(data, this.version);
                        this.__publishFinalize(data);
                        ba.writeBytes(data);
                    };
                    SWF.prototype.publishAsync = function (ba) {
                        ba = strict(ba, swf.ByteArray);
                        var data = new swf.SWFData;
                        this.__publishHeader(data);
                        this.publishTagsAsync(data, this.version);
                        this.addEventListener(swf.SWFProgressEvent.COMPLETE, function (event) {
                            this.removeEventListener(swf.SWFProgressEvent.COMPLETE, arguments.callee);
                            this.__publishFinalize(data);
                            ba.length = 0;
                            ba.writeBytes(data);
                        }.__bind(this), false, int.MAX_VALUE);
                    };
                    SWF.prototype.decodeImageDataAsync = function () {
                        var position = 0;
                        var length = ((this._tagsImageData.length) >> 0);
                        swf.setTimeout(decode.__bind(this), 0);
                        function decode() {
                            if (report.__bind(this)()) {
                                return;
                            }
                            for (var i = 0; i < length; ++i) {
                                (function (tag) {
                                    swf.AS3BitmapDataExporter.exportBitmapData(tag, function (data) {
                                        this.dispatchEvent(new swf.SWFProgressEvent(swf.SWFProgressEvent.PROGRESS, ++position, length));
                                        report.__bind(this)();
                                    }.__bind(this), function (event) {
                                        this.dispatchEvent(new swf.SWFErrorEvent(swf.SWFErrorEvent.ERROR, "Can't decompress image (tagId = " + tag.characterId + ")."));
                                    }.__bind(this));
                                }).__bind(this)(this._tagsImageData[i]);
                            }
                        }
                        function report() {
                            if (position == length) {
                                this.dispatchEvent(new swf.SWFProgressEvent(swf.SWFProgressEvent.COMPLETE, position, length));
                                return true;
                            }
                            return false;
                        }
                    };
                    SWF.prototype.__getByteArrayHash = function (ba) {
                        var raw = '' + ba.length;
                        for (var i = 0, len = Math.min(256, ba.length); i < len; ++i) {
                            raw += ba.get(i);
                        }
                        for (var min = Math.max(0, ba.length - 256), i = ba.length - 1; i > min; --i) {
                            raw += ba.get(i);
                        }
                        return '__' + raw.md5();
                    };
                    SWF.prototype.__parseHeader = function () {
                        this.signature = '';
                        this.compressed = false;
                        this.compressionMethod = SWF.COMPRESSION_METHOD_ZLIB;
                        this.bytes.position = 0;
                        var signatureByte = this.bytes.readUI8();
                        if (signatureByte == 0x43) {
                            this.compressed = true;
                        }
                        else if (signatureByte == 0x5A) {
                            this.compressed = true;
                            this.compressionMethod = SWF.COMPRESSION_METHOD_LZMA;
                        }
                        else if (signatureByte != 0x46) {
                            throw (new Error("Not a SWF. First signature byte is 0x" + signatureByte.toString(16) + " (expected: 0x43 or 0x5A or 0x46)"));
                        }
                        this.signature += String.fromCharCode(signatureByte);
                        signatureByte = this.bytes.readUI8();
                        if (signatureByte != 0x57) {
                            throw (new Error("Not a SWF. Second signature byte is 0x" + signatureByte.toString(16) + " (expected: 0x57)"));
                        }
                        this.signature += String.fromCharCode(signatureByte);
                        signatureByte = this.bytes.readUI8();
                        if (signatureByte != 0x53) {
                            throw (new Error("Not a SWF. Third signature byte is 0x" + signatureByte.toString(16) + " (expected: 0x53)"));
                        }
                        this.signature += String.fromCharCode(signatureByte);
                        this.version = ((this.bytes.readUI8()) >> 0);
                        this.fileLength = this.bytes.readUI32();
                        this.fileLengthCompressed = this.bytes.length;
                        if (this.compressed) {
                            this.bytes.swfUncompress(this.compressionMethod, this.fileLength);
                        }
                        this.frameSize = this.bytes.readRECT();
                        this.frameRate = this.bytes.readFIXED8();
                        this.frameCount = this.bytes.readUI16();
                    };
                    SWF.prototype.__publishHeader = function (data) {
                        var firstHeaderByte = 0x46;
                        if (this.compressed) {
                            if (this.compressionMethod == SWF.COMPRESSION_METHOD_ZLIB) {
                                firstHeaderByte = 0x43;
                            }
                            else if (this.compressionMethod == SWF.COMPRESSION_METHOD_LZMA) {
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
                    };
                    SWF.prototype.__publishFinalize = function (data) {
                        this.fileLength = this.fileLengthCompressed = data.length;
                        if (this.compressed) {
                            this.compressionMethod = SWF.COMPRESSION_METHOD_ZLIB;
                            data.position = SWF.COMPRESSION_START_POS;
                            data.swfCompress(this.compressionMethod);
                            this.fileLengthCompressed = data.length;
                        }
                        var endPos = data.position;
                        data.position = SWF.FILE_LENGTH_POS;
                        data.writeUI32(this.fileLength);
                        data.position = 0;
                    };
                    SWF.prototype.toString = function (indent, flags) {
                        if (indent === void 0) { indent = 0; }
                        if (flags === void 0) { flags = 0; }
                        indent = ((indent) >>> 0);
                        flags = ((flags) >>> 0);
                        var indent0 = swf.StringUtils.repeat(indent);
                        var indent2 = swf.StringUtils.repeat(indent + 2);
                        var indent4 = swf.StringUtils.repeat(indent + 4);
                        var s = indent0 + "[SWF]\n" +
                            indent2 + "Header:\n" +
                            indent4 + "Version: " + this.version + "\n" +
                            indent4 + "Compression: ";
                        if (this.compressed) {
                            if (this.compressionMethod == SWF.COMPRESSION_METHOD_ZLIB) {
                                s += "ZLIB";
                            }
                            else if (this.compressionMethod == SWF.COMPRESSION_METHOD_LZMA) {
                                s += "LZMA";
                            }
                            else {
                                s += "Unknown";
                            }
                        }
                        else {
                            s += "None";
                        }
                        return s + "\n" + indent4 + "FileLength: " + this.fileLength + "\n" +
                            indent4 + "FileLengthCompressed: " + this.fileLengthCompressed + "\n" +
                            indent4 + "FrameSize: " + this.frameSize.toStringSize() + "\n" +
                            indent4 + "FrameRate: " + this.frameRate + "\n" +
                            indent4 + "FrameCount: " + this.frameCount +
                            _super.prototype.toString.call(this, indent);
                    };
                    SWF.COMPRESSION_METHOD_ZLIB = "zlib";
                    SWF.COMPRESSION_METHOD_LZMA = "lzma";
                    SWF.TOSTRING_FLAG_TIMELINE_STRUCTURE = 0x01;
                    SWF.TOSTRING_FLAG_AVM1_BYTECODE = 0x02;
                    SWF.FILE_LENGTH_POS = 4;
                    SWF.COMPRESSION_START_POS = 8;
                    return SWF;
                }(swf.SWFTimelineContainer));
                swf.SWF = SWF;
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWF.js.map