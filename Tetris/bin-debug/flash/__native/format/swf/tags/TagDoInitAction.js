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
                    tags.SWF = flash.__native.format.swf.SWF;
                    tags.SWFData = flash.__native.format.swf.SWFData;
                    tags.Action = flash.__native.format.swf.data.actions.Action;
                    tags.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                    tags.IAction = flash.__native.format.swf.data.actions.IAction;
                    tags.StringUtils = flash.__native.utils.StringUtils;
                    var TagDoInitAction = (function (_super) {
                        __extends(TagDoInitAction, _super);
                        function TagDoInitAction() {
                            var _this = this;
                            _this.implements_flash___native_format_swf_tags_ITag = null;
                            _this.spriteId === void 0 && (_this.spriteId = 0);
                            _this = _super.call(this) || this;
                            return _this;
                        }
                        TagDoInitAction.prototype.parse = function (data, length, version, async) {
                            if (async === void 0) { async = false; }
                            data = strict(data, tags.SWFData);
                            length = ((length) >>> 0);
                            version = ((version) >>> 0);
                            async = Boolean(async);
                            this.spriteId = data.readUI16();
                            var action;
                            while ((action = data.readACTIONRECORD()) != null) {
                                this._actions.push(action);
                            }
                            this.labelCount = tags.Action.resolveOffsets(this._actions);
                        };
                        TagDoInitAction.prototype.publish = function (data, version) {
                            data = strict(data, tags.SWFData);
                            version = ((version) >>> 0);
                            var body = new tags.SWFData();
                            body.writeUI16(this.spriteId);
                            for (var i = 0, len = ((this._actions.length) >>> 0); i < len; i++) {
                                body.writeACTIONRECORD(this._actions[i]);
                            }
                            body.writeUI8(0);
                            data.writeTagHeader(this.type, body.length);
                            data.writeBytes(body);
                        };
                        Object.defineProperty(TagDoInitAction.prototype, "type", {
                            get: function () { return TagDoInitAction.TYPE; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoInitAction.prototype, "name", {
                            get: function () { return "DoInitAction"; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoInitAction.prototype, "version", {
                            get: function () { return 6; },
                            enumerable: true,
                            configurable: true
                        });
                        Object.defineProperty(TagDoInitAction.prototype, "level", {
                            get: function () { return 1; },
                            enumerable: true,
                            configurable: true
                        });
                        TagDoInitAction.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = tags.Tag.toStringCommon(this.type, this.name, indent) +
                                "SpriteID: " + this.spriteId + ", " +
                                "Records: " + this._actions.length;
                            var i = 0;
                            var len = 0;
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
                        TagDoInitAction.TYPE = 59;
                        return TagDoInitAction;
                    }(tags.TagDoAction));
                    tags.TagDoInitAction = TagDoInitAction;
                })(tags = swf.tags || (swf.tags = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=TagDoInitAction.js.map