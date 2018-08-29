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
                        var SoundRate = (function () {
                            function SoundRate() {
                            }
                            SoundRate.toString = function (soundRate) {
                                soundRate = ((soundRate) >>> 0);
                                switch (soundRate) {
                                    case SoundRate.KHZ_5:
                                        return "5.5kHz";
                                        break;
                                    case SoundRate.KHZ_11:
                                        return "11kHz";
                                        break;
                                    case SoundRate.KHZ_22:
                                        return "22kHz";
                                        break;
                                    case SoundRate.KHZ_44:
                                        return "44kHz";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            SoundRate.KHZ_5 = 0;
                            SoundRate.KHZ_11 = 1;
                            SoundRate.KHZ_22 = 2;
                            SoundRate.KHZ_44 = 3;
                            return SoundRate;
                        }());
                        consts.SoundRate = SoundRate;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundRate.js.map