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
                    tags.Action = flash.__native.format.swf.data.actions.Action;
                    tags.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                    tags.IAction = flash.__native.format.swf.data.actions.IAction;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDoAction = (function () {
                        function TagDoAction() {
                            this.implements_flash___native_format_swf_tags_ITag = null;
                            this._actions = undefined;
                            this.labelCount = 0;
                            this._actions = new Array();
                            this.labelCount = 0;
                        }
                        Object.defineProperty(TagDoAction.prototype, "actions", {
                            get: function () { return this._actions; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDoAction.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            var action;
                            while ((action = data.readACTIONRECORD()) != null) {
                                this._actions.push(action);
                            }
                            this.labelCount = tags.Action.resolveOffsets(this._actions);
                        };
                        TagDoAction.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            for (var i = 0, len = ((this._actions.length) >>> 0); i < len; i++) {
                                body.writeACTIONRECORD(this._actions[i]);
                            }
                            body.writeUI8(0);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDoAction.prototype, "type", {
                            get: function () { return TagDoAction.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoAction.prototype, "name", {
                            get: function () { return "DoAction"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoAction.prototype, "version", {
                            get: function () { return 3; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoAction.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDoAction.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var i = 0;
                            var len = 0;
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) + "Records: " + this._actions.length;
                            if ((flags & tags.SWF.TOSTRING_FLAG_AVM1_BYTECODE) == 0) {
                                for (i = 0, len = this._actions.length; i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 2) + "[" + i + "] " + this._actions[i].toString(indent + 2);
                                }
                            }
                            else {
                                var context = new tags.ActionExecutionContext(this._actions, [], this.labelCount);
                                for (i = 0, len = this._actions.length; i < len; i++) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 2) + this._actions[i].toBytecode(indent + 2, context);
                                }
                                if (context.endLabel != null) {
                                    str += "\n" + tags.StringUtils.repeat(indent + 4) + context.endLabel + ":";
                                }
                            }
                            return str;
                        };
                        TagDoAction.TYPE = 12;
                        return TagDoAction;
                    }());
                    tags.TagDoAction = TagDoAction;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDoAction.js.map