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
                    var TagDefineFontInfo = (function () {
                        function TagDefineFontInfo() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.fontId = 0;
                            this.fontName = null;
                            this.smallText = false;
                            this.shiftJIS = false;
                            this.ansi = false;
                            this.italic = false;
                            this.bold = false;
                            this.wideCodes = false;
                            this.langCode = 0;
                            this._codeTable = undefined;
                            this.langCodeLength = 0;
                            this._codeTable = new Array();
                        }
                        Object.defineProperty(TagDefineFontInfo.prototype, "codeTable", {
                            get: function () { return this._codeTable; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFontInfo.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.fontId = data.readUI16();
                            var fontNameLen = data.readUI8();
                            var fontNameRaw = new tags.ByteArray();
                            data.readBytes(fontNameRaw, 0, fontNameLen);
                            this.fontName = fontNameRaw.readUTFBytes(fontNameLen);
                            var flags = data.readUI8();
                            this.smallText = ((flags & 0x20) != 0);
                            this.shiftJIS = ((flags & 0x10) != 0);
                            this.ansi = ((flags & 0x08) != 0);
                            this.italic = ((flags & 0x04) != 0);
                            this.bold = ((flags & 0x02) != 0);
                            this.wideCodes = ((flags & 0x01) != 0);
                            this.parseLangCode(data);
                            var numGlyphs = ((length - fontNameLen - this.langCodeLength - 4) >>> 0);
                            for (var i = 0; i < numGlyphs; i++) {
                                this._codeTable.push(this.wideCodes ? data.readUI16() : data.readUI8());
                            }
                        };
                        TagDefineFontInfo.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.fontId);
                            var fontNameRaw = new tags.ByteArray();
                            fontNameRaw.writeUTFBytes(this.fontName);
                            body.writeUI8(fontNameRaw.length);
                            body.writeBytes(fontNameRaw);
                            var flags = 0;
                            if (this.smallText) {
                                flags |= 0x20;
                            }
                            if (this.shiftJIS) {
                                flags |= 0x10;
                            }
                            if (this.ansi) {
                                flags |= 0x08;
                            }
                            if (this.italic) {
                                flags |= 0x04;
                            }
                            if (this.bold) {
                                flags |= 0x02;
                            }
                            if (this.wideCodes) {
                                flags |= 0x01;
                            }
                            body.writeUI8(flags);
                            this.publishLangCode(body);
                            var numGlyphs = ((this._codeTable.length) >>> 0);
                            for (var i = 0; i < numGlyphs; i++) {
                                if (this.wideCodes) {
                                    body.writeUI16(this._codeTable[i]);
                                }
                                else {
                                    body.writeUI8(this._codeTable[i]);
                                }
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineFontInfo.prototype.parseLangCode = function (data) {
                            data = strict(data, tags.SWFData);
                        };
                        TagDefineFontInfo.prototype.publishLangCode = function (data) {
                            data = strict(data, tags.SWFData);
                        };
                        Object.defineProperty(TagDefineFontInfo.prototype, "type", {
                            get: function () { return TagDefineFontInfo.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontInfo.prototype, "name", {
                            get: function () { return "DefineFontInfo"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontInfo.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontInfo.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFontInfo.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "FontID: " + this.fontId + ", " +
                                "FontName: " + this.fontName + ", " +
                                "Italic: " + this.italic + ", " +
                                "Bold: " + this.bold + ", " +
                                "Codes: " + this._codeTable.length;
                        };
                        TagDefineFontInfo.TYPE = 13;
                        return TagDefineFontInfo;
                    }());
                    tags.TagDefineFontInfo = TagDefineFontInfo;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineFontInfo.js.map