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
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDefineText2 = (function (_super) {
                        __extends(TagDefineText2, _super);
                        function TagDefineText2() {
                            var _this = _super.call(this) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            return _this;
                        }
                        Object.defineProperty(TagDefineText2.prototype, "type", {
                            get: function () { return TagDefineText2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineText2.prototype, "name", {
                            get: function () { return "DefineText2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineText2.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineText2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineText2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Bounds: " + this.textBounds + ", " +
                                "Matrix: " + this.textMatrix;
                            if (this._records.length > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "TextRecords:";
                                for (var i = 0, len = ((this._records.length) >>> 0); i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._records[i].toString();
                                }
                            }
                            return str;
                        };
                        TagDefineText2.TYPE = 33;
                        return TagDefineText2;
                    }(tags.TagDefineText));
                    tags.TagDefineText2 = TagDefineText2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineText2.js.map