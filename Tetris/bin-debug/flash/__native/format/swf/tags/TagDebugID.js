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
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    tags.ByteArray = flash.utils.ByteArray;
                    var TagDebugID = (function () {
                        function TagDebugID() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._uuid = null;
                            this._uuid = new tags.ByteArray();
                        }
                        Object.defineProperty(TagDebugID.prototype, "uuid", {
                            get: function () { return this._uuid; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDebugID.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            if (length > 0) {
                                data.readBytes(this._uuid, 0, length);
                            }
                        };
                        TagDebugID.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, this._uuid.length);
                            if (this._uuid.length > 0) {
                                data.writeBytes(this._uuid);
                            }
                        };
                        Object.defineProperty(TagDebugID.prototype, "type", {
                            get: function () { return TagDebugID.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDebugID.prototype, "name", {
                            get: function () { return "DebugID"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDebugID.prototype, "version", {
                            get: function () { return 6; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDebugID.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDebugID.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) + "UUID: ";
                            if (this._uuid.length == 16) {
                                str += tags.StringUtils.printf("%02x%02x%02x%02x-", this._uuid.get(0), this._uuid.get(1), this._uuid.get(2), this._uuid.get(3));
                                str += tags.StringUtils.printf("%02x%02x-", this._uuid.get(4), this._uuid.get(5));
                                str += tags.StringUtils.printf("%02x%02x-", this._uuid.get(6), this._uuid.get(7));
                                str += tags.StringUtils.printf("%02x%02x-", this._uuid.get(8), this._uuid.get(9));
                                str += tags.StringUtils.printf("%02x%02x%02x%02x%02x%02x", this._uuid.get(10), this._uuid.get(11), this._uuid.get(12), this._uuid.get(13), this._uuid.get(14), this._uuid.get(15));
                            }
                            else {
                                str += "(invalid length: " + this._uuid.length + ")";
                            }
                            return str;
                        };
                        TagDebugID.TYPE = 63;
                        return TagDebugID;
                    }());
                    tags.TagDebugID = TagDebugID;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDebugID.js.map