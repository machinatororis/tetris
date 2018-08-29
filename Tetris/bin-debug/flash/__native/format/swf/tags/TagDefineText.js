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
                    tags.SWFGlyphEntry = flash.__native.format.swf.data.SWFGlyphEntry;
                    tags.SWFMatrix = flash.__native.format.swf.data.SWFMatrix;
                    tags.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                    tags.SWFTextRecord = flash.__native.format.swf.data.SWFTextRecord;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDefineText = (function () {
                        function TagDefineText() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.textBounds = null;
                            this.textMatrix = null;
                            this._characterId = 0;
                            this._records = undefined;
                            this._records = new Array();
                        }
                        Object.defineProperty(TagDefineText.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineText.prototype, "records", {
                            get: function () { return this._records; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineText.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.textBounds = data.readRECT();
                            this.textMatrix = data.readMATRIX();
                            var glyphBits = data.readUI8();
                            var advanceBits = data.readUI8();
                            var record;
                            while ((record = data.readTEXTRECORD(glyphBits, advanceBits, record, this.level)) != null) {
                                this._records.push(record);
                            }
                        };
                        TagDefineText.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            var i = 0;
                            var j = 0;
                            var record;
                            body.writeUI16(this.characterId);
                            body.writeRECT(this.textBounds);
                            body.writeMATRIX(this.textMatrix);
                            var glyphBitsValues = [];
                            var advanceBitsValues = [];
                            var recordsLen = ((this._records.length) >>> 0);
                            for (i = 0; i < recordsLen; i++) {
                                record = strict(this._records[i], tags.SWFTextRecord);
                                var glyphCount = ((record.glyphEntries.length) >>> 0);
                                for (j = 0; j < glyphCount; j++) {
                                    var glyphEntry = strict(record.glyphEntries[j], tags.SWFGlyphEntry);
                                    glyphBitsValues.push(glyphEntry.index);
                                    advanceBitsValues.push(glyphEntry.advance);
                                }
                            }
                            var glyphBits = body.calculateMaxBits(false, glyphBitsValues);
                            var advanceBits = body.calculateMaxBits(true, advanceBitsValues);
                            body.writeUI8(glyphBits);
                            body.writeUI8(advanceBits);
                            record = null;
                            for (i = 0; i < recordsLen; i++) {
                                body.writeTEXTRECORD(this._records[i], glyphBits, advanceBits, record, this.level);
                                record = strict(this._records[i], tags.SWFTextRecord);
                            }
                            body.writeUI8(0);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineText.prototype.clone = function () {
                            var tag = new TagDefineText();
                            tag.characterId = this.characterId;
                            tag.textBounds = this.textBounds.clone();
                            tag.textMatrix = this.textMatrix.clone();
                            for (var i = 0, len = ((this._records.length) >>> 0); i < len; i++) {
                                tag.records.push(this._records[i].clone());
                            }
                            return tag;
                        };
                        Object.defineProperty(TagDefineText.prototype, "type", {
                            get: function () { return TagDefineText.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineText.prototype, "name", {
                            get: function () { return "DefineText"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineText.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineText.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineText.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Bounds: " + this.textBounds + ", " +
                                "Matrix: " + this.textMatrix;
                            if (this._records.length > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "TextRecords:";
                                for (var i = 0, len = ((this._records.length) >>> 0); i < len; i++) {
                                    str += "\n" +
                                        tags.StringUtils.repeat(indent + 4) +
                                        "[" + i + "] " +
                                        this._records[i].toString(indent + 4);
                                }
                            }
                            return str;
                        };
                        TagDefineText.TYPE = 11;
                        return TagDefineText;
                    }());
                    tags.TagDefineText = TagDefineText;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineText.js.map