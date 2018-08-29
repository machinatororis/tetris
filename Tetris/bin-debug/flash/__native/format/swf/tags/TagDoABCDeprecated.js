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
                    var TagDoABCDeprecated = (function () {
                        function TagDoABCDeprecated() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._bytes = null;
                            this._bytes = new tags.ByteArray;
                        }
                        TagDoABCDeprecated.create = function (abcData) {
                            if (abcData === void 0) { abcData = null; }
                            abcData = strict(abcData, tags.ByteArray);
                            var doABC = new TagDoABCDeprecated();
                            if (abcData != null && abcData.length > 0) {
                                doABC.bytes.writeBytes(abcData);
                            }
                            return doABC;
                        };
                        Object.defineProperty(TagDoABCDeprecated.prototype, "bytes", {
                            get: function () { return this._bytes; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDoABCDeprecated.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var pos = data.position;
                            data.readBytes(this.bytes, 0, length - (data.position - pos));
                        };
                        TagDoABCDeprecated.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            if (this._bytes.length > 0) {
                                body.writeBytes(this._bytes);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDoABCDeprecated.prototype, "type", {
                            get: function () { return TagDoABCDeprecated.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoABCDeprecated.prototype, "name", {
                            get: function () { return "DoABCDeprecated"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoABCDeprecated.prototype, "version", {
                            get: function () { return 9; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoABCDeprecated.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDoABCDeprecated.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "Length: " + this._bytes.length;
                        };
                        TagDoABCDeprecated.TYPE = 72;
                        return TagDoABCDeprecated;
                    }());
                    tags.TagDoABCDeprecated = TagDoABCDeprecated;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDoABCDeprecated.js.map