var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
                    tags.SWFKerningRecord = flash.__native.format.swf.data.SWFKerningRecord;
                    tags.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    tags.ByteArray = flash.utils.ByteArray;
                    var TagDefineFont2 = (function (_super) {
                        __extends(TagDefineFont2, _super);
                        function TagDefineFont2() {
                            var _this = this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            _this.hasLayout === void 0 && (_this.hasLayout = false);
                            _this.shiftJIS === void 0 && (_this.shiftJIS = false);
                            _this.smallText === void 0 && (_this.smallText = false);
                            _this.ansi === void 0 && (_this.ansi = false);
                            _this.wideOffsets === void 0 && (_this.wideOffsets = false);
                            _this.wideCodes === void 0 && (_this.wideCodes = false);
                            _this.italic === void 0 && (_this.italic = false);
                            _this.bold === void 0 && (_this.bold = false);
                            _this.languageCode === void 0 && (_this.languageCode = 0);
                            _this.fontName === void 0 && (_this.fontName = null);
                            _this.ascent === void 0 && (_this.ascent = 0);
                            _this.descent === void 0 && (_this.descent = 0);
                            _this.leading === void 0 && (_this.leading = 0);
                            _this._codeTable === void 0 && (_this._codeTable = undefined);
                            _this._fontAdvanceTable === void 0 && (_this._fontAdvanceTable = undefined);
                            _this._fontBoundsTable === void 0 && (_this._fontBoundsTable = undefined);
                            _this._fontKerningTable === void 0 && (_this._fontKerningTable = undefined);
                            _this = _super.call(this) || this;
                            _this._codeTable = new Array();
                            _this._fontAdvanceTable = new Array();
                            _this._fontBoundsTable = new Array();
                            _this._fontKerningTable = new Array();
                            return _this;
                        }
                        Object.defineProperty(TagDefineFont2.prototype, "codeTable", {
                            get: function () { return this._codeTable; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont2.prototype, "fontAdvanceTable", {
                            get: function () { return this._fontAdvanceTable; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont2.prototype, "fontBoundsTable", {
                            get: function () { return this._fontBoundsTable; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont2.prototype, "fontKerningTable", {
                            get: function () { return this._fontKerningTable; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFont2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            var flags = data.readUI8();
                            this.hasLayout = ((flags & 0x80) != 0);
                            this.shiftJIS = ((flags & 0x40) != 0);
                            this.smallText = ((flags & 0x20) != 0);
                            this.ansi = ((flags & 0x10) != 0);
                            this.wideOffsets = ((flags & 0x08) != 0);
                            this.wideCodes = ((flags & 0x04) != 0);
                            this.italic = ((flags & 0x02) != 0);
                            this.bold = ((flags & 0x01) != 0);
                            this.languageCode = data.readLANGCODE();
                            var fontNameLen = data.readUI8();
                            var fontNameRaw = new tags.ByteArray();
                            data.readBytes(fontNameRaw, 0, fontNameLen);
                            this.fontName = fontNameRaw.readUTFBytes(fontNameLen - 1);
                            var i = 0;
                            var numGlyphs = data.readUI16();
                            if (numGlyphs > 0) {
                                data.skipBytes(numGlyphs << (this.wideOffsets ? 2 : 1));
                                var codeTableOffset = (this.wideOffsets ? data.readUI32() : data.readUI16());
                                for (i = 0; i < numGlyphs; i++) {
                                    this._glyphShapeTable.push(data.readSHAPE());
                                }
                                for (i = 0; i < numGlyphs; i++) {
                                    this._codeTable.push(this.wideCodes ? data.readUI16() : data.readUI8());
                                }
                            }
                            if (this.hasLayout) {
                                this.ascent = data.readUI16();
                                this.descent = data.readUI16();
                                this.leading = data.readSI16();
                                for (i = 0; i < numGlyphs; i++) {
                                    this._fontAdvanceTable.push(data.readSI16());
                                }
                                for (i = 0; i < numGlyphs; i++) {
                                    this._fontBoundsTable.push(data.readRECT());
                                }
                                var kerningCount = data.readUI16();
                                for (i = 0; i < kerningCount; i++) {
                                    this._fontKerningTable.push(data.readKERNINGRECORD(this.wideCodes));
                                }
                            }
                        };
                        TagDefineFont2.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            var numGlyphs = ((this.glyphShapeTable.length) >>> 0);
                            var i = 0;
                            body.writeUI16(this.characterId);
                            var flags = 0;
                            if (this.hasLayout) {
                                flags |= 0x80;
                            }
                            if (this.shiftJIS) {
                                flags |= 0x40;
                            }
                            if (this.smallText) {
                                flags |= 0x20;
                            }
                            if (this.ansi) {
                                flags |= 0x10;
                            }
                            if (this.wideOffsets) {
                                flags |= 0x08;
                            }
                            if (this.wideCodes) {
                                flags |= 0x04;
                            }
                            if (this.italic) {
                                flags |= 0x02;
                            }
                            if (this.bold) {
                                flags |= 0x01;
                            }
                            body.writeUI8(flags);
                            body.writeLANGCODE(this.languageCode);
                            var fontNameRaw = new tags.ByteArray();
                            fontNameRaw.writeUTFBytes(this.fontName);
                            body.writeUI8(fontNameRaw.length);
                            body.writeBytes(fontNameRaw);
                            body.writeUI16(numGlyphs);
                            if (numGlyphs > 0) {
                                var offsetTableLength = (((numGlyphs << (this.wideOffsets ? 2 : 1))) >>> 0);
                                var codeTableOffsetLength = (((this.wideOffsets ? 4 : 2)) >>> 0);
                                var codeTableLength = (((this.wideOffsets ? (numGlyphs << 1) : numGlyphs)) >>> 0);
                                var offset = ((offsetTableLength + codeTableOffsetLength) >>> 0);
                                var shapeTable = new tags.SWFData();
                                for (i = 0; i < numGlyphs; i++) {
                                    if (this.wideOffsets) {
                                        body.writeUI32(offset + shapeTable.position);
                                    }
                                    else {
                                        body.writeUI16(offset + shapeTable.position);
                                    }
                                    shapeTable.writeSHAPE(this.glyphShapeTable[i]);
                                }
                                if (this.wideOffsets) {
                                    body.writeUI32(offset + shapeTable.length);
                                }
                                else {
                                    body.writeUI16(offset + shapeTable.length);
                                }
                                body.writeBytes(shapeTable);
                                for (i = 0; i < numGlyphs; i++) {
                                    if (this.wideCodes) {
                                        body.writeUI16(this.codeTable[i]);
                                    }
                                    else {
                                        body.writeUI8(this.codeTable[i]);
                                    }
                                }
                            }
                            if (this.hasLayout) {
                                body.writeUI16(this.ascent);
                                body.writeUI16(this.descent);
                                body.writeSI16(this.leading);
                                for (i = 0; i < numGlyphs; i++) {
                                    body.writeSI16(this.fontAdvanceTable[i]);
                                }
                                for (i = 0; i < numGlyphs; i++) {
                                    body.writeRECT(this.fontBoundsTable[i]);
                                }
                                var kerningCount = ((this.fontKerningTable.length) >>> 0);
                                body.writeUI16(kerningCount);
                                for (i = 0; i < kerningCount; i++) {
                                    body.writeKERNINGRECORD(this.fontKerningTable[i], this.wideCodes);
                                }
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDefineFont2.prototype, "type", {
                            get: function () { return TagDefineFont2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont2.prototype, "name", {
                            get: function () { return "DefineFont2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont2.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFont2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "FontName: " + this.fontName + ", " +
                                "Italic: " + this.italic + ", " +
                                "Bold: " + this.bold + ", " +
                                "Glyphs: " + this._glyphShapeTable.length;
                            return str + this.toStringCommon(indent);
                        };
                        TagDefineFont2.prototype.toStringCommon = function (indent) {
                            indent = ((indent) >>> 0);
                            var i = 0;
                            var len = 0;
                            var str = _super.prototype.toStringCommon.call(this, indent);
                            if (this.hasLayout) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Ascent: " + this.ascent;
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Descent: " + this.descent;
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Leading: " + this.leading;
                            }
                            if ((len = ((this._codeTable.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "CodeTable:";
                                for (i = 0; i < len; i++) {
                                    if ((i & 0x0f) == 0) {
                                        str += "\n" + tags.StringUtils.repeat(indent + 4) + this._codeTable[i].toString();
                                    }
                                    else {
                                        str += ", " + this._codeTable[i].toString();
                                    }
                                }
                            }
                            if ((len = ((this._fontAdvanceTable.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "FontAdvanceTable:";
                                for (i = 0; i < len; i++) {
                                    if ((i & 0x07) == 0) {
                                        str += "\n" + tags.StringUtils.repeat(indent + 4) + this._fontAdvanceTable[i].toString();
                                    }
                                    else {
                                        str += ", " + this._fontAdvanceTable[i].toString();
                                    }
                                }
                            }
                            if ((len = ((this._fontBoundsTable.length) >>> 0)) > 0) {
                                var hasNonNullBounds = false;
                                for (i = 0; i < len; i++) {
                                    var rect = strict(this._fontBoundsTable[i], tags.SWFRectangle);
                                    if (rect.xmin != 0 || rect.xmax != 0 || rect.ymin != 0 || rect.ymax != 0) {
                                        hasNonNullBounds = true;
                                        break;
                                    }
                                }
                                if (hasNonNullBounds) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 2) + "FontBoundsTable:";
                                    for (i = 0; i < len; i++) {
                                        str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._fontBoundsTable[i].toString();
                                    }
                                }
                            }
                            if ((len = ((this._fontKerningTable.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "KerningTable:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._fontKerningTable[i].toString();
                                }
                            }
                            return str;
                        };
                        TagDefineFont2.TYPE = 48;
                        return TagDefineFont2;
                    }(tags.TagDefineFont));
                    tags.TagDefineFont2 = TagDefineFont2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineFont2.js.map