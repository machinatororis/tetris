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
                        var swf7;
                        (function (swf7) {
                            swf7.SWFData = flash.__native.format.swf.SWFData;
                            swf7.Action = flash.__native.format.swf.data.actions.Action;
                            swf7.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf7.IAction = flash.__native.format.swf.data.actions.IAction;
                            swf7.StringUtils = flash.__native.utils.StringUtils;
                            var ActionTry = (function (_super) {
                                __extends(ActionTry, _super);
                                function ActionTry(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.catchInRegisterFlag === void 0 && (_this.catchInRegisterFlag = false);
                                    _this.finallyBlockFlag === void 0 && (_this.finallyBlockFlag = false);
                                    _this.catchBlockFlag === void 0 && (_this.catchBlockFlag = false);
                                    _this.catchName === void 0 && (_this.catchName = null);
                                    _this.catchRegister === void 0 && (_this.catchRegister = 0);
                                    _this.tryBody === void 0 && (_this.tryBody = undefined);
                                    _this.catchBody === void 0 && (_this.catchBody = undefined);
                                    _this.finallyBody === void 0 && (_this.finallyBody = undefined);
                                    _this.labelCountTry === void 0 && (_this.labelCountTry = 0);
                                    _this.labelCountCatch === void 0 && (_this.labelCountCatch = 0);
                                    _this.labelCountFinally === void 0 && (_this.labelCountFinally = 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    _this.tryBody = new Array();
                                    _this.catchBody = new Array();
                                    _this.finallyBody = new Array();
                                    _this.labelCountTry = 0;
                                    _this.labelCountCatch = 0;
                                    _this.labelCountFinally = 0;
                                    return _this;
                                }
                                ActionTry.prototype.parse = function (data) {
                                    data = strict(data, swf7.SWFData);
                                    var flags = data.readUI8();
                                    this.catchInRegisterFlag = ((flags & 0x04) != 0);
                                    this.finallyBlockFlag = ((flags & 0x02) != 0);
                                    this.catchBlockFlag = ((flags & 0x01) != 0);
                                    var trySize = data.readUI16();
                                    var catchSize = data.readUI16();
                                    var finallySize = data.readUI16();
                                    if (this.catchInRegisterFlag) {
                                        this.catchRegister = data.readUI8();
                                    }
                                    else {
                                        this.catchName = data.readString();
                                    }
                                    var tryEndPosition = ((data.position + trySize) >>> 0);
                                    while (data.position < tryEndPosition) {
                                        this.tryBody.push(data.readACTIONRECORD());
                                    }
                                    var catchEndPosition = ((data.position + catchSize) >>> 0);
                                    while (data.position < catchEndPosition) {
                                        this.catchBody.push(data.readACTIONRECORD());
                                    }
                                    var finallyEndPosition = ((data.position + finallySize) >>> 0);
                                    while (data.position < finallyEndPosition) {
                                        this.finallyBody.push(data.readACTIONRECORD());
                                    }
                                    this.labelCountTry = swf7.Action.resolveOffsets(this.tryBody);
                                    this.labelCountCatch = swf7.Action.resolveOffsets(this.catchBody);
                                    this.labelCountFinally = swf7.Action.resolveOffsets(this.finallyBody);
                                };
                                ActionTry.prototype.publish = function (data) {
                                    data = strict(data, swf7.SWFData);
                                    var i = 0;
                                    var body = new swf7.SWFData();
                                    var flags = 0;
                                    if (this.catchInRegisterFlag) {
                                        flags |= 0x04;
                                    }
                                    if (this.finallyBlockFlag) {
                                        flags |= 0x02;
                                    }
                                    if (this.catchBlockFlag) {
                                        flags |= 0x01;
                                    }
                                    body.writeUI8(flags);
                                    var bodyTryActions = new swf7.SWFData();
                                    for (i = 0; i < this.tryBody.length; i++) {
                                        bodyTryActions.writeACTIONRECORD(this.tryBody[i]);
                                    }
                                    var bodyCatchActions = new swf7.SWFData();
                                    for (i = 0; i < this.catchBody.length; i++) {
                                        bodyCatchActions.writeACTIONRECORD(this.catchBody[i]);
                                    }
                                    var bodyFinallyActions = new swf7.SWFData();
                                    for (i = 0; i < this.finallyBody.length; i++) {
                                        bodyFinallyActions.writeACTIONRECORD(this.finallyBody[i]);
                                    }
                                    body.writeUI16(bodyTryActions.length);
                                    body.writeUI16(bodyCatchActions.length);
                                    body.writeUI16(bodyFinallyActions.length);
                                    if (this.catchInRegisterFlag) {
                                        body.writeUI8(this.catchRegister);
                                    }
                                    else {
                                        body.writeString(this.catchName);
                                    }
                                    body.writeBytes(bodyTryActions);
                                    body.writeBytes(bodyCatchActions);
                                    body.writeBytes(bodyFinallyActions);
                                    this.write(data, body);
                                };
                                ActionTry.prototype.clone = function () {
                                    var i = 0;
                                    var action = new ActionTry(this.code, this.length, this.pos);
                                    action.catchInRegisterFlag = this.catchInRegisterFlag;
                                    action.finallyBlockFlag = this.finallyBlockFlag;
                                    action.catchBlockFlag = this.catchBlockFlag;
                                    action.catchName = this.catchName;
                                    action.catchRegister = this.catchRegister;
                                    for (i = 0; i < this.tryBody.length; i++) {
                                        action.tryBody.push(this.tryBody[i].clone());
                                    }
                                    for (i = 0; i < this.catchBody.length; i++) {
                                        action.catchBody.push(this.catchBody[i].clone());
                                    }
                                    for (i = 0; i < this.finallyBody.length; i++) {
                                        action.finallyBody.push(this.finallyBody[i].clone());
                                    }
                                    return action;
                                };
                                ActionTry.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    var str = "[ActionTry] ";
                                    str += (this.catchInRegisterFlag) ? "Register: " + this.catchRegister : "Name: " + this.catchName;
                                    var i = 0;
                                    if (this.tryBody.length) {
                                        str += "\n" + swf7.StringUtils.repeat(indent + 2) + "Try:";
                                        for (i = 0; i < this.tryBody.length; i++) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + "[" + i + "] " + this.tryBody[i].toString(indent + 4);
                                        }
                                    }
                                    if (this.catchBody.length) {
                                        str += "\n" + swf7.StringUtils.repeat(indent + 2) + "Catch:";
                                        for (i = 0; i < this.catchBody.length; i++) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + "[" + i + "] " + this.catchBody[i].toString(indent + 4);
                                        }
                                    }
                                    if (this.finallyBody.length) {
                                        str += "\n" + swf7.StringUtils.repeat(indent + 2) + "Finally:";
                                        for (i = 0; i < this.finallyBody.length; i++) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + "[" + i + "] " + this.finallyBody[i].toString(indent + 4);
                                        }
                                    }
                                    return str;
                                };
                                ActionTry.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf7.ActionExecutionContext);
                                    var str = this.lbl ? this.lbl + ":\n" : "";
                                    var lf = "";
                                    var i = 0;
                                    if (this.tryBody.length) {
                                        str += lf + swf7.StringUtils.repeat(indent + 2) + "try {";
                                        var contextTry = new swf7.ActionExecutionContext(this.tryBody, context.cpool.concat(), this.labelCountTry);
                                        for (i = 0; i < this.tryBody.length; i++) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + this.tryBody[i].toBytecode(indent + 4, contextTry);
                                        }
                                        if (contextTry.endLabel != null) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + contextTry.endLabel + ":";
                                        }
                                        str += "\n" + swf7.StringUtils.repeat(indent + 2) + "}";
                                        lf = "\n";
                                    }
                                    if (this.catchBody.length) {
                                        str += lf + swf7.StringUtils.repeat(indent + 2) + "catch(" + ((this.catchInRegisterFlag) ? "$" + this.catchRegister : this.catchName) + ") {";
                                        var contextCatch = new swf7.ActionExecutionContext(this.catchBody, context.cpool.concat(), this.labelCountCatch);
                                        for (i = 0; i < this.catchBody.length; i++) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + this.catchBody[i].toBytecode(indent + 4, contextCatch);
                                        }
                                        if (contextCatch.endLabel != null) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + contextCatch.endLabel + ":";
                                        }
                                        str += "\n" + swf7.StringUtils.repeat(indent + 2) + "}";
                                        lf = "\n";
                                    }
                                    if (this.finallyBody.length) {
                                        str += lf + swf7.StringUtils.repeat(indent + 2) + "finally {";
                                        var contextFinally = new swf7.ActionExecutionContext(this.finallyBody, context.cpool.concat(), this.labelCountFinally);
                                        for (i = 0; i < this.finallyBody.length; i++) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + this.finallyBody[i].toBytecode(indent + 4, contextFinally);
                                        }
                                        if (contextFinally.endLabel != null) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + contextFinally.endLabel + ":";
                                        }
                                        str += "\n" + swf7.StringUtils.repeat(indent + 2) + "}";
                                    }
                                    return str;
                                };
                                ActionTry.CODE = 0x8f;
                                return ActionTry;
                            }(swf7.Action));
                            swf7.ActionTry = ActionTry;
                        })(swf7 = actions.swf7 || (actions.swf7 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionTry.js.map