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
                    data_1.SWF = flash.__native.format.swf.SWF;
                    data_1.SWFData = flash.__native.format.swf.SWFData;
                    data_1.Action = flash.__native.format.swf.data.actions.Action;
                    data_1.ActionExecutionContext = flash.__native.format.swf.data.actions.ActionExecutionContext;
                    data_1.IAction = flash.__native.format.swf.data.actions.IAction;
                    data_1.StringUtils = flash.__native.utils.StringUtils;
                    var SWFClipActionRecord = (function () {
                        function SWFClipActionRecord(data, version) {
                            if (data === void 0) { data = null; }
                            if (version === void 0) { version = 0; }
                            this.eventFlags = null;
                            this.keyCode = 0;
                            this._actions = undefined;
                            this.labelCount = 0;
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            this._actions = new Array();
                            if (data != null) {
                                this.parse(data, version);
                            }
                        }
                        Object.defineProperty(SWFClipActionRecord.prototype, "actions", {
                            get: function () { return this._actions; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFClipActionRecord.prototype.parse = function (data, version) {
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            this.eventFlags = data.readCLIPEVENTFLAGS(version);
                            data.readUI32();
                            if (this.eventFlags.keyPressEvent) {
                                this.keyCode = data.readUI8();
                            }
                            var action;
                            while ((action = data.readACTIONRECORD()) != null) {
                                this._actions.push(action);
                            }
                            this.labelCount = data_1.Action.resolveOffsets(this._actions);
                        };
                        SWFClipActionRecord.prototype.publish = function (data, version) {
                            data = strict(data, data_1.SWFData);
                            version = ((version) >>> 0);
                            data.writeCLIPEVENTFLAGS(this.eventFlags, version);
                            var actionBlock = new data_1.SWFData();
                            if (this.eventFlags.keyPressEvent) {
                                actionBlock.writeUI8(this.keyCode);
                            }
                            for (var i = 0; i < this.actions.length; i++) {
                                actionBlock.writeACTIONRECORD(this.actions[i]);
                            }
                            actionBlock.writeUI8(0);
                            data.writeUI32(actionBlock.length);
                            data.writeBytes(actionBlock);
                        };
                        SWFClipActionRecord.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var str = "ClipActionRecord (" + this.eventFlags.toString() + ")";
                            if (this.keyCode > 0) {
                                str += ", KeyCode: " + this.keyCode;
                            }
                            if ((flags & data_1.SWF.TOSTRING_FLAG_AVM1_BYTECODE) == 0) {
                                for (var i = 0; i < this._actions.length; i++) {
                                    str += "\n" + data_1.StringUtils.repeat(indent + 2) + "[" + i + "] " + this._actions[i].toString(indent + 2);
                                }
                            }
                            else {
                                var context = new data_1.ActionExecutionContext(this._actions, [], this.labelCount);
                                for (i = 0; i < this._actions.length; i++) {
                                    str += "\n" + data_1.StringUtils.repeat(indent + 4) + this._actions[i].toBytecode(indent + 4, context);
                                }
                                if (context.endLabel != null) {
                                    str += "\n" + data_1.StringUtils.repeat(indent + 4) + context.endLabel + ":";
                                }
                            }
                            return str;
                        };
                        return SWFClipActionRecord;
                    }());
                    data_1.SWFClipActionRecord = SWFClipActionRecord;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFClipActionRecord.js.map