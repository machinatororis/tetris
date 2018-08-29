var flash;
(function (flash) {
    var media;
    (function (media) {
        var SoundCodec = (function () {
            function SoundCodec() {
            }
            SoundCodec.NELLYMOSER = "NellyMoser";
            SoundCodec.SPEEX = "Speex";
            SoundCodec.PCMA = "pcma";
            SoundCodec.PCMU = "pcmu";
            return SoundCodec;
        }());
        media.SoundCodec = SoundCodec;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=SoundCodec.js.map