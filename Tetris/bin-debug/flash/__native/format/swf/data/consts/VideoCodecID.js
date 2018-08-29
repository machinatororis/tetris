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
                        var VideoCodecID = (function () {
                            function VideoCodecID() {
                            }
                            VideoCodecID.toString = function (codecId) {
                                codecId = ((codecId) >>> 0);
                                switch (codecId) {
                                    case VideoCodecID.H263:
                                        return "H.263";
                                        break;
                                    case VideoCodecID.SCREEN:
                                        return "Screen Video";
                                        break;
                                    case VideoCodecID.VP6:
                                        return "VP6";
                                        break;
                                    case VideoCodecID.VP6ALPHA:
                                        return "VP6 With Alpha";
                                        break;
                                    case VideoCodecID.SCREENV2:
                                        return "Screen Video V2";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            VideoCodecID.H263 = 2;
                            VideoCodecID.SCREEN = 3;
                            VideoCodecID.VP6 = 4;
                            VideoCodecID.VP6ALPHA = 5;
                            VideoCodecID.SCREENV2 = 6;
                            return VideoCodecID;
                        }());
                        consts.VideoCodecID = VideoCodecID;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=VideoCodecID.js.map