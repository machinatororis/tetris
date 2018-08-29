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
                    (function (actions_1) {
                        var ActionExecutionContext = (function () {
                            function ActionExecutionContext(actions, cpool, labelCount) {
                                this._actions = undefined;
                                this._cpool = null;
                                this.labelCount = 0;
                                this.endLabel = null;
                                cpool = strict(cpool, Array);
                                labelCount = ((labelCount) >>> 0);
                                this._actions = this.actions;
                                this._cpool = cpool;
                                this.labelCount = labelCount;
                                this.endLabel = null;
                                for (var i = 0; i < actions.length; i++) {
                                    var action = strict(actions[i], 'implements_flash___native_format_swf_data_actions_IAction');
                                    if (is(action, 'implements_flash___native_format_swf_data_actions_IActionBranch')) {
                                        var actionBranch = as(action, 'implements_flash___native_format_swf_data_actions_IActionBranch');
                                        if (actionBranch.branchIndex == -1) {
                                            this.endLabel = "L" + (labelCount + 1);
                                            break;
                                        }
                                    }
                                }
                            }
                            Object.defineProperty(ActionExecutionContext.prototype, "actions", {
                                get: function () { return this._actions; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(ActionExecutionContext.prototype, "cpool", {
                                get: function () { return this._cpool; },
                                enumerable: true,
                                configurable: true
                            });
                            return ActionExecutionContext;
                        }());
                        actions_1.ActionExecutionContext = ActionExecutionContext;
                    })(actions = data.actions || (data.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionExecutionContext.js.map