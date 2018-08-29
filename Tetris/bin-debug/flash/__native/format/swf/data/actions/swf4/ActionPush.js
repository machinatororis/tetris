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
                var data;
                (function (data_1) {
                    var actions;
                    (function (actions) {
                        var swf4;
                        (function (swf4) {
                            swf4.SWFData = flash.__native.format.swf.SWFData;
                            swf4.SWFActionValue = flash.__native.format.swf.data.SWFActionValue;
                            swf4.Action = flash.__native.format.swf.data.actions.Action;
                            swf4.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf4.IAction = flash.__native.format.swf.data.actions.IAction;
                            swf4.StringUtils = flash.__native.utils.StringUtils;
                            var ActionPush = (function (_super) {
                                __extends(ActionPush, _super);
                                function ActionPush(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.values === void 0 && (_this.values = undefined);
                                    _this = _super.call(this, code, length, pos) || this;
                                    _this.values = new Array();
                                    return _this;
                                }
                                ActionPush.prototype.parse = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    var endPosition = ((data.position + this.length) >>> 0);
                                    while (data.position != endPosition) {
                                        this.values.push(data.readACTIONVALUE());
                                    }
                                };
                                ActionPush.prototype.publish = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    var body = new swf4.SWFData();
                                    for (var i = 0; i < this.values.length; i++) {
                                        body.writeACTIONVALUE(this.values[i]);
                                    }
                                    this.write(data, body);
                                };
                                ActionPush.prototype.clone = function () {
                                    var action = new ActionPush(this.code, this.length, this.pos);
                                    for (var i = 0; i < this.values.length; i++) {
                                        action.values.push(this.values[i].clone());
                                    }
                                    return action;
                                };
                                ActionPush.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    return "[ActionPush] " + this.values.join(", ");
                                };
                                ActionPush.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf4.ActionExecutionContext);
                                    var str = this.toBytecodeLabel(indent);
                                    for (var i = 0; i < this.values.length; i++) {
                                        if (i > 0) {
                                            str += "\n" + swf4.StringUtils.repeat(indent + 2);
                                        }
                                        str += "push " + this.values[i].toBytecodeString(context.cpool);
                                    }
                                    return str;
                                };
                                ActionPush.CODE = 0x96;
                                return ActionPush;
                            }(swf4.Action));
                            swf4.ActionPush = ActionPush;
                        })(swf4 = actions.swf4 || (actions.swf4 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionPush.js.map