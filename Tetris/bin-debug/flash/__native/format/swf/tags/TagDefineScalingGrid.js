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
                    tags.SWFRectangle = flash.__native.format.swf.data.SWFRectangle;
                    var TagDefineScalingGrid = (function () {
                        function TagDefineScalingGrid() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.splitter = null;
                            this._characterId = 0;
                        }
                        Object.defineProperty(TagDefineScalingGrid.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineScalingGrid.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.splitter = data.readRECT();
                        };
                        TagDefineScalingGrid.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeRECT(this.splitter);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineScalingGrid.prototype.clone = function () {
                            var tag = new TagDefineScalingGrid();
                            tag.characterId = this.characterId;
                            tag.splitter = this.splitter.clone();
                            return tag;
                        };
                        Object.defineProperty(TagDefineScalingGrid.prototype, "type", {
                            get: function () { return TagDefineScalingGrid.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineScalingGrid.prototype, "name", {
                            get: function () { return "DefineScalingGrid"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineScalingGrid.prototype, "version", {
                            get: function () { return 8; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineScalingGrid.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineScalingGrid.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            return tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "CharacterID: " + this.characterId + ", " +
                                "Splitter: " + this.splitter;
                        };
                        TagDefineScalingGrid.TYPE = 78;
                        return TagDefineScalingGrid;
                    }());
                    tags.TagDefineScalingGrid = TagDefineScalingGrid;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineScalingGrid.js.map