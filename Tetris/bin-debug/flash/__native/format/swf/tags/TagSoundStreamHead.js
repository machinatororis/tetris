var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var tags;
                (function (tags) {
                    tags.SWFData = flash.__native.format.swf.SWFData;
                    tags.SoundCompression = flash.__native.format.swf.data.consts.SoundCompression;
                    tags.SoundRate = flash.__native.format.swf.data.consts.SoundRate;
                    tags.SoundSize = flash.__native.format.swf.data.consts.SoundSize;
                    tags.SoundType = flash.__native.format.swf.data.consts.SoundType;
                    var TagSoundStreamHead = (function () {
                        function TagSoundStreamHead() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.playbackSoundRate = 0;
                            this.playbackSoundSize = 0;
                            this.playbackSoundType = 0;
                            this.streamSoundCompression = 0;
                            this.streamSoundRate = 0;
                            this.streamSoundSize = 0;
                            this.streamSoundType = 0;
                            this.streamSoundSampleCount = 0;
                            this.latencySeek = 0;
                        }
                        TagSoundStreamHead.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            data.readUB(4);
                            this.playbackSoundRate = data.readUB(2);
                            this.playbackSoundSize = data.readUB(1);
                            this.playbackSoundType = data.readUB(1);
                            this.streamSoundCompression = data.readUB(4);
                            this.streamSoundRate = data.readUB(2);
                            this.streamSoundSize = data.readUB(1);
                            this.streamSoundType = data.readUB(1);
                            this.streamSoundSampleCount = data.readUI16();
                            if (this.streamSoundCompression == tags.SoundCompression.MP3) {
                                this.latencySeek = ((data.readSI16()) >>> 0);
                            }
                        };
                        TagSoundStreamHead.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUB(4, 0);
                            body.writeUB(2, this.playbackSoundRate);
                            body.writeUB(1, this.playbackSoundSize);
                            body.writeUB(1, this.playbackSoundType);
                            body.writeUB(4, this.streamSoundCompression);
                            body.writeUB(2, this.streamSoundRate);
                            body.writeUB(1, this.streamSoundSize);
                            body.writeUB(1, this.streamSoundType);
                            body.writeUI16(this.streamSoundSampleCount);
                            if (this.streamSoundCompression == tags.SoundCompression.MP3) {
                                body.writeSI16(this.latencySeek);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagSoundStreamHead.prototype, "type", {
                            get: function () { return TagSoundStreamHead.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamHead.prototype, "name", {
                            get: function () { return "SoundStreamHead"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamHead.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamHead.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagSoundStreamHead.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent);
                            if (this.streamSoundSampleCount > 0) {
                                str += "Format: " + tags.SoundCompression.toString(this.streamSoundCompression) + ", " +
                                    "Rate: " + tags.SoundRate.toString(this.streamSoundRate) + ", " +
                                    "Size: " + tags.SoundSize.toString(this.streamSoundSize) + ", " +
                                    "Type: " + tags.SoundType.toString(this.streamSoundType) + ", ";
                            }
                            str += "Samples: " + this.streamSoundSampleCount + ", ";
                            str += "LatencySeek: " + this.latencySeek;
                            return str;
                        };
                        TagSoundStreamHead.TYPE = 18;
                        return TagSoundStreamHead;
                    }());
                    tags.TagSoundStreamHead = TagSoundStreamHead;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagSoundStreamHead.js.map