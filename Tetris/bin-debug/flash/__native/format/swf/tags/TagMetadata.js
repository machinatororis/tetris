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
                    tags.XML = global.XML;
                    tags.SWFData = flash.__native.format.swf.SWFData;
                    var TagMetadata = (function () {
                        function TagMetadata() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.xmlString = null;
                        }
                        TagMetadata.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.xmlString = data.readString();
                        };
                        TagMetadata.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeString(this.xmlString);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagMetadata.prototype, "type", {
                            get: function () { return TagMetadata.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagMetadata.prototype, "name", {
                            get: function () { return "Metadata"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagMetadata.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagMetadata.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagMetadata.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent);
                            var xml;
                            try {
                                xml = new tags.XML(this.xmlString);
                                str += " " + xml.toXMLString();
                            }
                            catch (error) {
                                error = window.asc.e2e(error);
                                str += " " + this.xmlString;
                            }
                            return str;
                        };
                        TagMetadata.TYPE = 77;
                        return TagMetadata;
                    }());
                    tags.TagMetadata = TagMetadata;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagMetadata.js.map