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
                            var ActionWaitForFrame2 = (function (_super) {
                                __extends(ActionWaitForFrame2, _super);
                                function ActionWaitForFrame2(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.skipCount === void 0 && (_this.skipCount = 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                ActionWaitForFrame2.prototype.parse = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    this.skipCount = data.readUI8();
                                };
                                ActionWaitForFrame2.prototype.publish = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    var body = new swf4.SWFData();
                                    body.writeUI8(this.skipCount);
                                    this.write(data, body);
                                };
                                ActionWaitForFrame2.prototype.clone = function () {
                                    var action = new ActionWaitForFrame2(this.code, this.length, this.pos);
                                    action.skipCount = this.skipCount;
                                    return action;
                                };
                                ActionWaitForFrame2.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    return "[ActionWaitForFrame2] SkipCount: " + this.skipCount;
                                };
                                ActionWaitForFrame2.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf4.ActionExecutionContext);
                                    return this.toBytecodeLabel(indent) + "waitForFrame2 (" + this.skipCount + ")";
                                };
                                ActionWaitForFrame2.CODE = 0x8d;
                                return ActionWaitForFrame2;
                            }(swf4.Action));
                            swf4.ActionWaitForFrame2 = ActionWaitForFrame2;
                        })(swf4 = actions.swf4 || (actions.swf4 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionWaitForFrame2.js.map