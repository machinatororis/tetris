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
                    var consts;
                    (function (consts) {
                        var ActionValueType = (function () {
                            function ActionValueType() {
                            }
                            ActionValueType.toString = function (bitmapFormat) {
                                bitmapFormat = ((bitmapFormat) >>> 0);
                                switch (bitmapFormat) {
                                    case ActionValueType.STRING:
                                        return "string";
                                        break;
                                    case ActionValueType.FLOAT:
                                        return "float";
                                        break;
                                    case ActionValueType.NULL:
                                        return "null";
                                        break;
                                    case ActionValueType.UNDEFINED:
                                        return "undefined";
                                        break;
                                    case ActionValueType.REGISTER:
                                        return "register";
                                        break;
                                    case ActionValueType.BOOLEAN:
                                        return "boolean";
                                        break;
                                    case ActionValueType.DOUBLE:
                                        return "double";
                                        break;
                                    case ActionValueType.INTEGER:
                                        return "integer";
                                        break;
                                    case ActionValueType.CONSTANT_8:
                                        return "constant8";
                                        break;
                                    case ActionValueType.CONSTANT_16:
                                        return "constant16";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            ActionValueType.STRING = 0;
                            ActionValueType.FLOAT = 1;
                            ActionValueType.NULL = 2;
                            ActionValueType.UNDEFINED = 3;
                            ActionValueType.REGISTER = 4;
                            ActionValueType.BOOLEAN = 5;
                            ActionValueType.DOUBLE = 6;
                            ActionValueType.INTEGER = 7;
                            ActionValueType.CONSTANT_8 = 8;
                            ActionValueType.CONSTANT_16 = 9;
                            return ActionValueType;
                        }());
                        consts.ActionValueType = ActionValueType;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ActionValueType.js.map