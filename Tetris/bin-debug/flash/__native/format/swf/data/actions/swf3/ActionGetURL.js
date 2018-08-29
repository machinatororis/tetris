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
                            var ActionGetURL = (function (_super) {
                                __extends(ActionGetURL, _super);
                                function ActionGetURL(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this.urlString === void 0 && (_this.urlString = null);
                                    _this.targetString === void 0 && (_this.targetString = null);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                ActionGetURL.prototype.parse = function (data) {
                                    data = strict(data, swf3.SWFData);
                                    this.urlString = data.readString();
                                    this.targetString = data.readString();
                                };
                                ActionGetURL.prototype.publish = function (data) {
                                    data = strict(data, swf3.SWFData);
                                    var body = new swf3.SWFData();
                                    body.writeString(this.urlString);
                                    body.writeString(this.targetString);
                                    this.write(data, body);
                                };
                                ActionGetURL.prototype.clone = function () {
                                    var action = new ActionGetURL(this.code, this.length, this.pos);
                                    action.urlString = this.urlString;
                                    action.targetString = this.targetString;
                                    return action;
                                };
                                ActionGetURL.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    return "[ActionGetURL] URL: " + this.urlString + ", Target: " + this.targetString;
                                };
                                ActionGetURL.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf3.ActionExecutionContext);
                                    return this.toBytecodeLabel(indent) + "getURL \"" + this.urlString + "\", \"" + this.targetString + "\"";
                                };
                                ActionGetURL.CODE = 0x83;
                                return ActionGetURL;
                            }(swf3.Action));
                            swf3.ActionGetURL = ActionGetURL;
                        })(swf3 = actions.swf3 || (actions.swf3 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionGetURL.js.map