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
                    var TagShowFrame = (function () {
                        function TagShowFrame() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDisplayListTag = null;
                        }
                        TagShowFrame.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                        };
                        TagShowFrame.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 0);
                        };
                        Object.defineProperty(TagShowFrame.prototype, "type", {
                            get: function () { return TagShowFrame.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagShowFrame.prototype, "name", {
                            get: function () { return "ShowFrame"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagShowFrame.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagShowFrame.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagShowFrame.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent);
                        };
                        TagShowFrame.TYPE = 1;
                        return TagShowFrame;
                    }());
                    tags.TagShowFrame = TagShowFrame;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagShowFrame.js.map