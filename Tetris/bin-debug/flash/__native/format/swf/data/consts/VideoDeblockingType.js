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
                        var VideoDeblockingType = (function () {
                            function VideoDeblockingType() {
                            }
                            VideoDeblockingType.toString = function (deblockingType) {
                                deblockingType = ((deblockingType) >>> 0);
                                switch (deblockingType) {
                                    case VideoDeblockingType.VIDEOPACKET:
                                        return "videopacket";
                                        break;
                                    case VideoDeblockingType.OFF:
                                        return "off";
                                        break;
                                    case VideoDeblockingType.LEVEL1:
                                        return "level 1";
                                        break;
                                    case VideoDeblockingType.LEVEL2:
                                        return "level 2";
                                        break;
                                    case VideoDeblockingType.LEVEL3:
                                        return "level 3";
                                        break;
                                    case VideoDeblockingType.LEVEL4:
                                        return "level 4";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            VideoDeblockingType.VIDEOPACKET = 0;
                            VideoDeblockingType.OFF = 1;
                            VideoDeblockingType.LEVEL1 = 2;
                            VideoDeblockingType.LEVEL2 = 3;
                            VideoDeblockingType.LEVEL3 = 4;
                            VideoDeblockingType.LEVEL4 = 5;
                            return VideoDeblockingType;
                        }());
                        consts.VideoDeblockingType = VideoDeblockingType;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=VideoDeblockingType.js.map