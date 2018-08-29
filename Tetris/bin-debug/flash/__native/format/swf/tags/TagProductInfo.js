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
                    var TagProductInfo = (function () {
                        function TagProductInfo() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.productId = 0;
                            this.edition = 0;
                            this.majorVersion = 0;
                            this.minorVersion = 0;
                            this.build = NaN;
                            this.compileDate = null;
                        }
                        TagProductInfo.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.productId = data.readUI32();
                            this.edition = data.readUI32();
                            this.majorVersion = data.readUI8();
                            this.minorVersion = data.readUI8();
                            this.build = data.readUI32()
                                + data.readUI32() * TagProductInfo.UINT_MAX_CARRY;
                            var sec = data.readUI32()
                                + data.readUI32() * TagProductInfo.UINT_MAX_CARRY;
                            this.compileDate = new Date(sec);
                        };
                        TagProductInfo.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI32(this.productId);
                            body.writeUI32(this.edition);
                            body.writeUI8(this.majorVersion);
                            body.writeUI8(this.minorVersion);
                            body.writeUI32(this.build);
                            body.writeUI32(this.build / TagProductInfo.UINT_MAX_CARRY);
                            body.writeUI32(this.compileDate.time);
                            body.writeUI32(this.compileDate.time / TagProductInfo.UINT_MAX_CARRY);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagProductInfo.prototype, "type", {
                            get: function () { return TagProductInfo.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagProductInfo.prototype, "name", {
                            get: function () { return "ProductInfo"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagProductInfo.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagProductInfo.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagProductInfo.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ProductID: " + this.productId + ", " +
                                "Edition: " + this.edition + ", " +
                                "Version: " + this.majorVersion + "." + this.minorVersion + " r" + this.build + ", " +
                                "CompileDate: " + this.compileDate.toString();
                        };
                        TagProductInfo.TYPE = 41;
                        TagProductInfo.UINT_MAX_CARRY = asc.sti(TagProductInfo, function () { TagProductInfo.UINT_MAX_CARRY = uint.MAX_VALUE + 1; });
                        return TagProductInfo;
                    }());
                    tags.TagProductInfo = TagProductInfo;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagProductInfo.js.map