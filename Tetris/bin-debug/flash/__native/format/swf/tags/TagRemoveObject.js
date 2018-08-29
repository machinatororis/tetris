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
                    var TagRemoveObject = (function () {
                        function TagRemoveObject() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDisplayListTag = null;
                            this.characterId = 0;
                            this.depth = 0;
                        }
                        TagRemoveObject.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.characterId = data.readUI16();
                            this.depth = data.readUI16();
                        };
                        TagRemoveObject.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 4);
                            data.writeUI16(this.characterId);
                            data.writeUI16(this.depth);
                        };
                        Object.defineProperty(TagRemoveObject.prototype, "type", {
                            get: function () { return TagRemoveObject.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagRemoveObject.prototype, "name", {
                            get: function () { return "RemoveObject"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagRemoveObject.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagRemoveObject.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagRemoveObject.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "CharacterID: " + this.characterId + ", " +
                                "Depth: " + this.depth;
                        };
                        TagRemoveObject.TYPE = 5;
                        return TagRemoveObject;
                    }());
                    tags.TagRemoveObject = TagRemoveObject;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagRemoveObject.js.map