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
                    tags.SWFButtonCondAction = flash.__native.format.swf.data.SWFButtonCondAction;
                    tags.SWFButtonRecord = flash.__native.format.swf.data.SWFButtonRecord;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    tags.Dictionary = flash.utils.Dictionary;
                    var TagDefineButton2 = (function () {
                        function TagDefineButton2() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this.implements_flash___native_format_swf_tags_IDefinitionTag = null;
                            this.trackAsMenu = false;
                            this._characterId = 0;
                            this._characters = undefined;
                            this._condActions = undefined;
                            this.frames = null;
                            this._characters = new Array();
                            this._condActions = new Array();
                            this.frames = new tags.Dictionary();
                        }
                        Object.defineProperty(TagDefineButton2.prototype, "characterId", {
                            get: function () { return this._characterId; },
                            set: function (value) { value = ((value) >>> 0); this._characterId = value; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton2.prototype, "characters", {
                            get: function () { return this._characters; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton2.prototype, "condActions", {
                            get: function () { return this._condActions; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineButton2.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this._characterId = data.readUI16();
                            this.trackAsMenu = ((data.readUI8() & 0x01) != 0);
                            var actionOffset = data.readUI16();
                            var record;
                            while ((record = data.readBUTTONRECORD(2)) != null) {
                                this.characters.push(record);
                            }
                            if (actionOffset != 0) {
                                var condActionSize = 0;
                                do {
                                    condActionSize = data.readUI16();
                                    this.condActions.push(data.readBUTTONCONDACTION());
                                } while (condActionSize != 0);
                            }
                            this.processRecords();
                        };
                        TagDefineButton2.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var i = 0;
                            var len = 0;
                            var body = new tags.SWFData();
                            body.writeUI16(this.characterId);
                            body.writeUI8(this.trackAsMenu ? 0x01 : 0);
                            var hasCondActions = (this.condActions.length > 0);
                            var buttonRecordsBytes = new tags.SWFData();
                            for (i = 0, len = this.characters.length; i < len; i++) {
                                buttonRecordsBytes.writeBUTTONRECORD(this.characters[i], 2);
                            }
                            buttonRecordsBytes.writeUI8(0);
                            body.writeUI16(hasCondActions ? buttonRecordsBytes.length + 2 : 0);
                            body.writeBytes(buttonRecordsBytes);
                            if (hasCondActions) {
                                for (i = 0, len = this.condActions.length; i < len; i++) {
                                    var condActionBytes = new tags.SWFData();
                                    condActionBytes.writeBUTTONCONDACTION(this.condActions[i]);
                                    body.writeUI16((i < this.condActions.length - 1) ? condActionBytes.length + 2 : 0);
                                    body.writeBytes(condActionBytes);
                                }
                            }
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        TagDefineButton2.prototype.clone = function () {
                            var i = 0;
                            var len = 0;
                            var tag = new TagDefineButton2();
                            tag.characterId = this.characterId;
                            tag.trackAsMenu = this.trackAsMenu;
                            for (i = 0, len = this.characters.length; i < len; i++) {
                                tag.characters.push(this.characters[i].clone());
                            }
                            for (i = 0, len = this.condActions.length; i < len; i++) {
                                tag.condActions.push(this.condActions[i].clone());
                            }
                            return tag;
                        };
                        TagDefineButton2.prototype.getRecordsByState = function (state) {
                            state = as(state, 'String');
                            return as(this.frames.get(state), Array);
                        };
                        Object.defineProperty(TagDefineButton2.prototype, "type", {
                            get: function () { return TagDefineButton2.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton2.prototype, "name", {
                            get: function () { return "DefineButton2"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton2.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDefineButton2.prototype, "level", {
                            get: function () { return 2; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDefineButton2.prototype.processRecords = function () {
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
                            this.frames.set(tags.TagDefineButton.STATE_UP, upState.sort(this.sortByDepthCompareFunction.__bind(this)));
                            this.frames.set(tags.TagDefineButton.STATE_OVER, overState.sort(this.sortByDepthCompareFunction.__bind(this)));
                            this.frames.set(tags.TagDefineButton.STATE_DOWN, downState.sort(this.sortByDepthCompareFunction.__bind(this)));
                            this.frames.set(tags.TagDefineButton.STATE_HIT, hitState.sort(this.sortByDepthCompareFunction.__bind(this)));
                        };
                        TagDefineButton2.prototype.sortByDepthCompareFunction = function (a, b) {
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
                        TagDefineButton2.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "ID: " + this.characterId + ", TrackAsMenu: " + this.trackAsMenu;
                            var i = 0;
                            var len = 0;
                            if ((len = ((this._characters.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "Characters:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._characters[i].toString(indent + 4);
                                }
                            }
                            if ((len = ((this._condActions.length) >>> 0)) > 0) {
                                str += "\n" + tags.StringUtils.repeat(indent + 2) + "CondActions:";
                                for (i = 0; i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + "[" + i + "] " + this._condActions[i].toString(indent + 4, flags);
                                }
                            }
                            return str;
                        };
                        TagDefineButton2.TYPE = 34;
                        return TagDefineButton2;
                    }());
                    tags.TagDefineButton2 = TagDefineButton2;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDefineButton2.js.map