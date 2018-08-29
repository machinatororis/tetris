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
                        var swf3;
                        (function (swf3) {
                            swf3.SWFData = flash.__native.format.swf.SWFData;
                            swf3.Action = flash.__native.format.swf.data.actions.Action;
                            swf3.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf3.IAction = flash.__native.format.swf.data.actions.IAction;
                            var ActionSetTarget = (function (_super) {
                                __extends(ActionSetTarget, _super);
                                function ActionSetTarget(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.targetName === void 0 && (_this.targetName = null);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                ActionSetTarget.prototype.parse = function (data) {
                                    data = strict(data, swf3.SWFData);
                                    this.targetName = data.readString();
                                };
                                ActionSetTarget.prototype.publish = function (data) {
                                    data = strict(data, swf3.SWFData);
                                    var body = new swf3.SWFData();
                                    body.writeString(this.targetName);
                                    this.write(data, body);
                                };
                                ActionSetTarget.prototype.clone = function () {
                                    var action = new ActionSetTarget(this.code, this.length, this.pos);
                                    action.targetName = this.targetName;
                                    return action;
                                };
                                ActionSetTarget.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    return "[ActionSetTarget] TargetName: " + this.targetName;
                                };
                                ActionSetTarget.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf3.ActionExecutionContext);
                                    return this.toBytecodeLabel(indent) + "setTarget \"" + this.targetName + "\"";
                                };
                                ActionSetTarget.CODE = 0x8b;
                                return ActionSetTarget;
                            }(swf3.Action));
                            swf3.ActionSetTarget = ActionSetTarget;
                        })(swf3 = actions.swf3 || (actions.swf3 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionSetTarget.js.map