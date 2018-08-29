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
                    var TagDefineFont3 = (function (_super) {
                        __extends(TagDefineFont3, _super);
                        function TagDefineFont3() {
                            var _this = _super.call(this) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            return _this;
                        }
                        Object.defineProperty(TagDefineFont3.prototype, "type", {
                            get: function () { return TagDefineFont3.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont3.prototype, "name", {
                            get: function () { return "DefineFont3"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont3.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont3.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFont3.prototype, "unitDivisor", {
                            get: function () { return 20; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFont3.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "FontName: " + this.fontName + ", " +
                                "Italic: " + this.italic + ", " +
                                "Bold: " + this.bold + ", " +
                                "Glyphs: " + this._glyphShapeTable.length;
                            return str + this.toStringCommon(indent);
                        };
                        TagDefineFont3.TYPE = 75;
                        return TagDefineFont3;
                    }(tags.TagDefineFont2));
                    tags.TagDefineFont3 = TagDefineFont3;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineFont3.js.map