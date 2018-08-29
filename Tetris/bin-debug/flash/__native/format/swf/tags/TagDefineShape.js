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
                    tags.SWFShapeWithStyle = flash.__native.format.swf.data.SWFShapeWithStyle;
                    tags.IShapeExporter = flash.__native.format.swf.exporters.core.IShapeExporter;
                    var TagDefineShape = (function () {
                        function TagDefineShape() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.shapeBounds = null;
                            this.shapes = null;
                            this._characterId = 0;
                        }
                        Object.defineProperty(TagDefineShape.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineShape.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            this._characterId = data.readUI16();
                            this.shapeBounds = data.readRECT();
                            this.shapes = data.readSHAPEWITHSTYLE(this.level);
                        };
                        TagDefineShape.prototype.publish = function (data, version) {
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeRECT(this.shapeBounds);
                            body.writeSHAPEWITHSTYLE(this.shapes, this.level);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineShape.prototype.clone = function () {
                            var tag = new TagDefineShape();
                            throw (new Error("Not implemented yet."));
                            return tag;
                        };
                        TagDefineShape.prototype.exportShape = function (handler) {
                            if (handler === void 0) { handler = null; }
                            this.shapes.exportShape(handler);
                        };
                        Object.defineProperty(TagDefineShape.prototype, "type", {
                            get: function () { return TagDefineShape.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineShape.prototype, "name", {
                            get: function () { return "DefineShape"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineShape.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineShape.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineShape.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Bounds: " + this.shapeBounds;
                            str += this.shapes.toString(indent + 2);
                            return str;
                        };
                        TagDefineShape.TYPE = 2;
                        return TagDefineShape;
                    }());
                    tags.TagDefineShape = TagDefineShape;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineShape.js.map