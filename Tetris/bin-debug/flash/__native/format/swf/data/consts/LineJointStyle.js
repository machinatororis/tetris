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
                        consts.JointStyle = flash.display.JointStyle;
                        var LineJointStyle = (function () {
                            function LineJointStyle() {
                            }
                            LineJointStyle.toString = function (lineJointStyle) {
                                lineJointStyle = ((lineJointStyle) >>> 0);
                                switch (lineJointStyle) {
                                    case LineJointStyle.ROUND: return consts.JointStyle.ROUND;
                                    case LineJointStyle.BEVEL: return consts.JointStyle.BEVEL;
                                    case LineJointStyle.MITER: return consts.JointStyle.MITER;
                                    default: return "null";
                                }
                            };
                            LineJointStyle.ROUND = 0;
                            LineJointStyle.BEVEL = 1;
                            LineJointStyle.MITER = 2;
                            return LineJointStyle;
                        }());
                        consts.LineJointStyle = LineJointStyle;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=LineJointStyle.js.map