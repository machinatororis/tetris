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
                    var TagFrameLabel = (function () {
                        function TagFrameLabel() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.frameName = null;
                            this.namedAnchorFlag = false;
                        }
                        TagFrameLabel.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var start = data.position;
                            this.frameName = data.readString();
                            if ((data.position - start) < length) {
                                if (data.readUI8() == 1) {
                                    this.namedAnchorFlag = true;
                                }
                            }
                        };
                        TagFrameLabel.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeString(this.frameName);
                            if (this.namedAnchorFlag) {
                                data.writeUI8(1);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagFrameLabel.prototype, "type", {
                            get: function () { return TagFrameLabel.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagFrameLabel.prototype, "name", {
                            get: function () { return "FrameLabel"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagFrameLabel.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagFrameLabel.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagFrameLabel.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = "Name: " + this.frameName;
                            if (this.namedAnchorFlag) {
                                str += ", NamedAnchor = true";
                            }
                            return tags.Tag.toStringCommon(this.type, this.name, indent) + str;
                        };
                        TagFrameLabel.TYPE = 43;
                        return TagFrameLabel;
                    }());
                    tags.TagFrameLabel = TagFrameLabel;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagFrameLabel.js.map