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
                    tags.ColorUtils = flash.__native.format.swf.utils.ColorUtils;
                    var TagSetBackgroundColor = (function () {
                        function TagSetBackgroundColor() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.color = 0xffffff;
                        }
                        TagSetBackgroundColor.create = function (aColor) {
                            if (aColor === void 0) { aColor = 0xffffff; }
                            aColor = ((aColor) >>> 0);
                            var setBackgroundColor = new TagSetBackgroundColor();
                            setBackgroundColor.color = aColor;
                            return setBackgroundColor;
                        };
                        TagSetBackgroundColor.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.color = data.readRGB();
                        };
                        TagSetBackgroundColor.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 3);
                            data.writeRGB(this.color);
                        };
                        Object.defineProperty(TagSetBackgroundColor.prototype, "type", {
                            get: function () { return TagSetBackgroundColor.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSetBackgroundColor.prototype, "name", {
                            get: function () { return "SetBackgroundColor"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSetBackgroundColor.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSetBackgroundColor.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagSetBackgroundColor.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) + "Color: " + tags.ColorUtils.rgbToString(this.color);
                        };
                        TagSetBackgroundColor.TYPE = 9;
                        return TagSetBackgroundColor;
                    }());
                    tags.TagSetBackgroundColor = TagSetBackgroundColor;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagSetBackgroundColor.js.map