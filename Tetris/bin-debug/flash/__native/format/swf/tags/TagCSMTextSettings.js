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
                    var TagCSMTextSettings = (function () {
                        function TagCSMTextSettings() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.textId = 0;
                            this.useFlashType = 0;
                            this.gridFit = 0;
                            this.thickness = NaN;
                            this.sharpness = NaN;
                        }
                        TagCSMTextSettings.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.textId = data.readUI16();
                            this.useFlashType = data.readUB(2);
                            this.gridFit = data.readUB(3);
                            data.readUB(3);
                            this.thickness = data.readFIXED();
                            this.sharpness = data.readFIXED();
                            data.readUI8();
                        };
                        TagCSMTextSettings.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 12);
                            data.writeUI16(this.textId);
                            data.writeUB(2, this.useFlashType);
                            data.writeUB(3, this.gridFit);
                            data.writeUB(3, 0);
                            data.writeFIXED(this.thickness);
                            data.writeFIXED(this.sharpness);
                            data.writeUI8(0);
                        };
                        Object.defineProperty(TagCSMTextSettings.prototype, "type", {
                            get: function () { return TagCSMTextSettings.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagCSMTextSettings.prototype, "name", {
                            get: function () { return "CSMTextSettings"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagCSMTextSettings.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagCSMTextSettings.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagCSMTextSettings.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "TextID: " + this.textId + ", " +
                                "UseFlashType: " + this.useFlashType + ", " +
                                "GridFit: " + this.gridFit + ", " +
                                "Thickness: " + this.thickness + ", " +
                                "Sharpness: " + this.sharpness;
                        };
                        TagCSMTextSettings.TYPE = 74;
                        return TagCSMTextSettings;
                    }());
                    tags.TagCSMTextSettings = TagCSMTextSettings;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagCSMTextSettings.js.map