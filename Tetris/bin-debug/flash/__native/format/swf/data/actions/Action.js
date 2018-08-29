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
                    (function (actions_1) {
                        actions_1.SWFData = flash.__native.format.swf.SWFData;
                        actions_1.StringUtils = flash.__native.utils.StringUtils;
                        var Action = (function () {
                            function Action(code, length, pos) {
                                this.implements_flash___native_format_swf_data_actions_IAction = null;
                                this._code = 0;
                                this._length = 0;
                                this._pos = 0;
                                this._lbl = null;
                                code = ((code) >>> 0);
                                length = ((length) >>> 0);
                                pos = ((pos) >>> 0);
                                this._code = code;
                                this._length = length;
                                this._pos = pos;
                                this._lbl = null;
                            }
                            Object.defineProperty(Action.prototype, "code", {
                                get: function () { return this._code; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(Action.prototype, "length", {
                                get: function () { return this._length; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(Action.prototype, "lengthWithHeader", {
                                get: function () { return this._length + (this._code >= 0x80 ? 3 : 1); },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(Action.prototype, "pos", {
                                get: function () { return this._pos; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(Action.prototype, "lbl", {
                                get: function () { return this._lbl; },
                                set: function (value) { value = as(value, 'String'); this._lbl = value; },
                                enumerable: true,
                                configurable: true
                            });
                            Action.prototype.parse = function (data) {
                                data = strict(data, actions_1.SWFData);
                            };
                            Action.prototype.publish = function (data) {
                                data = strict(data, actions_1.SWFData);
                                this.write(data);
                            };
                            Action.prototype.clone = function () {
                                return new Action(this.code, this.length, this.pos);
                            };
                            Action.prototype.write = function (data, body) {
                                if (body === void 0) { body = null; }
                                data = strict(data, actions_1.SWFData);
                                body = strict(body, actions_1.SWFData);
                                data.writeUI8(this.code);
                                if (this.code >= 0x80) {
                                    if (body != null && body.length > 0) {
                                        this._length = body.length;
                                        data.writeUI16(this._length);
                                        data.writeBytes(body);
                                    }
                                    else {
                                        this._length = 0;
                                        throw (new Error("Action body null or empty."));
                                    }
                                }
                                else {
                                    this._length = 0;
                                }
                            };
                            Action.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                return "[Action] Code: " + this._code.toString(16) + ", Length: " + this._length;
                            };
                            Action.prototype.toBytecode = function (indent, context) {
                                indent = ((indent) >>> 0);
                                context = strict(context, actions_1.ActionExecutionContext);
                                return this.toBytecodeLabel(indent) + "unknown (0x" + this._code.toString(16) + ")";
                            };
                            Action.prototype.toBytecodeLabel = function (indent) {
                                indent = ((indent) >>> 0);
                                if (this.lbl != null) {
                                    return this.lbl + ":\n" + actions_1.StringUtils.repeat(indent + 2);
                                }
                                else {
                                    return actions_1.StringUtils.repeat(2);
                                }
                            };
                            Action.resolveOffsets = function (actions) {
                                var labelNr = 1;
                                var labelCount = 0;
                                var action;
                                var n = ((actions.length) >>> 0);
                                var i = 0;
                                for (i = 0; i < n; i++) {
                                    action = strict(actions[i], 'implements_flash___native_format_swf_data_actions_IAction');
                                    if (is(action, 'implements_flash___native_format_swf_data_actions_IActionBranch')) {
                                        var j = 0;
                                        var found = false;
                                        var actionBranch = as(action, 'implements_flash___native_format_swf_data_actions_IActionBranch');
                                        var targetPos = ((actionBranch.pos + actionBranch.lengthWithHeader + actionBranch.branchOffset) >>> 0);
                                        if (targetPos <= actionBranch.pos) {
                                            for (j = i; j >= 0; j--) {
                                                if (targetPos == actions[j].pos) {
                                                    labelCount++;
                                                    found = true;
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            for (j = i + 1; j < n; j++) {
                                                if (targetPos == actions[j].pos) {
                                                    labelCount++;
                                                    found = true;
                                                    break;
                                                }
                                            }
                                            if (!found) {
                                                action = strict(actions[j - 1], 'implements_flash___native_format_swf_data_actions_IAction');
                                                if (targetPos == action.pos + action.lengthWithHeader) {
                                                    j = -1;
                                                    found = true;
                                                }
                                            }
                                        }
                                        if (found) {
                                            actionBranch.branchIndex = j;
                                            if (j >= 0) {
                                                action = strict(actions[j], 'implements_flash___native_format_swf_data_actions_IAction');
                                                action.lbl = "L";
                                            }
                                        }
                                        else {
                                            actionBranch.branchIndex = -2;
                                        }
                                    }
                                }
                                for (i = 0; i < n; i++) {
                                    action = strict(actions[i], 'implements_flash___native_format_swf_data_actions_IAction');
                                    if (action.lbl != null) {
                                        action.lbl += labelNr++;
                                    }
                                }
                                return labelCount;
                            };
                            return Action;
                        }());
                        actions_1.Action = Action;
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=Action.js.map