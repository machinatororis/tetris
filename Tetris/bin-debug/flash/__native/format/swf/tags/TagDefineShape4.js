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
                    tags.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDefineShape4 = (function (_super) {
                        __extends(TagDefineShape4, _super);
                        function TagDefineShape4() {
                            var _this = this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            _this.edgeBounds === void 0 && (_this.edgeBounds = null);
                            _this.usesFillWindingRule === void 0 && (_this.usesFillWindingRule = false);
                            _this.usesNonScalingStrokes === void 0 && (_this.usesNonScalingStrokes = false);
                            _this.usesScalingStrokes === void 0 && (_this.usesScalingStrokes = false);
                            _this = _super.call(this) || this;
                            return _this;
                        }
                        TagDefineShape4.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.shapeBounds = data.readRECT();
                            this.edgeBounds = data.readRECT();
                            var flags = data.readUI8();
                            this.usesFillWindingRule = ((flags & 0x04) != 0);
                            this.usesNonScalingStrokes = ((flags & 0x02) != 0);
                            this.usesScalingStrokes = ((flags & 0x01) != 0);
                            this.shapes = data.readSHAPEWITHSTYLE(this.level);
                        };
                        TagDefineShape4.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeRECT(this.shapeBounds);
                            body.writeRECT(this.edgeBounds);
                            var flags = 0;
                            if (this.usesFillWindingRule) {
                                flags |= 0x04;
                            }
                            if (this.usesNonScalingStrokes) {
                                flags |= 0x02;
                            }
                            if (this.usesScalingStrokes) {
                                flags |= 0x01;
                            }
                            body.writeUI8(flags);
                            body.writeSHAPEWITHSTYLE(this.shapes, this.level);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDefineShape4.prototype, "type", {
                            get: function () { return TagDefineShape4.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineShape4.prototype, "name", {
                            get: function () { return "DefineShape4"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineShape4.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineShape4.prototype, "level", {
                            get: function () { return 4; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineShape4.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) + "ID: " + this.characterId + ", ";
                            if (this.usesFillWindingRule) {
                                str += "UsesFillWindingRule, ";
                            }
                            if (this.usesNonScalingStrokes) {
                                str += "UsesNonScalingStrokes, ";
                            }
                            if (this.usesScalingStrokes) {
                                str += "UsesScalingStrokes, ";
                            }
                            str += "ShapeBounds: " + this.shapeBounds + ", EdgeBounds: " + this.edgeBounds;
                            str += this.shapes.toString(indent + 2);
                            return str;
                        };
                        TagDefineShape4.TYPE = 83;
                        return TagDefineShape4;
                    }(tags.TagDefineShape3));
                    tags.TagDefineShape4 = TagDefineShape4;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineShape4.js.map