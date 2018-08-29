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
                            var ActionStoreRegister = (function (_super) {
                                __extends(ActionStoreRegister, _super);
                                function ActionStoreRegister(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.registerNumber === void 0 && (_this.registerNumber = 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                ActionStoreRegister.prototype.parse = function (data) {
                                    data = strict(data, swf5.SWFData);
                                    this.registerNumber = data.readUI8();
                                };
                                ActionStoreRegister.prototype.publish = function (data) {
                                    data = strict(data, swf5.SWFData);
                                    var body = new swf5.SWFData();
                                    body.writeUI8(this.registerNumber);
                                    this.write(data, body);
                                };
                                ActionStoreRegister.prototype.clone = function () {
                                    var action = new ActionStoreRegister(this.code, this.length, this.pos);
                                    action.registerNumber = this.registerNumber;
                                    return action;
                                };
                                ActionStoreRegister.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    return "[ActionStoreRegister] RegisterNumber: " + this.registerNumber;
                                };
                                ActionStoreRegister.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf5.ActionExecutionContext);
                                    return this.toBytecodeLabel(indent) + "store $" + this.registerNumber;
                                };
                                ActionStoreRegister.CODE = 0x87;
                                return ActionStoreRegister;
                            }(swf5.Action));
                            swf5.ActionStoreRegister = ActionStoreRegister;
                        })(swf5 = actions.swf5 || (actions.swf5 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionStoreRegister.js.map