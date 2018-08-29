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
                    var TagEnd = (function () {
                        function TagEnd() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                        }
                        TagEnd.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                        };
                        TagEnd.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 0);
                        };
                        Object.defineProperty(TagEnd.prototype, "type", {
                            get: function () { return TagEnd.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnd.prototype, "name", {
                            get: function () { return "End"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnd.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnd.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagEnd.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent);
                        };
                        TagEnd.TYPE = 0;
                        return TagEnd;
                    }());
                    tags.TagEnd = TagEnd;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagEnd.js.map