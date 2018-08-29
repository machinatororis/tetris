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
                    var TagDefineFontInfo2 = (function (_super) {
                        __extends(TagDefineFontInfo2, _super);
                        function TagDefineFontInfo2() {
                            var _this = _super.call(this) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            return _this;
                        }
                        TagDefineFontInfo2.prototype.parseLangCode = function (data) {
                            data = strict(data, tags.SWFData);
                            this.langCode = data.readUI8();
                            this.langCodeLength = 1;
                        };
                        TagDefineFontInfo2.prototype.publishLangCode = function (data) {
                            data = strict(data, tags.SWFData);
                            data.writeUI8(this.langCode);
                        };
                        Object.defineProperty(TagDefineFontInfo2.prototype, "type", {
                            get: function () { return TagDefineFontInfo2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontInfo2.prototype, "name", {
                            get: function () { return "DefineFontInfo2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontInfo2.prototype, "version", {
                            get: function () { return 6; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineFontInfo2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineFontInfo2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "FontID: " + this.fontId + ", " +
                                "FontName: " + this.fontName + ", " +
                                "Italic: " + this.italic + ", " +
                                "Bold: " + this.bold + ", " +
                                "LanguageCode: " + this.langCode + ", " +
                                "Codes: " + this._codeTable.length;
                        };
                        TagDefineFontInfo2.TYPE = 62;
                        return TagDefineFontInfo2;
                    }(tags.TagDefineFontInfo));
                    tags.TagDefineFontInfo2 = TagDefineFontInfo2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineFontInfo2.js.map