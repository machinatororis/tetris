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
                    var TagNameCharacter = (function () {
                        function TagNameCharacter() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._characterId = 0;
                            this._binaryData = null;
                            this._binaryData = new tags.ByteArray();
                        }
                        Object.defineProperty(TagNameCharacter.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagNameCharacter.prototype, "binaryData", {
                            get: function () { return this._binaryData; },
                            enumerable: true,
                            configurable: true
                        });
                        TagNameCharacter.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            if (length > 2) {
                                data.readBytes(this._binaryData, 0, length - 2);
                            }
                        };
                        TagNameCharacter.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this._characterId);
                            if (this._binaryData.length > 0) {
                                body.writeBytes(this._binaryData);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagNameCharacter.prototype.clone = function () {
                            var tag = new TagNameCharacter();
                            tag.characterId = this.characterId;
                            if (this._binaryData.length > 0) {
                                tag.binaryData.writeBytes(this._binaryData);
                            }
                            return tag;
                        };
                        Object.defineProperty(TagNameCharacter.prototype, "type", {
                            get: function () { return TagNameCharacter.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagNameCharacter.prototype, "name", {
                            get: function () { return "NameCharacter"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagNameCharacter.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagNameCharacter.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagNameCharacter.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId;
                            if (this.binaryData.length > 0) {
                                this.binaryData.position = 0;
                                str += ", Name: " + this.binaryData.readUTFBytes(this.binaryData.length - 1);
                                this.binaryData.position = 0;
                            }
                            return str;
                        };
                        TagNameCharacter.TYPE = 40;
                        return TagNameCharacter;
                    }());
                    tags.TagNameCharacter = TagNameCharacter;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagNameCharacter.js.map