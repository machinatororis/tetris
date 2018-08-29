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
                    tags.ByteArray = flash.utils.ByteArray;
                    var TagDoABC = (function () {
                        function TagDoABC() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.lazyInitializeFlag = false;
                            this.abcName = '';
                            this._bytes = null;
                            this._bytes = new tags.ByteArray;
                        }
                        TagDoABC.create = function (abcData, aName, aLazyInitializeFlag) {
                            if (abcData === void 0) { abcData = null; }
                            if (aName === void 0) { aName = ''; }
                            if (aLazyInitializeFlag === void 0) { aLazyInitializeFlag = true; }
                            abcData = strict(abcData, tags.ByteArray);
                            aName = as(aName, 'String');
                            aLazyInitializeFlag = Boolean(aLazyInitializeFlag);
                            var doABC = new TagDoABC();
                            if (abcData != null && abcData.length > 0) {
                                doABC.bytes.writeBytes(abcData);
                            }
                            doABC.abcName = aName;
                            doABC.lazyInitializeFlag = aLazyInitializeFlag;
                            return doABC;
                        };
                        Object.defineProperty(TagDoABC.prototype, "bytes", {
                            get: function () { return this._bytes; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDoABC.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var pos = data.position;
                            var flags = data.readUI32();
                            this.lazyInitializeFlag = (flags & 0x01) != 0;
                            this.abcName = data.readString();
                            data.readBytes(this.bytes, 0, length - (data.position - pos));
                        };
                        TagDoABC.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI32(this.lazyInitializeFlag ? 1 : 0);
                            body.writeString(this.abcName);
                            if (this._bytes.length > 0) {
                                body.writeBytes(this._bytes);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDoABC.prototype, "type", {
                            get: function () { return TagDoABC.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoABC.prototype, "name", {
                            get: function () { return "DoABC"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoABC.prototype, "version", {
                            get: function () { return 9; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoABC.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDoABC.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "Lazy: " + this.lazyInitializeFlag + ", " +
                                ((this.abcName.length > 0) ? "Name: " + this.abcName + ", " : "") +
                                "Length: " + this._bytes.length;
                        };
                        TagDoABC.TYPE = 82;
                        return TagDoABC;
                    }());
                    tags.TagDoABC = TagDoABC;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDoABC.js.map