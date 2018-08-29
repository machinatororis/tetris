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
                    tags.ByteArray = flash.utils.ByteArray;
                    var TagEnableDebugger2 = (function (_super) {
                        __extends(TagEnableDebugger2, _super);
                        function TagEnableDebugger2() {
                            var _this = this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this._reserved === void 0 && (_this._reserved = 0);
                            _this = _super.call(this) || this;
                            return _this;
                        }
                        Object.defineProperty(TagEnableDebugger2.prototype, "reserved", {
                            get: function () { return this._reserved; },
                            enumerable: true,
                            configurable: true
                        });
                        TagEnableDebugger2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._reserved = data.readUI16();
                            if (length > 2) {
                                data.readBytes(this._password, 0, length - 2);
                            }
                        };
                        TagEnableDebugger2.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, this._password.length + 2);
                            data.writeUI16(this._reserved);
                            if (this._password.length > 0) {
                                data.writeBytes(this._password);
                            }
                        };
                        Object.defineProperty(TagEnableDebugger2.prototype, "type", {
                            get: function () { return TagEnableDebugger2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnableDebugger2.prototype, "name", {
                            get: function () { return "EnableDebugger2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnableDebugger2.prototype, "version", {
                            get: function () { return 6; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagEnableDebugger2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagEnableDebugger2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "Password: " + (this._password.length ? 'null' : this._password.readUTF()) + ", " +
                                "Reserved: 0x" + this._reserved.toString(16);
                        };
                        TagEnableDebugger2.TYPE = 64;
                        return TagEnableDebugger2;
                    }(tags.TagEnableDebugger));
                    tags.TagEnableDebugger2 = TagEnableDebugger2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagEnableDebugger2.js.map