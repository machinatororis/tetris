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
                        var SoundCompression = (function () {
                            function SoundCompression() {
                            }
                            SoundCompression.toString = function (soundCompression) {
                                soundCompression = ((soundCompression) >>> 0);
                                switch (soundCompression) {
                                    case SoundCompression.UNCOMPRESSED_NATIVE_ENDIAN:
                                        return "Uncompressed Native Endian";
                                        break;
                                    case SoundCompression.ADPCM:
                                        return "ADPCM";
                                        break;
                                    case SoundCompression.MP3:
                                        return "MP3";
                                        break;
                                    case SoundCompression.UNCOMPRESSED_LITTLE_ENDIAN:
                                        return "Uncompressed Little Endian";
                                        break;
                                    case SoundCompression.NELLYMOSER_16_KHZ:
                                        return "Nellymoser 16kHz";
                                        break;
                                    case SoundCompression.NELLYMOSER_8_KHZ:
                                        return "Nellymoser 8kHz";
                                        break;
                                    case SoundCompression.NELLYMOSER:
                                        return "Nellymoser";
                                        break;
                                    case SoundCompression.SPEEX:
                                        return "Speex";
                                        break;
                                    default:
                                        return "unknown";
                                        break;
                                }
                            };
                            SoundCompression.UNCOMPRESSED_NATIVE_ENDIAN = 0;
                            SoundCompression.ADPCM = 1;
                            SoundCompression.MP3 = 2;
                            SoundCompression.UNCOMPRESSED_LITTLE_ENDIAN = 3;
                            SoundCompression.NELLYMOSER_16_KHZ = 4;
                            SoundCompression.NELLYMOSER_8_KHZ = 5;
                            SoundCompression.NELLYMOSER = 6;
                            SoundCompression.SPEEX = 11;
                            return SoundCompression;
                        }());
                        consts.SoundCompression = SoundCompression;
                    })(consts = data.consts || (data.consts = {}));
                })(data = swf.data || (swf.data = {}));
            })(swf = format.swf || (format.swf = {}));
        })(format = __native.format || (__native.format = {}));
    })(__native = flash.__native || (flash.__native = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundCompression.js.map