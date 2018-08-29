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
                    tags.BitmapFormat = flash.__native.format.swf.data.consts.BitmapFormat;
                    tags.BitmapData = flash.display.BitmapData;
                    tags.ByteArray = flash.utils.ByteArray;
                    var TagDefineBitsLossless = (function () {
                        function TagDefineBitsLossless() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionBitsTag = null;
                            this.bitmapFormat = 0;
                            this.bitmapWidth = 0;
                            this.bitmapHeight = 0;
                            this.bitmapColorTableSize = 0;
                            this._characterId = 0;
                            this._zlibBitmapData = null;
                            this._instance = null;
                            this._zlibBitmapData = new tags.ByteArray;
                        }
                        Object.defineProperty(TagDefineBitsLossless.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsLossless.prototype, "zlibBitmapData", {
                            get: function () { return this._zlibBitmapData; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsLossless.prototype, "instance", {
                            get: function () { return this._instance || new tags.BitmapData(1, 1, true, 0x66000000); },
                            set: function (value) { value = strict(value, tags.BitmapData); this._instance = value; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineBitsLossless.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.bitmapFormat = data.readUI8();
                            this.bitmapWidth = data.readUI16();
                            this.bitmapHeight = data.readUI16();
                            if (this.bitmapFormat == tags.BitmapFormat.BIT_8) {
                                this.bitmapColorTableSize = data.readUI8();
                            }
                            data.readBytes(this.zlibBitmapData, 0, length - ((this.bitmapFormat == tags.BitmapFormat.BIT_8) ? 8 : 7));
                        };
                        TagDefineBitsLossless.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this._characterId);
                            body.writeUI8(this.bitmapFormat);
                            body.writeUI16(this.bitmapWidth);
                            body.writeUI16(this.bitmapHeight);
                            if (this.bitmapFormat == tags.BitmapFormat.BIT_8) {
                                body.writeUI8(this.bitmapColorTableSize);
                            }
                            if (this._zlibBitmapData.length > 0) {
                                body.writeBytes(this._zlibBitmapData);
                            }
                            data.writeTagHeader(this.type, body.length, true);
                            data.writeBytes(body);
                        };
                        TagDefineBitsLossless.prototype.clone = function () {
                            var tag = new TagDefineBitsLossless();
                            tag.characterId = this.characterId;
                            tag.bitmapFormat = this.bitmapFormat;
                            tag.bitmapWidth = this.bitmapWidth;
                            tag.bitmapHeight = this.bitmapHeight;
                            if (this._zlibBitmapData.length > 0) {
                                tag.zlibBitmapData.writeBytes(this._zlibBitmapData);
                            }
                            return tag;
                        };
                        Object.defineProperty(TagDefineBitsLossless.prototype, "type", {
                            get: function () { return TagDefineBitsLossless.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsLossless.prototype, "name", {
                            get: function () { return "DefineBitsLossless"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsLossless.prototype, "version", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBitsLossless.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineBitsLossless.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Format: " + tags.BitmapFormat.toString(this.bitmapFormat) + ", " +
                                "Size: (" + this.bitmapWidth + "," + this.bitmapHeight + ")";
                        };
                        TagDefineBitsLossless.TYPE = 20;
                        return TagDefineBitsLossless;
                    }());
                    tags.TagDefineBitsLossless = TagDefineBitsLossless;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineBitsLossless.js.map