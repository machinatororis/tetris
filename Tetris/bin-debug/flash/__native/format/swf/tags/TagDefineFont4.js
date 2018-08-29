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
                    var TagDefineFont4 = (function () {
                        function TagDefineFont4() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.hasFontData = false;
                            this.italic = false;
                            this.bold = false;
                            this.fontName = null;
                            this._characterId = 0;
                            this._fontData = null;
                            this._fontData = new tags.ByteArray();
                        }
                        Object.defineProperty(TagDefineFont4.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont4.prototype, "fontData", {
                            get: function () { return this._fontData; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFont4.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var pos = data.position;
                            this._characterId = data.readUI16();
                            var flags = data.readUI8();
                            this.hasFontData = ((flags & 0x04) != 0);
                            this.italic = ((flags & 0x02) != 0);
                            this.bold = ((flags & 0x01) != 0);
                            this.fontName = data.readString();
                            if (this.hasFontData && length > data.position - pos) {
                                data.readBytes(this._fontData, 0, length - (data.position - pos));
                            }
                        };
                        TagDefineFont4.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            var flags = 0;
                            if (this.hasFontData) {
                                flags |= 0x04;
                            }
                            if (this.italic) {
                                flags |= 0x02;
                            }
                            if (this.bold) {
                                flags |= 0x01;
                            }
                            body.writeUI8(flags);
                            body.writeString(this.fontName);
                            if (this.hasFontData && this._fontData.length > 0) {
                                body.writeBytes(this._fontData);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineFont4.prototype.clone = function () {
                            var tag = new TagDefineFont4();
                            tag.characterId = this.characterId;
                            tag.hasFontData = this.hasFontData;
                            tag.italic = this.italic;
                            tag.bold = this.bold;
                            tag.fontName = this.fontName;
                            if (this._fontData.length > 0) {
                                tag.fontData.writeBytes(this._fontData);
                            }
                            return tag;
                        };
                        Object.defineProperty(TagDefineFont4.prototype, "type", {
                            get: function () { return TagDefineFont4.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont4.prototype, "name", {
                            get: function () { return "DefineFont4"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont4.prototype, "version", {
                            get: function () { return 10; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont4.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFont4.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "FontName: " + this.fontName + ", " +
                                "HasFontData: " + this.hasFontData + ", " +
                                "Italic: " + this.italic + ", " +
                                "Bold: " + this.bold;
                            return str;
                        };
                        TagDefineFont4.TYPE = 91;
                        return TagDefineFont4;
                    }());
                    tags.TagDefineFont4 = TagDefineFont4;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineFont4.js.map