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
                        var SoundSize = (function () {
                            function SoundSize() {
                            }
                            SoundSize.toString = function (soundSize) {
                                soundSize = ((soundSize) >>> 0);
                                switch (soundSize) {
                                    case SoundSize.BIT_8:
                                        return "8bit";
                                        break;
                                    case SoundSize.BIT_16:
                                        return "16bit";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            SoundSize.BIT_8 = 0;
                            SoundSize.BIT_16 = 1;
                            return SoundSize;
                        }());
                        consts.SoundSize = SoundSize;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundSize.js.map