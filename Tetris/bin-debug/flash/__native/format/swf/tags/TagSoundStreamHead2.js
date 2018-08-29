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
                    tags.SoundRate = flash.__native.format.swf.data.consts.SoundRate;
                    tags.SoundSize = flash.__native.format.swf.data.consts.SoundSize;
                    tags.SoundType = flash.__native.format.swf.data.consts.SoundType;
                    tags.SoundCompression = flash.__native.format.swf.data.consts.SoundCompression;
                    var TagSoundStreamHead2 = (function (_super) {
                        __extends(TagSoundStreamHead2, _super);
                        function TagSoundStreamHead2() {
                            var _this = _super.call(this) || this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            return _this;
                        }
                        Object.defineProperty(TagSoundStreamHead2.prototype, "type", {
                            get: function () { return TagSoundStreamHead2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamHead2.prototype, "name", {
                            get: function () { return "SoundStreamHead2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamHead2.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagSoundStreamHead2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagSoundStreamHead2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent);
                            if (this.streamSoundSampleCount > 0) {
                                str += "Format: " + tags.SoundCompression.toString(this.streamSoundCompression) + ", " +
                                    "Rate: " + tags.SoundRate.toString(this.streamSoundRate) + ", " +
                                    "Size: " + tags.SoundSize.toString(this.streamSoundSize) + ", " +
                                    "Type: " + tags.SoundType.toString(this.streamSoundType) + ", ";
                            }
                            str += "Samples: " + this.streamSoundSampleCount;
                            return str;
                        };
                        TagSoundStreamHead2.TYPE = 45;
                        return TagSoundStreamHead2;
                    }(tags.TagSoundStreamHead));
                    tags.TagSoundStreamHead2 = TagSoundStreamHead2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagSoundStreamHead2.js.map