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
                            swf4.Action = flash.__native.format.swf.data.actions.Action;
                            swf4.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                            swf4.IAction = flash.__native.format.swf.data.actions.IAction;
                            swf4.SWFData = flash.__native.format.swf.SWFData;
                            var ActionGotoFrame2 = (function (_super) {
                                __extends(ActionGotoFrame2, _super);
                                function ActionGotoFrame2(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.sceneBiasFlag === void 0 && (_this.sceneBiasFlag = false);
                                    _this.playFlag === void 0 && (_this.playFlag = false);
                                    _this.sceneBias === void 0 && (_this.sceneBias = 0);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                ActionGotoFrame2.prototype.parse = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    var flags = data.readUI8();
                                    this.sceneBiasFlag = ((flags & 0x02) != 0);
                                    this.playFlag = ((flags & 0x01) != 0);
                                    if (this.sceneBiasFlag) {
                                        this.sceneBias = data.readUI16();
                                    }
                                };
                                ActionGotoFrame2.prototype.publish = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    var body = new swf4.SWFData();
                                    var flags = 0;
                                    if (this.sceneBiasFlag) {
                                        flags |= 0x02;
                                    }
                                    if (this.playFlag) {
                                        flags |= 0x01;
                                    }
                                    body.writeUI8(flags);
                                    if (this.sceneBiasFlag) {
                                        body.writeUI16(this.sceneBias);
                                    }
                                    this.write(data, body);
                                };
                                ActionGotoFrame2.prototype.clone = function () {
                                    var action = new ActionGotoFrame2(this.code, this.length, this.pos);
                                    action.sceneBiasFlag = this.sceneBiasFlag;
                                    action.playFlag = this.playFlag;
                                    action.sceneBias = this.sceneBias;
                                    return action;
                                };
                                ActionGotoFrame2.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    var str = "[ActionGotoFrame2] " +
                                        "PlayFlag: " + this.playFlag + ", ";
                                    "SceneBiasFlag: " + this.sceneBiasFlag;
                                    if (this.sceneBiasFlag) {
                                        str += ", " + this.sceneBias;
                                    }
                                    return str;
                                };
                                ActionGotoFrame2.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf4.ActionExecutionContext);
                                    return this.toBytecodeLabel(indent) + "gotoFrame2 (" +
                                        (this.playFlag == 0 ? "gotoAndStop" : "gotoAndPlay") +
                                        (this.sceneBiasFlag == 1 ? ", sceneBias: " + this.sceneBias : "") +
                                        ")";
                                };
                                ActionGotoFrame2.CODE = 0x9f;
                                return ActionGotoFrame2;
                            }(swf4.Action));
                            swf4.ActionGotoFrame2 = ActionGotoFrame2;
                        })(swf4 = actions.swf4 || (actions.swf4 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionGotoFrame2.js.map