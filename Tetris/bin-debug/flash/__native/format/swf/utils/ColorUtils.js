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
                    utils.StringUtils = flash.__native.utils.StringUtils;
                    var ColorUtils = (function () {
                        function ColorUtils() {
                        }
                        ColorUtils.alpha = function (color) {
                            color = ((color) >>> 0);
                            return (+(color >>> 24)) / 255;
                        };
                        ColorUtils.rgb = function (color) {
                            color = ((color) >>> 0);
                            return (color & 0xffffff);
                        };
                        ColorUtils.r = function (color) {
                            color = ((color) >>> 0);
                            return (+((ColorUtils.rgb(color) >> 16) & 0xff)) / 255;
                        };
                        ColorUtils.g = function (color) {
                            color = ((color) >>> 0);
                            return (+((ColorUtils.rgb(color) >> 8) & 0xff)) / 255;
                        };
                        ColorUtils.b = function (color) {
                            color = ((color) >>> 0);
                            return (+(ColorUtils.rgb(color) & 0xff)) / 255;
                        };
                        ColorUtils.interpolate = function (color1, color2, ratio) {
                            color1 = ((color1) >>> 0);
                            color2 = ((color2) >>> 0);
                            ratio = (+(ratio));
                            var r1 = ColorUtils.r(color1);
                            var g1 = ColorUtils.g(color1);
                            var b1 = ColorUtils.b(color1);
                            var alpha1 = ColorUtils.alpha(color1);
                            var ri = (((r1 + (ColorUtils.r(color2) - r1) * ratio) * 255) >>> 0);
                            var gi = (((g1 + (ColorUtils.g(color2) - g1) * ratio) * 255) >>> 0);
                            var bi = (((b1 + (ColorUtils.b(color2) - b1) * ratio) * 255) >>> 0);
                            var alphai = (((alpha1 + (ColorUtils.alpha(color2) - alpha1) * ratio) * 255) >>> 0);
                            return bi | (gi << 8) | (ri << 16) | (alphai << 24);
                        };
                        ColorUtils.rgbToString = function (color) {
                            color = ((color) >>> 0);
                            return utils.StringUtils.printf("#%06x", (color & 0xffffff));
                        };
                        ColorUtils.rgbaToString = function (color) {
                            color = ((color) >>> 0);
                            return utils.StringUtils.printf("#%06x(%02x)", (color & 0xffffff), (color >>> 24));
                        };
                        ColorUtils.argbToString = function (color) {
                            color = ((color) >>> 0);
                            return utils.StringUtils.printf("#(%02x)%06x", (color >>> 24), (color & 0xffffff));
                        };
                        return ColorUtils;
                    }());
                    utils.ColorUtils = ColorUtils;
                })(utils = swf.utils || (swf.utils = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=ColorUtils.js.map