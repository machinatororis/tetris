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
                (function (data) {
                    var actions;
                    (function (actions) {
                        var swf6;
                        (function (swf6) {
                            swf6.Action = flash.__native.format.swf.data.actions.Action;
                            swf6.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf6.IAction = flash.__native.format.swf.data.actions.IAction;
                            var ActionEnumerate2 = (function (_super) {
                                __extends(ActionEnumerate2, _super);
                                function ActionEnumerate2(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                ActionEnumerate2.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    return "[ActionEnumerate2]";
                                };
                                ActionEnumerate2.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf6.ActionExecutionContext);
                                    return this.toBytecodeLabel(indent) + "enumerate2";
                                };
                                ActionEnumerate2.CODE = 0x55;
                                return ActionEnumerate2;
                            }(swf6.Action));
                            swf6.ActionEnumerate2 = ActionEnumerate2;
                        })(swf6 = actions.swf6 || (actions.swf6 = {}));
                    })(actions = data.actions || (data.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionEnumerate2.js.map