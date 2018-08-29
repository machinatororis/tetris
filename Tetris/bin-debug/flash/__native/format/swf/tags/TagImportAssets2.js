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
                    var TagImportAssets2 = (function (_super) {
                        __extends(TagImportAssets2, _super);
                        function TagImportAssets2() {
                            var _this = _super.call(this) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            return _this;
                        }
                        TagImportAssets2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.url = data.readString();
                            data.readUI8();
                            data.readUI8();
                            var numSymbols = data.readUI16();
                            for (var i = 0; i < numSymbols; i++) {
                                this._symbols.push(data.readSYMBOL());
                            }
                        };
                        TagImportAssets2.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeString(this.url);
                            body.writeUI8(1);
                            body.writeUI8(0);
                            var numSymbols = ((this._symbols.length) >>> 0);
                            body.writeUI16(numSymbols);
                            for (var i = 0; i < numSymbols; i++) {
                                body.writeSYMBOL(this._symbols[i]);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagImportAssets2.prototype, "type", {
                            get: function () { return TagImportAssets2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagImportAssets2.prototype, "name", {
                            get: function () { return "ImportAssets2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagImportAssets2.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagImportAssets2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagImportAssets2.TYPE = 71;
                        return TagImportAssets2;
                    }(tags.TagImportAssets));
                    tags.TagImportAssets2 = TagImportAssets2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagImportAssets2.js.map