var flash;
(function (flash) {
    var media;
    (function (media) {
        var AudioDecoder = (function () {
            function AudioDecoder() {
            }
            AudioDecoder.DOLBY_DIGITAL = "DolbyDigital";
            AudioDecoder.DOLBY_DIGITAL_PLUS = "DolbyDigitalPlus";
            AudioDecoder.DTS = "DTS";
            AudioDecoder.DTS_EXPRESS = "DTSExpress";
            AudioDecoder.DTS_HD_HIGH_RESOLUTION_AUDIO = "DTSHDHighResolutionAudio";
            AudioDecoder.DTS_HD_MASTER_AUDIO = "DTSHDMasterAudio";
            return AudioDecoder;
        }());
        media.AudioDecoder = AudioDecoder;
    })(media = flash.media || (flash.media = {}));
})(flash || (flash = {}));
//# sourceMappingURL=AudioDecoder.js.map