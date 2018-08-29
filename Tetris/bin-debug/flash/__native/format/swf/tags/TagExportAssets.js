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
                    tags.SWFAsset = flash.__native.format.swf.data.SWFAsset;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagExportAssets = (function () {
                        function TagExportAssets() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._assets = undefined;
                            this._assets = new Array();
                        }
                        Object.defineProperty(TagExportAssets.prototype, "assets", {
                            get: function () { return this._assets; },
                            enumerable: true,
                            configurable: true
                        });
                        TagExportAssets.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var numAssets = data.readUI16();
                            for (var i = 0; i < numAssets; i++) {
                                this._assets.push(data.readASSET());
                            }
                        };
                        TagExportAssets.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            var numAssets = ((this._assets.length) >>> 0);
                            body.writeUI16(numAssets);
                            for (var i = 0; i < numAssets; i++) {
                                body.writeASSET(this._assets[i]);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagExportAssets.prototype, "type", {
                            get: function () { return TagExportAssets.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagExportAssets.prototype, "name", {
                            get: function () { return "ExportAssets"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagExportAssets.prototype, "version", {
                            get: function () { return 5; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagExportAssets.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagExportAssets.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent);
                            if (this._assets.length > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Assets:";
                                for (var i = 0, len = ((this._assets.length) >>> 0); i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._assets[i].toString();
                                }
                            }
                            return str;
                        };
                        TagExportAssets.TYPE = 56;
                        return TagExportAssets;
                    }());
                    tags.TagExportAssets = TagExportAssets;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagExportAssets.js.map