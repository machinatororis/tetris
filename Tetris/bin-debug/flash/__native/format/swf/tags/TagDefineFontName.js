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
                    var TagDefineFontName = (function () {
                        function TagDefineFontName() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.fontId = 0;
                            this.fontName = null;
                            this.fontCopyright = null;
                        }
                        TagDefineFontName.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.fontId = data.readUI16();
                            this.fontName = data.readString();
                            this.fontCopyright = data.readString();
                        };
                        TagDefineFontName.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.fontId);
                            body.writeString(this.fontName);
                            body.writeString(this.fontCopyright);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDefineFontName.prototype, "type", {
                            get: function () { return TagDefineFontName.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontName.prototype, "name", {
                            get: function () { return "DefineFontName"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontName.prototype, "version", {
                            get: function () { return 9; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontName.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFontName.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "FontID: " + this.fontId + ", " +
                                "Name: " + this.fontName + ", " +
                                "Copyright: " + this.fontCopyright;
                        };
                        TagDefineFontName.TYPE = 88;
                        return TagDefineFontName;
                    }());
                    tags.TagDefineFontName = TagDefineFontName;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineFontName.js.map