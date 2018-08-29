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
                    tags.BitmapType = flash.__native.format.swf.data.consts.BitmapType;
                    tags.Bitmap = flash.display.Bitmap;
                    tags.BitmapData = flash.display.BitmapData;
                    tags.Loader = flash.display.Loader;
                    tags.Event = flash.events.Event;
                    tags.IOErrorEvent = flash.events.IOErrorEvent;
                    tags.ByteArray = flash.utils.ByteArray;
                    var TagDefineBits = (function () {
                        function TagDefineBits() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionBitsTag = null;
                            this.bitmapType = tags.BitmapType.JPEG;
                            this.jpegTablesTag = null;
                            this._characterId = 0;
                            this._bitmapData = null;
                            this._bitmapAlphaData = null;
                            this._instance = null;
                            this._bitmapData = new tags.ByteArray;
                        }
                        Object.defineProperty(TagDefineBits.prototype, "bitmapAlphaData", {
                            get: function () { return this._bitmapAlphaData; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBits.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBits.prototype, "bitmapData", {
                            get: function () { return this._bitmapData; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBits.prototype, "instance", {
                            get: function () { return this._instance || new tags.BitmapData(1, 1, true, 0x66000000); },
                            set: function (value) { value = strict(value, tags.BitmapData); this._instance = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBits.prototype, "type", {
                            get: function () { return TagDefineBits.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBits.prototype, "name", {
                            get: function () { return "DefineBits"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBits.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineBits.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineBits.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            if (length > 2) {
                                data.readBytes(this._bitmapData, 0, length - 2);
                            }
                        };
                        TagDefineBits.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, this._bitmapData.length + 2, true);
                            data.writeUI16(this._characterId);
                            if (this._bitmapData.length > 0) {
                                data.writeBytes(this._bitmapData);
                            }
                        };
                        TagDefineBits.prototype.clone = function () {
                            var tag = new TagDefineBits;
                            tag.characterId = this.characterId;
                            tag.bitmapType = this.bitmapType;
                            if (this._bitmapData.length > 0) {
                                tag.bitmapData.writeBytes(this._bitmapData);
                            }
                            return tag;
                        };
                        TagDefineBits.prototype.exportBitmapData = function (complete, error) {
                            if (error === void 0) { error = null; }
                            this.onCompleteCallback = complete;
                            this.loader = new tags.Loader;
                            this.loader.contentLoaderInfo.addEventListener(tags.Event.COMPLETE, this.__exportCompleteHandler.__bind(this));
                            if (unbind(error) != unbind(null)) {
                                this.loader.contentLoaderInfo.addEventListener(tags.IOErrorEvent.IO_ERROR, error);
                            }
                            if (this._bitmapAlphaData) {
                                this._bitmapAlphaData.uncompress();
                                this.loader._predefinedAlphaData = this._bitmapAlphaData;
                            }
                            this.loader.loadBytes(this._bitmapData);
                        };
                        TagDefineBits.prototype.__exportCompleteHandler = function (event) {
                            var bitmapData = (as(this.loader.content, tags.Bitmap)).bitmapData;
                            this.onCompleteCallback(bitmapData);
                        };
                        TagDefineBits.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "BitmapLength: " + this._bitmapData.length;
                        };
                        TagDefineBits.TYPE = 6;
                        return TagDefineBits;
                    }());
                    tags.TagDefineBits = TagDefineBits;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineBits.js.map