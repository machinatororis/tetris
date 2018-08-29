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
                    var TagDefineBinaryData = (function () {
                        function TagDefineBinaryData() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this._characterId = 0;
                            this._binaryData = null;
                            this._binaryData = new tags.ByteArray();
                        }
                        Object.defineProperty(TagDefineBinaryData.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBinaryData.prototype, "binaryData", {
                            get: function () { return this._binaryData; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineBinaryData.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            data.readUI32();
                            if (length > 6) {
                                data.readBytes(this._binaryData, 0, length - 6);
                            }
                        };
                        TagDefineBinaryData.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this._characterId);
                            body.writeUI32(0);
                            if (this._binaryData.length > 0) {
                                body.writeBytes(this._binaryData);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineBinaryData.prototype.clone = function () {
                            var tag = new TagDefineBinaryData();
                            tag.characterId = this.characterId;
                            if (this._binaryData.length > 0) {
                                tag.binaryData.writeBytes(this._binaryData);
                            }
                            return tag;
                        };
                        Object.defineProperty(TagDefineBinaryData.prototype, "type", {
                            get: function () { return TagDefineBinaryData.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBinaryData.prototype, "name", {
                            get: function () { return "DefineBinaryData"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBinaryData.prototype, "version", {
                            get: function () { return 9; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBinaryData.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineBinaryData.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Length: " + this._binaryData.length;
                        };
                        TagDefineBinaryData.TYPE = 87;
                        return TagDefineBinaryData;
                    }());
                    tags.TagDefineBinaryData = TagDefineBinaryData;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineBinaryData.js.map