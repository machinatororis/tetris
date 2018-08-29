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
                    tags.SWF = flash.__native.format.swf.SWF;
                    tags.SWFData = flash.__native.format.swf.SWFData;
                    tags.SWFButtonRecord = flash.__native.format.swf.data.SWFButtonRecord;
                    tags.Action = flash.__native.format.swf.data.actions.Action;
                    tags.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                    tags.IAction = flash.__native.format.swf.data.actions.IAction;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    tags.Dictionary = flash.utils.Dictionary;
                    var TagDefineButton = (function () {
                        function TagDefineButton() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this._characterId = 0;
                            this._characters = undefined;
                            this._actions = undefined;
                            this.frames = null;
                            this.labelCount = 0;
                            this._characters = new Array();
                            this._actions = new Array();
                            this.frames = new tags.Dictionary();
                        }
                        Object.defineProperty(TagDefineButton.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton.prototype, "characters", {
                            get: function () { return this._characters; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton.prototype, "actions", {
                            get: function () { return this._actions; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineButton.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            var record;
                            while ((record = data.readBUTTONRECORD()) != null) {
                                this._characters.push(record);
                            }
                            var action;
                            while ((action = data.readACTIONRECORD()) != null) {
                                this._actions.push(action);
                            }
                            this.labelCount = tags.Action.resolveOffsets(this._actions);
                            this.processRecords();
                        };
                        TagDefineButton.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var i = 0;
                            var len = 0;
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            for (i = 0, len = this.characters.length; i < len; i++) {
                                data.writeBUTTONRECORD(this.characters[i]);
                            }
                            data.writeUI8(0);
                            for (i = 0, len = this.actions.length; i < len; i++) {
                                data.writeACTIONRECORD(this.actions[i]);
                            }
                            data.writeUI8(0);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineButton.prototype.clone = function () {
                            var i = 0;
                            var len = 0;
                            var tag = new TagDefineButton();
                            tag.characterId = this.characterId;
                            for (i = 0, len = this.characters.length; i < len; i++) {
                                tag.characters.push(this.characters[i].clone());
                            }
                            for (i = 0, len = this.actions.length; i < len; i++) {
                                tag.actions.push(this.actions[i].clone());
                            }
                            return tag;
                        };
                        TagDefineButton.prototype.getRecordsByState = function (state) {
                            state = as(state, 'String');
                            return as(this.frames.get(state), Array);
                        };
                        Object.defineProperty(TagDefineButton.prototype, "type", {
                            get: function () { return TagDefineButton.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton.prototype, "name", {
                            get: function () { return "DefineButton"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton.prototype, "version", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineButton.prototype.processRecords = function () {
                            var upState = new Array();
                            var overState = new Array();
                            var downState = new Array();
                            var hitState = new Array();
                            for (var i = 0, len = ((this.characters.length) >>> 0); i < len; i++) {
                                var record = strict(this.characters[i], tags.SWFButtonRecord);
                                if (record.stateUp) {
                                    upState.push(record);
                                }
                                if (record.stateOver) {
                                    overState.push(record);
                                }
                                if (record.stateDown) {
                                    downState.push(record);
                                }
                                if (record.stateHitTest) {
                                    hitState.push(record);
                                }
                            }
                            this.frames.set(TagDefineButton.STATE_UP, upState.sort(this.sortByDepthCompareFunction.__bind(this)));
                            this.frames.set(TagDefineButton.STATE_OVER, overState.sort(this.sortByDepthCompareFunction.__bind(this)));
                            this.frames.set(TagDefineButton.STATE_DOWN, downState.sort(this.sortByDepthCompareFunction.__bind(this)));
                            this.frames.set(TagDefineButton.STATE_HIT, hitState.sort(this.sortByDepthCompareFunction.__bind(this)));
                        };
                        TagDefineButton.prototype.sortByDepthCompareFunction = function (a, b) {
                            a = strict(a, tags.SWFButtonRecord);
                            b = strict(b, tags.SWFButtonRecord);
                            if (a.placeDepth < b.placeDepth) {
                                return -1;
                            }
                            else if (a.placeDepth > b.placeDepth) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        };
                        TagDefineButton.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this._characterId;
                            var i = 0;
                            var len = 0;
                            if ((len = ((this._characters.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Characters:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._characters[i].toString(indent + 4);
                                }
                            }
                            if ((len = ((this._actions.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Actions:";
                                if ((flags & tags.SWF.TOSTRING_FLAG_AVM1_BYTECODE) == 0) {
                                    for (i = 0; i < len; i++) {
                                        str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._actions[i].toString(indent + 4);
                                    }
                                }
                                else {
                                    var context = new tags.ActionExecutionContext(this._actions, [], this.labelCount);
                                    for (i = 0; i < len; i++) {
                                        str += "\n" + tags.StringUtils.repeat(indent + 4) + this._actions[i].toBytecode(indent + 4, context);
                                    }
                                    if (context.endLabel != null) {
                                        str += "\n" + tags.StringUtils.repeat(indent + 6) + context.endLabel + ":";
                                    }
                                }
                            }
                            return str;
                        };
                        TagDefineButton.TYPE = 7;
                        TagDefineButton.STATE_UP = "up";
                        TagDefineButton.STATE_OVER = "over";
                        TagDefineButton.STATE_DOWN = "down";
                        TagDefineButton.STATE_HIT = "hit";
                        return TagDefineButton;
                    }());
                    tags.TagDefineButton = TagDefineButton;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineButton.js.map