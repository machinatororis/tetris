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
                        var CSMTableHint = (function () {
                            function CSMTableHint() {
                            }
                            CSMTableHint.toString = function (csmTableHint) {
                                csmTableHint = ((csmTableHint) >>> 0);
                                switch (csmTableHint) {
                                    case CSMTableHint.THIN:
                                        return "thin";
                                        break;
                                    case CSMTableHint.MEDIUM:
                                        return "medium";
                                        break;
                                    case CSMTableHint.THICK:
                                        return "thick";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            CSMTableHint.THIN = 0;
                            CSMTableHint.MEDIUM = 1;
                            CSMTableHint.THICK = 2;
                            return CSMTableHint;
                        }());
                        consts.CSMTableHint = CSMTableHint;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=CSMTableHint.js.map