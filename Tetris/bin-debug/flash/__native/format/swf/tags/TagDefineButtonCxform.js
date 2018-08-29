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
                    tags.SWFColorTransform = flash.__native.format.swf.data.SWFColorTransform;
                    var TagDefineButtonCxform = (function () {
                        function TagDefineButtonCxform() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.buttonColorTransform = null;
                            this._characterId = 0;
                        }
                        Object.defineProperty(TagDefineButtonCxform.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineButtonCxform.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.buttonColorTransform = data.readCXFORM();
                        };
                        TagDefineButtonCxform.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeCXFORM(this.buttonColorTransform);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineButtonCxform.prototype.clone = function () {
                            var tag = new TagDefineButtonCxform();
                            tag.characterId = this.characterId;
                            tag.buttonColorTransform = this.buttonColorTransform.clone();
                            return tag;
                        };
                        Object.defineProperty(TagDefineButtonCxform.prototype, "type", {
                            get: function () { return TagDefineButtonCxform.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButtonCxform.prototype, "name", {
                            get: function () { return "DefineButtonCxform"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButtonCxform.prototype, "version", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButtonCxform.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineButtonCxform.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "ColorTransform: " + this.buttonColorTransform;
                            return str;
                        };
                        TagDefineButtonCxform.TYPE = 23;
                        return TagDefineButtonCxform;
                    }());
                    tags.TagDefineButtonCxform = TagDefineButtonCxform;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineButtonCxform.js.map