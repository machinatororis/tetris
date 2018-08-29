var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var data;
                (function (data) {
                    var etc;
                    (function (etc) {
                        etc.ByteArray = flash.utils.ByteArray;
                        var MPEGFrame = (function () {
                            function MPEGFrame() {
                                this._version = 0;
                                this._layer = 0;
                                this._bitrate = 0;
                                this._samplingRate = 0;
                                this._padding = false;
                                this._channelMode = 0;
                                this._channelModeExt = 0;
                                this._copyright = false;
                                this._original = false;
                                this._emphasis = 0;
                                this._header = null;
                                this._data = null;
                                this._crc = null;
                                this._hasCRC = false;
                                this._samples = 1152;
                                this.init();
                            }
                            Object.defineProperty(MPEGFrame.prototype, "version", {
                                get: function () { return this._version; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "layer", {
                                get: function () { return this._layer; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "bitrate", {
                                get: function () { return this._bitrate; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "samplingrate", {
                                get: function () { return this._samplingRate; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "padding", {
                                get: function () { return this._padding; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "channelMode", {
                                get: function () { return this._channelMode; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "channelModeExt", {
                                get: function () { return this._channelModeExt; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "copyright", {
                                get: function () { return this._copyright; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "original", {
                                get: function () { return this._original; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "emphasis", {
                                get: function () { return this._emphasis; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "hasCRC", {
                                get: function () { return this._hasCRC; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "crc", {
                                get: function () { this._crc.position = 0; return this._crc.readUnsignedShort(); },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "samples", {
                                get: function () { return this._samples; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "data", {
                                get: function () { return this._data; },
                                set: function (value) { value = strict(value, etc.ByteArray); this._data = value; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(MPEGFrame.prototype, "size", {
                                get: function () {
                                    var ret = 0;
                                    if (this.layer == MPEGFrame.MPEG_LAYER_I) {
                                        ret = ((Math.floor((12000.0 * this.bitrate) / this.samplingrate)) >>> 0);
                                        if (this.padding) {
                                            ret++;
                                        }
                                        ret <<= 2;
                                    }
                                    else {
                                        ret = ((Math.floor(((this.version == MPEGFrame.MPEG_VERSION_1_0) ? 144000.0 : 72000.0) * this.bitrate / this.samplingrate)) >>> 0);
                                        if (this.padding) {
                                            ret++;
                                        }
                                    }
                                    return ret - 4 - (this.hasCRC ? 2 : 0);
                                },
                                enumerable: true,
                                configurable: true
                            });
                            MPEGFrame.prototype.setHeaderByteAt = function (index, value) {
                                index = ((index) >>> 0);
                                value = ((value) >>> 0);
                                switch (index) {
                                    case 0:
                                        if (value != 0xff) {
                                            throw (new Error("Not a MPEG header."));
                                        }
                                        break;
                                    case 1:
                                        if ((value & 0xe0) != 0xe0) {
                                            throw (new Error("Not a MPEG header."));
                                        }
                                        var mpegVersionBits = (((value & 0x18) >> 3) >>> 0);
                                        switch (mpegVersionBits) {
                                            case 3:
                                                this._version = MPEGFrame.MPEG_VERSION_1_0;
                                                break;
                                            case 2:
                                                this._version = MPEGFrame.MPEG_VERSION_2_0;
                                                break;
                                            default: throw (new Error("Unsupported MPEG version."));
                                        }
                                        var mpegLayerBits = (((value & 0x06) >> 1) >>> 0);
                                        switch (mpegLayerBits) {
                                            case 1:
                                                this._layer = MPEGFrame.MPEG_LAYER_III;
                                                break;
                                            default: throw (new Error("Unsupported MPEG layer."));
                                        }
                                        this._hasCRC = !((value & 0x01) != 0);
                                        break;
                                    case 2:
                                        var bitrateIndex = ((((value & 0xf0) >> 4)) >>> 0);
                                        if (bitrateIndex == 0 || bitrateIndex == 0x0f) {
                                            throw (new Error("Unsupported bitrate index."));
                                        }
                                        this._bitrate = ((MPEGFrame.mpegBitrates[this._version][this._layer][bitrateIndex]) >>> 0);
                                        var samplingrateIndex = ((((value & 0x0c) >> 2)) >>> 0);
                                        if (samplingrateIndex == 3) {
                                            throw (new Error("Unsupported samplingrate index."));
                                        }
                                        this._samplingRate = ((MPEGFrame.mpegSamplingRates[this._version][samplingrateIndex]) >>> 0);
                                        this._padding = ((value & 0x02) == 0x02);
                                        break;
                                    case 3:
                                        this._channelMode = ((((value & 0xc0) >> 6)) >>> 0);
                                        this._channelModeExt = ((((value & 0x30) >> 4)) >>> 0);
                                        this._copyright = ((value & 0x08) == 0x08);
                                        this._original = ((value & 0x04) == 0x04);
                                        this._emphasis = (((value & 0x02)) >>> 0);
                                        break;
                                    default:
                                        throw (new Error("Index out of bounds."));
                                }
                                this._header.set(index, value);
                            };
                            MPEGFrame.prototype.setCRCByteAt = function (index, value) {
                                index = ((index) >>> 0);
                                value = ((value) >>> 0);
                                if (index > 1) {
                                    throw (new Error("Index out of bounds."));
                                }
                                this._crc.set(index, value);
                            };
                            MPEGFrame.prototype.init = function () {
                                this._header = new etc.ByteArray();
                                this._header.writeByte(0);
                                this._header.writeByte(0);
                                this._header.writeByte(0);
                                this._header.writeByte(0);
                                this._crc = new etc.ByteArray();
                                this._crc.writeByte(0);
                                this._crc.writeByte(0);
                            };
                            MPEGFrame.prototype.getFrame = function () {
                                var ba = new etc.ByteArray();
                                ba.writeBytes(this._header, 0, 4);
                                if (this.hasCRC) {
                                    ba.writeBytes(this._crc, 0, 2);
                                }
                                ba.writeBytes(this._data);
                                return ba;
                            };
                            MPEGFrame.prototype.toString = function () {
                                var encoding = "MPEG ";
                                switch (this.version) {
                                    case MPEGFrame.MPEG_VERSION_1_0:
                                        encoding += "1.0 ";
                                        break;
                                    case MPEGFrame.MPEG_VERSION_2_0:
                                        encoding += "2.0 ";
                                        break;
                                    case MPEGFrame.MPEG_VERSION_2_5:
                                        encoding += "2.5 ";
                                        break;
                                    default:
                                        encoding += "?.? ";
                                        break;
                                }
                                switch (this.layer) {
                                    case MPEGFrame.MPEG_LAYER_I:
                                        encoding += "Layer I";
                                        break;
                                    case MPEGFrame.MPEG_LAYER_II:
                                        encoding += "Layer II";
                                        break;
                                    case MPEGFrame.MPEG_LAYER_III:
                                        encoding += "Layer III";
                                        break;
                                    default:
                                        encoding += "Layer ?";
                                        break;
                                }
                                var channel = "unknown";
                                switch (this.channelMode) {
                                    case 0:
                                        channel = "Stereo";
                                        break;
                                    case 1:
                                        channel = "Joint stereo";
                                        break;
                                    case 2:
                                        channel = "Dual channel";
                                        break;
                                    case 3:
                                        channel = "Mono";
                                        break;
                                }
                                return encoding + ", " + this.bitrate + " kbit/s, " + this.samplingrate + " Hz, " + channel + ", " + this.size + " bytes";
                            };
                            MPEGFrame.MPEG_VERSION_1_0 = 0;
                            MPEGFrame.MPEG_VERSION_2_0 = 1;
                            MPEGFrame.MPEG_VERSION_2_5 = 2;
                            MPEGFrame.MPEG_LAYER_I = 0;
                            MPEGFrame.MPEG_LAYER_II = 1;
                            MPEGFrame.MPEG_LAYER_III = 2;
                            MPEGFrame.CHANNEL_MODE_STEREO = 0;
                            MPEGFrame.CHANNEL_MODE_JOINT_STEREO = 1;
                            MPEGFrame.CHANNEL_MODE_DUAL = 2;
                            MPEGFrame.CHANNEL_MODE_MONO = 3;
                            MPEGFrame.mpegBitrates = [
                                [[0, 32, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1],
                                    [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1],
                                    [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1]],
                                [[0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, -1],
                                    [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1],
                                    [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1]]
                            ];
                            MPEGFrame.mpegSamplingRates = [
                                [44100, 48000, 32000],
                                [22050, 24000, 16000],
                                [11025, 12000, 8000]
                            ];
                            return MPEGFrame;
                        }());
                        etc.MPEGFrame = MPEGFrame;
                    })(etc = data.etc || (data.etc = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=MPEGFrame.js.map