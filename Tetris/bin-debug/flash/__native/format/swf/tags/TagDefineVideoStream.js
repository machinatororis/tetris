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
                    tags.VideoCodecID = flash.__native.format.swf.data.consts.VideoCodecID;
                    tags.VideoDeblockingType = flash.__native.format.swf.data.consts.VideoDeblockingType;
                    var TagDefineVideoStream = (function () {
                        function TagDefineVideoStream() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.numFrames = 0;
                            this.width = 0;
                            this.height = 0;
                            this.deblocking = 0;
                            this.smoothing = false;
                            this.codecId = 0;
                            this._characterId = 0;
                        }
                        Object.defineProperty(TagDefineVideoStream.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineVideoStream.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.numFrames = data.readUI16();
                            this.width = data.readUI16();
                            this.height = data.readUI16();
                            data.readUB(4);
                            this.deblocking = data.readUB(3);
                            this.smoothing = (data.readUB(1) == 1);
                            this.codecId = data.readUI8();
                        };
                        TagDefineVideoStream.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, 10);
                            data.writeUI16(this.characterId);
                            data.writeUI16(this.numFrames);
                            data.writeUI16(this.width);
                            data.writeUI16(this.height);
                            data.writeUB(4, 0);
                            data.writeUB(3, this.deblocking);
                            data.writeUB(1, this.smoothing ? 1 : 0);
                            data.writeUI8(this.codecId);
                        };
                        TagDefineVideoStream.prototype.clone = function () {
                            var tag = new TagDefineVideoStream();
                            tag.characterId = this.characterId;
                            tag.numFrames = this.numFrames;
                            tag.width = this.width;
                            tag.height = this.height;
                            tag.deblocking = this.deblocking;
                            tag.smoothing = this.smoothing;
                            tag.codecId = this.codecId;
                            return tag;
                        };
                        Object.defineProperty(TagDefineVideoStream.prototype, "type", {
                            get: function () { return TagDefineVideoStream.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineVideoStream.prototype, "name", {
                            get: function () { return "DefineVideoStream"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineVideoStream.prototype, "version", {
                            get: function () { return 6; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineVideoStream.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineVideoStream.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", " +
                                "Frames: " + this.numFrames + ", " +
                                "Width: " + this.width + ", " +
                                "Height: " + this.height + ", " +
                                "Deblocking: " + tags.VideoDeblockingType.toString(this.deblocking) + ", " +
                                "Smoothing: " + this.smoothing + ", " +
                                "Codec: " + tags.VideoCodecID.toString(this.codecId);
                        };
                        TagDefineVideoStream.TYPE = 60;
                        return TagDefineVideoStream;
                    }());
                    tags.TagDefineVideoStream = TagDefineVideoStream;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineVideoStream.js.map