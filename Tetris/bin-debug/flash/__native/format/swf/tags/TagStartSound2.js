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
                    var TagStartSound2 = (function () {
                        function TagStartSound2() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.soundClassName = null;
                            this.soundInfo = null;
                        }
                        TagStartSound2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.soundClassName = data.readString();
                            this.soundInfo = data.readSOUNDINFO();
                        };
                        TagStartSound2.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeString(this.soundClassName);
                            body.writeSOUNDINFO(this.soundInfo);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagStartSound2.prototype, "type", {
                            get: function () { return TagStartSound2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagStartSound2.prototype, "name", {
                            get: function () { return "StartSound2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagStartSound2.prototype, "version", {
                            get: function () { return 9; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagStartSound2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagStartSound2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "SoundClassName: " + this.soundClassName + ", " +
                                "SoundInfo: " + this.soundInfo;
                            return str;
                        };
                        TagStartSound2.TYPE = 89;
                        return TagStartSound2;
                    }());
                    tags.TagStartSound2 = TagStartSound2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagStartSound2.js.map