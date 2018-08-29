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
                        consts.InterpolationMethod = flash.display.InterpolationMethod;
                        var GradientInterpolationMode = (function () {
                            function GradientInterpolationMode() {
                            }
                            GradientInterpolationMode.toString = function (interpolationMode) {
                                interpolationMode = ((interpolationMode) >>> 0);
                                switch (interpolationMode) {
                                    case GradientInterpolationMode.NORMAL:
                                        return consts.InterpolationMethod.RGB;
                                        break;
                                    case GradientInterpolationMode.LINEAR:
                                        return consts.InterpolationMethod.LINEAR_RGB;
                                        break;
                                    default:
                                        return consts.InterpolationMethod.RGB;
                                        break;
                                }
                            };
                            GradientInterpolationMode.NORMAL = 0;
                            GradientInterpolationMode.LINEAR = 1;
                            return GradientInterpolationMode;
                        }());
                        consts.GradientInterpolationMode = GradientInterpolationMode;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=GradientInterpolationMode.js.map