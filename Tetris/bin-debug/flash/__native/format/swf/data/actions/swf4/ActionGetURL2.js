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
                            swf4.Action = flash.__native.format.swf.data.actions.Action;
                            swf4.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf4.IAction = flash.__native.format.swf.data.actions.IAction;
                            var ActionGetURL2 = (function (_super) {
                                __extends(ActionGetURL2, _super);
                                function ActionGetURL2(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.sendVarsMethod === void 0 && (_this.sendVarsMethod = 0);
                                    _this.reserved === void 0 && (_this.reserved = 0);
                                    _this.loadTargetFlag === void 0 && (_this.loadTargetFlag = false);
                                    _this.loadVariablesFlag === void 0 && (_this.loadVariablesFlag = false);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                ActionGetURL2.prototype.parse = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    this.sendVarsMethod = data.readUB(2);
                                    this.reserved = data.readUB(4);
                                    this.loadTargetFlag = (data.readUB(1) == 1);
                                    this.loadVariablesFlag = (data.readUB(1) == 1);
                                };
                                ActionGetURL2.prototype.publish = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    var body = new swf4.SWFData();
                                    body.writeUB(2, this.sendVarsMethod);
                                    body.writeUB(4, this.reserved);
                                    body.writeUB(1, this.loadTargetFlag ? 1 : 0);
                                    body.writeUB(1, this.loadVariablesFlag ? 1 : 0);
                                    this.write(data, body);
                                };
                                ActionGetURL2.prototype.clone = function () {
                                    var action = new ActionGetURL2(this.code, this.length, this.pos);
                                    action.sendVarsMethod = this.sendVarsMethod;
                                    action.reserved = this.reserved;
                                    action.loadTargetFlag = this.loadTargetFlag;
                                    action.loadVariablesFlag = this.loadVariablesFlag;
                                    return action;
                                };
                                ActionGetURL2.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    return "[ActionGetURL2] " +
                                        "SendVarsMethod: " + this.sendVarsMethod + " (" + this.sendVarsMethodToString() + "), " +
                                        "Reserved: " + this.reserved + ", " +
                                        "LoadTargetFlag: " + this.loadTargetFlag + ", " +
                                        "LoadVariablesFlag: " + this.loadVariablesFlag;
                                };
                                ActionGetURL2.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf4.ActionExecutionContext);
                                    return this.toBytecodeLabel(indent) +
                                        "getUrl2 (method: " + this.sendVarsMethodToString() + ", target: " +
                                        (this.loadTargetFlag == 0 ? "window" : "sprite") + ", variables: " +
                                        (this.loadVariablesFlag == 0 ? "no" : "yes") + ")";
                                };
                                ActionGetURL2.prototype.sendVarsMethodToString = function () {
                                    if (!this.sendVarsMethod) {
                                        return "None";
                                    }
                                    else if (this.sendVarsMethod == 1) {
                                        return "GET";
                                    }
                                    else if (this.sendVarsMethod == 2) {
                                        return "POST";
                                    }
                                    else {
                                        throw new Error("sendVarsMethod is only defined for values of 0, 1, and 2.");
                                    }
                                };
                                ActionGetURL2.CODE = 0x9a;
                                return ActionGetURL2;
                            }(swf4.Action));
                            swf4.ActionGetURL2 = ActionGetURL2;
                        })(swf4 = actions.swf4 || (actions.swf4 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionGetURL2.js.map