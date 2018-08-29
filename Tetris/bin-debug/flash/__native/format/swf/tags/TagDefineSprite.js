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
                    tags.SWFTimelineContainer = flash.__native.format.swf.SWFTimelineContainer;
                    var TagDefineSprite = (function (_super) {
                        __extends(TagDefineSprite, _super);
                        function TagDefineSprite() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            return _this;
                        }
                        Object.defineProperty(TagDefineSprite.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) {
                            },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineSprite.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            this._characterId = data.readUI16();
                            this.frameCount = data.readUI16();
                            if (async) {
                                this.parseTagsAsync(data, version);
                            }
                            else {
                                this.parseTags(data, version);
                            }
                        };
                        TagDefineSprite.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData;
                            body.writeUI16(this.characterId);
                            body.writeUI16(this.frameCount);
                            this.publishTags(body, version);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineSprite.prototype.clone = function () {
                            var tag = new TagDefineSprite();
                            throw (new Error("Not implemented yet."));
                            return tag;
                        };
                        Object.defineProperty(TagDefineSprite.prototype, "type", {
                            get: function () { return TagDefineSprite.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSprite.prototype, "name", {
                            get: function () { return "DefineSprite"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSprite.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSprite.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineSprite.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "FrameCount: " + this.frameCount +
                                _super.prototype.toString.call(this, indent);
                        };
                        TagDefineSprite.TYPE = 39;
                        return TagDefineSprite;
                    }(tags.SWFTimelineContainer));
                    tags.TagDefineSprite = TagDefineSprite;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineSprite.js.map