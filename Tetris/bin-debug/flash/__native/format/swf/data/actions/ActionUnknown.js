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
                        actions.SWFData = flash.__native.format.swf.SWFData;
                        var ActionUnknown = (function (_super) {
                            __extends(ActionUnknown, _super);
                            function ActionUnknown(code, length, pos) {
                                var _this = this;
                                _this.implements_flash___native_format_swf_data_actions_IAction = null;
                                code = ((code) >>> 0);
                                length = ((length) >>> 0);
                                pos = ((pos) >>> 0);
                                _this = _super.call(this, code, length, pos) || this;
                                return _this;
                            }
                            ActionUnknown.prototype.parse = function (data) {
                                data = strict(data, actions.SWFData);
                                if (this._length > 0) {
                                    data.skipBytes(this._length);
                                }
                            };
                            ActionUnknown.prototype.toString = function (indent) {
                                if (indent === void 0) { indent = 0; }
                                indent = ((indent) >>> 0);
                                return "[????] Code: " + this._code.toString(16) + ", Length: " + this._length;
                            };
                            return ActionUnknown;
                        }(actions.Action));
                        actions.ActionUnknown = ActionUnknown;
                    })(actions = data_1.actions || (data_1.actions = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionUnknown.js.map