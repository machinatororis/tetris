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
                    var TagRemoveObject2 = (function (_super) {
                        __extends(TagRemoveObject2, _super);
                        function TagRemoveObject2() {
                            var _this = _super.call(this) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDisplayListTag = null;
                            return _this;
                        }
                        TagRemoveObject2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.depth = data.readUI16();
                        };
                        TagRemoveObject2.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 2);
                            data.writeUI16(this.depth);
                        };
                        Object.defineProperty(TagRemoveObject2.prototype, "type", {
                            get: function () { return TagRemoveObject2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagRemoveObject2.prototype, "name", {
                            get: function () { return "RemoveObject2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagRemoveObject2.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagRemoveObject2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagRemoveObject2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "Depth: " + this.depth;
                        };
                        TagRemoveObject2.TYPE = 28;
                        return TagRemoveObject2;
                    }(tags.TagRemoveObject));
                    tags.TagRemoveObject2 = TagRemoveObject2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagRemoveObject2.js.map