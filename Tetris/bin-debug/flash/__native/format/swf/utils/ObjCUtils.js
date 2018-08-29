var flash;
(function (flash) {
    var __native;
    (function (__native) {
        var format;
        (function (format) {
            var swf;
            (function (swf) {
                var utils;
                (function (utils) {
                    var ObjCUtils = (function () {
                        function ObjCUtils() {
                        }
                        ObjCUtils.num2str = function (n, twips) {
                            if (twips === void 0) { twips = false; }
                            n = (+(n));
                            twips = Boolean(twips);
                            if (twips) {
                                n = Math.round(n * 100) / 100;
                            }
                            var s = n.toString();
                            if (s.indexOf(".") == -1) {
                                s += ".0";
                            }
                            return s + "f";
                        };
                        return ObjCUtils;
                    }());
                    utils.ObjCUtils = ObjCUtils;
                })(utils = swf.utils || (swf.utils = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ObjCUtils.js.map