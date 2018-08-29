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
                    tags.SWFFrameLabel = flash.__native.format.swf.data.SWFFrameLabel;
                    tags.SWFScene = flash.__native.format.swf.data.SWFScene;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDefineSceneAndFrameLabelData = (function () {
                        function TagDefineSceneAndFrameLabelData() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._scenes = undefined;
                            this._frameLabels = undefined;
                            this._scenes = new Array();
                            this._frameLabels = new Array();
                        }
                        Object.defineProperty(TagDefineSceneAndFrameLabelData.prototype, "scenes", {
                            get: function () { return this._scenes; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSceneAndFrameLabelData.prototype, "frameLabels", {
                            get: function () { return this._frameLabels; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineSceneAndFrameLabelData.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var i = 0;
                            var sceneCount = data.readEncodedU32();
                            for (i = 0; i < sceneCount; i++) {
                                var sceneOffset = data.readEncodedU32();
                                var sceneName = data.readString();
                                this._scenes.push(new tags.SWFScene(sceneOffset, sceneName));
                            }
                            var frameLabelCount = data.readEncodedU32();
                            for (i = 0; i < frameLabelCount; i++) {
                                var frameNumber = data.readEncodedU32();
                                var frameLabel = data.readString();
                                this._frameLabels.push(new tags.SWFFrameLabel(frameNumber, frameLabel));
                            }
                        };
                        TagDefineSceneAndFrameLabelData.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var i = 0;
                            var len = 0;
                            var body = new tags.SWFData();
                            body.writeEncodedU32(this._scenes.length);
                            for (i = 0, len = this._scenes.length; i < len; i++) {
                                var scene = strict(this._scenes[i], tags.SWFScene);
                                body.writeEncodedU32(scene.offset);
                                body.writeString(scene.name);
                            }
                            body.writeEncodedU32(this.frameLabels.length);
                            for (i = 0, len = this.frameLabels.length; i < len; i++) {
                                var label = strict(this.frameLabels[i], tags.SWFFrameLabel);
                                body.writeEncodedU32(label.frameNumber);
                                body.writeString(label.name);
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDefineSceneAndFrameLabelData.prototype, "type", {
                            get: function () { return TagDefineSceneAndFrameLabelData.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSceneAndFrameLabelData.prototype, "name", {
                            get: function () { return "DefineSceneAndFrameLabelData"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSceneAndFrameLabelData.prototype, "version", {
                            get: function () { return 9; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineSceneAndFrameLabelData.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineSceneAndFrameLabelData.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent);
                            var i = 0;
                            var len = 0;
                            if ((len = ((this._scenes.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Scenes:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._scenes[i].toString();
                                }
                            }
                            if ((len = ((this._frameLabels.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "FrameLabels:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._frameLabels[i].toString();
                                }
                            }
                            return str;
                        };
                        TagDefineSceneAndFrameLabelData.TYPE = 86;
                        return TagDefineSceneAndFrameLabelData;
                    }());
                    tags.TagDefineSceneAndFrameLabelData = TagDefineSceneAndFrameLabelData;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineSceneAndFrameLabelData.js.map