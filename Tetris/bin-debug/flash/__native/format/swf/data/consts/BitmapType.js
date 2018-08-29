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
                        var BitmapType = (function () {
                            function BitmapType() {
                            }
                            BitmapType.toString = function (bitmapFormat) {
                                bitmapFormat = ((bitmapFormat) >>> 0);
                                switch (bitmapFormat) {
                                    case BitmapType.JPEG:
                                        return "JPEG";
                                        break;
                                    case BitmapType.GIF89A:
                                        return "GIF89a";
                                        break;
                                    case BitmapType.PNG:
                                        return "PNG";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            BitmapType.JPEG = 1;
                            BitmapType.GIF89A = 2;
                            BitmapType.PNG = 3;
                            return BitmapType;
                        }());
                        consts.BitmapType = BitmapType;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapType.js.map