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
                    var TagJPEGTables = (function () {
                        function TagJPEGTables() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._jpegTables = null;
                            this._jpegTables = new tags.ByteArray();
                        }
                        Object.defineProperty(TagJPEGTables.prototype, "jpegTables", {
                            get: function () { return this._jpegTables; },
                            enumerable: true,
                            configurable: true
                        });
                        TagJPEGTables.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            if (length > 0) {
                                data.readBytes(this._jpegTables, 0, length);
                            }
                        };
                        TagJPEGTables.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, this._jpegTables.length);
                            if (this.jpegTables.length > 0) {
                                data.writeBytes(this.jpegTables);
                            }
                        };
                        Object.defineProperty(TagJPEGTables.prototype, "type", {
                            get: function () { return TagJPEGTables.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagJPEGTables.prototype, "name", {
                            get: function () { return "JPEGTables"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagJPEGTables.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagJPEGTables.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagJPEGTables.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) + "Length: " + this._jpegTables.length;
                        };
                        TagJPEGTables.TYPE = 8;
                        return TagJPEGTables;
                    }());
                    tags.TagJPEGTables = TagJPEGTables;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagJPEGTables.js.map