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
                    tags.BitmapFormat = flash.__native.format.swf.data.consts.BitmapFormat;
                    var TagDefineBitsLossless2 = (function (_super) {
                        __extends(TagDefineBitsLossless2, _super);
                        function TagDefineBitsLossless2() {
                            var _this = _super.call(this) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            return _this;
                        }
                        TagDefineBitsLossless2.prototype.clone = function () {
                            var tag = new TagDefineBitsLossless2();
                            tag.characterId = this.characterId;
                            tag.bitmapFormat = this.bitmapFormat;
                            tag.bitmapWidth = this.bitmapWidth;
                            tag.bitmapHeight = this.bitmapHeight;
                            if (this._zlibBitmapData.length > 0) {
                                tag.zlibBitmapData.writeBytes(this._zlibBitmapData);
                            }
                            return tag;
                        };
                        Object.defineProperty(TagDefineBitsLossless2.prototype, "type", {
                            get: function () { return TagDefineBitsLossless2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsLossless2.prototype, "name", {
                            get: function () { return "DefineBitsLossless2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsLossless2.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsLossless2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineBitsLossless2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Format: " + tags.BitmapFormat.toString(this.bitmapFormat) + ", " +
                                "Size: (" + this.bitmapWidth + "," + this.bitmapHeight + ")";
                        };
                        TagDefineBitsLossless2.TYPE = 36;
                        return TagDefineBitsLossless2;
                    }(tags.TagDefineBitsLossless));
                    tags.TagDefineBitsLossless2 = TagDefineBitsLossless2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineBitsLossless2.js.map