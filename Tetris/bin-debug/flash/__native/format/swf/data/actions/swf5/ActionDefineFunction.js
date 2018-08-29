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
                            var ActionDefineFunction = (function (_super) {
                                __extends(ActionDefineFunction, _super);
                                function ActionDefineFunction(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.functionName === void 0 && (_this.functionName = null);
                                    _this.functionParams === void 0 && (_this.functionParams = undefined);
                                    _this.functionBody === void 0 && (_this.functionBody = undefined);
                                    _this.labelCount === void 0 && (_this.labelCount = 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    _this.functionParams = new Array();
                                    _this.functionBody = new Array();
                                    _this.labelCount = 0;
                                    return _this;
                                }
                                ActionDefineFunction.prototype.parse = function (data) {
                                    data = strict(data, swf5.SWFData);
                                    this.functionName = data.readString();
                                    var count = data.readUI16();
                                    for (var i = 0; i < count; i++) {
                                        this.functionParams.push(data.readString());
                                    }
                                    var codeSize = data.readUI16();
                                    var bodyEndPosition = ((data.position + codeSize) >>> 0);
                                    while (data.position < bodyEndPosition) {
                                        this.functionBody.push(data.readACTIONRECORD());
                                    }
                                    this.labelCount = swf5.Action.resolveOffsets(this.functionBody);
                                };
                                ActionDefineFunction.prototype.publish = function (data) {
                                    data = strict(data, swf5.SWFData);
                                    var i = 0;
                                    var body = new swf5.SWFData();
                                    body.writeString(this.functionName);
                                    body.writeUI16(this.functionParams.length);
                                    for (i = 0; i < this.functionParams.length; i++) {
                                        body.writeString(this.functionParams[i]);
                                    }
                                    var bodyActions = new swf5.SWFData();
                                    for (i = 0; i < this.functionBody.length; i++) {
                                        bodyActions.writeACTIONRECORD(this.functionBody[i]);
                                    }
                                    body.writeUI16(bodyActions.length);
                                    this.write(data, body);
                                    data.writeBytes(bodyActions);
                                };
                                ActionDefineFunction.prototype.clone = function () {
                                    var i = 0;
                                    var action = new ActionDefineFunction(this.code, this.length, this.pos);
                                    action.functionName = this.functionName;
                                    for (i = 0; i < this.functionParams.length; i++) {
                                        action.functionParams.push(this.functionParams[i]);
                                    }
                                    for (i = 0; i < this.functionBody.length; i++) {
                                        action.functionBody.push(this.functionBody[i].clone());
                                    }
                                    return action;
                                };
                                ActionDefineFunction.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    var str = "[ActionDefineFunction] " +
                                        ((this.functionName == null || this.functionName.length == 0) ? "<anonymous>" : this.functionName) +
                                        "(" + this.functionParams.join(", ") + ")";
                                    for (var i = 0; i < this.functionBody.length; i++) {
                                        if (this.functionBody[i]) {
                                            str += "\n" + swf5.StringUtils.repeat(indent + 4) + "[" + i + "] " + this.functionBody[i].toString(indent + 4);
                                        }
                                    }
                                    return str;
                                };
                                ActionDefineFunction.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf5.ActionExecutionContext);
                                    var str = this.toBytecodeLabel(indent) + "defineFunction " +
                                        ((this.functionName == null || this.functionName.length == 0) ? "" : this.functionName) +
                                        "(" + this.functionParams.join(", ") + ") {";
                                    var context = new swf5.ActionExecutionContext(this.functionBody, context.cpool.concat(), this.labelCount);
                                    for (var i = 0; i < this.functionBody.length; i++) {
                                        if (this.functionBody[i]) {
                                            str += "\n" + swf5.StringUtils.repeat(indent + 4) + this.functionBody[i].toBytecode(indent + 4, context);
                                        }
                                    }
                                    if (context.endLabel != null) {
                                        str += "\n" + swf5.StringUtils.repeat(indent + 4) + context.endLabel + ":";
                                    }
                                    str += "\n" + swf5.StringUtils.repeat(indent + 2) + "}";
                                    return str;
                                };
                                ActionDefineFunction.CODE = 0x9b;
                                return ActionDefineFunction;
                            }(swf5.Action));
                            swf5.ActionDefineFunction = ActionDefineFunction;
                        })(swf5 = actions.swf5 || (actions.swf5 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionDefineFunction.js.map