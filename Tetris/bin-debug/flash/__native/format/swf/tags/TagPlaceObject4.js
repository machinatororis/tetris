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
                    var TagPlaceObject4 = (function (_super) {
                        __extends(TagPlaceObject4, _super);
                        function TagPlaceObject4() {
                            var _this = _super.call(this) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.implements_flash___native_format_swf_tags_IDisplayListTag = null;
                            return _this;
                        }
                        TagPlaceObject4.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            _super.prototype.parse.call(this, data, length, version, async);
                            if (data.bytesAvailable > 0) {
                                this.metaData = data.readObject();
                            }
                        };
                        TagPlaceObject4.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = this.prepareBody();
                            if (this.metaData != null) {
                                body.writeObject(this.metaData);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagPlaceObject4.prototype, "type", {
                            get: function () { return TagPlaceObject4.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject4.prototype, "name", {
                            get: function () { return "PlaceObject4"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject4.prototype, "version", {
                            get: function () { return 19; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagPlaceObject4.prototype, "level", {
                            get: function () { return 4; },
                            enumerable: true,
                            configurable: true
                        });
                        TagPlaceObject4.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = _super.prototype.toString.call(this, indent);
                            if (this.metaData != null) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "MetaData: yes";
                            }
                            return str;
                        };
                        TagPlaceObject4.TYPE = 94;
                        return TagPlaceObject4;
                    }(tags.TagPlaceObject3));
                    tags.TagPlaceObject4 = TagPlaceObject4;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagPlaceObject4.js.map