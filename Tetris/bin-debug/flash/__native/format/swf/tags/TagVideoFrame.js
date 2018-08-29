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
                    var TagVideoFrame = (function () {
                        function TagVideoFrame() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.streamId = 0;
                            this.frameNum = 0;
                            this._videoData = null;
                            this._videoData = new tags.ByteArray();
                        }
                        Object.defineProperty(TagVideoFrame.prototype, "videoData", {
                            get: function () { return this._videoData; },
                            enumerable: true,
                            configurable: true
                        });
                        TagVideoFrame.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.streamId = data.readUI16();
                            this.frameNum = data.readUI16();
                            data.readBytes(this._videoData, 0, length - 4);
                        };
                        TagVideoFrame.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            data.writeTagHeader(this.type, this._videoData.length + 4);
                            data.writeUI16(this.streamId);
                            data.writeUI16(this.frameNum);
                            if (this._videoData.length > 0) {
                                data.writeBytes(this._videoData);
                            }
                        };
                        Object.defineProperty(TagVideoFrame.prototype, "type", {
                            get: function () { return TagVideoFrame.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagVideoFrame.prototype, "name", {
                            get: function () { return "VideoFrame"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagVideoFrame.prototype, "version", {
                            get: function () { return 6; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagVideoFrame.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagVideoFrame.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "StreamID: " + this.streamId + ", " +
                                "Frame: " + this.frameNum;
                        };
                        TagVideoFrame.TYPE = 61;
                        return TagVideoFrame;
                    }());
                    tags.TagVideoFrame = TagVideoFrame;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagVideoFrame.js.map