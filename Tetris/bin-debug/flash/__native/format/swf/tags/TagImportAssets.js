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
                    tags.SWFSymbol = flash.__native.format.swf.data.SWFSymbol;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagImportAssets = (function () {
                        function TagImportAssets() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.url = null;
                            this._symbols = undefined;
                            this._symbols = new Array();
                        }
                        Object.defineProperty(TagImportAssets.prototype, "symbols", {
                            get: function () { return this._symbols; },
                            enumerable: true,
                            configurable: true
                        });
                        TagImportAssets.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.url = data.readString();
                            var numSymbols = data.readUI16();
                            for (var i = 0; i < numSymbols; i++) {
                                this._symbols.push(data.readSYMBOL());
                            }
                        };
                        TagImportAssets.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeString(this.url);
                            var numSymbols = ((this._symbols.length) >>> 0);
                            body.writeUI16(numSymbols);
                            for (var i = 0; i < numSymbols; i++) {
                                body.writeSYMBOL(this._symbols[i]);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagImportAssets.prototype, "type", {
                            get: function () { return TagImportAssets.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagImportAssets.prototype, "name", {
                            get: function () { return "ImportAssets"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagImportAssets.prototype, "version", {
                            get: function () { return 5; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagImportAssets.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagImportAssets.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent);
                            if (this._symbols.length > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Assets:";
                                for (var i = 0, len = ((this._symbols.length) >>> 0); i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._symbols[i].toString();
                                }
                            }
                            return str;
                        };
                        TagImportAssets.TYPE = 57;
                        return TagImportAssets;
                    }());
                    tags.TagImportAssets = TagImportAssets;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagImportAssets.js.map