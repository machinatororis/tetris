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
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagPlaceObject2 = (function (_super) {
                        __extends(TagPlaceObject2, _super);
                        function TagPlaceObject2() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDisplayListTag = null;
                            return _this;
                        }
                        TagPlaceObject2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            var flags = data.readUI8();
                            this.hasClipActions = (flags & 0x80) != 0;
                            this.hasClipDepth = (flags & 0x40) != 0;
                            this.hasName = (flags & 0x20) != 0;
                            this.hasRatio = (flags & 0x10) != 0;
                            this.hasColorTransform = (flags & 0x08) != 0;
                            this.hasMatrix = (flags & 0x04) != 0;
                            this.hasCharacter = (flags & 0x02) != 0;
                            this.hasMove = (flags & 0x01) != 0;
                            this.depth = data.readUI16();
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
                            if (this.hasClipActions) {
                                this.clipActions = data.readCLIPACTIONS(version);
                            }
                        };
                        TagPlaceObject2.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var flags = 0;
                            var body = new tags.SWFData();
                            if (this.hasMove) {
                                flags |= 0x01;
                            }
                            if (this.hasCharacter) {
                                flags |= 0x02;
                            }
                            if (this.hasMatrix) {
                                flags |= 0x04;
                            }
                            if (this.hasColorTransform) {
                                flags |= 0x08;
                            }
                            if (this.hasRatio) {
                                flags |= 0x10;
                            }
                            if (this.hasName) {
                                flags |= 0x20;
                            }
                            if (this.hasClipDepth) {
                                flags |= 0x40;
                            }
                            if (this.hasClipActions) {
                                flags |= 0x80;
                            }
                            body.writeUI8(flags);
                            body.writeUI16(this.depth);
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
                            if (this.hasClipActions) {
                                body.writeCLIPACTIONS(this.clipActions, version);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagPlaceObject2.prototype, "type", {
                            get: function () { return TagPlaceObject2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject2.prototype, "name", {
                            get: function () { return "PlaceObject2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject2.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagPlaceObject2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "Depth: " + this.depth;
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
                            if (this.hasClipActions && this.clipActions != null) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + this.clipActions.toString(indent + 2, flags);
                            }
                            return str;
                        };
                        TagPlaceObject2.TYPE = 26;
                        return TagPlaceObject2;
                    }(tags.TagPlaceObject));
                    tags.TagPlaceObject2 = TagPlaceObject2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagPlaceObject2.js.map