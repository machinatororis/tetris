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
                    var TagFileAttributes = (function () {
                        function TagFileAttributes() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.useDirectBlit = false;
                            this.useGPU = false;
                            this.hasMetadata = false;
                            this.actionscript3 = true;
                            this.useNetwork = false;
                        }
                        TagFileAttributes.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var flags = data.readUI8();
                            this.useDirectBlit = ((flags & 0x40) != 0);
                            this.useGPU = ((flags & 0x20) != 0);
                            this.hasMetadata = ((flags & 0x10) != 0);
                            this.actionscript3 = ((flags & 0x08) != 0);
                            this.useNetwork = ((flags & 0x01) != 0);
                            data.skipBytes(3);
                        };
                        TagFileAttributes.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 4);
                            var flags = 0;
                            if (this.useNetwork) {
                                flags |= 0x01;
                            }
                            if (this.actionscript3) {
                                flags |= 0x08;
                            }
                            if (this.hasMetadata) {
                                flags |= 0x10;
                            }
                            if (this.useGPU) {
                                flags |= 0x20;
                            }
                            if (this.useDirectBlit) {
                                flags |= 0x40;
                            }
                            data.writeUI8(flags);
                            data.writeUI8(0);
                            data.writeUI8(0);
                            data.writeUI8(0);
                        };
                        Object.defineProperty(TagFileAttributes.prototype, "type", {
                            get: function () { return TagFileAttributes.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagFileAttributes.prototype, "name", {
                            get: function () { return "FileAttributes"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagFileAttributes.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagFileAttributes.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagFileAttributes.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "AS3: " + this.actionscript3 + ", " +
                                "HasMetadata: " + this.hasMetadata + ", " +
                                "UseDirectBlit: " + this.useDirectBlit + ", " +
                                "UseGPU: " + this.useGPU + ", " +
                                "UseNetwork: " + this.useNetwork;
                        };
                        TagFileAttributes.TYPE = 69;
                        return TagFileAttributes;
                    }());
                    tags.TagFileAttributes = TagFileAttributes;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagFileAttributes.js.map