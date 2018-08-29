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
                    var NumberUtils = (function () {
                        function NumberUtils() {
                        }
                        NumberUtils.roundPixels20 = function (pixels) {
                            pixels = (+(pixels));
                            return Math.round(pixels * 100) / 100;
                        };
                        NumberUtils.roundPixels400 = function (pixels) {
                            pixels = (+(pixels));
                            return Math.round(pixels * 10000) / 10000;
                        };
                        return NumberUtils;
                    }());
                    utils.NumberUtils = NumberUtils;
                })(utils = swf.utils || (swf.utils = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=NumberUtils.js.map