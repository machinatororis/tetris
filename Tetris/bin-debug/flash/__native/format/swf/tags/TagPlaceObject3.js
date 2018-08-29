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
                    tags.BlendMode = flash.__native.format.swf.data.consts.BlendMode;
                    tags.ColorUtils = flash.__native.format.swf.utils.ColorUtils;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagPlaceObject3 = (function (_super) {
                        __extends(TagPlaceObject3, _super);
                        function TagPlaceObject3() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDisplayListTag = null;
                            return _this;
                        }
                        TagPlaceObject3.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            var flags1 = data.readUI8();
                            this.hasClipActions = (flags1 & 0x80) != 0;
                            this.hasClipDepth = (flags1 & 0x40) != 0;
                            this.hasName = (flags1 & 0x20) != 0;
                            this.hasRatio = (flags1 & 0x10) != 0;
                            this.hasColorTransform = (flags1 & 0x08) != 0;
                            this.hasMatrix = (flags1 & 0x04) != 0;
                            this.hasCharacter = (flags1 & 0x02) != 0;
                            this.hasMove = (flags1 & 0x01) != 0;
                            var flags2 = data.readUI8();
                            this.hasOpaqueBackground = (flags2 & 0x40) != 0;
                            this.hasVisible = (flags2 & 0x20) != 0;
                            this.hasImage = (flags2 & 0x10) != 0;
                            this.hasClassName = (flags2 & 0x08) != 0;
                            this.hasCacheAsBitmap = (flags2 & 0x04) != 0;
                            this.hasBlendMode = (flags2 & 0x02) != 0;
                            this.hasFilterList = (flags2 & 0x01) != 0;
                            this.depth = data.readUI16();
                            if (this.hasClassName) {
                                this.className = data.readString();
                            }
                            if (this.hasCharacter) {
                                this.characterId = data.readUI16();
                            }
                            if (this.hasMatrix) {
                                this.matrix = data.readMATRIX();
                            }
                            if (this.hasColorTransform) {
                                this.colorTransform = data.readCXFORMWITHALPHA();
                            }
                            if (this.hasRatio) {
                                this.ratio = data.readUI16();
                            }
                            if (this.hasName) {
                                this.instanceName = data.readString();
                            }
                            if (this.hasClipDepth) {
                                this.clipDepth = data.readUI16();
                            }
                            if (this.hasFilterList) {
                                var numberOfFilters = data.readUI8();
                                for (var i = 0; i < numberOfFilters; i++) {
                                    this.surfaceFilterList.push(data.readFILTER());
                                }
                            }
                            if (this.hasBlendMode) {
                                this.blendMode = data.readUI8();
                            }
                            if (this.hasCacheAsBitmap) {
                                this.bitmapCache = data.readUI8();
                            }
                            if (this.hasVisible) {
                                this.visible = data.readUI8();
                            }
                            if (this.hasOpaqueBackground) {
                                this.bitmapBackgroundColor = data.readRGBA();
                            }
                            if (this.hasClipActions) {
                                this.clipActions = data.readCLIPACTIONS(version);
                            }
                        };
                        TagPlaceObject3.prototype.prepareBody = function () {
                            var body = new tags.SWFData();
                            var flags1 = 0;
                            if (this.hasClipActions) {
                                flags1 |= 0x80;
                            }
                            if (this.hasClipDepth) {
                                flags1 |= 0x40;
                            }
                            if (this.hasName) {
                                flags1 |= 0x20;
                            }
                            if (this.hasRatio) {
                                flags1 |= 0x10;
                            }
                            if (this.hasColorTransform) {
                                flags1 |= 0x08;
                            }
                            if (this.hasMatrix) {
                                flags1 |= 0x04;
                            }
                            if (this.hasCharacter) {
                                flags1 |= 0x02;
                            }
                            if (this.hasMove) {
                                flags1 |= 0x01;
                            }
                            body.writeUI8(flags1);
                            var flags2 = 0;
                            if (this.hasOpaqueBackground) {
                                flags2 |= 0x40;
                            }
                            if (this.hasVisible) {
                                flags2 |= 0x20;
                            }
                            if (this.hasImage) {
                                flags2 |= 0x10;
                            }
                            if (this.hasClassName) {
                                flags2 |= 0x08;
                            }
                            if (this.hasCacheAsBitmap) {
                                flags2 |= 0x04;
                            }
                            if (this.hasBlendMode) {
                                flags2 |= 0x02;
                            }
                            if (this.hasFilterList) {
                                flags2 |= 0x01;
                            }
                            body.writeUI8(flags2);
                            body.writeUI16(this.depth);
                            if (this.hasClassName) {
                                body.writeString(this.className);
                            }
                            if (this.hasCharacter) {
                                body.writeUI16(this.characterId);
                            }
                            if (this.hasMatrix) {
                                body.writeMATRIX(this.matrix);
                            }
                            if (this.hasColorTransform) {
                                body.writeCXFORM(this.colorTransform);
                            }
                            if (this.hasRatio) {
                                body.writeUI16(this.ratio);
                            }
                            if (this.hasName) {
                                body.writeString(this.instanceName);
                            }
                            if (this.hasClipDepth) {
                                body.writeUI16(this.clipDepth);
                            }
                            if (this.hasFilterList) {
                                var numberOfFilters = ((this.surfaceFilterList.length) >>> 0);
                                body.writeUI8(numberOfFilters);
                                for (var i = 0; i < numberOfFilters; i++) {
                                    body.writeFILTER(this.surfaceFilterList[i]);
                                }
                            }
                            if (this.hasBlendMode) {
                                body.writeUI8(this.blendMode);
                            }
                            if (this.hasCacheAsBitmap) {
                                body.writeUI8(this.bitmapCache);
                            }
                            if (this.hasVisible) {
                                body.writeUI8(this.visible);
                            }
                            if (this.hasOpaqueBackground) {
                                body.writeRGBA(this.bitmapBackgroundColor);
                            }
                            if (this.hasClipActions) {
                                body.writeCLIPACTIONS(this.clipActions, this.version);
                            }
                            return body;
                        };
                        TagPlaceObject3.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = this.prepareBody();
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagPlaceObject3.prototype, "type", {
                            get: function () { return TagPlaceObject3.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject3.prototype, "name", {
                            get: function () { return "PlaceObject3"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject3.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject3.prototype, "level", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        TagPlaceObject3.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "Depth: " + this.depth;
                            if (this.hasClassName) {
                                str += ", ClassName: " + this.className;
                            }
                            if (this.hasCharacter) {
                                str += ", CharacterID: " + this.characterId;
                            }
                            if (this.hasMatrix) {
                                str += ", Matrix: " + this.matrix.toString();
                            }
                            if (this.hasColorTransform) {
                                str += ", ColorTransform: " + this.colorTransform;
                            }
                            if (this.hasRatio) {
                                str += ", Ratio: " + this.ratio;
                            }
                            if (this.hasName) {
                                str += ", Name: " + this.instanceName;
                            }
                            if (this.hasClipDepth) {
                                str += ", ClipDepth: " + this.clipDepth;
                            }
                            if (this.hasBlendMode) {
                                str += ", BlendMode: " + tags.BlendMode.toString(this.blendMode);
                            }
                            if (this.hasCacheAsBitmap) {
                                str += ", CacheAsBitmap: " + this.bitmapCache;
                            }
                            if (this.hasVisible) {
                                str += ", Visible: " + this.visible;
                            }
                            if (this.hasOpaqueBackground) {
                                str += ", BackgroundColor: " + tags.ColorUtils.rgbaToString(this.bitmapBackgroundColor);
                            }
                            if (this.hasFilterList) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Filters:";
                                for (var i = 0, len = ((this.surfaceFilterList.length) >>> 0); i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this.surfaceFilterList[i].toString(indent + 4);
                                }
                            }
                            if (this.hasClipActions) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + this.clipActions.toString(indent + 2);
                            }
                            return str;
                        };
                        TagPlaceObject3.TYPE = 70;
                        return TagPlaceObject3;
                    }(tags.TagPlaceObject2));
                    tags.TagPlaceObject3 = TagPlaceObject3;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagPlaceObject3.js.map