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
                    var TagProtect = (function () {
                        function TagProtect() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._password = null;
                            this._password = new tags.ByteArray();
                        }
                        Object.defineProperty(TagProtect.prototype, "password", {
                            get: function () { return this._password; },
                            enumerable: true,
                            configurable: true
                        });
                        TagProtect.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            if (length > 0) {
                                data.readBytes(this._password, 0, length);
                            }
                        };
                        TagProtect.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, this._password.length);
                            if (this._password.length > 0) {
                                data.writeBytes(this._password);
                            }
                        };
                        Object.defineProperty(TagProtect.prototype, "type", {
                            get: function () { return TagProtect.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagProtect.prototype, "name", {
                            get: function () { return "Protect"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagProtect.prototype, "version", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagProtect.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagProtect.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent);
                        };
                        TagProtect.TYPE = 24;
                        return TagProtect;
                    }());
                    tags.TagProtect = TagProtect;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagProtect.js.map