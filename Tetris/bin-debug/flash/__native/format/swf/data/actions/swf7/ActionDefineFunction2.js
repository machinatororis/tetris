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
                            swf7.SWFRegisterParam = flash.__native.format.swf.data.SWFRegisterParam;
                            swf7.Action = flash.__native.format.swf.data.actions.Action;
                            swf7.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf7.IAction = flash.__native.format.swf.data.actions.IAction;
                            swf7.StringUtils = flash.__native.utils.StringUtils;
                            var ActionDefineFunction2 = (function (_super) {
                                __extends(ActionDefineFunction2, _super);
                                function ActionDefineFunction2(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.functionName === void 0 && (_this.functionName = null);
                                    _this.functionParams === void 0 && (_this.functionParams = undefined);
                                    _this.functionBody === void 0 && (_this.functionBody = undefined);
                                    _this.registerCount === void 0 && (_this.registerCount = 0);
                                    _this.preloadParent === void 0 && (_this.preloadParent = false);
                                    _this.preloadRoot === void 0 && (_this.preloadRoot = false);
                                    _this.preloadSuper === void 0 && (_this.preloadSuper = false);
                                    _this.preloadArguments === void 0 && (_this.preloadArguments = false);
                                    _this.preloadThis === void 0 && (_this.preloadThis = false);
                                    _this.preloadGlobal === void 0 && (_this.preloadGlobal = false);
                                    _this.suppressSuper === void 0 && (_this.suppressSuper = false);
                                    _this.suppressArguments === void 0 && (_this.suppressArguments = false);
                                    _this.suppressThis === void 0 && (_this.suppressThis = false);
                                    _this.labelCount === void 0 && (_this.labelCount = 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    _this.functionParams = new Array();
                                    _this.functionBody = new Array();
                                    _this.labelCount = 0;
                                    return _this;
                                }
                                ActionDefineFunction2.prototype.parse = function (data) {
                                    data = strict(data, swf7.SWFData);
                                    this.functionName = data.readString();
                                    var numParams = data.readUI16();
                                    this.registerCount = data.readUI8();
                                    var flags1 = data.readUI8();
                                    this.preloadParent = ((flags1 & 0x80) != 0);
                                    this.preloadRoot = ((flags1 & 0x40) != 0);
                                    this.suppressSuper = ((flags1 & 0x20) != 0);
                                    this.preloadSuper = ((flags1 & 0x10) != 0);
                                    this.suppressArguments = ((flags1 & 0x08) != 0);
                                    this.preloadArguments = ((flags1 & 0x04) != 0);
                                    this.suppressThis = ((flags1 & 0x02) != 0);
                                    this.preloadThis = ((flags1 & 0x01) != 0);
                                    var flags2 = data.readUI8();
                                    this.preloadGlobal = ((flags2 & 0x01) != 0);
                                    for (var i = 0; i < numParams; i++) {
                                        this.functionParams.push(data.readREGISTERPARAM());
                                    }
                                    var codeSize = data.readUI16();
                                    var bodyEndPosition = ((data.position + codeSize) >>> 0);
                                    while (data.position < bodyEndPosition) {
                                        this.functionBody.push(data.readACTIONRECORD());
                                    }
                                    this.labelCount = swf7.Action.resolveOffsets(this.functionBody);
                                };
                                ActionDefineFunction2.prototype.publish = function (data) {
                                    data = strict(data, swf7.SWFData);
                                    var i = 0;
                                    var body = new swf7.SWFData();
                                    body.writeString(this.functionName);
                                    body.writeUI16(this.functionParams.length);
                                    body.writeUI8(this.registerCount);
                                    var flags1 = 0;
                                    if (this.preloadParent) {
                                        flags1 |= 0x80;
                                    }
                                    if (this.preloadRoot) {
                                        flags1 |= 0x40;
                                    }
                                    if (this.suppressSuper) {
                                        flags1 |= 0x20;
                                    }
                                    if (this.preloadSuper) {
                                        flags1 |= 0x10;
                                    }
                                    if (this.suppressArguments) {
                                        flags1 |= 0x08;
                                    }
                                    if (this.preloadArguments) {
                                        flags1 |= 0x04;
                                    }
                                    if (this.suppressThis) {
                                        flags1 |= 0x02;
                                    }
                                    if (this.preloadThis) {
                                        flags1 |= 0x01;
                                    }
                                    body.writeUI8(flags1);
                                    var flags2 = 0;
                                    if (this.preloadGlobal) {
                                        flags2 |= 0x01;
                                    }
                                    body.writeUI8(flags2);
                                    for (i = 0; i < this.functionParams.length; i++) {
                                        body.writeREGISTERPARAM(this.functionParams[i]);
                                    }
                                    var bodyActions = new swf7.SWFData();
                                    for (i = 0; i < this.functionBody.length; i++) {
                                        bodyActions.writeACTIONRECORD(this.functionBody[i]);
                                    }
                                    body.writeUI16(bodyActions.length);
                                    this.write(data, body);
                                    data.writeBytes(bodyActions);
                                };
                                ActionDefineFunction2.prototype.clone = function () {
                                    var i = 0;
                                    var action = new ActionDefineFunction2(this.code, this.length, this.pos);
                                    action.functionName = this.functionName;
                                    for (i = 0; i < this.functionParams.length; i++) {
                                        action.functionParams.push(this.functionParams[i]);
                                    }
                                    for (i = 0; i < this.functionBody.length; i++) {
                                        action.functionBody.push(this.functionBody[i].clone());
                                    }
                                    action.registerCount = this.registerCount;
                                    action.preloadParent = this.preloadParent;
                                    action.preloadRoot = this.preloadRoot;
                                    action.preloadSuper = this.preloadSuper;
                                    action.preloadArguments = this.preloadArguments;
                                    action.preloadThis = this.preloadThis;
                                    action.preloadGlobal = this.preloadGlobal;
                                    action.suppressSuper = this.suppressSuper;
                                    action.suppressArguments = this.suppressArguments;
                                    action.suppressThis = this.suppressThis;
                                    return action;
                                };
                                ActionDefineFunction2.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    var str = "[ActionDefineFunction2] " +
                                        ((this.functionName == null || this.functionName.length == 0) ? "<anonymous>" : this.functionName) +
                                        "(" + this.functionParams.join(", ") + "), ";
                                    var a = [];
                                    if (this.preloadParent) {
                                        a.push("preloadParent");
                                    }
                                    if (this.preloadRoot) {
                                        a.push("preloadRoot");
                                    }
                                    if (this.preloadSuper) {
                                        a.push("preloadSuper");
                                    }
                                    if (this.preloadArguments) {
                                        a.push("preloadArguments");
                                    }
                                    if (this.preloadThis) {
                                        a.push("preloadThis");
                                    }
                                    if (this.preloadGlobal) {
                                        a.push("preloadGlobal");
                                    }
                                    if (this.suppressSuper) {
                                        a.push("suppressSuper");
                                    }
                                    if (this.suppressArguments) {
                                        a.push("suppressArguments");
                                    }
                                    if (this.suppressThis) {
                                        a.push("suppressThis");
                                    }
                                    if (a.length == 0) {
                                        a.push("none");
                                    }
                                    str += "Flags: " + a.join(",");
                                    for (var i = 0; i < this.functionBody.length; i++) {
                                        str += "\n" + swf7.StringUtils.repeat(indent + 4) + "[" + i + "] " + this.functionBody[i].toString(indent + 4);
                                    }
                                    return str;
                                };
                                ActionDefineFunction2.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf7.ActionExecutionContext);
                                    var str = this.toBytecodeLabel(indent) + "defineFunction2 " +
                                        ((this.functionName == null || this.functionName.length == 0) ? "" : this.functionName) +
                                        "(" + this.functionParams.join(", ") + ") {";
                                    var preload = [];
                                    var suppress = [];
                                    if (this.preloadParent) {
                                        preload.push("parent");
                                    }
                                    if (this.preloadRoot) {
                                        preload.push("root");
                                    }
                                    if (this.preloadSuper) {
                                        preload.push("super");
                                    }
                                    if (this.preloadArguments) {
                                        preload.push("arguments");
                                    }
                                    if (this.preloadThis) {
                                        preload.push("this");
                                    }
                                    if (this.preloadGlobal) {
                                        preload.push("global");
                                    }
                                    if (this.suppressSuper) {
                                        suppress.push("super");
                                    }
                                    if (this.suppressArguments) {
                                        suppress.push("arguments");
                                    }
                                    if (this.suppressThis) {
                                        suppress.push("this");
                                    }
                                    if (preload.length > 0) {
                                        str += "\n" + swf7.StringUtils.repeat(indent + 4) + "// preload: " + preload.join(", ");
                                    }
                                    if (suppress.length > 0) {
                                        str += "\n" + swf7.StringUtils.repeat(indent + 4) + "// suppress: " + suppress.join(", ");
                                    }
                                    var context = new swf7.ActionExecutionContext(this.functionBody, context.cpool.concat(), this.labelCount);
                                    for (var i = 0; i < this.functionBody.length; i++) {
                                        if (this.functionBody[i]) {
                                            str += "\n" + swf7.StringUtils.repeat(indent + 4) + this.functionBody[i].toBytecode(indent + 4, context);
                                        }
                                    }
                                    if (context.endLabel != null) {
                                        str += "\n" + swf7.StringUtils.repeat(indent + 4) + context.endLabel + ":";
                                    }
                                    str += "\n" + swf7.StringUtils.repeat(indent + 2) + "}";
                                    return str;
                                };
                                ActionDefineFunction2.CODE = 0x8e;
                                return ActionDefineFunction2;
                            }(swf7.Action));
                            swf7.ActionDefineFunction2 = ActionDefineFunction2;
                        })(swf7 = actions.swf7 || (actions.swf7 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionDefineFunction2.js.map