var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format_1) {
            var swf;
            (function (swf) {
                var tags;
                (function (tags) {
                    tags.SWFData = flash.__native.format.swf.SWFData;
                    tags.SoundCompression = flash.__native.format.swf.data.consts.SoundCompression;
                    tags.SoundRate = flash.__native.format.swf.data.consts.SoundRate;
                    tags.SoundSize = flash.__native.format.swf.data.consts.SoundSize;
                    tags.SoundType = flash.__native.format.swf.data.consts.SoundType;
                    tags.MPEGFrame = flash.__native.format.swf.data.etc.MPEGFrame;
                    tags.ByteArray = flash.utils.ByteArray;
                    var TagDefineSound = (function () {
                        function TagDefineSound() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.soundFormat = 0;
                            this.soundRate = 0;
                            this.soundSize = 0;
                            this.soundType = 0;
                            this.soundSampleCount = 0;
                            this._characterId = 0;
                            this._soundData = null;
                            this._soundData = new tags.ByteArray();
                        }
                        TagDefineSound.create = function (id, format, rate, size, type, sampleCount, aSoundData) {
                            if (format === void 0) { format = tags.SoundCompression.MP3; }
                            if (rate === void 0) { rate = tags.SoundRate.KHZ_44; }
                            if (size === void 0) { size = tags.SoundSize.BIT_16; }
                            if (type === void 0) { type = tags.SoundType.STEREO; }
                            if (sampleCount === void 0) { sampleCount = 0; }
                            if (aSoundData === void 0) { aSoundData = null; }
                            id = ((id) >>> 0);
                            format = ((format) >>> 0);
                            rate = ((rate) >>> 0);
                            size = ((size) >>> 0);
                            type = ((type) >>> 0);
                            sampleCount = ((sampleCount) >>> 0);
                            aSoundData = strict(aSoundData, tags.ByteArray);
                            var defineSound = new TagDefineSound();
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
                        };
                        TagDefineSound.createWithMP3 = function (id, mp3) {
                            id = ((id) >>> 0);
                            mp3 = strict(mp3, tags.ByteArray);
                            if (mp3 != null && mp3.length > 0) {
                                var defineSound = new TagDefineSound();
                                defineSound._characterId = id;
                                defineSound.processMP3(mp3);
                                return defineSound;
                            }
                            else {
                                throw (new Error("No MP3 data."));
                            }
                        };
                        Object.defineProperty(TagDefineSound.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSound.prototype, "soundData", {
                            get: function () { return this._soundData; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineSound.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.soundFormat = data.readUB(4);
                            this.soundRate = data.readUB(2);
                            this.soundSize = data.readUB(1);
                            this.soundType = data.readUB(1);
                            this.soundSampleCount = data.readUI32();
                            data.readBytes(this._soundData, 0, length - 7);
                        };
                        TagDefineSound.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
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
                        };
                        TagDefineSound.prototype.clone = function () {
                            var tag = new TagDefineSound();
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
                        };
                        Object.defineProperty(TagDefineSound.prototype, "type", {
                            get: function () { return TagDefineSound.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSound.prototype, "name", {
                            get: function () { return "DefineSound"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSound.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSound.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineSound.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "SoundID: " + this.characterId + ", " +
                                "Format: " + tags.SoundCompression.toString(this.soundFormat) + ", " +
                                "Rate: " + tags.SoundRate.toString(this.soundRate) + ", " +
                                "Size: " + tags.SoundSize.toString(this.soundSize) + ", " +
                                "Type: " + tags.SoundType.toString(this.soundType) + ", " +
                                "Samples: " + this.soundSampleCount;
                            return str;
                        };
                        TagDefineSound.prototype.processMP3 = function (mp3) {
                            mp3 = strict(mp3, tags.ByteArray);
                            var i = 0;
                            var beginIdx = 0;
                            var endIdx = mp3.length;
                            var samples = 0;
                            var firstFrame = true;
                            var samplingrate = 0;
                            var channelmode = 0;
                            var frame = new tags.MPEGFrame();
                            var state = "id3v2";
                            while (i < mp3.length) {
                                switch (state) {
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
                                        }
                                        else if (mp3.get(i) == 0x54 && mp3.get(i + 1) == 0x41 && mp3.get(i + 2) == 0x47) {
                                            endIdx = i;
                                            i = mp3.length;
                                        }
                                        else {
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
                            this.soundFormat = tags.SoundCompression.MP3;
                            this.soundSize = tags.SoundSize.BIT_16;
                            this.soundType = (channelmode == tags.MPEGFrame.CHANNEL_MODE_MONO) ? tags.SoundType.MONO : tags.SoundType.STEREO;
                            switch (samplingrate) {
                                case 44100:
                                    this.soundRate = tags.SoundRate.KHZ_44;
                                    break;
                                case 22050:
                                    this.soundRate = tags.SoundRate.KHZ_22;
                                    break;
                                case 11025:
                                    this.soundRate = tags.SoundRate.KHZ_11;
                                    break;
                                default: throw (new Error("Unsupported sampling rate: " + samplingrate + " Hz"));
                            }
                            this.soundData.length = 0;
                            this.soundData.writeShort(0);
                            this.soundData.writeBytes(mp3, beginIdx, endIdx - beginIdx);
                        };
                        TagDefineSound.TYPE = 14;
                        return TagDefineSound;
                    }());
                    tags.TagDefineSound = TagDefineSound;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format_1.swf || (format_1.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineSound.js.map