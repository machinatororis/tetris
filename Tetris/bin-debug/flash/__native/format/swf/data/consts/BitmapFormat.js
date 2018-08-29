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
                        var BitmapFormat = (function () {
                            function BitmapFormat() {
                            }
                            BitmapFormat.toString = function (bitmapFormat) {
                                bitmapFormat = ((bitmapFormat) >>> 0);
                                switch (bitmapFormat) {
                                    case BitmapFormat.BIT_8:
                                        return "8 BPP";
                                    case BitmapFormat.BIT_15:
                                        return "15 BPP";
                                    case BitmapFormat.BIT_24:
                                        return "24 BPP";
                                    default:
                                        return "unknown";
                                }
                            };
                            BitmapFormat.BIT_8 = 3;
                            BitmapFormat.BIT_15 = 4;
                            BitmapFormat.BIT_24 = 5;
                            return BitmapFormat;
                        }());
                        consts.BitmapFormat = BitmapFormat;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=BitmapFormat.js.map