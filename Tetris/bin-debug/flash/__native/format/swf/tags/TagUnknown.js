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
                    var TagUnknown = (function () {
                        function TagUnknown(type) {
                            if (type === void 0) { type = 0; }
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._type = 0;
                            type = ((type) >>> 0);
                            this._type = type;
                        }
                        TagUnknown.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            data.skipBytes(length);
                        };
                        TagUnknown.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            throw (new Error("No raw tag data available."));
                        };
                        Object.defineProperty(TagUnknown.prototype, "type", {
                            get: function () { return this._type; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagUnknown.prototype, "name", {
                            get: function () { return "????"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagUnknown.prototype, "version", {
                            get: function () { return 0; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagUnknown.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagUnknown.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent);
                        };
                        return TagUnknown;
                    }());
                    tags.TagUnknown = TagUnknown;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagUnknown.js.map