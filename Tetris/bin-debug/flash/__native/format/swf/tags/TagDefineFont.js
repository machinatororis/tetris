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
                    tags.SWFShape = flash.__native.format.swf.data.SWFShape;
                    tags.IShapeExporter = flash.__native.format.swf.exporters.core.IShapeExporter;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDefineFont = (function () {
                        function TagDefineFont() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this._characterId = 0;
                            this._glyphShapeTable = undefined;
                            this._glyphShapeTable = new Array();
                        }
                        Object.defineProperty(TagDefineFont.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont.prototype, "glyphShapeTable", {
                            get: function () { return this._glyphShapeTable; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFont.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            var numGlyphs = ((data.readUI16() >> 1) >>> 0);
                            data.skipBytes((numGlyphs - 1) << 1);
                            for (var i = 0; i < numGlyphs; i++) {
                                this._glyphShapeTable.push(data.readSHAPE(this.unitDivisor));
                            }
                        };
                        TagDefineFont.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            var i = 0;
                            var prevPtr = 0;
                            var len = ((this.glyphShapeTable.length) >>> 0);
                            var shapeTable = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            var offsetTableLength = (((len << 1)) >>> 0);
                            for (i = 0; i < len; i++) {
                                body.writeUI16(shapeTable.position + offsetTableLength);
                                shapeTable.writeSHAPE(this.glyphShapeTable[i]);
                            }
                            body.writeBytes(shapeTable);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineFont.prototype.clone = function () {
                            var tag = new TagDefineFont();
                            throw (new Error("Not implemented yet."));
                            return tag;
                        };
                        TagDefineFont.prototype.exportFont = function (handler, glyphIndex) {
                            handler = strict(handler, 'implements_flash___native_format_swf_exporters_core_IShapeExporter');
                            glyphIndex = ((glyphIndex) >>> 0);
                            this.glyphShapeTable[glyphIndex].exportShape(handler);
                        };
                        Object.defineProperty(TagDefineFont.prototype, "type", {
                            get: function () { return TagDefineFont.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont.prototype, "name", {
                            get: function () { return "DefineFont"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont.prototype, "unitDivisor", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFont.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Glyphs: " + this._glyphShapeTable.length;
                            return str + this.toStringCommon(indent);
                        };
                        TagDefineFont.prototype.toStringCommon = function (indent) {
                            indent = ((indent) >>> 0);
                            var str = "";
                            for (var i = 0, len = ((this._glyphShapeTable.length) >>> 0); i < len; i++) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "[" + i + "] GlyphShapes:";
                                str += this._glyphShapeTable[i].toString(indent + 4);
                            }
                            return str;
                        };
                        TagDefineFont.TYPE = 10;
                        return TagDefineFont;
                    }());
                    tags.TagDefineFont = TagDefineFont;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineFont.js.map