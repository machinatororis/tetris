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
                    tags.BitmapType = flash.__native.format.swf.data.consts.BitmapType;
                    var TagDefineBitsJPEG2 = (function (_super) {
                        __extends(TagDefineBitsJPEG2, _super);
                        function TagDefineBitsJPEG2() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            return _this;
                        }
                        TagDefineBitsJPEG2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            _super.prototype.parse.call(this, data, length, version);
                            if (this.bitmapData.get(0) == 0xff && (this.bitmapData.get(1) == 0xd8 || this.bitmapData.get(1) == 0xd9)) {
                                this.bitmapType = tags.BitmapType.JPEG;
                            }
                            else if (this.bitmapData.get(0) == 0x89 && this.bitmapData.get(1) == 0x50 && this.bitmapData.get(2) == 0x4e && this.bitmapData.get(3) == 0x47 && this.bitmapData.get(4) == 0x0d && this.bitmapData.get(5) == 0x0a && this.bitmapData.get(6) == 0x1a && this.bitmapData.get(7) == 0x0a) {
                                this.bitmapType = tags.BitmapType.PNG;
                            }
                            else if (this.bitmapData.get(0) == 0x47 && this.bitmapData.get(1) == 0x49 && this.bitmapData.get(2) == 0x46 && this.bitmapData.get(3) == 0x38 && this.bitmapData.get(4) == 0x39 && this.bitmapData.get(5) == 0x61) {
                                this.bitmapType = tags.BitmapType.GIF89A;
                            }
                        };
                        TagDefineBitsJPEG2.prototype.clone = function () {
                            var tag = new TagDefineBitsJPEG2;
                            tag.characterId = this.characterId;
                            tag.bitmapType = this.bitmapType;
                            if (this._bitmapData.length > 0) {
                                tag.bitmapData.writeBytes(this._bitmapData);
                            }
                            return tag;
                        };
                        Object.defineProperty(TagDefineBitsJPEG2.prototype, "type", {
                            get: function () { return TagDefineBitsJPEG2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsJPEG2.prototype, "name", {
                            get: function () { return "DefineBitsJPEG2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsJPEG2.prototype, "version", {
                            get: function () { return (this.bitmapType == tags.BitmapType.JPEG) ? 2 : 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsJPEG2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineBitsJPEG2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Type: " + tags.BitmapType.toString(this.bitmapType) + ", " +
                                "BitmapLength: " + this.bitmapData.length;
                            return str;
                        };
                        TagDefineBitsJPEG2.TYPE = 21;
                        return TagDefineBitsJPEG2;
                    }(tags.TagDefineBits));
                    tags.TagDefineBitsJPEG2 = TagDefineBitsJPEG2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineBitsJPEG2.js.map