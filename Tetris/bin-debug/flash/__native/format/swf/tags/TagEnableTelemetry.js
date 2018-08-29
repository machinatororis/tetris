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
                    var TagEnableTelemetry = (function () {
                        function TagEnableTelemetry() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._password = null;
                            this._password = new tags.ByteArray();
                        }
                        Object.defineProperty(TagEnableTelemetry.prototype, "password", {
                            get: function () { return this._password; },
                            enumerable: true,
                            configurable: true
                        });
                        TagEnableTelemetry.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            if (length > 2) {
                                data.readByte();
                                data.readByte();
                                data.readBytes(this._password, 0, length - 2);
                            }
                        };
                        TagEnableTelemetry.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, this._password.length + 2);
                            data.writeByte(0);
                            data.writeByte(0);
                            if (this._password.length > 0) {
                                data.writeBytes(this._password);
                            }
                        };
                        Object.defineProperty(TagEnableTelemetry.prototype, "type", {
                            get: function () { return TagEnableTelemetry.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnableTelemetry.prototype, "name", {
                            get: function () { return "EnableTelemetry"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnableTelemetry.prototype, "version", {
                            get: function () { return 19; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnableTelemetry.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagEnableTelemetry.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent);
                        };
                        TagEnableTelemetry.TYPE = 93;
                        return TagEnableTelemetry;
                    }());
                    tags.TagEnableTelemetry = TagEnableTelemetry;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagEnableTelemetry.js.map