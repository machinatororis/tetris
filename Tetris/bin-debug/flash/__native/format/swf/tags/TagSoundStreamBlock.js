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
                    tags.ByteArray = flash.utils.ByteArray;
                    var TagSoundStreamBlock = (function () {
                        function TagSoundStreamBlock() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._soundData = null;
                            this._soundData = new tags.ByteArray();
                        }
                        Object.defineProperty(TagSoundStreamBlock.prototype, "soundData", {
                            get: function () { return this._soundData; },
                            enumerable: true,
                            configurable: true
                        });
                        TagSoundStreamBlock.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            data.readBytes(this._soundData, 0, length);
                        };
                        TagSoundStreamBlock.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, this._soundData.length, true);
                            if (this._soundData.length > 0) {
                                data.writeBytes(this._soundData);
                            }
                        };
                        Object.defineProperty(TagSoundStreamBlock.prototype, "type", {
                            get: function () { return TagSoundStreamBlock.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamBlock.prototype, "name", {
                            get: function () { return "SoundStreamBlock"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamBlock.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamBlock.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagSoundStreamBlock.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) + "Length: " + this._soundData.length;
                        };
                        TagSoundStreamBlock.TYPE = 19;
                        return TagSoundStreamBlock;
                    }());
                    tags.TagSoundStreamBlock = TagSoundStreamBlock;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagSoundStreamBlock.js.map