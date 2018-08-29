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
                        consts.SpreadMethod = flash.display.SpreadMethod;
                        var GradientSpreadMode = (function () {
                            function GradientSpreadMode() {
                            }
                            GradientSpreadMode.toString = function (spreadMode) {
                                spreadMode = ((spreadMode) >>> 0);
                                switch (spreadMode) {
                                    case GradientSpreadMode.PAD:
                                        return consts.SpreadMethod.PAD;
                                        break;
                                    case GradientSpreadMode.REFLECT:
                                        return consts.SpreadMethod.REFLECT;
                                        break;
                                    case GradientSpreadMode.REPEAT:
                                        return consts.SpreadMethod.REPEAT;
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            GradientSpreadMode.PAD = 0;
                            GradientSpreadMode.REFLECT = 1;
                            GradientSpreadMode.REPEAT = 2;
                            return GradientSpreadMode;
                        }());
                        consts.GradientSpreadMode = GradientSpreadMode;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GradientSpreadMode.js.map