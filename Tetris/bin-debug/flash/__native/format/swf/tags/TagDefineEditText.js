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
                    tags.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                    var TagDefineEditText = (function () {
                        function TagDefineEditText() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.bounds = null;
                            this.variableName = null;
                            this.hasText = false;
                            this.wordWrap = false;
                            this.multiline = false;
                            this.password = false;
                            this.readOnly = false;
                            this.hasTextColor = false;
                            this.hasMaxLength = false;
                            this.hasFont = false;
                            this.hasFontClass = false;
                            this.autoSize = false;
                            this.hasLayout = false;
                            this.noSelect = false;
                            this.border = false;
                            this.wasStatic = false;
                            this.html = false;
                            this.useOutlines = false;
                            this.fontId = 0;
                            this.fontClass = null;
                            this.fontHeight = 0;
                            this.textColor = 0;
                            this.maxLength = 0;
                            this.align = 0;
                            this.leftMargin = 0;
                            this.rightMargin = 0;
                            this.indent = 0;
                            this.leading = 0;
                            this.initialText = null;
                            this._characterId = 0;
                        }
                        Object.defineProperty(TagDefineEditText.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineEditText.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.bounds = data.readRECT();
                            var flags1 = data.readUI8();
                            this.hasText = ((flags1 & 0x80) != 0);
                            this.wordWrap = ((flags1 & 0x40) != 0);
                            this.multiline = ((flags1 & 0x20) != 0);
                            this.password = ((flags1 & 0x10) != 0);
                            this.readOnly = ((flags1 & 0x08) != 0);
                            this.hasTextColor = ((flags1 & 0x04) != 0);
                            this.hasMaxLength = ((flags1 & 0x02) != 0);
                            this.hasFont = ((flags1 & 0x01) != 0);
                            var flags2 = data.readUI8();
                            this.hasFontClass = ((flags2 & 0x80) != 0);
                            this.autoSize = ((flags2 & 0x40) != 0);
                            this.hasLayout = ((flags2 & 0x20) != 0);
                            this.noSelect = ((flags2 & 0x10) != 0);
                            this.border = ((flags2 & 0x08) != 0);
                            this.wasStatic = ((flags2 & 0x04) != 0);
                            this.html = ((flags2 & 0x02) != 0);
                            this.useOutlines = ((flags2 & 0x01) != 0);
                            if (this.hasFont) {
                                this.fontId = data.readUI16();
                            }
                            if (this.hasFontClass) {
                                this.fontClass = data.readString();
                            }
                            if (this.hasFont) {
                                this.fontHeight = data.readUI16();
                            }
                            if (this.hasTextColor) {
                                this.textColor = data.readRGBA();
                            }
                            if (this.hasMaxLength) {
                                this.maxLength = data.readUI16();
                            }
                            if (this.hasLayout) {
                                this.align = data.readUI8();
                                this.leftMargin = data.readUI16();
                                this.rightMargin = data.readUI16();
                                this.indent = data.readUI16();
                                this.leading = data.readSI16();
                            }
                            this.variableName = data.readString();
                            if (this.hasText) {
                                this.initialText = data.readString();
                            }
                        };
                        TagDefineEditText.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeRECT(this.bounds);
                            var flags1 = 0;
                            if (this.hasText) {
                                flags1 |= 0x80;
                            }
                            if (this.wordWrap) {
                                flags1 |= 0x40;
                            }
                            if (this.multiline) {
                                flags1 |= 0x20;
                            }
                            if (this.password) {
                                flags1 |= 0x10;
                            }
                            if (this.readOnly) {
                                flags1 |= 0x08;
                            }
                            if (this.hasTextColor) {
                                flags1 |= 0x04;
                            }
                            if (this.hasMaxLength) {
                                flags1 |= 0x02;
                            }
                            if (this.hasFont) {
                                flags1 |= 0x01;
                            }
                            body.writeUI8(flags1);
                            var flags2 = 0;
                            if (this.hasFontClass) {
                                flags2 |= 0x80;
                            }
                            if (this.autoSize) {
                                flags2 |= 0x40;
                            }
                            if (this.hasLayout) {
                                flags2 |= 0x20;
                            }
                            if (this.noSelect) {
                                flags2 |= 0x10;
                            }
                            if (this.border) {
                                flags2 |= 0x08;
                            }
                            if (this.wasStatic) {
                                flags2 |= 0x04;
                            }
                            if (this.html) {
                                flags2 |= 0x02;
                            }
                            if (this.useOutlines) {
                                flags2 |= 0x01;
                            }
                            body.writeUI8(flags2);
                            if (this.hasFont) {
                                body.writeUI16(this.fontId);
                            }
                            if (this.hasFontClass) {
                                body.writeString(this.fontClass);
                            }
                            if (this.hasFont) {
                                body.writeUI16(this.fontHeight);
                            }
                            if (this.hasTextColor) {
                                body.writeRGBA(this.textColor);
                            }
                            if (this.hasMaxLength) {
                                body.writeUI16(this.maxLength);
                            }
                            if (this.hasLayout) {
                                body.writeUI8(this.align);
                                body.writeUI16(this.leftMargin);
                                body.writeUI16(this.rightMargin);
                                body.writeUI16(this.indent);
                                body.writeSI16(this.leading);
                            }
                            body.writeString(this.variableName);
                            if (this.hasText) {
                                body.writeString(this.initialText);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineEditText.prototype.clone = function () {
                            var tag = new TagDefineEditText();
                            tag.characterId = this.characterId;
                            tag.bounds = this.bounds.clone();
                            tag.variableName = this.variableName;
                            tag.hasText = this.hasText;
                            tag.wordWrap = this.wordWrap;
                            tag.multiline = this.multiline;
                            tag.password = this.password;
                            tag.readOnly = this.readOnly;
                            tag.hasTextColor = this.hasTextColor;
                            tag.hasMaxLength = this.hasMaxLength;
                            tag.hasFont = this.hasFont;
                            tag.hasFontClass = this.hasFontClass;
                            tag.autoSize = this.autoSize;
                            tag.hasLayout = this.hasLayout;
                            tag.noSelect = this.noSelect;
                            tag.border = this.border;
                            tag.wasStatic = this.wasStatic;
                            tag.html = this.html;
                            tag.useOutlines = this.useOutlines;
                            tag.fontId = this.fontId;
                            tag.fontClass = this.fontClass;
                            tag.fontHeight = this.fontHeight;
                            tag.textColor = this.textColor;
                            tag.maxLength = this.maxLength;
                            tag.align = this.align;
                            tag.leftMargin = this.leftMargin;
                            tag.rightMargin = this.rightMargin;
                            tag.indent = this.indent;
                            tag.leading = this.leading;
                            tag.initialText = this.initialText;
                            return tag;
                        };
                        Object.defineProperty(TagDefineEditText.prototype, "type", {
                            get: function () { return TagDefineEditText.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineEditText.prototype, "name", {
                            get: function () { return "DefineEditText"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineEditText.prototype, "version", {
                            get: function () { return 4; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineEditText.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineEditText.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                ((this.hasText && this.initialText.length > 0) ? "Text: " + this.initialText + ", " : "") +
                                ((this.variableName.length > 0) ? "VariableName: " + this.variableName + ", " : "") +
                                "Bounds: " + this.bounds;
                            return str;
                        };
                        TagDefineEditText.TYPE = 37;
                        return TagDefineEditText;
                    }());
                    tags.TagDefineEditText = TagDefineEditText;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineEditText.js.map