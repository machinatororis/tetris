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
                        consts.CapsStyle = flash.display.CapsStyle;
                        var LineCapsStyle = (function () {
                            function LineCapsStyle() {
                            }
                            LineCapsStyle.toString = function (lineCapsStyle) {
                                lineCapsStyle = ((lineCapsStyle) >>> 0);
                                switch (lineCapsStyle) {
                                    case LineCapsStyle.ROUND: return consts.CapsStyle.ROUND;
                                    case LineCapsStyle.NO: return consts.CapsStyle.NONE;
                                    case LineCapsStyle.SQUARE: return consts.CapsStyle.SQUARE;
                                    default: return "unknown";
                                }
                            };
                            LineCapsStyle.ROUND = 0;
                            LineCapsStyle.NO = 1;
                            LineCapsStyle.SQUARE = 2;
                            return LineCapsStyle;
                        }());
                        consts.LineCapsStyle = LineCapsStyle;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=LineCapsStyle.js.map