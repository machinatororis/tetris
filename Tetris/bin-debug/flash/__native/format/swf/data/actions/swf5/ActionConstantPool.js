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
                            var ActionConstantPool = (function (_super) {
                                __extends(ActionConstantPool, _super);
                                function ActionConstantPool(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.constants === void 0 && (_this.constants = undefined);
                                    _this = _super.call(this, code, length, pos) || this;
                                    _this.constants = new Array();
                                    return _this;
                                }
                                ActionConstantPool.prototype.parse = function (data) {
                                    data = strict(data, swf5.SWFData);
                                    var count = data.readUI16();
                                    for (var i = 0; i < count; i++) {
                                        this.constants.push(data.readString());
                                    }
                                };
                                ActionConstantPool.prototype.publish = function (data) {
                                    data = strict(data, swf5.SWFData);
                                    var body = new swf5.SWFData();
                                    body.writeUI16(this.constants.length);
                                    for (var i = 0; i < this.constants.length; i++) {
                                        body.writeString(this.constants[i]);
                                    }
                                    this.write(data, body);
                                };
                                ActionConstantPool.prototype.clone = function () {
                                    var action = new ActionConstantPool(this.code, this.length, this.pos);
                                    for (var i = 0; i < this.constants.length; i++) {
                                        action.constants.push(this.constants[i]);
                                    }
                                    return action;
                                };
                                ActionConstantPool.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    var str = "[ActionConstantPool] Values: " + this.constants.length;
                                    for (var i = 0; i < this.constants.length; i++) {
                                        str += "\n" + swf5.StringUtils.repeat(indent + 4) + i + ": " + swf5.StringUtils.simpleEscape(this.constants[i]);
                                    }
                                    return str;
                                };
                                ActionConstantPool.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf5.ActionExecutionContext);
                                    var str = this.toBytecodeLabel(indent) + "constantPool";
                                    context.cpool.length = 0;
                                    for (var i = 0; i < this.constants.length; i++) {
                                        str += "\n" + swf5.StringUtils.repeat(indent + 4) + i + ": " + swf5.StringUtils.simpleEscape(this.constants[i]);
                                        context.cpool.push(this.constants[i]);
                                    }
                                    return str;
                                };
                                ActionConstantPool.CODE = 0x88;
                                return ActionConstantPool;
                            }(swf5.Action));
                            swf5.ActionConstantPool = ActionConstantPool;
                        })(swf5 = actions.swf5 || (actions.swf5 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionConstantPool.js.map