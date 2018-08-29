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
                    var TagBroken = (function () {
                        function TagBroken(source) {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._source = null;
                            source = strict(source, 'implements_flash___native_format_swf_tags_ITag');
                            this._source = source;
                        }
                        TagBroken.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                        };
                        TagBroken.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            throw (new Error("This tag is broken."));
                        };
                        Object.defineProperty(TagBroken.prototype, "type", {
                            get: function () { return this._source.type; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagBroken.prototype, "name", {
                            get: function () { return "????"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagBroken.prototype, "version", {
                            get: function () { return 0; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagBroken.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagBroken.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent);
                        };
                        return TagBroken;
                    }());
                    tags.TagBroken = TagBroken;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagBroken.js.map