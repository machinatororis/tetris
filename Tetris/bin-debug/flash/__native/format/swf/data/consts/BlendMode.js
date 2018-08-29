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
                        var BlendMode = (function () {
                            function BlendMode() {
                            }
                            BlendMode.toString = function (blendMode) {
                                blendMode = ((blendMode) >>> 0);
                                switch (blendMode) {
                                    case BlendMode.NORMAL_0:
                                    case BlendMode.NORMAL_1:
                                        return "normal";
                                        break;
                                    case BlendMode.LAYER:
                                        return "layer";
                                        break;
                                    case BlendMode.MULTIPLY:
                                        return "multiply";
                                        break;
                                    case BlendMode.SCREEN:
                                        return "screen";
                                        break;
                                    case BlendMode.LIGHTEN:
                                        return "lighten";
                                        break;
                                    case BlendMode.DARKEN:
                                        return "darken";
                                        break;
                                    case BlendMode.DIFFERENCE:
                                        return "difference";
                                        break;
                                    case BlendMode.ADD:
                                        return "add";
                                        break;
                                    case BlendMode.SUBTRACT:
                                        return "subtract";
                                        break;
                                    case BlendMode.INVERT:
                                        return "invert";
                                        break;
                                    case BlendMode.ALPHA:
                                        return "alpha";
                                        break;
                                    case BlendMode.ERASE:
                                        return "erase";
                                        break;
                                    case BlendMode.OVERLAY:
                                        return "overlay";
                                        break;
                                    case BlendMode.HARDLIGHT:
                                        return "hardlight";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            BlendMode.NORMAL_0 = 0;
                            BlendMode.NORMAL_1 = 1;
                            BlendMode.LAYER = 2;
                            BlendMode.MULTIPLY = 3;
                            BlendMode.SCREEN = 4;
                            BlendMode.LIGHTEN = 5;
                            BlendMode.DARKEN = 6;
                            BlendMode.DIFFERENCE = 7;
                            BlendMode.ADD = 8;
                            BlendMode.SUBTRACT = 9;
                            BlendMode.INVERT = 10;
                            BlendMode.ALPHA = 11;
                            BlendMode.ERASE = 12;
                            BlendMode.OVERLAY = 13;
                            BlendMode.HARDLIGHT = 14;
                            return BlendMode;
                        }());
                        consts.BlendMode = BlendMode;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BlendMode.js.map