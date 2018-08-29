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
                    tags.SWFMorphLineStyle2 = flash.__native.format.swf.data.SWFMorphLineStyle2;
                    tags.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDefineMorphShape2 = (function (_super) {
                        __extends(TagDefineMorphShape2, _super);
                        function TagDefineMorphShape2() {
                            var _this = this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.startEdgeBounds === void 0 && (_this.startEdgeBounds = null);
                            _this.endEdgeBounds === void 0 && (_this.endEdgeBounds = null);
                            _this.usesNonScalingStrokes === void 0 && (_this.usesNonScalingStrokes = false);
                            _this.usesScalingStrokes === void 0 && (_this.usesScalingStrokes = false);
                            _this = _super.call(this) || this;
                            return _this;
                        }
                        TagDefineMorphShape2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.startBounds = data.readRECT();
                            this.endBounds = data.readRECT();
                            this.startEdgeBounds = data.readRECT();
                            this.endEdgeBounds = data.readRECT();
                            var flags = data.readUI8();
                            this.usesNonScalingStrokes = ((flags & 0x02) != 0);
                            this.usesScalingStrokes = ((flags & 0x01) != 0);
                            var offset = data.readUI32();
                            var i = 0;
                            var fillStyleCount = data.readUI8();
                            if (fillStyleCount == 0xff) {
                                fillStyleCount = data.readUI16();
                            }
                            for (i = 0; i < fillStyleCount; i++) {
                                this._morphFillStyles.push(data.readMORPHFILLSTYLE());
                            }
                            var lineStyleCount = data.readUI8();
                            if (lineStyleCount == 0xff) {
                                lineStyleCount = data.readUI16();
                            }
                            for (i = 0; i < lineStyleCount; i++) {
                                this._morphLineStyles.push(data.readMORPHLINESTYLE2());
                            }
                            this.startEdges = data.readSHAPE();
                            this.endEdges = data.readSHAPE();
                        };
                        TagDefineMorphShape2.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeRECT(this.startBounds);
                            body.writeRECT(this.endBounds);
                            body.writeRECT(this.startEdgeBounds);
                            body.writeRECT(this.endEdgeBounds);
                            var flags = 0;
                            if (this.usesNonScalingStrokes) {
                                flags |= 0x02;
                            }
                            if (this.usesScalingStrokes) {
                                flags |= 0x01;
                            }
                            body.writeUI8(flags);
                            var startBytes = new tags.SWFData();
                            var i = 0;
                            var fillStyleCount = ((this._morphFillStyles.length) >>> 0);
                            if (fillStyleCount > 0xfe) {
                                startBytes.writeUI8(0xff);
                                startBytes.writeUI16(fillStyleCount);
                            }
                            else {
                                startBytes.writeUI8(fillStyleCount);
                            }
                            for (i = 0; i < fillStyleCount; i++) {
                                startBytes.writeMORPHFILLSTYLE(this._morphFillStyles[i]);
                            }
                            var lineStyleCount = ((this._morphLineStyles.length) >>> 0);
                            if (lineStyleCount > 0xfe) {
                                startBytes.writeUI8(0xff);
                                startBytes.writeUI16(lineStyleCount);
                            }
                            else {
                                startBytes.writeUI8(lineStyleCount);
                            }
                            for (i = 0; i < lineStyleCount; i++) {
                                startBytes.writeMORPHLINESTYLE2(strict(this._morphLineStyles[i], tags.SWFMorphLineStyle2));
                            }
                            startBytes.writeSHAPE(this.startEdges);
                            body.writeUI32(startBytes.length);
                            body.writeBytes(startBytes);
                            body.writeSHAPE(this.endEdges);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDefineMorphShape2.prototype, "type", {
                            get: function () { return TagDefineMorphShape2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineMorphShape2.prototype, "name", {
                            get: function () { return "DefineMorphShape2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineMorphShape2.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineMorphShape2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineMorphShape2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var i = 0;
                            var len = 0;
                            var indent2 = tags.StringUtils.repeat(indent + 2);
                            var indent4 = tags.StringUtils.repeat(indent + 4);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) + "ID: " + this.characterId;
                            str += "\n" + indent2 + "Bounds:";
                            str += "\n" + indent4 + "StartBounds: " + this.startBounds.toString();
                            str += "\n" + indent4 + "EndBounds: " + this.endBounds.toString();
                            str += "\n" + indent4 + "StartEdgeBounds: " + this.startEdgeBounds.toString();
                            str += "\n" + indent4 + "EndEdgeBounds: " + this.endEdgeBounds.toString();
                            if ((len = ((this._morphFillStyles.length) >>> 0)) > 0) {
                                str += "\n" + indent2 + "FillStyles:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + indent4 + "[" + (i + 1) + "] " + this._morphFillStyles[i].toString();
                                }
                            }
                            if ((len = ((this._morphLineStyles.length) >>> 0)) > 0) {
                                str += "\n" + indent2 + "LineStyles:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + indent4 + "[" + (i + 1) + "] " + this._morphLineStyles[i].toString();
                                }
                            }
                            str += this.startEdges.toString(indent + 2);
                            str += this.endEdges.toString(indent + 2);
                            return str;
                        };
                        TagDefineMorphShape2.TYPE = 84;
                        return TagDefineMorphShape2;
                    }(tags.TagDefineMorphShape));
                    tags.TagDefineMorphShape2 = TagDefineMorphShape2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineMorphShape2.js.map