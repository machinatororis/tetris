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
                        var swf5;
                        (function (swf5) {
                            swf5.Action = flash.__native.format.swf.data.actions.Action;
                            swf5.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf5.IAction = flash.__native.format.swf.data.actions.IAction;
                            var ActionEquals2 = (function (_super) {
                                __extends(ActionEquals2, _super);
                                function ActionEquals2(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                ActionEquals2.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    return "[ActionEquals2]";
                                };
                                ActionEquals2.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf5.ActionExecutionContext);
                                    return this.toBytecodeLabel(indent) + "equals2";
                                };
                                ActionEquals2.CODE = 0x49;
                                return ActionEquals2;
                            }(swf5.Action));
                            swf5.ActionEquals2 = ActionEquals2;
                        })(swf5 = actions.swf5 || (actions.swf5 = {}));
                    })(actions = data.actions || (data.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionEquals2.js.map