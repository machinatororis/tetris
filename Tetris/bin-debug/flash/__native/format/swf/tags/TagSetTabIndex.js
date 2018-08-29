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
                    var TagSetTabIndex = (function () {
                        function TagSetTabIndex() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.depth = 0;
                            this.tabIndex = 0;
                        }
                        TagSetTabIndex.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.depth = data.readUI16();
                            this.tabIndex = data.readUI16();
                        };
                        TagSetTabIndex.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 4);
                            data.writeUI16(this.depth);
                            data.writeUI16(this.tabIndex);
                        };
                        Object.defineProperty(TagSetTabIndex.prototype, "type", {
                            get: function () { return TagSetTabIndex.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSetTabIndex.prototype, "name", {
                            get: function () { return "SetTabIndex"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSetTabIndex.prototype, "version", {
                            get: function () { return 7; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSetTabIndex.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagSetTabIndex.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "Depth: " + this.depth + ", " +
                                "TabIndex: " + this.tabIndex;
                        };
                        TagSetTabIndex.TYPE = 66;
                        return TagSetTabIndex;
                    }());
                    tags.TagSetTabIndex = TagSetTabIndex;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagSetTabIndex.js.map