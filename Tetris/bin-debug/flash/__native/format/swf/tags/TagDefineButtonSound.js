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
                    tags.SWFSoundInfo = flash.__native.format.swf.data.SWFSoundInfo;
                    var TagDefineButtonSound = (function () {
                        function TagDefineButtonSound() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.buttonSoundChar0 = 0;
                            this.buttonSoundChar1 = 0;
                            this.buttonSoundChar2 = 0;
                            this.buttonSoundChar3 = 0;
                            this.buttonSoundInfo0 = null;
                            this.buttonSoundInfo1 = null;
                            this.buttonSoundInfo2 = null;
                            this.buttonSoundInfo3 = null;
                            this._characterId = 0;
                        }
                        Object.defineProperty(TagDefineButtonSound.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineButtonSound.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.buttonSoundChar0 = data.readUI16();
                            if (this.buttonSoundChar0 != 0) {
                                this.buttonSoundInfo0 = data.readSOUNDINFO();
                            }
                            this.buttonSoundChar1 = data.readUI16();
                            if (this.buttonSoundChar1 != 0) {
                                this.buttonSoundInfo1 = data.readSOUNDINFO();
                            }
                            this.buttonSoundChar2 = data.readUI16();
                            if (this.buttonSoundChar2 != 0) {
                                this.buttonSoundInfo2 = data.readSOUNDINFO();
                            }
                            this.buttonSoundChar3 = data.readUI16();
                            if (this.buttonSoundChar3 != 0) {
                                this.buttonSoundInfo3 = data.readSOUNDINFO();
                            }
                        };
                        TagDefineButtonSound.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeUI16(this.buttonSoundChar0);
                            if (this.buttonSoundChar0 != 0) {
                                body.writeSOUNDINFO(this.buttonSoundInfo0);
                            }
                            body.writeUI16(this.buttonSoundChar1);
                            if (this.buttonSoundChar1 != 0) {
                                body.writeSOUNDINFO(this.buttonSoundInfo1);
                            }
                            body.writeUI16(this.buttonSoundChar2);
                            if (this.buttonSoundChar2 != 0) {
                                body.writeSOUNDINFO(this.buttonSoundInfo2);
                            }
                            body.writeUI16(this.buttonSoundChar3);
                            if (this.buttonSoundChar3 != 0) {
                                body.writeSOUNDINFO(this.buttonSoundInfo3);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineButtonSound.prototype.clone = function () {
                            var tag = new TagDefineButtonSound();
                            tag.characterId = this.characterId;
                            tag.buttonSoundChar0 = this.buttonSoundChar0;
                            tag.buttonSoundChar1 = this.buttonSoundChar1;
                            tag.buttonSoundChar2 = this.buttonSoundChar2;
                            tag.buttonSoundChar3 = this.buttonSoundChar3;
                            tag.buttonSoundInfo0 = this.buttonSoundInfo0.clone();
                            tag.buttonSoundInfo1 = this.buttonSoundInfo1.clone();
                            tag.buttonSoundInfo2 = this.buttonSoundInfo2.clone();
                            tag.buttonSoundInfo3 = this.buttonSoundInfo3.clone();
                            return tag;
                        };
                        Object.defineProperty(TagDefineButtonSound.prototype, "type", {
                            get: function () { return TagDefineButtonSound.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButtonSound.prototype, "name", {
                            get: function () { return "DefineButtonSound"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButtonSound.prototype, "version", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButtonSound.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineButtonSound.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ButtonID: " + this.characterId + ", " +
                                "ButtonSoundChars: " + this.buttonSoundChar0 + "," + this.buttonSoundChar1 + "," + this.buttonSoundChar2 + "," + this.buttonSoundChar3;
                            ;
                            return str;
                        };
                        TagDefineButtonSound.TYPE = 17;
                        return TagDefineButtonSound;
                    }());
                    tags.TagDefineButtonSound = TagDefineButtonSound;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineButtonSound.js.map