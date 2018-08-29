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
                        var SoundType = (function () {
                            function SoundType() {
                            }
                            SoundType.toString = function (soundType) {
                                soundType = ((soundType) >>> 0);
                                switch (soundType) {
                                    case SoundType.MONO:
                                        return "mono";
                                        break;
                                    case SoundType.STEREO:
                                        return "stereo";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            SoundType.MONO = 0;
                            SoundType.STEREO = 1;
                            return SoundType;
                        }());
                        consts.SoundType = SoundType;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundType.js.map