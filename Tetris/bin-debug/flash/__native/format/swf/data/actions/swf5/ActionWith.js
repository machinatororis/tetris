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
                        var swf5;
                        (function (swf5) {
                            swf5.SWFData = flash.__native.format.swf.SWFData;
                            swf5.Action = flash.__native.format.swf.data.actions.Action;
                            swf5.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf5.IAction = flash.__native.format.swf.data.actions.IAction;
                            swf5.StringUtils = flash.__native.utils.StringUtils;
                            var ActionWith = (function (_super) {
                                __extends(ActionWith, _super);
                                function ActionWith(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.withBody === void 0 && (_this.withBody = undefined);
                                    _this.labelCount === void 0 && (_this.labelCount = 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    _this.withBody = new Array();
                                    _this.labelCount = 0;
                                    return _this;
                                }
                                ActionWith.prototype.parse = function (data) {
                                    data = strict(data, swf5.SWFData);
                                    var codeSize = data.readUI16();
                                    var bodyEndPosition = ((data.position + codeSize) >>> 0);
                                    while (data.position < bodyEndPosition) {
                                        this.withBody.push(data.readACTIONRECORD());
                                    }
                                    this.labelCount = swf5.Action.resolveOffsets(this.withBody);
                                };
                                ActionWith.prototype.publish = function (data) {
                                    data = strict(data, swf5.SWFData);
                                    var body = new swf5.SWFData();
                                    var bodyActions = new swf5.SWFData();
                                    for (var i = 0; i < this.withBody.length; i++) {
                                        bodyActions.writeACTIONRECORD(this.withBody[i]);
                                    }
                                    body.writeUI16(bodyActions.length);
                                    body.writeBytes(bodyActions);
                                    this.write(data, body);
                                };
                                ActionWith.prototype.clone = function () {
                                    var action = new ActionWith(this.code, this.length, this.pos);
                                    for (var i = 0; i < this.withBody.length; i++) {
                                        action.withBody.push(this.withBody[i].clone());
                                    }
                                    return action;
                                };
                                ActionWith.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    var str = "[ActionWith]";
                                    for (var i = 0; i < this.withBody.length; i++) {
                                        str += "\n" + swf5.StringUtils.repeat(indent + 4) + "[" + i + "] " + this.withBody[i].toString(indent + 4);
                                    }
                                    return str;
                                };
                                ActionWith.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf5.ActionExecutionContext);
                                    var str = this.toBytecodeLabel(indent) + "with {";
                                    var context = new swf5.ActionExecutionContext(this.withBody, context.cpool.concat(), this.labelCount);
                                    for (var i = 0; i < this.withBody.length; i++) {
                                        if (this.withBody[i]) {
                                            str += "\n" + swf5.StringUtils.repeat(indent + 4) + this.withBody[i].toBytecode(indent + 4, context);
                                        }
                                    }
                                    if (context.endLabel != null) {
                                        str += "\n" + swf5.StringUtils.repeat(indent + 4) + context.endLabel + ":";
                                    }
                                    str += "\n" + swf5.StringUtils.repeat(indent + 2) + "}";
                                    return str;
                                };
                                ActionWith.CODE = 0x94;
                                return ActionWith;
                            }(swf5.Action));
                            swf5.ActionWith = ActionWith;
                        })(swf5 = actions.swf5 || (actions.swf5 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionWith.js.map