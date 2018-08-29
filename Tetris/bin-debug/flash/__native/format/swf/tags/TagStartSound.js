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
                    tags.SWFSoundInfo = flash.__native.format.swf.data.SWFSoundInfo;
                    var TagStartSound = (function () {
                        function TagStartSound() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.soundId = 0;
                            this.soundInfo = null;
                        }
                        TagStartSound.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.soundId = data.readUI16();
                            this.soundInfo = data.readSOUNDINFO();
                        };
                        TagStartSound.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.soundId);
                            body.writeSOUNDINFO(this.soundInfo);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagStartSound.prototype, "type", {
                            get: function () { return TagStartSound.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagStartSound.prototype, "name", {
                            get: function () { return "StartSound"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagStartSound.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagStartSound.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagStartSound.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "SoundID: " + this.soundId + ", " +
                                "SoundInfo: " + this.soundInfo;
                            return str;
                        };
                        TagStartSound.TYPE = 15;
                        return TagStartSound;
                    }());
                    tags.TagStartSound = TagStartSound;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagStartSound.js.map