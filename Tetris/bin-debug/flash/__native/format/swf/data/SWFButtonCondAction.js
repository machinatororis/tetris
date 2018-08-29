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
                    var SWFButtonCondAction = (function () {
                        function SWFButtonCondAction(data) {
                            if (data === void 0) { data = null; }
                            this.condActionSize = 0;
                            this.condIdleToOverDown = false;
                            this.condOutDownToIdle = false;
                            this.condOutDownToOverDown = false;
                            this.condOverDownToOutDown = false;
                            this.condOverDownToOverUp = false;
                            this.condOverUpToOverDown = false;
                            this.condOverUpToIdle = false;
                            this.condIdleToOverUp = false;
                            this.condOverDownToIdle = false;
                            this.condKeyPress = 0;
                            this._actions = undefined;
                            this.labelCount = 0;
                            data = strict(data, data_1.SWFData);
                            this._actions = new Array();
                            if (data != null) {
                                this.parse(data);
                            }
                        }
                        Object.defineProperty(SWFButtonCondAction.prototype, "actions", {
                            get: function () { return this._actions; },
                            enumerable: true,
                            configurable: true
                        });
                        SWFButtonCondAction.prototype.parse = function (data) {
                            data = strict(data, data_1.SWFData);
                            var flags = (((data.readUI8() << 8) | data.readUI8()) >>> 0);
                            this.condIdleToOverDown = ((flags & 0x8000) != 0);
                            this.condOutDownToIdle = ((flags & 0x4000) != 0);
                            this.condOutDownToOverDown = ((flags & 0x2000) != 0);
                            this.condOverDownToOutDown = ((flags & 0x1000) != 0);
                            this.condOverDownToOverUp = ((flags & 0x0800) != 0);
                            this.condOverUpToOverDown = ((flags & 0x0400) != 0);
                            this.condOverUpToIdle = ((flags & 0x0200) != 0);
                            this.condIdleToOverUp = ((flags & 0x0100) != 0);
                            this.condOverDownToIdle = ((flags & 0x0001) != 0);
                            this.condKeyPress = (((flags & 0xff) >> 1) >>> 0);
                            var action;
                            while ((action = data.readACTIONRECORD()) != null) {
                                this._actions.push(action);
                            }
                            this.labelCount = data_1.Action.resolveOffsets(this._actions);
                        };
                        SWFButtonCondAction.prototype.publish = function (data) {
                            data = strict(data, data_1.SWFData);
                            var flags1 = 0;
                            if (this.condIdleToOverDown) {
                                flags1 |= 0x80;
                            }
                            if (this.condOutDownToIdle) {
                                flags1 |= 0x40;
                            }
                            if (this.condOutDownToOverDown) {
                                flags1 |= 0x20;
                            }
                            if (this.condOverDownToOutDown) {
                                flags1 |= 0x10;
                            }
                            if (this.condOverDownToOverUp) {
                                flags1 |= 0x08;
                            }
                            if (this.condOverUpToOverDown) {
                                flags1 |= 0x04;
                            }
                            if (this.condOverUpToIdle) {
                                flags1 |= 0x02;
                            }
                            if (this.condIdleToOverUp) {
                                flags1 |= 0x01;
                            }
                            data.writeUI8(flags1);
                            var flags2 = ((this.condKeyPress << 1) >>> 0);
                            if (this.condOverDownToIdle) {
                                flags2 |= 0x01;
                            }
                            data.writeUI8(flags2);
                            for (var i = 0; i < this.actions.length; i++) {
                                data.writeACTIONRECORD(this.actions[i]);
                            }
                            data.writeUI8(0);
                        };
                        SWFButtonCondAction.prototype.clone = function () {
                            var condAction = new SWFButtonCondAction();
                            condAction.condActionSize = this.condActionSize;
                            condAction.condIdleToOverDown = this.condIdleToOverDown;
                            condAction.condOutDownToIdle = this.condOutDownToIdle;
                            condAction.condOutDownToOverDown = this.condOutDownToOverDown;
                            condAction.condOverDownToOutDown = this.condOverDownToOutDown;
                            condAction.condOverDownToOverUp = this.condOverDownToOverUp;
                            condAction.condOverUpToOverDown = this.condOverUpToOverDown;
                            condAction.condOverUpToIdle = this.condOverUpToIdle;
                            condAction.condIdleToOverUp = this.condIdleToOverUp;
                            condAction.condOverDownToIdle = this.condOverDownToIdle;
                            condAction.condKeyPress = this.condKeyPress;
                            for (var i = 0; i < this.actions.length; i++) {
                                condAction.actions.push(this.actions[i].clone());
                            }
                            return condAction;
                        };
                        SWFButtonCondAction.prototype.toString = function (indent, flags) {
                            if (indent === void 0) { indent = 0; }
                            if (flags === void 0) { flags = 0; }
                            indent = ((indent) >>> 0);
                            flags = ((flags) >>> 0);
                            var a = [];
                            if (this.condIdleToOverDown) {
                                a.push("idleToOverDown");
                            }
                            if (this.condOutDownToIdle) {
                                a.push("outDownToIdle");
                            }
                            if (this.condOutDownToOverDown) {
                                a.push("outDownToOverDown");
                            }
                            if (this.condOverDownToOutDown) {
                                a.push("overDownToOutDown");
                            }
                            if (this.condOverDownToOverUp) {
                                a.push("overDownToOverUp");
                            }
                            if (this.condOverUpToOverDown) {
                                a.push("overUpToOverDown");
                            }
                            if (this.condOverUpToIdle) {
                                a.push("overUpToIdle");
                            }
                            if (this.condIdleToOverUp) {
                                a.push("idleToOverUp");
                            }
                            if (this.condOverDownToIdle) {
                                a.push("overDownToIdle");
                            }
                            var str = "CondActionRecord (" + a.join(", ") + ")";
                            if (this.condKeyPress > 0) {
                                str += ", KeyPress: " + this.condKeyPress;
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
                        return SWFButtonCondAction;
                    }());
                    data_1.SWFButtonCondAction = SWFButtonCondAction;
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SWFButtonCondAction.js.map