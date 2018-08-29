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
                            swf4.IActionBranch = flash.__native.format.swf.data.actions.IActionBranch;
                            swf4.SWFData = flash.__native.format.swf.SWFData;
                            var ActionJump = (function (_super) {
                                __extends(ActionJump, _super);
                                function ActionJump(code, length, pos) {
                                    var _this = this;
                                    _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                    _this.implements_flash___native_format_swf_data_actions_IActionBranch = null;
                                    code = ((code) >>> 0);
                                    length = ((length) >>> 0);
                                    pos = ((pos) >>> 0);
                                    _this._branchOffset === void 0 && (_this._branchOffset = 0);
                                    _this._branchIndex === void 0 && (_this._branchIndex = -2);
                                    _this = _super.call(this, code, length, pos) || this;
                                    return _this;
                                }
                                Object.defineProperty(ActionJump.prototype, "branchOffset", {
                                    get: function () { return this._branchOffset; },
                                    set: function (value) { value = ((value) >> 0); this._branchOffset = value; },
                                    enumerable: true,
                                    configurable: true
                                });
                                Object.defineProperty(ActionJump.prototype, "branchIndex", {
                                    get: function () { return this._branchIndex; },
                                    set: function (value) { value = ((value) >> 0); this._branchIndex = value; },
                                    enumerable: true,
                                    configurable: true
                                });
                                ActionJump.prototype.parse = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    this._branchOffset = data.readSI16();
                                };
                                ActionJump.prototype.publish = function (data) {
                                    data = strict(data, swf4.SWFData);
                                    var body = new swf4.SWFData();
                                    body.writeSI16(this._branchOffset);
                                    this.write(data, body);
                                };
                                ActionJump.prototype.clone = function () {
                                    var action = new ActionJump(this.code, this.length, this.pos);
                                    action.branchOffset = this._branchOffset;
                                    return action;
                                };
                                ActionJump.prototype.toString = function (indent) {
                                    if (indent === void 0) { indent = 0; }
                                    indent = ((indent) >>> 0);
                                    var bi = " [";
                                    if (this._branchIndex >= 0) {
                                        bi += this._branchIndex.toString();
                                    }
                                    else if (this._branchIndex == -1) {
                                        bi += "EOB";
                                    }
                                    else {
                                        bi += "???";
                                    }
                                    bi += "]";
                                    return "[ActionJump] BranchOffset: " + this.branchOffset + bi;
                                };
                                ActionJump.prototype.toBytecode = function (indent, context) {
                                    indent = ((indent) >>> 0);
                                    context = strict(context, swf4.ActionExecutionContext);
                                    var ls = "";
                                    if (this._branchIndex >= 0) {
                                        ls += context.actions[this._branchIndex].lbl;
                                    }
                                    else if (this._branchIndex == -1) {
                                        ls += "L" + (context.labelCount + 1);
                                    }
                                    else {
                                        ls += "ILLEGAL BRANCH";
                                    }
                                    return this.toBytecodeLabel(indent) + "jump " + ls;
                                };
                                ActionJump.CODE = 0x99;
                                return ActionJump;
                            }(swf4.Action));
                            swf4.ActionJump = ActionJump;
                        })(swf4 = actions.swf4 || (actions.swf4 = {}));
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionJump.js.map